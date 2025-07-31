import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  Calendar,
  Filter,
  Download,
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Clock,
  Target,
  Users
} from 'lucide-react';

interface AnalyticsData {
  platform: string;
  posts: number;
  views: number;
  engagement: number;
  followers: number;
  growth: number;
  topContent: string;
}

const SocialAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const analyticsData: AnalyticsData[] = [
    {
      platform: 'TikTok',
      posts: 15,
      views: 125400,
      engagement: 8.7,
      followers: 23400,
      growth: 12.5,
      topContent: 'Dans Challenge Video'
    },
    {
      platform: 'Instagram',
      posts: 12,
      views: 89200,
      engagement: 6.2,
      followers: 15700,
      growth: 8.3,
      topContent: 'Seyahat Fotoğrafları'
    },
    {
      platform: 'YouTube',
      posts: 3,
      views: 45600,
      engagement: 4.8,
      followers: 31200,
      growth: 5.1,
      topContent: 'Teknoloji İncelemesi'
    }
  ];

  const totalViews = analyticsData.reduce((sum, data) => sum + data.views, 0);
  const avgEngagement = analyticsData.reduce((sum, data) => sum + data.engagement, 0) / analyticsData.length;
  const totalFollowers = analyticsData.reduce((sum, data) => sum + data.followers, 0);

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-green-400' : 'text-red-400';
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      TikTok: '🎵',
      Instagram: '📷', 
      YouTube: '📹'
    };
    return icons[platform] || '📱';
  };

  return (
    <div className="space-y-6">
      {/* Filtreler */}
      <Card className="glass-panel p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-tube-white">Analitik Veriler</h3>
          </div>
          
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="bg-tube-gray/50 border-tube-lightgray/30 w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                <SelectItem value="7days">Son 7 Gün</SelectItem>
                <SelectItem value="30days">Son 30 Gün</SelectItem>
                <SelectItem value="3months">Son 3 Ay</SelectItem>
                <SelectItem value="1year">Son 1 Yıl</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="bg-tube-gray/50 border-tube-lightgray/30 w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                <SelectItem value="all">Tüm Platformlar</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-tube-lightgray/30">
              <Download className="h-4 w-4 mr-2" />
              Rapor İndir
            </Button>
          </div>
        </div>
      </Card>

      {/* Genel Metrikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-tube-white/70 text-sm">Toplam Görüntüleme</p>
              <p className="text-2xl font-bold text-tube-white">
                {totalViews.toLocaleString()}
              </p>
            </div>
            <Eye className="h-8 w-8 text-blue-400" />
          </div>
          <div className="mt-2">
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              +15.2% bu hafta
            </Badge>
          </div>
        </Card>

        <Card className="glass-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-tube-white/70 text-sm">Ortalama Etkileşim</p>
              <p className="text-2xl font-bold text-tube-white">
                {avgEngagement.toFixed(1)}%
              </p>
            </div>
            <Heart className="h-8 w-8 text-red-400" />
          </div>
          <div className="mt-2">
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              +2.1% bu hafta
            </Badge>
          </div>
        </Card>

        <Card className="glass-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-tube-white/70 text-sm">Toplam Takipçi</p>
              <p className="text-2xl font-bold text-tube-white">
                {totalFollowers.toLocaleString()}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </div>
          <div className="mt-2">
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              +8.7% bu hafta
            </Badge>
          </div>
        </Card>

        <Card className="glass-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-tube-white/70 text-sm">Toplam Gönderi</p>
              <p className="text-2xl font-bold text-tube-white">
                {analyticsData.reduce((sum, data) => sum + data.posts, 0)}
              </p>
            </div>
            <MessageCircle className="h-8 w-8 text-green-400" />
          </div>
          <div className="mt-2">
            <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Bu hafta
            </Badge>
          </div>
        </Card>
      </div>

      {/* Platform Detayları */}
      <Card className="glass-panel p-6">
        <h3 className="text-xl font-semibold text-tube-white mb-6">Platform Performansı</h3>
        
        <div className="space-y-4">
          {analyticsData.map((data) => (
            <div key={data.platform} className="bg-tube-gray/30 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getPlatformIcon(data.platform)}</span>
                  <div>
                    <h4 className="font-medium text-tube-white">{data.platform}</h4>
                    <p className="text-xs text-tube-white/60">{data.posts} gönderi</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="font-bold text-tube-white">{data.views.toLocaleString()}</p>
                  <p className="text-xs text-tube-white/60">Görüntüleme</p>
                </div>
                
                <div className="text-center">
                  <p className="font-bold text-tube-white">{data.engagement}%</p>
                  <p className="text-xs text-tube-white/60">Etkileşim</p>
                </div>
                
                <div className="text-center">
                  <p className="font-bold text-tube-white">{data.followers.toLocaleString()}</p>
                  <p className="text-xs text-tube-white/60">Takipçi</p>
                </div>
                
                <div className="text-center">
                  <p className={`font-bold ${getGrowthColor(data.growth)}`}>
                    {data.growth > 0 ? '+' : ''}{data.growth}%
                  </p>
                  <p className="text-xs text-tube-white/60">Büyüme</p>
                </div>
                
                <div className="text-center">
                  <Button variant="outline" size="sm" className="border-tube-lightgray/30">
                    Detaylar
                  </Button>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-tube-lightgray/20">
                <p className="text-sm text-tube-white/70">
                  <Target className="h-4 w-4 inline mr-1" />
                  En iyi içerik: <span className="text-tube-white">{data.topContent}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Öneriler */}
      <Card className="glass-panel p-6">
        <h3 className="text-xl font-semibold text-tube-white mb-4">AI Önerileri</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-500/20 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-blue-200 font-medium">TikTok'ta dans içerikleri trend</p>
              <p className="text-blue-200/80 text-sm">
                Dans challenge videoları %23 daha fazla etkileşim alıyor. Yeni bir dans trend'i deneyin.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-green-500/20 rounded-lg">
            <Clock className="h-5 w-5 text-green-400 mt-0.5" />
            <div>
              <p className="text-green-200 font-medium">Instagram için optimal paylaşım saati</p>
              <p className="text-green-200/80 text-sm">
                Takipçileriniz 18:00-20:00 arası en aktif. Bu saatler arasında paylaşım yapın.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-purple-500/20 rounded-lg">
            <Share className="h-5 w-5 text-purple-400 mt-0.5" />
            <div>
              <p className="text-purple-200 font-medium">Cross-platform paylaşım önerisi</p>
              <p className="text-purple-200/80 text-sm">
                YouTube videolarınızı kısa kliplere bölerek TikTok ve Instagram'da paylaşabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SocialAnalytics;