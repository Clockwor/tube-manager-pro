import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { 
  Plus, 
  CalendarIcon, 
  Image, 
  Video, 
  Hash, 
  Clock,
  Globe,
  Users,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Upload,
  X
} from 'lucide-react';

interface PostFormData {
  title: string;
  content: string;
  platforms: string[];
  postType: 'text' | 'image' | 'video' | 'carousel';
  scheduledDate?: Date;
  scheduledTime: string;
  hashtags: string[];
  mentions: string[];
  mediaFiles: File[];
}

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  availablePlatforms: string[];
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({
  isOpen,
  onClose,
  availablePlatforms
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    platforms: [],
    postType: 'text',
    scheduledTime: '12:00',
    hashtags: [],
    mentions: [],
    mediaFiles: []
  });
  const [hashtagInput, setHashtagInput] = useState('');
  const [mentionInput, setMentionInput] = useState('');

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const addHashtag = () => {
    if (hashtagInput.trim() && !formData.hashtags.includes(hashtagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, hashtagInput.trim()]
      }));
      setHashtagInput('');
    }
  };

  const addMention = () => {
    if (mentionInput.trim() && !formData.mentions.includes(mentionInput.trim())) {
      setFormData(prev => ({
        ...prev,
        mentions: [...prev.mentions, mentionInput.trim()]
      }));
      setMentionInput('');
    }
  };

  const removeHashtag = (hashtag: string) => {
    setFormData(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(h => h !== hashtag)
    }));
  };

  const removeMention = (mention: string) => {
    setFormData(prev => ({
      ...prev,
      mentions: prev.mentions.filter(m => m !== mention)
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setFormData(prev => ({
        ...prev,
        mediaFiles: [...prev.mediaFiles, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.content.trim() || formData.platforms.length === 0) {
      toast({
        title: "Hata",
        description: "İçerik ve en az bir platform seçimi gerekli",
        variant: "destructive"
      });
      return;
    }

    // Form verilerini işle
    console.log('Post data:', formData);
    
    toast({
      title: "Başarılı",
      description: formData.scheduledDate 
        ? "Gönderi programlandı" 
        : "Gönderi paylaşıldı",
    });

    // Formu sıfırla ve kapat
    setFormData({
      title: '',
      content: '',
      platforms: [],
      postType: 'text',
      scheduledTime: '12:00',
      hashtags: [],
      mentions: [],
      mediaFiles: []
    });
    onClose();
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      TikTok: '🎵',
      Instagram: '📷',
      Youtube: '📹',
      Facebook: '👥',
      X: '🐦',
      LinkedIn: '💼'
    };
    return icons[platform] || '📱';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-tube-gray/95 backdrop-blur-md border-tube-lightgray/30 text-tube-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Plus className="h-6 w-6" />
            Yeni Gönderi Oluştur
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="bg-tube-gray/40 mb-6">
            <TabsTrigger value="content">İçerik</TabsTrigger>
            <TabsTrigger value="media">Medya</TabsTrigger>
            <TabsTrigger value="scheduling">Programlama</TabsTrigger>
            <TabsTrigger value="optimization">Optimizasyon</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Başlık (Opsiyonel)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Gönderiniz için bir başlık yazın..."
                  className="bg-tube-gray/50 border-tube-lightgray/30"
                />
              </div>
              
              <div>
                <Label htmlFor="content">İçerik*</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Gönderinizin içeriğini yazın..."
                  className="bg-tube-gray/50 border-tube-lightgray/30 min-h-[120px] resize-none"
                  maxLength={2200}
                />
                <p className="text-xs text-tube-white/60 mt-1">
                  {formData.content.length}/2200 karakter
                </p>
              </div>

              <div>
                <Label>Platform Seçimi*</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {availablePlatforms.map(platform => (
                    <Card
                      key={platform}
                      className={cn(
                        "p-3 cursor-pointer transition-all border-2",
                        formData.platforms.includes(platform)
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-tube-lightgray/30 bg-tube-gray/30 hover:bg-tube-gray/50"
                      )}
                      onClick={() => handlePlatformToggle(platform)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getPlatformIcon(platform)}</span>
                        <div>
                          <p className="font-medium text-tube-white">{platform}</p>
                          <p className="text-xs text-tube-white/60">
                            {platform === 'TikTok' && 'Kısa videolar'}
                            {platform === 'Instagram' && 'Görsel odaklı'}
                            {platform === 'Youtube' && 'Video içerik'}
                            {platform === 'Facebook' && 'Topluluk'}
                            {platform === 'X' && 'Hızlı güncellemeler'}
                            {platform === 'LinkedIn' && 'Profesyonel'}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="space-y-6">
            <div>
              <Label>Gönderi Türü</Label>
              <Select 
                value={formData.postType} 
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, postType: value }))}
              >
                <SelectTrigger className="bg-tube-gray/50 border-tube-lightgray/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                  <SelectItem value="text">📝 Metin</SelectItem>
                  <SelectItem value="image">🖼️ Görsel</SelectItem>
                  <SelectItem value="video">🎥 Video</SelectItem>
                  <SelectItem value="carousel">🎠 Galeri</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.postType === 'image' || formData.postType === 'video' || formData.postType === 'carousel') && (
              <div>
                <Label>Medya Dosyaları</Label>
                <div className="mt-2 space-y-4">
                  <div className="border-2 border-dashed border-tube-lightgray/30 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-tube-white/50 mx-auto mb-4" />
                    <p className="text-tube-white/70 mb-4">
                      Dosyaları sürükleyip bırakın veya seçin
                    </p>
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <Button asChild>
                        <span>Dosya Seç</span>
                      </Button>
                      <input
                        id="media-upload"
                        type="file"
                        multiple
                        accept={formData.postType === 'video' ? 'video/*' : 'image/*'}
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                    </label>
                  </div>
                  
                  {formData.mediaFiles.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.mediaFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="bg-tube-gray/60 rounded-lg p-3">
                            <p className="text-sm font-medium text-tube-white truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-tube-white/60">
                              {(file.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="scheduling" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Yayın Zamanı</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    variant={!formData.scheduledDate ? "default" : "outline"}
                    onClick={() => setFormData(prev => ({ ...prev, scheduledDate: undefined }))}
                    className="flex-1"
                  >
                    Şimdi Paylaş
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={formData.scheduledDate ? "default" : "outline"}
                        className="flex-1"
                      >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Programla
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-tube-gray border-tube-lightgray/30" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.scheduledDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, scheduledDate: date }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {formData.scheduledDate && (
                  <div className="mt-4">
                    <Label>Saat</Label>
                    <Input
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                      className="bg-tube-gray/50 border-tube-lightgray/30 w-full"
                    />
                    <div className="mt-2 p-3 bg-blue-500/20 rounded-lg">
                      <p className="text-blue-300 text-sm">
                        📅 Gönderi {format(formData.scheduledDate, 'dd MMMM yyyy')} tarihinde saat {formData.scheduledTime}'de yayınlanacak
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="optimization" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Hashtag'ler</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    placeholder="hashtag yazın..."
                    onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                    className="bg-tube-gray/50 border-tube-lightgray/30"
                  />
                  <Button onClick={addHashtag} size="sm">
                    <Hash className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.hashtags.map(hashtag => (
                    <Badge
                      key={hashtag}
                      variant="outline"
                      className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                    >
                      #{hashtag}
                      <button
                        onClick={() => removeHashtag(hashtag)}
                        className="ml-1 hover:text-red-400"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Bahsetmeler (@)</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={mentionInput}
                    onChange={(e) => setMentionInput(e.target.value)}
                    placeholder="kullanıcı adı yazın..."
                    onKeyPress={(e) => e.key === 'Enter' && addMention()}
                    className="bg-tube-gray/50 border-tube-lightgray/30"
                  />
                  <Button onClick={addMention} size="sm">
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.mentions.map(mention => (
                    <Badge
                      key={mention}
                      variant="outline"
                      className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                    >
                      @{mention}
                      <button
                        onClick={() => removeMention(mention)}
                        className="ml-1 hover:text-red-400"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between pt-6 border-t border-tube-lightgray/30">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-tube-lightgray/30"
          >
            İptal
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {formData.scheduledDate ? 'Programla' : 'Paylaş'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;