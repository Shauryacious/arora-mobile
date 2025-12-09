"""
Main scraper orchestrator
"""

import asyncio
import json
from pathlib import Path
from typing import Dict, Optional
import aiofiles
from playwright.async_api import async_playwright, Page, TimeoutError as PlaywrightTimeoutError

from .network_interceptor import NetworkInterceptor
from .image_extractor import ImageExtractor
from .image_downloader import ImageDownloader
from .image_filter import ImageFilter
from .brand_model_extractor import BrandModelExtractor
from .logger import get_logger


class PhoneImageScraper:
    """Main scraper class that orchestrates all components"""
    
    def __init__(self, output_dir: str = "scraped_images", max_concurrent_downloads: int = 5, 
                 log_file: Optional[str] = None):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.max_concurrent_downloads = max_concurrent_downloads
        
        # Initialize logger
        log_path = log_file or str(self.output_dir / 'scraper.log')
        self.logger = get_logger("PhoneImageScraper", log_path)
        
        # Initialize components
        self.network_interceptor = NetworkInterceptor()
        self.image_extractor = ImageExtractor()
        self.image_downloader = ImageDownloader(
            self.output_dir, 
            max_concurrent=max_concurrent_downloads
        )
        self.image_filter = ImageFilter()
        self.brand_model_extractor = BrandModelExtractor()
    
    async def _navigate_with_retry(self, page: Page, url: str, max_retries: int = 3) -> bool:
        """Navigate to page with retry logic and flexible wait strategies"""
        wait_strategies = [
            ('load', 30000),           # Wait for load event (30s)
            ('domcontentloaded', 20000),  # Wait for DOM (20s)
            ('commit', 15000),         # Wait for navigation commit (15s)
        ]
        
        for attempt in range(max_retries):
            self.logger.info(f"Navigation attempt {attempt + 1}/{max_retries}")
            
            for wait_until, timeout in wait_strategies:
                try:
                    self.logger.debug(f"Trying navigation with wait_until='{wait_until}', timeout={timeout}ms")
                    await page.goto(url, wait_until=wait_until, timeout=timeout)
                    self.logger.success(f"Page loaded successfully using '{wait_until}' strategy")
                    
                    # Additional wait for dynamic content
                    self.logger.debug("Waiting for dynamic content to load...")
                    await asyncio.sleep(2)
                    
                    # Try to wait for network to be idle (but don't fail if it times out)
                    try:
                        await page.wait_for_load_state('networkidle', timeout=10000)
                        self.logger.debug("Network reached idle state")
                    except PlaywrightTimeoutError:
                        self.logger.warning("Network did not reach idle state, continuing anyway...")
                    
                    return True
                    
                except PlaywrightTimeoutError as e:
                    self.logger.warning(f"Timeout with '{wait_until}' strategy: {e}")
                    continue
                except Exception as e:
                    self.logger.error(f"Error during navigation: {e}")
                    if attempt < max_retries - 1:
                        await asyncio.sleep(2 ** attempt)  # Exponential backoff
                    continue
            
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt
                self.logger.info(f"All wait strategies failed, retrying in {wait_time} seconds...")
                await asyncio.sleep(wait_time)
        
        return False
    
    async def scrape_page(self, url: str):
        """Main scraping function"""
        self.logger.info("=" * 60)
        self.logger.info(f"Starting scrape of: {url}")
        self.logger.info("=" * 60)
        
        try:
            async with async_playwright() as p:
                self.logger.debug("Launching browser...")
                # Launch browser with high-quality settings
                browser = await p.chromium.launch(
                    headless=True,
                    args=['--disable-blink-features=AutomationControlled']
                )
                self.logger.success("Browser launched")
                
                self.logger.debug("Creating browser context...")
                context = await browser.new_context(
                    viewport={'width': 1920, 'height': 1080},
                    user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                )
                
                page = await context.new_page()
                self.logger.debug("New page created")
                
                # Set up network interception
                self.logger.progress("Setting up network interception...")
                await self.network_interceptor.setup_interception(page)
                self.logger.success("Network interception enabled")
                
                # Navigate to the page with retry logic
                self.logger.progress("Navigating to page...")
                navigation_success = await self._navigate_with_retry(page, url)
                
                if not navigation_success:
                    self.logger.error("Failed to navigate to page after all retries")
                    await browser.close()
                    raise Exception("Failed to load page after multiple attempts")
                
                # Extract brand and model information
                self.logger.progress("Extracting brand and model information...")
                try:
                    brands_models = await self.brand_model_extractor.extract_brand_model_info(page)
                    self.logger.success(f"Found {len(brands_models.get('brands', []))} brands")
                except Exception as e:
                    self.logger.warning(f"Error extracting brand/model info: {e}")
                    brands_models = {'brands': [], 'models': {}}
                
                # Extract all images
                self.logger.progress("Extracting images from page...")
                network_images = self.network_interceptor.get_captured_images()
                self.logger.debug(f"Captured {len(network_images)} images from network requests")
                
                images = await self.image_extractor.extract_images_from_page(page, url, network_images)
                self.logger.success(f"Found {len(images)} total images")
                
                # Filter images
                self.logger.progress("Filtering images...")
                phone_images, design_images, other_images = self.image_filter.filter_images(images)
                self.logger.info(f"  Phone images: {len(phone_images)}")
                self.logger.info(f"  Design images: {len(design_images)}")
                self.logger.info(f"  Other images: {len(other_images)}")
                
                # Combine phone and design images
                all_relevant_images = phone_images + design_images
                
                # If still no images, use all
                if not all_relevant_images:
                    self.logger.warning("No phone/design images found, using all images")
                    all_relevant_images = images
                
                # Download images
                self.logger.progress(f"Downloading {len(all_relevant_images)} images...")
                results = await self.image_downloader.download_images(all_relevant_images)
                downloaded_count = len([r for r in results if r])
                self.logger.success(f"Downloaded {downloaded_count}/{len(all_relevant_images)} images")
                
                # Save metadata
                self.logger.progress("Saving metadata...")
                metadata = {
                    'source_url': url,
                    'total_images_found': len(images),
                    'phone_images_count': len(phone_images),
                    'design_images_count': len(design_images),
                    'other_images_count': len(other_images),
                    'images_downloaded': downloaded_count,
                    'brands_models': brands_models,
                    'images': [r for r in results if r]
                }
                
                metadata_path = self.output_dir / 'metadata.json'
                async with aiofiles.open(metadata_path, 'w') as f:
                    await f.write(json.dumps(metadata, indent=2))
                
                self.logger.success("Metadata saved")
                
                self.logger.info("")
                self.logger.info("=" * 60)
                self.logger.success("Scraping complete!")
                self.logger.info("=" * 60)
                self.logger.info(f"  Total images found: {metadata['total_images_found']}")
                self.logger.info(f"  Phone images: {metadata['phone_images_count']}")
                self.logger.info(f"  Design images: {metadata['design_images_count']}")
                self.logger.info(f"  Images downloaded: {metadata['images_downloaded']}")
                self.logger.info(f"  Output directory: {self.output_dir.absolute()}")
                self.logger.info(f"  Metadata saved to: {metadata_path}")
                self.logger.info("=" * 60)
                
                await browser.close()
                self.logger.debug("Browser closed")
                
        except Exception as e:
            self.logger.error(f"Error during scraping: {e}", exc_info=True)
            raise

