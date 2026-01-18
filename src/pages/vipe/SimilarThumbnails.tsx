import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Image, Upload, Eye, Download, Star, TrendingUp, Users, Play } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import BackToVIPE from '@/components/BackToVIPE';

interface Thumbnail {
  id: string;
  title: string;
  channelName: string;
  views: number;
  uploadDate: string;
  thumbnailUrl: string;
  similarity: number;
  category: string;
  duration: string;
}

const SimilarThumbnails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('keyword');
  const [similarityThreshold, setSimilarityThreshold] = useState('80');
  const [isSearching, setIsSearching] = useState(false);

  const [thumbnails] = useState<Thumbnail[]>([
    {
      id: '1',
      title: 'The Ultimate Tech Setup 2024',
      channelName: 'TechReviewer',
      views: 245000,
      uploadDate: '2024-01-15',
      thumbnailUrl: '/api/placeholder/320/180',
      similarity: 94,
      category: 'Technology',
      duration: '12:34',
    },
    {
      id: '2',
      title: 'My Dream Workspace Tour',
      channelName: 'CreativeSpace',
      views: 189000,
      uploadDate: '2024-01-18',
      thumbnailUrl: '/api/placeholder/320/180',
      similarity: 89,
      category: 'Lifestyle',
      duration: '8:45',
    },
    {
      id: '3',
      title: 'Productivity Setup That Changed My Life',
      channelName: 'ProductivityPro',
      views: 156000,
      uploadDate: '2024-01-22',
      thumbnailUrl: '/api/placeholder/320/180',
      similarity: 87,
      category: 'Education',
      duration: '15:20',
    },
    {
      id: '4',
      title: 'Clean Minimal Desk Setup',
      channelName: 'MinimalTech',
      views: 98000,
      uploadDate: '2024-01-25',
      thumbnailUrl: '/api/placeholder/320/180',
      similarity: 83,
      category: 'Technology',
      duration: '10:12',
    },
  ]);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K`;
    }
    return views.toString();
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 90) return 'bg-green-500';
    if (similarity >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Back Button */}
        <BackToVIPE />

        <div>
          <h1 className="text-3xl font-bold text-foreground">Similar Thumbnails</h1>
          <p className="text-muted-foreground">
            Find thumbnails similar to your content for inspiration and competitive analysis
          </p>
        </div>

        {/* Search Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search for Similar Thumbnails
            </CardTitle>
            <CardDescription>
              Upload an image or provide a keyword to find similar thumbnails
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="searchType">Search Method</Label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="keyword">Keyword Search</SelectItem>
                    <SelectItem value="upload">Upload Image</SelectItem>
                    <SelectItem value="url">Image URL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="similarity">Similarity Threshold</Label>
                <Select value={similarityThreshold} onValueChange={setSimilarityThreshold}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="95">95% - Very Similar</SelectItem>
                    <SelectItem value="85">85% - Similar</SelectItem>
                    <SelectItem value="75">75% - Somewhat Similar</SelectItem>
                    <SelectItem value="65">65% - Loosely Similar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {searchType === 'keyword' && (
              <div className="space-y-2">
                <Label htmlFor="keyword">Search Keywords</Label>
                <Input
                  id="keyword"
                  placeholder="Enter keywords to find similar thumbnails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            {searchType === 'upload' && (
              <div className="space-y-2">
                <Label>Upload Thumbnail</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Drop your thumbnail here or click to upload
                  </p>
                  <Button variant="outline">
                    Choose File
                  </Button>
                </div>
              </div>
            )}

            {searchType === 'url' && (
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="Paste image URL here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            <Button onClick={handleSearch} disabled={isSearching} className="w-full">
              {isSearching ? 'Searching...' : 'Find Similar Thumbnails'}
            </Button>
          </CardContent>
        </Card>

        {/* Results Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <Image className="h-8 w-8 text-primary mr-3" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Found</p>
                <p className="text-2xl font-bold">{thumbnails.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Similarity</p>
                <p className="text-2xl font-bold">
                  {Math.round(thumbnails.reduce((acc, t) => acc + t.similarity, 0) / thumbnails.length)}%
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Views</p>
                <p className="text-2xl font-bold">
                  {formatViews(Math.round(thumbnails.reduce((acc, t) => acc + t.views, 0) / thumbnails.length))}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Channels</p>
                <p className="text-2xl font-bold">
                  {new Set(thumbnails.map(t => t.channelName)).size}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {thumbnails.map((thumbnail) => (
            <Card key={thumbnail.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={thumbnail.thumbnailUrl}
                  alt={thumbnail.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {thumbnail.duration}
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className={`text-white ${getSimilarityColor(thumbnail.similarity)}`}>
                    {thumbnail.similarity}%
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-sm line-clamp-2 h-10">{thumbnail.title}</CardTitle>
                <CardDescription className="text-xs">{thumbnail.channelName}</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {formatViews(thumbnail.views)}
                  </span>
                  <span>{new Date(thumbnail.uploadDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {thumbnails.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Similar Thumbnails Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search parameters or similarity threshold
              </p>
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Try New Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default SimilarThumbnails;