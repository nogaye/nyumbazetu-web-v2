-- Migration: Replace tb_listing_reviews with unified tb_listing_comments (comments + reviews)
-- Description: Creates tb_listing_comments (comment_type: 'comment' | 'review'), tb_listing_comment_reactions,
--              migrates existing reviews into comments, then drops tb_listing_reviews.
-- Depends on: tb_listing_properties, tb_organizations, tb_branches, tb_users (must exist; create if needed).

-- =============================================================================
-- 1. Create enum for comment reactions (required by tb_listing_comment_reactions)
-- =============================================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_listing_comment_reaction_type') THEN
    CREATE TYPE public.enum_listing_comment_reaction_type AS ENUM (
      'like',
      'helpful',
      'love'
    );
  END IF;
END $$;
COMMENT ON TYPE public.enum_listing_comment_reaction_type IS 'Reaction type for listing comments: like, helpful, love.';

-- =============================================================================
-- 2. Create tb_listing_comments (unified table for comments and reviews)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.tb_listing_comments (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),

    org_id BIGINT NULL,
    branch_id BIGINT NULL,

    property_id BIGINT NOT NULL,
    parent_comment_id BIGINT NULL,
    user_id BIGINT NOT NULL,

    comment_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NULL,
    headline VARCHAR(255) NULL,
    body TEXT NOT NULL,

    rating NUMERIC(3,2) NULL,

    cleanliness_rating NUMERIC(3,2) NULL,
    accuracy_rating NUMERIC(3,2) NULL,
    communication_rating NUMERIC(3,2) NULL,
    location_rating NUMERIC(3,2) NULL,
    check_in_rating NUMERIC(3,2) NULL,
    value_rating NUMERIC(3,2) NULL,

    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    is_internal BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_verified_review BOOLEAN NOT NULL DEFAULT FALSE,

    moderation_status VARCHAR(50) NOT NULL DEFAULT 'published',
    is_edited BOOLEAN NOT NULL DEFAULT FALSE,
    edited_at TIMESTAMPTZ NULL,

    reply_count INT NOT NULL DEFAULT 0,
    like_count INT NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT NULL,
    deleted_at TIMESTAMPTZ NULL,
    deleted_by BIGINT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT uq_tb_listing_comments_uuid UNIQUE (uuid),

    CONSTRAINT fk_tb_listing_comments_org
        FOREIGN KEY (org_id)
        REFERENCES public.tb_organizations(id),

    CONSTRAINT fk_tb_listing_comments_branch
        FOREIGN KEY (branch_id)
        REFERENCES public.tb_branches(id),

    CONSTRAINT fk_tb_listing_comments_property
        FOREIGN KEY (property_id)
        REFERENCES public.tb_listing_properties(id),

    CONSTRAINT fk_tb_listing_comments_parent
        FOREIGN KEY (parent_comment_id)
        REFERENCES public.tb_listing_comments(id),

    CONSTRAINT fk_tb_listing_comments_user
        FOREIGN KEY (user_id)
        REFERENCES public.tb_users(id),

    CONSTRAINT chk_tb_listing_comments_type
        CHECK (comment_type IN ('comment', 'review')),

    CONSTRAINT chk_tb_listing_comments_body_not_blank
        CHECK (length(trim(body)) > 0),

    CONSTRAINT chk_tb_listing_comments_not_self_parent
        CHECK (parent_comment_id IS NULL OR parent_comment_id <> id),

    CONSTRAINT chk_tb_listing_comments_rating_range
        CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),

    CONSTRAINT chk_tb_listing_comments_cleanliness_rating_range
        CHECK (cleanliness_rating IS NULL OR (cleanliness_rating >= 1 AND cleanliness_rating <= 5)),

    CONSTRAINT chk_tb_listing_comments_accuracy_rating_range
        CHECK (accuracy_rating IS NULL OR (accuracy_rating >= 1 AND accuracy_rating <= 5)),

    CONSTRAINT chk_tb_listing_comments_communication_rating_range
        CHECK (communication_rating IS NULL OR (communication_rating >= 1 AND communication_rating <= 5)),

    CONSTRAINT chk_tb_listing_comments_location_rating_range
        CHECK (location_rating IS NULL OR (location_rating >= 1 AND location_rating <= 5)),

    CONSTRAINT chk_tb_listing_comments_check_in_rating_range
        CHECK (check_in_rating IS NULL OR (check_in_rating >= 1 AND check_in_rating <= 5)),

    CONSTRAINT chk_tb_listing_comments_value_rating_range
        CHECK (value_rating IS NULL OR (value_rating >= 1 AND value_rating <= 5)),

    CONSTRAINT chk_tb_listing_comments_review_rules
        CHECK (
            (
                comment_type = 'review'
                AND parent_comment_id IS NULL
                AND rating IS NOT NULL
            )
            OR
            (
                comment_type = 'comment'
            )
        )
);

