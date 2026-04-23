'use server';

import { createClient } from '../supabase';

export async function getCollections() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  const { data, error } = await supabase
    .from('Collection')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching collections:', error);
    return [];
  }

  return data || [];
}

export async function getCollectionItems(collectionId?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  let query = supabase
    .from('CollectionItem')
    .select(`*, Collection!inner(owner_id)`)
    .eq('Collection.owner_id', user.id);

  if (collectionId) {
    query = query.eq('collection_id', collectionId);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching items:', error);
    return [];
  }

  return data || [];
}

export async function getPortfolioStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { totalValue: 0, cardCount: 0, growth: 0 };

  const { data: items, error } = await supabase
    .from('CollectionItem')
    .select('purchase_price, created_at')
    .eq('Collection.owner_id', user.id);

  if (error || !items) {
    return { totalValue: 0, cardCount: 0, growth: 0 };
  }

  const cardCount = items.length;
  const totalValue = items.reduce((sum, item) => sum + (item.purchase_price || 0), 0);
  
  // Mock growth for now - will be calculated from PricePoint history later
  const growth = 8.2;

  return { totalValue, cardCount, growth };
}

export async function addCollectionItem(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');

  // Get or create default collection
  const { data: collections } = await supabase
    .from('Collection')
    .select('id')
    .eq('owner_id', user.id)
    .limit(1);

  let collectionId = collections?.[0]?.id;

  if (!collectionId) {
    const { data: newCollection, error: collError } = await supabase
      .from('Collection')
      .insert({ name: 'My Collection', owner_id: user.id })
      .select()
      .single();

    if (collError) throw new Error('Failed to create collection');
    collectionId = newCollection.id;
  }

  const { error } = await supabase
    .from('CollectionItem')
    .insert({
      collection_id: collectionId,
      card_name: formData.get('card_name') as string,
      card_set: formData.get('card_set') as string,
      card_number: formData.get('card_number') as string || null,
      rarity: formData.get('rarity') as string || null,
      condition: formData.get('condition') as string || null,
      purchase_price: parseFloat(formData.get('purchase_price') as string) || null,
      image_url: formData.get('image_url') as string || null,
    });

  if (error) throw new Error(error.message);
}
