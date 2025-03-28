import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Youtube, Twitter, Facebook, Linkedin, Plus, MoreVertical, Info, Film, Camera } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SocialIcon from '@/components/social/SocialIcon';
import { socialAccountsData } from '@/data/socialAccounts';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface SocialPlatform {
  name: string;
  id: string;
  iconName: string;
  platformColor: string;
  connected: boolean;
  accountId?: string;
  avatarUrl?: string;
  followers?: string;
  following?: string;
  lastActive?: string;
  status?: 'Running' | 'Start' | 'Fix Issues';
}

interface Post {
  id: string;
  title: string;
  date: string;
  platform: string;
  views: string;
  engagement: string;
  account: string;
}

const Social = () => {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    { 
      id: 'tiktok',
      name: 'TikTok', 
      iconName: 'Film',
      platformColor: 'bg-black',
      connected: true, 
      accountId: 'socialmedia_growth',
      avatarUrl: '/lovable-uploads/69db3c63-3162-4d91-9b5a-232be4dc76f6.png',
      followers: '4,352',
      following: '1,234',
      lastActive: '2 min ago',
      status: 'Running'
    },
    { 
      id: 'instagram',
      name: 'Instagram', 
      iconName: 'Instagram',
      platformColor: 'bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400',
      connected: true, 
      accountId: 'tech_influencer',
      avatarUrl: '/lovable-uploads/69db3c63-3162-4d91-9b5a-232be4dc76f6.png',
      followers: '22,641',
      following: '543',
      lastActive: '1 hour ago',
      status: 'Start'
    },
    { 
      id: 'youtube',
      name: 'Youtube', 
      iconName: 'Youtube',
      platformColor: 'bg-red-600',
      connected: true, 
      accountId: 'tube_master',
      avatarUrl: '/lovable-uploads/69db3c63-3162-4d91-9b5a-232be4dc76f6.png',
      followers: '48,269',
      following: '56',
      lastActive: '1 day ago',
      status: 'Running'
    },
    { 
      id: 'twitter',
      name: 'X', 
      iconName: 'Twitter',
      platformColor: 'bg-blue-400',
      connected: true, 
      accountId: 'viral_content',
      avatarUrl: '/lovable-uploads/69db3c63-3162-4d91-9b5a-232be4dc76f6.png',
      followers: '156,700',
      following: '325',
      lastActive: '3 days ago',
      status: 'Fix Issues'
    },
    { 
      id: 'facebook',
      name: 'Facebook', 
      iconName: 'Facebook',
      platformColor: 'bg-blue-600',
      connected: true, 
      accountId: 'business_page',
      avatarUrl: '/lovable-uploads/69db3c63-3162-4d91-9b5a-232be4dc76f6.png',
      followers: '8,943',
      following: '112',
      lastActive: '5 min ago',
      status: 'Running'
    },
    { 
      id: 'linkedin',
      name: 'LinkedIn', 
      iconName: 'Linkedin',
      platformColor: 'bg-blue-700',
      connected: false 
    },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Marketing strategy for 2023',
      date: '15 Jun 2023',
      platform: 'TikTok',
      views: '2.4k',
      engagement: '83%',
      account: 'michael_scott'
    },
  ]);

  const [activeTab, setActiveTab] = useState('published');

  const handleConnect = (platformName: string) => {
    setPlatforms(platforms.map(platform => 
      platform.name === platformName 
        ? { ...platform, connected: !platform.connected } 
        : platform
    ));
  };

  const handleAccountDetail = (platformId: string) => {
    navigate(`/social/${platformId}`);
  };

  return (
    <PageContainer>
      <div className="space-y-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-tube-white mb-2">Social Media</h1>
            <p className="text-tube-white/70">Share and promote your content across platforms</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 gap-1">
            <Plus className="h-4 w-4" /> New project
          </Button>
        </div>
        
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-tube-white">Your social media accounts</h2>
            <div className="flex items-center gap-2 text-tube-white/70 bg-tube-gray/40 px-3 py-1 rounded-full text-sm">
              <Info className="h-4 w-4" />
              <span>We use Ayrshare for seamless social posting. Your data is absolutely secure at all times.</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <Card 
                key={platform.id} 
                className={`border-tube-lightgray/30 bg-tube-gray/40 backdrop-blur-md relative group hover:border-purple-500/50 transition-all duration-300 ${platform.connected ? 'cursor-pointer' : ''}`}
                onClick={() => platform.connected && handleAccountDetail(platform.id)}
              >
                <CardContent className="p-4 flex flex-col">
                  <button className="absolute top-2 right-2 text-tube-white/60 hover:text-tube-white z-10">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  
                  <div className="flex items-start mb-3">
                    <div className={`rounded-full p-2.5 ${
                      platform.name === 'TikTok' ? 'bg-black' :
                      platform.name === 'Instagram' ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400' :
                      platform.name === 'Youtube' ? 'bg-red-600' :
                      platform.name === 'X' ? 'bg-blue-400' :
                      platform.name === 'Facebook' ? 'bg-blue-600' :
                      'bg-blue-700'
                    }`}>
                      <SocialIcon iconName={platform.iconName} className="h-7 w-7 text-white" />
                    </div>
                    
                    <div className="ml-3 flex-1">
                      <h3 className="font-semibold text-tube-white text-lg">{platform.name}</h3>
                      {platform.connected && platform.accountId && (
                        <p className="text-tube-white/70 text-sm mb-1">{platform.accountId}</p>
                      )}
                    </div>
                  </div>
                  
                  {platform.connected && platform.accountId ? (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-tube-white/70">Followers</p>
                          <p className="font-semibold text-tube-white">{platform.followers}</p>
                        </div>
                        <div>
                          <p className="text-xs text-tube-white/70">Following</p>
                          <p className="font-semibold text-tube-white">{platform.following}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <Badge 
                          variant="outline" 
                          className={`
                            px-3 py-1 
                            ${platform.status === 'Running' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                              platform.status === 'Start' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                              'bg-red-500/10 text-red-500 border-red-500/20'} 
                            flex items-center gap-1
                          `}
                        >
                          <span className={`h-2 w-2 rounded-full ${
                            platform.status === 'Running' ? 'bg-green-500' :
                            platform.status === 'Start' ? 'bg-blue-500' :
                            'bg-red-500'
                          }`}></span>
                          {platform.status}
                        </Badge>
                        
                        <p className="text-xs text-tube-white/70">{platform.lastActive}</p>
                      </div>
                    </>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3 bg-transparent text-tube-white border-tube-lightgray/50 hover:bg-tube-lightgray/20 self-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConnect(platform.name);
                      }}
                    >
                      Connect
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="glass-panel rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-tube-white">Posts</h2>
            <Button className="bg-purple-600 hover:bg-purple-700 gap-1">
              <Plus className="h-4 w-4" /> New post
            </Button>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="flex justify-between">
              <TabsList className="bg-tube-gray/40">
                <TabsTrigger value="published" className="data-[state=active]:bg-tube-lightgray/30">Published</TabsTrigger>
                <TabsTrigger value="scheduled" className="data-[state=active]:bg-tube-lightgray/30">Scheduled</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="bg-transparent border-tube-lightgray/30">
                  Last 7 days
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent border-tube-lightgray/30">
                  All platforms
                </Button>
              </div>
            </div>
            
            <TabsContent value="published" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-tube-lightgray/20">
                    <TableHead className="text-tube-white/70">Clip</TableHead>
                    <TableHead className="text-tube-white/70">Date & time</TableHead>
                    <TableHead className="text-tube-white/70">Published on</TableHead>
                    <TableHead className="text-tube-white/70">Views</TableHead>
                    <TableHead className="text-tube-white/70">
                      <div className="flex items-center gap-1">
                        Engagement rate <Info className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <TableRow key={post.id} className="border-tube-lightgray/20">
                        <TableCell className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded bg-tube-gray/60 flex items-center justify-center overflow-hidden">
                            <img 
                              src="/placeholder.svg" 
                              alt={post.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-tube-white">{post.title}</span>
                        </TableCell>
                        <TableCell className="text-tube-white/70">{post.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Film className="h-4 w-4" />
                            <span className="text-tube-white/70">{post.account}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-tube-white">{post.views}</TableCell>
                        <TableCell className="text-tube-white">{post.engagement}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="bg-black/20 text-tube-white hover:bg-black/40 flex items-center gap-1"
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-tube-white/70">
                        No published posts yet. Create your first post to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="scheduled">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-tube-white/70 mb-4">No scheduled posts.</p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Schedule a post
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </PageContainer>
  );
};

export default Social;
