-- Ideas (or Projects) table
CREATE TABLE public.ideas (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL, -- Or ON DELETE CASCADE if ideas must be deleted with user
  title_az TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_az TEXT NOT NULL,
  description_en TEXT NOT NULL,
  category_az TEXT,
  category_en TEXT,
  status TEXT DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected', 'in_progress', 'completed')),
  submission_date TIMESTAMPTZ DEFAULT NOW(),
  cover_image_url TEXT,
  tags_az TEXT[],
  tags_en TEXT[],
  team_members JSONB,
  contact_email TEXT NOT NULL, -- Consider adding a CHECK for email format if needed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to update_at timestamp on idea update
CREATE TRIGGER on_ideas_updated
  BEFORE UPDATE ON public.ideas
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Idea Attachments table
CREATE TABLE public.idea_attachments (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  idea_id UUID NOT NULL REFERENCES public.ideas(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL, -- Should correspond to a Supabase Storage path
  file_type TEXT, -- e.g., 'image', 'document', 'video'
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(), -- created_at for the attachment record itself
  updated_at TIMESTAMPTZ DEFAULT NOW() -- updated_at for the attachment record itself
);

-- Trigger to update_at timestamp on idea_attachment update
CREATE TRIGGER on_idea_attachments_updated
  BEFORE UPDATE ON public.idea_attachments
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Row Level Security (RLS) for ideas table
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to approved ideas"
  ON public.ideas FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Allow users to read their own pending/rejected ideas"
  ON public.ideas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to insert new ideas"
  ON public.ideas FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

CREATE POLICY "Allow idea owner to update their own idea if pending_review"
  ON public.ideas FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending_review')
  WITH CHECK (auth.uid() = user_id AND status = 'pending_review');

-- Note: Deletion of ideas might be restricted or handled by admins.
-- CREATE POLICY "Allow idea owner to delete their own idea if pending_review"
--   ON public.ideas FOR DELETE
--   USING (auth.uid() = user_id AND status = 'pending_review');

-- Row Level Security (RLS) for idea_attachments table
ALTER TABLE public.idea_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read attachments for approved ideas"
  ON public.idea_attachments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.ideas
      WHERE public.ideas.id = idea_id AND public.ideas.status = 'approved'
    )
  );

CREATE POLICY "Allow users to read attachments for their own ideas"
  ON public.idea_attachments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.ideas
      WHERE public.ideas.id = idea_id AND public.ideas.user_id = auth.uid()
    )
  );

CREATE POLICY "Allow idea owner to insert attachments for their idea"
  ON public.idea_attachments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.ideas
      WHERE public.ideas.id = idea_id AND public.ideas.user_id = auth.uid()
    )
  );

CREATE POLICY "Allow idea owner to delete attachments for their idea"
  ON public.idea_attachments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.ideas
      WHERE public.ideas.id = idea_id AND public.ideas.user_id = auth.uid()
    )
  );

-- Indexes for common query patterns
CREATE INDEX idx_ideas_user_id ON public.ideas(user_id);
CREATE INDEX idx_ideas_status ON public.ideas(status);
CREATE INDEX idx_idea_attachments_idea_id ON public.idea_attachments(idea_id);
