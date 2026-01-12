import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Youtube, Link, CheckCircle2, X, Loader2 } from 'lucide-react';

interface AddChannelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChannelAdded?: (channel: NewChannelData) => void;
}

export interface NewChannelData {
  name: string;
  handle: string;
  description: string;
  country: string;
  language: string;
  tags: string[];
}

const countries = [
  { code: 'TR', name: 'Türkiye', flag: '🇹🇷' },
  { code: 'US', name: 'ABD', flag: '🇺🇸' },
  { code: 'GB', name: 'İngiltere', flag: '🇬🇧' },
  { code: 'DE', name: 'Almanya', flag: '🇩🇪' },
  { code: 'FR', name: 'Fransa', flag: '🇫🇷' },
  { code: 'CA', name: 'Kanada', flag: '🇨🇦' },
];

const languages = [
  { code: 'tr', name: 'Türkçe' },
  { code: 'en', name: 'İngilizce' },
  { code: 'de', name: 'Almanca' },
  { code: 'fr', name: 'Fransızca' },
];

const availableTags = [
  'gaming', 'tech', 'music', 'education', 'entertainment', 
  'sports', 'news', 'lifestyle', 'food', 'travel', 'comedy', 'vlog'
];

const getTagLabel = (tag: string): string => {
  const labels: Record<string, string> = {
    gaming: 'Oyun',
    tech: 'Teknoloji',
    music: 'Müzik',
    education: 'Eğitim',
    entertainment: 'Eğlence',
    sports: 'Spor',
    news: 'Haber',
    lifestyle: 'Yaşam Tarzı',
    food: 'Yemek',
    travel: 'Seyahat',
    comedy: 'Komedi',
    vlog: 'Vlog'
  };
  return labels[tag] || tag;
};

const AddChannelDialog: React.FC<AddChannelDialogProps> = ({
  open,
  onOpenChange,
  onChannelAdded,
}) => {
  const [step, setStep] = useState<'method' | 'manual' | 'url' | 'verifying' | 'success'>('method');
  const [channelUrl, setChannelUrl] = useState('');
  const [formData, setFormData] = useState<NewChannelData>({
    name: '',
    handle: '',
    description: '',
    country: 'TR',
    language: 'tr',
    tags: [],
  });

  const handleReset = () => {
    setStep('method');
    setChannelUrl('');
    setFormData({
      name: '',
      handle: '',
      description: '',
      country: 'TR',
      language: 'tr',
      tags: [],
    });
  };

  const handleClose = () => {
    handleReset();
    onOpenChange(false);
  };

  const handleUrlSubmit = () => {
    if (!channelUrl.trim()) {
      toast({
        title: 'Hata',
        description: 'Lütfen kanal URL\'si girin',
        variant: 'destructive',
      });
      return;
    }

    setStep('verifying');
    
    // Simulate API verification
    setTimeout(() => {
      // Extract channel name from URL (mock)
      const mockName = channelUrl.includes('@') 
        ? channelUrl.split('@')[1]?.split('/')[0] || 'Yeni Kanal'
        : 'Yeni Kanal';
      
      setFormData(prev => ({
        ...prev,
        name: mockName,
        handle: mockName.toLowerCase().replace(/\s/g, ''),
      }));
      setStep('success');
    }, 2000);
  };

  const handleManualSubmit = () => {
    if (!formData.name.trim() || !formData.handle.trim()) {
      toast({
        title: 'Hata',
        description: 'Kanal adı ve handle zorunludur',
        variant: 'destructive',
      });
      return;
    }

    setStep('verifying');
    
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const handleConfirmAdd = () => {
    onChannelAdded?.(formData);
    toast({
      title: 'Kanal Eklendi',
      description: `${formData.name} başarıyla eklendi`,
    });
    handleClose();
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        {step === 'method' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-foreground">
                <Youtube className="h-5 w-5 text-destructive" />
                Kanal Ekle
              </DialogTitle>
              <DialogDescription>
                Yeni bir YouTube kanalı eklemek için bir yöntem seçin
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:bg-accent"
                onClick={() => setStep('url')}
              >
                <Link className="h-6 w-6" />
                <span>URL ile Ekle</span>
                <span className="text-xs text-muted-foreground">YouTube kanal URL'sini yapıştırın</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:bg-accent"
                onClick={() => setStep('manual')}
              >
                <Youtube className="h-6 w-6" />
                <span>Manuel Ekle</span>
                <span className="text-xs text-muted-foreground">Kanal bilgilerini kendiniz girin</span>
              </Button>
            </div>
          </>
        )}

        {step === 'url' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-foreground">URL ile Kanal Ekle</DialogTitle>
              <DialogDescription>
                YouTube kanal URL'sini girin
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="channelUrl">Kanal URL'si</Label>
                <Input
                  id="channelUrl"
                  placeholder="https://youtube.com/@kanaladi"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setStep('method')}>
                Geri
              </Button>
              <Button onClick={handleUrlSubmit}>
                Doğrula
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'manual' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-foreground">Manuel Kanal Ekle</DialogTitle>
              <DialogDescription>
                Kanal bilgilerini doldurun
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Kanal Adı *</Label>
                  <Input
                    id="name"
                    placeholder="Tech Tutorials"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="handle">Handle *</Label>
                  <Input
                    id="handle"
                    placeholder="techtutorials"
                    value={formData.handle}
                    onChange={(e) => setFormData(prev => ({ ...prev, handle: e.target.value }))}
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  placeholder="Kanal hakkında kısa bir açıklama..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-background resize-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ülke</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Dil</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Etiketler</Label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={formData.tags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer transition-colors"
                      onClick={() => toggleTag(tag)}
                    >
                      {getTagLabel(tag)}
                      {formData.tags.includes(tag) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setStep('method')}>
                Geri
              </Button>
              <Button onClick={handleManualSubmit}>
                Kanal Ekle
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'verifying' && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Kanal doğrulanıyor...</p>
          </div>
        )}

        {step === 'success' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Kanal Hazır
              </DialogTitle>
              <DialogDescription>
                Kanal bilgileri doğrulandı, eklemek için onaylayın
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
                <div className="h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center">
                  <Youtube className="h-8 w-8 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{formData.name}</h3>
                  <p className="text-sm text-muted-foreground">@{formData.handle}</p>
                  {formData.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {formData.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {getTagLabel(tag)}
                        </Badge>
                      ))}
                      {formData.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{formData.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleReset}>
                İptal
              </Button>
              <Button onClick={handleConfirmAdd}>
                Onayla ve Ekle
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddChannelDialog;
