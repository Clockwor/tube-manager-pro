import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  Shuffle, 
  Eye, 
  Clock, 
  Users, 
  BarChart3, 
  Filter,
  RefreshCw,
  ExternalLink,
  Bookmark,
  Zap,
  PlayCircle
} from 'lucide-react';
import { useOutliers, useBookmarks } from '@/hooks/useVIPE';
import { VideoOutlier, ShortsOutlier, SearchFilters } from '@/types/vipe';
import { toast } from 'sonner';

const OutliersHub = () => {
  const [outliers, setOutliers] = useState<VideoOutlier[]>([]);
  const [shortsOutliers, setShortsOutliers] = useState<ShortsOutlier[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedVideo, setSelectedVideo] = useState<VideoOutlier | null>(null);

  const { getRandomOutliers, getShortsOutliers } = useOutliers();
  const { addBookmark } = useBookmarks();

  const loadRandomOutliers = async () => {
    setIsLoading(true);
    try {
      const results = await getRandomOutliers(filters, 30);
      setOutliers(results);
      toast.success(`Loaded ${results.length} viral outliers!`);
    } catch (error) {
      toast.error('Failed to load outliers');
    } finally {
      setIsLoading(false);
    }
  };

  const loadShortsOutliers = async () => {
    setIsLoading(true);
    try {
      const results = await getShortsOutliers(filters, 30);
      setShortsOutliers(results);
      toast.success(`Loaded ${results.length} viral Shorts!`);
    } catch (error) {
      toast.error('Failed to load Shorts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRandomOutliers();
    loadShortsOutliers();
  }, []);

  const handleBookmarkVideo = (video: VideoOutlier) => {
    addBookmark({
      type: 'video',
      content: video,
      notes: `Outlier Score: ${Math.round(video.outlierScore)}%`
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDuration = (duration: string) => {
    return duration;
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
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <TrendingUp className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Outliers Hub</h1>
            <p className="text-muted-foreground">Discover viral videos and unexpected performers across YouTube</p>
          </div>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Discovery Controls
            </CardTitle>
            <CardDescription>
              Fine-tune your outlier discovery with advanced filters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select value={filters.duration || ''} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, duration: value as any }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Any duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any duration</SelectItem>
                    <SelectItem value="short">Short (&lt; 4 min)</SelectItem>
                    <SelectItem value="medium">Medium (4-20 min)</SelectItem>
                    <SelectItem value="long">Long (&gt; 20 min)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                <label className="text-sm font-medium">Time Range</label>
                <Select onValueChange={(value) => {
                  const days = parseInt(value);
                  const endDate = new Date().toISOString();
                  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
                  setFilters(prev => ({ ...prev, publishDateRange: { start: startDate, end: endDate } }));
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">All time</SelectItem>
                    <SelectItem value="1">Last 24 hours</SelectItem>
                    <SelectItem value="7">Last week</SelectItem>
                    <SelectItem value="30">Last month</SelectItem>
                    <SelectItem value="90">Last 3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={loadRandomOutliers} 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Shuffle className="h-4 w-4 mr-2" />
                )}
                Discover New Outliers
              </Button>
              <Button 
                onClick={loadShortsOutliers} 
                disabled={isLoading}
                variant="outline"
                className="flex-1"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <PlayCircle className="h-4 w-4 mr-2" />
                )}
                Load Viral Shorts
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Video Outliers ({outliers.length})
            </TabsTrigger>
            <TabsTrigger value="shorts" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Shorts Outliers ({shortsOutliers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-4">
            {outliers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {outliers.map((video) => (
                  <Card 
                    key={video.id} 
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary/50"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(video.duration)}
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge className={getOutlierScoreColor(video.outlierScore)}>
                          🔥 {Math.round(video.outlierScore)}%
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
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://youtube.com/watch?v=${video.id}`, '_blank');
                          }}
                          className="flex-1"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Watch
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmarkVideo(video);
                          }}
                        >
                          <Bookmark className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="shorts" className="space-y-4">
            {shortsOutliers.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {shortsOutliers.map((short) => (
                  <Card 
                    key={short.id} 
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary/50"
                  >
                    <div className="relative">
                      <img
                        src={short.thumbnail}
                        alt={short.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-red-500/90 text-white text-xs">
                          SHORTS
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {short.duration}
                      </div>
                    </div>

                    <CardContent className="p-3 space-y-2">
                      <h4 className="text-sm font-medium line-clamp-2">
                        {short.title}
                      </h4>
                      
                      <div className="text-xs text-muted-foreground">
                        {short.channelName}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span>{formatViews(short.viewCount)}</span>
                        <Badge variant="outline" className={getOutlierScoreColor(short.outlierScore)}>
                          {Math.round(short.outlierScore)}%
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                        <div>Retention: {Math.round(short.shortsMetrics.retentionRate)}%</div>
                        <div>Loops: {Math.round(short.shortsMetrics.loopRate)}%</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Selected Video Detail */}
        {selectedVideo && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{selectedVideo.title}</CardTitle>
                  <div className="flex items-center gap-3">
                    <Badge className={getOutlierScoreColor(selectedVideo.outlierScore)}>
                      Outlier Score: {Math.round(selectedVideo.outlierScore)}%
                    </Badge>
                    <Badge variant="outline">
                      {selectedVideo.channelName}
                    </Badge>
                    <Badge variant="outline" className="text-green-400">
                      {selectedVideo.performanceMultiplier.toFixed(1)}x Performance
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedVideo(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <label className="text-muted-foreground">Views</label>
                  <p className="font-semibold">{formatViews(selectedVideo.viewCount)}</p>
                </div>
                <div>
                  <label className="text-muted-foreground">Duration</label>
                  <p className="font-semibold">{selectedVideo.duration}</p>
                </div>
                <div>
                  <label className="text-muted-foreground">Views/Hour</label>
                  <p className="font-semibold">{formatViews(selectedVideo.vph)}</p>
                </div>
                <div>
                  <label className="text-muted-foreground">Published</label>
                  <p className="font-semibold">{new Date(selectedVideo.publishedAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedVideo.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={() => window.open(`https://youtube.com/watch?v=${selectedVideo.id}`, '_blank')}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Watch on YouTube
                </Button>
                <Button variant="outline" onClick={() => handleBookmarkVideo(selectedVideo)}>
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

export default OutliersHub;