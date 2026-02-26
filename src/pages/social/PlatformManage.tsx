import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Instagram, Youtube, Twitter, Facebook, Linkedin, Music,
  Plus, BarChart3, Settings, Users, Eye, Heart, TrendingUp, Calendar,
  Send, Image, Video, FileText, Clock, MoreVertical, ExternalLink,
  RefreshCw, Power, Upload, Hash, X, Sparkles, Wand2, PenTool,
  CalendarIcon, Globe, MessageCircle
} from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const platformConfig: Record<string, {
  label: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  features: string[];
  contentTypes: { value: string; label: string; icon: string }[];
  maxChars: number;
  tips: string[];
}> = {
  tiktok: {
    label: 'TikTok',
    icon: <Music className="h-6 w-6" />,
    color: 'text-white',
    bgGradient: 'from-black to-gray-800',
    features: ['Video', 'Live', 'Story'],
    contentTypes: [
      { value: 'video', label: 'Video', icon: '🎥' },
      { value: 'live', label: 'Canlı Yayın', icon: '🔴' },
      { value: 'story', label: 'Story', icon: '📱' },
    ],
    maxChars: 2200,
    tips: ['Kısa ve dikkat çekici videolar paylaşın', 'Trend müzikleri kullanın', 'İlk 3 saniye çok önemli'],
  },
  instagram: {
    label: 'Instagram',
    icon: <Instagram className="h-6 w-6" />,
    color: 'text-white',
    bgGradient: 'from-purple-600 via-pink-500 to-yellow-400',
    features: ['Post', 'Reels', 'Story', 'Live'],
    contentTypes: [
      { value: 'post', label: 'Gönderi', icon: '🖼️' },
      { value: 'reel', label: 'Reels', icon: '🎬' },
      { value: 'story', label: 'Story', icon: '📱' },
      { value: 'carousel', label: 'Galeri', icon: '🎠' },
    ],
    maxChars: 2200,
    tips: ['Yüksek kaliteli görseller kullanın', 'Hikaye paylaşımlarında etkileşim araçlarını kullanın', '30 hashtag sınırını akıllıca kullanın'],
  },
  youtube: {
    label: 'YouTube',
    icon: <Youtube className="h-6 w-6" />,
    color: 'text-white',
    bgGradient: 'from-red-600 to-red-800',
    features: ['Video', 'Shorts', 'Live', 'Community'],
    contentTypes: [
      { value: 'video', label: 'Video', icon: '📹' },
      { value: 'shorts', label: 'Shorts', icon: '⚡' },
      { value: 'community', label: 'Topluluk', icon: '💬' },
      { value: 'live', label: 'Canlı Yayın', icon: '🔴' },
    ],
    maxChars: 5000,
    tips: ['SEO uyumlu başlık ve açıklama yazın', 'Dikkat çekici thumbnail kullanın', 'İlk 48 saat kritik'],
  },
  x: {
    label: 'X (Twitter)',
    icon: <Twitter className="h-6 w-6" />,
    color: 'text-white',
    bgGradient: 'from-blue-400 to-blue-600',
    features: ['Tweet', 'Thread', 'Space'],
    contentTypes: [
      { value: 'tweet', label: 'Tweet', icon: '🐦' },
      { value: 'thread', label: 'Thread', icon: '🧵' },
      { value: 'space', label: 'Space', icon: '🎙️' },
    ],
    maxChars: 280,
    tips: ['Kısa ve etkili mesajlar yazın', 'Thread formatını hikaye anlatımı için kullanın', 'Görsel eklemek etkileşimi artırır'],
  },
  facebook: {
    label: 'Facebook',
    icon: <Facebook className="h-6 w-6" />,
    color: 'text-white',
    bgGradient: 'from-blue-600 to-blue-800',
    features: ['Post', 'Reels', 'Story', 'Live'],
    contentTypes: [
      { value: 'post', label: 'Gönderi', icon: '📝' },
      { value: 'reel', label: 'Reels', icon: '🎬' },
      { value: 'story', label: 'Story', icon: '📱' },
      { value: 'live', label: 'Canlı Yayın', icon: '🔴' },
    ],
    maxChars: 63206,
    tips: ['Soru sormak etkileşimi artırır', 'Video içerikler daha fazla erişim alır', 'Gruplarda paylaşım yapmayı deneyin'],
  },
  linkedin: {
    label: 'LinkedIn',
    icon: <Linkedin className="h-6 w-6" />,
    color: 'text-white',
    bgGradient: 'from-blue-700 to-blue-900',
    features: ['Post', 'Article', 'Newsletter'],
    contentTypes: [
      { value: 'post', label: 'Gönderi', icon: '📝' },
      { value: 'article', label: 'Makale', icon: '📰' },
      { value: 'newsletter', label: 'Bülten', icon: '📧' },
    ],
    maxChars: 3000,
    tips: ['Profesyonel ve bilgilendirici içerikler paylaşın', 'Kişisel deneyimlerinizi anlatın', 'Hafta içi sabah saatleri en iyi zaman'],
  },
  pinterest: {
    label: 'Pinterest',
    icon: <Image className="h-6 w-6" />,
    color: 'text-white',
    bgGradient: 'from-red-500 to-red-700',
    features: ['Pin', 'Idea Pin', 'Board'],
    contentTypes: [
      { value: 'pin', label: 'Pin', icon: '📌' },
      { value: 'idea_pin', label: 'Idea Pin', icon: '💡' },
      { value: 'board', label: 'Board', icon: '📋' },
    ],
    maxChars: 500,
    tips: ['Dikey görseller daha iyi performans gösterir', 'Anahtar kelimeleri açıklamaya ekleyin', 'Sezonluk içerikleri önceden planlayın'],
  },
};

