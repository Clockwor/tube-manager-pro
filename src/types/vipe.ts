// VIP-E System Types
export interface VideoOutlier {
  id: string;
  title: string;
  channelName: string;
  channelId: string;
  thumbnail: string;
  viewCount: number;
  publishedAt: string;
  duration: string;
  outlierScore: number;
  vph: number; // Views per hour
  tags: string[];
  categoryId: string;
  performanceMultiplier: number;
}

export interface IdeaGeneration {
  id: string;
  title: string;
  description: string;
  thumbnailConcept: string;
  targetNiche: string;
  confidenceScore: number;
  inspirationSource: string;
  suggestedTags: string[];
  estimatedViralPotential: number;
}

export interface TitleGeneration {
  id: string;
  title: string;
  format: string;
  clickworthiness: number;
  emotionalTrigger: string[];
  targetAudience: string;
  sourcePattern: string;
}

export interface ThumbnailAnalysis {
  id: string;
  imageUrl: string;
  dominantColors: string[];
  textElements: string[];
  faceCount: number;
  visualStyle: 'minimalist' | 'complex' | 'text-heavy' | 'face-focused';
  emotionalTone: string;
  clickabilityScore: number;
}

export interface NicheChannel {
  id: string;
  name: string;
  handle: string;
  subscriberCount: number;
  avgViews: number;
  niche: string;
  similarityScore: number;
  recentOutliers: VideoOutlier[];
}

export interface TrackedChannelFolder {
  id: string;
  name: string;
  description?: string;
  channelIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  type: 'idea' | 'video' | 'thumbnail' | 'title';
  content: any;
  folderId?: string;
  notes?: string;
  createdAt: string;
}

export interface BookmarkFolder {
  id: string;
  name: string;
  description?: string;
  color: string;
  bookmarkCount: number;
  createdAt: string;
}

export interface SearchFilters {
  viewCountRange?: { min: number; max: number };
  publishDateRange?: { start: string; end: string };
  outlierScoreRange?: { min: number; max: number };
  subscriberCountRange?: { min: number; max: number };
  duration?: 'short' | 'medium' | 'long';
  categories?: string[];
  languages?: string[];
}

export interface VisionBoardItem {
  id: string;
  thumbnail: string;
  clickabilityScore: number;
  visualStyle: string;
  dominantColors: string[];
}

export interface ShortsOutlier extends VideoOutlier {
  isShorts: true;
  shortsMetrics: {
    avgWatchTime: number;
    retentionRate: number;
    shareRate: number;
    loopRate: number;
  };
}

export interface AIService {
  generateIdeas(inputUrl: string, count?: number): Promise<IdeaGeneration[]>;
  generateTitles(topic: string, niche: string, count?: number): Promise<TitleGeneration[]>;
  generateThumbnail(prompt: string, style?: string): Promise<string>;
  analyzeThumbnail(imageUrl: string): Promise<ThumbnailAnalysis>;
  findSimilarThumbnails(imageUrl: string, count?: number): Promise<ThumbnailAnalysis[]>;
  searchThumbnails(query: string, filters?: SearchFilters): Promise<ThumbnailAnalysis[]>;
}

export interface YouTubeService {
  getChannelOutliers(channelId: string, timeframe?: string): Promise<VideoOutlier[]>;
  getRandomOutliers(filters?: SearchFilters, count?: number): Promise<VideoOutlier[]>;
  getShortsOutliers(filters?: SearchFilters, count?: number): Promise<ShortsOutlier[]>;
  exploreNiche(keyword: string): Promise<NicheChannel[]>;
  findSimilarTopics(videoId: string, count?: number): Promise<VideoOutlier[]>;
  getChannelData(channelId: string): Promise<any>;
}