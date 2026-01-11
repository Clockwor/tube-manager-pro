import React, { useState } from 'react';
import { Music, Info, Calendar, Filter, Eye, Heart, MoreVertical, Edit, Trash2, ExternalLink, Instagram, Youtube } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import CreatePostDialog from './CreatePostDialog';

interface Post {
  id: string;
  title: string;
  date: string;
  platform: string;
  views: string;
  engagement: string;
  account: string;
  status?: 'published' | 'scheduled' | 'draft';
  thumbnail?: string;
}

interface PostsTableProps {
  posts: Post[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  activeTab,
  setActiveTab,
}) => {
  const { toast } = useToast();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [timeFilter, setTimeFilter] = useState('7days');
  const [platformFilter, setPlatformFilter] = useState('all');

  const availablePlatforms = ['TikTok', 'Instagram', 'YouTube', 'Facebook', 'X'];

  // Extended mock posts for demonstration
  const mockPosts: Post[] = [
    {
      id: '1',
      title: '2024 Pazarlama Stratejileri',
      date: '15 Haz 2024, 14:30',
      platform: 'TikTok',
      views: '24.5K',
      engagement: '8.3%',
      account: '@dancekween',
      status: 'published'
    },
    {
      id: '2',
      title: 'Seyahat Vlog - İstanbul',
      date: '14 Haz 2024, 18:00',
      platform: 'Instagram',
      views: '12.1K',
      engagement: '6.7%',
      account: '@traveldiaries',
      status: 'published'
    },
    {
      id: '3',
      title: 'Teknoloji İncelemesi',
      date: '13 Haz 2024, 20:00',
      platform: 'YouTube',
      views: '45.2K',
      engagement: '4.2%',
      account: 'Tech Insights',
      status: 'published'
    }
  ];

  const scheduledPosts: Post[] = [
    {
      id: 's1',
      title: 'Yeni Ürün Tanıtımı',
      date: '20 Haz 2024, 12:00',
      platform: 'TikTok',
      views: '-',
      engagement: '-',
      account: '@viralkids',
      status: 'scheduled'
    },
    {
      id: 's2',
      title: 'Haftalık Tips',
      date: '22 Haz 2024, 18:00',
      platform: 'Instagram',
      views: '-',
      engagement: '-',
      account: '@foodiehaven',
      status: 'scheduled'
    }
  ];

  const displayedPosts = activeTab === 'published' ? mockPosts : scheduledPosts;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'TikTok': return <Music className="h-4 w-4" />;
      case 'Instagram': return <Instagram className="h-4 w-4" />;
      case 'YouTube': return <Youtube className="h-4 w-4" />;
      default: return <Music className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'TikTok': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Instagram': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'YouTube': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Facebook': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleDelete = (postId: string) => {
    toast({
      title: "Gönderi Silindi",
      description: "Gönderi başarıyla silindi.",
      variant: "destructive"
    });
  };

  const handleEdit = (postId: string) => {
    toast({
      title: "Düzenleme Modu",
      description: "Gönderi düzenleme ekranı açılıyor...",
    });
  };

  return (
    <>
      <CreatePostDialog
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        availablePlatforms={availablePlatforms}
      />
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <TabsList className="bg-tube-gray/40">
            <TabsTrigger value="published" className="data-[state=active]:bg-tube-lightgray/30">
              Yayınlanan ({mockPosts.length})
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="data-[state=active]:bg-tube-lightgray/30">
              Programlanan ({scheduledPosts.length})
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-3">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="bg-tube-gray/50 border-tube-lightgray/30 w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                <SelectItem value="7days">Son 7 Gün</SelectItem>
                <SelectItem value="30days">Son 30 Gün</SelectItem>
                <SelectItem value="3months">Son 3 Ay</SelectItem>
                <SelectItem value="all">Tüm Zamanlar</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="bg-tube-gray/50 border-tube-lightgray/30 w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                <SelectItem value="all">Tüm Platformlar</SelectItem>
                {availablePlatforms.map(platform => (
                  <SelectItem key={platform} value={platform.toLowerCase()}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="published" className="mt-0">
          <div className="rounded-lg border border-tube-lightgray/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-tube-lightgray/20 bg-tube-gray/30">
                  <TableHead className="text-tube-white/70">Gönderi</TableHead>
                  <TableHead className="text-tube-white/70">Tarih</TableHead>
                  <TableHead className="text-tube-white/70">Platform</TableHead>
                  <TableHead className="text-tube-white/70">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      Görüntüleme
                    </div>
                  </TableHead>
                  <TableHead className="text-tube-white/70">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      Etkileşim
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-tube-white/70">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedPosts.map((post) => (
                  <TableRow key={post.id} className="border-tube-lightgray/20 hover:bg-tube-gray/20">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                          {getPlatformIcon(post.platform)}
                        </div>
                        <div>
                          <p className="text-tube-white font-medium">{post.title}</p>
                          <p className="text-xs text-tube-white/60">{post.account}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-tube-white/70">{post.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPlatformColor(post.platform)}>
                        {getPlatformIcon(post.platform)}
                        <span className="ml-1">{post.platform}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-tube-white font-medium">{post.views}</TableCell>
                    <TableCell className="text-tube-white font-medium">{post.engagement}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="hover:bg-tube-lightgray/20">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-tube-gray border-tube-lightgray/30">
                          <DropdownMenuItem onClick={() => handleEdit(post.id)} className="text-tube-white hover:bg-tube-lightgray/20">
                            <Edit className="h-4 w-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-tube-white hover:bg-tube-lightgray/20">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-red-400 hover:bg-red-500/20">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled">
          {scheduledPosts.length > 0 ? (
            <div className="rounded-lg border border-tube-lightgray/20 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-tube-lightgray/20 bg-tube-gray/30">
                    <TableHead className="text-tube-white/70">Gönderi</TableHead>
                    <TableHead className="text-tube-white/70">Planlanan Tarih</TableHead>
                    <TableHead className="text-tube-white/70">Platform</TableHead>
                    <TableHead className="text-tube-white/70">Hesap</TableHead>
                    <TableHead className="text-right text-tube-white/70">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledPosts.map((post) => (
                    <TableRow key={post.id} className="border-tube-lightgray/20 hover:bg-tube-gray/20">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                            {getPlatformIcon(post.platform)}
                          </div>
                          <p className="text-tube-white font-medium">{post.title}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-tube-white/70">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPlatformColor(post.platform)}>
                          {getPlatformIcon(post.platform)}
                          <span className="ml-1">{post.platform}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-tube-white/70">{post.account}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-tube-lightgray/20">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-tube-gray border-tube-lightgray/30">
                            <DropdownMenuItem onClick={() => handleEdit(post.id)} className="text-tube-white hover:bg-tube-lightgray/20">
                              <Edit className="h-4 w-4 mr-2" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-red-400 hover:bg-red-500/20">
                              <Trash2 className="h-4 w-4 mr-2" />
                              İptal Et
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-tube-gray/20 rounded-lg border border-tube-lightgray/20">
              <Calendar className="h-16 w-16 text-tube-white/30 mb-4" />
              <h3 className="text-lg font-semibold text-tube-white mb-2">Programlanan Gönderi Yok</h3>
              <p className="text-tube-white/70 mb-6 max-w-md">
                Gönderilerinizi önceden planlayın ve en iyi zamanlarda otomatik olarak yayınlayın.
              </p>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowCreatePost(true)}
              >
                Gönderi Programla
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PostsTable;
