# Energy Mode

A responsive English solar/PV company website built with Laravel 13, Blade, plain CSS/JavaScript, and SQLite. No frontend build or external font/image service is required for the live page.

## Run locally

Requirements: PHP 8.4+, Composer 2, and PHP extensions ctype, curl, dom, fileinfo, mbstring, PDO, pdo_sqlite, tokenizer, XML and zip.

```sh
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --force
php artisan serve
```

On the prepared cloud machine, PHP and Composer also exist under `/workspace/runtime`:

```sh
export PATH="/workspace/runtime/bin:$PATH"
export PHPRC=/workspace/runtime/php.ini
php /workspace/runtime/composer.phar install --prefer-source --no-interaction
# .env, APP_KEY and the SQLite database are already prepared; preserve them.
cd public
php -S 0.0.0.0:8000 -t . ../vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php
```

Use an available port if 8000 is occupied. The cloud PHP installation uses a wrapper for its private shared libraries; the direct PHP server command above preserves that setup.

## What works

- Sticky navigation and consultation CTA, services, process and system education, responsive layout and native keyboard-accessible FAQ accordions.
- Server-validated consultation form, CSRF protection, honeypot, five submissions/minute/client, immutable records, and UUID submission tokens for safe retries.
- Real SQLite persistence and a saved-record reference; no mail delivery or appointment is implied.
- Specific validation feedback with retained input, duplicate prevention, storage-failure handling, loading state, and retry feedback.
- A verified-project empty state. The solar artwork is an original concept illustration, not installation photography.

## Content and launch settings

Edit `config/site.php` for services and FAQs; edit `resources/views/home.blade.php` for page copy and `public/site.css` for design. Content editing is file-based; there is no public admin or login.

`.env.example` documents `SITE_PREVIEW`, `SITE_CONTACT_EMAIL`, `SITE_CONTACT_PHONE`, and `SITE_SERVICE_AREA`. The preview banner is enabled by default. Confirm the company identity, actual service offerings, contact details, privacy contact, service area, and follow-up process before setting `SITE_PREVIEW=false`.

No testimonials, certifications, savings claims, or completed installations are fabricated. Add approved proof and project photography when available. The initial request workflow saves to the operator’s database; email/CRM integration is not configured. Never put real enquiries into this development environment.

## Data and operations

The SQLite file is `database/database.sqlite`, ignored by Git. Back up the database securely and mount persistent writable storage in production. There is no public route to browse, edit, or delete leads. Operators must use trusted server/database access with appropriate access control. See `docs/acceptance.md` for the data contract and launch decisions.

The scheduled `php artisan leads:prune` command deletes leads older than 90 days. Approve the retention policy before launch, then run Laravel's scheduler every minute (`php artisan schedule:run`) through the hosting platform. Backups need equivalent retention/access rules.

Production requires a PHP web server with document root `public/`, HTTPS, `APP_ENV=production`, `APP_DEBUG=false`, a unique retained `APP_KEY`, writable `storage/` and `bootstrap/cache/`, persistent database storage, migrations, backups, and a scheduler. Install dependencies using `composer install --no-dev --optimize-autoloader`. Run `php artisan optimize` after configuring the environment. GitHub Pages cannot host this PHP backend.

## Validation

```sh
php artisan test --compact
php artisan view:cache
vendor/bin/pint --dirty --format agent
```

Feature tests cover persistence, validation, safe retries, escaping, storage failure, throttling, public data access boundaries and retention. The page works without JavaScript; CSS, artwork, and scripts are local. Form submissions always require the running PHP server and database. Static HTML or opening files with `file://` cannot save enquiries.

Source is delivered in this repository, with locked PHP dependencies. A production deployment uses the source and Composer dependencies; there is no standalone static build ZIP.
