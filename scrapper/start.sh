#!/bin/bash

# Start script for Phone Image Scraper
# Usage: ./start.sh [url] [output_dir] [max_concurrent]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if virtual environment exists and activate it
if [ -d "venv" ]; then
    echo "🔌 Activating virtual environment..."
    source venv/bin/activate
fi

# Check if dependencies are installed
if ! python3 -c "import playwright" 2>/dev/null; then
    echo "⚠️  Dependencies not installed. Running setup..."
    ./setup.sh
    if [ -d "venv" ]; then
        source venv/bin/activate
    fi
fi

# Run the scraper with provided arguments
echo "🚀 Starting scraper..."
echo ""
python3 main.py "$@"

