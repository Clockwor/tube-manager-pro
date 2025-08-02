import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, Users, Eye, BookOpen, Video, Target, Star, Play, ExternalLink, Lightbulb, Image, UserPlus, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PageContainer from '@/components/PageContainer';

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const outliers = [
    {
      title: "10 Magic Tricks With Hands Only | Revealed",
      channel: "Magic Secrets",
      views: "2.1M",
      vph: "1.6K",
      thumbnail: "/placeholder.svg",
      performance: 95
    },
    {
      title: "Dynamo Best Performed Magic Tricks",
      channel: "Magic World",
      views: "1.8M", 
      vph: "1.2K",
      thumbnail: "/placeholder.svg",
      performance: 88
    },
    {
      title: "Science Experiments That Look Like Magic",
      channel: "Science Fun",
      views: "950K",
      vph: "850",
      thumbnail: "/placeholder.svg",
      performance: 78
    }
  ];

  const trendingKeywords = [
    { keyword: "AI automation", searches: "125K", competition: "Medium", trend: "+45%" },
    { keyword: "YouTube shorts", searches: "98K", competition: "High", trend: "+38%" },
    { keyword: "content creation", searches: "87K", competition: "Medium", trend: "+25%" },
    { keyword: "video editing", searches: "76K", competition: "High", trend: "+15%" },
    { keyword: "viral videos", searches: "65K", competition: "High", trend: "+55%" }
  ];

  const competitors = [
    {
      name: "TechReview Pro",
      subscribers: "2.4M",
      avgViews: "145K",
      uploadFreq: "3x/week",
      topVideo: "Best Phones 2024",
      similarity: 85
    },
    {
      name: "Gadget Guru",
      subscribers: "1.8M", 
      avgViews: "98K",
      uploadFreq: "2x/week",
      topVideo: "iPhone vs Android",
      similarity: 78
    },
    {
      name: "Tech Talk Daily",
      subscribers: "1.2M",
      avgViews: "76K", 
      uploadFreq: "Daily",
      topVideo: "Future of Tech",
      similarity: 72
    }
  ];

  const learningContent = [
    {
      title: "YouTube Algorithm Mastery",
      type: "Course",
      duration: "4 hours",
      level: "Intermediate",
      rating: 4.8,
      students: "12.5K"
    },
    {
      title: "Thumbnail Design Secrets",
      type: "Workshop", 
      duration: "2 hours",
      level: "Beginner",
      rating: 4.9,
      students: "8.2K"
    },
    {
      title: "SEO for YouTube Creators",
      type: "Masterclass",
      duration: "3 hours", 
      level: "Advanced",
      rating: 4.7,
      students: "15.3K"
    }
  ];

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-tube-white">Discover</h1>
            <p className="text-tube-white/70 mt-2">Find winning ideas to inspire your next video</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-tube-red text-tube-red hover:bg-tube-red hover:text-white">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </Button>
            <Button variant="outline" className="border-tube-red text-tube-red hover:bg-tube-red hover:text-white">
              <Target className="h-4 w-4 mr-2" />
              Shorts
            </Button>
            <Button variant="outline" className="border-tube-red text-tube-red hover:bg-tube-red hover:text-white">
              <Eye className="h-4 w-4 mr-2" />
              Thumbnails
            </Button>
          </div>
        </div>

        <Tabs defaultValue="outliers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-tube-dark border border-tube-lightgray/20">
            <TabsTrigger value="outliers" className="data-[state=active]:bg-tube-red data-[state=active]:text-white">
              <Star className="h-4 w-4 mr-2" />
              Outliers
            </TabsTrigger>
            <TabsTrigger value="keywords" className="data-[state=active]:bg-tube-red data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Keywords
            </TabsTrigger>
            <TabsTrigger value="competitors" className="data-[state=active]:bg-tube-red data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Competitors
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="data-[state=active]:bg-tube-red data-[state=active]:text-white">
              <Eye className="h-4 w-4 mr-2" />
              Subscribers
            </TabsTrigger>
            <TabsTrigger value="learn" className="data-[state=active]:bg-tube-red data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Learn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="outliers" className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-tube-white/50" />
                <Input
                  placeholder="Search for trending videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-tube-dark border-tube-lightgray/20 text-tube-white"
                />
              </div>
              <Button className="bg-tube-red hover:bg-tube-darkred text-white">
                Find Outliers
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outliers.map((video, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedVideo(video);
                    setIsVideoModalOpen(true);
                  }}
                >
                  <div className="relative bg-tube-dark rounded-lg overflow-hidden border border-tube-lightgray/20 hover:border-tube-red/50 transition-all duration-300">
                    {/* Performance Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-gradient-to-r from-green-500 to-green-400 text-white text-xs font-bold px-2 py-1 rounded">
                        &gt;{video.performance}x
                      </div>
                    </div>
                    
                    {/* VPH Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-tube-darkest/80 backdrop-blur-sm text-tube-white text-xs font-medium px-2 py-1 rounded">
                        {video.vph} VPH
                      </div>
                    </div>

                    {/* Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-tube-gray to-tube-lightgray relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="h-12 w-12 text-tube-white/30" />
                      </div>
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-tube-red/90 rounded-full p-3">
                          <Video className="h-6 w-6 text-white fill-current" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-tube-white font-semibold text-sm line-clamp-2 mb-2 leading-tight">
                        {video.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-xs text-tube-white/60">
                        <span>{video.channel}</span>
                        <span>{video.views} views</span>
                      </div>

                      {/* Performance Bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-tube-white/50">Performance</span>
                          <span className="text-xs text-green-400 font-medium">{video.performance}%</span>
                        </div>
                        <div className="w-full bg-tube-gray/30 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-400 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${video.performance}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-6">
            <Card className="bg-tube-dark border-tube-lightgray/20">
              <CardHeader>
                <CardTitle className="text-tube-white">Trending Keywords for Your Channel</CardTitle>
                <CardDescription className="text-tube-white/70">
                  Discover trending topics that can boost your channel's visibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingKeywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-tube-gray/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-tube-white">{keyword.keyword}</h4>
                        <p className="text-sm text-tube-white/70">{keyword.searches} monthly searches</p>
                      </div>
                      <div className="text-center">
                        <Badge variant={keyword.competition === 'High' ? 'destructive' : 'secondary'}>
                          {keyword.competition}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-bold text-green-400">{keyword.trend}</span>
                        <p className="text-xs text-tube-white/50">Trend</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-6">
            <Card className="bg-tube-dark border-tube-lightgray/20">
              <CardHeader>
                <CardTitle className="text-tube-white">Your Competitors</CardTitle>
                <CardDescription className="text-tube-white/70">
                  Analyze channels similar to yours and learn from their strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitors.map((competitor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-tube-gray/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-tube-white">{competitor.name}</h4>
                        <p className="text-sm text-tube-white/70">Top Video: {competitor.topVideo}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <p className="text-lg font-bold text-tube-red">{competitor.subscribers}</p>
                          <p className="text-xs text-tube-white/50">Subscribers</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-tube-red">{competitor.avgViews}</p>
                          <p className="text-xs text-tube-white/50">Avg Views</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-tube-red">{competitor.uploadFreq}</p>
                          <p className="text-xs text-tube-white/50">Upload Freq</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-400">{competitor.similarity}%</p>
                        <p className="text-xs text-tube-white/50">Similarity</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-tube-dark border-tube-lightgray/20">
                <CardHeader>
                  <CardTitle className="text-tube-white">Subscriber Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-tube-red">+2.5K</p>
                    <p className="text-sm text-tube-white/70">This month</p>
                    <Progress value={75} className="mt-4" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-tube-dark border-tube-lightgray/20">
                <CardHeader>
                  <CardTitle className="text-tube-white">Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-tube-white/70">18-24</span>
                      <span className="text-tube-white">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-tube-white/70">25-34</span>
                      <span className="text-tube-white">40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-tube-white/70">35-44</span>
                      <span className="text-tube-white">25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-tube-dark border-tube-lightgray/20">
                <CardHeader>
                  <CardTitle className="text-tube-white">Top Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-tube-white/70">United States</span>
                      <span className="text-tube-white">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-tube-white/70">United Kingdom</span>
                      <span className="text-tube-white">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-tube-white/70">Canada</span>
                      <span className="text-tube-white">15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learn" className="space-y-6">
            <Card className="bg-tube-dark border-tube-lightgray/20">
              <CardHeader>
                <CardTitle className="text-tube-white">Develop Your Skills</CardTitle>
                <CardDescription className="text-tube-white/70">
                  Take your YouTube channel to the next level with expert courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {learningContent.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-tube-gray/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-tube-white">{course.title}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">{course.type}</Badge>
                          <span className="text-sm text-tube-white/70">{course.duration}</span>
                          <span className="text-sm text-tube-white/70">{course.level}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-tube-white">{course.rating}</span>
                        </div>
                        <p className="text-xs text-tube-white/50">{course.students} students</p>
                      </div>
                      <Button className="bg-tube-red hover:bg-tube-darkred text-white ml-4">
                        Enroll
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Video Details Modal */}
        <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
          <DialogContent className="max-w-4xl bg-tube-dark border-tube-lightgray/20 text-tube-white">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="text-xl font-bold">Video Details</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVideoModalOpen(false)}
                className="text-tube-white/70 hover:text-tube-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            
            {selectedVideo && (
              <div className="space-y-6">
                {/* Main Video Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Video Thumbnail */}
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-tube-gray to-tube-lightgray rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-tube-red/90 rounded-full p-4">
                          <Play className="h-8 w-8 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Stats */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-tube-gray/30 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Star className="h-5 w-5 text-green-400 mr-2" />
                        </div>
                        <div className="text-2xl font-bold text-green-400">&gt;{selectedVideo.performance}x</div>
                        <div className="text-sm text-tube-white/60">Outlier Score</div>
                      </div>
                      
                      <div className="bg-tube-gray/30 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Eye className="h-5 w-5 text-tube-red mr-2" />
                        </div>
                        <div className="text-2xl font-bold text-tube-white">{selectedVideo.views}</div>
                        <div className="text-sm text-tube-white/60">Views</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-tube-gray/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-tube-white">{selectedVideo.vph}</div>
                        <div className="text-sm text-tube-white/60">Views Per Hour</div>
                      </div>
                      
                      <div className="bg-tube-gray/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400">Bad</div>
                        <div className="text-sm text-tube-white/60">Engagement</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-tube-white">{selectedVideo.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-tube-white/70">
                    <span>13,722,302 views • 4 years ago</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-tube-red rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">OM</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-tube-white">{selectedVideo.channel}</div>
                        <div className="text-xs text-tube-white/60">1.5M subs • 158,608 avg views</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-tube-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Button variant="outline" className="justify-start border-tube-lightgray/20 text-tube-white hover:bg-tube-gray/30">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in YouTube
                    </Button>
                    
                    <Button variant="outline" className="justify-start border-tube-lightgray/20 text-tube-white hover:bg-tube-gray/30">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Remix title
                    </Button>
                    
                    <Button variant="outline" className="justify-start border-tube-lightgray/20 text-tube-white hover:bg-tube-gray/30">
                      <Image className="h-4 w-4 mr-2" />
                      Remix thumbnail
                    </Button>
                    
                    <Button variant="outline" className="justify-start border-tube-lightgray/20 text-tube-white hover:bg-tube-gray/30">
                      <Search className="h-4 w-4 mr-2" />
                      Find similar titles
                    </Button>
                    
                    <Button variant="outline" className="justify-start border-tube-lightgray/20 text-tube-white hover:bg-tube-gray/30">
                      <Image className="h-4 w-4 mr-2" />
                      Find similar thumbnails
                    </Button>
                    
                    <Button variant="outline" className="justify-start border-tube-lightgray/20 text-tube-white hover:bg-tube-gray/30">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add as competitor
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default Discover;