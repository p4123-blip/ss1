/*
# Create contact_submissions table (single-tenant, no auth)

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text, not null) — the submitter's full name
  - `email` (text, not null) — the submitter's email address
  - `phone` (text, nullable) — optional phone number
  - `subject` (text, nullable) — optional subject line
  - `message` (text, not null) — the message body
<<<<<<< HEAD
  - `location` (text, nullable) — which clinic they're contacting (Harimau Tarum / Tun Aminah)
=======
  - `location` (text, nullable) — which clinic they're contacting (Singapore / Johor Bahru)
>>>>>>> 7d8de01a527e7d2c3d8ff76d481baf478d3b81f9
  - `status` (text, default 'new') — for clinic staff to track (new, read, responded)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated to INSERT (so the public contact form works without sign-in).
- No SELECT/UPDATE/DELETE for anon or authenticated — only service role can read/manage submissions.
  This protects patient data: clinic staff use the Supabase dashboard (service role) to view submissions.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  location text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public insert (contact form)
DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies: only service role (dashboard) can read/manage.
