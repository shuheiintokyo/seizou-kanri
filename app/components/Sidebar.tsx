'use client';
import { LayoutDashboard, Folder, Calendar, Circle, LogOut, Network } from 'lucide-react';
import { currentUser } from '../data/mockData';
import { DBProject } from '../hooks/useProjects';

interface SidebarProps {
  activeView: string;
  activeProjectId: string | null;
  onViewChange: (view: string) => void;
  onProjectSelect: (id: string) => void;
  dbProjects?: DBProject[];
}

const borderColorDB: Record<string, string> = {
  urgent: '#c0392b', active: '#1e5fd4', pending: '#b45309', done: '#15803d',
};

export default function Sidebar({ activeView, activeProjectId, onViewChange, onProjectSelect, dbProjects }: SidebarProps) {
  const projects = dbProjects && dbProjects.length > 0 ? dbProjects : [];

  return (
    <aside style={{
      width: 220, minWidth: 220, background: '#ffffff',
      borderRight: '1px solid #e4e2dc', display: 'flex',
      flexDirection: 'column', height: '100vh'
    }}>
      <div style={{ padding: '20px 16px 14px', borderBottom: '1px solid #e4e2dc' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1917' }}>プロジェクト管理</div>
        <div style={{ fontSize: 11, color: '#9e9b93', marginTop: 3 }}>平田商店 製造コンサル</div>
      </div>

      <nav style={{ padding: '10px 8px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: 10, color: '#9e9b93', padding: '8px 8px 4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          メニュー
        </div>
        {[
          { id: 'dashboard', label: 'ダッシュボード', Icon: LayoutDashboard },
          { id: 'projects', label: 'プロジェクト一覧', Icon: Folder },
          { id: 'calendar', label: 'カレンダー', Icon: Calendar },
          { id: 'architecture', label: 'システム構成図', Icon: Network },
        ].map(({ id, label, Icon }) => (
          <button key={id} onClick={() => onViewChange(id)} style={{
            display: 'flex', alignItems: 'center', gap: 8, width: '100%',
            padding: '7px 10px', borderRadius: 6, cursor: 'pointer', border: 'none',
            fontSize: 13, textAlign: 'left', marginBottom: 2,
            background: activeView === id && !activeProjectId ? '#eef3fd' : 'transparent',
            color: activeView === id && !activeProjectId ? '#1e5fd4' : '#5c5a54',
          }}>
            <Icon size={15} />
            {label}
            {id === 'projects' && projects.length > 0 && (
              <span style={{
                marginLeft: 'auto', background: '#1e5fd4', color: '#fff',
                fontSize: 10, padding: '1px 6px', borderRadius: 10
              }}>{projects.length}</span>
            )}
          </button>
        ))}

        <div style={{ fontSize: 10, color: '#9e9b93', padding: '14px 8px 4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          プロジェクト
        </div>
        {projects.map(p => (
          <button key={p.id} onClick={() => onProjectSelect(p.id)} style={{
            display: 'flex', alignItems: 'center', gap: 8, width: '100%',
            padding: '6px 10px', borderRadius: 6, cursor: 'pointer', border: 'none',
            fontSize: 12, textAlign: 'left', marginBottom: 1,
            background: activeProjectId === p.id ? '#f5f4f1' : 'transparent',
            color: activeProjectId === p.id ? '#1a1917' : '#5c5a54',
          }}>
            <Circle size={8} fill={borderColorDB[p.status] || '#9e9b93'} color={borderColorDB[p.status] || '#9e9b93'} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
          </button>
        ))}
      </nav>

      <div style={{ padding: '12px 14px', borderTop: '1px solid #e4e2dc', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: '#eef3fd',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 600, color: '#1e5fd4', flexShrink: 0
        }}>{currentUser.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#1a1917' }}>{currentUser.name}</div>
          <div style={{ fontSize: 10, color: '#9e9b93' }}>{currentUser.role}</div>
        </div>
        <LogOut size={14} color="#9e9b93" style={{ cursor: 'pointer', flexShrink: 0 }} />
      </div>
    </aside>
  );
}
