import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { channelsData } from '@/data/channelsData';

export interface SavedVideo {
  id: string;
  title: string;
  channel: string;
  views: string;
  vph?: string;
  performance?: number;
  thumbnail: string;
  savedAt: string;
}

export interface ProjectNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface VideoProject {
  id: string;
  name: string;
  description: string;
  channelId: string;
  videos: SavedVideo[];
  notes: ProjectNote[];
  status: 'planning' | 'in-progress' | 'completed';
  progress: number;
  tags: string[];
  targetLanguage?: string;
  createdAt: string;
}

interface ProjectStore {
  projects: VideoProject[];
  addProject: (project: Omit<VideoProject, 'id' | 'createdAt'>) => VideoProject;
  deleteProject: (projectId: string) => void;
  updateProject: (projectId: string, updates: Partial<VideoProject>) => void;
  addVideoToProject: (projectId: string, video: SavedVideo) => void;
  removeVideoFromProject: (projectId: string, videoId: string) => void;
  addNoteToProject: (projectId: string, text: string) => void;
  deleteNoteFromProject: (projectId: string, noteId: string) => void;
  getProjectsByChannel: (channelId: string) => VideoProject[];
  getChannelName: (channelId: string) => string;
}

const ProjectContext = createContext<ProjectStore | null>(null);

const initialProjects: VideoProject[] = [
  {
    id: 'p1',
    name: 'React İçerik Fikirleri',
    description: 'React ile ilgili trend videolar ve ilham kaynakları',
    channelId: '1',
    videos: [],
    notes: [],
    status: 'planning',
    progress: 15,
    tags: ['react', 'javascript'],
    createdAt: '2026-03-01'
  },
  {
    id: 'p2',
    name: 'Node.js Serisi Araştırma',
    description: 'Node.js performans videoları için referans içerikler',
    channelId: '1',
    notes: [{id: 'n1', text: 'Fireship tarzı hızlı anlatım kullan', createdAt: '2026-02-25'}],
    videos: [
      {
        id: 'sv1',
        title: '10 Node.js Performance Tips',
        channel: 'Fireship',
        views: '1.2M',
        vph: '980',
        performance: 92,
        thumbnail: '/placeholder.svg',
        savedAt: '2026-02-28'
      }
    ],
    status: 'in-progress',
    progress: 60,
    tags: ['nodejs', 'backend'],
    targetLanguage: 'tr',
    createdAt: '2026-02-20'
  },
  {
    id: 'p3',
    name: 'GTA VI İçerik Planı',
    description: 'GTA VI çıkışı için hazırlık videoları',
    channelId: '2',
    videos: [],
    notes: [],
    status: 'planning',
    progress: 25,
    tags: ['gaming', 'gta'],
    createdAt: '2026-02-15'
  }
];

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<VideoProject[]>(initialProjects);

  const addProject = useCallback((project: Omit<VideoProject, 'id' | 'createdAt'>) => {
    const newProject: VideoProject = {
      ...project,
      id: `p-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  }, []);

  const updateProject = useCallback((projectId: string, updates: Partial<VideoProject>) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updates } : p));
  }, []);

  const addVideoToProject = useCallback((projectId: string, video: SavedVideo) => {
    setProjects(prev => prev.map(p =>
      p.id === projectId
        ? { ...p, videos: p.videos.some(v => v.id === video.id) ? p.videos : [...p.videos, video] }
        : p
    ));
  }, []);

  const removeVideoFromProject = useCallback((projectId: string, videoId: string) => {
    setProjects(prev => prev.map(p =>
      p.id === projectId
        ? { ...p, videos: p.videos.filter(v => v.id !== videoId) }
        : p
    ));
  }, []);

  const addNoteToProject = useCallback((projectId: string, text: string) => {
    const note: ProjectNote = { id: `n-${Date.now()}`, text, createdAt: new Date().toISOString().split('T')[0] };
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, notes: [...p.notes, note] } : p
    ));
  }, []);

  const deleteNoteFromProject = useCallback((projectId: string, noteId: string) => {
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, notes: p.notes.filter(n => n.id !== noteId) } : p
    ));
  }, []);

  const getProjectsByChannel = useCallback((channelId: string) => {
    return projects.filter(p => p.channelId === channelId);
  }, [projects]);

  const getChannelName = useCallback((channelId: string) => {
    return channelsData.find(c => c.id === channelId)?.name || 'Bilinmeyen Kanal';
  }, []);

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      deleteProject,
      updateProject,
      addVideoToProject,
      removeVideoFromProject,
      addNoteToProject,
      deleteNoteFromProject,
      getProjectsByChannel,
      getChannelName
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectStore = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjectStore must be used within ProjectProvider');
  return context;
};
