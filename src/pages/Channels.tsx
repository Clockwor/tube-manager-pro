

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import ChannelOverviewCard from '@/components/dashboard/ChannelOverviewCard';
import { Button } from '@/components/ui/button';
import { YouTubeChannel } from '@/types/youtube';
import { Plus } from 'lucide-react';
import AddChannelDialog, { NewChannelData } from '@/components/channels/AddChannelDialog';
import { channelsData } from '@/data/channelsData';

const Channels = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<YouTubeChannel[]>(channelsData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleManageChannel = (channelId: string) => {
    navigate(`/channels/${channelId}`);
  };

  const handleAnalyzeChannel = (channelId: string) => {
    navigate(`/channels/${channelId}`);
  };

  const handleChannelAdded = (newChannel: NewChannelData) => {
    const channel: YouTubeChannel = {
      id: `${Date.now()}`,
      name: newChannel.name,
      handle: newChannel.handle,
      avatar: `https://via.placeholder.com/80/FF0000/FFFFFF?text=${newChannel.name.charAt(0).toUpperCase()}`,
      banner: '',
      description: newChannel.description,
      subscriberCount: 0,
      totalViews: 0,
      videoCount: 0,
      country: newChannel.country,
      language: newChannel.language,
      customUrl: newChannel.handle,
      publishedAt: new Date().toISOString(),
      verified: false,
      tags: newChannel.tags,
      growth: {
        subscribers: { value: 0, percentage: 0 },
        views: { value: 0, percentage: 0 },
        videos: { value: 0, percentage: 0 }
      },
      stats: {
        subscribersLast30Days: 0,
        viewsLast30Days: 0,
        videosLast30Days: 0,
        estimatedRevenue: 0,
        engagementRate: 0,
        avgViewsPerVideo: 0
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
    };
    setChannels(prev => [channel, ...prev]);
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-tube-white">Kanallarım</h1>
          <div className="flex gap-3">
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
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
        {channels.map((channel) => (
          <ChannelOverviewCard 
            key={channel.id}
            channel={channel}
            onManage={handleManageChannel}
            onAnalyze={handleAnalyzeChannel}
          />
        ))}
      </div>

      <AddChannelDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onChannelAdded={handleChannelAdded}
      />
    </PageContainer>
  );
};

export default Channels;
