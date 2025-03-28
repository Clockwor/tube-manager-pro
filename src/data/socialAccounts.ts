
import { Film, Instagram, Youtube, Twitter, Facebook, Linkedin } from 'lucide-react';
import { SocialAccount } from '@/types/social';

// Dummy data for social accounts
export const socialAccountsData: SocialAccount[] = [
  {
    id: 'tiktok',
    name: 'socialmedia_growth',
    platform: 'TikTok',
    platformColor: 'bg-black',
    icon: <Film className="h-4 w-4" />,
    lastActive: '2 min ago',
    followers: '4,352',
    following: '1,234',
    status: 'Running',
    statusColor: 'bg-green-500/10 text-green-500 border-green-500/20',
    avatar: '/lovable-uploads/69db3c63-3162-4d91-9b5a-232be4dc76f6.png',
    avatarFallback: 'SM'
  },
  {
    id: 'instagram',
    name: 'tech_influencer',
    platform: 'Instagram',
    platformColor: 'bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400',
    icon: <Instagram className="h-4 w-4" />,
    lastActive: '1 hour ago',
    followers: '22,641',
    following: '543',
    status: 'Start',
    statusColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    avatar: '/lovable-uploads/69db3c63-3162-4d91-9b5a-232be4dc76f6.png',
    avatarFallback: 'TI'
  },
  {
    id: 'twitter',
    name: 'viral_content',
    platform: 'X',
    platformColor: 'bg-blue-400',
    icon: <Twitter className="h-4 w-4" />,
    lastActive: '3 days ago',
    followers: '156,700',
    following: '325',
    status: 'Fix Issues',
    statusColor: 'bg-red-500/10 text-red-500 border-red-500/20',
    avatar: '/lovable-uploads/69db3c63-3162-4d91-9b5a-232be4dc76f6.png',
    avatarFallback: 'VC'
  },
  {
    id: 'facebook',
    name: 'business_page',
    platform: 'Facebook',
    platformColor: 'bg-blue-600',
    icon: <Facebook className="h-4 w-4" />,
    lastActive: '5 min ago',
    followers: '8,943',
    following: '112',
    status: 'Running',
    statusColor: 'bg-green-500/10 text-green-500 border-green-500/20',
    avatar: '/lovable-uploads/69db3c63-3162-4d91-9b5a-232be4dc76f6.png',
    avatarFallback: 'BP'
  },
  {
    id: 'youtube',
    name: 'tube_master',
    platform: 'Youtube',
    platformColor: 'bg-red-600',
    icon: <Youtube className="h-4 w-4" />,
    lastActive: '1 day ago',
    followers: '48,269',
    following: '56',
    status: 'Running',
    statusColor: 'bg-green-500/10 text-green-500 border-green-500/20',
    avatar: '/lovable-uploads/69db3c63-3162-4d91-9b5a-232be4dc76f6.png',
    avatarFallback: 'TM'
  },
  {
    id: 'linkedin',
    name: 'pro_networker',
    platform: 'LinkedIn',
    platformColor: 'bg-blue-700',
    icon: <Linkedin className="h-4 w-4" />,
    lastActive: '4 hours ago',
    followers: '3,502',
    following: '1,879',
    status: 'Start',
    statusColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    avatar: '/lovable-uploads/69db3c63-3162-4d91-9b5a-232be4dc76f6.png',
    avatarFallback: 'PN'
  }
];
