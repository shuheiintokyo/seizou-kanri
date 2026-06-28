'use client';
import { useState } from 'react';
import { createClient } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('メールアドレスまたはパスワードが間違っています');
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#f5f4f1',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', border: '1px solid #e4e2dc',
        borderRadius: 16, padding: '40px 36px', width: 360
      }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 13, color: '#1e5fd4', fontWeight: 500, marginBottom: 6 }}>平田商店</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1917' }}>プロジェクト管理</div>
          <div style={{ fontSize: 13, color: '#9e9b93', marginTop: 4 }}>ログインしてください</div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, color: '#5c5a54', display: 'block', marginBottom: 5 }}>メールアドレス</label>
          <input
            type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              width: '100%', border: '1px solid #e4e2dc', borderRadius: 6,
              padding: '9px 12px', fontSize: 13, color: '#1a1917',
              background: '#f9f8f6', outline: 'none', fontFamily: 'inherit'
            }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, color: '#5c5a54', display: 'block', marginBottom: 5 }}>パスワード</label>
          <input
            type="password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="••••••••"
            style={{
              width: '100%', border: '1px solid #e4e2dc', borderRadius: 6,
              padding: '9px 12px', fontSize: 13, color: '#1a1917',
              background: '#f9f8f6', outline: 'none', fontFamily: 'inherit'
            }}
          />
        </div>
        {error && (
          <div style={{
            fontSize: 12, color: '#c0392b', background: '#fdf0ef',
            border: '1px solid #f5c6c2', borderRadius: 6,
            padding: '8px 12px', marginBottom: 14
          }}>{error}</div>
        )}
        <button onClick={handleLogin} disabled={loading} style={{
          width: '100%', padding: '10px', background: '#1e5fd4',
          color: '#fff', border: 'none', borderRadius: 6,
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          fontFamily: 'inherit', opacity: loading ? 0.7 : 1
        }}>
          {loading ? 'ログイン中...' : 'ログイン →'}
        </button>
      </div>
    </div>
  );
}
