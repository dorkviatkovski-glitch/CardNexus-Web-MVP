-- CardNexus Marketplace + Price Comparison Schema Update
-- Run this in Supabase SQL Editor

-- Add price comparison fields to CollectionItem
ALTER TABLE "CollectionItem"
ADD COLUMN IF NOT EXISTS market_avg_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS last_price_check TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS price_source TEXT;

-- Create Listing table
CREATE TABLE IF NOT EXISTS "Listing" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL UNIQUE REFERENCES "CollectionItem"(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  asking_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'withdrawn')),
  market_avg_price DECIMAL(10,2),
  price_source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Listing
ALTER TABLE "Listing" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Listing
CREATE POLICY "Sellers can manage listings" ON "Listing"
  FOR ALL USING (auth.uid() = seller_id);

CREATE POLICY "Anyone can view active listings" ON "Listing"
  FOR SELECT USING (status = 'active');

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_listing_status ON "Listing"(status);
CREATE INDEX IF NOT EXISTS idx_listing_seller ON "Listing"(seller_id);
