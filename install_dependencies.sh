#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting System Dependency Installation..."

# 1. Update System & Install Core Tools
echo "📦 Updating repositories and installing core tools..."
sudo apt-get update
sudo apt-get install -y software-properties-common curl git unzip zip

# 2. Add PHP Repository (ppa:ondrej/php) for latest versions
echo "🐘 Adding PHP repository..."
sudo add-apt-repository -y ppa:ondrej/php
sudo apt-get update

# 3. Install PHP 8.2 and Extensions
# (Adjust version if strictly stuck to 8.0 or 8.1, but 8.2 is safe for modern libs)
echo "🐘 Installing PHP 8.2 and extensions..."
sudo apt-get install -y \
    php8.2 \
    php8.2-cli \
    php8.2-fpm \
    php8.2-common \
    php8.2-gd \
    php8.2-imagick \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-zip \
    php8.2-curl \
    php8.2-bcmath \
    php8.2-intl

# 4. Install System Libraries (Ghostscript, Tesseract)
echo "👻 Installing Ghostscript (for PDFLib)..."
sudo apt-get install -y ghostscript

echo "📖 Installing Tesseract OCR (for OCR features)..."
sudo apt-get install -y tesseract-ocr
# Optional: Install specific language packs if needed, e.g., tesseract-ocr-eng

# 5. Install Composer
echo "🎼 Installing Composer..."
if ! command -v composer &> /dev/null; then
    curl -sS https://getcomposer.org/installer | php
    sudo mv composer.phar /usr/local/bin/composer
else
    echo "   Composer is already installed."
fi

# 6. Install Node.js (Latest LTS)
echo "🟢 Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "   Node.js is already installed."
fi

echo "✅ System dependencies installed successfully!"

# 7. Install Project Dependencies
echo "📂 Installing Project Dependencies..."

# Check if we are in the project directory
if [ -f "composer.json" ]; then
    echo "   Running composer install..."
    composer install --no-dev --optimize-autoloader
else
    echo "⚠️  composer.json not found. Skipping composer install."
fi

if [ -f "package.json" ]; then
    echo "   Running npm install..."
    npm install
else
    echo "⚠️  package.json not found. Skipping npm install."
fi

echo "🎉 Setup Complete! You can now build and deploy the application."
