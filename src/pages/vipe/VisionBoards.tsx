import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout, Plus, Trash2, Edit2, Eye, Star, Calendar, Target, TrendingUp } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import BackToVIPE from '@/components/BackToVIPE';

interface VisionBoard {
  id: string;
  title: string;
  description: string;
  goals: string[];
  category: string;
  createdAt: Date;
  isStarred: boolean;
}

const VisionBoards = () => {
  const [boards, setBoards] = useState<VisionBoard[]>([
    {
      id: '1',
      title: 'Tech Channel Growth',
      description: 'Strategies and goals for growing my technology YouTube channel',
      goals: ['Reach 100K subscribers', 'Create viral tech review', 'Partner with major brands'],
      category: 'Technology',
      createdAt: new Date('2024-01-15'),
      isStarred: true,
    },
    {
      id: '2',
      title: 'Content Strategy 2024',
      description: 'Annual content planning and strategic direction',
      goals: ['Weekly upload schedule', 'Diversify content types', 'Build community'],
      category: 'Strategy',
      createdAt: new Date('2024-01-20'),
      isStarred: false,
    },
    {
      id: '3',
      title: 'Gaming Channel Vision',
      description: 'Building the ultimate gaming content empire',
      goals: ['Master new game genres', 'Collaborate with streamers', 'Launch merchandise'],
      category: 'Gaming',
      createdAt: new Date('2024-02-01'),
      isStarred: true,
    },
  ]);

  const [newBoard, setNewBoard] = useState({
    title: '',
    description: '',
    goals: '',
    category: '',
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const categories = ['Technology', 'Gaming', 'Education', 'Entertainment', 'Lifestyle', 'Business', 'Strategy'];

  const createBoard = () => {
    if (!newBoard.title.trim()) return;

    const board: VisionBoard = {
      id: Date.now().toString(),
      title: newBoard.title,
      description: newBoard.description,
      goals: newBoard.goals.split('\n').filter(goal => goal.trim()),
      category: newBoard.category,
      createdAt: new Date(),
      isStarred: false,
    };

    setBoards([board, ...boards]);
    setNewBoard({ title: '', description: '', goals: '', category: '' });
    setIsCreateDialogOpen(false);
  };

  const toggleStar = (boardId: string) => {
    setBoards(boards.map(board => 
      board.id === boardId ? { ...board, isStarred: !board.isStarred } : board
    ));
  };

  const deleteBoard = (boardId: string) => {
    setBoards(boards.filter(board => board.id !== boardId));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Gaming: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      Education: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      Entertainment: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      Lifestyle: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      Business: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      Strategy: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Back Button */}
        <BackToVIPE />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vision Boards</h1>
            <p className="text-muted-foreground">
              Create and track your content creation goals and aspirations
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Board
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Vision Board</DialogTitle>
                <DialogDescription>
                  Define your content creation goals and vision
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Board Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter board title..."
                    value={newBoard.title}
                    onChange={(e) => setNewBoard({ ...newBoard, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your vision..."
                    value={newBoard.description}
                    onChange={(e) => setNewBoard({ ...newBoard, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals">Goals (one per line)</Label>
                  <Textarea
                    id="goals"
                    placeholder="Enter your goals, one per line..."
                    value={newBoard.goals}
                    onChange={(e) => setNewBoard({ ...newBoard, goals: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newBoard.category} onValueChange={(value) => setNewBoard({ ...newBoard, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={createBoard} disabled={!newBoard.title.trim()}>
                    Create Board
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <Layout className="h-8 w-8 text-primary mr-3" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Boards</p>
                <p className="text-2xl font-bold">{boards.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Starred</p>
                <p className="text-2xl font-bold">{boards.filter(b => b.isStarred).length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Target className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Goals</p>
                <p className="text-2xl font-bold">{boards.reduce((acc, board) => acc + board.goals.length, 0)}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{new Set(boards.map(b => b.category)).size}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vision Boards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Card key={board.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{board.title}</CardTitle>
                    <Badge className={`text-xs ${getCategoryColor(board.category)}`}>
                      {board.category}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleStar(board.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Star className={`h-4 w-4 ${board.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                </div>
                <CardDescription className="text-sm">{board.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Goals ({board.goals.length})</h4>
                    <div className="space-y-1">
                      {board.goals.slice(0, 3).map((goal, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 flex-shrink-0" />
                          <span className="truncate">{goal}</span>
                        </div>
                      ))}
                      {board.goals.length > 3 && (
                        <p className="text-xs text-muted-foreground ml-3.5">
                          +{board.goals.length - 3} more goals
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {board.createdAt.toLocaleDateString()}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteBoard(board.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {boards.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Layout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Vision Boards Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first vision board to start planning your content creation journey
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Board
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default VisionBoards;