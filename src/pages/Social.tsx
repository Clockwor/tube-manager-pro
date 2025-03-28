import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Info } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { socialAccountsData } from '@/data/socialAccounts';
import SocialAccountCard from '@/components/social/SocialAccountCard';

interface SocialPlatform {
  name: string;
  id: string;
  iconName: string;
  platformColor: string;
  connected: boolean;
  accountId?: string;
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
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(
    socialAccountsData.map(account => ({
      id: account.id,
      name: account.platform,
      iconName: account.iconName,
      platformColor: account.platformColor,
      connected: account.status === 'Running' || account.status === 'Start' || account.status === 'Fix Issues',
      accountId: account.name
    }))
  );

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
    <PageContainer className="bg-[#0a0a0a]">
      <div className="space-y-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Your social media accounts</h1>
          <div className="flex items-center gap-2 text-gray-400">
            <Info className="h-4 w-4" />
            <span className="text-sm">We use Ayrshare for seamless social posting. Your data is absolutely secure at all times.</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map((platform) => (
            <SocialAccountCard
              key={platform.id}
              platform={platform.name}
              platformColor={platform.platformColor}
              iconName={platform.iconName}
              connected={platform.connected}
              onConnect={() => handleConnect(platform.name)}
              onMoreOptions={() => platform.connected && handleAccountDetail(platform.id)}
            />
          ))}
        </div>
        
        <section className="glass-panel rounded-xl p-6 bg-[#111] mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Posts</h2>
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
              <TabsList className="bg-[#1a1a1a]">
                <TabsTrigger value="published" className="data-[state=active]:bg-[#333] text-gray-300">Published</TabsTrigger>
                <TabsTrigger value="scheduled" className="data-[state=active]:bg-[#333] text-gray-300">Scheduled</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="bg-transparent border-gray-700 text-gray-300">
                  Last 7 days
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent border-gray-700 text-gray-300">
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
                <p className="text-gray-400 mb-4">No scheduled posts.</p>
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
