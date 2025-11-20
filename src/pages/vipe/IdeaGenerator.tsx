import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lightbulb, RefreshCw, Target } from 'lucide-react';
import { useIdeaGeneration, useBookmarks } from '@/hooks/useVIPE';
import { IdeaGeneration } from '@/types/vipe';
import { toast } from 'sonner';
import { ContentCard } from '@/components/vipe/ContentCard';
import { EmptyState } from '@/components/vipe/EmptyState';
import { SkeletonCard } from '@/components/vipe/SkeletonCard';
import { BatchActions } from '@/components/vipe/BatchActions';

const IdeaGenerator = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [ideas, setIdeas] = useState<IdeaGeneration[]>([]);
  const [selectedIdeas, setSelectedIdeas] = useState<Set<string>>(new Set());
  const [ratings, setRatings] = useState<Record<string, number>>({});
  
  const { generateIdeas, isGenerating } = useIdeaGeneration();
  const { addBookmark } = useBookmarks();

  const handleGenerateIdeas = async () => {
    if (!inputUrl.trim()) {
      toast.error('Lütfen bir YouTube URL\'si girin');
      return;
    }

    try {
      const newIdeas = await generateIdeas(inputUrl, 10);
      setIdeas(newIdeas);
      toast.success(`${newIdeas.length} fikir oluşturuldu!`);
    } catch (error) {
      toast.error('Fikir oluşturulurken hata oluştu');
      console.error('Failed to generate ideas:', error);
    }
  };

  const toggleSelect = (ideaId: string) => {
    setSelectedIdeas(prev => {
      const next = new Set(prev);
      if (next.has(ideaId)) {
        next.delete(ideaId);
      } else {
        next.add(ideaId);
      }
      return next;
    });
  };

  const handleCopyAll = () => {
    const selected = ideas.filter(i => selectedIdeas.has(i.id));
    const text = selected.map(i => `${i.title}\n${i.description}`).join('\n\n');
    navigator.clipboard.writeText(text);
    toast.success(`${selected.length} fikir kopyalandı!`);
  };

  const handleBookmarkAll = () => {
    const selected = ideas.filter(i => selectedIdeas.has(i.id));
    selected.forEach(idea => {
      addBookmark({
        type: 'idea',
        content: idea,
        notes: `Generated from: ${inputUrl}`
      });
    });
    toast.success(`${selected.length} fikir kaydedildi!`);
    setSelectedIdeas(new Set());
  };

  const handleExport = () => {
    const selected = ideas.filter(i => selectedIdeas.has(i.id));
    const data = JSON.stringify(selected, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vipe-ideas-${Date.now()}.json`;
    a.click();
    toast.success('Dışa aktarıldı!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Panoya kopyalandı!');
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-[hsl(var(--success-light))] border border-[hsl(var(--success))]">
            <Lightbulb className="h-6 w-6 text-[hsl(var(--success))]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fikir Üretici</h1>
            <p className="text-muted-foreground">YouTube videosu veya kanalından viral içerik fikirleri üretin</p>
          </div>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Kaynak Girişi
            </CardTitle>
            <CardDescription>
              Analiz etmek ve ilham verici içerik fikirleri üretmek için YouTube video veya kanal URL'si girin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url-input">YouTube URL</Label>
              <Input
                id="url-input"
                placeholder="https://youtube.com/watch?v=... veya https://youtube.com/@kanaladi"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="font-mono text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleGenerateIdeas()}
              />
            </div>
            <Button 
              onClick={handleGenerateIdeas}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Fikirler Üretiliyor...
                </>
              ) : (
                <>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Viral Fikirler Üret
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {isGenerating ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : ideas.length === 0 ? (
          <EmptyState
            icon={Lightbulb}
            title="Henüz Fikir Üretilmedi"
            description="Bir YouTube URL'si girin ve viral içerik fikirleri oluşturmaya başlayın"
            actionLabel="Örnek URL Kullan"
            onAction={() => setInputUrl('https://youtube.com/watch?v=dQw4w9WgXcQ')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ideas.map((idea) => (
              <ContentCard
                key={idea.id}
                title={idea.title}
                description={idea.description}
                score={idea.confidenceScore}
                scoreLabel="Güven"
                tags={idea.suggestedTags}
                isSelected={selectedIdeas.has(idea.id)}
                rating={ratings[idea.id] || 0}
                onClick={() => toggleSelect(idea.id)}
                onCopy={() => copyToClipboard(`${idea.title}\n\n${idea.description}\n\nThumbnail: ${idea.thumbnailConcept}`)}
                onBookmark={() => {
                  addBookmark({
                    type: 'idea',
                    content: idea,
                    notes: `Generated from: ${inputUrl}`
                  });
                  toast.success('Fikir kaydedildi!');
                }}
                onRate={(rating) => setRatings(prev => ({ ...prev, [idea.id]: rating }))}
              >
                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Thumbnail Konsepti:</p>
                  <p className="text-sm text-foreground">{idea.thumbnailConcept}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Niche</p>
                    <p className="text-sm font-medium text-foreground">{idea.targetNiche}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Viral Potansiyel</p>
                    <p className="text-sm font-bold text-foreground">{idea.estimatedViralPotential}%</p>
                  </div>
                </div>
              </ContentCard>
            ))}
          </div>
        )}

        {/* Batch Actions */}
        <BatchActions
          selectedCount={selectedIdeas.size}
          onCopyAll={handleCopyAll}
          onBookmarkAll={handleBookmarkAll}
          onExport={handleExport}
          onClear={() => setSelectedIdeas(new Set())}
        />
      </div>
    </PageContainer>
  );
};

export default IdeaGenerator;
