'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '../supabase';

export async function toggleUserAdmin(userId: string, isAdmin: boolean) {
  const supabase = await createClient();

  // Check if current user is admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data: profile } = await supabase
    .from('Profile')
    .select('is_admin')
    .eq('user_id', user.id)
    .single();

  if (!profile?.is_admin) {
    throw new Error('Unauthorized: Admin access required');
  }

  const { error } = await supabase
    .from('Profile')
    .update({ is_admin: isAdmin })
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/users');
}

export async function deleteUser(userId: string) {
  const supabase = await createClient();

  // Check admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data: profile } = await supabase
    .from('Profile')
    .select('is_admin')
    .eq('user_id', user.id)
    .single();

  if (!profile?.is_admin) {
    throw new Error('Unauthorized');
  }

  // Delete user from auth (requires service role - for now just mark as deleted)
  const { error } = await supabase
    .from('Profile')
    .delete()
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/users');
}

export async function getSystemStats() {
  const supabase = await createClient();

  // Check admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('Profile')
    .select('is_admin')
    .eq('user_id', user.id)
    .single();

  if (!profile?.is_admin) return null;

  const [users, collections, items, shared] = await Promise.all([
    supabase.from('Profile').select('*', { count: 'exact', head: true }),
    supabase.from('Collection').select('*', { count: 'exact', head: true }),
    supabase.from('CollectionItem').select('*', { count: 'exact', head: true }),
    supabase.from('SharedCollectionMember').select('*', { count: 'exact', head: true }),
  ]);

  return {
    users: users.count || 0,
    collections: collections.count || 0,
    items: items.count || 0,
    shared: shared.count || 0,
  };
}
