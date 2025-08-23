import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bookmark, 
  Plus, 
  Search, 
  Filter,
  FolderOpen,
  MoreVertical,
  ExternalLink,
  Tag,
  Calendar,
  Lightbulb,
  Video,
  Image
} from 'lucide-react';

const Bookmarks = () => {
  const [bookmarks] = useState([
    {
      id: '1',
      type: 'idea',
      title: 'React Performance Optimization Tips',
      description: 'Video idea about common React performance pitfalls and how to avoid them',
      tags: ['react', 'performance', 'web-dev'],
      folder: 'Tech Content Ideas',
      createdAt: '2024-01-15',
      url: null
    },
    {
      id: '2',
      type: 'video',
      title: 'How I Built a Million Dollar SaaS',
      description: 'Great storytelling format for business content',
      tags: ['business', 'saas', 'storytelling'],
      folder: 'Business Inspiration',
      createdAt: '2024-01-14',
      url: 'https://youtube.com/watch?v=example'
    },
    {
      id: '3',
      type: 'thumbnail',
      title: 'Viral Thumbnail Style',
      description: 'Bold colors, shocked expression, money symbols',
      tags: ['design', 'viral', 'thumbnail'],
      folder: 'Thumbnail Ideas',
      createdAt: '2024-01-13',
      url: null
    }
  ]);

  const [folders] = useState([
    'All Bookmarks',
    'Tech Content Ideas',
    'Business Inspiration',
    'Thumbnail Ideas',
    'Title Templates',
    'Research'
  ]);

  const [selectedFolder, setSelectedFolder] = useState('All Bookmarks');
  const [searchQuery, setSearchQuery] = useState('');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'idea':
        return <Lightbulb className="h-4 w-4 text-yellow-400" />;
      case 'video':
        return <Video className="h-4 w-4 text-blue-400" />;
      case 'thumbnail':
        return <Image className="h-4 w-4 text-green-400" />;
      default:
        return <Bookmark className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'idea':
        return 'Idea';
      case 'video':
        return 'Video';
      case 'thumbnail':
        return 'Thumbnail';
      default:
        return 'Bookmark';
    }
  };

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesFolder = selectedFolder === 'All Bookmarks' || bookmark.folder === selectedFolder;
    const matchesSearch = searchQuery === '' || 
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFolder && matchesSearch;
  });

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-500/20">
              <Bookmark className="h-8 w-8 text-pink-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Bookmarks</h1>
              <p className="text-muted-foreground">Save and organize your content ideas and inspiration</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search bookmarks..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Bookmark
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Folders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {folders.map((folder) => (
                  <div
                    key={folder}
                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                      selectedFolder === folder 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedFolder(folder)}
                  >
                    <FolderOpen className="h-4 w-4" />
                    <span className="text-sm">{folder}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {selectedFolder} ({filteredBookmarks.length})
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {filteredBookmarks.length > 0 ? (
              <div className="space-y-4">
                {filteredBookmarks.map((bookmark) => (
                  <Card key={bookmark.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(bookmark.type)}
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {bookmark.title}
                            </h3>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {getTypeLabel(bookmark.type)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {bookmark.url && (
                            <Button size="sm" variant="outline">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">
                        {bookmark.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {bookmark.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(bookmark.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No bookmarks found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery 
                        ? 'Try adjusting your search or filter criteria'
                        : 'Start saving ideas, videos, and concepts you want to remember'
                      }
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Bookmark
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Bookmarks;