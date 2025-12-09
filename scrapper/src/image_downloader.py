"""
Image downloader with async support and retry logic
"""

import asyncio
from pathlib import Path
from urllib.parse import urlparse
from typing import Dict, Optional
import aiohttp
import aiofiles
from .logger import get_logger


class ImageDownloader:
    """Handles downloading images with retry logic and concurrency control"""
    
    def __init__(self, output_dir: Path, max_concurrent: int = 5, max_retries: int = 3):
        self.output_dir = output_dir
        self.max_concurrent = max_concurrent
        self.max_retries = max_retries
        self.semaphore = asyncio.Semaphore(max_concurrent)
        self.logger = get_logger("ImageDownloader")
        self.downloaded_count = 0
        self.failed_count = 0
    
    async def download_image(self, session: aiohttp.ClientSession, url: str, 
                           filepath: Path) -> bool:
        """Download an image with retries"""
        for attempt in range(self.max_retries):
            try:
                self.logger.debug(f"Downloading: {filepath.name} (attempt {attempt + 1}/{self.max_retries})")
                async with session.get(url, timeout=aiohttp.ClientTimeout(total=30)) as response:
                    if response.status == 200:
                        # Get file extension from URL or content-type
                        content_type = response.headers.get('content-type', '')
                        if 'jpeg' in content_type or 'jpg' in content_type:
                            ext = '.jpg'
                        elif 'png' in content_type:
                            ext = '.png'
                        elif 'webp' in content_type:
                            ext = '.webp'
                        else:
                            ext = Path(urlparse(url).path).suffix or '.jpg'
                        
                        # Update filepath with correct extension
                        filepath = filepath.with_suffix(ext)
                        
                        async with aiofiles.open(filepath, 'wb') as f:
                            async for chunk in response.content.iter_chunked(8192):
                                await f.write(chunk)
                        
                        self.downloaded_count += 1
                        self.logger.debug(f"Successfully downloaded: {filepath.name}")
                        return True
                    else:
                        self.logger.warning(f"HTTP {response.status} for {url}")
            except asyncio.TimeoutError:
                self.logger.warning(f"Timeout downloading {filepath.name}")
            except Exception as e:
                self.logger.debug(f"Error downloading {filepath.name}: {e}")
                if attempt < self.max_retries - 1:
                    await asyncio.sleep(2 ** attempt)  # Exponential backoff
                else:
                    self.failed_count += 1
                    self.logger.error(f"Failed to download {url} after {self.max_retries} attempts: {e}")
        return False
    
    async def download_images(self, images: list[Dict]) -> list[Optional[Dict]]:
        """Download multiple images concurrently"""
        self.downloaded_count = 0
        self.failed_count = 0
        
        async def download_with_semaphore(session, img_data, path):
            async with self.semaphore:
                success = await self.download_image(session, img_data['url'], path)
                if success:
                    return {
                        'url': img_data['url'],
                        'original_url': img_data.get('original_url', ''),
                        'alt': img_data.get('alt', ''),
                        'title': img_data.get('title', ''),
                        'filepath': str(path),
                        'filename': path.name
                    }
                return None
        
        self.logger.info(f"Starting download of {len(images)} images (max {self.max_concurrent} concurrent)...")
        
        async with aiohttp.ClientSession() as session:
            tasks = []
            for idx, img in enumerate(images):
                # Create filename
                url_path = urlparse(img['url']).path
                filename = Path(url_path).name or f"image_{idx}"
                # Clean filename
                import re
                filename = re.sub(r'[^\w\-_\.]', '_', filename)
                if not filename.endswith(('.jpg', '.jpeg', '.png', '.webp')):
                    filename += '.jpg'
                
                filepath = self.output_dir / filename
                
                # Create download task
                task = download_with_semaphore(session, img, filepath)
                tasks.append(task)
            
            results = await asyncio.gather(*tasks)
            
            self.logger.info(f"Download complete: {self.downloaded_count} succeeded, {self.failed_count} failed")
            return results

