-- Migration: Create organizations and tb_branches for listing schema
-- Description: Adds organization and branch tables required by listing FKs.
--              Run before 007_listing_schema_full.sql.

-- Organizations: tenant/company that owns branches and listings.
CREATE TABLE IF NOT EXISTS public.tb_organizations (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.tb_organizations IS 'Tenant/company that owns branches and listing data; used for multi-tenant scoping.';
COMMENT ON COLUMN public.tb_organizations.id IS 'Primary key.';
COMMENT ON COLUMN public.tb_organizations.name IS 'Display name of the organization.';
COMMENT ON COLUMN public.tb_organizations.slug IS 'URL-friendly unique identifier for the organization.';
COMMENT ON COLUMN public.tb_organizations.is_active IS 'Whether the organization is active and can use the system.';
COMMENT ON COLUMN public.tb_organizations.created_at IS 'When the record was created.';
COMMENT ON COLUMN public.tb_organizations.updated_at IS 'When the record was last updated.';

-- Branches: subdivision of an organization (e.g. location or department).
CREATE TABLE IF NOT EXISTS public.tb_branches (
  id BIGSERIAL PRIMARY KEY,
  org_id BIGINT NULL,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_tb_branches_org
    FOREIGN KEY (org_id)
    REFERENCES public.tb_organizations(id)
);

COMMENT ON TABLE public.tb_branches IS 'Branch or location within an organization; used to scope listings and amenities.';
COMMENT ON COLUMN public.tb_branches.id IS 'Primary key.';
COMMENT ON COLUMN public.tb_branches.org_id IS 'Organization this branch belongs to; NULL for global/shared branches.';
COMMENT ON COLUMN public.tb_branches.name IS 'Display name of the branch.';
COMMENT ON COLUMN public.tb_branches.code IS 'Optional short code for the branch.';
COMMENT ON COLUMN public.tb_branches.is_active IS 'Whether the branch is active.';
COMMENT ON COLUMN public.tb_branches.created_at IS 'When the record was created.';
COMMENT ON COLUMN public.tb_branches.updated_at IS 'When the record was last updated.';

CREATE INDEX IF NOT EXISTS idx_tb_branches_org_id ON public.tb_branches(org_id);
