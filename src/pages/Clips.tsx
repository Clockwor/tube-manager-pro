
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
      
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="bg-tube-gray/40 mb-4">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="node-editor">Node Editor</TabsTrigger>
          <TabsTrigger value="project-management">Project Management</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-tube-white mb-3">Create your first thumbnail.</h2>
              <p className="text-tube-white/70 text-lg">Simply type or pick one of the options below</p>
            </div>

            {/* Main Content Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-panel rounded-xl p-6 card-shadow hover:scale-105 transition-transform cursor-pointer group">
                <div className="flex items-center justify-center w-12 h-12 bg-tube-red/20 rounded-lg mb-4 group-hover:bg-tube-red/30 transition-colors">
                  <svg className="w-6 h-6 text-tube-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-tube-white mb-2">Add a Video</h3>
                <p className="text-tube-white/70">Analyze your content</p>
              </div>

              <div className="glass-panel rounded-xl p-6 card-shadow hover:scale-105 transition-transform cursor-pointer group">
                <div className="flex items-center justify-center w-12 h-12 bg-tube-red/20 rounded-lg mb-4 group-hover:bg-tube-red/30 transition-colors">
                  <svg className="w-6 h-6 text-tube-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-tube-white mb-2">Add a Subject</h3>
                <p className="text-tube-white/70">Include a person or object</p>
              </div>

              <div className="glass-panel rounded-xl p-6 card-shadow hover:scale-105 transition-transform cursor-pointer group">
                <div className="flex items-center justify-center w-12 h-12 bg-tube-red/20 rounded-lg mb-4 group-hover:bg-tube-red/30 transition-colors">
                  <svg className="w-6 h-6 text-tube-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-tube-white mb-2">Add a Reference</h3>
                <p className="text-tube-white/70">Inspire the design</p>
              </div>
            </div>

            {/* Creation Tools Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="glass-panel rounded-xl p-4 card-shadow">
                  <h3 className="text-lg font-semibold text-tube-white mb-4">Create</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-tube-gray/20 cursor-pointer transition-colors">
                      <div className="w-8 h-8 bg-tube-red/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-tube-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-tube-white font-medium">Thumbnails</p>
                        <p className="text-tube-white/60 text-sm">Create eye-catching thumbnails</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-tube-gray/20 cursor-pointer transition-colors">
                      <div className="w-8 h-8 bg-tube-red/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-tube-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v7M9 18v3h6v-3" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-tube-white font-medium">Clipping</p>
                        <p className="text-tube-white/60 text-sm">Create short clips from your videos</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-tube-gray/20 cursor-pointer transition-colors">
                      <div className="w-8 h-8 bg-tube-red/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-tube-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-tube-white font-medium">Daily Ideas</p>
                        <p className="text-tube-white/60 text-sm">Titles personalized to your channel</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-tube-gray/20 cursor-pointer transition-colors">
                      <div className="w-8 h-8 bg-tube-red/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-tube-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-tube-white font-medium">Script Writer</p>
                        <p className="text-tube-white/60 text-sm">Write scripts tailored to your channel</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-tube-gray/20 cursor-pointer transition-colors">
                      <div className="w-8 h-8 bg-tube-red/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-tube-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-tube-white font-medium">Generate</p>
                        <p className="text-tube-white/60 text-sm">Titles, outlines, and descriptions</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-tube-gray/20 cursor-pointer transition-colors">
                      <div className="w-8 h-8 bg-tube-red/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-tube-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-tube-white font-medium">Create</p>
                        <p className="text-tube-white/60 text-sm">Make new content from ideas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="glass-panel rounded-xl p-6 card-shadow">
                  <div className="border-2 border-dashed border-tube-gray/40 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-tube-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-tube-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-tube-white mb-2">Upload Your Content</h3>
                    <p className="text-tube-white/70 mb-4">Drag and drop your video files here, or click to browse</p>
                    <button className="bg-tube-red hover:bg-tube-red/80 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                      Choose Files
                    </button>
                  </div>

                  <div className="mt-6 p-4 bg-tube-gray/20 rounded-lg">
                    <p className="text-tube-white/70 text-sm mb-2">
                      <strong className="text-tube-white">Example:</strong> Create a thumbnail for a video with the title: "10 Magic Tricks With Hands Only | Revealed"
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-tube-red/20 text-tube-red px-3 py-1 rounded-full text-sm">Faces & Objects</span>
                      <span className="bg-tube-red/20 text-tube-red px-3 py-1 rounded-full text-sm">Reference</span>
                      <button className="bg-tube-red hover:bg-tube-red/80 text-white px-4 py-1 rounded-full text-sm font-medium ml-auto">
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
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
