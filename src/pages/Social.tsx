import React, { useState } from 'react';
import { Instagram, Youtube, Twitter, Facebook, Linkedin, Plus, Music, Scissors } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SocialHeader from '@/components/social/SocialHeader';
import SocialAccountsSection from '@/components/social/SocialAccountsSection';
import PostsTable from '@/components/social/PostsTable';
import ShortsManager from '@/components/social/ShortsManager';
import { SocialPlatform, Post } from '@/components/social/types';

const Social = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    { 
      name: 'TikTok', 
      icon: <Music className="h-7 w-7 text-white" />, 
      connected: true, 
      accountId: '@myaccount', 
      accountCount: 3,
      accounts: [
        {
          id: 'tik1',
          username: '@dancekween',
          profilePicture: 'https://i.pravatar.cc/150?img=32',
          followers: 23400,
          following: 342,
          posts: 87
        },
        {
          id: 'tik2',
          username: '@viralkids',
          profilePicture: 'https://i.pravatar.cc/150?img=13',
          followers: 12300,
          following: 456,
          posts: 102
        },
        {
          id: 'tik3',
          username: '@fitfam',
          profilePicture: 'https://i.pravatar.cc/150?img=27',
          followers: 4200,
          following: 210,
          posts: 33
        }
      ]
    },
    { 
      name: 'Instagram', 
      icon: <Instagram className="h-7 w-7 text-white" />, 
      connected: true, 
      accountId: '@myaccount', 
      accountCount: 2,
      accounts: [
        {
          id: 'ig1',
          username: '@traveldiaries',
          profilePicture: 'https://i.pravatar.cc/150?img=29',
          followers: 15700,
          following: 843,
          posts: 342
        },
        {
          id: 'ig2',
          username: '@foodiehaven',
          profilePicture: 'https://i.pravatar.cc/150?img=17',
          followers: 8900,
          following: 372,
          posts: 156
        }
      ]
    },
    { 
      name: 'Youtube', 
      icon: <Youtube className="h-7 w-7 text-white" />, 
      connected: true, 
      accountId: '@myaccount', 
      accountCount: 1,
      accounts: [
        {
          id: 'yt1',
          username: 'Tech Insights',
          profilePicture: 'https://i.pravatar.cc/150?img=59',
          followers: 31200,
          following: 0,
          posts: 87
        }
      ]
    },
    { 
      name: 'X', 
      icon: <Twitter className="h-7 w-7 text-white" />, 
      connected: false 
    },
    { 
      name: 'Facebook', 
      icon: <Facebook className="h-7 w-7 text-white" />, 
      connected: true, 
      accountId: '@myaccount', 
      accountCount: 4,
      accounts: [
        {
          id: 'fb1',
          username: 'Digital Marketing Pros',
          profilePicture: 'https://i.pravatar.cc/150?img=68',
          followers: 4200,
          following: 182,
          posts: 234
        },
        {
          id: 'fb2',
          username: 'Local Business Network',
          profilePicture: 'https://i.pravatar.cc/150?img=51',
          followers: 1200,
          following: 104,
          posts: 87
        },
        {
          id: 'fb3',
          username: 'Sports Fans United',
          profilePicture: 'https://i.pravatar.cc/150?img=62',
          followers: 7400,
          following: 232,
          posts: 178
        },
        {
          id: 'fb4',
          username: 'Gaming Community',
          profilePicture: 'https://i.pravatar.cc/150?img=33',
          followers: 5800,
          following: 120,
          posts: 98
        }
      ]
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="h-7 w-7 text-white" />, 
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
  const [mainTab, setMainTab] = useState('accounts');

  const handleConnect = (platformName: string) => {
    setPlatforms(platforms.map(platform => 
      platform.name === platformName 
        ? { ...platform, connected: !platform.connected } 
        : platform
    ));
  };

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Header Section */}
        <SocialHeader />
        
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="bg-tube-gray/40 mb-6">
            <TabsTrigger value="accounts">Sosyal Medya Hesapları</TabsTrigger>
            <TabsTrigger value="posts">Gönderiler</TabsTrigger>
            <TabsTrigger value="shorts">
              <Scissors className="h-4 w-4 mr-2" />
              Shorts Maker
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts">
            {/* Social Media Accounts Section */}
            <SocialAccountsSection platforms={platforms} onConnect={handleConnect} />
          </TabsContent>
          
          <TabsContent value="posts">
            {/* Posts Section */}
            <section className="glass-panel rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-tube-white">Posts</h2>
                <Button className="bg-purple-600 hover:bg-purple-700 gap-1">
                  <Plus className="h-4 w-4" /> New post
                </Button>
              </div>
              
              <PostsTable 
                posts={posts}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </section>
          </TabsContent>
          
          <TabsContent value="shorts">
            <ShortsManager />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Social;
