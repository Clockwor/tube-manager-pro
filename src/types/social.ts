
export interface SocialAccount {
  id: string;
  name: string;
  platform: string;
  platformColor: string;
  iconName: string;
  lastActive: string;
  followers: string;
  following: string;
  status: 'Running' | 'Start' | 'Fix Issues';
  statusColor: string;
  avatar: string;
  avatarFallback: string;
}
