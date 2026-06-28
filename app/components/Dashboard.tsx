'use client';
import { AlertTriangle, Mail, CalendarCheck, ChevronRight, Bot } from 'lucide-react';
import { DBProject } from '../hooks/useProjects';

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  urgent: { label: '要対応', color: '#c0392b', bg: '#fdf0ef', border: '#f5c6c2' },
  active: { label: '進行中', color: '#1e5fd4', bg: '#eef3fd', border: '#b8ccf5' },
  pending: { label: 'レビュー待ち', color: '#b45309', bg: '#fef9ec', border: '#fde68a' },
  done: { label: '完了', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
};

const borderColor: Record<string, string> = {
  urgent: '#c0392b', active: '#1e5fd4', pending: '#b45309', done: '#15803d',
};

interface DashboardProps {
  onProjectSelect: (id: string) => void;
  dbProjects: DBProject[];
}

function ProjectCard({ project, onClick }: { project: DBProject; onClick: () => void }) {
  const cfg = statusConfig[project.status] || statusConfig.active;
  const members = project.project_members || [];
  const colors = ['#eef3fd', '#f0fdf4', '#fdf0ef', '#fef9ec', '#f5f3ff'];

  return (
    <div onClick={onClick} style={{
      background: '#fff', border: `1px solid #e4e2dc`,
      borderLeft: `3px solid ${borderColor[project.status] || '#1e5fd4'}`,
      borderRadius: 10, padding: '14px 16px', cursor: 'pointer',
    }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1917', lineHeight: 1.3, flex: 1, paddingRight: 8 }}>
          {project.name}
        </div>
        <ChevronRight size={14} color="#9e9b93" style={{ flexShrink: 0 }} />
      </div>
      <div style={{ fontSize: 11, color: '#9e9b93', marginBottom: 8 }}>{project.client}</div>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
        <span style={{
          fontSize: 10, padding: '2px 7px', borderRadius: 10,
          background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`
        }}>{cfg.label}</span>
        {(project.tags || []).slice(0, 2).map(t => (
          <span key={t} style={{
            fontSize: 10, padding: '2px 7px', borderRadius: 10,
            background: '#f5f4f1', color: '#5c5a54', border: '1px solid #e4e2dc'
          }}>{t}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {members.slice(0, 4).map((m, i) => (
          <div key={i} title={m.profiles?.name || ''} style={{
            width: 24, height: 24, borderRadius: '50%', background: colors[i % colors.length],
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 600, color: '#1a1917', border: '1px solid #e4e2dc'
          }}>{m.profiles?.initials || '?'}</div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ onProjectSelect, dbProjects }: DashboardProps) {
  const urgentProjects = dbProjects.filter(p => p.status === 'urgent');
  const activeProjects = dbProjects.filter(p => p.status === 'active');
  const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      <div style={{
        background: '#fff', border: '1px solid #b8ccf5', borderRadius: 12,
        padding: 16, marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: '#eef3fd',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Bot size={16} color="#1e5fd4" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1917' }}>AIナビゲーター</div>
            <div style={{ fontSize: 11, color: '#9e9b93' }}>本日のサマリー — {today}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {urgentProjects.map(p => (
            <div key={p.id} onClick={() => onProjectSelect(p.id)} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '8px 10px', background: '#fdf0ef', borderRadius: 6,
              cursor: 'pointer', fontSize: 12, color: '#3d3c39', lineHeight: 1.5
            }}>
              <AlertTriangle size={14} color="#b45309" style={{ flexShrink: 0, marginTop: 1 }} />
              {p.name}：要対応のプロジェクトです。確認してください。
            </div>
          ))}
          {activeProjects.slice(0, 2).map(p => (
            <div key={p.id} onClick={() => onProjectSelect(p.id)} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '8px 10px', background: '#f9f8f6', borderRadius: 6,
              cursor: 'pointer', fontSize: 12, color: '#3d3c39', lineHeight: 1.5
            }}>
              <Mail size={14} color="#1e5fd4" style={{ flexShrink: 0, marginTop: 1 }} />
              {p.name}：進行中です。{p.next_meeting ? `次回ミーティング：${p.next_meeting}` : ''}
            </div>
          ))}
          {dbProjects.length === 0 && (
            <div style={{ fontSize: 12, color: '#9e9b93', padding: '8px 10px' }}>
              プロジェクトがありません。新規プロジェクトを作成してください。
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { n: dbProjects.length, l: '全プロジェクト' },
          { n: urgentProjects.length, l: '要対応' },
          { n: dbProjects.filter(p => p.status === 'pending').length, l: 'レビュー待ち' },
          { n: dbProjects.filter(p => p.status === 'done').length, l: '完了' },
        ].map(({ n, l }) => (
          <div key={l} style={{ background: '#fff', border: '1px solid #e4e2dc', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#1a1917' }}>{n}</div>
            <div style={{ fontSize: 10, color: '#9e9b93', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, color: '#9e9b93', fontWeight: 500, marginBottom: 10, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
        <span>進行中のプロジェクト</span>
        <span>{dbProjects.length}件</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {dbProjects.map(p => (
          <ProjectCard key={p.id} project={p} onClick={() => onProjectSelect(p.id)} />
        ))}
      </div>
    </div>
  );
}
