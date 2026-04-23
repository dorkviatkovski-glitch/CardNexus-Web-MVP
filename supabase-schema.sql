-- CardNexus Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (managed by Supabase Auth, but we add profile relation)
-- Note: auth.users is handled by Supabase automatically

-- Profiles table
CREATE TABLE IF NOT EXISTS "Profile" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collections table
CREATE TABLE IF NOT EXISTS "Collection" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collection Items (cards)
CREATE TABLE IF NOT EXISTS "CollectionItem" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id UUID NOT NULL REFERENCES "Collection"(id) ON DELETE CASCADE,
  card_name TEXT NOT NULL,
  card_set TEXT NOT NULL,
  card_number TEXT,
  rarity TEXT,
  condition TEXT,
  purchase_price DECIMAL(10,2),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Price History
CREATE TABLE IF NOT EXISTS "PricePoint" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL REFERENCES "CollectionItem"(id) ON DELETE CASCADE,
  value DECIMAL(10,2) NOT NULL,
  provider TEXT DEFAULT 'mock',
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shared Collection Members
CREATE TABLE IF NOT EXISTS "SharedCollectionMember" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id UUID NOT NULL REFERENCES "Collection"(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(collection_id, user_id)
);

-- Marketplace Listings
CREATE TABLE IF NOT EXISTS "Listing" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL UNIQUE REFERENCES "CollectionItem"(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  asking_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'withdrawn')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE "Profile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Collection" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CollectionItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PricePoint" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SharedCollectionMember" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Listing" ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profile: Users can read/write their own profile
CREATE POLICY "Users can manage own profile" ON "Profile"
  FOR ALL USING (auth.uid() = user_id);

-- Collection: Owners can manage their collections
CREATE POLICY "Owners can manage collections" ON "Collection"
  FOR ALL USING (auth.uid() = owner_id);

-- Collection: Shared members can view
CREATE POLICY "Shared members can view" ON "Collection"
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM "SharedCollectionMember" 
      WHERE collection_id = "Collection".id AND user_id = auth.uid()
    )
  );

-- CollectionItem: Owners can manage items in their collections
CREATE POLICY "Owners can manage items" ON "CollectionItem"
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM "Collection" 
      WHERE id = "CollectionItem".collection_id AND owner_id = auth.uid()
    )
  );

-- CollectionItem: Shared members with editor+ can manage
CREATE POLICY "Editors can manage items" ON "CollectionItem"
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM "SharedCollectionMember" 
      WHERE collection_id = "CollectionItem".collection_id 
      AND user_id = auth.uid() 
      AND role IN ('owner', 'editor')
    )
  );

-- PricePoint: Cascade from item permissions
CREATE POLICY "PricePoint from item access" ON "PricePoint"
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM "CollectionItem" ci
      JOIN "Collection" c ON ci.collection_id = c.id
      WHERE ci.id = "PricePoint".item_id AND c.owner_id = auth.uid()
    )
  );

-- Listing: Sellers can manage their listings
CREATE POLICY "Sellers can manage listings" ON "Listing"
  FOR ALL USING (auth.uid() = seller_id);

-- Listing: Anyone can view active listings
CREATE POLICY "Anyone can view active listings" ON "Listing"
  FOR SELECT USING (status = 'active');
