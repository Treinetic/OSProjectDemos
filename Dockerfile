# Stage 1: Build Frontend
FROM node:18 AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Setup PHP/Apache
FROM php:8.2-apache

# Install System Dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libmagickwand-dev \
    ghostscript \
    tesseract-ocr \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install PHP Extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && pecl install imagick \
    && docker-php-ext-enable imagick

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy Backend Files
COPY composer.json composer.lock ./
# Install PHP dependencies (no-dev for production-like, but maybe we want dev deps for demo? Let's stick to default or no-dev. 
# Plan implies production-like. Using --no-dev to keep it clean, unless verify needs it. The user didn't specify, but "demo" usually implies running code.
RUN composer install --no-dev --optimize-autoloader

# Copy API Source
COPY api/ ./api/

# Copy Built Frontend Assets from Stage 1
COPY --from=frontend-builder /app/dist/ ./

# Configure Apache DocumentRoot to serve from /var/www/html (which now has index.html and api folder)
# Default config is usually fine for this structure if we put index.html in root.
# But we need to handle the rewrites. Let's create a .htaccess or modify site config.
# Since we are copying to /var/www/html, we can rely on .htaccess if AllowOverride is All.
# Default php:apache image usually has AllowOverride None for /var/www/.
# Let's adjust apache config globally to allow .htaccess.
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Copy project root .htaccess if it exists, OR create one instructions said "Example .htaccess".
# I'll create the .htaccess file dynamically or assume the user will commit it?
# The request asked to "write a docker compose... based on the documentation".
# The documentation (README.md) has an example .htaccess. I should probably include that in the image or ensure it's created.
# I'll write the .htaccess content directly into the image to be safe and self-contained.
RUN echo "<IfModule mod_rewrite.c>\n\
    RewriteEngine On\n\
    # Serve API requests directly to PHP files\n\
    RewriteRule ^api/ - [L]\n\
    # For all other requests, serve the index.html (SPA Routing)\n\
    RewriteCond %{REQUEST_URI} !^/api/\n\
    RewriteCond %{REQUEST_FILENAME} !-f\n\
    RewriteCond %{REQUEST_FILENAME} !-d\n\
    RewriteRule ^ index.html [L]\n\
</IfModule>" > /var/www/html/.htaccess

# Copy custom PHP configuration to adjust error handling, resource limits, and required extensions
COPY php.ini /usr/local/etc/php/php.ini

# Set permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
