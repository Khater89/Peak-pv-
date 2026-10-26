FROM php:8.4-apache-bookworm

RUN sed -i 's|http://deb.debian.org|https://deb.debian.org|g' /etc/apt/sources.list.d/debian.sources \
    && apt-get update \
    && apt-get install -y --no-install-recommends libonig-dev libsqlite3-dev libzip-dev unzip \
    && docker-php-ext-install -j2 mbstring pdo_sqlite zip opcache \
    && a2dismod -f mpm_event mpm_worker \
    && a2enmod mpm_prefork rewrite \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
WORKDIR /var/www/html
COPY . .
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress --optimize-autoloader \
    && mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf
COPY docker/start.sh /usr/local/bin/energy-start
RUN chmod +x /usr/local/bin/energy-start \
    && printf 'Listen ${PORT}\n' > /etc/apache2/ports.conf

ENV PORT=8080 APP_ENV=production APP_DEBUG=false LOG_CHANNEL=stderr \
    DB_CONNECTION=sqlite DB_DATABASE=/data/database.sqlite \
    SESSION_DRIVER=database CACHE_STORE=database QUEUE_CONNECTION=sync \
    SITE_PREVIEW=true
EXPOSE 8080
CMD ["/usr/local/bin/energy-start"]
