'use client';
import { useEffect, useState, useCallback } from 'react';
import { createClient } from '../../lib/supabase';

export interface DBProject {
  id: string;
  name: string;
  client: string;
  status: 'urgent' | 'active' | 'pending' | 'done';
  tags: string[];
  description: string;
  next_meeting: string | null;
  messages: { id: string; text: string; is_ai: boolean; created_at: string }[];
  documents: { id: string; name: string; type: string; size: string }[];
  project_members: { role: string; profiles: { name: string; initials: string } | null }[];
}

export function useProjects() {
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        messages(id, text, is_ai, created_at),
        documents(id, name, type, size),
        project_members(role, profiles(name, initials))
      `)
      .order('created_at', { ascending: false });

    if (!error && data) setProjects(data as DBProject[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  return { projects, loading, refresh: fetchProjects };
}
