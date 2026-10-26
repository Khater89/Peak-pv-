#!/bin/sh
set -eu

if [ -z "${APP_KEY:-}" ]; then
    echo 'APP_KEY is required. Add a stable Laravel application key in Railway Variables.' >&2
    exit 1
fi

if [ -z "${APP_URL:-}" ] && [ -n "${RAILWAY_PUBLIC_DOMAIN:-}" ]; then
    export APP_URL="https://${RAILWAY_PUBLIC_DOMAIN}"
fi

php -r '
$url = getenv("APP_URL");
if (! $url || ! filter_var($url, FILTER_VALIDATE_URL) || ! in_array(parse_url($url, PHP_URL_SCHEME), ["http", "https"], true)) {
    fwrite(STDERR, "APP_URL must be the actual site URL, such as https://your-site.up.railway.app, with no angle brackets or spaces. Set it in Railway Variables, or remove it to use RAILWAY_PUBLIC_DOMAIN after generating a public domain.\n");
    exit(1);
}
'

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

# mod_php requires exactly one MPM: prefork. Normalize again at runtime.
a2dismod -f mpm_event mpm_worker
a2enmod mpm_prefork rewrite
apache2ctl -t

# Volumes are mounted at runtime, not during a pre-deploy command or image build.
php artisan config:clear
php artisan migrate --force --no-interaction
php artisan optimize
exec apache2-foreground
