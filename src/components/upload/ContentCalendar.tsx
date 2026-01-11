import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks, subWeeks, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar, Clock, MoreHorizontal, Edit2, Trash2, Eye, Copy, Send } from 'lucide-react';
import { SocialMediaPost, Platform, ViewMode } from '@/types/socialMedia';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface ContentCalendarProps {
  posts: SocialMediaPost[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  platforms: Platform[];
  onEditPost?: (post: SocialMediaPost) => void;
  onDeletePost?: (postId: string) => void;
  onDuplicatePost?: (post: SocialMediaPost) => void;
}

const ContentCalendar: React.FC<ContentCalendarProps> = ({
  posts,
  viewMode,
  onViewModeChange,
  platforms,
  onEditPost,
  onDeletePost,
  onDuplicatePost
}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedPost, setSelectedPost] = React.useState<SocialMediaPost | null>(null);
  const [showDetails, setShowDetails] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [postToDelete, setPostToDelete] = React.useState<SocialMediaPost | null>(null);

  const handleViewDetails = (post: SocialMediaPost) => {
    setSelectedPost(post);
    setShowDetails(true);
  };

  const handleEditPost = (post: SocialMediaPost) => {
    if (onEditPost) {
      onEditPost(post);
    } else {
      toast.info('Düzenleme modu açılıyor...', { description: post.content.slice(0, 50) });
    }
  };

  const handleDeleteClick = (post: SocialMediaPost) => {
    setPostToDelete(post);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      if (onDeletePost) {
        onDeletePost(postToDelete.id);
      }
      toast.success('İçerik silindi', { description: 'İçerik başarıyla silindi.' });
      setShowDeleteDialog(false);
      setPostToDelete(null);
    }
  };

  const handleDuplicate = (post: SocialMediaPost) => {
    if (onDuplicatePost) {
      onDuplicatePost(post);
    }
    toast.success('İçerik kopyalandı', { description: 'İçerik taslak olarak kopyalandı.' });
  };

  const handlePublishNow = (post: SocialMediaPost) => {
    toast.success('Yayınlanıyor...', { description: 'İçerik şimdi yayınlanıyor.' });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Yayında';
      case 'scheduled': return 'Planlandı';
      case 'draft': return 'Taslak';
      default: return status;
    }
  };

  const getContentTypeText = (type: string) => {
    const types: Record<string, string> = {
      post: 'Gönderi',
      story: 'Hikaye',
      reel: 'Reel',
      tweet: 'Tweet',
      video: 'Video',
      image: 'Görsel'
    };
    return types[type] || type;
  };

  const getDateRange = () => {
    if (viewMode === 'week') {
      return {
        start: startOfWeek(currentDate, { weekStartsOn: 1 }),
        end: endOfWeek(currentDate, { weekStartsOn: 1 })
      };
    } else {
      return {
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate)
      };
    }
  };

  const { start, end } = getDateRange();
  const days = eachDayOfInterval({ start, end });

  const navigateDate = (direction: 'prev' | 'next') => {
    if (viewMode === 'week') {
      setCurrentDate(direction === 'prev' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1));
    } else {
      setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
    }
  };

  const getPostsForDay = (date: Date) => {
    return posts.filter(post => isSameDay(post.scheduledDate, date));
  };

  const getPlatformColor = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform?.color || '#gray';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'draft': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="glass-panel border-tube-lightgray/30">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="flex items-center gap-2 text-tube-white">
            <Calendar size={20} />
            İçerik Takvimi
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex border border-tube-lightgray/30 rounded-md bg-tube-gray/40">
              <Button
                variant={viewMode === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('week')}
                className={viewMode === 'week' ? 'bg-tube-red text-white' : 'text-tube-white hover:bg-tube-gray/60'}
              >
                Hafta
              </Button>
              <Button
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('month')}
                className={viewMode === 'month' ? 'bg-tube-red text-white' : 'text-tube-white hover:bg-tube-gray/60'}
              >
                Ay
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('prev')}
                className="text-tube-white hover:bg-tube-gray/60"
              >
                <ChevronLeft size={16} />
              </Button>
              <span className="text-tube-white font-medium px-4">
                {format(currentDate, viewMode === 'week' ? 'dd MMM yyyy' : 'MMMM yyyy', { locale: tr })}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('next')}
                className="text-tube-white hover:bg-tube-gray/60"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-2 ${viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-7'}`}>
          {/* Header */}
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-tube-white/70 border-b border-tube-lightgray/30">
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {days.map((day) => {
            const dayPosts = getPostsForDay(day);
            const isToday = isSameDay(day, new Date());
            
            return (
              <div
                key={day.toISOString()}
                className={`min-h-[120px] p-2 border border-tube-lightgray/20 rounded-md bg-tube-gray/20 hover:bg-tube-gray/40 transition-colors ${
                  isToday ? 'ring-2 ring-tube-red' : ''
                }`}
              >
                <div className={`text-sm font-medium mb-2 ${isToday ? 'text-tube-red' : 'text-tube-white'}`}>
                  {format(day, 'd')}
                </div>
                
                <div className="space-y-1">
                  {dayPosts.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="text-xs p-1.5 rounded bg-tube-gray/60 text-tube-white cursor-pointer hover:bg-tube-gray/80 group relative"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1 flex-1 min-w-0">
                          <div className="flex gap-0.5 flex-shrink-0">
                            {post.platforms.slice(0, 2).map((platform) => (
                              <div
                                key={platform.id}
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: platform.color }}
                              />
                            ))}
                          </div>
                          <Badge
                            variant="secondary"
                            className={`text-[10px] px-1 py-0 ${getStatusColor(post.status)} text-white`}
                          >
                            {getStatusText(post.status)}
                          </Badge>
                        </div>
                        
                        {/* Actions Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-tube-lightgray/30"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal size={12} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            align="end" 
                            className="w-48 bg-tube-gray border-tube-lightgray/30"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DropdownMenuItem 
                              className="text-tube-white hover:bg-tube-lightgray/20 cursor-pointer"
                              onClick={() => handleViewDetails(post)}
                            >
                              <Eye size={14} className="mr-2" />
                              Detayları Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-tube-white hover:bg-tube-lightgray/20 cursor-pointer"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit2 size={14} className="mr-2" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-tube-white hover:bg-tube-lightgray/20 cursor-pointer"
                              onClick={() => handleDuplicate(post)}
                            >
                              <Copy size={14} className="mr-2" />
                              Kopyala
                            </DropdownMenuItem>
                            {post.status !== 'published' && (
                              <DropdownMenuItem 
                                className="text-tube-white hover:bg-tube-lightgray/20 cursor-pointer"
                                onClick={() => handlePublishNow(post)}
                              >
                                <Send size={14} className="mr-2" />
                                Şimdi Yayınla
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="bg-tube-lightgray/30" />
                            <DropdownMenuItem 
                              className="text-red-400 hover:bg-red-500/20 cursor-pointer"
                              onClick={() => handleDeleteClick(post)}
                            >
                              <Trash2 size={14} className="mr-2" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div 
                        className="flex items-center gap-1 text-tube-white/70"
                        onClick={() => handleViewDetails(post)}
                      >
                        <Clock size={10} />
                        <span>{format(post.scheduledDate, 'HH:mm')}</span>
                      </div>
                      <div 
                        className="truncate mt-0.5"
                        onClick={() => handleViewDetails(post)}
                      >
                        {post.content}
                      </div>
                    </div>
                  ))}
                  {dayPosts.length > 3 && (
                    <div className="text-xs text-tube-white/60 text-center">
                      +{dayPosts.length - 3} daha
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Post Details Sheet */}
        <Sheet open={showDetails} onOpenChange={setShowDetails}>
          <SheetContent className="bg-tube-gray border-tube-lightgray/30 text-tube-white w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="text-tube-white flex items-center gap-2">
                <Calendar size={20} />
                İçerik Detayları
              </SheetTitle>
              <SheetDescription className="text-tube-white/60">
                Planlanan içeriğin tüm bilgileri
              </SheetDescription>
            </SheetHeader>
            
            {selectedPost && (
              <div className="mt-6 space-y-6">
                {/* Status & Type */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`${getStatusColor(selectedPost.status)} text-white`}>
                    {getStatusText(selectedPost.status)}
                  </Badge>
                  <Badge variant="outline" className="border-tube-lightgray/30 text-tube-white">
                    {getContentTypeText(selectedPost.contentType)}
                  </Badge>
                </div>

                {/* Scheduled Date */}
                <div className="bg-tube-darkgray/50 rounded-lg p-4">
                  <div className="text-sm text-tube-white/60 mb-1">Planlanan Tarih</div>
                  <div className="flex items-center gap-2 text-tube-white">
                    <Calendar size={16} />
                    <span className="font-medium">
                      {format(selectedPost.scheduledDate, 'dd MMMM yyyy', { locale: tr })}
                    </span>
                    <Clock size={16} className="ml-2" />
                    <span className="font-medium">
                      {format(selectedPost.scheduledDate, 'HH:mm')}
                    </span>
                  </div>
                </div>

                {/* Platforms */}
                <div className="bg-tube-darkgray/50 rounded-lg p-4">
                  <div className="text-sm text-tube-white/60 mb-2">Platformlar</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.platforms.map((platform) => (
                      <Badge 
                        key={platform.id}
                        variant="outline"
                        className="border-tube-lightgray/30"
                        style={{ 
                          backgroundColor: `${platform.color}20`,
                          borderColor: platform.color,
                          color: platform.color
                        }}
                      >
                        {platform.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="bg-tube-darkgray/50 rounded-lg p-4">
                  <div className="text-sm text-tube-white/60 mb-2">İçerik</div>
                  <p className="text-tube-white whitespace-pre-wrap">{selectedPost.content}</p>
                </div>

                {/* Hashtags */}
                {selectedPost.hashtags && selectedPost.hashtags.length > 0 && (
                  <div className="bg-tube-darkgray/50 rounded-lg p-4">
                    <div className="text-sm text-tube-white/60 mb-2">Hashtagler</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedPost.hashtags.map((tag, index) => (
                        <Badge 
                          key={index}
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-400 border-blue-500/30"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mentions */}
                {selectedPost.mentions && selectedPost.mentions.length > 0 && (
                  <div className="bg-tube-darkgray/50 rounded-lg p-4">
                    <div className="text-sm text-tube-white/60 mb-2">Etiketler</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedPost.mentions.map((mention, index) => (
                        <Badge 
                          key={index}
                          variant="secondary"
                          className="bg-purple-500/20 text-purple-400 border-purple-500/30"
                        >
                          @{mention}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-tube-lightgray/30">
                  <Button 
                    className="flex-1 bg-tube-red hover:bg-tube-red/80"
                    onClick={() => {
                      handleEditPost(selectedPost);
                      setShowDetails(false);
                    }}
                  >
                    <Edit2 size={16} className="mr-2" />
                    Düzenle
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-tube-lightgray/30 text-tube-white hover:bg-tube-lightgray/20"
                    onClick={() => {
                      handleDuplicate(selectedPost);
                      setShowDetails(false);
                    }}
                  >
                    <Copy size={16} className="mr-2" />
                    Kopyala
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                    onClick={() => {
                      setShowDetails(false);
                      handleDeleteClick(selectedPost);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="bg-tube-gray border-tube-lightgray/30">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-tube-white">İçeriği Sil</AlertDialogTitle>
              <AlertDialogDescription className="text-tube-white/60">
                Bu içeriği silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </AlertDialogDescription>
            </AlertDialogHeader>
            {postToDelete && (
              <div className="bg-tube-darkgray/50 rounded-lg p-3 my-2">
                <p className="text-sm text-tube-white truncate">{postToDelete.content}</p>
                <p className="text-xs text-tube-white/60 mt-1">
                  {format(postToDelete.scheduledDate, 'dd MMM yyyy HH:mm', { locale: tr })}
                </p>
              </div>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel className="border-tube-lightgray/30 text-tube-white hover:bg-tube-lightgray/20">
                İptal
              </AlertDialogCancel>
              <AlertDialogAction 
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={confirmDelete}
              >
                Sil
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default ContentCalendar;
