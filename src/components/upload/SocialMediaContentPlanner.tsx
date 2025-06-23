
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, Filter, Search, BarChart3 } from 'lucide-react';
import { SocialMediaPost, Platform, ContentType, PostStatus, ViewMode, FilterOptions } from '@/types/socialMedia';
import ContentCalendar from './ContentCalendar';
import CreatePostForm from './CreatePostForm';
import PostsList from './PostsList';

const platforms: Platform[] = [
  { id: 'instagram', name: 'Instagram', icon: 'instagram', color: '#E4405F', isActive: true },
  { id: 'twitter', name: 'Twitter/X', icon: 'twitter', color: '#1DA1F2', isActive: true },
  { id: 'facebook', name: 'Facebook', icon: 'facebook', color: '#1877F2', isActive: true },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', color: '#0A66C2', isActive: true },
  { id: 'youtube', name: 'YouTube', icon: 'youtube', color: '#FF0000', isActive: true },
  { id: 'tiktok', name: 'TikTok', icon: 'music', color: '#000000', isActive: true },
];

// Sample data
const samplePosts: SocialMediaPost[] = [
  {
    id: '1',
    content: 'Yeni video içeriğimiz yayında! 🎉 #content #video',
    platforms: [platforms[0], platforms[1]],
    contentType: 'post',
    scheduledDate: new Date(2024, 5, 25, 10, 0),
    status: 'scheduled',
    hashtags: ['#content', '#video'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    content: 'Story içeriği hazırlanıyor... 📱',
    platforms: [platforms[0]],
    contentType: 'story',
    scheduledDate: new Date(2024, 5, 26, 14, 30),
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const SocialMediaContentPlanner = () => {
  const [posts, setPosts] = useState<SocialMediaPost[]>(samplePosts);
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    platforms: [],
    contentTypes: [],
    statuses: [],
    searchTerm: '',
  });

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesPlatform = filters.platforms.length === 0 || 
        post.platforms.some(p => filters.platforms.includes(p.id));
      const matchesContentType = filters.contentTypes.length === 0 || 
        filters.contentTypes.includes(post.contentType);
      const matchesStatus = filters.statuses.length === 0 || 
        filters.statuses.includes(post.status);
      const matchesSearch = filters.searchTerm === '' || 
        post.content.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      return matchesPlatform && matchesContentType && matchesStatus && matchesSearch;
    });
  }, [posts, filters]);

  const handleCreatePost = (newPost: Omit<SocialMediaPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const post: SocialMediaPost = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPosts(prev => [...prev, post]);
    setShowCreateForm(false);
  };

  const stats = useMemo(() => {
    const scheduled = posts.filter(p => p.status === 'scheduled').length;
    const drafts = posts.filter(p => p.status === 'draft').length;
    const published = posts.filter(p => p.status === 'published').length;
    return { scheduled, drafts, published, total: posts.length };
  }, [posts]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-tube-white mb-2">Sosyal Medya İçerik Planlayıcı</h2>
          <p className="text-tube-white/70">İçeriklerinizi planlayın ve yönetin</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-tube-red hover:bg-tube-darkred text-white"
          >
            <Plus size={16} className="mr-2" />
            Yeni İçerik
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-panel border-tube-lightgray/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-tube-white/70">Toplam</p>
                <p className="text-2xl font-bold text-tube-white">{stats.total}</p>
              </div>
              <BarChart3 className="text-tube-red" size={20} />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-panel border-tube-lightgray/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-tube-white/70">Planlanmış</p>
                <p className="text-2xl font-bold text-blue-400">{stats.scheduled}</p>
              </div>
              <Clock className="text-blue-400" size={20} />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-panel border-tube-lightgray/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-tube-white/70">Taslak</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.drafts}</p>
              </div>
              <Filter className="text-yellow-400" size={20} />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-panel border-tube-lightgray/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-tube-white/70">Yayınlandı</p>
                <p className="text-2xl font-bold text-green-400">{stats.published}</p>
              </div>
              <Calendar className="text-green-400" size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass-panel border-tube-lightgray/30">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tube-white/50" size={16} />
                <Input
                  placeholder="İçerik ara..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white pl-10"
                />
              </div>
            </div>
            <Select value={filters.platforms.join(',')} onValueChange={(value) => 
              setFilters(prev => ({ ...prev, platforms: value ? value.split(',') : [] }))
            }>
              <SelectTrigger className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white w-[180px]">
                <SelectValue placeholder="Platform Filtrele" />
              </SelectTrigger>
              <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                {platforms.map((platform) => (
                  <SelectItem key={platform.id} value={platform.id} className="text-tube-white">
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.statuses.join(',')} onValueChange={(value) => 
              setFilters(prev => ({ ...prev, statuses: value ? value.split(',') as PostStatus[] : [] }))
            }>
              <SelectTrigger className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white w-[180px]">
                <SelectValue placeholder="Durum Filtrele" />
              </SelectTrigger>
              <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                <SelectItem value="draft" className="text-tube-white">Taslak</SelectItem>
                <SelectItem value="scheduled" className="text-tube-white">Planlanmış</SelectItem>
                <SelectItem value="published" className="text-tube-white">Yayınlandı</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-tube-gray/40 border border-tube-lightgray/30">
          <TabsTrigger 
            value="calendar" 
            className="flex items-center gap-2 data-[state=active]:bg-tube-red data-[state=active]:text-white text-tube-white/70"
          >
            <Calendar size={16} />
            Takvim Görünümü
          </TabsTrigger>
          <TabsTrigger 
            value="list" 
            className="flex items-center gap-2 data-[state=active]:bg-tube-red data-[state=active]:text-white text-tube-white/70"
          >
            <Filter size={16} />
            Liste Görünümü
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-0">
          <ContentCalendar 
            posts={filteredPosts} 
            viewMode={viewMode} 
            onViewModeChange={setViewMode}
            platforms={platforms}
          />
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <PostsList posts={filteredPosts} platforms={platforms} />
        </TabsContent>
      </Tabs>

      {/* Create Post Modal */}
      {showCreateForm && (
        <CreatePostForm
          platforms={platforms}
          onSubmit={handleCreatePost}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};

export default SocialMediaContentPlanner;
