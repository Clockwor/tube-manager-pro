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
  Settings, Video, Target, TrendingUp, ExternalLink, Radio,
  Verified, Calendar, DollarSign
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
import { channelsData } from '@/data/channelsData';

const countryFlags: Record<string, string> = {
  US: '🇺🇸', GB: '🇬🇧', CA: '🇨🇦', AU: '🇦🇺', DE: '🇩🇪',
  FR: '🇫🇷', TR: '🇹🇷', BR: '🇧🇷', JP: '🇯🇵', KR: '🇰🇷',
  IN: '🇮🇳', MX: '🇲🇽', ES: '🇪🇸', IT: '🇮🇹', NL: '🇳🇱'
};

const ChannelManage = () => {
  const navigate = useNavigate();
  const { channelId } = useParams<{ channelId: string }>();
  const [showLiveDialog, setShowLiveDialog] = useState(false);
  
  const channel = channelsData.find(c => c.id === channelId);
  
  if (!channel) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <h1 className="text-2xl font-bold text-tube-white">Kanal Bulunamadı</h1>
          <p className="text-tube-white/60">Bu ID ile eşleşen bir kanal bulunamadı.</p>
          <Button onClick={() => navigate('/channels')} className="bg-primary text-primary-foreground">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Kanallara Dön
          </Button>
        </div>
      </PageContainer>
    );
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleBackClick = () => navigate('/channels');

  const handleOpenStudio = () => {
    toast.success('YouTube Studio açılıyor...', {
      description: 'Yeni sekmede YouTube Studio açılacak'
    });
    setTimeout(() => window.open('https://studio.youtube.com', '_blank'), 500);
  };

  const handleStartLive = () => setShowLiveDialog(true);

  const handleConfirmLive = () => {
    setShowLiveDialog(false);
    toast.success('Canlı yayın başlatılıyor!', {
      description: 'Canlı yayın kontrol paneli açılıyor...'
    });
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center">
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

        {/* Channel Header Card */}
        <Card className="bg-tube-dark border-tube-lightgray/30 overflow-hidden">
          {/* Banner */}
          {channel.banner && (
            <div className="h-32 bg-gradient-to-r from-tube-red/30 to-tube-dark overflow-hidden">
              <img src={channel.banner} alt="Banner" className="w-full h-full object-cover opacity-60" />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-3 border-tube-lightgray/20 -mt-8 relative z-10">
                  <AvatarImage src={channel.avatar} alt={channel.name} />
                  <AvatarFallback className="bg-tube-red text-white text-2xl">
                    {channel.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-tube-white">{channel.name}</h1>
                    {channel.verified && <Verified className="h-5 w-5 text-blue-500 fill-current" />}
                    {countryFlags[channel.country] && (
                      <span className="text-xl">{countryFlags[channel.country]}</span>
                    )}
                  </div>
                  <p className="text-tube-white/50 text-sm mb-2">@{channel.handle}</p>
                  <div className="flex items-center gap-6 text-tube-white/70 text-sm">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{formatNumber(channel.subscriberCount)} abone</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>{formatNumber(channel.totalViews)} görüntülenme</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Play size={14} />
                      <span>{channel.videoCount} video</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(channel.publishedAt).toLocaleDateString('tr-TR')}</span>
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

            {/* Description */}
            {channel.description && (
              <p className="text-tube-white/60 text-sm mb-6 max-w-2xl">{channel.description}</p>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="bg-tube-gray/40 border-tube-lightgray/30">
                <div className="p-4 text-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-tube-white">+{channel.growth.subscribers.percentage.toFixed(1)}%</p>
                  <p className="text-tube-white/60 text-xs">Abone Büyümesi</p>
                </div>
              </Card>
              <Card className="bg-tube-gray/40 border-tube-lightgray/30">
                <div className="p-4 text-center">
                  <Eye className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-tube-white">{formatNumber(channel.stats.viewsLast30Days)}</p>
                  <p className="text-tube-white/60 text-xs">Bu Ay Görüntülenme</p>
                </div>
              </Card>
              <Card className="bg-tube-gray/40 border-tube-lightgray/30">
                <div className="p-4 text-center">
                  <Target className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-tube-white">{channel.stats.engagementRate.toFixed(1)}%</p>
                  <p className="text-tube-white/60 text-xs">Etkileşim Oranı</p>
                </div>
              </Card>
              <Card className="bg-tube-gray/40 border-tube-lightgray/30">
                <div className="p-4 text-center">
                  <Video className="h-5 w-5 text-tube-red mx-auto mb-1" />
                  <p className="text-xl font-bold text-tube-white">{channel.stats.videosLast30Days}</p>
                  <p className="text-tube-white/60 text-xs">Bu Ay Video</p>
                </div>
              </Card>
              <Card className="bg-tube-gray/40 border-tube-lightgray/30">
                <div className="p-4 text-center">
                  <DollarSign className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-tube-white">${formatNumber(channel.stats.estimatedRevenue)}</p>
                  <p className="text-tube-white/60 text-xs">Tahmini Gelir</p>
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
              {channel.name} kanalında canlı yayın başlatmak üzeresiniz.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-4 bg-tube-gray/40 rounded-lg">
              <p className="text-tube-white font-medium mb-2">Yayın Bilgileri</p>
              <div className="space-y-2 text-sm text-tube-white/70">
                <p>Kanal: {channel.name}</p>
                <p>Aboneler: {formatNumber(channel.subscriberCount)}</p>
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
