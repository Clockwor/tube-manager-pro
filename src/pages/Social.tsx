
import React from 'react';
import PageContainer from '@/components/PageContainer';

const Social = () => {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-tube-white mb-2">Social Media</h1>
        <p className="text-tube-white/70">Share and promote your content across platforms</p>
      </div>
      
      {/* Placeholder content */}
      <div className="glass-panel rounded-xl p-6 card-shadow flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium text-tube-white mb-4">Cross-Platform Sharing</h2>
        <p className="text-tube-white/70 text-center max-w-md mb-6">
          This page will allow you to share your content across multiple social media platforms with optimized formats and scheduling.
        </p>
        <div className="bg-tube-red px-4 py-2 rounded-md text-white font-medium">
          Coming Soon
        </div>
      </div>
    </PageContainer>
  );
};

export default Social;
