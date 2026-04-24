import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { getCollectionItems, getPortfolioStats } from '@/lib/actions/collections';
import CollectionClient from './CollectionClient';

export default async function CollectionPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const [stats, items] = await Promise.all([
    getPortfolioStats(),
    getCollectionItems(),
  ]);

  return <CollectionClient stats={stats} items={items} />;
}
