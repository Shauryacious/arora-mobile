#!/usr/bin/env python3
"""
Main entry point for the phone image scraper
"""

import asyncio
import sys
from pathlib import Path

# Add src directory to path
sys.path.insert(0, str(Path(__file__).parent))

from src.scraper import PhoneImageScraper
from src.logger import get_logger


async def main():
    """Main function"""
    # Default URL
    url = "https://www.layers.shop/products/build-your-skin"
    
    # Allow URL to be passed as command line argument
    if len(sys.argv) > 1:
        url = sys.argv[1]
    
    # Allow output directory to be passed as second argument
    output_dir = "scraped_images"
    if len(sys.argv) > 2:
        output_dir = sys.argv[2]
    
    # Allow max concurrent downloads as third argument
    max_concurrent = 5
    if len(sys.argv) > 3:
        try:
            max_concurrent = int(sys.argv[3])
        except ValueError:
            logger = get_logger()
            logger.warning(f"Invalid max_concurrent value '{sys.argv[3]}', using default: 5")
    
    logger = get_logger("Main")
    logger.info("=" * 60)
    logger.info("Phone Image Scraper")
    logger.info("=" * 60)
    logger.info(f"URL: {url}")
    logger.info(f"Output directory: {output_dir}")
    logger.info(f"Max concurrent downloads: {max_concurrent}")
    logger.info("=" * 60)
    logger.info("")
    
    log_file = str(Path(output_dir) / 'scraper.log')
    scraper = PhoneImageScraper(
        output_dir=output_dir, 
        max_concurrent_downloads=max_concurrent,
        log_file=log_file
    )
    
    try:
        await scraper.scrape_page(url)
    except KeyboardInterrupt:
        logger.warning("\nScraping interrupted by user.")
        sys.exit(1)
    except Exception as e:
        logger.error(f"\nFatal error: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())

