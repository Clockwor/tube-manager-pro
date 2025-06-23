
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, Upload, X, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SocialMediaPost, Platform, ContentType, PostStatus } from '@/types/socialMedia';

interface CreatePostFormProps {
  platforms: Platform[];
  onSubmit: (post: Omit<SocialMediaPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const contentTypes: { value: ContentType; label: string }[] = [
  { value: 'post', label: 'Normal Gönderi' },
  { value: 'story', label: 'Story' },
  { value: 'reel', label: 'Reel/Video' },
  { value: 'tweet', label: 'Tweet' },
  { value: 'video', label: 'Video' },
  { value: 'image', label: 'Resim' },
];

const CreatePostForm: React.FC<CreatePostFormProps> = ({ platforms, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    content: '',
    selectedPlatforms: [] as string[],
    contentType: 'post' as ContentType,
    scheduledDate: new Date(),
    scheduledTime: format(new Date(), 'HH:mm'),
    status: 'draft' as PostStatus,
    hashtags: '',
    mentions: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const handlePlatformChange = (platformId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedPlatforms: checked
        ? [...prev.selectedPlatforms, platformId]
        : prev.selectedPlatforms.filter(id => id !== platformId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPlatformObjects = platforms.filter(p => 
      formData.selectedPlatforms.includes(p.id)
    );

    const [hours, minutes] = formData.scheduledTime.split(':').map(Number);
    const scheduledDateTime = new Date(formData.scheduledDate);
    scheduledDateTime.setHours(hours, minutes);

    const post: Omit<SocialMediaPost, 'id' | 'createdAt' | 'updatedAt'> = {
      content: formData.content,
      platforms: selectedPlatformObjects,
      contentType: formData.contentType,
      scheduledDate: scheduledDateTime,
      status: formData.status,
      hashtags: formData.hashtags ? formData.hashtags.split(' ').filter(Boolean) : [],
      mentions: formData.mentions ? formData.mentions.split(' ').filter(Boolean) : [],
    };

    onSubmit(post);
  };

  const parseHashtagsAndMentions = (text: string) => {
    const hashtagRegex = /#[\w\u00C0-\u017F]+/g;
    const mentionRegex = /@[\w\u00C0-\u017F]+/g;
    
    const hashtags = text.match(hashtagRegex) || [];
    const mentions = text.match(mentionRegex) || [];
    
    return { hashtags, mentions };
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
    
    const { hashtags, mentions } = parseHashtagsAndMentions(content);
    setFormData(prev => ({
      ...prev,
      hashtags: hashtags.join(' '),
      mentions: mentions.join(' ')
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-tube-gray border-tube-lightgray/30 text-tube-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload size={20} />
            Yeni İçerik Oluştur
          </DialogTitle>
          <DialogDescription className="text-tube-white/70">
            Sosyal medya içeriğinizi oluşturun ve planlayın
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol Kolon - Form */}
            <div className="space-y-4">
              {/* İçerik */}
              <div className="space-y-2">
                <Label className="text-tube-white">İçerik</Label>
                <Textarea
                  placeholder="Ne paylaşmak istiyorsunuz? (#hashtag ve @mention kullanabilirsiniz)"
                  value={formData.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white min-h-[120px]"
                  required
                />
                <div className="text-xs text-tube-white/60">
                  {formData.content.length}/2200 karakter
                </div>
              </div>

              {/* Platform Seçimi */}
              <div className="space-y-2">
                <Label className="text-tube-white">Platformlar</Label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((platform) => (
                    <div key={platform.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={platform.id}
                        checked={formData.selectedPlatforms.includes(platform.id)}
                        onCheckedChange={(checked) => 
                          handlePlatformChange(platform.id, checked as boolean)
                        }
                        className="border-tube-lightgray/30"
                      />
                      <Label 
                        htmlFor={platform.id} 
                        className="text-tube-white cursor-pointer flex items-center gap-2"
                      >
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: platform.color }}
                        />
                        {platform.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* İçerik Türü */}
              <div className="space-y-2">
                <Label className="text-tube-white">İçerik Türü</Label>
                <Select 
                  value={formData.contentType} 
                  onValueChange={(value: ContentType) => 
                    setFormData(prev => ({ ...prev, contentType: value }))
                  }
                >
                  <SelectTrigger className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                    {contentTypes.map((type) => (
                      <SelectItem 
                        key={type.value} 
                        value={type.value} 
                        className="text-tube-white hover:bg-tube-lightgray/20"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tarih ve Saat */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-tube-white">Tarih</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "bg-tube-gray/40 border-tube-lightgray/30 text-tube-white justify-start text-left font-normal",
                          !formData.scheduledDate && "text-tube-white/50"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.scheduledDate, "dd MMM yyyy", { locale: tr })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-tube-gray border-tube-lightgray/30">
                      <Calendar
                        mode="single"
                        selected={formData.scheduledDate}
                        onSelect={(date) => date && setFormData(prev => ({ ...prev, scheduledDate: date }))}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-tube-white">Saat</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tube-white/50" size={16} />
                    <Input
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                      className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Durum */}
              <div className="space-y-2">
                <Label className="text-tube-white">Durum</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: PostStatus) => 
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                    <SelectItem value="draft" className="text-tube-white">Taslak</SelectItem>
                    <SelectItem value="scheduled" className="text-tube-white">Planlanmış</SelectItem>
                    <SelectItem value="published" className="text-tube-white">Yayınlandı</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sağ Kolon - Önizleme */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-tube-white">Önizleme</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-tube-white hover:bg-tube-gray/60"
                >
                  <Eye size={16} className="mr-1" />
                  {showPreview ? 'Gizle' : 'Göster'}
                </Button>
              </div>

              {showPreview && (
                <div className="bg-tube-gray/20 border border-tube-lightgray/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    {formData.selectedPlatforms.map(platformId => {
                      const platform = platforms.find(p => p.id === platformId);
                      return platform ? (
                        <div
                          key={platform.id}
                          className="px-2 py-1 rounded text-xs text-white"
                          style={{ backgroundColor: platform.color }}
                        >
                          {platform.name}
                        </div>
                      ) : null;
                    })}
                  </div>
                  
                  <div className="text-tube-white whitespace-pre-wrap">
                    {formData.content || 'İçerik önizlemesi burada görünecek...'}
                  </div>
                  
                  <div className="text-xs text-tube-white/60">
                    {format(formData.scheduledDate, "dd MMM yyyy", { locale: tr })} • {formData.scheduledTime}
                  </div>
                </div>
              )}

              {/* Hashtag ve Mention Önizleme */}
              {(formData.hashtags || formData.mentions) && (
                <div className="space-y-2">
                  {formData.hashtags && (
                    <div>
                      <Label className="text-tube-white text-xs">Hashtag'ler</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.hashtags.split(' ').filter(Boolean).map((tag, index) => (
                          <span key={index} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {formData.mentions && (
                    <div>
                      <Label className="text-tube-white text-xs">Mention'lar</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.mentions.split(' ').filter(Boolean).map((mention, index) => (
                          <span key={index} className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                            {mention}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Alt Butonlar */}
          <div className="flex justify-end gap-3 pt-4 border-t border-tube-lightgray/30">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/40"
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="bg-tube-red hover:bg-tube-darkred text-white"
              disabled={!formData.content || formData.selectedPlatforms.length === 0}
            >
              İçerik Oluştur
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostForm;
