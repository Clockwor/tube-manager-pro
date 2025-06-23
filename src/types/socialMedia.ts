
export interface SocialMediaPost {
  id: string;
  content: string;
  platforms: Platform[];
  contentType: ContentType;
  scheduledDate: Date;
  status: PostStatus;
  mediaUrls?: string[];
  hashtags?: string[];
  mentions?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  isActive: boolean;
}

export type ContentType = 'post' | 'story' | 'reel' | 'tweet' | 'video' | 'image';
export type PostStatus = 'draft' | 'scheduled' | 'published';
export type ViewMode = 'week' | 'month';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  platform: Platform;
  contentType: ContentType;
  status: PostStatus;
}

export interface FilterOptions {
  platforms: string[];
  contentTypes: ContentType[];
  statuses: PostStatus[];
  searchTerm: string;
}
