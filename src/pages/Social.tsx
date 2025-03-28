
import React, { useState } from 'react';
import { Instagram, Youtube, Twitter, Facebook, Linkedin, TikTok, Plus, MoreVertical, Info } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
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
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    { name: 'TikTok', icon: <TikTok className="h-7 w-7 text-black" />, connected: true, accountId: '@myaccount' },
    { name: 'Instagram', icon: <Instagram className="h-7 w-7 text-white" />, connected: true, accountId: '@myaccount' },
    { name: 'Youtube', icon: <Youtube className="h-7 w-7 text-white" />, connected: true, accountId: '@myaccount' },
    { name: 'X', icon: <Twitter className="h-7 w-7 text-white" />, connected: false },
    { name: 'Facebook', icon: <Facebook className="h-7 w-7 text-white" />, connected: true, accountId: '@myaccount' },
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-tube-white mb-2">Social Media</h1>
            <p className="text-tube-white/70">Share and promote your content across platforms</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 gap-1">
            <Plus className="h-4 w-4" /> New project
          </Button>
        </div>
        
        {/* Social Media Accounts Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-tube-white">Your social media accounts</h2>
            <div className="flex items-center gap-2 text-tube-white/70 bg-tube-gray/40 px-3 py-1 rounded-full text-sm">
              <Info className="h-4 w-4" />
              <span>We use Ayrshare for seamless social posting. Your data is absolutely secure at all times.</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platforms.map((platform) => (
              <Card key={platform.name} className="border-tube-lightgray/30 bg-tube-gray/40 backdrop-blur-md relative group">
                <CardContent className="flex flex-col items-center justify-center p-6 relative">
                  <button className="absolute top-2 right-2 text-tube-white/60 hover:text-tube-white">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  
                  <div className={`rounded-full p-3 ${
                    platform.name === 'TikTok' ? 'bg-black' :
                    platform.name === 'Instagram' ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400' :
                    platform.name === 'Youtube' ? 'bg-red-600' :
                    platform.name === 'X' ? 'bg-blue-400' :
                    platform.name === 'Facebook' ? 'bg-blue-600' :
                    'bg-blue-700'
                  }`}>
                    {platform.icon}
                  </div>
                  
                  <h3 className="mt-3 font-semibold text-tube-white">{platform.name}</h3>
                  
                  {platform.connected ? (
                    <Badge 
                      variant="outline" 
                      className="mt-3 px-3 py-1 bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1"
                    >
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Connected
                    </Badge>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3 bg-transparent text-tube-white border-tube-lightgray/50 hover:bg-tube-lightgray/20"
                      onClick={() => handleConnect(platform.name)}
                    >
                      Connect
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Posts Section */}
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
                {/* These would be dropdowns in a real implementation */}
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
                            <TikTok className="h-4 w-4" />
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
