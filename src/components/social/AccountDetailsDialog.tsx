import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { SocialAccount } from './types';
import { 
  Settings, 
  BarChart3, 
  Bell, 
  Shield, 
  Trash2, 
  ExternalLink,
  TrendingUp,
  Users,
  Eye,
  Heart,
  ChevronLeft,
  RefreshCw
} from 'lucide-react';

interface AccountDetailsDialogProps {
  platform: string;
  accounts: SocialAccount[];
  isOpen: boolean;
  onClose: () => void;
}

const AccountDetailsDialog: React.FC<AccountDetailsDialogProps> = ({
  platform,
  accounts,
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const [selectedAccount, setSelectedAccount] = useState<SocialAccount | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(true);
  const [autoPost, setAutoPost] = useState(false);

  const handleBack = () => {
    setSelectedAccount(null);
    setActiveTab('overview');
  };

  const handleRefresh = () => {
    toast({
      title: "Veriler Güncellendi",
      description: "Hesap verileri başarıyla yenilendi.",
    });
  };

  const handleDisconnect = (accountId: string) => {
    toast({
      title: "Hesap Bağlantısı Kesildi",
      description: "Hesap bağlantısı başarıyla kaldırıldı.",
      variant: "destructive",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Mock analytics data
  const mockAnalytics = {
    views: 125400,
    engagement: 8.7,
    growth: 12.5,
    avgLikes: 4200,
    avgComments: 342
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-tube-gray/95 backdrop-blur-md border-tube-lightgray/30 text-tube-white max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {selectedAccount && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack}
                className="mr-2 hover:bg-tube-lightgray/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            {selectedAccount ? selectedAccount.username : `${platform} Hesapları (${accounts.length})`}
          </DialogTitle>
        </DialogHeader>
        
        {!selectedAccount ? (
          // Account List View
          <div className="mt-4 space-y-4">
            {accounts.map((account) => (
              <Card 
                key={account.id} 
                className="bg-tube-gray/60 border-tube-lightgray/30 p-4 cursor-pointer hover:bg-tube-gray/80 transition-colors"
                onClick={() => setSelectedAccount(account)}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-purple-500">
                    <AvatarImage src={account.profilePicture} alt={account.username} />
                    <AvatarFallback className="bg-purple-700 text-white text-lg">
                      {account.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-tube-white">{account.username}</h3>
                    <div className="flex gap-4 mt-1 text-sm text-tube-white/70">
                      <span>{formatNumber(account.followers)} takipçi</span>
                      <span>{formatNumber(account.following)} takip</span>
                      <span>{account.posts} gönderi</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Aktif
                    </Badge>
                    <ExternalLink className="h-4 w-4 text-tube-white/60" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // Account Detail View
          <div className="mt-4">
            <div className="flex items-center gap-4 mb-6 p-4 bg-tube-gray/40 rounded-lg">
              <Avatar className="h-20 w-20 border-2 border-purple-500">
                <AvatarImage src={selectedAccount.profilePicture} alt={selectedAccount.username} />
                <AvatarFallback className="bg-purple-700 text-white text-xl">
                  {selectedAccount.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-tube-white">{selectedAccount.username}</h3>
                <p className="text-tube-white/70">{platform}</p>
              </div>

              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                className="border-tube-lightgray/30"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Yenile
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-tube-gray/40 mb-6 w-full grid grid-cols-3">
                <TabsTrigger value="overview">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Genel Bakış
                </TabsTrigger>
                <TabsTrigger value="analytics">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analitik
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Ayarlar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-tube-gray/40 border-tube-lightgray/30 p-4 text-center">
                    <Users className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                    <p className="text-2xl font-bold text-tube-white">{formatNumber(selectedAccount.followers)}</p>
                    <p className="text-sm text-tube-white/70">Takipçi</p>
                  </Card>
                  <Card className="bg-tube-gray/40 border-tube-lightgray/30 p-4 text-center">
                    <Eye className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                    <p className="text-2xl font-bold text-tube-white">{formatNumber(mockAnalytics.views)}</p>
                    <p className="text-sm text-tube-white/70">Görüntüleme</p>
                  </Card>
                  <Card className="bg-tube-gray/40 border-tube-lightgray/30 p-4 text-center">
                    <Heart className="h-6 w-6 mx-auto mb-2 text-red-400" />
                    <p className="text-2xl font-bold text-tube-white">{mockAnalytics.engagement}%</p>
                    <p className="text-sm text-tube-white/70">Etkileşim</p>
                  </Card>
                </div>

                <Card className="bg-tube-gray/40 border-tube-lightgray/30 p-4">
                  <h4 className="font-semibold text-tube-white mb-3">Son Performans</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-tube-white/70">Büyüme Oranı</span>
                      <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                        +{mockAnalytics.growth}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-tube-white/70">Ortalama Beğeni</span>
                      <span className="text-tube-white font-medium">{formatNumber(mockAnalytics.avgLikes)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-tube-white/70">Ortalama Yorum</span>
                      <span className="text-tube-white font-medium">{mockAnalytics.avgComments}</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card className="bg-tube-gray/40 border-tube-lightgray/30 p-6">
                  <h4 className="font-semibold text-tube-white mb-4">Haftalık Performans</h4>
                  <div className="h-48 flex items-end justify-between gap-2">
                    {[65, 78, 45, 92, 85, 70, 88].map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-purple-500/60 rounded-t"
                          style={{ height: `${value}%` }}
                        />
                        <span className="text-xs text-tube-white/60">
                          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-tube-gray/40 border-tube-lightgray/30 p-4">
                    <h4 className="font-semibold text-tube-white mb-2">En İyi Paylaşım Saati</h4>
                    <p className="text-2xl font-bold text-purple-400">18:00 - 20:00</p>
                    <p className="text-sm text-tube-white/60 mt-1">Takipçileriniz en aktif</p>
                  </Card>
                  <Card className="bg-tube-gray/40 border-tube-lightgray/30 p-4">
                    <h4 className="font-semibold text-tube-white mb-2">En İyi Gün</h4>
                    <p className="text-2xl font-bold text-purple-400">Perşembe</p>
                    <p className="text-sm text-tube-white/60 mt-1">%23 daha fazla etkileşim</p>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card className="bg-tube-gray/40 border-tube-lightgray/30 p-4">
                  <h4 className="font-semibold text-tube-white mb-4">Bildirimler</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-tube-white/70" />
                        <Label htmlFor="notifications" className="text-tube-white">
                          Bildirimler
                        </Label>
                      </div>
                      <Switch
                        id="notifications"
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-tube-white/70" />
                        <Label htmlFor="autopost" className="text-tube-white">
                          Otomatik Paylaşım
                        </Label>
                      </div>
                      <Switch
                        id="autopost"
                        checked={autoPost}
                        onCheckedChange={setAutoPost}
                      />
                    </div>
                  </div>
                </Card>

                <Card className="bg-tube-gray/40 border-tube-lightgray/30 p-4">
                  <h4 className="font-semibold text-tube-white mb-4">Güvenlik</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-tube-white/70">
                      <Shield className="h-4 w-4" />
                      <span>Bağlantı durumu: Güvenli</span>
                    </div>
                    <p className="text-sm text-tube-white/60">
                      Son yenileme: 2 saat önce
                    </p>
                  </div>
                </Card>

                <Card className="bg-red-500/10 border-red-500/30 p-4">
                  <h4 className="font-semibold text-red-400 mb-2">Tehlikeli Bölge</h4>
                  <p className="text-sm text-tube-white/70 mb-4">
                    Hesap bağlantısını kesmek, programlanmış tüm gönderileri iptal edecektir.
                  </p>
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDisconnect(selectedAccount.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Bağlantıyı Kes
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AccountDetailsDialog;
