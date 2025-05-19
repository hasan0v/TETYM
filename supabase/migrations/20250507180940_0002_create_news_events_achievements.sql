-- News Articles table
CREATE TABLE public.news_articles (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  title_az TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_az TEXT NOT NULL,
  content_en TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Can be SSTCC admin, so nullable or linked to a generic SSTCC user
  publication_date TIMESTAMPTZ DEFAULT NOW(),
  cover_image_url TEXT,
  tags_az TEXT[],
  tags_en TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER on_news_articles_updated
  BEFORE UPDATE ON public.news_articles
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  title_az TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_az TEXT NOT NULL,
  description_en TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location_az TEXT,
  location_en TEXT,
  cover_image_url TEXT,
  registration_link TEXT,
  organizer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER on_events_updated
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  title_az TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_az TEXT NOT NULL,
  description_en TEXT NOT NULL,
  achieved_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  achieved_by_idea_id UUID REFERENCES public.ideas(id) ON DELETE SET NULL,
  date_achieved DATE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER on_achievements_updated
  BEFORE UPDATE ON public.achievements
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- RLS for news_articles
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to news articles"
  ON public.news_articles FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to news_articles"
  ON public.news_articles FOR ALL
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

-- RLS for events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to events"
  ON public.events FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to events"
  ON public.events FOR ALL
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

-- RLS for achievements
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to achievements"
  ON public.achievements FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to achievements"
  ON public.achievements FOR ALL
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

-- Indexes
CREATE INDEX idx_news_articles_publication_date ON public.news_articles(publication_date DESC);
CREATE INDEX idx_events_start_time ON public.events(start_time DESC);
CREATE INDEX idx_achievements_date_achieved ON public.achievements(date_achieved DESC);
