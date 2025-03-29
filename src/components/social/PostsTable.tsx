
import React from 'react';
import { Music, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Post {
  id: string;
  title: string;
  date: string;
  platform: string;
  views: string;
  engagement: string;
  account: string;
}

interface PostsTableProps {
  posts: Post[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  activeTab,
  setActiveTab,
}) => {
  return (
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
                      <Music className="h-4 w-4" />
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
  );
};

export default PostsTable;
