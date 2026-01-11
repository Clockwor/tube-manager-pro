import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Play, Edit, Trash2, Upload, Eye, Heart, MessageCircle, 
  Calendar, Clock, TrendingUp, MoreHorizontal, Search,
  Filter, SortAsc, Download, Share2, Settings, X, Check
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const initialVideoData = [
  {
    id: 1,
    title: "Ultimate Beginner's Guide to Coffee",
    thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png",
    duration: "12:34",
    views: 45230,
    likes: 1250,
    comments: 89,
    publishedAt: "2024-01-15",
    status: "published",
    performance: "excellent"
  },
  {
    id: 2,
    title: "Coffee Bean Selection Tips",
    thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png",
    duration: "8:42",
    views: 23100,
    likes: 890,
    comments: 45,
    publishedAt: "2024-01-10",
    status: "published",
    performance: "good"
  },
  {
    id: 3,
    title: "5 Common Coffee Mistakes",
    thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png",
    duration: "15:21",
    views: 67890,
    likes: 2340,
    comments: 156,
    publishedAt: "2024-01-05",
    status: "published",
    performance: "excellent"
  },
  {
    id: 4,
    title: "Perfect Morning Coffee Routine",
    thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png",
    duration: "9:15",
    views: 12450,
    likes: 456,
    comments: 23,
    publishedAt: "2024-01-20",
    status: "scheduled",
    performance: "pending"
  }
];

