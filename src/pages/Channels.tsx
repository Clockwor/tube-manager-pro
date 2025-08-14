
import React from 'react';
import PageContainer from '@/components/PageContainer';
import ChannelOverviewCard from '@/components/dashboard/ChannelOverviewCard';
import { Button } from '@/components/ui/button';
import { YouTubeChannel } from '@/types/youtube';
import { Plus } from 'lucide-react';

// YouTube channel data with detailed stats
const channelsData: YouTubeChannel[] = [
  {
    id: '1',
    name: 'Tech Tutorials',
    handle: 'techtutorials',
    avatar: 'https://via.placeholder.com/80/FF0000/FFFFFF?text=TT',
    banner: '',
    description: 'Tech tutorials and reviews',
    subscriberCount: 120000,
    totalViews: 5200000,
    videoCount: 342,
    country: 'US',
    language: 'tr',
    customUrl: 'techtutorials',
    publishedAt: '2020-01-15',
    verified: true,
    growth: {
      subscribers: { value: 2400, percentage: 2.1 },
      views: { value: 150000, percentage: 3.0 },
      videos: { value: 12, percentage: 3.6 }
    },
    stats: {
      subscribersLast30Days: 2400,
      viewsLast30Days: 150000,
      videosLast30Days: 12,
      estimatedRevenue: 3200,
      engagementRate: 4.2,
      avgViewsPerVideo: 15204
    },
    recentVideos: [],
    analytics: {
      viewsHistory: [],
      subscribersHistory: [],
      topCountries: [],
      topAgeGroups: [],
      avgSessionDuration: 320,
      clickThroughRate: 4.2
    }
  },
  {
    id: '2',
    name: 'Gaming Channel',
    handle: 'gamingchannel',
    avatar: 'https://via.placeholder.com/80/0000FF/FFFFFF?text=GC',
    banner: '',
    description: 'Gaming content and reviews',
    subscriberCount: 85000,
    totalViews: 3800000,
    videoCount: 287,
    country: 'GB',
    language: 'tr',
    customUrl: 'gamingchannel',
    publishedAt: '2019-06-22',
    verified: false,
    growth: {
      subscribers: { value: 1200, percentage: 1.4 },
      views: { value: 95000, percentage: 2.5 },
      videos: { value: 8, percentage: 2.9 }
    },
    stats: {
      subscribersLast30Days: 1200,
      viewsLast30Days: 95000,
      videosLast30Days: 8,
      estimatedRevenue: 2100,
      engagementRate: 3.8,
      avgViewsPerVideo: 13240
    },
    recentVideos: [],
    analytics: {
      viewsHistory: [],
      subscribersHistory: [],
      topCountries: [],
      topAgeGroups: [],
      avgSessionDuration: 285,
      clickThroughRate: 3.7
    }
  },
  {
    id: '3',
    name: 'Travel Vlogs',
    handle: 'travelvlogs',
    avatar: 'https://via.placeholder.com/80/00FF00/FFFFFF?text=TV',
    banner: '',
    description: 'Travel vlogs and adventures',
    subscriberCount: 45000,
    totalViews: 1700000,
    videoCount: 156,
    country: 'CA',
    language: 'tr',
    customUrl: 'travelvlogs',
    publishedAt: '2021-03-10',
    verified: true,
    growth: {
      subscribers: { value: 800, percentage: 1.8 },
      views: { value: 42000, percentage: 2.5 },
      videos: { value: 5, percentage: 3.3 }
    },
    stats: {
      subscribersLast30Days: 800,
      viewsLast30Days: 42000,
      videosLast30Days: 5,
      estimatedRevenue: 1400,
      engagementRate: 5.1,
      avgViewsPerVideo: 10897
    },
    recentVideos: [],
    analytics: {
      viewsHistory: [],
      subscribersHistory: [],
      topCountries: [],
      topAgeGroups: [],
      avgSessionDuration: 410,
      clickThroughRate: 5.8
    }
  },
];

const Channels = () => {
  const handleManageChannel = (channelId: string) => {
    // Navigate to channel management page
    window.location.href = `/channels/manage/${channelId}`;
  };

  const handleAnalyzeChannel = (channelId: string) => {
    // Navigate to channel analytics page
    window.location.href = `/channels/analytics/${channelId}`;
  };

  const handleAddChannel = () => {
    // Navigate to add channel page or open dialog
    window.location.href = '/channels/add';
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-tube-white">Kanallarım</h1>
          <div className="flex gap-3">
            <Button 
              onClick={handleAddChannel}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Kanal Ekle
            </Button>
            <Button variant="outline" className="bg-tube-gray/40 text-tube-white border-tube-lightgray/20 hover:bg-tube-gray">
              Tümünü Görüntüle
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channelsData.map((channel) => (
          <ChannelOverviewCard 
            key={channel.id}
            channel={channel}
            onManage={handleManageChannel}
            onAnalyze={handleAnalyzeChannel}
          />
        ))}
      </div>
    </PageContainer>
  );
};

export default Channels;
