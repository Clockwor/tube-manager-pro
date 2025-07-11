
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ChannelOverviewCard from '@/components/dashboard/ChannelOverviewCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, Search, Filter, Grid3X3, List, 
  TrendingUp, Users, Video, Eye 
} from 'lucide-react';
import { YouTubeChannel, DashboardStats as DashboardStatsType, ActivityItem } from '@/types/youtube';

// Mock data - gerçek uygulamada API'den gelecek
const mockChannels: YouTubeChannel[] = [
  {
    id: 'UC1',
    name: 'Tech Review Channel',
    handle: 'techreview',
    avatar: 'https://i.pravatar.cc/150?img=1',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=300&fit=crop',
    description: 'Teknoloji ürünleri hakkında detaylı incelemeler',
    country: 'TR',
    language: 'tr',
    customUrl: 'techreview',
    subscriberCount: 250000,
    videoCount: 156,
    totalViews: 15000000,
    publishedAt: '2020-03-15',
    verified: true,
    stats: {
      subscribersLast30Days: 12500,
      viewsLast30Days: 850000,
      videosLast30Days: 8,
      estimatedRevenue: 25000,
      engagementRate: 8.5,
      avgViewsPerVideo: 96154
    },
    growth: {
      subscribers: { value: 12500, percentage: 5.2 },
      views: { value: 850000, percentage: 12.3 },
      videos: { value: 8, percentage: 14.3 }
    },
    recentVideos: [],
    analytics: {
      viewsHistory: [],
      subscribersHistory: [],
      topCountries: [],
      topAgeGroups: [],
      avgSessionDuration: 0,
      clickThroughRate: 0
    }
  },
  {
    id: 'UC2',
    name: 'Gaming Adventures',
    handle: 'gamingadv',
    avatar: 'https://i.pravatar.cc/150?img=2',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=300&fit=crop',
    description: 'Oyun dünyasından en son haberler ve oynanışlar',
    country: 'US',
    language: 'en',
    customUrl: 'gamingadventures',
    subscriberCount: 180000,
    videoCount: 289,
    totalViews: 22000000,
    publishedAt: '2019-08-20',
    verified: true,
    stats: {
      subscribersLast30Days: 8900,
      viewsLast30Days: 1200000,
      videosLast30Days: 12,
      estimatedRevenue: 35000,
      engagementRate: 9.2,
      avgViewsPerVideo: 76124
    },
    growth: {
      subscribers: { value: 8900, percentage: 5.1 },
      views: { value: 1200000, percentage: 8.7 },
      videos: { value: 12, percentage: 9.1 }
    },
    recentVideos: [],
    analytics: {
      viewsHistory: [],
      subscribersHistory: [],
      topCountries: [],
      topAgeGroups: [],
      avgSessionDuration: 0,
      clickThroughRate: 0
    }
  },
  {
    id: 'UC3',
    name: 'Cooking Masters',
    handle: 'cookingmasters',
    avatar: 'https://i.pravatar.cc/150?img=3',
    banner: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=300&fit=crop',
    description: 'Lezzetli tarifler ve mutfak ipuçları',
    country: 'TR',
    language: 'tr',
    customUrl: 'cookingmasters',
    subscriberCount: 95000,
    videoCount: 234,
    totalViews: 8500000,
    publishedAt: '2021-01-10',
    verified: false,
    stats: {
      subscribersLast30Days: 4200,
      viewsLast30Days: 420000,
      videosLast30Days: 6,
      estimatedRevenue: 12000,
      engagementRate: 12.8,
      avgViewsPerVideo: 36325
    },
    growth: {
      subscribers: { value: 4200, percentage: 4.6 },
      views: { value: 420000, percentage: 5.2 },
      videos: { value: 6, percentage: 20.0 }
    },
    recentVideos: [],
    analytics: {
      viewsHistory: [],
      subscribersHistory: [],
      topCountries: [],
      topAgeGroups: [],
      avgSessionDuration: 0,
      clickThroughRate: 0
    }
  }
];

