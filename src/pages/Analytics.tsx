import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/StatCard';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart3, TrendingUp, Users, Play, PieChartIcon, Eye, ThumbsUp, 
  Clock, Bell, MessageSquare, Share2, Calendar, Search
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const demoChannelData = {
  id: "UCKkjiu9xc7NSne7xxWkAezQ",
  name: "Demo Channel",
  avatar: "https://i.pravatar.cc/150?img=33",
  stats: {
    subscribers: 845200,
    totalViews: 75600000,
    videosCount: 423,
    joined: "2015-06-12",
    avgViewsPerVideo: 178720,
    engagementRate: 8.2,
  },
  growth: {
    subscribers: { value: 12500, percentage: 3.2 },
    views: { value: 1420000, percentage: 5.7 },
    engagement: { value: 0.6, percentage: 2.1 },
  },
  viewsHistory: [
    { name: "Jan", views: 2400000 },
    { name: "Feb", views: 1980000 },
    { name: "Mar", views: 3200000 },
    { name: "Apr", views: 2780000 },
    { name: "May", views: 4890000 },
    { name: "Jun", views: 3390000 },
    { name: "Jul", views: 4490000 },
  ],
  topVideos: [
    { title: "How to Grow on YouTube in 2023", views: 1250000, likes: 87500, comments: 5420, date: "2023-05-15" },
    { title: "Content Creator Setup Tour", views: 980000, likes: 65200, comments: 3150, date: "2023-07-02" },
    { title: "Ultimate Video Editing Tutorial", views: 876000, likes: 52000, comments: 4200, date: "2023-08-18" },
    { title: "YouTube Algorithm Explained", views: 792000, likes: 48700, comments: 3870, date: "2023-09-05" },
    { title: "Viral Video Case Study", views: 685000, likes: 41200, comments: 2950, date: "2023-10-12" },
  ],
  audienceData: [
    { name: "18-24", value: 32 },
    { name: "25-34", value: 45 },
    { name: "35-44", value: 15 },
    { name: "45-54", value: 6 },
    { name: "55+", value: 2 },
  ],
  geographicData: [
    { name: "United States", value: 35 },
    { name: "United Kingdom", value: 12 },
    { name: "Canada", value: 8 },
    { name: "Australia", value: 7 },
    { name: "Germany", value: 5 },
    { name: "Other", value: 33 },
  ]
};

const config = {
  views: {
    label: "Views",
    theme: {
      light: "#0EA5E9",
      dark: "#0EA5E9"
    }
  },
  subscribers: {
    label: "Subscribers",
    theme: {
      light: "#8B5CF6",
      dark: "#8B5CF6"
    }
  },
  likes: {
    label: "Likes",
    theme: {
      light: "#F97316",
      dark: "#F97316"
    }
  }
};

function formatNumber(number: number): string {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
}

