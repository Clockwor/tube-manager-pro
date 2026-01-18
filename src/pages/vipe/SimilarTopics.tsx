import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Lightbulb, 
  TrendingUp, 
  Eye, 
  Clock, 
  ExternalLink,
  Bookmark,
  Filter,
  RefreshCw,
  Target,
  Layers
} from 'lucide-react';
import { useOutliers, useBookmarks } from '@/hooks/useVIPE';
import { VideoOutlier, SearchFilters } from '@/types/vipe';
import { toast } from 'sonner';
import BackToVIPE from '@/components/BackToVIPE';

const SimilarTopics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [idea, setIdea] = useState('');
  const [similarVideos, setSimilarVideos] = useState<VideoOutlier[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<'topic' | 'video' | 'idea'>('topic');
  const [filters, setFilters] = useState<SearchFilters>({});

  const { getRandomOutliers } = useOutliers();
  const { addBookmark } = useBookmarks();

  const searchSimilarTopics = async () => {
    if (!searchQuery && !videoUrl && !idea) {
      toast.error('Please provide a search query, video URL, or idea');
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call - in real implementation, this would analyze the input and find similar content
      const results = await getRandomOutliers({
        ...filters
      }, 50);
      
      setSimilarVideos(results);
      toast.success(`Found ${results.length} similar videos!`);
    } catch (error) {
      toast.error('Failed to find similar topics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmarkVideo = (video: VideoOutlier) => {
    addBookmark({
      type: 'video',
      content: video,
      notes: `Similar topic research - Score: ${Math.round(video.outlierScore)}%`
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const getOutlierScoreColor = (score: number) => {
    if (score >= 80) return 'bg-red-500/10 text-red-400 border-red-500/20';
    if (score >= 60) return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
  };

  const getMultiplierColor = (multiplier: number) => {
    if (multiplier >= 10) return 'text-red-400';
    if (multiplier >= 5) return 'text-orange-400';
    return 'text-yellow-400';
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Back Button */}
        <BackToVIPE />

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Layers className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Similar Topics</h1>
            <p className="text-muted-foreground">
              Discover thousands of videos covering similar topics to explore different presentation strategies
            </p>
          </div>
        </div>

        {/* Search Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Topic Research
            </CardTitle>
            <CardDescription>
              Find videos with similar topics using different search methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={searchType} onValueChange={(value) => setSearchType(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="topic" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Topic/Keyword
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Video URL
                </TabsTrigger>
                <TabsTrigger value="idea" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Content Idea
                </TabsTrigger>
              </TabsList>

              <TabsContent value="topic" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Topic or Keywords</label>
                  <Input
                    placeholder="e.g., 'AI productivity tools', 'morning routines', 'coding tutorials'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="video" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">YouTube Video URL</label>
                  <Input
                    placeholder="https://youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Find videos covering similar topics to the provided video
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="idea" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Idea Description</label>
                  <Textarea
                    placeholder="Describe your content idea in detail..."
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Find existing videos that cover similar ideas or concepts
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Advanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <label className="text-sm font-medium">Min Views</label>
                <Select onValueChange={(value) => 
                  setFilters(prev => ({ 
                    ...prev, 
                    viewCountRange: { 
                      min: parseInt(value), 
                      max: prev.viewCountRange?.max || 999999999 
                    } 
                  }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Any views" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any views</SelectItem>
                    <SelectItem value="1000">1K+ views</SelectItem>
                    <SelectItem value="10000">10K+ views</SelectItem>
                    <SelectItem value="100000">100K+ views</SelectItem>
                    <SelectItem value="1000000">1M+ views</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select value={filters.duration || 'any'} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, duration: value === 'any' ? undefined : value as any }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Any duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any duration</SelectItem>
                    <SelectItem value="short">Short (&lt; 4 min)</SelectItem>
                    <SelectItem value="medium">Medium (4-20 min)</SelectItem>
                    <SelectItem value="long">Long (&gt; 20 min)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Range</label>
                <Select onValueChange={(value) => {
                  const days = parseInt(value);
                  if (days === 0) {
                    setFilters(prev => ({ ...prev, publishDateRange: undefined }));
                  } else {
                    const endDate = new Date().toISOString();
                    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
                    setFilters(prev => ({ ...prev, publishDateRange: { start: startDate, end: endDate } }));
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">All time</SelectItem>
                    <SelectItem value="7">Last week</SelectItem>
                    <SelectItem value="30">Last month</SelectItem>
                    <SelectItem value="90">Last 3 months</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={searchSimilarTopics} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Find Similar Topics
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {similarVideos.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Similar Videos ({similarVideos.length})
              </CardTitle>
              <CardDescription>
                Videos covering similar topics with different presentation strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {similarVideos.map((video) => (
                  <Card 
                    key={video.id} 
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary/50"
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge className={getOutlierScoreColor(video.outlierScore)}>
                          🎯 {Math.round(video.outlierScore)}%
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-semibold line-clamp-2 leading-tight">
                        {video.title}
                      </h3>
                      
                      <div className="text-sm text-muted-foreground">
                        {video.channelName}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>{formatViews(video.viewCount)}</span>
                        </div>
                        <div className={`font-semibold ${getMultiplierColor(video.performanceMultiplier)}`}>
                          {video.performanceMultiplier.toFixed(1)}x
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{formatViews(video.vph)}/hr</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, '_blank')}
                          className="flex-1"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Watch
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleBookmarkVideo(video)}
                        >
                          <Bookmark className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {similarVideos.length === 0 && !isLoading && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Layers className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Results Yet</h3>
              <p className="text-muted-foreground mb-4">
                Enter a topic, video URL, or content idea to find similar videos
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default SimilarTopics;