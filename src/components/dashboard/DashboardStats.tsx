import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, Eye, Video, Play, TrendingUp, TrendingDown,
  DollarSign, BarChart3, Clock, Target
} from 'lucide-react';
import { DashboardStats as DashboardStatsType } from '@/types/youtube';

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGrowthColor = (value: number) => {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-tube-white/60';
  };

  const getGrowthIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  const statsCards = [
    {
      title: 'Toplam Kanallar',
      value: stats.totalChannels.toString(),
      icon: <Play className="h-5 w-5" />,
      change: null,
      description: 'Aktif kanal sayısı'
    },
    {
      title: 'Toplam Aboneler',
      value: formatNumber(stats.totalSubscribers),
      icon: <Users className="h-5 w-5" />,
      change: stats.monthlyGrowth.subscribers,
      description: 'Bu ay +' + formatNumber(stats.monthlyGrowth.subscribers)
    },
    {
      title: 'Toplam Görüntülenme',
      value: formatNumber(stats.totalViews),
      icon: <Eye className="h-5 w-5" />,
      change: stats.monthlyGrowth.views,
      description: 'Bu ay +' + formatNumber(stats.monthlyGrowth.views)
    },
    {
      title: 'Toplam Videolar',
      value: formatNumber(stats.totalVideos),
      icon: <Video className="h-5 w-5" />,
      change: stats.monthlyGrowth.videos,
      description: 'Bu ay +' + stats.monthlyGrowth.videos + ' video'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="bg-tube-dark border-tube-lightgray/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-tube-white/70">
                {stat.title}
              </CardTitle>
              <div className="text-tube-white/60">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-tube-white mb-1">
                {stat.value}
              </div>
              <div className="flex items-center text-xs">
                {stat.change !== null && (
                  <>
                    {getGrowthIcon(stat.change)}
                    <span className={`ml-1 ${getGrowthColor(stat.change)}`}>
                      {stat.change > 0 ? '+' : ''}{stat.change}%
                    </span>
                    <span className="text-tube-white/50 ml-2">vs geçen ay</span>
                  </>
                )}
                {stat.change === null && (
                  <span className="text-tube-white/50">{stat.description}</span>
                )}
              </div>
              {stat.change !== null && (
                <p className="text-xs text-tube-white/50 mt-1">{stat.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Channel */}
        <Card className="bg-tube-dark border-tube-lightgray/30">
          <CardHeader>
            <CardTitle className="text-tube-white flex items-center gap-2">
              <Target className="h-5 w-5 text-tube-red" />
              En İyi Performans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-tube-white">{stats.topPerformingChannel.name}</h3>
                  <p className="text-sm text-tube-white/70">{stats.topPerformingChannel.metric}</p>
                </div>
                <Badge className="bg-tube-red text-white">
                  {formatNumber(stats.topPerformingChannel.value)}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-tube-white/70">Bu ayın hedefi</span>
                  <span className="text-tube-white">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-tube-gray/40" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-tube-dark border-tube-lightgray/30">
          <CardHeader>
            <CardTitle className="text-tube-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-tube-red" />
              Hızlı İşlemler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-tube-gray/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-tube-red/20 rounded-lg">
                    <Video className="h-4 w-4 text-tube-red" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-tube-white">Video Yükle</p>
                    <p className="text-xs text-tube-white/60">Tüm kanallara</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-tube-red text-tube-red">
                  3 beklemede
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-tube-gray/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-tube-white">Analiz Raporu</p>
                    <p className="text-xs text-tube-white/60">Haftalık özet</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-blue-500 text-blue-500">
                  Hazır
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-tube-gray/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Clock className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-tube-white">Zamanlanmış</p>
                    <p className="text-xs text-tube-white/60">Bugün 5 video</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Aktif
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;