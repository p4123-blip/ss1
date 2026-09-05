/*
# Create eye_conditions and eye_topics tables

1. New Tables
- `eye_conditions`
  - id (uuid, primary key)
  - slug (text, unique, not null) — URL-friendly identifier
  - title (text, not null) — condition name
  - category (text, not null) — grouping: e.g. "Refractive Errors", "Eye Infections", "Age-Related", "Eye Emergencies"
  - summary (text, not null) — short one-line description for cards
  - symptoms (text[], not null) — list of symptoms
  - home_care (text[], not null) — list of home care tips
  - when_to_seek_help (text[], not null) — list of warning signs requiring professional care
  - image_url (text) — optional hero image URL
  - sort_order (integer, default 0) — ordering within category
  - published (boolean, default true) — allows draft/unpublished conditions to be hidden
  - created_at (timestamptz, default now())
  - updated_at (timestamptz, default now())

- `eye_topics`
  - id (uuid, primary key)
  - slug (text, unique, not null) — URL-friendly identifier
  - title (text, not null) — article title
  - excerpt (text, not null) — short summary for cards/preview
  - content (text, not null) — full article body (plain text / simple paragraphs separated by \n\n)
  - author (text) — optional author name
  - category (text) — optional category tag
  - image_url (text) — optional hero image URL
  - sort_order (integer, default 0)
  - published (boolean, default true)
  - published_at (timestamptz, default now()) — display date
  - created_at (timestamptz, default now())
  - updated_at (timestamptz, default now())

2. Indexes
- eye_conditions: index on (category), index on (slug), index on (published)
- eye_topics: index on (slug), index on (published), index on (published_at desc)

3. Security
- Enable RLS on both tables.
- Public read (anon + authenticated SELECT) for published rows only.
- No public insert/update/delete — content is managed via the Supabase dashboard by clinic staff.

4. Important Notes
- These are content tables for a no-auth public website. Visitors can read published content; only staff with dashboard access can create/edit.
- The `published` flag lets staff draft content without it appearing on the site.
- `sort_order` lets staff control display ordering without editing timestamps.
*/

-- ── eye_conditions ──
CREATE TABLE IF NOT EXISTS eye_conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  summary text NOT NULL,
  symptoms text[] NOT NULL DEFAULT '{}',
  home_care text[] NOT NULL DEFAULT '{}',
  when_to_seek_help text[] NOT NULL DEFAULT '{}',
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE eye_conditions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_eye_conditions_category ON eye_conditions(category);
CREATE INDEX IF NOT EXISTS idx_eye_conditions_slug ON eye_conditions(slug);
CREATE INDEX IF NOT EXISTS idx_eye_conditions_published ON eye_conditions(published);

DROP POLICY IF EXISTS "public_read_eye_conditions" ON eye_conditions;
CREATE POLICY "public_read_eye_conditions"
ON eye_conditions FOR SELECT
TO anon, authenticated
USING (published = true);

-- ── eye_topics ──
CREATE TABLE IF NOT EXISTS eye_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text,
  category text,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE eye_topics ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_eye_topics_slug ON eye_topics(slug);
CREATE INDEX IF NOT EXISTS idx_eye_topics_published ON eye_topics(published);
CREATE INDEX IF NOT EXISTS idx_eye_topics_published_at ON eye_topics(published_at DESC);

DROP POLICY IF EXISTS "public_read_eye_topics" ON eye_topics;
CREATE POLICY "public_read_eye_topics"
ON eye_topics FOR SELECT
TO anon, authenticated
USING (published = true);