const VideoManagement = () => {
  const [videos, setVideos] = useState(initialVideoData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('publishedAt');
  
  // Dialog states
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<typeof initialVideoData[0] | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'bg-green-500',
      scheduled: 'bg-blue-500',
      draft: 'bg-gray-500',
      private: 'bg-red-500'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-500';
  };

  const getPerformanceBadge = (performance: string) => {
    const variants = {
      excellent: 'bg-green-500',
      good: 'bg-yellow-500',
      average: 'bg-orange-500',
      poor: 'bg-red-500',
      pending: 'bg-gray-500'
    };
    return variants[performance as keyof typeof variants] || 'bg-gray-500';
  };

  const handleSelectVideo = (videoId: number) => {
    setSelectedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleSelectAll = () => {
    setSelectedVideos(
      selectedVideos.length === videos.length 
        ? [] 
        : videos.map(video => video.id)
    );
  };

  // Action handlers
  const handleUploadVideo = () => {
    setShowUploadDialog(true);
  };

  const handleConfirmUpload = () => {
    setShowUploadDialog(false);
    toast.success('Video yükleme başlatıldı!', {
      description: 'Video işleniyor, tamamlandığında bildirim alacaksınız.'
    });
  };

  const handleEditVideo = (video: typeof initialVideoData[0]) => {
    setCurrentVideo(video);
    setEditForm({ title: video.title, description: '' });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (currentVideo) {
      setVideos(prev => prev.map(v => 
        v.id === currentVideo.id ? { ...v, title: editForm.title } : v
      ));
      setShowEditDialog(false);
      toast.success('Video güncellendi!', {
        description: `"${editForm.title}" başarıyla kaydedildi.`
      });
    }
  };

  const handleShareVideo = (video: typeof initialVideoData[0]) => {
    setCurrentVideo(video);
    setShowShareDialog(true);
  };

  const handleCopyLink = () => {
    if (currentVideo) {
      navigator.clipboard.writeText(`https://youtube.com/watch?v=${currentVideo.id}`);
      toast.success('Link kopyalandı!');
    }
  };

  const handleDeleteVideo = (video: typeof initialVideoData[0]) => {
    setCurrentVideo(video);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (currentVideo) {
      setVideos(prev => prev.filter(v => v.id !== currentVideo.id));
      setSelectedVideos(prev => prev.filter(id => id !== currentVideo.id));
      setShowDeleteDialog(false);
      toast.success('Video silindi!', {
        description: `"${currentVideo.title}" başarıyla silindi.`
      });
    }
  };

  const handleBulkDownload = () => {
    toast.success(`${selectedVideos.length} video indiriliyor...`, {
      description: 'İndirme işlemi arka planda devam ediyor.'
    });
    setSelectedVideos([]);
  };

  const handleBulkDelete = () => {
    setVideos(prev => prev.filter(v => !selectedVideos.includes(v.id)));
    toast.success(`${selectedVideos.length} video silindi!`);
    setSelectedVideos([]);
  };

  const handleSettingsClick = () => {
    toast.info('Video ayarları açılıyor...');
  };

  // Filter and sort videos
  const filteredVideos = videos
    .filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || video.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.views - a.views;
        case 'likes':
          return b.likes - a.likes;
        case 'publishedAt':
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

  return (
    <>
      <Card className="bg-tube-dark border-tube-lightgray/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-tube-white text-xl">Video Yönetimi</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                className="bg-tube-red hover:bg-tube-darkred text-white"
                onClick={handleUploadVideo}
              >
                <Upload className="h-4 w-4 mr-2" />
                Video Yükle
              </Button>
              <Button 
                variant="outline" 
                className="border-tube-lightgray/30 text-tube-white"
                onClick={handleSettingsClick}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Filter and Search Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-tube-white/60" />
                <Input
                  placeholder="Video ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-tube-gray border-tube-lightgray/30 text-tube-white"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 bg-tube-gray border-tube-lightgray/30 text-tube-white">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent className="bg-tube-dark border-tube-lightgray/30">
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="published">Yayınlandı</SelectItem>
                  <SelectItem value="scheduled">Zamanlandı</SelectItem>
                  <SelectItem value="draft">Taslak</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-tube-gray border-tube-lightgray/30 text-tube-white">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent className="bg-tube-dark border-tube-lightgray/30">
                  <SelectItem value="publishedAt">Tarih</SelectItem>
                  <SelectItem value="views">Görüntülenme</SelectItem>
                  <SelectItem value="likes">Beğeni</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {selectedVideos.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-tube-white/70 text-sm">
                  {selectedVideos.length} video seçildi
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-tube-lightgray/30 text-tube-white"
                  onClick={handleBulkDownload}
                >
                  <Download className="h-4 w-4 mr-1" />
                  İndir
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-500 text-red-500 hover:bg-red-500/10"
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Sil
                </Button>
              </div>
            )}
          </div>

          {/* Videos Table */}
          <div className="rounded-lg border border-tube-lightgray/30 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-tube-lightgray/30">
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedVideos.length === filteredVideos.length && filteredVideos.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-tube-white">Video</TableHead>
                  <TableHead className="text-tube-white">Durum</TableHead>
                  <TableHead className="text-tube-white">Performans</TableHead>
                  <TableHead className="text-tube-white">İstatistikler</TableHead>
                  <TableHead className="text-tube-white">Yayın Tarihi</TableHead>
                  <TableHead className="text-tube-white">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVideos.map((video) => (
                  <TableRow key={video.id} className="border-b border-tube-lightgray/30 hover:bg-tube-gray/20">
                    <TableCell>
                      <Checkbox 
                        checked={selectedVideos.includes(video.id)}
                        onCheckedChange={() => handleSelectVideo(video.id)}
                      />
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-20 h-12 rounded object-cover"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-tube-white font-medium text-sm leading-tight line-clamp-2">
                            {video.title}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge className={`${getStatusBadge(video.status)} text-white`}>
                        {video.status === 'published' ? 'Yayınlandı' : 
                         video.status === 'scheduled' ? 'Zamanlandı' : 
                         video.status === 'draft' ? 'Taslak' : 'Özel'}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <Badge className={`${getPerformanceBadge(video.performance)} text-white`}>
                        {video.performance === 'excellent' ? 'Mükemmel' :
                         video.performance === 'good' ? 'İyi' :
                         video.performance === 'average' ? 'Ortalama' :
                         video.performance === 'poor' ? 'Zayıf' : 'Beklemede'}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-tube-white/70">
                          <Eye className="h-3 w-3" />
                          <span>{formatNumber(video.views)}</span>
                          <Heart className="h-3 w-3 ml-2" />
                          <span>{formatNumber(video.likes)}</span>
                          <MessageCircle className="h-3 w-3 ml-2" />
                          <span>{video.comments}</span>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-1 text-tube-white/70 text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(video.publishedAt).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-tube-white/70 hover:text-tube-white hover:bg-tube-gray/50"
                          onClick={() => handleEditVideo(video)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-tube-white/70 hover:text-tube-white hover:bg-tube-gray/50"
                          onClick={() => handleShareVideo(video)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-tube-white/70 hover:text-tube-white hover:bg-tube-gray/50"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-tube-dark border-tube-lightgray/30">
                            <DropdownMenuItem 
                              className="text-tube-white hover:bg-tube-gray/50 cursor-pointer"
                              onClick={() => {
                                toast.info('Video analitikleri yükleniyor...');
                              }}
                            >
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Analitikler
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-tube-white hover:bg-tube-gray/50 cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(`https://youtube.com/watch?v=${video.id}`);
                                toast.success('Link kopyalandı!');
                              }}
                            >
                              <Share2 className="h-4 w-4 mr-2" />
                              Linki Kopyala
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-tube-lightgray/30" />
                            <DropdownMenuItem 
                              className="text-red-500 hover:bg-red-500/10 cursor-pointer"
                              onClick={() => handleDeleteVideo(video)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Video Statistics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-tube-gray/40 border-tube-lightgray/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-tube-white/70 text-sm">Toplam Video</p>
                    <p className="text-2xl font-bold text-tube-white">{videos.length}</p>
                  </div>
                  <Play className="h-8 w-8 text-tube-red" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-tube-gray/40 border-tube-lightgray/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-tube-white/70 text-sm">Toplam Görüntülenme</p>
                    <p className="text-2xl font-bold text-tube-white">
                      {formatNumber(videos.reduce((sum, video) => sum + video.views, 0))}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-tube-gray/40 border-tube-lightgray/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-tube-white/70 text-sm">Toplam Beğeni</p>
                    <p className="text-2xl font-bold text-tube-white">
                      {formatNumber(videos.reduce((sum, video) => sum + video.likes, 0))}
                    </p>
                  </div>
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-tube-gray/40 border-tube-lightgray/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-tube-white/70 text-sm">Ortalama Etkileşim</p>
                    <p className="text-2xl font-bold text-tube-white">8.5%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="bg-tube-dark border-tube-lightgray/30">
          <DialogHeader>
            <DialogTitle className="text-tube-white">Video Yükle</DialogTitle>
            <DialogDescription className="text-tube-white/70">
              Yeni video yüklemek için dosya seçin veya sürükleyip bırakın.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <div className="border-2 border-dashed border-tube-lightgray/30 rounded-lg p-8 text-center hover:border-tube-red/50 transition-colors cursor-pointer">
              <Upload className="h-12 w-12 text-tube-white/60 mx-auto mb-4" />
              <p className="text-tube-white font-medium mb-2">Dosya seçin veya sürükleyip bırakın</p>
              <p className="text-tube-white/60 text-sm">MP4, MOV, AVI • Max 256GB</p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowUploadDialog(false)}
              className="border-tube-lightgray/30 text-tube-white"
            >
              İptal
            </Button>
            <Button 
              onClick={handleConfirmUpload}
              className="bg-tube-red hover:bg-tube-darkred text-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Yükle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-tube-dark border-tube-lightgray/30">
          <DialogHeader>
            <DialogTitle className="text-tube-white">Video Düzenle</DialogTitle>
            <DialogDescription className="text-tube-white/70">
              Video bilgilerini güncelleyin.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-tube-white">Başlık</Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="bg-tube-gray border-tube-lightgray/30 text-tube-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-tube-white">Açıklama</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="bg-tube-gray border-tube-lightgray/30 text-tube-white min-h-[100px]"
                placeholder="Video açıklaması..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowEditDialog(false)}
              className="border-tube-lightgray/30 text-tube-white"
            >
              İptal
            </Button>
            <Button 
              onClick={handleSaveEdit}
              className="bg-tube-red hover:bg-tube-darkred text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="bg-tube-dark border-tube-lightgray/30">
          <DialogHeader>
            <DialogTitle className="text-tube-white">Video Paylaş</DialogTitle>
            <DialogDescription className="text-tube-white/70">
              {currentVideo?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2">
              <Input
                value={currentVideo ? `https://youtube.com/watch?v=${currentVideo.id}` : ''}
                readOnly
                className="bg-tube-gray border-tube-lightgray/30 text-tube-white"
              />
              <Button 
                onClick={handleCopyLink}
                className="bg-tube-red hover:bg-tube-darkred text-white"
              >
                Kopyala
              </Button>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {['Twitter', 'Facebook', 'LinkedIn', 'WhatsApp'].map((platform) => (
                <Button
                  key={platform}
                  variant="outline"
                  className="border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/50"
                  onClick={() => {
                    toast.success(`${platform} ile paylaşılıyor...`);
                    setShowShareDialog(false);
                  }}
                >
                  {platform}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-tube-dark border-tube-lightgray/30">
          <DialogHeader>
            <DialogTitle className="text-tube-white">Video Sil</DialogTitle>
            <DialogDescription className="text-tube-white/70">
              Bu işlem geri alınamaz. Video kalıcı olarak silinecek.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-200 font-medium">{currentVideo?.title}</p>
              <p className="text-red-200/70 text-sm mt-1">
                {currentVideo && formatNumber(currentVideo.views)} görüntülenme • {currentVideo && formatNumber(currentVideo.likes)} beğeni
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
              className="border-tube-lightgray/30 text-tube-white"
            >
              İptal
            </Button>
            <Button 
              onClick={handleConfirmDelete}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoManagement;