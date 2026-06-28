'use client';
import { ChevronRight, Folder } from 'lucide-react';
import { useState } from 'react';
import { DBProject } from '../hooks/useProjects';

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  urgent: { label: '要対応', color: '#c0392b', bg: '#fdf0ef', border: '#f5c6c2' },
  active: { label: '進行中', color: '#1e5fd4', bg: '#eef3fd', border: '#b8ccf5' },
  pending: { label: 'レビュー待ち', color: '#b45309', bg: '#fef9ec', border: '#fde68a' },
  done: { label: '完了', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
};

const borderColorDB: Record<string, string> = {
  urgent: '#c0392b', active: '#1e5fd4', pending: '#b45309', done: '#15803d',
};

const scheduleEvents = [
  { date: new Date(2026, 6, 1), title: 'ヤマハ B&O 図面確認ミーティング', time: '14:00', detail: 'リョーケ工業 + ヤマハ担当', status: 'urgent', proj: 'yamaha' },
  { date: new Date(2026, 6, 7), title: 'Rapyuta 与信結果報告', time: '10:00', detail: '田中 + 野村担当', status: 'active', proj: 'rapyuta' },
  { date: new Date(2026, 6, 15), title: 'Moiron CADデータレビュー', time: '13:00', detail: 'Sandor P.とオンライン', status: 'pending', proj: 'moiron' },
  { date: new Date(2026, 6, 22), title: '平田商店 月次定例', time: '10:00', detail: '全員参加', status: 'active', proj: '' },
  { date: new Date(2026, 6, 28), title: 'FUJI 3D印刷 最終報告', time: '15:00', detail: '富士機械製造', status: 'done', proj: 'fuji' },
];

