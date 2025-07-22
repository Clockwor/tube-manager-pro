
import React from 'react';
import PageContainer from '@/components/PageContainer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import NodeEditor from '@/components/clips/NodeEditor';
import ProjectManagement from '@/components/clips/ProjectManagement';

const Clips = () => {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-tube-white mb-2">Clip Creation</h1>
        <p className="text-tube-white/70">Create and manage video clips</p>
      </div>
      
      <Tabs defaultValue="node-editor" className="w-full">
        <TabsList className="bg-tube-gray/40 mb-4">
          <TabsTrigger value="node-editor">Node Editor</TabsTrigger>
          <TabsTrigger value="project-management">Project Management</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
        </TabsList>
        
        <TabsContent value="node-editor">
          <div className="mb-4">
            <p className="text-tube-white/70 mb-4">
              Create video clips by connecting nodes in the workflow editor below.
              Drag nodes to reposition them and connect them to create your clip workflow.
            </p>
            <NodeEditor />
          </div>
        </TabsContent>
        
        <TabsContent value="project-management">
          <ProjectManagement />
        </TabsContent>
        
        <TabsContent value="assistant">
          <div className="glass-panel rounded-xl p-6 card-shadow flex flex-col items-center justify-center">
            <h2 className="text-xl font-medium text-tube-white mb-4">AI Clip Suggestions</h2>
            <p className="text-tube-white/70 text-center max-w-md mb-6">
              This feature will provide AI-powered suggestions for engaging moments in your videos.
            </p>
            <div className="bg-tube-red px-4 py-2 rounded-md text-white font-medium">
              Coming Soon
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Clips;
