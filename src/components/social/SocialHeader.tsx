
import React from 'react';
import { Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SocialHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-tube-white mb-2">Social Media</h1>
        <p className="text-tube-white/70">Share and promote your content across platforms</p>
      </div>
      <Button className="bg-purple-600 hover:bg-purple-700 gap-1">
        <Plus className="h-4 w-4" /> New project
      </Button>
    </div>
  );
};

export default SocialHeader;
