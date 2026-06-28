'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectRoom from './components/ProjectRoom';
import { ProjectsList, CalendarView } from './components/OtherViews';
import NewProjectModal from './components/NewProjectModal';
import ArchitectureView from './components/ArchitectureView';
import { useProjects } from './hooks/useProjects';

const viewTitles: Record<string, string> = {
  dashboard: 'ダッシュボード',
  projects: 'プロジェクト一覧',
  calendar: 'カレンダー',
  architecture: 'システム構成図',
};

export default function Home() {
  const [view, setView] = useState('dashboard');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { projects: dbProjects, loading, refresh } = useProjects();

  const handleProjectSelect = (id: string) => {
    setActiveProjectId(id);
    setView('project');
  };

  const handleViewChange = (v: string) => {
    setView(v);
    setActiveProjectId(null);
  };

  const activeProject = activeProjectId
    ? dbProjects.find(p => p.id === activeProjectId)
    : null;

  const topbarTitle = activeProject
    ? activeProject.name
    : viewTitles[view] || '';

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {showModal && (
        <NewProjectModal
          onClose={() => setShowModal(false)}
          onCreated={() => { refresh(); setView('projects'); }}
        />
      )}
      <Sidebar
        activeView={view}
        activeProjectId={activeProjectId}
        onViewChange={handleViewChange}
        onProjectSelect={handleProjectSelect}
        dbProjects={dbProjects}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f5f4f1' }}>
        <div style={{
          height: 52, padding: '0 24px', borderBottom: '1px solid #e4e2dc',
          background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1917' }}>
            {loading ? '読み込み中...' : topbarTitle}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {!loading && dbProjects.length > 0 && (
              <span style={{ fontSize: 11, color: '#15803d', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: 10 }}>
                DB接続済 {dbProjects.length}件
              </span>
            )}
            {view !== 'architecture' && (
              <button onClick={() => setShowModal(true)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '6px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                border: '1px solid #1e5fd4', background: '#1e5fd4', color: '#fff', fontFamily: 'inherit'
              }}>
                <Plus size={13} /> 新規プロジェクト
              </button>
            )}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {view === 'dashboard' && <Dashboard onProjectSelect={handleProjectSelect} dbProjects={dbProjects} />}
          {view === 'projects' && <ProjectsList onProjectSelect={handleProjectSelect} dbProjects={dbProjects} />}
          {view === 'calendar' && <CalendarView onProjectSelect={handleProjectSelect} />}
          {view === 'architecture' && <ArchitectureView />}
          {view === 'project' && activeProject && <ProjectRoom project={activeProject} />}
        </div>
      </div>
    </div>
  );
}