const Analytics = () => {
  const [searchUrl, setSearchUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [channelData, setChannelData] = useState(demoChannelData);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSearch = () => {
    setIsLoading(true);
    // In a real app, this would be an API call to fetch channel data
    setTimeout(() => {
      setIsLoading(false);
      // For now, we'll just use our demo data
      setChannelData(demoChannelData);
    }, 1500);
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-tube-white mb-2">Kanal Analizi</h1>
        <p className="text-tube-white/70 mb-6">YouTube kanallarının detaylı analizlerini görüntüleyin</p>
        
        <div className="glass-panel rounded-xl p-6 card-shadow mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="YouTube kanal URL'sini yapıştırın"
              value={searchUrl}
              onChange={(e) => setSearchUrl(e.target.value)}
              className="flex-1 bg-tube-dark border-tube-lightgray/20 text-tube-white"
            />
            <Button 
              onClick={handleSearch} 
              className="bg-tube-red hover:bg-tube-darkred text-white"
              disabled={isLoading}
            >
              {isLoading ? "Yükleniyor..." : "Analiz Et"}
              <Search className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {channelData && (
          <>
            <div className="glass-panel rounded-xl p-6 card-shadow mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-24 w-24 border-2 border-tube-lightgray/20">
                  <AvatarImage src={channelData.avatar} alt={channelData.name} />
                  <AvatarFallback className="bg-tube-red text-white text-xl">
                    {channelData.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-tube-white">{channelData.name}</h2>
                    <Badge className="bg-tube-red text-white w-fit">YouTube</Badge>
                  </div>
                  
                  <p className="text-tube-white/70 mb-3">
                    Kanal ID: {channelData.id}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <Users className="text-tube-white/70 mr-2 h-4 w-4" />
                      <span className="text-tube-white font-medium">{formatNumber(channelData.stats.subscribers)} abone</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Eye className="text-tube-white/70 mr-2 h-4 w-4" />
                      <span className="text-tube-white font-medium">{formatNumber(channelData.stats.totalViews)} görüntülenme</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Play className="text-tube-white/70 mr-2 h-4 w-4" />
                      <span className="text-tube-white font-medium">{channelData.stats.videosCount} video</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="text-tube-white/70 mr-2 h-4 w-4" />
                      <span className="text-tube-white font-medium">Katılım: {new Date(channelData.stats.joined).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="glass-panel rounded-xl card-shadow grid grid-cols-3 md:grid-cols-5 w-full">
                <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                <TabsTrigger value="growth">Büyüme</TabsTrigger>
                <TabsTrigger value="audience">Kitle</TabsTrigger>
                <TabsTrigger value="videos">Videolar</TabsTrigger>
                <TabsTrigger value="engagement">Etkileşim</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <StatCard
                    title="Toplam Abone"
                    value={formatNumber(channelData.stats.subscribers)}
                    change={{
                      value: 3.2,
                      type: 'increase'
                    }}
                    icon={<Users size={20} />}
                  />
                  
                  <StatCard
                    title="Toplam Görüntülenme"
                    value={formatNumber(channelData.stats.totalViews)}
                    change={{
                      value: 5.7,
                      type: 'increase'
                    }}
                    icon={<Eye size={20} />}
                  />
                  
                  <StatCard
                    title="Etkileşim Oranı"
                    value={`%${channelData.stats.engagementRate}`}
                    change={{
                      value: 2.1,
                      type: 'increase'
                    }}
                    icon={<TrendingUp size={20} />}
                  />
                </div>
                
                <div className="glass-panel rounded-xl p-6 card-shadow mb-8">
                  <h3 className="text-xl font-bold text-tube-white mb-4">Görüntülenme Trendi</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={channelData.viewsHistory}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis 
                          stroke="#9CA3AF"
                          tickFormatter={(value) => formatNumber(value)}
                        />
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            borderColor: '#374151',
                            borderRadius: '6px',
                            color: '#F9FAFB'
                          }}
                          formatter={(value: number) => [formatNumber(value), 'Görüntülenme']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="views" 
                          stroke="#0EA5E9" 
                          fillOpacity={1} 
                          fill="url(#colorViews)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-tube-white mb-4">En Çok İzlenen Videolar</h3>
                  <div className="glass-panel rounded-xl p-4 card-shadow overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Video Başlığı</TableHead>
                          <TableHead className="text-right">Görüntülenme</TableHead>
                          <TableHead className="text-right">Beğeni</TableHead>
                          <TableHead className="text-right">Yorumlar</TableHead>
                          <TableHead className="text-right">Tarih</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {channelData.topVideos.map((video, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-tube-white">{video.title}</TableCell>
                            <TableCell className="text-right">{formatNumber(video.views)}</TableCell>
                            <TableCell className="text-right">{formatNumber(video.likes)}</TableCell>
                            <TableCell className="text-right">{formatNumber(video.comments)}</TableCell>
                            <TableCell className="text-right">{new Date(video.date).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="audience" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-panel rounded-xl p-6 card-shadow">
                    <h3 className="text-xl font-bold text-tube-white mb-4">Yaş Dağılımı</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={channelData.audienceData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {channelData.audienceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#8B5CF6', '#0EA5E9', '#F97316', '#10B981', '#EC4899'][index % 5]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              borderColor: '#374151',
                              borderRadius: '6px',
                              color: '#F9FAFB'
                            }}
                            formatter={(value: number) => [`${value}%`, 'İzleyici']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="glass-panel rounded-xl p-6 card-shadow">
                    <h3 className="text-xl font-bold text-tube-white mb-4">Coğrafi Dağılım</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          layout="vertical" 
                          data={channelData.geographicData}
                          margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                        >
                          <XAxis type="number" stroke="#9CA3AF" />
                          <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <Tooltip
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              borderColor: '#374151',
                              borderRadius: '6px',
                              color: '#F9FAFB'
                            }}
                            formatter={(value: number) => [`${value}%`, 'İzleyici']}
                          />
                          <Bar dataKey="value" fill="#0EA5E9" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="growth" className="mt-6">
                <Alert className="mb-6 bg-tube-dark border-tube-red/50">
                  <AlertTitle className="text-tube-white">Büyüme Raporu</AlertTitle>
                  <AlertDescription className="text-tube-white/70">
                    Son 30 günde kanalınızın toplam abone sayısı %{channelData.growth.subscribers.percentage} artmıştır ve {formatNumber(channelData.growth.subscribers.value)} yeni abone kazanmıştır.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-tube-dark border-tube-lightgray/20">
                    <CardHeader>
                      <CardTitle className="text-tube-white">Abone Artışı</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end gap-2">
                        <div className="text-3xl font-bold text-tube-white">+{formatNumber(channelData.growth.subscribers.value)}</div>
                        <div className="text-sm text-green-500 flex items-center">
                          <TrendingUp className="mr-1 h-4 w-4" />
                          {channelData.growth.subscribers.percentage}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-tube-dark border-tube-lightgray/20">
                    <CardHeader>
                      <CardTitle className="text-tube-white">Görüntülenme Artışı</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end gap-2">
                        <div className="text-3xl font-bold text-tube-white">+{formatNumber(channelData.growth.views.value)}</div>
                        <div className="text-sm text-green-500 flex items-center">
                          <TrendingUp className="mr-1 h-4 w-4" />
                          {channelData.growth.views.percentage}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-tube-dark border-tube-lightgray/20">
                    <CardHeader>
                      <CardTitle className="text-tube-white">Etkileşim Artışı</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end gap-2">
                        <div className="text-3xl font-bold text-tube-white">+{channelData.growth.engagement.value}%</div>
                        <div className="text-sm text-green-500 flex items-center">
                          <TrendingUp className="mr-1 h-4 w-4" />
                          {channelData.growth.engagement.percentage}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="videos" className="mt-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-tube-white mb-4">Kanal Videoları</h3>
                  <div className="glass-panel rounded-xl p-4 card-shadow overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Video Başlığı</TableHead>
                          <TableHead className="text-right">Görüntülenme</TableHead>
                          <TableHead className="text-right">Beğeni</TableHead>
                          <TableHead className="text-right">Yorumlar</TableHead>
                          <TableHead className="text-right">Tarih</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {channelData.topVideos.map((video, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-tube-white">{video.title}</TableCell>
                            <TableCell className="text-right">{formatNumber(video.views)}</TableCell>
                            <TableCell className="text-right">{formatNumber(video.likes)}</TableCell>
                            <TableCell className="text-right">{formatNumber(video.comments)}</TableCell>
                            <TableCell className="text-right">{new Date(video.date).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="engagement" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <StatCard
                    title="Ortalama İzlenme"
                    value={formatNumber(channelData.stats.avgViewsPerVideo)}
                    icon={<Eye size={20} />}
                  />
                  
                  <StatCard
                    title="Video Başına Beğeni"
                    value={formatNumber(Math.round(channelData.stats.avgViewsPerVideo * 0.06))}
                    icon={<ThumbsUp size={20} />}
                  />
                  
                  <StatCard
                    title="Video Başına Yorum"
                    value={formatNumber(Math.round(channelData.stats.avgViewsPerVideo * 0.012))}
                    icon={<MessageSquare size={20} />}
                  />
                </div>
                
                <div className="glass-panel rounded-xl p-6 card-shadow mb-8">
                  <h3 className="text-xl font-bold text-tube-white mb-4">Etkileşim Analizi</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { name: 'Video 1', views: 254000, likes: 15240, comments: 3048, shares: 1270 },
                          { name: 'Video 2', views: 187000, likes: 11220, comments: 2244, shares: 935 },
                          { name: 'Video 3', views: 321000, likes: 19260, comments: 3852, shares: 1605 },
                          { name: 'Video 4', views: 198000, likes: 11880, comments: 2376, shares: 990 },
                          { name: 'Video 5', views: 276000, likes: 16560, comments: 3312, shares: 1380 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            borderColor: '#374151',
                            borderRadius: '6px',
                            color: '#F9FAFB'
                          }}
                          formatter={(value: number, name: string) => [formatNumber(value), name === 'views' ? 'Görüntülenme' : name === 'likes' ? 'Beğeni' : name === 'comments' ? 'Yorum' : 'Paylaşım']}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="likes" stroke="#F97316" strokeWidth={2} />
                        <Line type="monotone" dataKey="comments" stroke="#8B5CF6" strokeWidth={2} />
                        <Line type="monotone" dataKey="shares" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default Analytics;
