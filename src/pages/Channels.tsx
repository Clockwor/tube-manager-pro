
import React from 'react';
import PageContainer from '@/components/PageContainer';
import ChannelCard from '@/components/ChannelCard';
import { Button } from '@/components/ui/button';

// Channel data with country information
const channelsData = [
  {
    id: '1',
    name: 'Tech Tutorials',
    subscribers: '120K',
    views: '5.2M',
    thumbnailUrl: 'https://via.placeholder.com/300x150/FF0000/FFFFFF?text=Tech',
    country: 'us'
  },
  {
    id: '2',
    name: 'Gaming Channel',
    subscribers: '85K',
    views: '3.8M',
    thumbnailUrl: 'https://via.placeholder.com/300x150/0000FF/FFFFFF?text=Gaming',
    country: 'uk'
  },
  {
    id: '3',
    name: 'Travel Vlogs',
    subscribers: '45K',
    views: '1.7M',
    thumbnailUrl: 'https://via.placeholder.com/300x150/00FF00/FFFFFF?text=Travel',
    country: 'ca'
  },
];

const Channels = () => {
  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-tube-white">Your Channels</h1>
          <Button variant="outline" className="bg-tube-gray/40 text-tube-white border-tube-lightgray/20 hover:bg-tube-gray">
            View All
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channelsData.map((channel) => (
          <ChannelCard 
            key={channel.id}
            id={channel.id}
            name={channel.name}
            subscribers={channel.subscribers}
            views={channel.views}
            thumbnailUrl={channel.thumbnailUrl}
            country={channel.country}
          />
        ))}
      </div>
    </PageContainer>
  );
};

export default Channels;
