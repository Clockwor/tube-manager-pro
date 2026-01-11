
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ChannelOverviewCard from '@/components/dashboard/ChannelOverviewCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, Search, Grid3X3, List, 
  TrendingUp, Globe, Tag, X, SlidersHorizontal
} from 'lucide-react';
import { YouTubeChannel, DashboardStats as DashboardStatsType, ActivityItem } from '@/types/youtube';

// Ülke ve etiket tanımları
const countries = [
  { code: 'TR', name: 'Türkiye', flag: '🇹🇷' },
  { code: 'US', name: 'ABD', flag: '🇺🇸' },
  { code: 'GB', name: 'İngiltere', flag: '🇬🇧' },
  { code: 'DE', name: 'Almanya', flag: '🇩🇪' },
  { code: 'FR', name: 'Fransa', flag: '🇫🇷' },
  { code: 'JP', name: 'Japonya', flag: '🇯🇵' },
];

const availableTags = [
  { id: 'tech', label: 'Teknoloji', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { id: 'gaming', label: 'Oyun', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { id: 'food', label: 'Yemek', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { id: 'education', label: 'Eğitim', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  { id: 'entertainment', label: 'Eğlence', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
  { id: 'music', label: 'Müzik', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { id: 'sports', label: 'Spor', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { id: 'news', label: 'Haber', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
];

// Mock data - daha fazla kanal ve etiketler eklendi
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
    tags: ['tech', 'education'],
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
    tags: ['gaming', 'entertainment'],
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
    tags: ['food', 'entertainment'],
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
  },
  {
    id: 'UC4',
    name: 'Music Studio UK',
    handle: 'musicstudiouk',
    avatar: 'https://i.pravatar.cc/150?img=4',
    banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=300&fit=crop',
    description: 'Müzik prodüksiyon ve cover şarkılar',
    country: 'GB',
    language: 'en',
    customUrl: 'musicstudiouk',
    subscriberCount: 320000,
    videoCount: 198,
    totalViews: 28000000,
    publishedAt: '2018-05-22',
    verified: true,
    tags: ['music', 'entertainment'],
    stats: {
      subscribersLast30Days: 15000,
      viewsLast30Days: 1800000,
      videosLast30Days: 4,
      estimatedRevenue: 45000,
      engagementRate: 11.2,
      avgViewsPerVideo: 141414
    },
    growth: {
      subscribers: { value: 15000, percentage: 4.9 },
      views: { value: 1800000, percentage: 6.8 },
      videos: { value: 4, percentage: 8.1 }
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
    id: 'UC5',
    name: 'Sport News DE',
    handle: 'sportnewsde',
    avatar: 'https://i.pravatar.cc/150?img=5',
    banner: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=300&fit=crop',
    description: 'Spor haberleri ve maç analizleri',
    country: 'DE',
    language: 'de',
    customUrl: 'sportnewsde',
    subscriberCount: 145000,
    videoCount: 412,
    totalViews: 18000000,
    publishedAt: '2019-02-14',
    verified: true,
    tags: ['sports', 'news'],
    stats: {
      subscribersLast30Days: 7200,
      viewsLast30Days: 920000,
      videosLast30Days: 18,
      estimatedRevenue: 28000,
      engagementRate: 7.8,
      avgViewsPerVideo: 43689
    },
    growth: {
      subscribers: { value: 7200, percentage: 5.2 },
      views: { value: 920000, percentage: 5.4 },
      videos: { value: 18, percentage: 12.5 }
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
    id: 'UC6',
    name: 'Education Plus',
    handle: 'educationplus',
    avatar: 'https://i.pravatar.cc/150?img=6',
    banner: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=300&fit=crop',
    description: 'Online eğitim ve ders anlatımları',
    country: 'TR',
    language: 'tr',
    customUrl: 'educationplus',
    subscriberCount: 520000,
    videoCount: 567,
    totalViews: 42000000,
    publishedAt: '2017-09-01',
    verified: true,
    tags: ['education', 'tech'],
    stats: {
      subscribersLast30Days: 22000,
      viewsLast30Days: 2800000,
      videosLast30Days: 10,
      estimatedRevenue: 68000,
      engagementRate: 14.5,
      avgViewsPerVideo: 74074
    },
    growth: {
      subscribers: { value: 22000, percentage: 4.4 },
      views: { value: 2800000, percentage: 7.1 },
      videos: { value: 10, percentage: 5.3 }
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
  totalChannels: 6,
  totalSubscribers: 1510000,
  totalViews: 133500000,
  totalVideos: 1856,
  monthlyGrowth: {
    subscribers: 69800,
    views: 8690000,
    videos: 58
  },
  topPerformingChannel: {
    name: 'Education Plus',
    metric: 'Etkileşim Oranı',
    value: 14.5
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
  },
  {
    id: '4',
    type: 'video_published',
    channelId: 'UC6',
    channelName: 'Education Plus',
    message: 'Matematik Soru Çözümleri #45 videosunu yayınladı',
    timestamp: '2024-01-14T18:00:00Z',
    metadata: {
      videoTitle: 'Matematik Soru Çözümleri #45'
    }
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [channels] = useState<YouTubeChannel[]>(mockChannels);
  const [stats] = useState<DashboardStatsType>(mockStats);
  const [activities] = useState<ActivityItem[]>(mockActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'verified' | 'growing'>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         channel.handle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' ||
                         (filterBy === 'verified' && channel.verified) ||
                         (filterBy === 'growing' && channel.growth.subscribers.percentage > 0);
    
    const matchesCountry = selectedCountry === 'all' || channel.country === selectedCountry;
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => channel.tags?.includes(tag));
    
    return matchesSearch && matchesFilter && matchesCountry && matchesTags;
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

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const clearAllFilters = () => {
    setFilterBy('all');
    setSelectedCountry('all');
    setSelectedTags([]);
    setSearchTerm('');
  };

  const activeFilterCount = (filterBy !== 'all' ? 1 : 0) + 
                           (selectedCountry !== 'all' ? 1 : 0) + 
                           selectedTags.length;

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
          {/* Search and Main Filters */}
          <div className="flex flex-col gap-4">
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
              
              {/* Quick Filter Buttons */}
              <div className="flex flex-wrap gap-2">
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
                  ✓ Doğrulanmış
                </Button>
                <Button
                  variant={filterBy === 'growing' ? 'default' : 'outline'}
                  onClick={() => setFilterBy('growing')}
                  size="sm"
                  className={filterBy === 'growing' ? 'bg-tube-red hover:bg-tube-darkred' : 'border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/40'}
                >
                  📈 Büyüyen
                </Button>

                {/* Country Filter Dropdown */}
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-[140px] bg-tube-dark border-tube-lightgray/30 text-tube-white">
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Ülke" />
                  </SelectTrigger>
                  <SelectContent className="bg-tube-dark border-tube-lightgray/30">
                    <SelectItem value="all" className="text-tube-white hover:bg-tube-gray/40">
                      🌍 Tüm Ülkeler
                    </SelectItem>
                    {countries.map(country => (
                      <SelectItem 
                        key={country.code} 
                        value={country.code}
                        className="text-tube-white hover:bg-tube-gray/40"
                      >
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Toggle Advanced Filters */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/40 ${showFilters ? 'bg-tube-gray/40' : ''}`}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Etiketler
                  {selectedTags.length > 0 && (
                    <Badge className="ml-2 bg-tube-red text-white h-5 w-5 p-0 flex items-center justify-center rounded-full">
                      {selectedTags.length}
                    </Badge>
                  )}
                </Button>

                {/* View Mode */}
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
            </div>

            {/* Tag Filters (Collapsible) */}
            {showFilters && (
              <div className="p-4 bg-tube-gray/30 rounded-lg border border-tube-lightgray/20 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-tube-white/70" />
                  <span className="text-sm font-medium text-tube-white">Etiketlere Göre Filtrele</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <Button
                      key={tag.id}
                      variant="outline"
                      size="sm"
                      onClick={() => toggleTag(tag.id)}
                      className={`border transition-all ${
                        selectedTags.includes(tag.id) 
                          ? tag.color + ' border-current' 
                          : 'border-tube-lightgray/30 text-tube-white/70 hover:bg-tube-gray/40'
                      }`}
                    >
                      {tag.label}
                      {selectedTags.includes(tag.id) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Active Filters Summary */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-tube-white/60">Aktif filtreler:</span>
                {filterBy !== 'all' && (
                  <Badge variant="secondary" className="bg-tube-gray/40 text-tube-white">
                    {filterBy === 'verified' ? 'Doğrulanmış' : 'Büyüyen'}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => setFilterBy('all')}
                    />
                  </Badge>
                )}
                {selectedCountry !== 'all' && (
                  <Badge variant="secondary" className="bg-tube-gray/40 text-tube-white">
                    {countries.find(c => c.code === selectedCountry)?.flag} {countries.find(c => c.code === selectedCountry)?.name}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => setSelectedCountry('all')}
                    />
                  </Badge>
                )}
                {selectedTags.map(tagId => {
                  const tag = availableTags.find(t => t.id === tagId);
                  return tag ? (
                    <Badge 
                      key={tagId} 
                      variant="secondary" 
                      className={`${tag.color} border`}
                    >
                      {tag.label}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => toggleTag(tagId)}
                      />
                    </Badge>
                  ) : null;
                })}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-tube-white/60 hover:text-tube-white h-6 px-2"
                >
                  Tümünü Temizle
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="text-sm text-tube-white/60">
              {filteredChannels.length} kanal gösteriliyor
              {filteredChannels.length !== channels.length && ` (toplam ${channels.length})`}
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
            <div className="text-center py-12 bg-tube-gray/20 rounded-lg border border-tube-lightgray/10">
              <div className="text-tube-white/60 mb-4">
                {searchTerm || activeFilterCount > 0 
                  ? 'Arama kriterinize uygun kanal bulunamadı' 
                  : 'Henüz kanal eklenmemiş'}
              </div>
              {(searchTerm || activeFilterCount > 0) ? (
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  className="border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/40"
                >
                  <X className="h-4 w-4 mr-2" />
                  Filtreleri Temizle
                </Button>
              ) : (
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
