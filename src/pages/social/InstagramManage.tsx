import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Instagram, Users, UserPlus, UserMinus, UserCheck, UserX, Plus,
  MessageCircle, Send, Image, Video, Heart, Eye, TrendingUp, 
  Settings, Search, Filter, Download, Upload, Trash2, RefreshCw,
  BarChart3, Clock, Calendar, Shield, Bell, BellOff, Lock, Unlock,
  List, Bookmark, Star, Copy, Hash, AtSign, Globe, Smartphone,
  ChevronRight, MoreVertical, Check, X, AlertTriangle, Zap,
  FileText, Play, Pause, History, Database, Target
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
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  AreaChart, Area, BarChart as RechartsBarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// --- Mock Data ---
const mockAccounts = [
  { id: '1', username: 'socifly.software', userId: '3067591062', fullName: 'Socifly.com', bio: 'SOCIFLY SOFTWARE LTD', profilePicture: 'https://i.pravatar.cc/150?img=32', followers: 2691, following: 0, posts: 0, isPrivate: false, isVerified: false },
  { id: '2', username: 'design.studio', userId: '4521890345', fullName: 'Design Studio', bio: 'Creative Design Agency', profilePicture: 'https://i.pravatar.cc/150?img=13', followers: 15700, following: 456, posts: 102, isPrivate: false, isVerified: true },
];

const mockFollowers = [
  { id: '1', username: 'user_alpha', fullName: 'Alpha User', profilePicture: 'https://i.pravatar.cc/40?img=1', followers: 1200, isFollowing: true, isPrivate: false },
  { id: '2', username: 'creative_mind', fullName: 'Creative Mind', profilePicture: 'https://i.pravatar.cc/40?img=2', followers: 5400, isFollowing: false, isPrivate: false },
  { id: '3', username: 'photo_master', fullName: 'Photo Master', profilePicture: 'https://i.pravatar.cc/40?img=3', followers: 890, isFollowing: true, isPrivate: true },
  { id: '4', username: 'digital_nomad', fullName: 'Digital Nomad', profilePicture: 'https://i.pravatar.cc/40?img=4', followers: 23100, isFollowing: false, isPrivate: false },
  { id: '5', username: 'art_lover_99', fullName: 'Art Lover', profilePicture: 'https://i.pravatar.cc/40?img=5', followers: 340, isFollowing: true, isPrivate: false },
  { id: '6', username: 'tech_guru', fullName: 'Tech Guru', profilePicture: 'https://i.pravatar.cc/40?img=6', followers: 67800, isFollowing: false, isPrivate: false },
  { id: '7', username: 'travel_bug', fullName: 'Travel Bug', profilePicture: 'https://i.pravatar.cc/40?img=7', followers: 2100, isFollowing: true, isPrivate: false },
  { id: '8', username: 'food_diary', fullName: 'Food Diary', profilePicture: 'https://i.pravatar.cc/40?img=8', followers: 9800, isFollowing: false, isPrivate: true },
];

const mockDMs = [
  { id: '1', username: 'user_alpha', lastMessage: 'Merhaba! İşbirliği yapalım mı?', time: '14:30', unread: 2, profilePic: 'https://i.pravatar.cc/40?img=1' },
  { id: '2', username: 'creative_mind', lastMessage: 'Harika fotoğraflar!', time: '12:15', unread: 0, profilePic: 'https://i.pravatar.cc/40?img=2' },
  { id: '3', username: 'photo_master', lastMessage: 'Fiyat bilgisi alabilir miyim?', time: '09:45', unread: 1, profilePic: 'https://i.pravatar.cc/40?img=3' },
  { id: '4', username: 'digital_nomad', lastMessage: 'Teşekkürler 🙏', time: 'Dün', unread: 0, profilePic: 'https://i.pravatar.cc/40?img=4' },
];

const mockPosts = [
  { id: '1', type: 'image', caption: 'Yeni koleksiyon 🎨', likes: 342, comments: 28, date: '2024-01-15', thumbnail: '🖼️' },
  { id: '2', type: 'video', caption: 'Behind the scenes 🎬', likes: 1200, comments: 89, date: '2024-01-12', thumbnail: '🎥' },
  { id: '3', type: 'carousel', caption: '10 tasarım ipucu ✨', likes: 567, comments: 45, date: '2024-01-10', thumbnail: '🎠' },
  { id: '4', type: 'reel', caption: 'Quick tutorial #design', likes: 2340, comments: 156, date: '2024-01-08', thumbnail: '📱' },
  { id: '5', type: 'story', caption: 'Günlük rutin', likes: 0, comments: 0, date: '2024-01-07', thumbnail: '⭕' },
];

