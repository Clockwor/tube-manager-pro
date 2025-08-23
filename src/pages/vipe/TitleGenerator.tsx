import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Type, Copy, Bookmark, RefreshCw, Zap, Target, TrendingUp } from 'lucide-react';
import { useTitleGeneration, useBookmarks } from '@/hooks/useVIPE';
import { TitleGeneration } from '@/types/vipe';
import { toast } from 'sonner';

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
  const [selectedTitle, setSelectedTitle] = useState<TitleGeneration | null>(null);
  
  const { generateTitles, isGenerating } = useTitleGeneration();
  const { addBookmark } = useBookmarks();

  const handleGenerateTitles = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    if (!selectedNiche) {
      toast.error('Please select a niche');
      return;
    }

    try {
      const newTitles = await generateTitles(topic, selectedNiche, 15);
      setTitles(newTitles);
    } catch (error) {
      console.error('Failed to generate titles:', error);
    }
  };

  const handleBookmarkTitle = (title: TitleGeneration) => {
    addBookmark({
      type: 'title',
      content: title,
      notes: `Topic: ${topic}, Niche: ${selectedNiche}`
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Title copied to clipboard!');
  };

  const getClickworthinessColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getClickworthinessBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/10 text-green-400 border-green-500/20';
    if (score >= 60) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    return 'bg-red-500/10 text-red-400 border-red-500/20';
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Type className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Title Generator</h1>
            <p className="text-muted-foreground">Create viral titles using proven successful formats</p>
          </div>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Title Configuration
            </CardTitle>
            <CardDescription>
              Enter your topic and select your niche to generate optimized viral titles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topic-input">Topic or Main Idea</Label>
                <Input
                  id="topic-input"
                  placeholder="e.g., Making money online, Gaming setup, Cooking tips"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="niche-select">Target Niche</Label>
                <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your niche" />
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
                  Generating Viral Titles...
                </>
              ) : (
                <>
                  <Type className="h-4 w-4 mr-2" />
                  Generate Viral Titles
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {titles.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Generated Titles</h2>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                {titles.length} Titles Generated
              </Badge>
            </div>

            <div className="space-y-3">
              {titles.map((title, index) => (
                <Card 
                  key={title.id} 
                  className="hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <Badge variant="outline" className={getClickworthinessBadgeColor(title.clickworthiness)}>
                            <Zap className="h-3 w-3 mr-1" />
                            {Math.round(title.clickworthiness)}%
                          </Badge>
                        </div>
                        
                        <h3 
                          className="text-lg font-semibold leading-tight cursor-pointer hover:text-primary transition-colors"
                          onClick={() => setSelectedTitle(title)}
                        >
                          {title.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Format: {title.format}</span>
                          <span>•</span>
                          <span>Audience: {title.targetAudience}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {title.emotionalTrigger.map((trigger) => (
                            <Badge key={trigger} variant="secondary" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => copyToClipboard(title.title)}
                          className="shrink-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleBookmarkTitle(title)}
                          className="shrink-0"
                        >
                          <Bookmark className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Summary */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Generation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-400">
                      {titles.filter(t => t.clickworthiness >= 80).length}
                    </div>
                    <div className="text-sm text-muted-foreground">High Click Rate</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round(titles.reduce((acc, t) => acc + t.clickworthiness, 0) / titles.length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Avg. Clickworthiness</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-purple-400">
                      {new Set(titles.map(t => t.format)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Unique Formats</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-orange-400">
                      {new Set(titles.flatMap(t => t.emotionalTrigger)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Emotional Triggers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Detailed View for Selected Title */}
        {selectedTitle && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{selectedTitle.title}</CardTitle>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getClickworthinessBadgeColor(selectedTitle.clickworthiness)}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Clickworthiness: {Math.round(selectedTitle.clickworthiness)}%
                    </Badge>
                    <Badge variant="outline">
                      {selectedTitle.targetAudience}
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedTitle(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Title Format</Label>
                  <p className="text-sm bg-muted/50 p-2 rounded mt-1">{selectedTitle.format}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Source Pattern</Label>
                  <p className="text-sm bg-muted/50 p-2 rounded mt-1">{selectedTitle.sourcePattern}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Emotional Triggers</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTitle.emotionalTrigger.map((trigger) => (
                    <Badge key={trigger} variant="secondary">
                      {trigger}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => copyToClipboard(selectedTitle.title)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Title
                </Button>
                <Button variant="outline" onClick={() => handleBookmarkTitle(selectedTitle)}>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save to Bookmarks
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default TitleGenerator;