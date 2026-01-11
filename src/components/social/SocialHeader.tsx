import React, { useState } from 'react';
import { Plus, Info, Zap, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CreateProjectDialog from './CreateProjectDialog';

const SocialHeader: React.FC = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);

  // Mock quick stats
  const quickStats = {
    totalFollowers: '70.3K',
    weeklyGrowth: '+8.7%',
    activeAccounts: 6
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-tube-white mb-2">Sosyal Medya Yönetimi</h1>
            <p className="text-tube-white/70">Tüm sosyal medya hesaplarınızı tek yerden yönetin ve içerik paylaşın</p>
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 gap-2"
            onClick={() => setShowCreateProject(true)}
          >
            <Plus className="h-4 w-4" /> 
            Yeni Proje
          </Button>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-tube-gray/40 rounded-lg border border-tube-lightgray/20">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Users className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-tube-white/70">Toplam Takipçi</p>
              <p className="text-xl font-bold text-tube-white">{quickStats.totalFollowers}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-tube-gray/40 rounded-lg border border-tube-lightgray/20">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-tube-white/70">Haftalık Büyüme</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-tube-white">{quickStats.weeklyGrowth}</p>
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                  Artış
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-tube-gray/40 rounded-lg border border-tube-lightgray/20">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Zap className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-tube-white/70">Aktif Hesap</p>
              <p className="text-xl font-bold text-tube-white">{quickStats.activeAccounts}</p>
            </div>
          </div>
        </div>
      </div>
      
      <CreateProjectDialog
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
      />
    </>
  );
};

export default SocialHeader;