const mockAccounts = [
  { id: '1', username: '@hesap1', profilePicture: 'https://i.pravatar.cc/150?img=32', followers: 23400, following: 342, posts: 87 },
  { id: '2', username: '@hesap2', profilePicture: 'https://i.pravatar.cc/150?img=13', followers: 12300, following: 456, posts: 102 },
];

const mockPosts = [
  { id: '1', title: 'Yeni ürün tanıtımı 🎉', status: 'published', date: '2024-01-15', views: 12400, likes: 890, comments: 56, type: 'video' },
  { id: '2', title: 'Haftalık ipuçları #5', status: 'published', date: '2024-01-14', views: 8700, likes: 432, comments: 28, type: 'image' },
  { id: '3', title: 'Canlı yayın duyurusu', status: 'scheduled', date: '2024-01-20', views: 0, likes: 0, comments: 0, type: 'text' },
  { id: '4', title: 'Arkası plan videosu', status: 'scheduled', date: '2024-01-22', views: 0, likes: 0, comments: 0, type: 'video' },
  { id: '5', title: 'Müşteri yorumları derlemesi', status: 'draft', date: '', views: 0, likes: 0, comments: 0, type: 'image' },
];

const PlatformManage = () => {
  const { platformId } = useParams<{ platformId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(true);
  const [autoPost, setAutoPost] = useState(false);

  // Content creation state
  const [contentTitle, setContentTitle] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [contentType, setContentType] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
  const [scheduledTime, setScheduledTime] = useState('12:00');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [publishMode, setPublishMode] = useState<'now' | 'schedule' | 'draft'>('now');

  const config = platformId ? platformConfig[platformId] : null;

  const stats = [
    { label: 'Takipçi', value: '35.7K', change: '+2.4%', icon: Users },
    { label: 'Görüntülenme', value: '128K', change: '+12.1%', icon: Eye },
    { label: 'Etkileşim', value: '4.8%', change: '+0.3%', icon: Heart },
    { label: 'Büyüme', value: '+1.2K', change: '+8.5%', icon: TrendingUp },
  ];

  if (!config) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-tube-white/60 text-lg">Platform bulunamadı</p>
          <Button variant="outline" onClick={() => navigate('/social')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Sosyal Medyaya Dön
          </Button>
        </div>
      </PageContainer>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Yayında</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Planlandı</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Taslak</Badge>;
      default:
        return null;
    }
  };

  const formatNumber = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  const addHashtag = () => {
    const tag = hashtagInput.trim().replace('#', '');
    if (tag && !hashtags.includes(tag)) {
      setHashtags(prev => [...prev, tag]);
      setHashtagInput('');
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(prev => prev.filter(h => h !== tag));
  };

  const handlePublish = () => {
    if (!contentBody.trim()) {
      toast({ title: 'Hata', description: 'İçerik alanı boş olamaz', variant: 'destructive' });
      return;
    }

    const messages: Record<string, { title: string; desc: string }> = {
      now: { title: 'Paylaşıldı! 🎉', desc: `İçerik ${config.label} üzerinde yayınlandı.` },
      schedule: { title: 'Planlandı! 📅', desc: `İçerik ${scheduledDate ? format(scheduledDate, 'dd MMM yyyy') : ''} ${scheduledTime} için planlandı.` },
      draft: { title: 'Taslak Kaydedildi 📝', desc: 'İçerik taslak olarak kaydedildi.' },
    };

    toast({ title: messages[publishMode].title, description: messages[publishMode].desc });

    // Reset form
    setContentTitle('');
    setContentBody('');
    setContentType('');
    setHashtags([]);
    setScheduledDate(undefined);
    setPublishMode('now');
    setActiveTab('content');
  };

  const handleAISuggest = () => {
    toast({ title: 'AI Öneri ✨', description: 'İçerik önerisi oluşturuluyor...' });
    setTimeout(() => {
      setContentBody(`${config.label} için mükemmel bir gönderi! 🚀\n\nBu hafta en çok konuşulan konulardan biri hakkında düşüncelerimizi paylaşmak istedik.\n\nSiz ne düşünüyorsunuz? Yorumlarda bize bildirin! 👇`);
      setHashtags(['trending', 'viral', config.label.toLowerCase()]);
    }, 800);
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/social')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className={`rounded-xl p-3 bg-gradient-to-br ${config.bgGradient}`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-tube-white">{config.label} Yönetimi</h1>
            <p className="text-tube-white/60 text-sm">{mockAccounts.length} hesap bağlı • {config.features.join(', ')}</p>
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 gap-2"
            onClick={() => setActiveTab('create')}
          >
            <Plus className="h-4 w-4" />
            Yeni İçerik
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-purple-400" />
                  <span className="text-xs text-green-400">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-tube-white">{stat.value}</p>
                <p className="text-xs text-tube-white/60">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-tube-gray/40 grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Genel</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-2">
              <PenTool className="h-4 w-4" />
              <span className="hidden sm:inline">Oluştur</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">İçerikler</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Planlama</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Ayarlar</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardHeader>
                <CardTitle className="text-tube-white text-lg">Bağlı Hesaplar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockAccounts.map((account) => (
                  <div key={account.id} className="flex items-center gap-4 p-3 rounded-lg bg-tube-gray/60 hover:bg-tube-gray/80 transition-colors">
                    <img src={account.profilePicture} alt={account.username} className="h-10 w-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-tube-white font-medium">{account.username}</p>
                      <p className="text-tube-white/50 text-xs">{formatNumber(account.followers)} takipçi • {account.posts} gönderi</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardHeader>
                <CardTitle className="text-tube-white text-lg">Son Performans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-tube-gray/60">
                    <p className="text-2xl font-bold text-tube-white">24</p>
                    <p className="text-xs text-tube-white/60">Bu Ay Gönderi</p>
                  </div>
                  <div className="p-4 rounded-lg bg-tube-gray/60">
                    <p className="text-2xl font-bold text-tube-white">4.8%</p>
                    <p className="text-xs text-tube-white/60">Ort. Etkileşim</p>
                  </div>
                  <div className="p-4 rounded-lg bg-tube-gray/60">
                    <p className="text-2xl font-bold text-tube-white">128K</p>
                    <p className="text-xs text-tube-white/60">Toplam Görüntülenme</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardHeader>
                <CardTitle className="text-tube-white text-lg">En İyi Paylaşım Saatleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 flex-wrap">
                  {['09:00', '12:30', '17:00', '20:00', '21:30'].map((time) => (
                    <Badge key={time} variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 px-3 py-1.5">
                      <Clock className="h-3 w-3 mr-1" />
                      {time}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CREATE TAB - New inline content creation */}
          <TabsContent value="create" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main editor */}
              <div className="lg:col-span-2 space-y-5">
                <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-tube-white text-lg flex items-center gap-2">
                        <PenTool className="h-5 w-5 text-purple-400" />
                        İçerik Oluştur
                      </CardTitle>
                      <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 gap-2" onClick={handleAISuggest}>
                        <Sparkles className="h-4 w-4" />
                        AI Öneri
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Content type selector */}
                    <div>
                      <Label className="text-tube-white/80">İçerik Türü</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                        {config.contentTypes.map((ct) => (
                          <button
                            key={ct.value}
                            onClick={() => setContentType(ct.value)}
                            className={cn(
                              "p-3 rounded-lg border text-center transition-all text-sm",
                              contentType === ct.value
                                ? "border-purple-500 bg-purple-500/20 text-purple-300"
                                : "border-tube-lightgray/20 bg-tube-gray/60 text-tube-white/70 hover:bg-tube-gray/80"
                            )}
                          >
                            <span className="text-lg block mb-1">{ct.icon}</span>
                            {ct.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <Label htmlFor="ct-title" className="text-tube-white/80">Başlık</Label>
                      <Input
                        id="ct-title"
                        value={contentTitle}
                        onChange={(e) => setContentTitle(e.target.value)}
                        placeholder={`${config.label} için başlık yazın...`}
                        className="bg-tube-gray/60 border-tube-lightgray/20 mt-1"
                      />
                    </div>

                    {/* Content body */}
                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ct-body" className="text-tube-white/80">İçerik</Label>
                        <span className="text-xs text-tube-white/40">{contentBody.length}/{config.maxChars}</span>
                      </div>
                      <Textarea
                        id="ct-body"
                        value={contentBody}
                        onChange={(e) => setContentBody(e.target.value.slice(0, config.maxChars))}
                        placeholder={`${config.label} için içeriğinizi yazın...`}
                        className="bg-tube-gray/60 border-tube-lightgray/20 min-h-[160px] resize-none mt-1"
                      />
                    </div>

                    {/* Media upload */}
                    <div>
                      <Label className="text-tube-white/80">Medya</Label>
                      <div className="mt-2 border-2 border-dashed border-tube-lightgray/20 rounded-lg p-6 text-center hover:border-purple-500/40 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 text-tube-white/30 mx-auto mb-2" />
                        <p className="text-tube-white/50 text-sm">Görsel veya video sürükleyin</p>
                        <p className="text-tube-white/30 text-xs mt-1">PNG, JPG, MP4 • Maks. 100MB</p>
                      </div>
                    </div>

                    {/* Hashtags */}
                    <div>
                      <Label className="text-tube-white/80">Hashtag'ler</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={hashtagInput}
                          onChange={(e) => setHashtagInput(e.target.value)}
                          placeholder="hashtag ekle..."
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                          className="bg-tube-gray/60 border-tube-lightgray/20"
                        />
                        <Button size="sm" variant="outline" className="border-tube-lightgray/20" onClick={addHashtag}>
                          <Hash className="h-4 w-4" />
                        </Button>
                      </div>
                      {hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {hashtags.map(tag => (
                            <Badge key={tag} variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 gap-1">
                              #{tag}
                              <button onClick={() => removeHashtag(tag)} className="hover:text-red-400">
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - scheduling & options */}
              <div className="space-y-5">
                {/* Account selector */}
                <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-tube-white text-sm">Hesap Seçimi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {mockAccounts.map((account) => (
                      <button
                        key={account.id}
                        onClick={() => setSelectedAccount(account.id)}
                        className={cn(
                          "w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-left",
                          selectedAccount === account.id
                            ? "bg-purple-500/20 border border-purple-500/30"
                            : "bg-tube-gray/60 border border-transparent hover:bg-tube-gray/80"
                        )}
                      >
                        <img src={account.profilePicture} alt="" className="h-8 w-8 rounded-full" />
                        <div>
                          <p className="text-tube-white text-sm font-medium">{account.username}</p>
                          <p className="text-tube-white/40 text-xs">{formatNumber(account.followers)} takipçi</p>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>

                {/* Publish mode */}
                <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-tube-white text-sm">Yayınlama</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { value: 'now' as const, label: 'Şimdi Paylaş', icon: Send, desc: 'Hemen yayınla' },
                      { value: 'schedule' as const, label: 'Planla', icon: CalendarIcon, desc: 'Tarih ve saat seç' },
                      { value: 'draft' as const, label: 'Taslak', icon: FileText, desc: 'Sonra düzenle' },
                    ].map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => setPublishMode(mode.value)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                          publishMode === mode.value
                            ? "bg-purple-500/20 border border-purple-500/30"
                            : "bg-tube-gray/60 border border-transparent hover:bg-tube-gray/80"
                        )}
                      >
                        <mode.icon className="h-4 w-4 text-purple-400 flex-shrink-0" />
                        <div>
                          <p className="text-tube-white text-sm font-medium">{mode.label}</p>
                          <p className="text-tube-white/40 text-xs">{mode.desc}</p>
                        </div>
                      </button>
                    ))}

                    {publishMode === 'schedule' && (
                      <div className="space-y-3 pt-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full border-tube-lightgray/20 justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {scheduledDate ? format(scheduledDate, 'dd MMM yyyy') : 'Tarih seçin'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-tube-gray border-tube-lightgray/30" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={scheduledDate}
                              onSelect={setScheduledDate}
                              disabled={(date) => date < new Date()}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <Input
                          type="time"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          className="bg-tube-gray/60 border-tube-lightgray/20"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-tube-white text-sm flex items-center gap-2">
                      <Wand2 className="h-4 w-4 text-yellow-400" />
                      Platform İpuçları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {config.tips.map((tip, i) => (
                        <li key={i} className="text-tube-white/60 text-xs flex items-start gap-2">
                          <span className="text-yellow-400 mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Submit button */}
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 gap-2 h-12 text-base"
                  onClick={handlePublish}
                >
                  {publishMode === 'now' && <><Send className="h-4 w-4" /> Şimdi Paylaş</>}
                  {publishMode === 'schedule' && <><CalendarIcon className="h-4 w-4" /> Planla</>}
                  {publishMode === 'draft' && <><FileText className="h-4 w-4" /> Taslak Kaydet</>}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-tube-white">Tüm İçerikler</h3>
              <div className="flex gap-2">
                {['Tümü', 'Yayında', 'Planlandı', 'Taslak'].map((filter) => (
                  <Badge
                    key={filter}
                    variant="outline"
                    className="cursor-pointer hover:bg-tube-lightgray/20 border-tube-lightgray/30 text-tube-white/70"
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {mockPosts.map((post) => (
                <Card key={post.id} className="border-tube-lightgray/20 bg-tube-gray/40 hover:bg-tube-gray/60 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-tube-gray/80 flex items-center justify-center text-tube-white/60">
                      {getTypeIcon(post.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-tube-white font-medium truncate">{post.title}</p>
                      <p className="text-tube-white/50 text-xs">{post.date || 'Tarih belirlenmedi'}</p>
                    </div>
                    {getStatusBadge(post.status)}
                    {post.status === 'published' && (
                      <div className="hidden md:flex items-center gap-4 text-xs text-tube-white/60">
                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {formatNumber(post.views)}</span>
                        <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {formatNumber(post.likes)}</span>
                      </div>
                    )}
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6 mt-6">
            <Card className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-tube-white text-lg">Planlanan İçerikler</CardTitle>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 gap-1" onClick={() => setActiveTab('create')}>
                    <Plus className="h-3 w-3" /> İçerik Planla
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockPosts.filter(p => p.status === 'scheduled').map((post) => (
                  <div key={post.id} className="flex items-center gap-4 p-4 rounded-lg bg-tube-gray/60">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-tube-white font-medium">{post.title}</p>
                      <p className="text-tube-white/50 text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.date} • 14:00
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-tube-lightgray/30 text-xs">
                        Düzenle
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs gap-1">
                        <Send className="h-3 w-3" />
                        Şimdi Paylaş
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardHeader>
                <CardTitle className="text-tube-white text-lg">Taslaklar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockPosts.filter(p => p.status === 'draft').map((post) => (
                  <div key={post.id} className="flex items-center gap-4 p-3 rounded-lg bg-tube-gray/60">
                    <div className="h-8 w-8 rounded bg-yellow-500/20 flex items-center justify-center">
                      {getTypeIcon(post.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-tube-white text-sm">{post.title}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => setActiveTab('create')}>Tamamla</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardHeader>
                <CardTitle className="text-tube-white text-lg">Platform Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-tube-white font-medium">Bildirimler</p>
                    <p className="text-tube-white/50 text-sm">Yeni etkileşim ve yorum bildirimleri</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-tube-white font-medium">Otomatik Paylaşım</p>
                    <p className="text-tube-white/50 text-sm">Planlanan içerikleri otomatik paylaş</p>
                  </div>
                  <Switch checked={autoPost} onCheckedChange={setAutoPost} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-tube-white font-medium">Hesabı Yenile</p>
                    <p className="text-tube-white/50 text-sm">Bağlantıyı ve verileri yenile</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-tube-lightgray/30 gap-2" onClick={() => toast({ title: 'Yenileniyor', description: 'Hesap verileri güncelleniyor...' })}>
                    <RefreshCw className="h-4 w-4" />
                    Yenile
                  </Button>
                </div>

                <div className="pt-4 border-t border-tube-lightgray/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-400 font-medium">Bağlantıyı Kes</p>
                      <p className="text-tube-white/50 text-sm">Bu platformdaki tüm hesapların bağlantısını kes</p>
                    </div>
                    <Button variant="destructive" size="sm" className="gap-2" onClick={() => toast({ title: 'Bağlantı kesildi', description: `${config.label} bağlantısı kaldırıldı.`, variant: 'destructive' })}>
                      <Power className="h-4 w-4" />
                      Bağlantıyı Kes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default PlatformManage;
