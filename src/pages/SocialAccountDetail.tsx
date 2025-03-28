
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Instagram, Youtube, Twitter, Facebook, Linkedin, Film, MoreVertical } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Dummy data for social accounts
const socialAccountsData = [
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

const SocialAccountDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const account = socialAccountsData.find(acc => acc.id === id);
  
  if (!account) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-xl font-bold text-tube-white mb-4">Account not found</h2>
          <Button onClick={() => navigate('/social')} className="bg-purple-600 hover:bg-purple-700">
            Back to Social Media
          </Button>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <div className="space-y-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/social')}
            className="mr-4 text-tube-white hover:bg-tube-lightgray/20"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-tube-white">{account.name}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-tube-lightgray/30 bg-tube-gray/40 backdrop-blur-md lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Avatar className="h-20 w-20 rounded-full border-2 border-tube-lightgray/30">
                  <AvatarImage src={account.avatar} alt={account.name} />
                  <AvatarFallback className={`${account.platformColor} text-white text-xl`}>
                    {account.avatarFallback}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-2xl font-bold text-tube-white mr-2">{account.name}</h2>
                        <div className={`rounded-full p-1.5 ${account.platformColor} ml-1`}>
                          {account.icon}
                        </div>
                      </div>
                      <p className="text-tube-white/70">Last active: {account.lastActive}</p>
                    </div>
                    
                    <div className="flex mt-3 sm:mt-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent border-tube-lightgray/30 text-tube-white mr-2"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-tube-white hover:bg-tube-lightgray/20"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 sm:gap-8">
                    <div>
                      <p className="text-tube-white/70 mb-1">Followers</p>
                      <p className="text-xl font-bold text-tube-white">{account.followers}</p>
                    </div>
                    <div>
                      <p className="text-tube-white/70 mb-1">Following</p>
                      <p className="text-xl font-bold text-tube-white">{account.following}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-tube-lightgray/30 bg-tube-gray/40 backdrop-blur-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-tube-white mb-4">Account Status</h3>
              
              <div className="space-y-4">
                <Badge 
                  variant="outline" 
                  className={`px-4 py-2 ${account.statusColor} text-sm flex items-center gap-2 w-full justify-center`}
                >
                  {account.status === 'Running' && (
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  )}
                  {account.status === 'Start' && (
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  )}
                  {account.status === 'Fix Issues' && (
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                  {account.status}
                </Badge>
                
                <Button 
                  className={`w-full ${
                    account.status === 'Running' ? 'bg-red-600 hover:bg-red-700' :
                    account.status === 'Start' ? 'bg-green-600 hover:bg-green-700' :
                    'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  {account.status === 'Running' ? 'Stop' : 
                   account.status === 'Start' ? 'Start' : 'Fix'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-tube-lightgray/30 bg-tube-gray/40 backdrop-blur-md lg:col-span-3">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-tube-white mb-4">Recent Analytics</h3>
              
              <div className="h-64 flex items-center justify-center text-tube-white/70">
                Analytics chart for {account.name} would be displayed here
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default SocialAccountDetail;
