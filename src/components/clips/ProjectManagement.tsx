import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FolderPlus, 
  Upload, 
  FileText, 
  Scissors, 
  Languages, 
  Video, 
  BarChart3, 
  Image, 
  Send, 
  Grid3X3,
  Play,
  Pause,
  Download,
  Eye,
  Settings,
  Calendar,
  Tag,
  Globe,
  Trash2,
  FolderOpen
} from 'lucide-react';
import { channelsData } from '@/data/channelsData';
import { useProjectStore } from '@/hooks/useProjectStore';
import { toast } from 'sonner';

const ProjectManagement = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedChannelId, setSelectedChannelId] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectTags, setNewProjectTags] = useState('');

  const { projects, addProject, deleteProject, updateProject, getProjectsByChannel, getChannelName } = useProjectStore();

  const channelProjects = selectedChannelId ? getProjectsByChannel(selectedChannelId) : projects;

  const statusIcon = (s: string) => s === 'completed' ? '✅' : s === 'in-progress' ? '🔄' : '📋';

  const handleCreateProject = () => {
    if (!newProjectName.trim() || !selectedChannelId) {
      toast.error('Proje adı ve kanal seçimi zorunludur');
      return;
    }
    addProject({
      name: newProjectName,
      description: newProjectDesc,
      channelId: selectedChannelId,
      videos: [],
      status: 'planning',
      progress: 0,
      tags: newProjectTags.split(',').map(t => t.trim()).filter(Boolean),
    });
    setNewProjectName('');
    setNewProjectDesc('');
    setNewProjectTags('');
    toast.success(`"${newProjectName}" projesi oluşturuldu`);
  };

  return (
    <div className="space-y-6">
      {/* Multi-Channel Dashboard */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-tube-white">
            <Grid3X3 className="w-5 h-5" />
            Multi-Channel Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {channelsData.map(channel => {
              const chProjects = getProjectsByChannel(channel.id);
              const totalVideos = chProjects.reduce((sum, p) => sum + p.videos.length, 0);
              return (
                <Card 
                  key={channel.id} 
                  className={`cursor-pointer transition-all ${selectedChannelId === channel.id ? 'border-primary bg-primary/10' : 'bg-tube-gray/20 border-tube-gray/40 hover:border-primary/50'}`}
                  onClick={() => setSelectedChannelId(channel.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {channel.name[0]}
                      </div>
                      <h3 className="text-tube-white font-medium">{channel.name}</h3>
                    </div>
                    <div className="text-sm text-tube-white/70">
                      <p>{chProjects.length} Proje</p>
                      <p>{totalVideos} Referans Video</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="space-y-2">
            <h4 className="text-tube-white font-medium">Tüm Projeler</h4>
            {channelProjects.length === 0 && (
              <div className="text-center py-6 text-tube-white/50">
                <FolderOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>Henüz proje yok. Bir kanal seçin ve yeni proje oluşturun.</p>
              </div>
            )}
            {channelProjects.map(project => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-tube-gray/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{statusIcon(project.status)}</span>
                  <div>
                    <p className="text-tube-white font-medium">{project.name}</p>
                    <p className="text-tube-white/70 text-sm">{getChannelName(project.channelId)} • {project.videos.length} referans video</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {project.tags.length > 0 && (
                    <div className="flex gap-1">
                      {project.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                  )}
                  <Progress value={project.progress} className="w-24" />
                  <span className="text-tube-white/70 text-sm">{project.progress}%</span>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => { deleteProject(project.id); toast.success('Proje silindi'); }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="project-creation" className="w-full">
        <TabsList className="bg-tube-gray/40 mb-6 grid grid-cols-5 lg:grid-cols-10">
          <TabsTrigger value="project-creation">🎬 Proje</TabsTrigger>
          <TabsTrigger value="upload">📥 Upload</TabsTrigger>
          <TabsTrigger value="transcription">📝 Transkript</TabsTrigger>
          <TabsTrigger value="segmentation">✂️ Sahneler</TabsTrigger>
          <TabsTrigger value="translation">🌍 Çeviri</TabsTrigger>
          <TabsTrigger value="montage">🎞️ Montaj</TabsTrigger>
          <TabsTrigger value="status">📊 Durum</TabsTrigger>
          <TabsTrigger value="thumbnail">🎨 Thumbnail</TabsTrigger>
          <TabsTrigger value="publishing">📤 Yayın</TabsTrigger>
          <TabsTrigger value="insights">📊 Analiz</TabsTrigger>
        </TabsList>

        {/* Project Creation Panel */}
        <TabsContent value="project-creation">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <FolderPlus className="w-5 h-5" />
                Yeni Video Projesi Oluştur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-tube-white text-sm font-medium mb-2 block">Proje Adı</label>
                  <Input 
                    placeholder="Örn: React 19 Tutorial Serisi" 
                    className="bg-tube-gray/20 border-tube-gray/40"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-tube-white text-sm font-medium mb-2 block">Kanal</label>
                  <Select value={selectedChannelId} onValueChange={setSelectedChannelId}>
                    <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40">
                      <SelectValue placeholder="Kanal seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {channelsData.map(channel => (
                        <SelectItem key={channel.id} value={channel.id}>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-[9px] font-bold text-primary-foreground">
                              {channel.name[0]}
                            </div>
                            {channel.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-tube-white text-sm font-medium mb-2 block">Açıklama</label>
                  <Input 
                    placeholder="Proje hakkında kısa açıklama" 
                    className="bg-tube-gray/20 border-tube-gray/40"
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-tube-white text-sm font-medium mb-2 block">Hedef Dil</label>
                  <Select>
                    <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40">
                      <SelectValue placeholder="Dil seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-tube-white text-sm font-medium mb-2 block">Etiketler</label>
                <Input 
                  placeholder="Virgülle ayırın: react, tutorial, web" 
                  className="bg-tube-gray/20 border-tube-gray/40"
                  value={newProjectTags}
                  onChange={(e) => setNewProjectTags(e.target.value)}
                />
              </div>

              {/* Show reference videos from Discover */}
              {selectedChannelId && getProjectsByChannel(selectedChannelId).length > 0 && (
                <div className="p-4 bg-tube-gray/20 rounded-lg">
                  <h4 className="text-tube-white font-medium mb-3 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-primary" />
                    Discover'dan Kaydedilen Referanslar
                  </h4>
                  <div className="space-y-2">
                    {getProjectsByChannel(selectedChannelId).map(project => (
                      <div key={project.id} className="flex items-center justify-between p-2 bg-tube-gray/30 rounded">
                        <div>
                          <p className="text-tube-white text-sm font-medium">{project.name}</p>
                          <p className="text-tube-white/60 text-xs">{project.videos.length} referans video</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">{project.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button className="w-full bg-tube-red hover:bg-tube-red/80" onClick={handleCreateProject} disabled={!newProjectName.trim() || !selectedChannelId}>
                <FolderPlus className="w-4 h-4 mr-2" />
                Proje Oluştur
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Upload & Management */}
        <TabsContent value="upload">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Upload className="w-5 h-5" />
                Video Upload & Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-tube-gray/40 rounded-lg p-8 text-center mb-6">
                <Upload className="w-12 h-12 text-tube-white/50 mx-auto mb-4" />
                <p className="text-tube-white mb-2">Drag and drop videos here</p>
                <p className="text-tube-white/70 text-sm">Auto-renamed as kaynak_01.mp4, kaynak_02.mp4</p>
                <Button variant="outline" className="mt-4">Browse Files</Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-tube-white font-medium">Uploaded Videos</h4>
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-tube-gray/20 rounded-lg">
                    <div className="w-20 h-12 bg-tube-gray/40 rounded flex items-center justify-center">
                      <Video className="w-6 h-6 text-tube-white/50" />
                    </div>
                    <div className="flex-1">
                      <p className="text-tube-white font-medium">kaynak_0{i}.mp4</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">belgesel</Badge>
                        <Badge variant="secondary" className="text-xs">haber</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transcription Interface */}
        <TabsContent value="transcription">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <FileText className="w-5 h-5" />
                Transcription Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Video Player</h4>
                  <div className="aspect-video bg-tube-gray/20 rounded-lg flex items-center justify-center mb-4">
                    <Play className="w-12 h-12 text-tube-white/50" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </Button>
                    <Button size="sm" variant="outline">Generate Transcript</Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Transcript Editor</h4>
                  <Textarea 
                    placeholder="AI-generated transcript will appear here..."
                    className="h-64 bg-tube-gray/20 border-tube-gray/40 resize-none"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Save Transcript</Button>
                    <Button size="sm" variant="outline">Export SRT</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scene Segmentation Panel */}
        <TabsContent value="segmentation">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Scissors className="w-5 h-5" />
                Scene Segmentation Panel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="aspect-video bg-tube-gray/20 rounded-lg flex items-center justify-center">
                  <p className="text-tube-white/70">Timeline-based scene detection will appear here</p>
                </div>
                <div className="flex gap-4">
                  <Button>Auto Split Scenes</Button>
                  <Button variant="outline">Manual Split</Button>
                  <Button variant="outline">Export to /bolunmus_sahneler/</Button>
                </div>
                <div className="space-y-2">
                  <h4 className="text-tube-white font-medium">Detected Scenes</h4>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-3 bg-tube-gray/20 rounded-lg">
                      <span className="text-tube-white">Scene {i} (00:0{i}:00 - 00:0{i+1}:30)</span>
                      <Input placeholder="Add scene note" className="w-48 bg-tube-gray/40 border-tube-gray/60" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Translation & Subtitling Panel */}
        <TabsContent value="translation">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Languages className="w-5 h-5" />
                Translation & Subtitling Panel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Source Language</h4>
                  <Select>
                    <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40 mb-4">
                      <SelectValue placeholder="Turkish" />
                    </SelectTrigger>
                  </Select>
                  <Textarea 
                    placeholder="Source text..."
                    className="h-48 bg-tube-gray/20 border-tube-gray/40"
                  />
                </div>
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Target Language</h4>
                  <Select>
                    <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40 mb-4">
                      <SelectValue placeholder="English" />
                    </SelectTrigger>
                  </Select>
                  <Textarea 
                    placeholder="Translated text will appear here..."
                    className="h-48 bg-tube-gray/20 border-tube-gray/40"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button>Translate with DeepL</Button>
                <Button variant="outline">Generate TTS</Button>
                <Button variant="outline">Export SRT</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Montage Planning Board */}
        <TabsContent value="montage">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Video className="w-5 h-5" />
                Montage Planning Board
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="min-h-32 border-2 border-dashed border-tube-gray/40 rounded-lg p-4">
                  <p className="text-tube-white/70 text-center">Drag scene blocks here to create timeline</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-3 bg-tube-gray/20 rounded-lg cursor-move">
                      <div className="aspect-video bg-tube-gray/40 rounded mb-2 flex items-center justify-center">
                        <Video className="w-6 h-6 text-tube-white/50" />
                      </div>
                      <p className="text-tube-white text-sm">Scene {i}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button>Export to Premiere (.xml)</Button>
                  <Button variant="outline">Export to DaVinci (.drp)</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Project Status & Logs */}
        <TabsContent value="status">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <BarChart3 className="w-5 h-5" />
                Project Status & Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="p-4 bg-tube-gray/20 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{project.status}</span>
                        <div>
                          <h4 className="text-tube-white font-medium">{project.name}</h4>
                          <p className="text-tube-white/70 text-sm">{project.channel}</p>
                        </div>
                      </div>
                      <Badge variant={project.status === '✅' ? 'default' : project.status === '🔄' ? 'secondary' : 'destructive'}>
                        {project.progress}% Complete
                      </Badge>
                    </div>
                    <Progress value={project.progress} className="mb-3" />
                    <div className="text-sm text-tube-white/70">
                      <p>✅ Video uploaded</p>
                      <p>✅ Transcript generated</p>
                      <p>{project.progress > 50 ? '✅' : '🔄'} Scenes segmented</p>
                      <p>{project.progress > 80 ? '✅' : '⏳'} Translation completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Thumbnail & Metadata Creator */}
        <TabsContent value="thumbnail">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Image className="w-5 h-5" />
                Thumbnail & Metadata Creator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Thumbnail Generator</h4>
                  <div className="aspect-video bg-tube-gray/20 rounded-lg flex items-center justify-center mb-4">
                    <Image className="w-12 h-12 text-tube-white/50" />
                  </div>
                  <div className="flex gap-2">
                    <Button>Generate AI Thumbnail</Button>
                    <Button variant="outline">Upload Custom</Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Video Metadata</h4>
                  <div className="space-y-4">
                    <Input placeholder="Video title" className="bg-tube-gray/20 border-tube-gray/40" />
                    <Textarea placeholder="Video description" className="bg-tube-gray/20 border-tube-gray/40" />
                    <Input placeholder="Tags (comma separated)" className="bg-tube-gray/20 border-tube-gray/40" />
                    <Button className="w-full">Save to /yayin/</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Publishing & Insights Panel */}
        <TabsContent value="publishing">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Send className="w-5 h-5" />
                Publishing & Insights Panel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-tube-white font-medium mb-4">Upload to YouTube</h4>
                    <div className="space-y-4">
                      <Select>
                        <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40">
                          <SelectValue placeholder="Select channel" />
                        </SelectTrigger>
                      </Select>
                      <Select>
                        <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40">
                          <SelectValue placeholder="Privacy setting" />
                        </SelectTrigger>
                      </Select>
                      <Button className="w-full bg-tube-red hover:bg-tube-red/80">
                        <Send className="w-4 h-4 mr-2" />
                        Upload to YouTube
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-tube-white font-medium mb-4">Live Analytics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-tube-white">
                        <span>Views:</span>
                        <span>1,234</span>
                      </div>
                      <div className="flex justify-between text-tube-white">
                        <span>Likes:</span>
                        <span>45</span>
                      </div>
                      <div className="flex justify-between text-tube-white">
                        <span>Comments:</span>
                        <span>12</span>
                      </div>
                      <div className="flex justify-between text-tube-white">
                        <span>Retention:</span>
                        <span>78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights */}
        <TabsContent value="insights">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <BarChart3 className="w-5 h-5" />
                Analytics & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 bg-tube-gray/20 rounded-lg flex items-center justify-center">
                  <p className="text-tube-white/70">Views Chart</p>
                </div>
                <div className="h-64 bg-tube-gray/20 rounded-lg flex items-center justify-center">
                  <p className="text-tube-white/70">Engagement Chart</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-tube-gray/20 rounded-lg">
                <h4 className="text-tube-white font-medium mb-2">AI Suggestions</h4>
                <p className="text-tube-white/70">Based on your analytics, consider uploading at 2 PM for better engagement.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagement;