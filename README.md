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

## Deploy to Railway

1. Create a Railway project → **Deploy from GitHub repo** → `Khater89/Sun-Mode-`, branch `main`. The repository's `Dockerfile` and `railway.json` configure the PHP/Apache build and `/up` health check. Do not add a separate build/start/pre-deploy command.
2. Attach a **Volume** to the web service, mounted at **`/data`**. Use **one replica**, not multiple replicas sharing SQLite. Keep this volume across deployments and enable backups. A deployment without the volume can run but its data will be ephemeral.
3. Add the following service **Variables** before deploying:

   ```dotenv
   APP_NAME="Energy Mode"
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=<your stable Laravel application key>
   APP_URL=https://<your-generated-domain>.up.railway.app
   DB_CONNECTION=sqlite
   DB_DATABASE=/data/database.sqlite
   SESSION_DRIVER=database
   SESSION_SECURE_COOKIE=true
   CACHE_STORE=database
   LOG_CHANNEL=stderr
   QUEUE_CONNECTION=sync
   SITE_PREVIEW=true
   ```

   Generate an application key locally with `php artisan key:generate --show` (or a cryptographically secure 32-byte key encoded as `base64:...`). Copy it directly into Railway's secret Variables; do not commit it or post it in chat. Generate it once and retain it across deployments. Railway supplies `PORT`; do not override it unnecessarily.
4. In **Settings → Networking**, generate a public domain. Set `APP_URL` to its exact HTTPS URL and redeploy if required. Laravel trusts the Railway proxy so assets, form actions and redirects use HTTPS. Deploy this container only behind a trusted reverse proxy; do not expose its port directly on an untrusted network.
5. After deployment, open `/up` (expect HTTP 200), then the home page. Submit test details in the form and retain the reference. Redeploy and verify the same test record still exists through trusted Railway shell/database access. Check logs for migration errors and verify `/data` is mounted before entering real data.

The container migrates the existing database at startup and never regenerates `APP_KEY` or deletes records. Builds contain no `.env`, local database, or local vendor directory. Production Composer dependencies are installed from `composer.lock`. PHP/Apache listens on Railway's `PORT`. Railway hosting may incur charges.

**Before public launch:** confirm company details, privacy and retention policy, and follow-up workflow; configure contact variables described above, then change `SITE_PREVIEW=false`. The initial website stores requests but does not send emails. Hosting on Railway does not configure an email inbox or CRM.

**Retention:** this web container does not run Laravel's scheduler. For the proposed 90-day policy, schedule `php artisan leads:prune` against this service and its mounted volume through your operations tooling, or run it through trusted Railway service shell access. Do not assume a separate Railway cron service can access this service's SQLite volume. Until you configure and verify cleanup, automatic deletion is not active. Consider managed PostgreSQL if multiple replicas or separate worker/scheduler services are needed.
