import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, Eye, Video, TrendingUp, TrendingDown, 
  Verified, MoreHorizontal, ExternalLink 
} from 'lucide-react';
import { YouTubeChannel } from '@/types/youtube';

interface ChannelOverviewCardProps {
  channel: YouTubeChannel;
  onManage: (channelId: string) => void;
  onAnalyze: (channelId: string) => void;
}

const ChannelOverviewCard: React.FC<ChannelOverviewCardProps> = ({
  channel,
  onManage,
  onAnalyze
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getGrowthIcon = (percentage: number) => {
    if (percentage > 0) return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (percentage < 0) return <TrendingDown className="h-3 w-3 text-red-500" />;
    return null;
  };

  const getCountryFlag = (countryCode: string): string => {
    const flags: Record<string, string> = {
      US: '🇺🇸', GB: '🇬🇧', CA: '🇨🇦', AU: '🇦🇺', DE: '🇩🇪',
      FR: '🇫🇷', TR: '🇹🇷', BR: '🇧🇷', JP: '🇯🇵', KR: '🇰🇷',
      IN: '🇮🇳', MX: '🇲🇽', ES: '🇪🇸', IT: '🇮🇹', NL: '🇳🇱'
    };
    return flags[countryCode] || '🌍';
  };

  return (
    <Card className="bg-tube-dark border-tube-lightgray/30 hover:border-tube-red/50 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-tube-lightgray/20">
              <AvatarImage src={channel.avatar} alt={channel.name} />
              <AvatarFallback className="bg-tube-red text-white">
                {channel.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-tube-white text-lg">{channel.name}</CardTitle>
                {channel.verified && (
                  <Verified className="h-4 w-4 text-blue-500 fill-current" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-tube-white/60 text-sm">@{channel.handle}</span>
                <Badge variant="outline" className="text-xs border-tube-lightgray/30">
                  {getCountryFlag(channel.country)} {channel.language.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="h-4 w-4 text-tube-white/60 mr-1" />
              <span className="text-tube-white/60 text-xs">Aboneler</span>
            </div>
            <div className="font-bold text-tube-white">{formatNumber(channel.subscriberCount)}</div>
            <div className="flex items-center justify-center text-xs">
              {getGrowthIcon(channel.growth.subscribers.percentage)}
              <span className={`ml-1 ${
                channel.growth.subscribers.percentage > 0 ? 'text-green-500' : 
                channel.growth.subscribers.percentage < 0 ? 'text-red-500' : 'text-tube-white/60'
              }`}>
                {channel.growth.subscribers.percentage > 0 ? '+' : ''}{channel.growth.subscribers.percentage.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Eye className="h-4 w-4 text-tube-white/60 mr-1" />
              <span className="text-tube-white/60 text-xs">Görüntülenme</span>
            </div>
            <div className="font-bold text-tube-white">{formatNumber(channel.totalViews)}</div>
            <div className="flex items-center justify-center text-xs">
              {getGrowthIcon(channel.growth.views.percentage)}
              <span className={`ml-1 ${
                channel.growth.views.percentage > 0 ? 'text-green-500' : 
                channel.growth.views.percentage < 0 ? 'text-red-500' : 'text-tube-white/60'
              }`}>
                {channel.growth.views.percentage > 0 ? '+' : ''}{channel.growth.views.percentage.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Video className="h-4 w-4 text-tube-white/60 mr-1" />
              <span className="text-tube-white/60 text-xs">Videolar</span>
            </div>
            <div className="font-bold text-tube-white">{formatNumber(channel.videoCount)}</div>
            <div className="flex items-center justify-center text-xs">
              {getGrowthIcon(channel.growth.videos.percentage)}
              <span className={`ml-1 ${
                channel.growth.videos.percentage > 0 ? 'text-green-500' : 
                channel.growth.videos.percentage < 0 ? 'text-red-500' : 'text-tube-white/60'
              }`}>
                {channel.growth.videos.percentage > 0 ? '+' : ''}{channel.growth.videos.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-tube-white/70">Etkileşim Oranı</span>
            <span className="text-sm font-medium text-tube-white">{channel.stats.engagementRate.toFixed(1)}%</span>
          </div>
          <Progress 
            value={channel.stats.engagementRate} 
            className="h-2 bg-tube-gray/40"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-tube-white/70">Aylık Büyüme Hedefi</span>
            <span className="text-sm font-medium text-tube-white">
              {Math.min(100, (channel.growth.subscribers.percentage / 5) * 100).toFixed(0)}%
            </span>
          </div>
          <Progress 
            value={Math.min(100, (channel.growth.subscribers.percentage / 5) * 100)} 
            className="h-2 bg-tube-gray/40"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => onManage(channel.id)}
            className="flex-1 bg-tube-red hover:bg-tube-darkred text-white"
            size="sm"
          >
            Yönet
          </Button>
          <Button
            onClick={() => onAnalyze(channel.id)}
            variant="outline"
            className="flex-1 border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/40"
            size="sm"
          >
            Analiz Et
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-3 text-tube-white/70 hover:text-tube-white"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelOverviewCard;