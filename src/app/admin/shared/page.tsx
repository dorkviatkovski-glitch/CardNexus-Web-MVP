import { createClient } from '@/lib/supabase';
import { Share2, Users, Crown, Eye, Edit3 } from 'lucide-react';

export default async function AdminSharedPage() {
  const supabase = await createClient();

  const { data: shared, error } = await supabase
    .from('SharedCollectionMember')
    .select(`
      *,
      Collection(name, owner_id)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-8 bg-red-50 rounded-2xl border border-red-200">
        <p className="text-red-600 font-medium">Error loading shared data: {error.message}</p>
      </div>
    );
  }

  // Group by collection
  const collectionMap = new Map();
  shared?.forEach((item) => {
    const collId = item.collection_id;
    if (!collectionMap.has(collId)) {
      collectionMap.set(collId, {
        name: item.Collection?.name || 'Unknown Collection',
        owner_id: item.Collection?.owner_id,
        members: [],
      });
    }
    collectionMap.get(collId).members.push(item);
  });

  const collections = Array.from(collectionMap.entries());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Shared Collections</h2>
        <p className="text-slate-500 text-sm mt-1">{collections.length} collections with shared access</p>
      </div>

      <div className="space-y-4">
        {collections.map(([id, data]) => (
          <div key={id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Share2 size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{data.name}</h3>
                  <p className="text-xs text-slate-400">ID: {id}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                {data.members.length} members
              </span>
            </div>

            <div className="space-y-2">
              {data.members.map((member: any) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                      <Users size={14} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{member.user_id}</p>
                      <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                        member.role === 'owner' ? 'text-red-600' :
                        member.role === 'editor' ? 'text-blue-600' : 'text-slate-500'
                      }`}>
                        {member.role === 'owner' && <Crown size={12} />}
                        {member.role === 'editor' && <Edit3 size={12} />}
                        {member.role === 'viewer' && <Eye size={12} />}
                        {member.role.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(member.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {collections.length === 0 && (
          <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center">
            <Share2 size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No shared collections yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
