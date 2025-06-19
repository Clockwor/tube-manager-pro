
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Clock, Eye, ThumbsUp } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';

// Mock data for following channels and their new videos
const followingChannelsData = [
  {
    id: '1',
    channelName: 'Tech Reviews Pro',
    channelThumbnail: 'https://via.placeholder.com/40x40/FF0000/FFFFFF?text=TR',
    newVideos: [
      {
        id: '1',
        title: 'iPhone 15 Pro Max İnceleme - Gerçekten Bu Kadar İyi Mi?',
        thumbnail: 'https://via.placeholder.com/320x180/FF0000/FFFFFF?text=iPhone',
        duration: '12:45',
        uploadTime: '2 saat önce',
        views: '15K',
        likes: '1.2K'
      },
      {
        id: '2',
        title: 'MacBook Air M3 vs MacBook Pro M3 Karşılaştırması',
        thumbnail: 'https://via.placeholder.com/320x180/0000FF/FFFFFF?text=MacBook',
        duration: '8:32',
        uploadTime: '5 saat önce',
        views: '8.5K',
        likes: '892'
      }
    ]
  },
  {
    id: '2',
    channelName: 'Gaming Zone TR',
    channelThumbnail: 'https://via.placeholder.com/40x40/00FF00/FFFFFF?text=GZ',
    newVideos: [
      {
        id: '3',
        title: 'Cyberpunk 2077 2024 Güncellemesi - Oyun Artık Oynayabilir Mi?',
        thumbnail: 'https://via.placeholder.com/320x180/00FF00/FFFFFF?text=Cyberpunk',
        duration: '15:20',
        uploadTime: '1 gün önce',
        views: '25K',
        likes: '2.1K'
      }
    ]
  },
  {
    id: '3',
    channelName: 'Yemek Sanatı',
    channelThumbnail: 'https://via.placeholder.com/40x40/FFA500/FFFFFF?text=YS',
    newVideos: [
      {
        id: '4',
        title: 'Ev Yapımı Pizza Tarifi - 30 Dakikada Mükemmel Pizza',
        thumbnail: 'https://via.placeholder.com/320x180/FFA500/FFFFFF?text=Pizza',
        duration: '10:15',
        uploadTime: '3 saat önce',
        views: '12K',
        likes: '956'
      },
      {
        id: '5',
        title: 'Türk Kahvesi Nasıl Yapılır? - Geleneksel Tarif',
        thumbnail: 'https://via.placeholder.com/320x180/8B4513/FFFFFF?text=Kahve',
        duration: '6:45',
        uploadTime: '1 gün önce',
        views: '7.8K',
        likes: '654'
      }
    ]
  }
];

const ChannelFollowing = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/channels/${channelId}`);
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackClick}
            className="text-tube-white hover:bg-tube-gray/40"
          >
            <ArrowLeft size={18} className="mr-2" />
            Geri
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <Bell className="text-tube-red" size={24} />
          <h1 className="text-3xl font-bold text-tube-white">Takip Edilen Kanallar</h1>
        </div>
        <p className="text-tube-white/70 mt-2">Takip ettiğiniz kanalların en yeni videoları</p>
      </div>

      <div className="space-y-8">
        {followingChannelsData.map((channel) => (
          <div key={channel.id} className="glass-panel rounded-xl p-6 bg-tube-darkest">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={channel.channelThumbnail}
                alt={channel.channelName}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-xl font-semibold text-tube-white">{channel.channelName}</h2>
              <div className="flex items-center text-tube-white/70 text-sm">
                <Bell size={14} className="mr-1 text-tube-red" />
                <span>{channel.newVideos.length} yeni video</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {channel.newVideos.map((video) => (
                <div
                  key={video.id}
                  className="glass-panel rounded-lg overflow-hidden hover-scale transition-all duration-300 card-shadow bg-tube-dark/50"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-tube-darkest/80 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute top-2 left-2 bg-tube-red text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Bell size={10} />
                      YENİ
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="font-medium text-tube-white mb-2 line-clamp-2 text-sm" title={video.title}>
                      {video.title}
                    </h3>

                    <div className="flex justify-between text-tube-white/70 text-xs mb-3">
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        <span>{video.uploadTime}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-tube-white/70 text-xs">
                      <div className="flex items-center">
                        <Eye size={12} className="mr-1" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp size={12} className="mr-1" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default ChannelFollowing;
