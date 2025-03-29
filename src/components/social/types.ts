
import { ReactNode } from 'react';

export interface SocialPlatform {
  name: string;
  icon: ReactNode;
  connected: boolean;
  accountId?: string;
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
