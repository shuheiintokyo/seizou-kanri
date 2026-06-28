'use client';
import { useState, useRef, useEffect } from 'react';
import { Paperclip, Image, Mic, Bot, Send, FileText, Table, FileCode, File } from 'lucide-react';
import { createClient } from '../../lib/supabase';
import { DBProject } from '../hooks/useProjects';

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  urgent: { label: '要対応', color: '#c0392b', bg: '#fdf0ef', border: '#f5c6c2' },
  active: { label: '進行中', color: '#1e5fd4', bg: '#eef3fd', border: '#b8ccf5' },
  pending: { label: 'レビュー待ち', color: '#b45309', bg: '#fef9ec', border: '#fde68a' },
  done: { label: '完了', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
};

const docIcon = (type: string) => {
  if (type === 'pdf') return <FileText size={14} color="#c0392b" />;
  if (type === 'xlsx') return <Table size={14} color="#15803d" />;
  if (type === 'cad') return <FileCode size={14} color="#1e5fd4" />;
  return <File size={14} color="#9e9b93" />;
};

interface Message {
  id: string;
  text: string;
  is_ai: boolean;
  created_at: string;
  from?: string;
  initials?: string;
  isMine?: boolean;
}

export default function ProjectRoom({ project }: { project: DBProject }) {
  const cfg = statusConfig[project.status] || statusConfig.active;
  const [messages, setMessages] = useState<Message[]>(
    (project.messages || []).map(m => ({ ...m, from: m.is_ai ? 'AIナビゲーター' : 'メンバー', initials: m.is_ai ? 'AI' : '?', isMine: false }))
  );
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const text = input;
    setInput('');

    const newMsg: Message = {
      id: Date.now().toString(),
      text, is_ai: false, created_at: new Date().toISOString(),
      from: '田中 修平', initials: '田', isMine: true,
    };
    setMessages(prev => [...prev, newMsg]);

    await supabase.from('messages').insert({
      project_id: project.id, user_id: user?.id, text, is_ai: false
    });

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: `【AI応答】「${text.slice(0, 20)}...」について確認しました。関連するアクションアイテムをアジェンダに追加しました。`,
        is_ai: true, created_at: new Date().toISOString(),
        from: 'AIナビゲーター', initials: 'AI', isMine: false,
      }]);
    }, 1000);
  };

  const colors = ['#eef3fd', '#f0fdf4', '#fdf0ef', '#fef9ec', '#f5f3ff'];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{
        padding: '12px 20px', borderBottom: '1px solid #e4e2dc',
        background: '#fff', display: 'flex', alignItems: 'center', gap: 12
      }}>
        <div style={{ width: 4, height: 36, borderRadius: 2, background: cfg.color }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1917' }}>{project.name}</div>
          <div style={{ fontSize: 11, color: '#9e9b93', marginTop: 1 }}>{project.client}</div>
        </div>
        <span style={{
          fontSize: 11, padding: '3px 10px', borderRadius: 12,
          background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`
        }}>{cfg.label}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid #e4e2dc' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: '#9e9b93', fontSize: 12, marginTop: 40 }}>
                まだメッセージがありません。最初のメッセージを送ってください。
              </div>
            )}
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', gap: 8, marginBottom: 14, flexDirection: m.isMine ? 'row-reverse' : 'row' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                  background: m.is_ai ? '#f5f3ff' : m.isMine ? '#eef3fd' : '#f5f4f1',
                  border: '1px solid #e4e2dc',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 600, color: '#1a1917',
                }}>
                  {m.is_ai ? <Bot size={13} color="#6d28d9" /> : m.initials}
                </div>
                <div style={{ maxWidth: '72%' }}>
                  <div style={{ fontSize: 10, color: '#9e9b93', marginBottom: 3, textAlign: m.isMine ? 'right' : 'left' }}>
                    {m.from} · {new Date(m.created_at).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div style={{
                    background: m.is_ai ? '#f5f3ff' : m.isMine ? '#eef3fd' : '#fff',
                    border: `1px solid ${m.is_ai ? '#ddd6fe' : m.isMine ? '#b8ccf5' : '#e4e2dc'}`,
                    borderRadius: m.isMine ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
                    padding: '8px 12px', fontSize: 12, color: '#1a1917', lineHeight: 1.6,
                  }}>{m.text}</div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={{ borderTop: '1px solid #e4e2dc', padding: '10px 14px', background: '#fff' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              {[
                { Icon: Paperclip, label: 'ファイル' },
                { Icon: Image, label: '画像' },
                { Icon: Mic, label: '議事録' },
                { Icon: Bot, label: 'AI要約' },
              ].map(({ Icon, label }) => (
                <button key={label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '3px 8px', borderRadius: 5, fontSize: 11,
                  border: '1px solid #e4e2dc', background: '#f9f8f6',
                  color: '#5c5a54', cursor: 'pointer'
                }}>
                  <Icon size={12} /> {label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="メッセージを入力..."
                style={{
                  flex: 1, border: '1px solid #e4e2dc', borderRadius: 6,
                  padding: '8px 12px', fontSize: 12, color: '#1a1917',
                  background: '#f9f8f6', outline: 'none', fontFamily: 'inherit'
                }}
              />
              <button onClick={sendMessage} style={{
                padding: '8px 12px', background: '#1e5fd4', color: '#fff',
                border: 'none', borderRadius: 6, cursor: 'pointer',
                display: 'flex', alignItems: 'center'
              }}>
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ width: 260, overflowY: 'auto', padding: '14px', background: '#f9f8f6' }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#9e9b93', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
              概要
            </div>
            <div style={{ fontSize: 12, color: '#3d3c39', lineHeight: 1.6, background: '#fff', border: '1px solid #e4e2dc', borderRadius: 6, padding: '8px 10px' }}>
              {project.description || '概要がありません'}
            </div>
          </div>

          {project.next_meeting && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#9e9b93', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
                次回ミーティング
              </div>
              <div style={{ fontSize: 12, color: '#1e5fd4', background: '#eef3fd', border: '1px solid #b8ccf5', borderRadius: 6, padding: '8px 10px' }}>
                📅 {project.next_meeting}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#9e9b93', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
              ドキュメント
            </div>
            {(project.documents || []).length === 0 ? (
              <div style={{ fontSize: 12, color: '#9e9b93' }}>書類がありません</div>
            ) : (project.documents || []).map(d => (
              <div key={d.id} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px',
                borderRadius: 5, cursor: 'pointer', fontSize: 12, color: '#3d3c39', marginBottom: 2,
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {docIcon(d.type)}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                  <div style={{ fontSize: 10, color: '#9e9b93' }}>{d.size}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#9e9b93', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
              メンバー
            </div>
            {(project.project_members || []).map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', background: colors[i % colors.length],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 600, color: '#1a1917', border: '1px solid #e4e2dc', flexShrink: 0
                }}>{m.profiles?.initials || '?'}</div>
                <div>
                  <div style={{ fontSize: 12, color: '#1a1917' }}>{m.profiles?.name || '不明'}</div>
                  <div style={{ fontSize: 10, color: '#9e9b93' }}>{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