function MiniCalendar({ year, month, onMonthChange, onDateSelect, selectedDate }: {
  year: number; month: number;
  onMonthChange: (d: number) => void;
  onDateSelect: (d: Date) => void;
  selectedDate: Date | null;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const weeks = ['日', '月', '火', '水', '木', '金', '土'];
  const eventDates = scheduleEvents
    .filter(e => e.date.getFullYear() === year && e.date.getMonth() === month)
    .map(e => e.date.getDate());
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{ background: '#fff', border: '1px solid #e4e2dc', borderRadius: 12, padding: '16px', minWidth: 260 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <button onClick={() => onMonthChange(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5c5a54', padding: '4px' }}>‹</button>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1917' }}>{year}年{month + 1}月</div>
        <button onClick={() => onMonthChange(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5c5a54', padding: '4px' }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, textAlign: 'center' }}>
        {weeks.map((w, i) => (
          <div key={w} style={{ fontSize: 10, color: i === 0 ? '#c0392b' : i === 6 ? '#1e5fd4' : '#9e9b93', padding: '4px 0', fontWeight: 500 }}>{w}</div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
          const isSelected = selectedDate && selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === d;
          const hasEvent = eventDates.includes(d);
          const dow = (firstDay + d - 1) % 7;
          return (
            <div key={d} onClick={() => onDateSelect(new Date(year, month, d))} style={{
              padding: '5px 2px', borderRadius: 6, cursor: 'pointer',
              background: isSelected ? '#1e5fd4' : isToday ? '#eef3fd' : 'transparent',
              color: isSelected ? '#fff' : isToday ? '#1e5fd4' : dow === 0 ? '#c0392b' : dow === 6 ? '#1e5fd4' : '#1a1917',
              fontSize: 12, fontWeight: isToday ? 600 : 400,
            }}>
              {d}
              {hasEvent && <div style={{ width: 4, height: 4, borderRadius: '50%', background: isSelected ? '#fff' : '#1e5fd4', margin: '2px auto 0' }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CalendarView({ onProjectSelect }: { onProjectSelect: (id: string) => void }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleMonthChange = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
    setSelectedDate(null);
  };

  const filteredEvents = selectedDate
    ? scheduleEvents.filter(e =>
        e.date.getFullYear() === selectedDate.getFullYear() &&
        e.date.getMonth() === selectedDate.getMonth() &&
        e.date.getDate() === selectedDate.getDate())
    : scheduleEvents.filter(e => e.date.getFullYear() === year && e.date.getMonth() === month)
        .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <div style={{ width: 300, minWidth: 300, padding: '20px 16px', borderRight: '1px solid #e4e2dc', background: '#f9f8f6', overflowY: 'auto' }}>
        <MiniCalendar year={year} month={month} onMonthChange={handleMonthChange} onDateSelect={setSelectedDate} selectedDate={selectedDate} />
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#9e9b93', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>凡例</div>
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, fontSize: 11, color: '#5c5a54' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: cfg.color }} />{cfg.label}
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1917' }}>
              {selectedDate ? `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日のスケジュール` : `${year}年${month + 1}月のスケジュール`}
            </div>
            <div style={{ fontSize: 11, color: '#9e9b93', marginTop: 2 }}>{filteredEvents.length}件の予定</div>
          </div>
          {selectedDate && (
            <button onClick={() => setSelectedDate(null)} style={{ fontSize: 11, color: '#1e5fd4', background: '#eef3fd', border: '1px solid #b8ccf5', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>月全体を表示</button>
          )}
        </div>
        {filteredEvents.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#9e9b93', fontSize: 13, marginTop: 60 }}>この日程に予定はありません</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredEvents.map((s, i) => {
              const cfg = statusConfig[s.status];
              return (
                <div key={i} onClick={() => s.proj && onProjectSelect(s.proj)} style={{
                  display: 'flex', gap: 0, background: '#fff', border: '1px solid #e4e2dc',
                  borderRadius: 10, overflow: 'hidden', cursor: s.proj ? 'pointer' : 'default',
                }}
                  onMouseEnter={e => s.proj && (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <div style={{ width: 4, background: cfg.color, flexShrink: 0 }} />
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 16px', flex: 1 }}>
                    <div style={{ textAlign: 'center', minWidth: 48, background: '#f9f8f6', borderRadius: 8, padding: '6px 4px' }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#1e5fd4', lineHeight: 1 }}>{s.date.getDate()}</div>
                      <div style={{ fontSize: 10, color: '#9e9b93', marginTop: 2 }}>{s.date.getMonth() + 1}月</div>
                      <div style={{ fontSize: 10, color: '#9e9b93' }}>{['日','月','火','水','木','金','土'][s.date.getDay()]}曜</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1917', marginBottom: 3 }}>{s.title}</div>
                      <div style={{ fontSize: 11, color: '#9e9b93' }}>{s.time} — {s.detail}</div>
                    </div>
                    <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 10, flexShrink: 0, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>{cfg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

interface ProjectsListProps {
  onProjectSelect: (id: string) => void;
  dbProjects?: DBProject[];
}

export function ProjectsList({ onProjectSelect, dbProjects }: ProjectsListProps) {
  const list = dbProjects && dbProjects.length > 0 ? dbProjects : [];
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      <div style={{ fontSize: 11, color: '#9e9b93', fontWeight: 500, marginBottom: 14, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        全プロジェクト一覧
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {list.map((p) => {
          const cfg = statusConfig[p.status] || statusConfig.active;
          const borderColor = borderColorDB[p.status] || '#1e5fd4';
          return (
            <div key={p.id} onClick={() => onProjectSelect(p.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
              background: '#fff', border: '1px solid #e4e2dc', borderLeft: `3px solid ${borderColor}`,
              borderRadius: 8, cursor: 'pointer',
            }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <Folder size={18} color="#9e9b93" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1917' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#9e9b93', marginTop: 2 }}>
                  {p.client}　·　メンバー {p.project_members?.length ?? 0}名　·　書類 {p.documents?.length ?? 0}件
                </div>
              </div>
              <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 10, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>{cfg.label}</span>
              <ChevronRight size={14} color="#9e9b93" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
