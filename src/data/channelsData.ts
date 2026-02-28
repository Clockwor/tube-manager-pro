import { YouTubeChannel } from '@/types/youtube';

export const channelsData: YouTubeChannel[] = [
  {
    id: '1',
    name: 'Tech Tutorials',
    handle: 'techtutorials',
    avatar: 'https://via.placeholder.com/80/FF0000/FFFFFF?text=TT',
    banner: 'https://via.placeholder.com/1200x300/FF0000/FFFFFF?text=Tech+Tutorials',
    description: 'Teknoloji eğitimleri ve incelemeler. En yeni yazılım, donanım ve programlama konularını kapsayan kapsamlı içerikler.',
    subscriberCount: 120000,
    totalViews: 5200000,
    videoCount: 342,
    country: 'US',
    language: 'tr',
    customUrl: 'techtutorials',
    publishedAt: '2020-01-15',
    verified: true,
    tags: ['tech', 'education'],
    growth: {
      subscribers: { value: 2400, percentage: 2.1 },
      views: { value: 150000, percentage: 3.0 },
      videos: { value: 12, percentage: 3.6 }
    },
    stats: {
      subscribersLast30Days: 2400,
      viewsLast30Days: 150000,
      videosLast30Days: 12,
      estimatedRevenue: 3200,
      engagementRate: 4.2,
      avgViewsPerVideo: 15204
    },
    recentVideos: [
      {
        id: 'v1',
        title: 'React 19 Yeni Özellikler Rehberi',
        description: 'React 19 ile gelen tüm yenilikler',
        thumbnail: '/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png',
        publishedAt: '2026-02-20',
        duration: '15:42',
        viewCount: 54000,
        likeCount: 3200,
        commentCount: 280,
        tags: ['react', 'javascript', 'web'],
        categoryId: '28',
        status: 'public',
        stats: { impressions: 120000, clickThroughRate: 8.2, avgViewDuration: 520, retentionRate: 62 }
      },
      {
        id: 'v2',
        title: 'TypeScript İleri Seviye Teknikler',
        description: 'TypeScript ile profesyonel kod yazma',
        thumbnail: '/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png',
        publishedAt: '2026-02-15',
        duration: '22:10',
        viewCount: 32000,
        likeCount: 2100,
        commentCount: 195,
        tags: ['typescript', 'programming'],
        categoryId: '28',
        status: 'public',
        stats: { impressions: 85000, clickThroughRate: 6.8, avgViewDuration: 680, retentionRate: 55 }
      },
      {
        id: 'v3',
        title: 'Node.js Performans Optimizasyonu',
        description: 'Node.js uygulamalarını hızlandırma',
        thumbnail: '/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png',
        publishedAt: '2026-02-10',
        duration: '18:35',
        viewCount: 128000,
        likeCount: 8500,
        commentCount: 620,
        tags: ['nodejs', 'backend', 'performance'],
        categoryId: '28',
        status: 'public',
        stats: { impressions: 340000, clickThroughRate: 12.1, avgViewDuration: 720, retentionRate: 71 }
      },
      {
        id: 'v4',
        title: 'Docker ile Microservices Mimarisi',
        description: 'Docker kullanarak microservices nasıl kurulur',
        thumbnail: '/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png',
        publishedAt: '2026-02-05',
        duration: '28:15',
        viewCount: 28000,
        likeCount: 1800,
        commentCount: 145,
        tags: ['docker', 'devops'],
        categoryId: '28',
        status: 'public',
        stats: { impressions: 72000, clickThroughRate: 5.5, avgViewDuration: 890, retentionRate: 48 }
      }
    ],
    analytics: {
      viewsHistory: [
        { date: '2026-01', views: 420000 },
        { date: '2026-02', views: 480000 },
      ],
      subscribersHistory: [
        { date: '2026-01', count: 117600 },
        { date: '2026-02', count: 120000 },
      ],
      topCountries: [
        { country: 'Türkiye', percentage: 45 },
        { country: 'Almanya', percentage: 15 },
        { country: 'ABD', percentage: 12 },
        { country: 'İngiltere', percentage: 8 },
      ],
      topAgeGroups: [
        { ageGroup: '18-24', percentage: 35 },
        { ageGroup: '25-34', percentage: 40 },
        { ageGroup: '35-44', percentage: 18 },
      ],
      avgSessionDuration: 320,
      clickThroughRate: 4.2
    }
  },
  {
    id: '2',
    name: 'Gaming Channel',
    handle: 'gamingchannel',
    avatar: 'https://via.placeholder.com/80/0000FF/FFFFFF?text=GC',
    banner: 'https://via.placeholder.com/1200x300/0000FF/FFFFFF?text=Gaming+Channel',
    description: 'Oyun incelemeleri, walkthrough ve canlı yayınlar. En popüler oyunlar hakkında içerikler.',
    subscriberCount: 85000,
    totalViews: 3800000,
    videoCount: 287,
    country: 'GB',
    language: 'tr',
    customUrl: 'gamingchannel',
    publishedAt: '2019-06-22',
    verified: false,
    tags: ['gaming', 'entertainment'],
    growth: {
      subscribers: { value: 1200, percentage: 1.4 },
      views: { value: 95000, percentage: 2.5 },
      videos: { value: 8, percentage: 2.9 }
    },
    stats: {
      subscribersLast30Days: 1200,
      viewsLast30Days: 95000,
      videosLast30Days: 8,
      estimatedRevenue: 2100,
      engagementRate: 3.8,
      avgViewsPerVideo: 13240
    },
    recentVideos: [
      {
        id: 'gv1',
        title: 'GTA VI İlk İzlenim',
        description: 'GTA VI ilk bakış',
        thumbnail: '/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png',
        publishedAt: '2026-02-18',
        duration: '25:30',
        viewCount: 89000,
        likeCount: 6200,
        commentCount: 840,
        tags: ['gta', 'gaming'],
        categoryId: '20',
        status: 'public',
        stats: { impressions: 250000, clickThroughRate: 9.5, avgViewDuration: 920, retentionRate: 65 }
      }
    ],
    analytics: {
      viewsHistory: [
        { date: '2026-01', views: 310000 },
        { date: '2026-02', views: 350000 },
      ],
      subscribersHistory: [
        { date: '2026-01', count: 83800 },
        { date: '2026-02', count: 85000 },
      ],
      topCountries: [
        { country: 'Türkiye', percentage: 38 },
        { country: 'İngiltere', percentage: 20 },
        { country: 'ABD', percentage: 15 },
      ],
      topAgeGroups: [
        { ageGroup: '13-17', percentage: 22 },
        { ageGroup: '18-24', percentage: 45 },
        { ageGroup: '25-34', percentage: 25 },
      ],
      avgSessionDuration: 285,
      clickThroughRate: 3.7
    }
  },
  {
    id: '3',
    name: 'Travel Vlogs',
    handle: 'travelvlogs',
    avatar: 'https://via.placeholder.com/80/00FF00/FFFFFF?text=TV',
    banner: 'https://via.placeholder.com/1200x300/00FF00/FFFFFF?text=Travel+Vlogs',
    description: 'Dünya genelinde seyahat vlogları ve macera içerikleri. Yeni yerler keşfet!',
    subscriberCount: 45000,
    totalViews: 1700000,
    videoCount: 156,
    country: 'CA',
    language: 'tr',
    customUrl: 'travelvlogs',
    publishedAt: '2021-03-10',
    verified: true,
    tags: ['entertainment'],
    growth: {
      subscribers: { value: 800, percentage: 1.8 },
      views: { value: 42000, percentage: 2.5 },
      videos: { value: 5, percentage: 3.3 }
    },
    stats: {
      subscribersLast30Days: 800,
      viewsLast30Days: 42000,
      videosLast30Days: 5,
      estimatedRevenue: 1400,
      engagementRate: 5.1,
      avgViewsPerVideo: 10897
    },
    recentVideos: [
      {
        id: 'tv1',
        title: 'Kapadokya Balon Turu',
        description: 'Kapadokya sıcak hava balonu deneyimi',
        thumbnail: '/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png',
        publishedAt: '2026-02-22',
        duration: '12:45',
        viewCount: 67000,
        likeCount: 4800,
        commentCount: 520,
        tags: ['travel', 'turkey', 'cappadocia'],
        categoryId: '19',
        status: 'public',
        stats: { impressions: 180000, clickThroughRate: 7.8, avgViewDuration: 480, retentionRate: 58 }
      }
    ],
    analytics: {
      viewsHistory: [
        { date: '2026-01', views: 145000 },
        { date: '2026-02', views: 168000 },
      ],
      subscribersHistory: [
        { date: '2026-01', count: 44200 },
        { date: '2026-02', count: 45000 },
      ],
      topCountries: [
        { country: 'Türkiye', percentage: 52 },
        { country: 'Almanya', percentage: 12 },
        { country: 'Kanada', percentage: 10 },
      ],
      topAgeGroups: [
        { ageGroup: '25-34', percentage: 38 },
        { ageGroup: '35-44', percentage: 30 },
        { ageGroup: '45-54', percentage: 18 },
      ],
      avgSessionDuration: 410,
      clickThroughRate: 5.8
    }
  },
];
