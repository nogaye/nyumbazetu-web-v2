-- Migration: Allow public read access to published listing comments and user display names.
-- Description: Ensures the listing detail page can show reviews and comments when using the anon key.
--              Only comments that are visible, published, and not deleted are readable.

-- tb_listing_comments: allow public SELECT for published, visible, non-deleted rows only
ALTER TABLE public.tb_listing_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published listing comments" ON public.tb_listing_comments;
CREATE POLICY "Public can read published listing comments"
  ON public.tb_listing_comments
  FOR SELECT
  USING (
    is_visible = true
    AND moderation_status = 'published'
    AND (is_deleted = false OR is_deleted IS NULL)
  );

-- tb_users: allow public SELECT so display_name can be shown for review/comment authors
ALTER TABLE public.tb_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read user display names" ON public.tb_users;
CREATE POLICY "Public can read user display names"
  ON public.tb_users
  FOR SELECT
  USING (true);
