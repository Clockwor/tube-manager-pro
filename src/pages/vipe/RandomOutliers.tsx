import { useState, useEffect } from "react";
import { Shuffle, Play, Eye, Clock, TrendingUp, Filter, RefreshCw, Bookmark, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";
import BackToVIPE from "@/components/BackToVIPE";
import { useOutliers } from "@/hooks/useVIPE";
import { VideoOutlier, SearchFilters } from "@/types/vipe";

const RandomOutliers = () => {
  const [outliers, setOutliers] = useState<VideoOutlier[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoOutlier | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  
  // Filters
  const [minViews, setMinViews] = useState([0]);
  const [minMultiplier, setMinMultiplier] = useState([1]);
  const [duration, setDuration] = useState<string>("all");
  const [count, setCount] = useState(20);
  
  const { getRandomOutliers } = useOutliers();

  const loadOutliers = async () => {
    setIsLoading(true);
    try {
      const filters: SearchFilters = {
        viewCountRange: minViews[0] > 0 ? { min: minViews[0] * 100000, max: 100000000 } : undefined,
        duration: duration !== "all" ? duration as "short" | "medium" | "long" : undefined,
      };
      
      let results = await getRandomOutliers(filters, count);
      
      // Client-side filter for multiplier
      if (minMultiplier[0] > 1) {
        results = results.filter(v => v.performanceMultiplier >= minMultiplier[0]);
      }
      
      setOutliers(results);
      toast.success(`${results.length} rastgele viral video bulundu!`);
    } catch (error) {
      toast.error("Videolar yüklenemedi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOutliers();
  }, []);

  const handleViewDetails = (video: VideoOutlier) => {
    setSelectedVideo(video);
    setShowDetails(true);
  };

  const handleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        toast.info("Yer işareti kaldırıldı");
      } else {
        newSet.add(id);
        toast.success("Yer işareti eklendi");
      }
      return newSet;
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return views.toString();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Bugün";
    if (diffDays === 1) return "Dün";
    if (diffDays < 7) return `${diffDays} gün önce`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`;
    return `${Math.floor(diffDays / 30)} ay önce`;
  };

  const getMultiplierColor = (multiplier: number) => {
    if (multiplier >= 10) return "text-green-400 bg-green-400/10";
    if (multiplier >= 5) return "text-yellow-400 bg-yellow-400/10";
    if (multiplier >= 2) return "text-orange-400 bg-orange-400/10";
    return "text-muted-foreground bg-muted";
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <BackToVIPE />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30">
            <Shuffle className="h-8 w-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Random Outliers</h1>
            <p className="text-muted-foreground">Rastgele viral videolar keşfedin</p>
          </div>
        </div>
        
        <Button onClick={loadOutliers} disabled={isLoading} className="gap-2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Yenile
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 backdrop-blur border-border">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-6 items-end">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Min. Görüntülenme: {minViews[0] > 0 ? `${minViews[0] * 100}K` : "Tümü"}
              </label>
              <Slider
                value={minViews}
                onValueChange={setMinViews}
                max={50}
                step={1}
                className="w-40"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Min. Çarpan: {minMultiplier[0]}x
              </label>
              <Slider
                value={minMultiplier}
                onValueChange={setMinMultiplier}
                min={1}
                max={20}
                step={1}
                className="w-40"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Süre</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="short">Kısa (&lt;4dk)</SelectItem>
                  <SelectItem value="medium">Orta (4-20dk)</SelectItem>
                  <SelectItem value="long">Uzun (&gt;20dk)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Sonuç Sayısı</label>
              <Select value={count.toString()} onValueChange={(v) => setCount(Number(v))}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={loadOutliers} disabled={isLoading} variant="secondary" className="gap-2">
              <Shuffle className="h-4 w-4" />
              Filtrele
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      {outliers.length > 0 && (
        <p className="text-muted-foreground">
          <span className="text-foreground font-semibold">{outliers.length}</span> viral video bulundu
        </p>
      )}

      {/* Loading State */}
      {isLoading && outliers.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="bg-card/50 animate-pulse">
              <div className="aspect-video bg-muted" />
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Results Grid */}
      {outliers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {outliers.map((video) => (
            <Card 
              key={video.id} 
              className="bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all cursor-pointer group overflow-hidden"
              onClick={() => handleViewDetails(video)}
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Play className="h-4 w-4" />
                    Detaylar
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className={`${getMultiplierColor(video.performanceMultiplier)}`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {video.performanceMultiplier.toFixed(1)}x
                  </Badge>
                </div>
                {bookmarkedIds.has(video.id) && (
                  <div className="absolute top-2 right-2">
                    <Bookmark className="h-5 w-5 text-primary fill-primary" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{video.channelName}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {formatViews(video.viewCount)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(video.publishedAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && outliers.length === 0 && (
        <Card className="bg-card/50 backdrop-blur border-border">
          <CardContent className="p-12 text-center">
            <Shuffle className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Video Bulunamadı</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Filtrelerinizi değiştirin veya yenile butonuna tıklayarak yeni videolar keşfedin.
            </p>
            <Button onClick={loadOutliers} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Yeniden Dene
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Detail Sheet */}
      <Sheet open={showDetails} onOpenChange={setShowDetails}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedVideo && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left">{selectedVideo.title}</SheetTitle>
                <SheetDescription className="text-left">
                  {selectedVideo.channelName}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">Görüntülenme</p>
                      <p className="text-2xl font-bold text-foreground">{formatViews(selectedVideo.viewCount)}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">Performans Çarpanı</p>
                      <p className={`text-2xl font-bold ${getMultiplierColor(selectedVideo.performanceMultiplier).split(' ')[0]}`}>
                        {selectedVideo.performanceMultiplier.toFixed(1)}x
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">VPH (Views/Hour)</p>
                      <p className="text-2xl font-bold text-foreground">{formatViews(selectedVideo.vph)}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">Outlier Skoru</p>
                      <p className="text-2xl font-bold text-foreground">{selectedVideo.outlierScore.toFixed(0)}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Video Bilgileri</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Süre</span>
                      <span className="text-foreground">{selectedVideo.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Yayınlanma</span>
                      <span className="text-foreground">{formatDate(selectedVideo.publishedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Kategori ID</span>
                      <span className="text-foreground">{selectedVideo.categoryId}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Etiketler</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 gap-2" asChild>
                    <a href={`https://youtube.com/watch?v=${selectedVideo.id}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      YouTube'da Aç
                    </a>
                  </Button>
                  <Button 
                    variant={bookmarkedIds.has(selectedVideo.id) ? "default" : "outline"}
                    onClick={() => handleBookmark(selectedVideo.id)}
                  >
                    <Bookmark className={`h-4 w-4 ${bookmarkedIds.has(selectedVideo.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default RandomOutliers;
