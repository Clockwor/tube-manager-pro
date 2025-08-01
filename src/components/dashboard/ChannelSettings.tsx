import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, Upload, Save, Shield, Bell, Globe, 
  Users, Lock, Eye, Camera, Palette, Link
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ChannelSettings = () => {
  const [channelData, setChannelData] = useState({
    name: 'Tech Tutorials',
    handle: '@techtutorials',
    description: 'En kaliteli teknoloji eğitimleri ve rehberleri burada! Her gün yeni içeriklerle karşınızdayız.',
    customUrl: 'youtube.com/c/techtutorials',
    category: 'education',
    country: 'TR',
    language: 'tr',
    keywords: 'teknoloji, eğitim, tutorial, programlama',
    avatar: '/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png',
    banner: '/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png'
  });

  const [privacySettings, setPrivacySettings] = useState({
    showSubscriberCount: true,
    allowComments: true,
    allowRatings: true,
    allowEmbedding: true,
    showInSearch: true,
    allowNotifications: true
  });

  const [monetizationSettings, setMonetizationSettings] = useState({
    monetizationEnabled: true,
    adPlacement: 'all',
    superChat: true,
    channelMembership: false,
    merchandise: false
  });

  const handleSaveChanges = () => {
    // Save functionality would go here
    console.log('Saving channel settings...', { channelData, privacySettings, monetizationSettings });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-tube-dark border-tube-lightgray/30">
        <CardHeader>
          <CardTitle className="text-tube-white text-xl flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Kanal Ayarları
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-tube-gray border-tube-lightgray/30">
          <TabsTrigger value="general" className="text-tube-white data-[state=active]:bg-tube-red">
            Genel
          </TabsTrigger>
          <TabsTrigger value="branding" className="text-tube-white data-[state=active]:bg-tube-red">
            Marka
          </TabsTrigger>
          <TabsTrigger value="privacy" className="text-tube-white data-[state=active]:bg-tube-red">
            Gizlilik
          </TabsTrigger>
          <TabsTrigger value="monetization" className="text-tube-white data-[state=active]:bg-tube-red">
            Monetizasyon
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-tube-white data-[state=active]:bg-tube-red">
            Bildirimler
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="bg-tube-dark border-tube-lightgray/30">
            <CardHeader>
              <CardTitle className="text-tube-white">Temel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="channelName" className="text-tube-white">Kanal Adı</Label>
                  <Input
                    id="channelName"
                    value={channelData.name}
                    onChange={(e) => setChannelData({ ...channelData, name: e.target.value })}
                    className="bg-tube-gray border-tube-lightgray/30 text-tube-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="handle" className="text-tube-white">Kullanıcı Adı</Label>
                  <Input
                    id="handle"
                    value={channelData.handle}
                    onChange={(e) => setChannelData({ ...channelData, handle: e.target.value })}
                    className="bg-tube-gray border-tube-lightgray/30 text-tube-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-tube-white">Kanal Açıklaması</Label>
                <Textarea
                  id="description"
                  value={channelData.description}
                  onChange={(e) => setChannelData({ ...channelData, description: e.target.value })}
                  className="bg-tube-gray border-tube-lightgray/30 text-tube-white min-h-[100px]"
                  placeholder="Kanalınızı tanımlayın..."
                />
                <p className="text-tube-white/60 text-sm">{channelData.description.length}/1000 karakter</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-tube-white">Kategori</Label>
                  <Select value={channelData.category} onValueChange={(value) => setChannelData({ ...channelData, category: value })}>
                    <SelectTrigger className="bg-tube-gray border-tube-lightgray/30 text-tube-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Eğitim</SelectItem>
                      <SelectItem value="entertainment">Eğlence</SelectItem>
                      <SelectItem value="gaming">Oyun</SelectItem>
                      <SelectItem value="music">Müzik</SelectItem>
                      <SelectItem value="technology">Teknoloji</SelectItem>
                      <SelectItem value="sports">Spor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-tube-white">Ülke</Label>
                  <Select value={channelData.country} onValueChange={(value) => setChannelData({ ...channelData, country: value })}>
                    <SelectTrigger className="bg-tube-gray border-tube-lightgray/30 text-tube-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TR">Türkiye</SelectItem>
                      <SelectItem value="US">Amerika</SelectItem>
                      <SelectItem value="DE">Almanya</SelectItem>
                      <SelectItem value="GB">İngiltere</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-tube-white">Dil</Label>
                  <Select value={channelData.language} onValueChange={(value) => setChannelData({ ...channelData, language: value })}>
                    <SelectTrigger className="bg-tube-gray border-tube-lightgray/30 text-tube-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="en">İngilizce</SelectItem>
                      <SelectItem value="de">Almanca</SelectItem>
                      <SelectItem value="fr">Fransızca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-tube-white">Anahtar Kelimeler</Label>
                <Input
                  id="keywords"
                  value={channelData.keywords}
                  onChange={(e) => setChannelData({ ...channelData, keywords: e.target.value })}
                  className="bg-tube-gray border-tube-lightgray/30 text-tube-white"
                  placeholder="virgülle ayırın"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Settings */}
        <TabsContent value="branding">
          <div className="space-y-6">
            <Card className="bg-tube-dark border-tube-lightgray/30">
              <CardHeader>
                <CardTitle className="text-tube-white flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Profil Resmi ve Banner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-tube-white">Profil Resmi</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20 border-2 border-tube-lightgray/30">
                        <AvatarImage src={channelData.avatar} />
                        <AvatarFallback className="bg-tube-gray text-tube-white">
                          {channelData.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" className="border-tube-lightgray/30 text-tube-white">
                          <Upload className="h-4 w-4 mr-2" />
                          Değiştir
                        </Button>
                        <p className="text-tube-white/60 text-sm">98x98 px minimum</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-tube-white">Kanal Banner</Label>
                    <div className="space-y-2">
                      <div className="w-full h-24 bg-tube-gray/40 border border-tube-lightgray/30 rounded-lg flex items-center justify-center">
                        <Camera className="h-8 w-8 text-tube-white/60" />
                      </div>
                      <Button variant="outline" className="border-tube-lightgray/30 text-tube-white">
                        <Upload className="h-4 w-4 mr-2" />
                        Banner Yükle
                      </Button>
                      <p className="text-tube-white/60 text-sm">2560x1440 px önerilen</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-tube-dark border-tube-lightgray/30">
              <CardHeader>
                <CardTitle className="text-tube-white flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Özel URL
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customUrl" className="text-tube-white">Özel URL</Label>
                  <Input
                    id="customUrl"
                    value={channelData.customUrl}
                    onChange={(e) => setChannelData({ ...channelData, customUrl: e.target.value })}
                    className="bg-tube-gray border-tube-lightgray/30 text-tube-white"
                  />
                  <p className="text-tube-white/60 text-sm">
                    Bu URL, kanalınıza erişim için kullanılacak özel adrestir.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card className="bg-tube-dark border-tube-lightgray/30">
            <CardHeader>
              <CardTitle className="text-tube-white flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Gizlilik ve Güvenlik
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Abone Sayısını Göster</h4>
                    <p className="text-tube-white/60 text-sm">Kanal sayfanızda abone sayınız görüntülensin</p>
                  </div>
                  <Switch
                    checked={privacySettings.showSubscriberCount}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showSubscriberCount: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Yorumlara İzin Ver</h4>
                    <p className="text-tube-white/60 text-sm">Videolarınızda yorum yapılabilsin</p>
                  </div>
                  <Switch
                    checked={privacySettings.allowComments}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, allowComments: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Beğeni/Beğenmeme</h4>
                    <p className="text-tube-white/60 text-sm">Videolarınızda puanlama sistemi aktif olsun</p>
                  </div>
                  <Switch
                    checked={privacySettings.allowRatings}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, allowRatings: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Gömme İzni</h4>
                    <p className="text-tube-white/60 text-sm">Videolarınız başka sitelerde gömülebilsin</p>
                  </div>
                  <Switch
                    checked={privacySettings.allowEmbedding}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, allowEmbedding: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Arama Sonuçlarında Göster</h4>
                    <p className="text-tube-white/60 text-sm">Kanalınız YouTube aramalarında görünsün</p>
                  </div>
                  <Switch
                    checked={privacySettings.showInSearch}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showInSearch: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monetization Settings */}
        <TabsContent value="monetization">
          <Card className="bg-tube-dark border-tube-lightgray/30">
            <CardHeader>
              <CardTitle className="text-tube-white">Monetizasyon Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Monetizasyon</h4>
                    <p className="text-tube-white/60 text-sm">Videolarınızda reklam geliri elde edin</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white">Aktif</Badge>
                    <Switch
                      checked={monetizationSettings.monetizationEnabled}
                      onCheckedChange={(checked) => setMonetizationSettings({ ...monetizationSettings, monetizationEnabled: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-tube-white">Reklam Yerleşimi</Label>
                  <Select value={monetizationSettings.adPlacement} onValueChange={(value) => setMonetizationSettings({ ...monetizationSettings, adPlacement: value })}>
                    <SelectTrigger className="bg-tube-gray border-tube-lightgray/30 text-tube-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Konumlar</SelectItem>
                      <SelectItem value="preroll">Video Öncesi</SelectItem>
                      <SelectItem value="midroll">Video Arası</SelectItem>
                      <SelectItem value="postroll">Video Sonrası</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Super Chat</h4>
                    <p className="text-tube-white/60 text-sm">Canlı yayınlarda Super Chat özelliği</p>
                  </div>
                  <Switch
                    checked={monetizationSettings.superChat}
                    onCheckedChange={(checked) => setMonetizationSettings({ ...monetizationSettings, superChat: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Kanal Üyeliği</h4>
                    <p className="text-tube-white/60 text-sm">Aylık üyelik sistemi aktif et</p>
                  </div>
                  <Switch
                    checked={monetizationSettings.channelMembership}
                    onCheckedChange={(checked) => setMonetizationSettings({ ...monetizationSettings, channelMembership: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card className="bg-tube-dark border-tube-lightgray/30">
            <CardHeader>
              <CardTitle className="text-tube-white flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Bildirim Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Yeni Yorum Bildirimleri</h4>
                    <p className="text-tube-white/60 text-sm">Videolarınıza yorum geldiğinde bildirim al</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Yeni Abone Bildirimleri</h4>
                    <p className="text-tube-white/60 text-sm">Yeni abone olunduğunda bildirim al</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Performans Raporları</h4>
                    <p className="text-tube-white/60 text-sm">Haftalık performans raporları gönder</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-tube-gray/40 rounded-lg">
                  <div>
                    <h4 className="text-tube-white font-medium">Güvenlik Bildirimleri</h4>
                    <p className="text-tube-white/60 text-sm">Şüpheli aktiviteler için bildirim al</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveChanges}
          className="bg-tube-red hover:bg-tube-darkred text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Değişiklikleri Kaydet
        </Button>
      </div>
    </div>
  );
};

export default ChannelSettings;