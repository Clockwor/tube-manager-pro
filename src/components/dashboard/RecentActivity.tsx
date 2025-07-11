import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Video, Users, MessageSquare, Trophy, 
  Clock, ExternalLink, MoreHorizontal 
} from 'lucide-react';
import { ActivityItem } from '@/types/youtube';

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'video_published':
        return <Video className="h-4 w-4 text-tube-red" />;
      case 'milestone_reached':
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 'comment_received':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'subscriber_gained':
        return <Users className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-tube-white/60" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'video_published':
        return 'bg-tube-red/20 border-tube-red/30';
      case 'milestone_reached':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'comment_received':
        return 'bg-blue-500/20 border-blue-500/30';
      case 'subscriber_gained':
        return 'bg-green-500/20 border-green-500/30';
      default:
        return 'bg-tube-gray/20 border-tube-lightgray/30';
    }
  };

  const getActivityTitle = (type: ActivityItem['type']) => {
    switch (type) {
      case 'video_published':
        return 'Video Yayınlandı';
      case 'milestone_reached':
        return 'Milestone Ulaşıldı';
      case 'comment_received':
        return 'Yeni Yorum';
      case 'subscriber_gained':
        return 'Yeni Abone';
      default:
        return 'Aktivite';
    }
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Az önce';
    if (diffInHours < 24) return `${diffInHours} saat önce`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} gün önce`;
    return `${Math.floor(diffInHours / 168)} hafta önce`;
  };

  return (
    <Card className="bg-tube-dark border-tube-lightgray/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-tube-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-tube-red" />
          Son Aktiviteler
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-tube-white/70 hover:text-tube-white">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-tube-white/30 mx-auto mb-3" />
            <p className="text-tube-white/60">Henüz aktivite bulunmuyor</p>
            <p className="text-sm text-tube-white/40 mt-1">
              Kanallarınızda aktivite başladığında burada görüntülenecek
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:border-opacity-80 ${getActivityColor(activity.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-tube-dark/50">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs border-tube-lightgray/30">
                      {getActivityTitle(activity.type)}
                    </Badge>
                    <span className="text-xs text-tube-white/50">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-tube-white text-sm mb-1">
                    {activity.channelName}
                  </h4>
                  
                  <p className="text-sm text-tube-white/70 line-clamp-2">
                    {activity.message}
                  </p>
                  
                  {activity.metadata && (
                    <div className="mt-2 flex items-center gap-2">
                      {activity.metadata.videoTitle && (
                        <Badge variant="secondary" className="text-xs bg-tube-gray/40">
                          {activity.metadata.videoTitle}
                        </Badge>
                      )}
                      {activity.metadata.subscriberCount && (
                        <Badge variant="secondary" className="text-xs bg-tube-gray/40">
                          {activity.metadata.subscriberCount.toLocaleString()} abone
                        </Badge>
                      )}
                      {activity.metadata.milestoneType && (
                        <Badge variant="secondary" className="text-xs bg-tube-gray/40">
                          {activity.metadata.milestoneType}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-tube-white/60 hover:text-tube-white p-1"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))
        )}
        
        {activities.length > 0 && (
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/40"
              size="sm"
            >
              Tüm Aktiviteleri Görüntüle
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;