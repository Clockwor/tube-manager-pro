import React from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Type, 
  ImageIcon, 
  Search, 
  FolderOpen, 
  TrendingUp, 
  Bookmark, 
  Eye, 
  Copy, 
  Target, 
  LayoutGrid, 
  Filter, 
  Shuffle, 
  Zap,
  PlayCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VIPEFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  status: 'active' | 'beta' | 'coming-soon';
  category: 'generate' | 'discover' | 'analyze' | 'organize';
}

const vipeFeatures: VIPEFeature[] = [
  {
    id: 'idea-generator',
    title: 'Idea Generator',
    description: 'Generate viral content ideas from any video or channel URL',
    icon: <Lightbulb className="h-6 w-6" />,
    route: '/vipe/ideas',
    status: 'active',
    category: 'generate'
  },
  {
    id: 'title-generator',
    title: 'Title Generator',
    description: 'Create viral titles using proven successful formats',
    icon: <Type className="h-6 w-6" />,
    route: '/vipe/titles',
    status: 'active',
    category: 'generate'
  },
  {
    id: 'thumbnail-generator',
    title: 'Thumbnail Generator',
    description: 'Create and edit viral-style thumbnails with AI',
    icon: <ImageIcon className="h-6 w-6" />,
    route: '/vipe/thumbnails',
    status: 'active',
    category: 'generate'
  },
  {
    id: 'niche-explorer',
    title: 'Niche Explorer',
    description: 'Discover channels and content in any niche',
    icon: <Search className="h-6 w-6" />,
    route: '/vipe/niche',
    status: 'active',
    category: 'discover'
  },
  {
    id: 'tracked-channels',
    title: 'Tracked Channels',
    description: 'Organize channels in folders and track their performance',
    icon: <FolderOpen className="h-6 w-6" />,
    route: '/vipe/tracked',
    status: 'active',
    category: 'organize'
  },
  {
    id: 'homepage-outliers',
    title: 'Homepage Outliers',
    description: 'Find viral videos and unexpected performers',
    icon: <TrendingUp className="h-6 w-6" />,
    route: '/vipe/outliers',
    status: 'active',
    category: 'discover'
  },
  {
    id: 'bookmarks',
    title: 'Bookmarks',
    description: 'Save and organize ideas, videos, and concepts',
    icon: <Bookmark className="h-6 w-6" />,
    route: '/vipe/bookmarks',
    status: 'active',
    category: 'organize'
  },
  {
    id: 'thumbnail-search',
    title: 'Thumbnail Search',
    description: 'Search thumbnails by visual elements and content',
    icon: <Eye className="h-6 w-6" />,
    route: '/vipe/thumbnail-search',
    status: 'active',
    category: 'analyze'
  },
  {
    id: 'similar-thumbnails',
    title: 'Similar Thumbnails',
    description: 'Find visually similar thumbnails for analysis',
    icon: <Copy className="h-6 w-6" />,
    route: '/vipe/similar-thumbnails',
    status: 'active',
    category: 'analyze'
  },
  {
    id: 'similar-topics',
    title: 'Similar Topics',
    description: 'Explore thousands of videos on similar topics',
    icon: <Target className="h-6 w-6" />,
    route: '/vipe/similar-topics',
    status: 'active',
    category: 'discover'
  },
  {
    id: 'vision-boards',
    title: 'Vision Boards',
    description: 'Focus on pure visual design without distractions',
    icon: <LayoutGrid className="h-6 w-6" />,
    route: '/vipe/vision-boards',
    status: 'beta',
    category: 'analyze'
  },
  {
    id: 'advanced-filters',
    title: 'Advanced Filters',
    description: 'AI-powered filtering for all search results',
    icon: <Filter className="h-6 w-6" />,
    route: '/vipe/filters',
    status: 'active',
    category: 'discover'
  },
  {
    id: 'random-outliers',
    title: 'Random Outliers',
    description: 'Discover unexpected viral hits with random exploration',
    icon: <Shuffle className="h-6 w-6" />,
    route: '/vipe/random',
    status: 'active',
    category: 'discover'
  },
  {
    id: 'shorts-outliers',
    title: 'Shorts Outliers',
    description: 'Explore top-performing YouTube Shorts',
    icon: <Zap className="h-6 w-6" />,
    route: '/vipe/shorts',
    status: 'active',
    category: 'discover'
  },
  {
    id: 'shorts-thumbnails',
    title: 'Similar Shorts Thumbnails',
    description: 'Find similar thumbnails specifically for Shorts',
    icon: <PlayCircle className="h-6 w-6" />,
    route: '/vipe/shorts-thumbnails',
    status: 'beta',
    category: 'analyze'
  }
];

const categoryLabels = {
  generate: 'Content Generation',
  discover: 'Content Discovery',
  analyze: 'Visual Analysis',
  organize: 'Organization Tools'
};

const categoryColors = {
  generate: 'bg-green-500/10 text-green-400 border-green-500/20',
  discover: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  analyze: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  organize: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
};

const statusColors = {
  active: 'bg-green-500/10 text-green-400',
  beta: 'bg-yellow-500/10 text-yellow-400',
  'coming-soon': 'bg-gray-500/10 text-gray-400'
};

const VIPE = () => {
  const navigate = useNavigate();

  const groupedFeatures = vipeFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, VIPEFeature[]>);

  const handleFeatureClick = (feature: VIPEFeature) => {
    if (feature.status === 'coming-soon') {
      return;
    }
    navigate(feature.route);
  };

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            VIP-E System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Visual Intelligence Prompt Engineering - Your complete toolkit for YouTube content creation, 
            discovery, and viral optimization
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              15 Tools Active
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              AI-Powered
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              Real-time Data
            </span>
          </div>
        </div>

        {/* Feature Categories */}
        {Object.entries(groupedFeatures).map(([category, features]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-foreground">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h2>
              <Badge variant="outline" className={categoryColors[category as keyof typeof categoryColors]}>
                {features.length} Tools
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card 
                  key={feature.id}
                  className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/50 ${
                    feature.status === 'coming-soon' ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'
                  }`}
                  onClick={() => handleFeatureClick(feature)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${categoryColors[feature.category]}`}>
                          {feature.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold text-foreground">
                            {feature.title}
                          </CardTitle>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${statusColors[feature.status]}`}
                      >
                        {feature.status === 'coming-soon' ? 'Soon' : feature.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                    {feature.status !== 'coming-soon' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-3 w-full justify-start p-0 h-auto text-primary hover:text-primary/80"
                      >
                        Launch Tool →
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Stats */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-center">System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-400">15</div>
                <div className="text-sm text-muted-foreground">Active Tools</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-400">∞</div>
                <div className="text-sm text-muted-foreground">Content Ideas</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-400">AI</div>
                <div className="text-sm text-muted-foreground">Powered Analysis</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-orange-400">24/7</div>
                <div className="text-sm text-muted-foreground">Data Updates</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default VIPE;