const historyData = [
  { date: '02.06.2024 02:00:27', posts: 0, followers: 2691, following: 0 },
  { date: '01.06.2024 02:00:15', posts: 0, followers: 2688, following: 0 },
  { date: '31.05.2024 02:00:22', posts: 0, followers: 2685, following: 0 },
  { date: '30.05.2024 02:00:18', posts: 0, followers: 2680, following: 0 },
  { date: '29.05.2024 02:00:31', posts: 0, followers: 2674, following: 0 },
];

const followerGrowthData = [
  { name: 'Oca', followers: 2200, unfollowers: 45 },
  { name: 'Şub', followers: 2350, unfollowers: 38 },
  { name: 'Mar', followers: 2480, unfollowers: 52 },
  { name: 'Nis', followers: 2550, unfollowers: 41 },
  { name: 'May', followers: 2620, unfollowers: 35 },
  { name: 'Haz', followers: 2691, unfollowers: 28 },
];

const engagementByHour = [
  { hour: '06:00', engagement: 12 }, { hour: '08:00', engagement: 35 },
  { hour: '10:00', engagement: 48 }, { hour: '12:00', engagement: 72 },
  { hour: '14:00', engagement: 65 }, { hour: '16:00', engagement: 58 },
  { hour: '18:00', engagement: 89 }, { hour: '20:00', engagement: 95 },
  { hour: '22:00', engagement: 78 }, { hour: '00:00', engagement: 32 },
];

const contentTypeData = [
  { name: 'Gönderi', value: 45, color: '#a855f7' },
  { name: 'Reels', value: 30, color: '#ec4899' },
  { name: 'Story', value: 15, color: '#3b82f6' },
  { name: 'Canlı', value: 10, color: '#22c55e' },
];

