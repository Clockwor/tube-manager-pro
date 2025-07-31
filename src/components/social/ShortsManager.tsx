import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Video, 
  Scissors, 
  Sparkles, 
  Play, 
  Download,
  Instagram,
  Youtube,
  Music,
  Clock,
  Eye,
  Settings
} from 'lucide-react';

const ShortsManager = () => {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [processingStage, setProcessingStage] = useState<'upload' | 'analyzing' | 'clips' | 'editing'>('upload');
  const [progress, setProgress] = useState(0);

  const mockClips = [
    {
      id: 1,
      title: 'En İlginç Anlar',
      duration: '15s',
      platform: 'TikTok',
      score: 95,
      thumbnail: '/api/placeholder/160/284',
      startTime: '02:45',
      description: 'Yüksek etkileşim potansiyeli'
    },
    {
      id: 2,
      title: 'Önemli Noktalar',
      duration: '30s',
      platform: 'YouTube',
      score: 88,
      thumbnail: '/api/placeholder/160/284',
      startTime: '05:12',
      description: 'Ana konuları özetleyen bölüm'
    },
    {
      id: 3,
      title: 'Komik Sahneler',
      duration: '20s',
      platform: 'Instagram',
      score: 82,
      thumbnail: '/api/placeholder/160/284',
      startTime: '08:33',
      description: 'Viral olma potansiyeli yüksek'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedVideo(file);
      setProcessingStage('analyzing');
      simulateProcessing();
    }
  };

  const simulateProcessing = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProcessingStage('clips');
      }
    }, 500);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'TikTok': return <Music className="h-4 w-4" />;
      case 'YouTube': return <Youtube className="h-4 w-4" />;
      case 'Instagram': return <Instagram className="h-4 w-4" />;
      default: return <Video className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'TikTok': return 'bg-pink-500';
      case 'YouTube': return 'bg-red-500';
      case 'Instagram': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Upload className="h-5 w-5 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-tube-white">Video Yükle</h3>
        </div>
        
        {!uploadedVideo ? (
          <div className="border-2 border-dashed border-tube-lightgray/30 rounded-lg p-8 text-center">
            <Video className="h-12 w-12 text-tube-white/50 mx-auto mb-4" />
            <p className="text-tube-white/70 mb-4">
              Uzun YouTube videonuzu yükleyin ve AI ile otomatik kısa videolar oluşturun
            </p>
            <label htmlFor="video-upload" className="cursor-pointer">
              <Button asChild>
                <span>Video Seç</span>
              </Button>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-tube-gray/30 rounded-lg">
              <Video className="h-8 w-8 text-green-400" />
              <div className="flex-1">
                <p className="text-tube-white font-medium">{uploadedVideo.name}</p>
                <p className="text-tube-white/60 text-sm">
                  {(uploadedVideo.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            </div>
            
            {processingStage === 'analyzing' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span className="text-tube-white/80">AI ile analiz ediliyor...</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}
          </div>
        )}
      </Card>

      {/* AI Analysis Results */}
      {processingStage === 'clips' && (
        <>
          <Card className="glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Sparkles className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-tube-white">AI Analiz Sonuçları</h3>
              </div>
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                {mockClips.length} klip bulundu
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockClips.map((clip) => (
                <Card key={clip.id} className="bg-tube-gray/30 border-tube-lightgray/30 overflow-hidden">
                  <div className="relative">
                    <div className="aspect-[9/16] bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white/60" />
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge 
                        variant="secondary" 
                        className={`${getPlatformColor(clip.platform)} text-white border-0`}
                      >
                        <div className="flex items-center gap-1">
                          {getPlatformIcon(clip.platform)}
                          <span className="text-xs">{clip.platform}</span>
                        </div>
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-black/50 text-white border-0">
                        {clip.duration}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="bg-black/50 text-white border-0">
                        <Clock className="h-3 w-3 mr-1" />
                        {clip.startTime}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-medium text-tube-white mb-1">{clip.title}</h4>
                      <p className="text-xs text-tube-white/60">{clip.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-tube-white/80">Skor: {clip.score}/100</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Settings className="h-3 w-3 mr-1" />
                        Düzenle
                      </Button>
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Download className="h-3 w-3 mr-1" />
                        İndir
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Export Settings */}
          <Card className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Download className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-tube-white">Toplu İşlemler</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-pink-600 hover:bg-pink-700 h-16 flex-col gap-2">
                <Music className="h-5 w-5" />
                <span>TikTok'a Aktarım</span>
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 h-16 flex-col gap-2">
                <Instagram className="h-5 w-5" />
                <span>Instagram'a Aktarım</span>
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 h-16 flex-col gap-2">
                <Youtube className="h-5 w-5" />
                <span>YouTube Shorts'a Aktarım</span>
              </Button>
            </div>
            
            <div className="mt-4 p-4 bg-tube-gray/30 rounded-lg">
              <p className="text-tube-white/70 text-sm">
                💡 <strong>İpucu:</strong> AI otomatik olarak her platform için optimize edilmiş formatlar oluşturacak.
                Yazılar, hashtag'ler ve kapak görselleri de dahil edilecek.
              </p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default ShortsManager;