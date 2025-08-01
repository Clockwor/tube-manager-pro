import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, TrendingDown, Users, Eye, Play, Clock,
  Calendar, Target, Award, BarChart3, PieChart, LineChart
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const analyticsData = {
  overview: {
    totalViews: 2456789,
    totalSubscribers: 125600,
    totalVideos: 87,
    avgViewDuration: '4:32',
    monthlyGrowth: {
      views: 15.3,
      subscribers: 8.7,
      engagement: 12.4
    }
  },
  viewsHistory: [
    { date: '01 Oca', views: 12000, subscribers: 120000 },
    { date: '08 Oca', views: 15000, subscribers: 121000 },
    { date: '15 Oca', views: 18000, subscribers: 122500 },
    { date: '22 Oca', views: 22000, subscribers: 124000 },
    { date: '29 Oca', views: 25000, subscribers: 125600 }
  ],
  topVideos: [
    { title: 'Ultimate Coffee Guide', views: 125000, engagement: 8.5 },
    { title: 'Coffee Mistakes to Avoid', views: 98000, engagement: 7.2 },
    { title: 'Perfect Morning Routine', views: 87000, engagement: 9.1 },
    { title: 'Bean Selection Tips', views: 76000, engagement: 6.8 }
  ],
  audienceData: [
    { name: '18-24', value: 25, color: '#FF6B6B' },
    { name: '25-34', value: 35, color: '#4ECDC4' },
    { name: '35-44', value: 25, color: '#45B7D1' },
    { name: '45+', value: 15, color: '#96CEB4' }
  ],
  geoData: [
    { country: 'Türkiye', percentage: 45, flag: '🇹🇷' },
    { country: 'Almanya', percentage: 20, flag: '🇩🇪' },
    { country: 'Amerika', percentage: 15, flag: '🇺🇸' },
    { country: 'İngiltere', percentage: 10, flag: '🇬🇧' },
    { country: 'Diğer', percentage: 10, flag: '🌍' }
  ]
};

const ChannelAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [metricType, setMetricType] = useState('views');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getTrendIcon = (value: number) => {
    return value >= 0 ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getTrendColor = (value: number) => {
    return value >= 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <Card className="bg-tube-dark border-tube-lightgray/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-tube-white text-xl">Kanal Analitikleri</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-tube-gray border-tube-lightgray/30 text-tube-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Son 7 Gün</SelectItem>
                  <SelectItem value="30d">Son 30 Gün</SelectItem>
                  <SelectItem value="90d">Son 90 Gün</SelectItem>
                  <SelectItem value="1y">Son 1 Yıl</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-tube-lightgray/30 text-tube-white">
                Rapor İndir
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-tube-gray/40 border-tube-lightgray/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tube-white/70 text-sm">Toplam Görüntülenme</p>
                <p className="text-2xl font-bold text-tube-white">
                  {formatNumber(analyticsData.overview.totalViews)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(analyticsData.overview.monthlyGrowth.views)}
                  <span className={`text-sm ${getTrendColor(analyticsData.overview.monthlyGrowth.views)}`}>
                    +{analyticsData.overview.monthlyGrowth.views}%
                  </span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tube-gray/40 border-tube-lightgray/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tube-white/70 text-sm">Abone Sayısı</p>
                <p className="text-2xl font-bold text-tube-white">
                  {formatNumber(analyticsData.overview.totalSubscribers)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(analyticsData.overview.monthlyGrowth.subscribers)}
                  <span className={`text-sm ${getTrendColor(analyticsData.overview.monthlyGrowth.subscribers)}`}>
                    +{analyticsData.overview.monthlyGrowth.subscribers}%
                  </span>
                </div>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tube-gray/40 border-tube-lightgray/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tube-white/70 text-sm">Video Sayısı</p>
                <p className="text-2xl font-bold text-tube-white">{analyticsData.overview.totalVideos}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Calendar className="h-3 w-3 text-tube-white/70" />
                  <span className="text-sm text-tube-white/70">Bu ay +4</span>
                </div>
              </div>
              <Play className="h-8 w-8 text-tube-red" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tube-gray/40 border-tube-lightgray/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tube-white/70 text-sm">Ort. İzlenme Süresi</p>
                <p className="text-2xl font-bold text-tube-white">{analyticsData.overview.avgViewDuration}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(analyticsData.overview.monthlyGrowth.engagement)}
                  <span className={`text-sm ${getTrendColor(analyticsData.overview.monthlyGrowth.engagement)}`}>
                    +{analyticsData.overview.monthlyGrowth.engagement}%
                  </span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views and Subscribers Chart */}
        <Card className="bg-tube-dark border-tube-lightgray/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-tube-white">Görüntülenme ve Abone Trendi</CardTitle>
              <Select value={metricType} onValueChange={setMetricType}>
                <SelectTrigger className="w-32 bg-tube-gray border-tube-lightgray/30 text-tube-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="views">Görüntülenme</SelectItem>
                  <SelectItem value="subscribers">Abone</SelectItem>
                  <SelectItem value="both">İkisi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={analyticsData.viewsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                {(metricType === 'views' || metricType === 'both') && (
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Görüntülenme"
                  />
                )}
                {(metricType === 'subscribers' || metricType === 'both') && (
                  <Line 
                    type="monotone" 
                    dataKey="subscribers" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Abone"
                  />
                )}
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Audience Demographics */}
        <Card className="bg-tube-dark border-tube-lightgray/30">
          <CardHeader>
            <CardTitle className="text-tube-white">Yaş Grupları</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <RechartsPieChart data={analyticsData.audienceData}>
                  {analyticsData.audienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {analyticsData.audienceData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-tube-white/70 text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Videos and Geography */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Videos */}
        <Card className="bg-tube-dark border-tube-lightgray/30">
          <CardHeader>
            <CardTitle className="text-tube-white">En İyi Performans Gösteren Videolar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topVideos.map((video, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-tube-gray/40 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-tube-red text-white">{index + 1}</Badge>
                    <div>
                      <p className="text-tube-white font-medium text-sm">{video.title}</p>
                      <p className="text-tube-white/70 text-xs">{formatNumber(video.views)} görüntülenme</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-500 font-medium">{video.engagement}%</p>
                    <p className="text-tube-white/70 text-xs">etkileşim</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card className="bg-tube-dark border-tube-lightgray/30">
          <CardHeader>
            <CardTitle className="text-tube-white">Coğrafi Dağılım</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.geoData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-tube-white">{country.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-tube-gray rounded-full h-2">
                      <div 
                        className="bg-tube-red h-2 rounded-full" 
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <span className="text-tube-white text-sm w-8">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChannelAnalytics;