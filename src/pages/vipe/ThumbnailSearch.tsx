import { useState } from "react";
import { Search, Filter, Image, Eye, Download, Copy, Bookmark, Star, Grid3X3, List, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";
import BackToVIPE from "@/components/BackToVIPE";
import { useThumbnailSearch } from "@/hooks/useVIPE";
import { SearchFilters, ThumbnailAnalysis } from "@/types/vipe";

const ThumbnailSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<ThumbnailAnalysis[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedThumbnail, setSelectedThumbnail] = useState<ThumbnailAnalysis | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  
  // Filters
  const [minScore, setMinScore] = useState([0]);
  const [visualStyle, setVisualStyle] = useState("all");
  const [emotionalTone, setEmotionalTone] = useState("all");
  
  const { searchThumbnails, isSearching } = useThumbnailSearch();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Lütfen bir arama terimi girin");
      return;
    }
    
    try {
      const filters: SearchFilters = {
        outlierScoreRange: minScore[0] > 0 ? { min: minScore[0], max: 100 } : undefined,
      };
      
      const searchResults = await searchThumbnails(searchQuery, filters);
      // Filter results client-side for visual style and emotional tone
      const filteredResults = searchResults.filter(result => {
        if (visualStyle !== "all" && result.visualStyle !== visualStyle) return false;
        if (emotionalTone !== "all" && result.emotionalTone !== emotionalTone) return false;
        if (result.clickabilityScore < minScore[0]) return false;
        return true;
      });
      setResults(filteredResults);
      toast.success(`${filteredResults.length} thumbnail bulundu`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleViewDetails = (thumbnail: ThumbnailAnalysis) => {
    setSelectedThumbnail(thumbnail);
    setShowDetails(true);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL kopyalandı");
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

  const handleDownload = (url: string, id: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `thumbnail-${id}.jpg`;
    link.click();
    toast.success("İndirme başlatıldı");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getStyleBadgeVariant = (style: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      minimalist: "default",
      dramatic: "destructive",
      colorful: "secondary",
      professional: "outline",
    };
    return variants[style] || "default";
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <BackToVIPE />
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
          <Search className="h-8 w-8 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Thumbnail Search</h1>
          <p className="text-muted-foreground">Görsel öğelere ve içeriğe göre thumbnail arayın</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="bg-card/50 backdrop-blur border-border">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Thumbnail ara... (örn: 'gaming setup', 'reaction face', 'text overlay')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 bg-background/50"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching} className="gap-2">
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Ara
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Min. Skor: {minScore[0]}
              </label>
              <Slider
                value={minScore}
                onValueChange={setMinScore}
                max={100}
                step={5}
                className="w-32"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Görsel Stil</label>
              <Select value={visualStyle} onValueChange={setVisualStyle}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="dramatic">Dramatik</SelectItem>
                  <SelectItem value="colorful">Renkli</SelectItem>
                  <SelectItem value="professional">Profesyonel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Duygusal Ton</label>
              <Select value={emotionalTone} onValueChange={setEmotionalTone}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="curious">Merak</SelectItem>
                  <SelectItem value="excited">Heyecan</SelectItem>
                  <SelectItem value="serious">Ciddi</SelectItem>
                  <SelectItem value="funny">Komik</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      {results.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            <span className="text-foreground font-semibold">{results.length}</span> sonuç bulundu
          </p>
        </div>
      )}

      {/* Results Grid/List */}
      {results.length === 0 ? (
        <Card className="bg-card/50 backdrop-blur border-border">
          <CardContent className="p-12 text-center">
            <Image className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Thumbnail Aramaya Başlayın</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Yukarıdaki arama kutusuna görsel öğeler, stiller veya içerik türleri yazarak milyonlarca thumbnail arasından arama yapın.
            </p>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((thumbnail) => (
            <Card 
              key={thumbnail.id} 
              className="bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all cursor-pointer group overflow-hidden"
              onClick={() => handleViewDetails(thumbnail)}
            >
              <div className="relative aspect-video">
                <img
                  src={thumbnail.imageUrl}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); handleViewDetails(thumbnail); }}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); handleCopyUrl(thumbnail.imageUrl); }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant={bookmarkedIds.has(thumbnail.id) ? "default" : "secondary"}
                    onClick={(e) => { e.stopPropagation(); handleBookmark(thumbnail.id); }}
                  >
                    <Bookmark className={`h-4 w-4 ${bookmarkedIds.has(thumbnail.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className={`${getScoreColor(thumbnail.clickabilityScore)} bg-black/70`}>
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {thumbnail.clickabilityScore.toFixed(0)}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex flex-wrap gap-1">
                  <Badge variant={getStyleBadgeVariant(thumbnail.visualStyle)} className="text-xs">
                    {thumbnail.visualStyle}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {thumbnail.emotionalTone}
                  </Badge>
                  {thumbnail.faceCount > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {thumbnail.faceCount} yüz
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((thumbnail) => (
            <Card 
              key={thumbnail.id} 
              className="bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => handleViewDetails(thumbnail)}
            >
              <CardContent className="p-4 flex gap-4">
                <div className="relative w-48 aspect-video shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={thumbnail.imageUrl}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getStyleBadgeVariant(thumbnail.visualStyle)}>
                        {thumbnail.visualStyle}
                      </Badge>
                      <Badge variant="outline">{thumbnail.emotionalTone}</Badge>
                      {thumbnail.faceCount > 0 && (
                        <Badge variant="outline">{thumbnail.faceCount} yüz</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Renkler: {thumbnail.dominantColors.join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Metin öğeleri: {thumbnail.textElements.join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className={`flex items-center gap-1 ${getScoreColor(thumbnail.clickabilityScore)}`}>
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold">{thumbnail.clickabilityScore.toFixed(0)}</span>
                      <span className="text-muted-foreground text-sm">/ 100</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleCopyUrl(thumbnail.imageUrl); }}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDownload(thumbnail.imageUrl, thumbnail.id); }}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant={bookmarkedIds.has(thumbnail.id) ? "default" : "ghost"}
                        onClick={(e) => { e.stopPropagation(); handleBookmark(thumbnail.id); }}
                      >
                        <Bookmark className={`h-4 w-4 ${bookmarkedIds.has(thumbnail.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Sheet */}
      <Sheet open={showDetails} onOpenChange={setShowDetails}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedThumbnail && (
            <>
              <SheetHeader>
                <SheetTitle>Thumbnail Detayları</SheetTitle>
                <SheetDescription>
                  Görsel analiz ve performans metrikleri
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={selectedThumbnail.imageUrl}
                    alt="Thumbnail"
                    className="w-full aspect-video object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Tıklanabilirlik Skoru</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-3xl font-bold ${getScoreColor(selectedThumbnail.clickabilityScore)}`}>
                        {selectedThumbnail.clickabilityScore.toFixed(0)}
                        <span className="text-lg text-muted-foreground">/100</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Yüz Sayısı</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">
                        {selectedThumbnail.faceCount}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Görsel Stil</h4>
                  <Badge variant={getStyleBadgeVariant(selectedThumbnail.visualStyle)} className="text-sm">
                    {selectedThumbnail.visualStyle}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Duygusal Ton</h4>
                  <Badge variant="outline" className="text-sm">
                    {selectedThumbnail.emotionalTone}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Baskın Renkler</h4>
                  <div className="flex gap-2">
                    {selectedThumbnail.dominantColors.map((color, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded-full border border-border" 
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm text-muted-foreground">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Metin Öğeleri</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedThumbnail.textElements.map((text, i) => (
                      <Badge key={i} variant="secondary">{text}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 gap-2" onClick={() => handleCopyUrl(selectedThumbnail.imageUrl)}>
                    <Copy className="h-4 w-4" />
                    URL Kopyala
                  </Button>
                  <Button className="flex-1 gap-2" variant="secondary" onClick={() => handleDownload(selectedThumbnail.imageUrl, selectedThumbnail.id)}>
                    <Download className="h-4 w-4" />
                    İndir
                  </Button>
                  <Button 
                    variant={bookmarkedIds.has(selectedThumbnail.id) ? "default" : "outline"}
                    onClick={() => handleBookmark(selectedThumbnail.id)}
                  >
                    <Bookmark className={`h-4 w-4 ${bookmarkedIds.has(selectedThumbnail.id) ? "fill-current" : ""}`} />
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

export default ThumbnailSearch;
