export interface YouTubeChannel {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  description: string;
  country: string;
  language: string;
  customUrl: string;
  subscriberCount: number;
  videoCount: number;
  totalViews: number;
  publishedAt: string;
  verified: boolean;
  tags?: string[];
  stats: {
    subscribersLast30Days: number;
    viewsLast30Days: number;
    videosLast30Days: number;
    estimatedRevenue: number;
    engagementRate: number;
    avgViewsPerVideo: number;
  };
  growth: {
    subscribers: { value: number; percentage: number };
    views: { value: number; percentage: number };
    videos: { value: number; percentage: number };
  };
  recentVideos: YouTubeVideo[];
  analytics: {
    viewsHistory: { date: string; views: number }[];
    subscribersHistory: { date: string; count: number }[];
    topCountries: { country: string; percentage: number }[];
    topAgeGroups: { ageGroup: string; percentage: number }[];
    avgSessionDuration: number;
    clickThroughRate: number;
  };
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tags: string[];
  categoryId: string;
  status: 'public' | 'unlisted' | 'private' | 'scheduled';
  stats: {
    impressions: number;
    clickThroughRate: number;
    avgViewDuration: number;
    retentionRate: number;
  };
}

export interface DashboardStats {
  totalChannels: number;
  totalSubscribers: number;
  totalViews: number;
  totalVideos: number;
  monthlyGrowth: {
    subscribers: number;
    views: number;
    videos: number;
  };
  topPerformingChannel: {
    name: string;
    metric: string;
    value: number;
  };
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'video_published' | 'milestone_reached' | 'comment_received' | 'subscriber_gained';
  channelId: string;
  channelName: string;
  message: string;
  timestamp: string;
  metadata?: {
    videoTitle?: string;
    milestoneType?: string;
    subscriberCount?: number;
  };
}

export interface ChannelPerformanceMetric {
  channelId: string;
  channelName: string;
  metric: 'subscribers' | 'views' | 'engagement' | 'revenue';
  value: number;
  change: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
}