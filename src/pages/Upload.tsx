
import React from 'react';
import PageContainer from '@/components/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import YouTubePlanner from '@/components/upload/YouTubePlanner';
import SocialMediaPlanner from '@/components/upload/SocialMediaPlanner';
import SocialMediaContentPlanner from '@/components/upload/SocialMediaContentPlanner';
import { Video, Share2, Calendar } from 'lucide-react';

const Upload = () => {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-tube-white mb-2">Upload & Schedule</h1>
        <p className="text-tube-white/70">Upload new videos and plan your content calendar</p>
      </div>
      
      <Tabs defaultValue="content-planner" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-tube-gray/40 border border-tube-lightgray/30">
          <TabsTrigger 
            value="content-planner" 
            className="flex items-center gap-2 data-[state=active]:bg-tube-red data-[state=active]:text-white text-tube-white/70"
          >
            <Calendar size={16} />
            İçerik Planlayıcı
          </TabsTrigger>
          <TabsTrigger 
            value="youtube" 
            className="flex items-center gap-2 data-[state=active]:bg-tube-red data-[state=active]:text-white text-tube-white/70"
          >
            <Video size={16} />
            YouTube Planner
          </TabsTrigger>
          <TabsTrigger 
            value="social" 
            className="flex items-center gap-2 data-[state=active]:bg-tube-red data-[state=active]:text-white text-tube-white/70"
          >
            <Share2 size={16} />
            Social Media Planner
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="content-planner" className="mt-0">
          <SocialMediaContentPlanner />
        </TabsContent>
        
        <TabsContent value="youtube" className="mt-0">
          <YouTubePlanner />
        </TabsContent>
        
        <TabsContent value="social" className="mt-0">
          <SocialMediaPlanner />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Upload;