const InstagramManage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Account state
  const [selectedAccount, setSelectedAccount] = useState(mockAccounts[0]);
  const [activeTab, setActiveTab] = useState('account');

  // Follower operations state
  const [followerSearch, setFollowerSearch] = useState('');
  const [followerFilter, setFollowerFilter] = useState('all');
  const [selectedFollowers, setSelectedFollowers] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('');

  // DM state
  const [dmSearch, setDmSearch] = useState('');
  const [dmMessage, setDmMessage] = useState('');
  const [selectedDM, setSelectedDM] = useState<string | null>(null);

  // Post state
  const [postCaption, setPostCaption] = useState('');
  const [postHashtags, setPostHashtags] = useState('');
  const [storyText, setStoryText] = useState('');

  // Settings state
  const [showNotifications, setShowNotifications] = useState(true);
  const [showFollowerNotif, setShowFollowerNotif] = useState(true);
  const [showLikeNotif, setShowLikeNotif] = useState(true);
  const [showCommentNotif, setShowCommentNotif] = useState(true);
  const [showDMNotif, setShowDMNotif] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [keepInLists, setKeepInLists] = useState(true);
  const [useCustomHeader, setUseCustomHeader] = useState(false);

  // List state
  const [lists, setLists] = useState([
    { id: '1', name: 'VIP Takipçiler', count: 24, color: '#a855f7' },
    { id: '2', name: 'Potansiyel Müşteriler', count: 156, color: '#3b82f6' },
    { id: '3', name: 'Rakipler', count: 12, color: '#ef4444' },
    { id: '4', name: 'İşbirlikleri', count: 8, color: '#22c55e' },
  ]);
  const [newListName, setNewListName] = useState('');

  // History
  const [historyDate, setHistoryDate] = useState('');

  const formatNumber = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  const filteredFollowers = mockFollowers.filter(f => {
    const matchesSearch = f.username.toLowerCase().includes(followerSearch.toLowerCase()) ||
      f.fullName.toLowerCase().includes(followerSearch.toLowerCase());
    if (followerFilter === 'following') return matchesSearch && f.isFollowing;
    if (followerFilter === 'not_following') return matchesSearch && !f.isFollowing;
    if (followerFilter === 'private') return matchesSearch && f.isPrivate;
    return matchesSearch;
  });

  const toggleFollowerSelection = (id: string) => {
    setSelectedFollowers(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedFollowers.length === 0) {
      toast({ title: 'Uyarı', description: 'İşlem ve kullanıcı seçimi yapınız.', variant: 'destructive' });
      return;
    }
    const actions: Record<string, string> = {
      follow: 'takip edildi', unfollow: 'takipten çıkarıldı', block: 'engellendi',
      whitelist: 'beyaz listeye eklendi', message: 'mesaj gönderildi'
    };
    toast({ title: 'Toplu İşlem ✅', description: `${selectedFollowers.length} kullanıcı ${actions[bulkAction] || 'işlendi'}.` });
    setSelectedFollowers([]);
  };

  const handleSendDM = () => {
    if (!dmMessage.trim()) return;
    toast({ title: 'Mesaj Gönderildi ✉️', description: `Mesaj başarıyla gönderildi.` });
    setDmMessage('');
  };

  const handlePublishPost = () => {
    if (!postCaption.trim()) {
      toast({ title: 'Hata', description: 'Açıklama alanı boş olamaz.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Gönderi Paylaşıldı 🎉', description: 'İçerik Instagram\'da yayınlandı.' });
    setPostCaption('');
    setPostHashtags('');
  };

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    setLists(prev => [...prev, { id: Date.now().toString(), name: newListName, count: 0, color: '#8b5cf6' }]);
    setNewListName('');
    toast({ title: 'Liste Oluşturuldu 📋', description: `"${newListName}" listesi başarıyla oluşturuldu.` });
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/social')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="rounded-xl p-3 bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400">
            <Instagram className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-tube-white">Instagram Yönetim Paneli</h1>
            <p className="text-tube-white/60 text-sm">InstaFly Tarzı Gelişmiş Yönetim Aracı</p>
          </div>
          <Select value={selectedAccount.id} onValueChange={(val) => setSelectedAccount(mockAccounts.find(a => a.id === val) || mockAccounts[0])}>
            <SelectTrigger className="w-[200px] bg-tube-gray/50 border-tube-lightgray/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-tube-gray border-tube-lightgray/30">
              {mockAccounts.map(acc => (
                <SelectItem key={acc.id} value={acc.id} className="text-tube-white">{acc.username}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Main Tabs - InstaFly style */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-tube-gray/40 grid grid-cols-7 w-full">
            <TabsTrigger value="account" className="text-xs gap-1"><Users className="h-3 w-3" /><span className="hidden lg:inline">Kullanıcı</span></TabsTrigger>
            <TabsTrigger value="followers" className="text-xs gap-1"><UserPlus className="h-3 w-3" /><span className="hidden lg:inline">Takipçi</span></TabsTrigger>
            <TabsTrigger value="bulk" className="text-xs gap-1"><Zap className="h-3 w-3" /><span className="hidden lg:inline">Toplu İşlem</span></TabsTrigger>
            <TabsTrigger value="dm" className="text-xs gap-1"><MessageCircle className="h-3 w-3" /><span className="hidden lg:inline">Mesajlar</span></TabsTrigger>
            <TabsTrigger value="posts" className="text-xs gap-1"><Image className="h-3 w-3" /><span className="hidden lg:inline">Gönderi</span></TabsTrigger>
            <TabsTrigger value="lists" className="text-xs gap-1"><List className="h-3 w-3" /><span className="hidden lg:inline">Listeler</span></TabsTrigger>
            <TabsTrigger value="settings" className="text-xs gap-1"><Settings className="h-3 w-3" /><span className="hidden lg:inline">Ayarlar</span></TabsTrigger>
          </TabsList>

          {/* ====== TAB: Kullanıcı Bilgileri ====== */}
          <TabsContent value="account" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Info Card */}
              <Card className="lg:col-span-2 border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-pink-400" />
                    Kullanıcı Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6">
                    <img src={selectedAccount.profilePicture} alt="" className="h-20 w-20 rounded-full object-cover border-2 border-pink-500/50" />
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-tube-white/60 text-xs">Kullanıcı ID</Label>
                          <p className="text-tube-white font-mono text-sm">{selectedAccount.userId}</p>
                        </div>
                        <div>
                          <Label className="text-tube-white/60 text-xs">Kullanıcı Adı</Label>
                          <p className="text-tube-white font-medium">{selectedAccount.username}</p>
                        </div>
                        <div>
                          <Label className="text-tube-white/60 text-xs">İsim</Label>
                          <p className="text-tube-white">{selectedAccount.fullName}</p>
                        </div>
                        <div>
                          <Label className="text-tube-white/60 text-xs">Biyografi</Label>
                          <p className="text-tube-white">{selectedAccount.bio}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          selectedAccount.isPrivate ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : "bg-green-500/20 text-green-400 border-green-500/30"
                        )}>
                          {selectedAccount.isPrivate ? <Lock className="h-3 w-3 mr-1" /> : <Unlock className="h-3 w-3 mr-1" />}
                          {selectedAccount.isPrivate ? 'Gizli' : 'Görünür'}
                        </Badge>
                        {selectedAccount.isVerified && (
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                            <Check className="h-3 w-3 mr-1" /> Doğrulanmış
                          </Badge>
                        )}
                        <Button size="sm" variant="outline" className="border-tube-lightgray/30 text-xs ml-auto">
                          <RefreshCw className="h-3 w-3 mr-1" /> Bilgileri Güncelle
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-lg">Hesap Durumu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-lg bg-tube-gray/60">
                      <p className="text-2xl font-bold text-tube-white">{selectedAccount.posts}</p>
                      <p className="text-xs text-tube-white/60">Gönderi</p>
                    </div>
                    <div className="p-3 rounded-lg bg-tube-gray/60">
                      <p className="text-2xl font-bold text-pink-400">{formatNumber(selectedAccount.followers)}</p>
                      <p className="text-xs text-tube-white/60">Takipçi</p>
                    </div>
                    <div className="p-3 rounded-lg bg-tube-gray/60">
                      <p className="text-2xl font-bold text-tube-white">{selectedAccount.following}</p>
                      <p className="text-xs text-tube-white/60">Takip</p>
                    </div>
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 gap-2" size="sm">
                    <RefreshCw className="h-4 w-4" /> Bilgileri Güncelle
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Notification & Settings Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-sm flex items-center gap-2">
                    <Bell className="h-4 w-4 text-yellow-400" /> Bildirimleri Aktif Et
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: 'Takipçi Bildirimlerini Göster', state: showFollowerNotif, setState: setShowFollowerNotif },
                    { label: 'Beğeni Bildirimlerini Göster', state: showLikeNotif, setState: setShowLikeNotif },
                    { label: 'Yorum Bildirimlerini Göster', state: showCommentNotif, setState: setShowCommentNotif },
                    { label: 'Yeni Mesaj Bildirimlerini Göster', state: showDMNotif, setState: setShowDMNotif },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Checkbox checked={item.state} onCheckedChange={(v) => item.setState(!!v)} />
                      <span className="text-tube-white/80 text-sm">{item.label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* History */}
              <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-sm flex items-center gap-2">
                    <History className="h-4 w-4 text-blue-400" /> Geçmiş Durum ({historyData.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Select value={historyDate} onValueChange={setHistoryDate}>
                    <SelectTrigger className="bg-tube-gray/60 border-tube-lightgray/20">
                      <SelectValue placeholder="Tarih Seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                      {historyData.map((h, i) => (
                        <SelectItem key={i} value={h.date} className="text-tube-white">{h.date}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {historyDate && (() => {
                    const h = historyData.find(d => d.date === historyDate);
                    if (!h) return null;
                    return (
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded bg-tube-gray/60">
                          <p className="font-bold text-tube-white">{h.posts}</p>
                          <p className="text-xs text-tube-white/60">Gönderi</p>
                        </div>
                        <div className="p-2 rounded bg-tube-gray/60">
                          <p className="font-bold text-pink-400">{h.followers}</p>
                          <p className="text-xs text-tube-white/60">Takipçi</p>
                        </div>
                        <div className="p-2 rounded bg-tube-gray/60">
                          <p className="font-bold text-tube-white">{h.following}</p>
                          <p className="text-xs text-tube-white/60">Takip</p>
                        </div>
                      </div>
                    );
                  })()}
                  <Button variant="outline" size="sm" className="w-full border-tube-lightgray/30 text-xs gap-1">
                    <Trash2 className="h-3 w-3" /> Geçmişi Sil
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Follower Growth Chart */}
            <Card className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardHeader>
                <CardTitle className="text-tube-white text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" /> Takipçi Büyümesi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[260px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={followerGrowthData}>
                      <defs>
                        <linearGradient id="igFollowerGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ec4899" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#ec4899" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={{ stroke: '#333' }} />
                      <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={{ stroke: '#333' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '8px', color: '#F9FAFB' }} />
                      <Area type="monotone" dataKey="followers" stroke="#ec4899" strokeWidth={2} fill="url(#igFollowerGrad)" name="Takipçi" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ====== TAB: Takipçi İşlemleri ====== */}
          <TabsContent value="followers" className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tube-white/40" />
                <Input
                  value={followerSearch}
                  onChange={(e) => setFollowerSearch(e.target.value)}
                  placeholder="Kullanıcı ara..."
                  className="bg-tube-gray/50 border-tube-lightgray/20 pl-10"
                />
              </div>
              <Select value={followerFilter} onValueChange={setFollowerFilter}>
                <SelectTrigger className="w-[180px] bg-tube-gray/50 border-tube-lightgray/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                  <SelectItem value="all" className="text-tube-white">Tümü</SelectItem>
                  <SelectItem value="following" className="text-tube-white">Takip Ettiklerim</SelectItem>
                  <SelectItem value="not_following" className="text-tube-white">Takip Etmeyenler</SelectItem>
                  <SelectItem value="private" className="text-tube-white">Gizli Hesaplar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="border-tube-lightgray/20 bg-tube-gray/40 p-4 text-center">
                <UserPlus className="h-5 w-5 text-green-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-tube-white">+47</p>
                <p className="text-xs text-tube-white/60">Yeni Takipçi (7g)</p>
              </Card>
              <Card className="border-tube-lightgray/20 bg-tube-gray/40 p-4 text-center">
                <UserMinus className="h-5 w-5 text-red-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-tube-white">-12</p>
                <p className="text-xs text-tube-white/60">Kaybedilen (7g)</p>
              </Card>
              <Card className="border-tube-lightgray/20 bg-tube-gray/40 p-4 text-center">
                <UserCheck className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-tube-white">156</p>
                <p className="text-xs text-tube-white/60">Karşılıklı Takip</p>
              </Card>
              <Card className="border-tube-lightgray/20 bg-tube-gray/40 p-4 text-center">
                <UserX className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-tube-white">89</p>
                <p className="text-xs text-tube-white/60">Takip Etmeyen</p>
              </Card>
            </div>

            <Card className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardContent className="p-0">
                <div className="max-h-[400px] overflow-y-auto">
                  {filteredFollowers.map((follower) => (
                    <div key={follower.id} className="flex items-center gap-3 p-3 border-b border-tube-lightgray/10 hover:bg-tube-gray/60 transition-colors">
                      <Checkbox
                        checked={selectedFollowers.includes(follower.id)}
                        onCheckedChange={() => toggleFollowerSelection(follower.id)}
                      />
                      <img src={follower.profilePicture} alt="" className="h-9 w-9 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="text-tube-white text-sm font-medium truncate">{follower.username}</p>
                        <p className="text-tube-white/50 text-xs">{follower.fullName} • {formatNumber(follower.followers)} takipçi</p>
                      </div>
                      {follower.isPrivate && <Lock className="h-3 w-3 text-yellow-400" />}
                      <Badge variant="outline" className={cn("text-xs",
                        follower.isFollowing
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-tube-gray/60 text-tube-white/50 border-tube-lightgray/20"
                      )}>
                        {follower.isFollowing ? 'Takipte' : 'Takip Et'}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ====== TAB: Toplu İşlem Araçları ====== */}
          <TabsContent value="bulk" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" /> Toplu İşlem Araçları
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-tube-white/70 text-sm">İşlem Seçin</Label>
                    <Select value={bulkAction} onValueChange={setBulkAction}>
                      <SelectTrigger className="bg-tube-gray/60 border-tube-lightgray/20 mt-1">
                        <SelectValue placeholder="İşlem seçin..." />
                      </SelectTrigger>
                      <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                        <SelectItem value="follow" className="text-tube-white">Toplu Takip Et</SelectItem>
                        <SelectItem value="unfollow" className="text-tube-white">Toplu Takipten Çık</SelectItem>
                        <SelectItem value="block" className="text-tube-white">Toplu Engelle</SelectItem>
                        <SelectItem value="whitelist" className="text-tube-white">Beyaz Listeye Ekle</SelectItem>
                        <SelectItem value="message" className="text-tube-white">Toplu Mesaj Gönder</SelectItem>
                        <SelectItem value="like" className="text-tube-white">Toplu Beğen</SelectItem>
                        <SelectItem value="comment" className="text-tube-white">Toplu Yorum Yap</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-3 rounded-lg bg-tube-gray/60 text-center">
                    <p className="text-sm text-tube-white/70">Seçili Kullanıcı</p>
                    <p className="text-2xl font-bold text-pink-400">{selectedFollowers.length}</p>
                    <p className="text-xs text-tube-white/50 mt-1">Takipçi sekmesinden seçim yapabilirsiniz</p>
                  </div>

                  <Button className="w-full bg-pink-600 hover:bg-pink-700 gap-2" onClick={handleBulkAction}>
                    <Zap className="h-4 w-4" /> İşlemi Başlat
                  </Button>

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-yellow-300/80">
                      Toplu işlemler Instagram kurallarına uygun şekilde zaman aralığı ile gerçekleştirilir. Günlük limit aşılmayacaktır.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-400" /> Hedefleme Araçları
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-tube-white/70 text-sm">Hedef Hesap</Label>
                    <Input placeholder="@kullaniciadi" className="bg-tube-gray/60 border-tube-lightgray/20 mt-1" />
                  </div>
                  <div>
                    <Label className="text-tube-white/70 text-sm">Hedef Hashtag</Label>
                    <Input placeholder="#hashtag" className="bg-tube-gray/60 border-tube-lightgray/20 mt-1" />
                  </div>
                  <div>
                    <Label className="text-tube-white/70 text-sm">Konum</Label>
                    <Input placeholder="Şehir veya konum adı" className="bg-tube-gray/60 border-tube-lightgray/20 mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="border-tube-lightgray/30 gap-1 text-sm">
                      <Search className="h-3 w-3" /> Takipçilerini Bul
                    </Button>
                    <Button variant="outline" className="border-tube-lightgray/30 gap-1 text-sm">
                      <Heart className="h-3 w-3" /> Beğenenleri Bul
                    </Button>
                  </div>

                  <div>
                    <Label className="text-tube-white/70 text-sm">İşlem Hızı</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger className="bg-tube-gray/60 border-tube-lightgray/20 mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                        <SelectItem value="slow" className="text-tube-white">Yavaş (Güvenli)</SelectItem>
                        <SelectItem value="normal" className="text-tube-white">Normal</SelectItem>
                        <SelectItem value="fast" className="text-tube-white">Hızlı (Riskli)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Tasks */}
            <Card className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardHeader>
                <CardTitle className="text-tube-white text-sm">Aktif Görevler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-tube-gray/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-tube-white text-sm">Toplu Takip - @fashion_tr takipçileri</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Devam Ediyor</Badge>
                  </div>
                  <Progress value={67} className="h-2" />
                  <p className="text-xs text-tube-white/50 mt-1">134/200 tamamlandı • Kalan: ~22 dk</p>
                </div>
                <div className="p-3 rounded-lg bg-tube-gray/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-tube-white text-sm">Toplu Beğeni - #istanbul gönderileri</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Beklemede</Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                  <p className="text-xs text-tube-white/50 mt-1">Sırada • Tahmini: ~45 dk</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ====== TAB: Özel Mesaj İşlemleri ====== */}
          <TabsContent value="dm" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* DM List */}
              <Card className="border-tube-lightgray/20 bg-tube-gray/40 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tube-white/40" />
                    <Input
                      value={dmSearch}
                      onChange={(e) => setDmSearch(e.target.value)}
                      placeholder="Mesajlarda ara..."
                      className="bg-tube-gray/60 border-tube-lightgray/20 pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0 overflow-y-auto">
                  {mockDMs.filter(dm => dm.username.includes(dmSearch.toLowerCase())).map((dm) => (
                    <button
                      key={dm.id}
                      onClick={() => setSelectedDM(dm.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 text-left transition-colors border-b border-tube-lightgray/10",
                        selectedDM === dm.id ? "bg-pink-500/10" : "hover:bg-tube-gray/60"
                      )}
                    >
                      <div className="relative">
                        <img src={dm.profilePic} alt="" className="h-10 w-10 rounded-full" />
                        {dm.unread > 0 && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-pink-500 text-[10px] text-white flex items-center justify-center">
                            {dm.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-tube-white text-sm font-medium truncate">{dm.username}</p>
                        <p className="text-tube-white/50 text-xs truncate">{dm.lastMessage}</p>
                      </div>
                      <span className="text-tube-white/40 text-xs">{dm.time}</span>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* DM Chat Area */}
              <Card className="lg:col-span-2 border-tube-lightgray/20 bg-tube-gray/40 flex flex-col">
                {selectedDM ? (
                  <>
                    <CardHeader className="border-b border-tube-lightgray/10 pb-3">
                      <div className="flex items-center gap-3">
                        <img src={mockDMs.find(d => d.id === selectedDM)?.profilePic} alt="" className="h-8 w-8 rounded-full" />
                        <p className="text-tube-white font-medium">{mockDMs.find(d => d.id === selectedDM)?.username}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-3">
                        <div className="flex justify-start">
                          <div className="bg-tube-gray/60 rounded-lg p-3 max-w-[70%]">
                            <p className="text-tube-white text-sm">{mockDMs.find(d => d.id === selectedDM)?.lastMessage}</p>
                            <p className="text-tube-white/40 text-xs mt-1">{mockDMs.find(d => d.id === selectedDM)?.time}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <div className="p-3 border-t border-tube-lightgray/10">
                      <div className="flex gap-2">
                        <Input
                          value={dmMessage}
                          onChange={(e) => setDmMessage(e.target.value)}
                          placeholder="Mesajınızı yazın..."
                          className="bg-tube-gray/60 border-tube-lightgray/20"
                          onKeyDown={(e) => e.key === 'Enter' && handleSendDM()}
                        />
                        <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleSendDM}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageCircle className="h-12 w-12 text-tube-white/20 mx-auto mb-3" />
                      <p className="text-tube-white/50">Bir sohbet seçin</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* ====== TAB: Gönderi & Hikaye İşlemleri ====== */}
          <TabsContent value="posts" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create Post */}
              <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-lg flex items-center gap-2">
                    <Image className="h-5 w-5 text-pink-400" /> Gönderi Oluştur
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-tube-lightgray/20 rounded-lg p-6 text-center hover:border-pink-500/40 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-tube-white/30 mx-auto mb-2" />
                    <p className="text-tube-white/50 text-sm">Fotoğraf veya video seçin</p>
                  </div>
                  <Textarea
                    value={postCaption}
                    onChange={(e) => setPostCaption(e.target.value)}
                    placeholder="Açıklama yazın..."
                    className="bg-tube-gray/60 border-tube-lightgray/20 min-h-[100px] resize-none"
                  />
                  <Input
                    value={postHashtags}
                    onChange={(e) => setPostHashtags(e.target.value)}
                    placeholder="#hashtag1 #hashtag2 #hashtag3"
                    className="bg-tube-gray/60 border-tube-lightgray/20"
                  />
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-pink-600 hover:bg-pink-700 gap-2" onClick={handlePublishPost}>
                      <Send className="h-4 w-4" /> Paylaş
                    </Button>
                    <Button variant="outline" className="border-tube-lightgray/30 gap-2">
                      <Clock className="h-4 w-4" /> Planla
                    </Button>
                    <Button variant="outline" className="border-tube-lightgray/30 gap-2">
                      <FileText className="h-4 w-4" /> Taslak
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Story Creator */}
              <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-lg flex items-center gap-2">
                    <Play className="h-5 w-5 text-purple-400" /> Hikaye Oluştur
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-[9/16] max-h-[280px] border-2 border-dashed border-tube-lightgray/20 rounded-lg flex items-center justify-center hover:border-purple-500/40 transition-colors cursor-pointer">
                    <div className="text-center">
                      <Smartphone className="h-10 w-10 text-tube-white/20 mx-auto mb-2" />
                      <p className="text-tube-white/50 text-sm">Hikaye medyası ekleyin</p>
                      <p className="text-tube-white/30 text-xs mt-1">9:16 dikey format</p>
                    </div>
                  </div>
                  <Input
                    value={storyText}
                    onChange={(e) => setStoryText(e.target.value)}
                    placeholder="Hikaye metni (opsiyonel)"
                    className="bg-tube-gray/60 border-tube-lightgray/20"
                  />
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700 gap-2">
                      <Play className="h-4 w-4" /> Hikaye Paylaş
                    </Button>
                    <Button variant="outline" className="border-tube-lightgray/30 gap-2">
                      <Clock className="h-4 w-4" /> Planla
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Posts */}
            <Card className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardHeader>
                <CardTitle className="text-tube-white text-lg">Son Gönderiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockPosts.map((post) => (
                  <div key={post.id} className="flex items-center gap-3 p-3 rounded-lg bg-tube-gray/60 hover:bg-tube-gray/80 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-tube-gray/80 flex items-center justify-center text-lg">{post.thumbnail}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-tube-white text-sm font-medium truncate">{post.caption}</p>
                      <p className="text-tube-white/50 text-xs">{post.date} • {post.type}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-3 text-xs text-tube-white/60">
                      <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {formatNumber(post.likes)}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {post.comments}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="h-3 w-3" /></Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" /> Etkileşim Saatleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={engagementByHour}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="hour" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={{ stroke: '#333' }} />
                        <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={{ stroke: '#333' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '8px', color: '#F9FAFB' }} />
                        <Bar dataKey="engagement" fill="#ec4899" radius={[4, 4, 0, 0]} name="Etkileşim" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-purple-400" /> İçerik Türü Dağılımı
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={contentTypeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                          {contentTypeData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '8px', color: '#F9FAFB' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ====== TAB: Liste İşlemleri ====== */}
          <TabsContent value="lists" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                  <CardHeader>
                    <CardTitle className="text-tube-white text-lg flex items-center gap-2">
                      <List className="h-5 w-5 text-blue-400" /> Listelerim
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {lists.map((list) => (
                      <div key={list.id} className="flex items-center gap-3 p-3 rounded-lg bg-tube-gray/60 hover:bg-tube-gray/80 transition-colors cursor-pointer">
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: list.color + '30' }}>
                          <Bookmark className="h-4 w-4" style={{ color: list.color }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-tube-white font-medium text-sm">{list.name}</p>
                          <p className="text-tube-white/50 text-xs">{list.count} kullanıcı</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-3 w-3" /></Button>
                          <ChevronRight className="h-4 w-4 text-tube-white/30" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                  <CardHeader>
                    <CardTitle className="text-tube-white text-sm">Yeni Liste Oluştur</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="Liste adı..."
                      className="bg-tube-gray/60 border-tube-lightgray/20"
                    />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2" onClick={handleCreateList}>
                      <Plus className="h-4 w-4" /> Oluştur
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                  <CardHeader>
                    <CardTitle className="text-tube-white text-sm">Hızlı İşlemler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-tube-lightgray/20 text-sm gap-2">
                      <Download className="h-3 w-3" /> Takip Etmeyenleri Listele
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-tube-lightgray/20 text-sm gap-2">
                      <UserX className="h-3 w-3" /> Ghost Takipçileri Bul
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-tube-lightgray/20 text-sm gap-2">
                      <Star className="h-3 w-3" /> En Aktif Takipçiler
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-tube-lightgray/20 text-sm gap-2">
                      <Copy className="h-3 w-3" /> Listeyi Dışa Aktar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ====== TAB: Ayarlar & Yardım ====== */}
          <TabsContent value="settings" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5 text-tube-white/70" /> Özel Ayarlar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Araç Ayarları Bu Hesapta Özel Olsun', state: autoSave, setState: setAutoSave, info: true },
                    { label: 'Listelerde Kayıtlı Kalma Özelliğini Devre Dışı Bırak', state: keepInLists, setState: setKeepInLists },
                    { label: 'Değişken Üst Bilgi Kullan', state: useCustomHeader, setState: setUseCustomHeader, info: true },
                    { label: 'Sistem Bildirimlerini Göster', state: showNotifications, setState: setShowNotifications },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox checked={item.state} onCheckedChange={(v) => item.setState(!!v)} />
                        <span className="text-tube-white/80 text-sm">{item.label}</span>
                        {item.info && (
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px] px-1.5 py-0">Bilgi Al</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-tube-lightgray/20 bg-tube-gray/40">
                <CardHeader>
                  <CardTitle className="text-tube-white text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" /> Güvenlik
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-tube-white font-medium text-sm">Hesap Değiştir</p>
                      <p className="text-tube-white/50 text-xs">Farklı bir Instagram hesabına geçin</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-tube-lightgray/30 gap-2">
                      <RefreshCw className="h-3 w-3" /> Değiştir
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-tube-white font-medium text-sm">Yeni Hesap Ekle</p>
                      <p className="text-tube-white/50 text-xs">Başka bir hesap bağlayın</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-tube-lightgray/30 gap-2">
                      <UserPlus className="h-3 w-3" /> Ekle
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-tube-white font-medium text-sm">Verileri Yenile</p>
                      <p className="text-tube-white/50 text-xs">Tüm verileri yeniden çek</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-tube-lightgray/30 gap-2" onClick={() => toast({ title: 'Yenileniyor...', description: 'Veriler güncelleniyor.' })}>
                      <Database className="h-3 w-3" /> Yenile
                    </Button>
                  </div>
                  <div className="pt-3 border-t border-tube-lightgray/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-400 font-medium text-sm">Bağlantıyı Kes</p>
                        <p className="text-tube-white/50 text-xs">Bu hesabın bağlantısını kaldır</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => toast({ title: 'Bağlantı Kesildi', description: 'Instagram hesabı kaldırıldı.', variant: 'destructive' })}>
                        <X className="h-3 w-3 mr-1" /> Kes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* License Info */}
            <Card className="border-tube-lightgray/20 bg-tube-gray/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-tube-white/70 text-sm">Lisans Durumu: <span className="text-green-400 font-medium">Aktif</span></span>
                  </div>
                  <span className="text-tube-white/50 text-xs">Bitiş: 31.12.2025 23:59</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default InstagramManage;
