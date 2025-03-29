
import { ReactNode } from 'react';

export interface SocialAccount {
  id: string;
  username: string;
  profilePicture: string;
  followers: number;
  following: number;
  posts: number;
}

export interface SocialPlatform {
  name: string;
  icon: ReactNode;
  connected: boolean;
  accountId?: string;
  accountCount?: number;
  accounts?: SocialAccount[];
}

export interface Post {
  id: string;
  title: string;
  date: string;
  platform: string;
  views: string;
  engagement: string;
  account: string;
}