COMMENT ON TABLE public.tb_listing_comments IS 'Unified comments and reviews for listings; comment_type distinguishes comment vs review; reviews have rating and optional sub-ratings.';
COMMENT ON COLUMN public.tb_listing_comments.comment_type IS 'comment: Q&A/discussion; review: guest review with rating.';
COMMENT ON COLUMN public.tb_listing_comments.rating IS 'Overall rating 1–5 for reviews; NULL for comments.';
COMMENT ON COLUMN public.tb_listing_comments.is_verified_review IS 'True when the review is from a verified stay (e.g. linked reservation).';
COMMENT ON COLUMN public.tb_listing_comments.moderation_status IS 'pending, published, hidden, flagged, rejected.';

CREATE INDEX IF NOT EXISTS idx_tb_listing_comments_property_id ON public.tb_listing_comments(property_id);
CREATE INDEX IF NOT EXISTS idx_tb_listing_comments_comment_type ON public.tb_listing_comments(comment_type);
CREATE INDEX IF NOT EXISTS idx_tb_listing_comments_parent_comment_id ON public.tb_listing_comments(parent_comment_id);
CREATE INDEX IF NOT EXISTS idx_tb_listing_comments_user_id ON public.tb_listing_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_tb_listing_comments_visible_published ON public.tb_listing_comments(property_id, is_visible, is_deleted) WHERE moderation_status = 'published';

-- =============================================================================
-- 3. Create tb_listing_comment_reactions
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.tb_listing_comment_reactions (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),

    org_id BIGINT NULL,
    branch_id BIGINT NULL,

    property_id BIGINT NOT NULL,
    comment_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,

    reaction_type public.enum_listing_comment_reaction_type NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT NULL,
    deleted_at TIMESTAMPTZ NULL,
    deleted_by BIGINT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT uq_tb_listing_comment_reactions_uuid UNIQUE (uuid),

    CONSTRAINT fk_tb_listing_comment_reactions_org
        FOREIGN KEY (org_id)
        REFERENCES public.tb_organizations(id),

    CONSTRAINT fk_tb_listing_comment_reactions_branch
        FOREIGN KEY (branch_id)
        REFERENCES public.tb_branches(id),

    CONSTRAINT fk_tb_listing_comment_reactions_property
        FOREIGN KEY (property_id)
        REFERENCES public.tb_listing_properties(id),

    CONSTRAINT fk_tb_listing_comment_reactions_comment
        FOREIGN KEY (comment_id)
        REFERENCES public.tb_listing_comments(id),

    CONSTRAINT fk_tb_listing_comment_reactions_user
        FOREIGN KEY (user_id)
        REFERENCES public.tb_users(id),

    CONSTRAINT chk_tb_listing_comment_reactions_not_self_deleted
        CHECK (is_deleted IN (TRUE, FALSE))
);

COMMENT ON TABLE public.tb_listing_comment_reactions IS 'Reactions (e.g. like, helpful) on listing comments.';

CREATE INDEX IF NOT EXISTS idx_tb_listing_comment_reactions_comment_id ON public.tb_listing_comment_reactions(comment_id);
CREATE INDEX IF NOT EXISTS idx_tb_listing_comment_reactions_user_comment ON public.tb_listing_comment_reactions(comment_id, user_id) WHERE is_deleted = FALSE;

-- =============================================================================
-- 4. Ensure tb_users exists (minimal stub for FK; id BIGSERIAL)
--     Skip if you already have a proper tb_users table.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.tb_users (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    email VARCHAR(255) NULL,
    display_name VARCHAR(255) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_tb_users_uuid UNIQUE (uuid)
);

COMMENT ON TABLE public.tb_users IS 'Stub user table for listing comments/reviews; extend or replace with your auth profile table.';

-- =============================================================================
-- 5. Migrate existing tb_listing_reviews into tb_listing_comments (review type)
--    user_id: use created_by when present, otherwise 1 (ensure id 1 exists in tb_users).
-- =============================================================================

DO $$
DECLARE
  _need_user_one BOOLEAN;
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_reviews') THEN
    -- Ensure we have at least one user for migrated rows that lack created_by
    INSERT INTO public.tb_users (id, email, display_name)
    SELECT 1, 'system@nyumbazetu.local', 'System'
    WHERE NOT EXISTS (SELECT 1 FROM public.tb_users WHERE id = 1);

    INSERT INTO public.tb_listing_comments (
        org_id,
        branch_id,
        property_id,
        parent_comment_id,
        user_id,
        comment_type,
        title,
        headline,
        body,
        rating,
        is_visible,
        is_verified_review,
        moderation_status,
        created_at,
        created_by,
        updated_at,
        updated_by,
        deleted_at,
        deleted_by,
        is_deleted
    )
    SELECT
        r.org_id,
        r.branch_id,
        r.property_id,
        NULL,
        COALESCE(r.created_by::BIGINT, 1),
        'review',
        r.review_title,
        r.review_title,
        COALESCE(NULLIF(trim(r.review_text), ''), '(No text)'),
        r.rating::NUMERIC(3,2),
        r.is_visible,
        r.is_verified,
        'published',
        r.created_at,
        r.created_by,
        r.updated_at,
        r.updated_by,
        r.deleted_at,
        r.deleted_by,
        r.is_deleted
    FROM public.tb_listing_reviews r
    WHERE r.is_deleted = FALSE;
  END IF;
END $$;

-- =============================================================================
-- 6. Drop tb_listing_reviews
-- =============================================================================

DROP TABLE IF EXISTS public.tb_listing_reviews;
