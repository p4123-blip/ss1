-- Allow authenticated users (clinic staff who are logged in) to manage eye_conditions and eye_topics
-- Anon/public users can only read published rows (existing policies remain)

DROP POLICY IF EXISTS "auth_write_eye_conditions" ON eye_conditions;
CREATE POLICY "auth_write_eye_conditions"
ON eye_conditions FOR ALL
TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_write_eye_topics" ON eye_topics;
CREATE POLICY "auth_write_eye_topics"
ON eye_topics FOR ALL
TO authenticated
USING (true) WITH CHECK (true);