"""
URL optimizer for extracting highest quality image URLs
"""

import re


class URLOptimizer:
    """Handles URL optimization to get highest quality images"""
    
    @staticmethod
    def get_high_res_url(url: str) -> str:
        """Modify URL to get highest quality version"""
        # Remove size restrictions
        url = re.sub(r'[?&](w|width|h|height|size|resize|scale)=\d+', '', url)
        
        # Replace common thumbnail patterns with full-size
        replacements = [
            (r'_thumb', ''),
            (r'_small', ''),
            (r'_medium', ''),
            (r'_large', ''),
            (r'thumbnail', 'original'),
            (r'thumb', 'original'),
            (r'w_\d+', 'w_2048'),  # Set high width
            (r'h_\d+', 'h_2048'),  # Set high height
        ]
        
        for pattern, replacement in replacements:
            url = re.sub(pattern, replacement, url, flags=re.IGNORECASE)
        
        # For Shopify/CDN images, try to get original
        if 'cdn.shopify.com' in url or 'shopifycdn.com' in url or 'cdn.shopifycdn.com' in url:
            # Remove existing size/quality parameters
            url = re.sub(r'[?&]width=\d+', '', url)
            url = re.sub(r'[?&]height=\d+', '', url)
            url = re.sub(r'[?&]quality=\d+', '', url)
            url = re.sub(r'[?&]crop=\w+', '', url)
            
            # Remove trailing ? or & if present
            url = url.rstrip('?&')
            
            # Add high quality parameters (Shopify supports up to 4096px width)
            if '?' in url:
                url += '&width=4096&quality=100&format=auto'
            else:
                url += '?width=4096&quality=100&format=auto'
        
        return url

