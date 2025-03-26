
import React from 'react';
import PageContainer from '@/components/PageContainer';

const Settings = () => {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-tube-white mb-2">Settings</h1>
        <p className="text-tube-white/70">Configure your account and preferences</p>
      </div>
      
      {/* Placeholder content */}
      <div className="glass-panel rounded-xl p-6 card-shadow flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium text-tube-white mb-4">Account Settings</h2>
        <p className="text-tube-white/70 text-center max-w-md mb-6">
          This page will allow you to manage your account settings, preferences, and integration options.
        </p>
        <div className="bg-tube-red px-4 py-2 rounded-md text-white font-medium">
          Coming Soon
        </div>
      </div>
    </PageContainer>
  );
};

export default Settings;
