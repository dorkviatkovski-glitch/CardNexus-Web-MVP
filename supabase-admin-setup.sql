-- Admin Dashboard Setup
-- Run this in Supabase SQL Editor

-- 1. Add is_admin flag to Profile
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- 2. Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM "Profile" WHERE user_id = user_uuid AND is_admin = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Update RLS to allow admins to view all collections/items
DROP POLICY IF EXISTS "Admins can view all collections" ON "Collection";
CREATE POLICY "Admins can view all collections" ON "Collection"
  FOR ALL USING (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can view all items" ON "CollectionItem";
CREATE POLICY "Admins can view all items" ON "CollectionItem"
  FOR ALL USING (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can view all profiles" ON "Profile";
CREATE POLICY "Admins can view all profiles" ON "Profile"
  FOR SELECT USING (is_admin(auth.uid()));

-- 4. (Optional) Set your own user as admin — replace with your actual user_id after first signup
-- UPDATE "Profile" SET is_admin = TRUE WHERE user_id = 'your-user-id-here';
