#!/bin/sh
set -eu

if [ -z "${APP_KEY:-}" ]; then
    echo 'APP_KEY is required. Add a stable Laravel application key in Railway Variables.' >&2
    exit 1
fi

case "${PORT:-}" in
    ''|*[!0-9]*) echo 'PORT must be a numeric TCP port.' >&2; exit 1 ;;
esac

if [ "${DB_CONNECTION:-sqlite}" = 'sqlite' ]; then
    if [ "${DB_DATABASE:-}" != '/data/database.sqlite' ]; then
        echo 'SQLite must use DB_DATABASE=/data/database.sqlite with a Railway volume mounted at /data.' >&2
        exit 1
    fi
    mkdir -p /data
    touch /data/database.sqlite
    chown www-data:www-data /data /data/database.sqlite
    chmod 770 /data
    chmod 660 /data/database.sqlite
fi

# Volumes are mounted at runtime, not during a pre-deploy command or image build.
php artisan config:clear
php artisan migrate --force --no-interaction
php artisan optimize
exec apache2-foreground
