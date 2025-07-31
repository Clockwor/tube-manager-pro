
import React, { useState } from 'react';
import { Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateProjectDialog from './CreateProjectDialog';

const SocialHeader: React.FC = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-tube-white mb-2">Social Media</h1>
          <p className="text-tube-white/70">Share and promote your content across platforms</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 gap-1"
          onClick={() => setShowCreateProject(true)}
        >
          <Plus className="h-4 w-4" /> New project
        </Button>
      </div>
      
      <CreateProjectDialog
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
      />
    </>
  );
};

export default SocialHeader;
