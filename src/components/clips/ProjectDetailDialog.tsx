import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Trash2, Plus, StickyNote, Video, Calendar, Tag, Eye,
  CheckCircle2, Clock, FileText
} from 'lucide-react';
import { VideoProject, useProjectStore } from '@/hooks/useProjectStore';
import { toast } from 'sonner';

interface ProjectDetailDialogProps {
  project: VideoProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetailDialog = ({ project, open, onOpenChange }: ProjectDetailDialogProps) => {
  const [newNote, setNewNote] = useState('');
  const { updateProject, removeVideoFromProject, addNoteToProject, deleteNoteFromProject, getChannelName } = useProjectStore();

  if (!project) return null;

  const statusConfig = {
    'planning': { label: 'Planlama', icon: Clock, color: 'bg-yellow-500/20 text-yellow-400' },
    'in-progress': { label: 'Devam Ediyor', icon: FileText, color: 'bg-blue-500/20 text-blue-400' },
    'completed': { label: 'Tamamlandı', icon: CheckCircle2, color: 'bg-green-500/20 text-green-400' },
  };

  const status = statusConfig[project.status];

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    addNoteToProject(project.id, newNote.trim());
    setNewNote('');
    toast.success('Not eklendi');
  };

  const handleStatusChange = (val: string) => {
    updateProject(project.id, { status: val as VideoProject['status'] });
    toast.success('Durum güncellendi');
  };

  const handleProgressChange = (val: string) => {
    const num = Math.min(100, Math.max(0, parseInt(val) || 0));
    updateProject(project.id, { progress: num });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span>{project.name}</span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{getChannelName(project.channelId)} • Oluşturulma: {project.createdAt}</p>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh] pr-2">
          <div className="space-y-5">
            {/* Status & Progress */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Durum</label>
                <Select value={project.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">📋 Planlama</SelectItem>
                    <SelectItem value="in-progress">🔄 Devam Ediyor</SelectItem>
                    <SelectItem value="completed">✅ Tamamlandı</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">İlerleme: {project.progress}%</label>
                <div className="flex items-center gap-2">
                  <Progress value={project.progress} className="flex-1" />
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={project.progress}
                    onChange={(e) => handleProgressChange(e.target.value)}
                    className="w-16 h-8 text-center text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            {project.description && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Açıklama</label>
                <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">{project.description}</p>
              </div>
            )}

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            )}

            {/* Reference Videos */}
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Video className="w-4 h-4 text-primary" />
                Referans Videolar ({project.videos.length})
              </h4>
              {project.videos.length === 0 ? (
                <div className="text-center py-6 bg-muted/30 rounded-lg">
                  <Video className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">Henüz referans video yok</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Discover sayfasından video kaydedebilirsiniz</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {project.videos.map(video => (
                    <div key={video.id} className="flex items-center gap-3 p-2.5 bg-muted/30 rounded-lg group">
                      <div className="w-16 h-10 rounded bg-muted flex-shrink-0 overflow-hidden">
                        <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{video.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{video.channel}</span>
                          <span>•</span>
                          <Eye className="w-3 h-3" />
                          <span>{video.views}</span>
                          {video.performance && (
                            <>
                              <span>•</span>
                              <span className="text-primary">{video.performance}%</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 text-destructive"
                        onClick={() => {
                          removeVideoFromProject(project.id, video.id);
                          toast.success('Video kaldırıldı');
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-primary" />
                Proje Notları ({project.notes.length})
              </h4>
              <div className="flex gap-2 mb-3">
                <Textarea
                  placeholder="Yeni not ekle..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[60px] text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddNote();
                    }
                  }}
                />
              </div>
              <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()} className="mb-3">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Not Ekle
              </Button>
              {project.notes.length > 0 && (
                <div className="space-y-2">
                  {project.notes.map(note => (
                    <div key={note.id} className="flex items-start gap-2 p-2.5 bg-muted/30 rounded-lg group">
                      <StickyNote className="w-3.5 h-3.5 mt-0.5 text-primary/60 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{note.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{note.createdAt}</p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive"
                        onClick={() => {
                          deleteNoteFromProject(project.id, note.id);
                          toast.success('Not silindi');
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailDialog;
