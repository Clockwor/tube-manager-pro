import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FolderOpen, 
  Plus, 
  MoreVertical, 
  Trash2, 
  Edit,
  TrendingUp,
  Eye,
  Users,
  Calendar,
  Search
} from 'lucide-react';
import { useVIPE } from '@/hooks/useVIPE';
import { toast } from 'sonner';
import BackToVIPE from '@/components/BackToVIPE';

const TrackedChannels = () => {
  const [folders, setFolders] = useState([
    {
      id: '1',
      name: 'Tech Channels',
      channels: [
        {
          id: '1',
          name: 'Marques Brownlee',
          subscribers: 17500000,
          avgViews: 2500000,
          lastVideo: '2 days ago',
          growth: '+5.2%',
          outlierScore: 8.5
        },
        {
          id: '2',
          name: 'Linus Tech Tips',
          subscribers: 15200000,
          avgViews: 1800000,
          lastVideo: '1 day ago',
          growth: '+3.1%',
          outlierScore: 7.8
        }
      ]
    },
    {
      id: '2',
      name: 'Educational',
      channels: [
        {
          id: '3',
          name: 'Kurzgesagt',
          subscribers: 20100000,
          avgViews: 5200000,
          lastVideo: '1 week ago',
          growth: '+12.4%',
          outlierScore: 9.2
        }
      ]
    }
  ]);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolder, setShowNewFolder] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    
    const newFolder = {
      id: Date.now().toString(),
      name: newFolderName,
      channels: []
    };
    
    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setShowNewFolder(false);
    toast.success('Folder created successfully');
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGrowthColor = (growth: string) => {
    return growth.startsWith('+') ? 'text-green-400' : 'text-red-400';
  };

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Back Button */}
        <BackToVIPE />

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20">
              <FolderOpen className="h-8 w-8 text-orange-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tracked Channels</h1>
              <p className="text-muted-foreground">Organize and monitor your favorite YouTube channels</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Input placeholder="Search tracked channels..." />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Channel
            </Button>
          </div>
        </div>

        {/* Folders Grid */}
        <div className="grid gap-6">
          {folders.map((folder) => (
            <Card key={folder.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="h-6 w-6 text-orange-400" />
                    <div>
                      <CardTitle className="text-xl">{folder.name}</CardTitle>
                      <CardDescription>
                        {folder.channels.length} channel{folder.channels.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {folder.channels.length > 0 ? (
                  <div className="space-y-4">
                    {folder.channels.map((channel) => (
                      <div key={channel.id} className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                        {/* Channel Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                          {channel.name[0]}
                        </div>

                        {/* Channel Info */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{channel.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getScoreColor(channel.outlierScore)}>
                                {channel.outlierScore}/10
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{formatNumber(channel.subscribers)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{formatNumber(channel.avgViews)} avg</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{channel.lastVideo}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              <span className={getGrowthColor(channel.growth)}>
                                {channel.growth}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No channels in this folder yet</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Channel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* New Folder Card */}
          <Card className="border-dashed border-2">
            <CardContent className="py-12">
              {showNewFolder ? (
                <div className="space-y-4">
                  <Input
                    placeholder="Folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
                      Create Folder
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setShowNewFolder(false);
                      setNewFolderName('');
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Create New Folder</h3>
                  <p className="text-muted-foreground mb-4">
                    Organize your tracked channels into folders
                  </p>
                  <Button onClick={() => setShowNewFolder(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Folder
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default TrackedChannels;