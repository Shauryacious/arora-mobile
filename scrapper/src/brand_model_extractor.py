"""
Brand and model information extractor
"""

import json
from typing import Dict, List
from playwright.async_api import Page
from bs4 import BeautifulSoup
from .logger import get_logger


class BrandModelExtractor:
    """Extracts brand and model information from pages"""
    
    def __init__(self):
        self.logger = get_logger("BrandModelExtractor")
    
    async def extract_brand_model_info(self, page: Page) -> Dict[str, List[str]]:
        """Extract available brands and models from the page"""
        brands_models = {
            'brands': [],
            'models': {}
        }
        
        try:
            self.logger.debug("Waiting for device selection dropdowns...")
            # Wait for the device selection dropdowns to load
            try:
                await page.wait_for_selector('select, [data-brand], .brand-select, .model-select', timeout=10000)
            except Exception:
                self.logger.warning("Device selection dropdowns not found, continuing...")
            
            # Extract brands - try multiple selectors for Layers.shop
            brand_selectors = [
                'select[name*="brand"]',
                'select[id*="brand"]',
                'select[class*="brand"]',
                '[data-brand]',
                '.brand-select',
                '#brand-select',
                'select:has(option[value*="Apple"])',
                'select:has(option[value*="Samsung"])'
            ]
            
            brand_select = None
            for selector in brand_selectors:
                try:
                    brand_elements = await page.query_selector_all(selector)
                    if brand_elements:
                        brand_select = brand_elements[0]
                        tag_name = await brand_select.evaluate('el => el.tagName')
                        if tag_name == 'SELECT':
                            options = await brand_select.query_selector_all('option')
                            for option in options:
                                value = await option.get_attribute('value')
                                text = await option.inner_text()
                                if value and value not in ['', 'Select Brand', 'Choose Brand', 'Select']:
                                    brands_models['brands'].append({
                                        'value': value,
                                        'text': text.strip()
                                    })
                            if brands_models['brands']:
                                break
                except Exception as e:
                    continue
            
            # Extract models - may need to select a brand first
            model_selectors = [
                'select[name*="model"]',
                'select[id*="model"]',
                'select[class*="model"]',
                '[data-model]',
                '.model-select',
                '#model-select'
            ]
            
            # Try to get models directly
            for selector in model_selectors:
                try:
                    model_elements = await page.query_selector_all(selector)
                    if model_elements:
                        model_select = model_elements[0]
                        options = await model_select.query_selector_all('option')
                        for option in options:
                            value = await option.get_attribute('value')
                            text = await option.inner_text()
                            if value and value not in ['', 'Select Model', 'Choose Model', 'Select']:
                                brand = 'unknown'  # Will be updated when brand is selected
                                if brand not in brands_models['models']:
                                    brands_models['models'][brand] = []
                                brands_models['models'][brand].append({
                                    'value': value,
                                    'text': text.strip()
                                })
                        break
                except:
                    continue
            
            # Also try to extract from JavaScript/JSON data in the page
            try:
                html = await page.content()
                soup = BeautifulSoup(html, 'html.parser')
                
                # Look for script tags with product data
                scripts = soup.find_all('script', type='application/json')
                for script in scripts:
                    try:
                        data = json.loads(script.string)
                        # Try to find brand/model data in JSON
                        if isinstance(data, dict):
                            # Common Shopify patterns
                            if 'product' in data:
                                # Extract variant options
                                pass
                    except:
                        continue
            except:
                pass
            
            self.logger.debug(f"Extracted {len(brands_models.get('brands', []))} brands")
            return brands_models
            
        except Exception as e:
            self.logger.warning(f"Error extracting brand/model info: {e}")
            return brands_models

