
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar, Clock, Edit, Trash2, Copy, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SocialMediaPost, Platform } from '@/types/socialMedia';

interface PostsListProps {
  posts: SocialMediaPost[];
  platforms: Platform[];
}

const PostsList: React.FC<PostsListProps> = ({ posts, platforms }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'draft': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Yayınlandı';
      case 'scheduled': return 'Planlanmış';
      case 'draft': return 'Taslak';
      default: return status;
    }
  };

  const getContentTypeText = (type: string) => {
    switch (type) {
      case 'post': return 'Gönderi';
      case 'story': return 'Story';
      case 'reel': return 'Reel';
      case 'tweet': return 'Tweet';
      case 'video': return 'Video';
      case 'image': return 'Resim';
      default: return type;
    }
  };

  if (posts.length === 0) {
    return (
      <Card className="glass-panel border-tube-lightgray/30">
        <CardContent className="p-8 text-center">
          <div className="text-tube-white/60">
            <Calendar size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Henüz içerik yok</h3>
            <p>Filtrelerinizle eşleşen içerik bulunamadı.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-panel border-tube-lightgray/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-tube-white">
          <Calendar size={20} />
          İçerik Listesi ({posts.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`p-4 hover:bg-tube-gray/20 transition-colors ${
                index !== posts.length - 1 ? 'border-b border-tube-lightgray/20' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs px-2 ${getStatusColor(post.status)} text-white`}
                    >
                      {getStatusText(post.status)}
                    </Badge>
                    <Badge variant="outline" className="text-xs text-tube-white border-tube-lightgray/30">
                      {getContentTypeText(post.contentType)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-tube-white/50" />
                      <span className="text-xs text-tube-white/70">
                        {format(post.scheduledDate, 'dd MMM yyyy, HH:mm', { locale: tr })}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2">
                    <p className="text-tube-white line-clamp-3 mb-1">
                      {post.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-tube-white/70">Platformlar:</span>
                      <div className="flex gap-1">
                        {post.platforms.map((platform) => (
                          <div
                            key={platform.id}
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: platform.color }}
                            title={platform.name}
                          />
                        ))}
                      </div>
                    </div>

                    {post.hashtags && post.hashtags.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-tube-white/70">Hashtag:</span>
                        <span className="text-xs text-blue-300">
                          {post.hashtags.slice(0, 2).join(' ')}
                          {post.hashtags.length > 2 && ' ...'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-tube-white/70 hover:bg-tube-gray/40"
                      >
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-tube-gray border-tube-lightgray/30">
                      <DropdownMenuItem className="text-tube-white hover:bg-tube-lightgray/20">
                        <Edit size={14} className="mr-2" />
                        Düzenle
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-tube-white hover:bg-tube-lightgray/20">
                        <Copy size={14} className="mr-2" />
                        Kopyala
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:bg-tube-lightgray/20">
                        <Trash2 size={14} className="mr-2" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsList;
