
import React, { useState } from 'react';
import { Instagram, Youtube, Twitter, Facebook, Linkedin, Plus, Music } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import SocialHeader from '@/components/social/SocialHeader';
import SocialAccountsSection from '@/components/social/SocialAccountsSection';
import PostsTable from '@/components/social/PostsTable';
import { SocialPlatform, Post } from '@/components/social/types';

const Social = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    { name: 'TikTok', icon: <Music className="h-7 w-7 text-white" />, connected: true, accountId: '@myaccount', accountCount: 3 },
    { name: 'Instagram', icon: <Instagram className="h-7 w-7 text-white" />, connected: true, accountId: '@myaccount', accountCount: 2 },
    { name: 'Youtube', icon: <Youtube className="h-7 w-7 text-white" />, connected: true, accountId: '@myaccount', accountCount: 1 },
    { name: 'X', icon: <Twitter className="h-7 w-7 text-white" />, connected: false },
    { name: 'Facebook', icon: <Facebook className="h-7 w-7 text-white" />, connected: true, accountId: '@myaccount', accountCount: 4 },
    { name: 'LinkedIn', icon: <Linkedin className="h-7 w-7 text-white" />, connected: false },
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

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Header Section */}
        <SocialHeader />
        
        {/* Social Media Accounts Section */}
        <SocialAccountsSection platforms={platforms} onConnect={handleConnect} />
        
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
      </div>
    </PageContainer>
  );
};

export default Social;
