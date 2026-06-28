'use client';
import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { createClient } from '../../lib/supabase';

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

const statusOptions = [
  { value: 'active', label: '進行中' },
  { value: 'urgent', label: '要対応' },
  { value: 'pending', label: 'レビュー待ち' },
  { value: 'done', label: '完了' },
];

export default function NewProjectModal({ onClose, onCreated }: Props) {
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('active');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) { setError('プロジェクト名を入力してください'); return; }
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const tagArray = tags.split('、').map(t => t.trim()).filter(Boolean);

    const { data, error: err } = await supabase
      .from('projects')
      .insert({ name, client, status, description, tags: tagArray })
      .select()
      .single();

    if (err) { setError('作成に失敗しました'); setLoading(false); return; }

    if (data && user) {
      await supabase.from('project_members').insert({
        project_id: data.id, user_id: user.id, role: '担当'
      });
    }
    setLoading(false);
    onCreated();
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#fff', borderRadius: 14, padding: '28px 32px',
        width: 480, border: '1px solid #e4e2dc',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1917' }}>新規プロジェクト作成</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9e9b93' }}>
            <X size={18} />
          </button>
        </div>

        {[
          { label: 'プロジェクト名 *', value: name, set: setName, placeholder: 'ヤマハ B&O アルトサックスケース' },
          { label: 'クライアント名', value: client, set: setClient, placeholder: 'ヤマハ株式会社' },
          { label: 'タグ（読点「、」区切り）', value: tags, set: setTags, placeholder: '吹込み成形、超軽量、B&O' },
        ].map(({ label, value, set, placeholder }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: '#5c5a54', display: 'block', marginBottom: 5 }}>{label}</label>
            <input value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
              style={{
                width: '100%', border: '1px solid #e4e2dc', borderRadius: 6,
                padding: '8px 12px', fontSize: 13, color: '#1a1917',
                background: '#f9f8f6', outline: 'none', fontFamily: 'inherit'
              }}
            />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, color: '#5c5a54', display: 'block', marginBottom: 5 }}>ステータス</label>
          <select value={status} onChange={e => setStatus(e.target.value)} style={{
            width: '100%', border: '1px solid #e4e2dc', borderRadius: 6,
            padding: '8px 12px', fontSize: 13, color: '#1a1917',
            background: '#f9f8f6', outline: 'none', fontFamily: 'inherit'
          }}>
            {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, color: '#5c5a54', display: 'block', marginBottom: 5 }}>概要</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            placeholder="プロジェクトの概要を入力してください"
            rows={3} style={{
              width: '100%', border: '1px solid #e4e2dc', borderRadius: 6,
              padding: '8px 12px', fontSize: 13, color: '#1a1917',
              background: '#f9f8f6', outline: 'none', fontFamily: 'inherit', resize: 'vertical'
            }}
          />
        </div>

        {error && (
          <div style={{
            fontSize: 12, color: '#c0392b', background: '#fdf0ef',
            border: '1px solid #f5c6c2', borderRadius: 6, padding: '8px 12px', marginBottom: 14
          }}>{error}</div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            padding: '8px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
            border: '1px solid #e4e2dc', background: '#f9f8f6', color: '#5c5a54', fontFamily: 'inherit'
          }}>キャンセル</button>
          <button onClick={handleCreate} disabled={loading} style={{
            padding: '8px 20px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
            border: 'none', background: '#1e5fd4', color: '#fff', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 5, opacity: loading ? 0.7 : 1
          }}>
            <Plus size={13} /> {loading ? '作成中...' : 'プロジェクトを作成'}
          </button>
        </div>
      </div>
    </div>
  );
}
