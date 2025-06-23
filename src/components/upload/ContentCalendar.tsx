
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks, subWeeks, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { SocialMediaPost, Platform, ViewMode } from '@/types/socialMedia';

interface ContentCalendarProps {
  posts: SocialMediaPost[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  platforms: Platform[];
}

const ContentCalendar: React.FC<ContentCalendarProps> = ({
  posts,
  viewMode,
  onViewModeChange,
  platforms
}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

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
                      className="text-xs p-1 rounded bg-tube-gray/60 text-tube-white truncate cursor-pointer hover:bg-tube-gray/80"
                      title={post.content}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex gap-1">
                          {post.platforms.map((platform) => (
                            <div
                              key={platform.id}
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: platform.color }}
                            />
                          ))}
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-xs px-1 ${getStatusColor(post.status)} text-white`}
                        >
                          {post.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={10} />
                        <span>{format(post.scheduledDate, 'HH:mm')}</span>
                      </div>
                      <div className="truncate">{post.content}</div>
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
      </CardContent>
    </Card>
  );
};

export default ContentCalendar;
