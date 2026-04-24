'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '../supabase';

export async function createListing(itemId: string, askingPrice: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  // Get item details for price comparison
  const { data: item } = await supabase
    .from('CollectionItem')
    .select('card_name, card_set, condition')
    .eq('id', itemId)
    .single();

  if (!item) throw new Error('Item not found');

  // Check if listing already exists for this item
  const { data: existing } = await supabase
    .from('Listing')
    .select('id')
    .eq('item_id', itemId)
    .single();

  if (existing) throw new Error('This item is already listed');

  // Import mock price service (server-side)
  const { getMarketComparison } = await import('../pricing/mockPriceService');
  const marketData = getMarketComparison(item.card_name, item.card_set, item.condition);

  const { error } = await supabase
    .from('Listing')
    .insert({
      item_id: itemId,
      seller_id: user.id,
      asking_price: askingPrice,
      market_avg_price: marketData.avg,
      price_source: marketData.source,
      status: 'active',
    });

  if (error) throw new Error(error.message);

  revalidatePath('/collection');
  revalidatePath('/marketplace');
  revalidatePath('/profile');
}

export async function getActiveListings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('Listing')
    .select(`
      *,
      CollectionItem:item_id(card_name, card_set, condition, image_url)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching listings:', error);
    return [];
  }

  return data || [];
}

export async function getMyListings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('Listing')
    .select(`
      *,
      CollectionItem:item_id(card_name, card_set, condition, image_url)
    `)
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching my listings:', error);
    return [];
  }

  return data || [];
}

export async function withdrawListing(listingId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('Listing')
    .update({ status: 'withdrawn' })
    .eq('id', listingId)
    .eq('seller_id', user.id);

  if (error) throw new Error(error.message);

  revalidatePath('/marketplace');
  revalidatePath('/profile');
}
