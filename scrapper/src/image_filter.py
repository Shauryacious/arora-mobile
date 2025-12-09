"""
Image filter for categorizing and filtering images
"""

from typing import List, Dict, Tuple


class ImageFilter:
    """Filters and categorizes images"""
    
    # Design pattern keywords (64 designs from Layers.shop)
    DESIGN_KEYWORDS = [
        'latte', 'lilac', 'espresso', 'mint', 'coastal', 'split',
        'candy', 'mod', 'heat', 'aqua', 'frost', 'titan', 'flash',
        'nitron', 'silver', 'vibe', 'chroma', 'chaotic', 'urban',
        'redline', 'celestial', 'molten', 'ring', 'rouge', 'cosmo',
        'cosmic', 'devil', 'fire', 'cyber', 'champion', 'boundless',
        'magma', 'chaos', 'space', 'canopy', 'concrete', 'cricket',
        'purple', 'cultivate', 'game', 'lava', 'estuary', 'dancing',
        'vector', 'quantum', 'sapphire', 'vacation', 'untethered',
        'sunset', 'shikara', 'mountain', 'shutter', 'sick', 'eye',
        'ghost', 'baadshah', 'forest', 'machina', 'hud'
    ]
    
    # Phone/device keywords
    PHONE_KEYWORDS = [
        'phone', 'device', 'mobile', 'iphone', 'samsung', 'pixel', 
        'google', 'nothing', 'oneplus', 'vivo', 'oppo', 'poco',
        'realme', 'iqoo', 'xiaomi', 'asus', 'tecno', 'motorola',
        'product', 'skin', 'model', 'device', 'preview'
    ]
    
    # Excluded keywords (logos, icons, etc.)
    EXCLUDED_KEYWORDS = ['logo', 'icon', 'cart', 'menu', 'button', 'arrow', 'close']
    
    def filter_images(self, images: List[Dict]) -> Tuple[List[Dict], List[Dict], List[Dict]]:
        """
        Filter images into phone images, design images, and other images
        
        Returns:
            Tuple of (phone_images, design_images, other_images)
        """
        phone_images = []
        design_images = []
        other_images = []
        
        for img in images:
            alt_lower = img.get('alt', '').lower()
            title_lower = img.get('title', '').lower()
            url_lower = img.get('url', '').lower()
            
            # Check if it's a design pattern image
            is_design = any(keyword in alt_lower or keyword in title_lower or keyword in url_lower
                           for keyword in self.DESIGN_KEYWORDS)
            
            # Check if it's a phone/device image
            is_phone = any(keyword in alt_lower or keyword in title_lower or keyword in url_lower 
                           for keyword in self.PHONE_KEYWORDS)
            
            # Check if it should be excluded
            is_excluded = any(kw in url_lower or kw in alt_lower 
                            for kw in self.EXCLUDED_KEYWORDS)
            
            if is_excluded:
                continue
            elif is_design:
                design_images.append(img)
            elif is_phone:
                phone_images.append(img)
            else:
                other_images.append(img)
        
        # If no specific phone images found, include all non-design, non-excluded images
        if not phone_images:
            phone_images = other_images
            other_images = []
        
        return phone_images, design_images, other_images

