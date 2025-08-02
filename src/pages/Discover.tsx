import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, Users, Eye, BookOpen, Video, Target, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import PageContainer from '@/components/PageContainer';

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

            <div className="grid gap-6">
              {outliers.map((video, index) => (
                <Card key={index} className="bg-tube-dark border-tube-lightgray/20">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-48 h-28 bg-tube-gray rounded-lg flex items-center justify-center">
                        <Video className="h-8 w-8 text-tube-white/50" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-tube-white">{video.title}</h3>
                          <p className="text-sm text-tube-white/70">{video.channel}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-tube-red">{video.views}</p>
                            <p className="text-xs text-tube-white/50">Views</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-tube-red">{video.vph}</p>
                            <p className="text-xs text-tube-white/50">VPH</p>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-tube-white/70">Performance</span>
                              <span className="text-sm font-medium text-tube-white">{video.performance}%</span>
                            </div>
                            <Progress value={video.performance} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
      </div>
    </PageContainer>
  );
};

export default Discover;