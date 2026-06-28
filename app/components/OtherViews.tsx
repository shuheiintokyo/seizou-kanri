'use client';
import { ChevronRight, Folder } from 'lucide-react';
import { projects as mockProjects, statusConfig, statusBorderColor } from '../data/mockData';
import { DBProject } from '../hooks/useProjects';

const statusConfigDB: Record<string, { label: string; color: string; bg: string; border: string }> = {
  urgent: { label: '要対応', color: '#c0392b', bg: '#fdf0ef', border: '#f5c6c2' },
  active: { label: '進行中', color: '#1e5fd4', bg: '#eef3fd', border: '#b8ccf5' },
  pending: { label: 'レビュー待ち', color: '#b45309', bg: '#fef9ec', border: '#fde68a' },
  done: { label: '完了', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
};

const borderColorDB: Record<string, string> = {
  urgent: '#c0392b', active: '#1e5fd4', pending: '#b45309', done: '#15803d',
};

interface ProjectsListProps {
  onProjectSelect: (id: string) => void;
  dbProjects?: DBProject[];
}

export function ProjectsList({ onProjectSelect, dbProjects }: ProjectsListProps) {
  const list = dbProjects && dbProjects.length > 0 ? dbProjects : mockProjects;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      <div style={{ fontSize: 11, color: '#9e9b93', fontWeight: 500, marginBottom: 14, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        全プロジェクト一覧
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {list.map((p) => {
          const isDB = dbProjects && dbProjects.length > 0;
          const cfg = isDB ? statusConfigDB[p.status] : statusConfig[p.status as keyof typeof statusConfig];
          const borderColor = isDB ? borderColorDB[p.status] : statusBorderColor[p.status as keyof typeof statusBorderColor];
          const memberCount = isDB
            ? (p as DBProject).project_members?.length ?? 0
            : (p as typeof mockProjects[0]).members?.length ?? 0;
          const docCount = isDB
            ? (p as DBProject).documents?.length ?? 0
            : (p as typeof mockProjects[0]).documents?.length ?? 0;

          return (
            <div key={p.id} onClick={() => onProjectSelect(p.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '13px 16px', background: '#fff',
              border: '1px solid #e4e2dc', borderLeft: `3px solid ${borderColor}`,
              borderRadius: 8, cursor: 'pointer',
            }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <Folder size={18} color="#9e9b93" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1917' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#9e9b93', marginTop: 2 }}>
                  {p.client}　·　メンバー {memberCount}名　·　書類 {docCount}件
                </div>
              </div>
              <span style={{
                fontSize: 11, padding: '2px 9px', borderRadius: 10,
                background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`
              }}>{cfg.label}</span>
              <ChevronRight size={14} color="#9e9b93" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const schedule = [
  { date: '7/1', day: '火', title: 'ヤマハ B&O 図面確認ミーティング', time: '14:00', detail: 'リョーケ工業 + ヤマハ担当 参加', status: 'urgent' as const, proj: 'yamaha' },
  { date: '7/7', day: '月', title: 'Rapyuta 与信結果 野村ユニゾン報告', time: '10:00', detail: '田中 + 野村担当', status: 'active' as const, proj: 'rapyuta' },
  { date: '7/15', day: '火', title: 'Moiron CADデータレビュー', time: '13:00', detail: '社内 — Sandor P.とオンライン', status: 'pending' as const, proj: 'moiron' },
];

export function CalendarView({ onProjectSelect }: { onProjectSelect: (id: string) => void }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { n: '4', l: '進行中プロジェクト' },
          { n: '2', l: '今週の予定' },
          { n: '7', l: '未対応アクション' },
          { n: '3', l: '今月の会議' },
        ].map(({ n, l }) => (
          <div key={l} style={{ background: '#fff', border: '1px solid #e4e2dc', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#1a1917' }}>{n}</div>
            <div style={{ fontSize: 10, color: '#9e9b93', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#9e9b93', fontWeight: 500, marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        今後のスケジュール
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {schedule.map((s, i) => {
          const cfg = statusConfigDB[s.status];
          return (
            <div key={i} onClick={() => onProjectSelect(s.proj)} style={{
              display: 'flex', gap: 14, alignItems: 'center',
              padding: '12px 16px', background: '#fff',
              border: '1px solid #e4e2dc', borderRadius: 8, cursor: 'pointer',
            }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div style={{ textAlign: 'center', minWidth: 44 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1e5fd4' }}>{s.date.split('/')[1]}</div>
                <div style={{ fontSize: 10, color: '#9e9b93' }}>7月 {s.day}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1917' }}>{s.title}</div>
                <div style={{ fontSize: 11, color: '#9e9b93', marginTop: 2 }}>{s.time} — {s.detail}</div>
              </div>
              <span style={{
                fontSize: 11, padding: '2px 9px', borderRadius: 10, flexShrink: 0,
                background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`
              }}>{cfg.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
