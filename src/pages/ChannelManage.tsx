import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Eye, Play, ChevronLeft, BarChart3, 
  Settings, Video, Target, TrendingUp, ExternalLink, Radio
} from 'lucide-react';
import { toast } from 'sonner';
import VideoManagement from '@/components/dashboard/VideoManagement';
import ChannelAnalytics from '@/components/dashboard/ChannelAnalytics';
import ChannelSettings from '@/components/dashboard/ChannelSettings';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Example channel data
const channelData = {
  name: 'Tech Tutorials',
  subscribers: '120K',
  views: '5.2M',
  thumbnailUrl: 'https://via.placeholder.com/300x150/FF0000/FFFFFF?text=Tech',
  country: 'us',
  keywordData: {
    score: 75,
    status: 'Good',
    keywords: [
      { id: 1, text: 'coffee for beginners', volume: 2500, active: true },
      { id: 2, text: 'best coffee machines', volume: 4800, active: true },
      { id: 3, text: 'how to grind coffee', volume: 1500, active: false },
      { id: 4, text: 'coffee for programmers', volume: 1800, active: true }
    ],
    matchingKeywords: [
      { id: 5, text: 'coffee for developers', volume: 1200, active: true },
      { id: 6, text: 'best coffee types', volume: 2000, active: false },
      { id: 7, text: 'coffee for techies', volume: 1550, active: true }
    ],
    competitors: [
      { id: 8, text: 'best coffee for mornings', volume: 3200, active: false },
      { id: 9, text: 'how coffee affects productivity', volume: 1700, active: true },
      { id: 10, text: 'coffee for tech professionals', volume: 1200, active: true }
    ]
  },
  topVideos: [
    { 
      id: 1, 
      title: "How to Get Started with Coffee", 
      thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png", 
      views: "54K",
      channel: "Coffee Lovers",
      channelAvatar: "https://via.placeholder.com/40/FF6700/FFFFFF?text=CL"
    },
    { 
      id: 2, 
      title: "Perfect Bean Selection Guide", 
      thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png", 
      views: "32K",
      channel: "Morning Coffee",
      channelAvatar: "https://via.placeholder.com/40/00A3FF/FFFFFF?text=MC"
    },
    { 
      id: 3, 
      title: "RATHER DIE Than Drink Bad Coffee", 
      thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png", 
      views: "128K",
      channel: "TotalCoffee",
      channelAvatar: "https://via.placeholder.com/40/FF3A5E/FFFFFF?text=TC"
    },
    { 
      id: 4, 
      title: "Coffee Break: A Beginner's Guide", 
      thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png", 
      views: "28K",
      channel: "Coffee Daily",
      channelAvatar: "https://via.placeholder.com/40/55BB00/FFFFFF?text=CD"
    }
  ]
};

const countryFlags: Record<string, string> = {
  us: '🇺🇸',
  uk: '🇬🇧',
  ca: '🇨🇦',
  au: '🇦🇺',
  de: '🇩🇪',
  fr: '🇫🇷',
  jp: '🇯🇵',
  kr: '🇰🇷',
  cn: '🇨🇳',
  in: '🇮🇳',
  br: '🇧🇷',
  mx: '🇲🇽',
  es: '🇪🇸',
  it: '🇮🇹',
  ru: '🇷🇺',
  tr: '🇹🇷'
};

