# Migration 008: Listing table IDs from UUID to BIGSERIAL

## Summary

Converts primary key `id` from UUID to `BIGSERIAL` for:

- `tb_listing_properties`
- `tb_listing_images`
- `tb_listing_inquiries` (table name in DB is `tb_listing_inquiries`, not "enqueries")

Also updates all foreign keys that reference `tb_listing_properties(id)` (e.g. `property_id` in images and inquiries, and in optional 007 tables if present).

## How to run

**Single script:** Run the migration once (e.g. via Supabase CLI or SQL editor):

```bash
# If using Supabase CLI
supabase db push

# Or run the SQL file manually against your database
psql $DATABASE_URL -f supabase/migrations/008_listing_ids_uuid_to_bigserial.sql
```

No need to run multiple scripts; everything is in one migration. The migration:

1. Adds a new bigint column and backfills from existing rows (ordered by `created_at`).
2. Drops old UUID FKs and columns, renames the new column to `id`, re-adds FKs.
3. Does the same for `tb_listing_images.id` and `tb_listing_inquiries.id`.

## After migration

- **IDs** are integers (e.g. `1`, `2`). Use numeric type in TypeScript (`number`).
- **URLs** can still use the numeric id (e.g. `/listings/1`, `/admin/properties/1`).
- **Public identifier:** If you need a stable, non-sequential public id (e.g. for shareable links), use the existing `uuid` column on `tb_listing_properties` (and optionally on images) added in 007.

## Rollback

This migration is destructive (drops UUID columns). Back up your database before running. There is no automatic rollback script; restore from backup if you need to revert.
