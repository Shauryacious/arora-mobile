#!/bin/bash

# Setup script for Phone Image Scraper

echo "🚀 Setting up Phone Image Scraper..."

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Create virtual environment (optional but recommended)
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "📥 Installing Python dependencies..."
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
python3 -m playwright install chromium

echo "✅ Setup complete!"
echo ""
echo "To run the scraper:"
echo "  ./start.sh                    # Basic usage"
echo "  ./start.sh [url]              # Custom URL"
echo "  ./start.sh [url] [output_dir]  # Custom URL and output"
echo ""

