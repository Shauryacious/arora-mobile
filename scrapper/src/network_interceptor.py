"""
Network request interceptor for capturing high-quality image URLs
"""

from typing import List, Dict
from playwright.async_api import Page
from .url_optimizer import URLOptimizer
from .logger import get_logger


class NetworkInterceptor:
    """Intercepts network requests to capture high-quality image URLs"""
    
    def __init__(self):
        self.network_images: List[Dict] = []
        self.url_optimizer = URLOptimizer()
        self.logger = get_logger("NetworkInterceptor")
        self.capture_count = 0
    
    async def setup_interception(self, page: Page):
        """Set up network request interception"""
        async def handle_response(response):
            url = response.url
            content_type = response.headers.get('content-type', '')
            
            # Capture image requests
            if 'image' in content_type.lower() or any(ext in url.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp', '.avif']):
                # Try to get the full-size image URL
                high_res_url = self.url_optimizer.get_high_res_url(url)
                self.network_images.append({
                    'url': high_res_url,
                    'original_url': url,
                    'content_type': content_type,
                    'status': response.status
                })
                self.capture_count += 1
                if self.capture_count % 10 == 0:
                    self.logger.debug(f"Captured {self.capture_count} images from network requests")
        
        page.on("response", handle_response)
        self.logger.debug("Network response interceptor registered")
    
    def get_captured_images(self) -> List[Dict]:
        """Get all captured network images"""
        return self.network_images.copy()
    
    def clear(self):
        """Clear captured images"""
        self.network_images.clear()