const mockStats: DashboardStatsType = {
  totalChannels: 3,
  totalSubscribers: 525000,
  totalViews: 45500000,
  totalVideos: 679,
  monthlyGrowth: {
    subscribers: 25600,
    views: 2470000,
    videos: 26
  },
  topPerformingChannel: {
    name: 'Gaming Adventures',
    metric: 'Etkileşim Oranı',
    value: 9.2
  },
  recentActivity: []
};

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'video_published',
    channelId: 'UC1',
    channelName: 'Tech Review Channel',
    message: 'iPhone 15 Pro Max İnceleme videosunu yayınladı',
    timestamp: '2024-01-15T10:30:00Z',
    metadata: {
      videoTitle: 'iPhone 15 Pro Max İnceleme'
    }
  },
  {
    id: '2',
    type: 'milestone_reached',
    channelId: 'UC2',
    channelName: 'Gaming Adventures',
    message: '250K abone sayısına ulaştı',
    timestamp: '2024-01-15T08:15:00Z',
    metadata: {
      milestoneType: '250K Abone',
      subscriberCount: 250000
    }
  },
  {
    id: '3',
    type: 'subscriber_gained',
    channelId: 'UC3',
    channelName: 'Cooking Masters',
    message: 'Bugün 150 yeni abone kazandı',
    timestamp: '2024-01-15T06:45:00Z',
    metadata: {
      subscriberCount: 150
    }
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<YouTubeChannel[]>(mockChannels);
  const [stats, setStats] = useState<DashboardStatsType>(mockStats);
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'verified' | 'growing'>('all');

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         channel.handle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' ||
                         (filterBy === 'verified' && channel.verified) ||
                         (filterBy === 'growing' && channel.growth.subscribers.percentage > 0);
    
    return matchesSearch && matchesFilter;
  });

  const handleManageChannel = (channelId: string) => {
    navigate(`/channels/${channelId}`);
  };

  const handleAnalyzeChannel = (channelId: string) => {
    navigate(`/analytics?channel=${channelId}`);
  };

  const handleAddChannel = () => {
    navigate('/channels?action=add');
  };

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-tube-white mb-2">Multi-Channel Dashboard</h1>
            <p className="text-tube-white/70">Tüm YouTube kanallarınızı tek yerden yönetin</p>
          </div>
          <Button
            onClick={handleAddChannel}
            className="bg-tube-red hover:bg-tube-darkred text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Kanal Ekle
          </Button>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats stats={stats} />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="channels" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-tube-gray/40 border border-tube-lightgray/30">
          <TabsTrigger 
            value="channels" 
            className="data-[state=active]:bg-tube-red data-[state=active]:text-white text-tube-white/70"
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            Kanallar ({channels.length})
          </TabsTrigger>
          <TabsTrigger 
            value="activity" 
            className="data-[state=active]:bg-tube-red data-[state=active]:text-white text-tube-white/70"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Son Aktiviteler
          </TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="space-y-6">
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tube-white/60" />
                <Input
                  placeholder="Kanal ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-tube-dark border-tube-lightgray/20 text-tube-white"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterBy === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterBy('all')}
                size="sm"
                className={filterBy === 'all' ? 'bg-tube-red hover:bg-tube-darkred' : 'border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/40'}
              >
                Tümü
              </Button>
              <Button
                variant={filterBy === 'verified' ? 'default' : 'outline'}
                onClick={() => setFilterBy('verified')}
                size="sm"
                className={filterBy === 'verified' ? 'bg-tube-red hover:bg-tube-darkred' : 'border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/40'}
              >
                Doğrulanmış
              </Button>
              <Button
                variant={filterBy === 'growing' ? 'default' : 'outline'}
                onClick={() => setFilterBy('growing')}
                size="sm"
                className={filterBy === 'growing' ? 'bg-tube-red hover:bg-tube-darkred' : 'border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/40'}
              >
                Büyüyen
              </Button>
            </div>

            <div className="flex border border-tube-lightgray/30 rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                size="sm"
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                size="sm"
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Channels Grid/List */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredChannels.map((channel) => (
              <ChannelOverviewCard
                key={channel.id}
                channel={channel}
                onManage={handleManageChannel}
                onAnalyze={handleAnalyzeChannel}
              />
            ))}
          </div>

          {filteredChannels.length === 0 && (
            <div className="text-center py-12">
              <div className="text-tube-white/60 mb-4">
                {searchTerm ? 'Arama kriterinize uygun kanal bulunamadı' : 'Henüz kanal eklenmemiş'}
              </div>
              {!searchTerm && (
                <Button
                  onClick={handleAddChannel}
                  className="bg-tube-red hover:bg-tube-darkred text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  İlk Kanalınızı Ekleyin
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="activity">
          <RecentActivity activities={activities} />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Index;
