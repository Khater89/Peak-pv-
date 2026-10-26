# Energy Mode acceptance cases

- GET / returns the Energy Mode brand, services, process, components, projects empty state, FAQ, consultation form and a clear pre-launch notice.
- Submit Jane Doe, jane@example.org, +962 7 9000 0000, residential, Amman, a 20-character message, and checked consent. Expect one durable lead with a unique reference, redirect to consultation section, and a saved-only confirmation. No email delivery claim.
- Omit name or consent, use an invalid email or unknown project type. Expect field-specific errors, retained valid text, and no new lead.
- Send HTML as a name or message. Persist only as text; never render it as markup.
- Repeat the same submission token. Expect the existing reference and exactly one record.
- Simulate storage failure. Expect a failure message and retained input, never a success confirmation.
- More than five submissions per minute from one client returns HTTP 429 with a readable retry message.
- Verify the live form rejects requests without a CSRF token (419).
- Check 360px and desktop layouts, keyboard focus, native FAQ operation and reduced motion.

## Open launch requirements

Confirm real services, service area, contact details, privacy contact and retention policy before accepting public enquiries. Supply authorized project imagery and certification evidence before publishing proof content. The initial site labels itself a pre-launch preview. No real enquiries should be entered into a development environment.

## Storage contract

Leads belong to the site operator; no public list/read/update/delete endpoint. Fields: unique UUID reference and submission token, name (120 chars), email (254), phone (40), property type (residential/commercial/other), location (160), message (2000), consent timestamp and timestamps. Creates are immutable through the public interface; retries use the submission token and cannot overwrite the original record. Operators access records via trusted server/database access only. Default cleanup deletes leads older than 90 days on the scheduled `leads:prune` command; operator must approve this policy before launch. Backups require the same retention/access policy.
