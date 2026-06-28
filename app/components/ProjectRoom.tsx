'use client';
import { useState, useRef, useEffect } from 'react';
import { Paperclip, Image, Mic, Bot, Send, FileText, Table, FileCode, File } from 'lucide-react';
import { Project, Message, statusConfig, currentUser } from '../data/mockData';

const docIcon = (type: string) => {
  if (type === 'pdf') return <FileText size={14} color="#c0392b" />;
  if (type === 'xlsx') return <Table size={14} color="#15803d" />;
  if (type === 'cad') return <FileCode size={14} color="#1e5fd4" />;
  return <File size={14} color="#9e9b93" />;
};

function ChatMessage({ msg }: { msg: Message }) {
  const isAI = msg.isAI;
  const isMine = msg.isMine;
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexDirection: isMine ? 'row-reverse' : 'row' }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 2,
        background: isAI ? '#f5f3ff' : msg.color,
        border: '1px solid #e4e2dc',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 600,
        color: isAI ? '#6d28d9' : '#1a1917',
      }}>
        {isAI ? <Bot size={13} /> : msg.initials}
      </div>
      <div style={{ maxWidth: '72%' }}>
        <div style={{
          fontSize: 10, color: '#9e9b93', marginBottom: 3,
          textAlign: isMine ? 'right' : 'left'
        }}>
          {msg.from} · {msg.time}
        </div>
        <div style={{
          background: isAI ? '#f5f3ff' : isMine ? '#eef3fd' : '#fff',
          border: `1px solid ${isAI ? '#ddd6fe' : isMine ? '#b8ccf5' : '#e4e2dc'}`,
          borderRadius: isMine ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
          padding: '8px 12px', fontSize: 12, color: '#1a1917', lineHeight: 1.6,
        }}>
          {msg.text}
        </div>
        {msg.attachments && msg.attachments.map(a => (
          <div key={a} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 4,
            padding: '3px 8px', background: '#f5f4f1', border: '1px solid #e4e2dc',
            borderRadius: 5, fontSize: 11, color: '#5c5a54', cursor: 'pointer'
          }}>
            <FileText size={12} /> {a}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectRoom({ project }: { project: Project }) {
  const cfg = statusConfig[project.status];
  const [messages, setMessages] = useState<Message[]>(project.messages);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      from: currentUser.name, fromId: currentUser.id,
      initials: currentUser.initials, color: currentUser.color,
      time: new Date().toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      text: input, isMine: true,
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        from: 'AIナビゲーター', fromId: 'ai',
        initials: 'AI', color: '#f5f3ff',
        time: new Date().toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        text: `【AI応答】「${input.slice(0, 20)}...」について確認しました。関連するアクションアイテムをアジェンダに追加しました。`,
        isAI: true,
      }]);
    }, 1200);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Project header */}
      <div style={{
        padding: '12px 20px', borderBottom: '1px solid #e4e2dc',
        background: '#fff', display: 'flex', alignItems: 'center', gap: 12
      }}>
        <div style={{
          width: 4, height: 36, borderRadius: 2,
          background: statusConfig[project.status].color
        }} />
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
        {/* Chat area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid #e4e2dc' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
            {messages.map(m => <ChatMessage key={m.id} msg={m} />)}
            <div ref={chatEndRef} />
          </div>
          {/* Input bar */}
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
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="メッセージを入力... (/help でコマンド一覧)"
                style={{
                  flex: 1, border: '1px solid #e4e2dc', borderRadius: 6,
                  padding: '8px 12px', fontSize: 12, color: '#1a1917',
                  background: '#f9f8f6', outline: 'none',
                  fontFamily: 'inherit'
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

        {/* Right sidebar */}
        <div style={{ width: 260, overflowY: 'auto', padding: '14px', background: '#f9f8f6' }}>
          {/* AI Agenda */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#9e9b93', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
              AIアジェンダ（次回ミーティング）
            </div>
            {project.nextMeeting && (
              <div style={{ fontSize: 11, color: '#1e5fd4', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                📅 {project.nextMeeting}
              </div>
            )}
            {project.agenda.map((a, i) => (
              <div key={i} style={{
                display: 'flex', gap: 8, padding: '6px 8px',
                background: '#fff', borderRadius: 5, marginBottom: 4,
                border: '1px solid #e4e2dc', fontSize: 12, color: '#3d3c39'
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#1e5fd4', minWidth: 16 }}>{i + 1}</span>
                {a}
              </div>
            ))}
          </div>

          {/* Documents */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#9e9b93', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
              ドキュメント
            </div>
            {project.documents.map(d => (
              <div key={d.id} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px',
                borderRadius: 5, cursor: 'pointer', fontSize: 12, color: '#3d3c39',
                marginBottom: 2,
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {docIcon(d.type)}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                  <div style={{ fontSize: 10, color: '#9e9b93' }}>{d.size} · {d.uploadedAt}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Members */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#9e9b93', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
              メンバー
            </div>
            {project.members.map(m => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', background: m.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 600, color: '#1a1917', border: '1px solid #e4e2dc', flexShrink: 0
                }}>{m.initials}</div>
                <div>
                  <div style={{ fontSize: 12, color: '#1a1917' }}>{m.name}</div>
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
