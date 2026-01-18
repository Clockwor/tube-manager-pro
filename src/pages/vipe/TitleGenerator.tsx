import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Type, RefreshCw, Target } from 'lucide-react';
import { useTitleGeneration, useBookmarks } from '@/hooks/useVIPE';
import { TitleGeneration } from '@/types/vipe';
import { toast } from 'sonner';
import { ContentCard } from '@/components/vipe/ContentCard';
import { EmptyState } from '@/components/vipe/EmptyState';
import { SkeletonCard } from '@/components/vipe/SkeletonCard';
import { BatchActions } from '@/components/vipe/BatchActions';
import BackToVIPE from '@/components/BackToVIPE';

const popularNiches = [
  'Tech & Gaming',
  'Lifestyle & Vlog',
  'Education & Tutorials',
  'Entertainment & Comedy',
  'Business & Finance',
  'Health & Fitness',
  'Travel & Adventure',
  'Food & Cooking',
  'Music & Art',
  'News & Politics'
];

const TitleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [titles, setTitles] = useState<TitleGeneration[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<Set<string>>(new Set());
  const [ratings, setRatings] = useState<Record<string, number>>({});
  
  const { generateTitles, isGenerating } = useTitleGeneration();
  const { addBookmark } = useBookmarks();

  const handleGenerateTitles = async () => {
    if (!topic.trim()) {
      toast.error('Lütfen bir konu girin');
      return;
    }

    if (!selectedNiche) {
      toast.error('Lütfen bir kategori seçin');
      return;
    }

    try {
      const newTitles = await generateTitles(topic, selectedNiche, 15);
      setTitles(newTitles);
      toast.success(`${newTitles.length} başlık oluşturuldu!`);
    } catch (error) {
      toast.error('Başlıklar oluşturulurken hata oluştu');
      console.error('Failed to generate titles:', error);
    }
  };

  const toggleSelect = (titleId: string) => {
    setSelectedTitles(prev => {
      const next = new Set(prev);
      if (next.has(titleId)) {
        next.delete(titleId);
      } else {
        next.add(titleId);
      }
      return next;
    });
  };

  const handleCopyAll = () => {
    const selected = titles.filter(t => selectedTitles.has(t.id));
    const text = selected.map(t => t.title).join('\n');
    navigator.clipboard.writeText(text);
    toast.success(`${selected.length} başlık kopyalandı!`);
  };

  const handleBookmarkAll = () => {
    const selected = titles.filter(t => selectedTitles.has(t.id));
    selected.forEach(title => {
      addBookmark({
        type: 'title',
        content: title,
        notes: `Topic: ${topic}, Niche: ${selectedNiche}`
      });
    });
    toast.success(`${selected.length} başlık kaydedildi!`);
    setSelectedTitles(new Set());
  };

  const handleExport = () => {
    const selected = titles.filter(t => selectedTitles.has(t.id));
    const data = JSON.stringify(selected, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vipe-titles-${Date.now()}.json`;
    a.click();
    toast.success('Dışa aktarıldı!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Başlık kopyalandı!');
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Back Button */}
        <BackToVIPE />

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-[hsl(var(--info-light))] border border-[hsl(var(--info))]">
            <Type className="h-6 w-6 text-[hsl(var(--info))]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Başlık Üretici</h1>
            <p className="text-muted-foreground">Kanıtlanmış başarılı formatları kullanarak viral başlıklar oluşturun</p>
          </div>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Başlık Yapılandırması
            </CardTitle>
            <CardDescription>
              Optimize edilmiş viral başlıklar üretmek için konunuzu girin ve kategorinizi seçin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topic-input">Konu veya Ana Fikir</Label>
                <Input
                  id="topic-input"
                  placeholder="örn: Para kazanmak, Oyun kurulumu, Yemek ipuçları"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerateTitles()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="niche-select">İçerik Kategorisi</Label>
                <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                  <SelectTrigger id="niche-select">
                    <SelectValue placeholder="Bir kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularNiches.map((niche) => (
                      <SelectItem key={niche} value={niche}>
                        {niche}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleGenerateTitles}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Başlıklar Üretiliyor...
                </>
              ) : (
                <>
                  <Type className="h-4 w-4 mr-2" />
                  Viral Başlıklar Üret
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {isGenerating ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : titles.length === 0 ? (
          <EmptyState
            icon={Type}
            title="Henüz Başlık Üretilmedi"
            description="Bir konu ve kategori girerek viral başlıklar oluşturmaya başlayın"
            actionLabel="Örnek Kullan"
            onAction={() => {
              setTopic('How to make money online');
              setSelectedNiche('Business & Finance');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {titles.map((title) => (
              <ContentCard
                key={title.id}
                title={title.title}
                score={title.clickworthiness}
                scoreLabel="Tıklanma"
                tags={title.emotionalTrigger}
                isSelected={selectedTitles.has(title.id)}
                rating={ratings[title.id] || 0}
                onClick={() => toggleSelect(title.id)}
                onCopy={() => copyToClipboard(title.title)}
                onBookmark={() => {
                  addBookmark({
                    type: 'title',
                    content: title,
                    notes: `Topic: ${topic}, Niche: ${selectedNiche}`
                  });
                  toast.success('Başlık kaydedildi!');
                }}
                onRate={(rating) => setRatings(prev => ({ ...prev, [title.id]: rating }))}
              >
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Format</p>
                    <p className="text-sm font-medium text-foreground">{title.format}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Hedef Kitle</p>
                    <p className="text-sm font-medium text-foreground">{title.targetAudience}</p>
                  </div>
                </div>
              </ContentCard>
            ))}
          </div>
        )}

        {/* Batch Actions */}
        <BatchActions
          selectedCount={selectedTitles.size}
          onCopyAll={handleCopyAll}
          onBookmarkAll={handleBookmarkAll}
          onExport={handleExport}
          onClear={() => setSelectedTitles(new Set())}
        />
      </div>
    </PageContainer>
  );
};

export default TitleGenerator;
