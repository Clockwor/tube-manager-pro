import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, Users, Eye, BookOpen, Video, Target, Star, Play, ExternalLink, Lightbulb, Image, UserPlus, X, FolderPlus, FolderOpen, ChevronDown, Check, Trash2, GripVertical, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import PageContainer from '@/components/PageContainer';
import { channelsData } from '@/data/channelsData';
import { useProjectStore, SavedVideo } from '@/hooks/useProjectStore';
import { toast } from 'sonner';

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Channel & Project state
  const [selectedChannelId, setSelectedChannelId] = useState<string>('');
  const [showProjectPanel, setShowProjectPanel] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  const { projects, addProject, deleteProject, addVideoToProject, removeVideoFromProject, getProjectsByChannel } = useProjectStore();

  const selectedChannel = channelsData.find(c => c.id === selectedChannelId);
  const currentChannelProjects = getProjectsByChannel(selectedChannelId);

  const outliers = [
    { id: 'o1', title: "10 Magic Tricks With Hands Only | Revealed", channel: "Magic Secrets", views: "2.1M", vph: "1.6K", thumbnail: "/placeholder.svg", performance: 95 },
    { id: 'o2', title: "Dynamo Best Performed Magic Tricks", channel: "Magic World", views: "1.8M", vph: "1.2K", thumbnail: "/placeholder.svg", performance: 88 },
    { id: 'o3', title: "Science Experiments That Look Like Magic", channel: "Science Fun", views: "950K", vph: "850", thumbnail: "/placeholder.svg", performance: 78 },
    { id: 'o4', title: "AI Tools That Will Blow Your Mind in 2026", channel: "Tech Explorer", views: "3.2M", vph: "2.1K", thumbnail: "/placeholder.svg", performance: 97 },
    { id: 'o5', title: "Build a Full App in 10 Minutes with AI", channel: "Code Fast", views: "1.5M", vph: "1.8K", thumbnail: "/placeholder.svg", performance: 91 },
    { id: 'o6', title: "Why Every Developer Should Learn Rust", channel: "Programming Hub", views: "890K", vph: "720", thumbnail: "/placeholder.svg", performance: 82 },
  ];

  const trendingKeywords = [
    { keyword: "AI automation", searches: "125K", competition: "Medium", trend: "+45%" },
    { keyword: "YouTube shorts", searches: "98K", competition: "High", trend: "+38%" },
    { keyword: "content creation", searches: "87K", competition: "Medium", trend: "+25%" },
    { keyword: "video editing", searches: "76K", competition: "High", trend: "+15%" },
    { keyword: "viral videos", searches: "65K", competition: "High", trend: "+55%" }
  ];

  const competitors = [
    { name: "TechReview Pro", subscribers: "2.4M", avgViews: "145K", uploadFreq: "3x/week", topVideo: "Best Phones 2024", similarity: 85 },
    { name: "Gadget Guru", subscribers: "1.8M", avgViews: "98K", uploadFreq: "2x/week", topVideo: "iPhone vs Android", similarity: 78 },
    { name: "Tech Talk Daily", subscribers: "1.2M", avgViews: "76K", uploadFreq: "Daily", topVideo: "Future of Tech", similarity: 72 }
  ];

  const learningContent = [
    { title: "YouTube Algorithm Mastery", type: "Course", duration: "4 hours", level: "Intermediate", rating: 4.8, students: "12.5K" },
    { title: "Thumbnail Design Secrets", type: "Workshop", duration: "2 hours", level: "Beginner", rating: 4.9, students: "8.2K" },
    { title: "SEO for YouTube Creators", type: "Masterclass", duration: "3 hours", level: "Advanced", rating: 4.7, students: "15.3K" }
  ];

  const handleCreateProject = () => {
    if (!newProjectName.trim() || !selectedChannelId) return;

    addProject({
      name: newProjectName,
      description: newProjectDesc,
      channelId: selectedChannelId,
      videos: [],
      status: 'planning',
      progress: 0,
      tags: [],
    });

    setNewProjectName('');
    setNewProjectDesc('');
    setIsCreateProjectOpen(false);
    toast.success(`"${newProjectName}" projesi oluşturuldu`);
  };

  const handleSaveToProject = (projectId: string, video: any) => {
    const savedVideo: SavedVideo = {
      id: video.id || Date.now().toString(),
      title: video.title,
      channel: video.channel,
      views: video.views,
      vph: video.vph,
      performance: video.performance,
      thumbnail: video.thumbnail || '/placeholder.svg',
      savedAt: new Date().toISOString().split('T')[0]
    };

    addVideoToProject(projectId, savedVideo);

    const project = projects.find(p => p.id === projectId);
    toast.success(`"${video.title}" → ${project?.name || 'proje'} klasörüne eklendi`);
  };

  const handleRemoveFromProject = (projectId: string, videoId: string) => {
    removeVideoFromProject(projectId, videoId);
    toast.success('Video projeden kaldırıldı');
  };

  const handleDeleteProject = (projectId: string) => {
    deleteProject(projectId);
    toast.success('Proje silindi');
  };

  const SaveToProjectButton = ({ video }: { video: any }) => {
    if (!selectedChannelId || !currentChannelProjects.length) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
            <FolderPlus className="h-3.5 w-3.5 mr-1.5" />
            Projeye Kaydet
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
            {selectedChannel?.name} Projeleri
          </div>
          <DropdownMenuSeparator />
          {currentChannelProjects.projects.map(project => {
            const alreadySaved = project.videos.some(v => v.title === video.title);
            return (
              <DropdownMenuItem
                key={project.id}
                onClick={() => !alreadySaved && handleSaveToProject(project.id, video)}
                disabled={alreadySaved}
                className="flex items-center gap-2"
              >
                {alreadySaved ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <FolderOpen className="h-4 w-4" />
                )}
                <span className="flex-1 truncate">{project.name}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5">
                  {project.videos.length}
                </Badge>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsCreateProjectOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Proje Oluştur
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const totalSavedVideos = channelProjectsMap.reduce((sum, cp) => sum + cp.projects.reduce((s, p) => s + p.videos.length, 0), 0);

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Discover</h1>
            <p className="text-muted-foreground mt-2">Find winning ideas to inspire your next video</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </Button>
            <Button variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Shorts
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Thumbnails
            </Button>
          </div>
        </div>

        {/* Channel Selector & Project Panel Toggle */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 flex-1 min-w-[280px]">
                <FolderOpen className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground whitespace-nowrap">Kanal Seç:</span>
                <Select value={selectedChannelId} onValueChange={(val) => { setSelectedChannelId(val); setShowProjectPanel(true); }}>
                  <SelectTrigger className="w-full max-w-[300px]">
                    <SelectValue placeholder="Bir kanal seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {channelsData.map(channel => (
                      <SelectItem key={channel.id} value={channel.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                            {channel.name[0]}
                          </div>
                          <span>{channel.name}</span>
                          <Badge variant="secondary" className="text-[10px] ml-1">
                            {channel.tags?.[0]}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedChannelId && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setIsCreateProjectOpen(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <FolderPlus className="h-4 w-4 mr-1.5" />
                    Yeni Proje
                  </Button>
                  <Button
                    size="sm"
                    variant={showProjectPanel ? "default" : "outline"}
                    onClick={() => setShowProjectPanel(!showProjectPanel)}
                  >
                    <FolderOpen className="h-4 w-4 mr-1.5" />
                    Projeler ({currentChannelProjects?.projects.length || 0})
                  </Button>
                </div>
              )}

              {!selectedChannelId && (
                <p className="text-xs text-muted-foreground">
                  💡 Bir kanal seçerek keşfettiğiniz videoları proje klasörlerine kaydedin
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Layout: Content + Project Panel */}
        <div className={`flex gap-6 ${showProjectPanel && selectedChannelId ? '' : ''}`}>
          {/* Main Content */}
          <div className={`flex-1 min-w-0 ${showProjectPanel && selectedChannelId ? 'max-w-[calc(100%-360px)]' : ''}`}>
            <Tabs defaultValue="outliers" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="outliers">
                  <Star className="h-4 w-4 mr-2" />
                  Outliers
                </TabsTrigger>
                <TabsTrigger value="keywords">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Keywords
                </TabsTrigger>
                <TabsTrigger value="competitors">
                  <Users className="h-4 w-4 mr-2" />
                  Competitors
                </TabsTrigger>
                <TabsTrigger value="subscribers">
                  <Eye className="h-4 w-4 mr-2" />
                  Subscribers
                </TabsTrigger>
                <TabsTrigger value="learn">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learn
                </TabsTrigger>
              </TabsList>

              {/* Outliers Tab */}
              <TabsContent value="outliers" className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for trending videos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button>Find Outliers</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {outliers.map((video) => (
                    <div key={video.id} className="group cursor-pointer">
                      <div className="relative rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 bg-card">
                        <div className="absolute top-3 left-3 z-10">
                          <div className="bg-gradient-to-r from-green-500 to-green-400 text-white text-xs font-bold px-2 py-1 rounded">
                            &gt;{video.performance}x
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-1 rounded">
                            {video.vph} VPH
                          </div>
                        </div>

                        <div
                          className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden"
                          onClick={() => { setSelectedVideo(video); setIsVideoModalOpen(true); }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Video className="h-12 w-12 text-muted-foreground/30" />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-primary/90 rounded-full p-3">
                              <Play className="h-6 w-6 text-primary-foreground fill-current" />
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="text-foreground font-semibold text-sm line-clamp-2 mb-2 leading-tight">
                            {video.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                            <span>{video.channel}</span>
                            <span>{video.views} views</span>
                          </div>

                          {/* Performance Bar */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted-foreground">Performance</span>
                              <span className="text-xs text-green-400 font-medium">{video.performance}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-green-500 to-green-400 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${video.performance}%` }}
                              />
                            </div>
                          </div>

                          {/* Save to Project */}
                          <div className="flex items-center gap-2">
                            <SaveToProjectButton video={video} />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-muted-foreground hover:text-foreground"
                              onClick={() => { setSelectedVideo(video); setIsVideoModalOpen(true); }}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              Detay
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Keywords Tab */}
              <TabsContent value="keywords" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trending Keywords for Your Channel</CardTitle>
                    <CardDescription>Discover trending topics that can boost your channel's visibility</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trendingKeywords.map((keyword, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{keyword.keyword}</h4>
                            <p className="text-sm text-muted-foreground">{keyword.searches} monthly searches</p>
                          </div>
                          <div className="text-center">
                            <Badge variant={keyword.competition === 'High' ? 'destructive' : 'secondary'}>
                              {keyword.competition}
                            </Badge>
                          </div>
                          <div className="text-center ml-4">
                            <span className="text-lg font-bold text-green-400">{keyword.trend}</span>
                            <p className="text-xs text-muted-foreground">Trend</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Competitors Tab */}
              <TabsContent value="competitors" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Competitors</CardTitle>
                    <CardDescription>Analyze channels similar to yours and learn from their strategies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {competitors.map((competitor, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{competitor.name}</h4>
                            <p className="text-sm text-muted-foreground">Top Video: {competitor.topVideo}</p>
                          </div>
                          <div className="grid grid-cols-3 gap-6 text-center">
                            <div>
                              <p className="text-lg font-bold text-primary">{competitor.subscribers}</p>
                              <p className="text-xs text-muted-foreground">Subscribers</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-primary">{competitor.avgViews}</p>
                              <p className="text-xs text-muted-foreground">Avg Views</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-primary">{competitor.uploadFreq}</p>
                              <p className="text-xs text-muted-foreground">Upload Freq</p>
                            </div>
                          </div>
                          <div className="text-center ml-4">
                            <p className="text-lg font-bold text-green-400">{competitor.similarity}%</p>
                            <p className="text-xs text-muted-foreground">Similarity</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Subscribers Tab */}
              <TabsContent value="subscribers" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader><CardTitle>Subscriber Growth</CardTitle></CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary">+2.5K</p>
                        <p className="text-sm text-muted-foreground">This month</p>
                        <Progress value={75} className="mt-4" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Demographics</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between"><span className="text-muted-foreground">18-24</span><span>35%</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">25-34</span><span>40%</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">35-44</span><span>25%</span></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Top Countries</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between"><span className="text-muted-foreground">United States</span><span>45%</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">United Kingdom</span><span>20%</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Canada</span><span>15%</span></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Learn Tab */}
              <TabsContent value="learn" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Develop Your Skills</CardTitle>
                    <CardDescription>Take your YouTube channel to the next level with expert courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {learningContent.map((course, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{course.title}</h4>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="outline">{course.type}</Badge>
                              <span className="text-sm text-muted-foreground">{course.duration}</span>
                              <span className="text-sm text-muted-foreground">{course.level}</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span>{course.rating}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{course.students} students</p>
                          </div>
                          <Button className="ml-4">Enroll</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Project Sidebar Panel */}
          {showProjectPanel && selectedChannelId && (
            <div className="w-[340px] shrink-0">
              <Card className="sticky top-4 border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {selectedChannel?.name[0]}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{selectedChannel?.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {currentChannelProjects?.projects.length || 0} proje
                        </CardDescription>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => setShowProjectPanel(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="space-y-2">
                      {currentChannelProjects?.projects.length === 0 && (
                        <div className="text-center py-8">
                          <FolderOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground mb-3">Henüz proje yok</p>
                          <Button size="sm" onClick={() => setIsCreateProjectOpen(true)}>
                            <FolderPlus className="h-4 w-4 mr-1.5" />
                            İlk Projeyi Oluştur
                          </Button>
                        </div>
                      )}

                      {currentChannelProjects?.projects.map(project => (
                        <Collapsible key={project.id} defaultOpen={project.videos.length > 0}>
                          <div className="rounded-lg border border-border overflow-hidden">
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/50 transition-colors text-left">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <FolderOpen className="h-4 w-4 text-primary shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-foreground truncate">{project.name}</p>
                                  <p className="text-[11px] text-muted-foreground">{project.videos.length} video</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button size="icon" variant="ghost" className="h-6 w-6">
                                      <GripVertical className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProject(project.id)}>
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Projeyi Sil
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                              </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="border-t border-border">
                                {project.videos.length === 0 ? (
                                  <p className="text-xs text-muted-foreground text-center py-4">
                                    Video eklemek için kartlardaki<br />"Projeye Kaydet" butonunu kullanın
                                  </p>
                                ) : (
                                  <div className="p-2 space-y-1.5">
                                    {project.videos.map(video => (
                                      <div key={video.id} className="flex items-start gap-2 p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors group/video">
                                        <div className="w-16 h-10 rounded bg-muted shrink-0 flex items-center justify-center">
                                          <Video className="h-4 w-4 text-muted-foreground/50" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">{video.title}</p>
                                          <p className="text-[10px] text-muted-foreground mt-0.5">{video.channel} • {video.views}</p>
                                        </div>
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="h-5 w-5 opacity-0 group-hover/video:opacity-100 shrink-0"
                                          onClick={() => handleRemoveFromProject(project.id, video.id)}
                                        >
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </CollapsibleContent>
                          </div>
                        </Collapsible>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Video Details Modal */}
        <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="text-xl font-bold">Video Details</DialogTitle>
            </DialogHeader>

            {selectedVideo && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-primary/90 rounded-full p-4">
                          <Play className="h-8 w-8 text-primary-foreground fill-current" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Star className="h-5 w-5 text-green-400 mr-2" />
                        </div>
                        <div className="text-2xl font-bold text-green-400">&gt;{selectedVideo.performance}x</div>
                        <div className="text-sm text-muted-foreground">Outlier Score</div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Eye className="h-5 w-5 text-primary mr-2" />
                        </div>
                        <div className="text-2xl font-bold">{selectedVideo.views}</div>
                        <div className="text-sm text-muted-foreground">Views</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">{selectedVideo.vph}</div>
                        <div className="text-sm text-muted-foreground">Views Per Hour</div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-destructive">Bad</div>
                        <div className="text-sm text-muted-foreground">Engagement</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>13,722,302 views • 4 years ago</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">OM</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{selectedVideo.channel}</div>
                        <div className="text-xs text-muted-foreground">1.5M subs • 158,608 avg views</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save to Project in Modal */}
                {selectedChannelId && currentChannelProjects && currentChannelProjects.projects.length > 0 && (
                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <FolderPlus className="h-4 w-4 text-primary" />
                      Projeye Kaydet — {selectedChannel?.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentChannelProjects.projects.map(project => {
                        const alreadySaved = project.videos.some(v => v.title === selectedVideo.title);
                        return (
                          <Button
                            key={project.id}
                            size="sm"
                            variant={alreadySaved ? "secondary" : "outline"}
                            disabled={alreadySaved}
                            onClick={() => handleSaveToProject(project.id, selectedVideo)}
                            className="gap-1.5"
                          >
                            {alreadySaved ? <Check className="h-3.5 w-3.5 text-green-500" /> : <FolderOpen className="h-3.5 w-3.5" />}
                            {project.name}
                            <Badge variant="secondary" className="text-[10px] px-1 ml-1">{project.videos.length}</Badge>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Button variant="outline" className="justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />Open in YouTube
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Lightbulb className="h-4 w-4 mr-2" />Remix title
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Image className="h-4 w-4 mr-2" />Remix thumbnail
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Search className="h-4 w-4 mr-2" />Find similar titles
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Image className="h-4 w-4 mr-2" />Find similar thumbnails
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <UserPlus className="h-4 w-4 mr-2" />Add as competitor
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Create Project Dialog */}
        <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-primary" />
                Yeni Proje Oluştur
              </DialogTitle>
              <DialogDescription>
                {selectedChannel?.name} kanalı için yeni bir video projesi oluşturun
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Proje Adı</label>
                <Input
                  placeholder="Örn: React Tutorial Serisi"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Açıklama (opsiyonel)</label>
                <Input
                  placeholder="Bu proje hakkında kısa bir not..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateProjectOpen(false)}>İptal</Button>
              <Button onClick={handleCreateProject} disabled={!newProjectName.trim()}>
                <FolderPlus className="h-4 w-4 mr-1.5" />
                Oluştur
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default Discover;
