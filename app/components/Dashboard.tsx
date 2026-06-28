'use client';
import { AlertTriangle, Mail, CalendarCheck, ChevronRight, Bot, Clock } from 'lucide-react';
import { projects, statusConfig, statusBorderColor, Project } from '../data/mockData';

interface DashboardProps {
  onProjectSelect: (id: string) => void;
}

/* Optional per-status footer hint. Map YOUR real status keys here.
   Any status not listed simply renders no chip. */
const dueHint: Record<string, { label: string; color: string }> = {
  needsAction: { label: '要対応', color: '#b45309' },
  inProgress: { label: '進行中', color: '#9e9b93' },
  review: { label: 'レビュー中', color: '#9e9b93' },
  urgent: { label: '期限間近', color: '#c0392b' },
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cfg = statusConfig[project.status];
  const due = dueHint[project.status];
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        background: '#fff',
        border: '1px solid #e4e2dc',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,25,23,0.08)';
        e.currentTarget.style.borderColor = '#d6d3ca';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#e4e2dc';
      }}
    >
      {/* status accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: statusBorderColor[project.status],
      }} />

      <div style={{ padding: '15px 17px 15px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 3 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1a1917', lineHeight: 1.35 }}>
            {project.name}
          </div>
          <ChevronRight size={15} color="#c4c1b8" style={{ flexShrink: 0, marginTop: 2 }} />
        </div>

        <div style={{ fontSize: 11, color: '#9e9b93', marginBottom: 11 }}>{project.client}</div>

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 13 }}>
          <span style={{
            fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
            background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
          }}>{cfg.label}</span>
          {project.tags.slice(0, 2).map(t => (
            <span key={t} style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 20,
              background: '#f5f4f1', color: '#5c5a54', border: '1px solid #e4e2dc',
            }}>{t}</span>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 12, borderTop: '1px solid #f0eee9',
        }}>
          <div style={{ display: 'flex' }}>
            {project.members.map((m, i) => (
              <div key={m.id} title={m.name} style={{
                width: 25, height: 25, borderRadius: '50%', background: m.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: '#1a1917',
                border: '1.5px solid #fff', boxShadow: '0 0 0 1px #e4e2dc',
                marginLeft: i === 0 ? 0 : -6,
              }}>{m.initials}</div>
            ))}
          </div>
          {due && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 10.5, color: due.color, fontWeight: 500,
            }}>
              <Clock size={12} />
              {due.label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const aiAlerts = [
  { Icon: AlertTriangle, color: '#b45309', bg: '#fef9ec', proj: 'yamaha', meta: 'ヤマハ B&O · 期限まで3日', text: 'ヤマハ B&Oプロジェクト：次回ミーティングまで3日。吹込み成形の図面確認が未完了です。' },
  { Icon: Mail, color: '#1e5fd4', bg: '#eef3fd', proj: 'rapyuta', meta: 'Rapyuta · 担当 田中さん', text: 'Rapyutaプロジェクト：野村ユニゾンへの与信回答期限が明日です。担当：田中さん。' },
  { Icon: CalendarCheck, color: '#15803d', bg: '#f0fdf4', proj: 'moiron', meta: 'Moiron金型 · レビュー待ち', text: 'Moiron金型：Sandor P.よりCADデータ提出済。レビュー待ちです。' },
];

export default function Dashboard({ onProjectSelect }: DashboardProps) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      {/* AI Navigator */}
      <div style={{
        background: '#fff', border: '1px solid #e4e2dc', borderRadius: 14,
        marginBottom: 22, overflow: 'hidden', boxShadow: '0 1px 2px rgba(26,25,23,0.04)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px',
          borderBottom: '1px solid #f0eee9',
          background: 'linear-gradient(180deg, #fbfaff 0%, #ffffff 100%)',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 11,
            background: 'linear-gradient(135deg, #1e5fd4 0%, #6d28d9 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(109,40,217,0.28)', flexShrink: 0,
          }}>
            <Bot size={19} color="#fff" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1917' }}>AIナビゲーター</span>
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', color: '#6d28d9',
                background: '#f5f3ff', border: '1px solid #e6e0fb', padding: '1px 7px', borderRadius: 20,
              }}>BETA</span>
            </div>
            <div style={{ fontSize: 11, color: '#9e9b93', marginTop: 1 }}>本日のサマリー — 2026年6月28日</div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#5c5a54',
            background: '#f9f8f6', border: '1px solid #e4e2dc', padding: '4px 10px', borderRadius: 20, flexShrink: 0,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6d28d9' }} />
            3件の要確認
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
          {aiAlerts.map(({ Icon, color, bg, text, meta, proj }, i) => (
            <div
              key={i}
              onClick={() => onProjectSelect(proj)}
              style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '11px 12px', borderRadius: 9, cursor: 'pointer', transition: 'background 0.13s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f9f8f6')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{
                width: 26, height: 26, borderRadius: 8, background: bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={14} color={color} />
              </div>
              <div style={{ flex: 1, minWidth: 0, paddingTop: 1 }}>
                <div style={{ fontSize: 12.5, color: '#3d3c39', lineHeight: 1.6 }}>{text}</div>
                <div style={{ fontSize: 10.5, color: '#b0ada4', marginTop: 4, letterSpacing: '0.02em' }}>{meta}</div>
              </div>
              <ChevronRight size={15} color="#c4c1b8" style={{ flexShrink: 0, marginTop: 5 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 26 }}>
        {[
          { n: '4', l: '進行中プロジェクト', color: '#1a1917' },
          { n: '2', l: '今週の要対応', color: '#b45309' },
          { n: '7', l: '未完了アクション', color: '#1a1917' },
          { n: '3', l: '今月の会議', color: '#1a1917' },
        ].map(({ n, l, color }) => (
          <div key={l} style={{
            background: '#fff', border: '1px solid #e4e2dc', borderRadius: 11,
            padding: '14px 16px', boxShadow: '0 1px 2px rgba(26,25,23,0.03)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <div style={{
                fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums', color,
              }}>{n}</div>
              <div style={{ fontSize: 11, color: '#b0ada4', fontWeight: 500 }}>件</div>
            </div>
            <div style={{ fontSize: 11, color: '#9e9b93', marginTop: 8 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{
          fontSize: 11, color: '#9e9b93', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>進行中のプロジェクト</div>
        <div style={{ fontSize: 11, color: '#b0ada4' }}>{projects.length}件</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} onClick={() => onProjectSelect(p.id)} />
        ))}
      </div>
    </div>
  );
}