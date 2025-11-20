import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lightbulb, RefreshCw, Target, Download } from 'lucide-react';
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
      toast.error('Please enter a YouTube URL');
      return;
    }

    try {
      const newIdeas = await generateIdeas(inputUrl, 10);
      setIdeas(newIdeas);
    } catch (error) {
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
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <Lightbulb className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Idea Generator</h1>
            <p className="text-muted-foreground">Generate viral content ideas from any YouTube video or channel</p>
          </div>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Input Source
            </CardTitle>
            <CardDescription>
              Enter a YouTube video URL or channel URL to analyze and generate inspired content ideas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url-input">YouTube URL</Label>
              <Input
                id="url-input"
                placeholder="https://youtube.com/watch?v=... or https://youtube.com/@channelname"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="font-mono text-sm"
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
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Generate Viral Ideas
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {ideas.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Generated Ideas</h2>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                {ideas.length} Ideas Generated
              </Badge>
            </div>

            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="detailed">Detailed View</TabsTrigger>
              </TabsList>

              <TabsContent value="grid" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ideas.map((idea) => (
                    <Card 
                      key={idea.id} 
                      className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary/50"
                      onClick={() => setSelectedIdea(idea)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg leading-tight">{idea.title}</CardTitle>
                          <div className="flex gap-1">
                            <Badge variant="outline" className={getConfidenceColor(idea.confidenceScore)}>
                              {Math.round(idea.confidenceScore)}%
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {idea.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Viral Potential:</span>
                          <span className={`font-semibold ${getViralPotentialColor(idea.estimatedViralPotential)}`}>
                            {Math.round(idea.estimatedViralPotential)}%
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {idea.suggestedTags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(idea.title);
                          }}>
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={(e) => {
                            e.stopPropagation();
                            handleBookmarkIdea(idea);
                          }}>
                            <Bookmark className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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
              </TabsContent>

              <TabsContent value="detailed" className="space-y-4">
                {ideas.map((idea) => (
                  <Card key={idea.id} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-xl">{idea.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline" className={getConfidenceColor(idea.confidenceScore)}>
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Confidence: {Math.round(idea.confidenceScore)}%
                            </Badge>
                            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                              <Zap className="h-3 w-3 mr-1" />
                              Viral: {Math.round(idea.estimatedViralPotential)}%
                            </Badge>
                            <Badge variant="outline">
                              {idea.targetNiche}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(idea.title)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleBookmarkIdea(idea)}>
                            <Bookmark className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{idea.description}</p>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Thumbnail Concept</Label>
                        <p className="text-sm bg-muted/50 p-3 rounded-lg">{idea.thumbnailConcept}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {idea.suggestedTags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <ExternalLink className="h-3 w-3" />
                        Inspired by: {idea.inspirationSource}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Detailed Modal for Selected Idea */}
        {selectedIdea && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{selectedIdea.title}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedIdea(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{selectedIdea.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label>Target Niche</Label>
                  <p className="font-medium">{selectedIdea.targetNiche}</p>
                </div>
                <div>
                  <Label>Confidence Score</Label>
                  <p className="font-medium">{Math.round(selectedIdea.confidenceScore)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default IdeaGenerator;