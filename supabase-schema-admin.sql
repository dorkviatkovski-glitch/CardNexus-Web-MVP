
-- Add is_admin flag to Profile table
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Create an index for fast admin lookups
CREATE INDEX IF NOT EXISTS idx_profile_is_admin ON "Profile"(is_admin);

-- Add admin policies (admins can see everything)
CREATE POLICY "Admins can view all profiles" ON "Profile"
  FOR SELECT USING (is_admin = TRUE);

CREATE POLICY "Admins can view all collections" ON "Collection"
  FOR ALL USING (
    EXISTS (SELECT 1 FROM "Profile" WHERE user_id = auth.uid() AND is_admin = TRUE)
  );

CREATE POLICY "Admins can view all items" ON "CollectionItem"
  FOR ALL USING (
    EXISTS (SELECT 1 FROM "Profile" WHERE user_id = auth.uid() AND is_admin = TRUE)
  );