const ChannelManage = () => {
  const navigate = useNavigate();
  const { channelId } = useParams<{ channelId: string }>();
  const [showLiveDialog, setShowLiveDialog] = useState(false);
  
  // Using hardcoded data since we don't have actual API integration
  const channel = channelData;
  
  const handleBackClick = () => {
    navigate('/channels');
  };

  const handleOpenStudio = () => {
    toast.success('YouTube Studio açılıyor...', {
      description: 'Yeni sekmede YouTube Studio açılacak'
    });
    // Simulate opening YouTube Studio
    setTimeout(() => {
      window.open('https://studio.youtube.com', '_blank');
    }, 500);
  };

  const handleStartLive = () => {
    setShowLiveDialog(true);
  };

  const handleConfirmLive = () => {
    setShowLiveDialog(false);
    toast.success('Canlı yayın başlatılıyor!', {
      description: 'Canlı yayın kontrol paneli açılıyor...'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackClick}
            className="text-tube-white hover:bg-tube-dark mr-4"
          >
            <ChevronLeft size={16} />
            <span>Kanallara Dön</span>
          </Button>
        </div>

        {/* Channel Header */}
        <Card className="bg-tube-dark border-tube-lightgray/30">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-tube-lightgray/20">
                  <AvatarImage src={channel.thumbnailUrl} alt={channel.name} />
                  <AvatarFallback className="bg-tube-red text-white text-xl">
                    {channel.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-tube-white">{channel.name}</h1>
                    {channel.country && countryFlags[channel.country] && (
                      <span className="text-2xl" title={channel.country.toUpperCase()}>
                        {countryFlags[channel.country]}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-tube-white/70">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{channel.subscribers} abone</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      <span>{channel.views} görüntülenme</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Play size={16} />
                      <span>87 video</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="bg-tube-gray/40 text-tube-white border-tube-lightgray/20 hover:bg-tube-gray gap-2"
                  onClick={handleOpenStudio}
                >
                  <ExternalLink className="h-4 w-4" />
                  Studio'yu Aç
                </Button>
                <Button 
                  className="bg-tube-red hover:bg-tube-darkred text-white gap-2"
                  onClick={handleStartLive}
                >
                  <Radio className="h-4 w-4" />
                  Canlı Yayın
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-tube-gray/40 border-tube-lightgray/30">
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-tube-white">+15.3%</p>
                  <p className="text-tube-white/70 text-sm">Aylık Büyüme</p>
                </div>
              </Card>
              
              <Card className="bg-tube-gray/40 border-tube-lightgray/30">
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-tube-white">2.4M</p>
                  <p className="text-tube-white/70 text-sm">Bu Ay Görüntülenme</p>
                </div>
              </Card>
              
              <Card className="bg-tube-gray/40 border-tube-lightgray/30">
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="h-6 w-6 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-tube-white">8.7%</p>
                  <p className="text-tube-white/70 text-sm">Etkileşim Oranı</p>
                </div>
              </Card>
              
              <Card className="bg-tube-gray/40 border-tube-lightgray/30">
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Video className="h-6 w-6 text-tube-red" />
                  </div>
                  <p className="text-2xl font-bold text-tube-white">4</p>
                  <p className="text-tube-white/70 text-sm">Bu Ay Video</p>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Management Tabs */}
        <Tabs defaultValue="videos" className="space-y-4">
          <TabsList className="bg-tube-gray border-tube-lightgray/30">
            <TabsTrigger value="videos" className="text-tube-white data-[state=active]:bg-tube-red">
              <Video className="h-4 w-4 mr-2" />
              Videolar
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-tube-white data-[state=active]:bg-tube-red">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analitikler
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-tube-white data-[state=active]:bg-tube-red">
              <Settings className="h-4 w-4 mr-2" />
              Ayarlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <VideoManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <ChannelAnalytics />
          </TabsContent>

          <TabsContent value="settings">
            <ChannelSettings />
          </TabsContent>
        </Tabs>
      </div>

      {/* Live Stream Dialog */}
      <Dialog open={showLiveDialog} onOpenChange={setShowLiveDialog}>
        <DialogContent className="bg-tube-dark border-tube-lightgray/30">
          <DialogHeader>
            <DialogTitle className="text-tube-white flex items-center gap-2">
              <Radio className="h-5 w-5 text-tube-red" />
              Canlı Yayın Başlat
            </DialogTitle>
            <DialogDescription className="text-tube-white/70">
              Canlı yayın başlatmak üzeresiniz. Yayın ayarlarınızı kontrol edin.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-4 bg-tube-gray/40 rounded-lg">
              <p className="text-tube-white font-medium mb-2">Yayın Bilgileri</p>
              <div className="space-y-2 text-sm text-tube-white/70">
                <p>Kanal: {channel.name}</p>
                <p>Kalite: 1080p HD</p>
                <p>Gizlilik: Herkese Açık</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <p className="text-yellow-200 text-sm">Yayın başladığında abonelerinize bildirim gönderilecek</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowLiveDialog(false)}
              className="border-tube-lightgray/30 text-tube-white"
            >
              İptal
            </Button>
            <Button 
              onClick={handleConfirmLive}
              className="bg-tube-red hover:bg-tube-darkred text-white gap-2"
            >
              <Radio className="h-4 w-4" />
              Yayını Başlat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default ChannelManage;