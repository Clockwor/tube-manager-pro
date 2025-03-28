
import { ReactNode } from 'react';

export interface SocialAccount {
  id: string;
  name: string;
  platform: string;
  platformColor: string;
  icon: ReactNode;
  lastActive: string;
  followers: string;
  following: string;
  status: 'Running' | 'Start' | 'Fix Issues';
  statusColor: string;
  avatar: string;
  avatarFallback: string;
}
