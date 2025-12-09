# Phone Image Scraper

A modern, high-performance web scraper for extracting high-quality phone images with brand and model information from Layers.shop. Built with Playwright for handling JavaScript-heavy sites and optimized for extracting maximum quality images.

## Features

- 🚀 **Modern Technology**: Uses Playwright (industry standard as of 2025) for reliable JavaScript rendering
- 🖼️ **High-Quality Images**: Automatically extracts and downloads images in highest available resolution
- 📱 **Smart Filtering**: Identifies phone/device images and design patterns separately
- 🔍 **Network Interception**: Captures images from network requests for maximum quality
- ⚡ **Async/Await**: Concurrent downloads with rate limiting for optimal performance
- 📊 **Metadata Export**: Saves comprehensive metadata including URLs, alt text, and brand/model info
- 🛡️ **Shopify Optimized**: Special handling for Shopify CDN to get 4096px width images

## Installation

### Quick Setup

Run the setup script (recommended):

```bash
cd scrapper
./setup.sh
```

This will:
- Create a virtual environment (optional)
- Install all Python dependencies
- Install Playwright browsers

### Manual Setup

1. **Install Python dependencies:**
```bash
cd scrapper
python3 -m pip install -r requirements.txt
```

2. **Install Playwright browsers:**
```bash
python3 -m playwright install chromium
```

## Usage

### Quick Start

Run the start script:

```bash
./start.sh
```

This will:
- Scrape the Layers.shop build-your-skin page
- Extract all phone images and design patterns
- Download images to `scraped_images/` directory
- Save metadata to `scraped_images/metadata.json`

### Advanced Usage

The start script accepts optional arguments:

```bash
# Custom URL
./start.sh "https://www.layers.shop/products/build-your-skin"

# Custom URL and output directory
./start.sh "https://www.layers.shop/products/build-your-skin" "my_images"

# Custom URL, output directory, and max concurrent downloads
./start.sh "https://www.layers.shop/products/build-your-skin" "my_images" 10
```

### Using Python Directly

You can also run the scraper directly with Python 3:

```bash
python3 main.py
python3 main.py "https://example.com" "output_dir" 5
```

### Programmatic Usage

```python
from src.scraper import PhoneImageScraper
import asyncio

async def main():
    scraper = PhoneImageScraper(
        output_dir="my_images",
        max_concurrent_downloads=10
    )
    await scraper.scrape_page("https://www.layers.shop/products/build-your-skin")

asyncio.run(main())
```

## How It Works

1. **Page Loading**: Uses Playwright to load the page and wait for all JavaScript to execute
2. **Network Interception**: Monitors network requests to capture high-quality image URLs
3. **Image Extraction**: 
   - Extracts images from `<img>` tags (src, srcset, data-src, etc.)
   - Extracts background images from CSS
   - Captures images from network requests
4. **Quality Enhancement**: 
   - Removes size restrictions from URLs
   - For Shopify CDN: requests 4096px width with 100% quality
   - Replaces thumbnail patterns with full-size versions
5. **Smart Filtering**: 
   - Identifies phone/device images
   - Separates design pattern images (64 designs)
   - Filters out logos, icons, and UI elements
6. **Concurrent Downloads**: Downloads up to 5 images simultaneously with retry logic

## Output Structure

```
scraped_images/
├── metadata.json          # Complete metadata with all image info
├── image_1.jpg            # Downloaded images
├── image_2.jpg
└── ...
```

### Metadata Format

```json
{
  "source_url": "https://www.layers.shop/products/build-your-skin",
  "total_images_found": 150,
  "phone_images_count": 45,
  "design_images_count": 64,
  "images_downloaded": 109,
  "brands_models": {
    "brands": [...],
    "models": {...}
  },
  "images": [
    {
      "url": "https://cdn.shopify.com/...?width=4096&quality=100",
      "original_url": "https://cdn.shopify.com/...",
      "alt": "iPhone 15 Pro Max",
      "title": "",
      "filepath": "scraped_images/image_1.jpg",
      "filename": "image_1.jpg"
    }
  ]
}
```

## Image Quality Optimization

The scraper uses several techniques to get the highest quality images:

1. **Shopify CDN Optimization**: 
   - Requests `width=4096&quality=100&format=auto` for Shopify images
   - Removes existing size restrictions

2. **URL Pattern Replacement**:
   - Replaces `_thumb`, `_small`, `_medium` with full-size versions
   - Removes width/height restrictions from query parameters

3. **Multiple Source Priority**:
   - `data-original` > `data-src` > `srcset` (highest res) > `src`

4. **Network Request Capture**:
   - Intercepts actual network requests to get original image URLs

## Project Structure

```
scrapper/
├── src/                      # Modular source code
│   ├── __init__.py
│   ├── scraper.py           # Main orchestrator
│   ├── network_interceptor.py  # Network request interception
│   ├── image_extractor.py   # Image extraction from pages
│   ├── image_downloader.py   # Async image downloading
│   ├── image_filter.py       # Image filtering and categorization
│   ├── brand_model_extractor.py  # Brand/model extraction
│   └── url_optimizer.py      # URL optimization for high quality
├── main.py                   # Entry point
├── start.sh                  # Start script (uses python3)
├── setup.sh                  # Setup script (uses python3)
├── requirements.txt          # Python dependencies
└── README.md                 # This file
```

## Requirements

- Python 3.8+
- Playwright
- aiohttp, aiofiles for async operations
- BeautifulSoup4 for HTML parsing

## Best Practices

1. **Respect Rate Limits**: The scraper includes built-in rate limiting (5 concurrent downloads)
2. **Check robots.txt**: Always verify the website's scraping policy
3. **Use Responsibly**: Don't overload the server with too many requests
4. **Legal Compliance**: Ensure your scraping activities comply with terms of service

## Troubleshooting

### Images not downloading
- Check your internet connection
- Verify the website is accessible
- Some images may require authentication

### Low quality images
- The scraper automatically requests highest quality, but some sites may limit resolution
- Check `metadata.json` to see the actual URLs being used

### Playwright errors
- Run `playwright install chromium` to ensure browsers are installed
- Try running with `headless=False` to debug

## License

This scraper is for educational and personal use. Always respect website terms of service and copyright laws.

