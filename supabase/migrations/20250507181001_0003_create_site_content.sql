-- Table to store general site content (e.g., About Us, Contact Info)
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  content_key TEXT NOT NULL UNIQUE, -- e.g., 'about_us_paragraph_1', 'contact_email'
  content_en TEXT,
  content_az TEXT,
  content_type TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'markdown', 'html')), -- To specify if content is plain text, markdown, or HTML
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- Trigger to update_at timestamp on site_content update
CREATE TRIGGER on_site_content_updated
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Row Level Security (RLS) for site_content table
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to all site content
CREATE POLICY "Allow public read access to site_content"
  ON public.site_content FOR SELECT
  USING (true);

-- Policy: Allow admin users to insert site content
CREATE POLICY "Allow admin insert access to site_content"
  ON public.site_content FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Policy: Allow admin users to update site content
CREATE POLICY "Allow admin update access to site_content"
  ON public.site_content FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Policy: Allow admin users to delete site content
CREATE POLICY "Allow admin delete access to site_content"
  ON public.site_content FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Function to get profile role
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT AS $$
DECLARE
  profile_role TEXT;
BEGIN
  SELECT role INTO profile_role FROM public.profiles WHERE id = auth.uid();
  RETURN profile_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute on function to authenticated users
GRANT EXECUTE ON FUNCTION public.get_my_role() TO authenticated;

-- Seed initial site content (optional, can be done via UI or another script)
-- Example:
-- INSERT INTO public.site_content (content_key, content_en, content_az, content_type, created_by)
-- VALUES
--   ('home_page_title', 'Welcome to SSTCC!', 'TETYM-ə Xoş Gəlmisiniz!', 'text', (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1)),
--   ('about_us_main', 'SSTCC is dedicated to fostering innovation...', 'TETYM innovasiyaların təşviqinə həsr olunub...', 'markdown', (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1));

