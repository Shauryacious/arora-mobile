"""
Image extractor for extracting images from web pages
"""

import asyncio
import re
from typing import List, Dict
from urllib.parse import urljoin
from playwright.async_api import Page
from .url_optimizer import URLOptimizer
from .logger import get_logger


class ImageExtractor:
    """Extracts images from web pages"""
    
    def __init__(self):
        self.url_optimizer = URLOptimizer()
        self.logger = get_logger("ImageExtractor")
    
    async def extract_images_from_page(self, page: Page, base_url: str, network_images: List[Dict] = None) -> List[Dict]:
        """Extract all images from the current page state"""
        images = []
        
        try:
            self.logger.debug("Waiting for page to be ready...")
            # Wait for images to load (with timeout, don't fail if it doesn't reach networkidle)
            try:
                await page.wait_for_load_state('networkidle', timeout=10000)
                self.logger.debug("Network reached idle state")
            except Exception:
                self.logger.debug("Network did not reach idle, continuing anyway...")
            
            self.logger.debug("Waiting for lazy-loaded images...")
            await asyncio.sleep(2)  # Additional wait for lazy-loaded images
            
            # Get all img elements
            self.logger.debug("Querying all img elements...")
            img_elements = await page.query_selector_all('img')
            self.logger.debug(f"Found {len(img_elements)} img elements")
            
            for idx, img in enumerate(img_elements):
                if (idx + 1) % 10 == 0:
                    self.logger.debug(f"Processing image {idx + 1}/{len(img_elements)}")
                try:
                    # Get various image source attributes
                    src = await img.get_attribute('src')
                    srcset = await img.get_attribute('srcset')
                    data_src = await img.get_attribute('data-src')
                    data_original = await img.get_attribute('data-original')
                    data_lazy = await img.get_attribute('data-lazy-src')
                    
                    # Get alt text and other metadata
                    alt = await img.get_attribute('alt') or ''
                    title = await img.get_attribute('title') or ''
                    
                    # Determine the best quality image URL
                    image_url = None
                    
                    # Priority: data-original > data-src > srcset (highest res) > src
                    if data_original:
                        image_url = urljoin(base_url, data_original)
                    elif data_src:
                        image_url = urljoin(base_url, data_src)
                    elif data_lazy:
                        image_url = urljoin(base_url, data_lazy)
                    elif srcset:
                        # Extract highest resolution from srcset
                        srcset_parts = srcset.split(',')
                        highest_res = max(srcset_parts, key=lambda x: int(re.search(r'(\d+)w', x).group(1)) if re.search(r'(\d+)w', x) else 0)
                        image_url = urljoin(base_url, highest_res.split()[0])
                    elif src:
                        image_url = urljoin(base_url, src)
                    
                    if image_url:
                        # Get high-res version
                        high_res_url = self.url_optimizer.get_high_res_url(image_url)
                        
                        images.append({
                            'url': high_res_url,
                            'original_url': image_url,
                            'alt': alt,
                            'title': title,
                            'element': img
                        })
                        
                except Exception as e:
                    self.logger.debug(f"Error processing image element {idx}: {e}")
                    continue
            
            # Also check for background images in CSS
            all_elements = await page.query_selector_all('*')
            for elem in all_elements:
                try:
                    style = await elem.get_attribute('style')
                    if style and 'background-image' in style:
                        match = re.search(r'url\(["\']?([^"\']+)["\']?\)', style)
                        if match:
                            bg_url = urljoin(base_url, match.group(1))
                            high_res_url = self.url_optimizer.get_high_res_url(bg_url)
                            images.append({
                                'url': high_res_url,
                                'original_url': bg_url,
                                'alt': 'Background image',
                                'title': '',
                                'type': 'background'
                            })
                except:
                    continue
            
            # Merge with network-intercepted images
            if network_images:
                for net_img in network_images:
                    if net_img['url'] not in [img['url'] for img in images]:
                        images.append({
                            'url': net_img['url'],
                            'original_url': net_img['original_url'],
                            'alt': '',
                            'title': '',
                            'type': 'network'
                        })
            
            self.logger.debug(f"Extracted {len(images)} images from page elements")
            return images
            
        except Exception as e:
            self.logger.error(f"Error extracting images: {e}")
            return images

