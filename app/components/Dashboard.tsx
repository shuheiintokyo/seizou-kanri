'use client';
import { AlertTriangle, Mail, CalendarCheck, ChevronRight, Bot } from 'lucide-react';
import { projects, statusConfig, statusBorderColor, Project } from '../data/mockData';

interface DashboardProps {
  onProjectSelect: (id: string) => void;
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cfg = statusConfig[project.status];
  return (
    <div onClick={onClick} style={{
      background: '#fff', border: `1px solid #e4e2dc`,
      borderLeft: `3px solid ${statusBorderColor[project.status]}`,
      borderRadius: 10, padding: '14px 16px', cursor: 'pointer',
      transition: 'box-shadow 0.15s',
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
        {project.tags.slice(0, 2).map(t => (
          <span key={t} style={{
            fontSize: 10, padding: '2px 7px', borderRadius: 10,
            background: '#f5f4f1', color: '#5c5a54', border: '1px solid #e4e2dc'
          }}>{t}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {project.members.map(m => (
          <div key={m.id} title={m.name} style={{
            width: 24, height: 24, borderRadius: '50%', background: m.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 600, color: '#1a1917', border: '1px solid #e4e2dc'
          }}>{m.initials}</div>
        ))}
      </div>
    </div>
  );
}

const aiAlerts = [
  { Icon: AlertTriangle, color: '#b45309', text: 'ヤマハ B&Oプロジェクト：次回ミーティングまで3日。吹込み成形の図面確認が未完了です。', proj: 'yamaha' },
  { Icon: Mail, color: '#1e5fd4', text: 'Rapyutaプロジェクト：野村ユニゾンへの与信回答期限が明日です。担当：田中さん。', proj: 'rapyuta' },
  { Icon: CalendarCheck, color: '#15803d', text: 'Moiron金型：Sandor P.よりCADデータ提出済。レビュー待ちです。', proj: 'moiron' },
];

export default function Dashboard({ onProjectSelect }: DashboardProps) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      {/* AI Navigator */}
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
            <div style={{ fontSize: 11, color: '#9e9b93' }}>本日のサマリー — 2026年6月28日</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {aiAlerts.map(({ Icon, color, text, proj }, i) => (
            <div key={i} onClick={() => onProjectSelect(proj)} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '8px 10px', background: '#f9f8f6', borderRadius: 6,
              cursor: 'pointer', fontSize: 12, color: '#3d3c39', lineHeight: 1.5
            }}>
              <Icon size={14} color={color} style={{ flexShrink: 0, marginTop: 1 }} />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { n: '4', l: '進行中プロジェクト' },
          { n: '2', l: '今週の要対応' },
          { n: '7', l: '未完了アクション' },
          { n: '3', l: '今月の会議' },
        ].map(({ n, l }) => (
          <div key={l} style={{ background: '#fff', border: '1px solid #e4e2dc', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#1a1917' }}>{n}</div>
            <div style={{ fontSize: 10, color: '#9e9b93', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Projects grid */}
      <div style={{ fontSize: 11, color: '#9e9b93', fontWeight: 500, marginBottom: 10, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        進行中のプロジェクト
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} onClick={() => onProjectSelect(p.id)} />
        ))}
      </div>
    </div>
  );
}
