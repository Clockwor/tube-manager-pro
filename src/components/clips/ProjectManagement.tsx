import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FolderPlus, 
  Upload, 
  FileText, 
  Scissors, 
  Languages, 
  Video, 
  BarChart3, 
  Image, 
  Send, 
  Grid3X3,
  Play,
  Pause,
  Download,
  Eye,
  Settings,
  Calendar,
  Tag,
  Globe
} from 'lucide-react';

const ProjectManagement = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');

  const channels = ['Kanal_A', 'Kanal_B', 'Kanal_C'];
  const projects = [
    { id: 1, name: 'Belgesel Projesi', status: '✅', progress: 85, channel: 'Kanal_A' },
    { id: 2, name: 'Haber Analizi', status: '🔄', progress: 60, channel: 'Kanal_B' },
    { id: 3, name: 'Eğitim Serisi', status: '❌', progress: 25, channel: 'Kanal_A' },
  ];

  return (
    <div className="space-y-6">
      {/* Multi-Channel Dashboard */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-tube-white">
            <Grid3X3 className="w-5 h-5" />
            Multi-Channel Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {channels.map(channel => (
              <Card key={channel} className="bg-tube-gray/20 border-tube-gray/40">
                <CardContent className="p-4">
                  <h3 className="text-tube-white font-medium mb-2">{channel}</h3>
                  <div className="text-sm text-tube-white/70">
                    <p>5 Active Projects</p>
                    <p>12 Videos Uploaded</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="space-y-2">
            <h4 className="text-tube-white font-medium">Recent Projects</h4>
            {projects.map(project => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-tube-gray/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{project.status}</span>
                  <div>
                    <p className="text-tube-white font-medium">{project.name}</p>
                    <p className="text-tube-white/70 text-sm">{project.channel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={project.progress} className="w-24" />
                  <span className="text-tube-white/70 text-sm">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="project-creation" className="w-full">
        <TabsList className="bg-tube-gray/40 mb-6 grid grid-cols-5 lg:grid-cols-10">
          <TabsTrigger value="project-creation">🎬 Project</TabsTrigger>
          <TabsTrigger value="upload">📥 Upload</TabsTrigger>
          <TabsTrigger value="transcription">📝 Transcript</TabsTrigger>
          <TabsTrigger value="segmentation">✂️ Scenes</TabsTrigger>
          <TabsTrigger value="translation">🌍 Translate</TabsTrigger>
          <TabsTrigger value="montage">🎞️ Montage</TabsTrigger>
          <TabsTrigger value="status">📊 Status</TabsTrigger>
          <TabsTrigger value="thumbnail">🎨 Thumbnail</TabsTrigger>
          <TabsTrigger value="publishing">📤 Publish</TabsTrigger>
          <TabsTrigger value="insights">📊 Insights</TabsTrigger>
        </TabsList>

        {/* Project Creation Panel */}
        <TabsContent value="project-creation">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <FolderPlus className="w-5 h-5" />
                Project Creation Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-tube-white text-sm font-medium mb-2 block">Project Name</label>
                  <Input placeholder="Enter project name" className="bg-tube-gray/20 border-tube-gray/40" />
                </div>
                <div>
                  <label className="text-tube-white text-sm font-medium mb-2 block">Channel</label>
                  <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                    <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40">
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      {channels.map(channel => (
                        <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-tube-white text-sm font-medium mb-2 block">Date</label>
                  <Input type="date" className="bg-tube-gray/20 border-tube-gray/40" />
                </div>
                <div>
                  <label className="text-tube-white text-sm font-medium mb-2 block">Target Language</label>
                  <Select>
                    <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Turkish</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-tube-white text-sm font-medium mb-2 block">Category Tags</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  <Badge variant="secondary">belgesel</Badge>
                  <Badge variant="secondary">haber</Badge>
                  <Badge variant="secondary">ders</Badge>
                </div>
                <Input placeholder="Add new tag" className="bg-tube-gray/20 border-tube-gray/40" />
              </div>
              <Button className="w-full bg-tube-red hover:bg-tube-red/80">
                <FolderPlus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Upload & Management */}
        <TabsContent value="upload">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Upload className="w-5 h-5" />
                Video Upload & Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-tube-gray/40 rounded-lg p-8 text-center mb-6">
                <Upload className="w-12 h-12 text-tube-white/50 mx-auto mb-4" />
                <p className="text-tube-white mb-2">Drag and drop videos here</p>
                <p className="text-tube-white/70 text-sm">Auto-renamed as kaynak_01.mp4, kaynak_02.mp4</p>
                <Button variant="outline" className="mt-4">Browse Files</Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-tube-white font-medium">Uploaded Videos</h4>
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-tube-gray/20 rounded-lg">
                    <div className="w-20 h-12 bg-tube-gray/40 rounded flex items-center justify-center">
                      <Video className="w-6 h-6 text-tube-white/50" />
                    </div>
                    <div className="flex-1">
                      <p className="text-tube-white font-medium">kaynak_0{i}.mp4</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">belgesel</Badge>
                        <Badge variant="secondary" className="text-xs">haber</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transcription Interface */}
        <TabsContent value="transcription">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <FileText className="w-5 h-5" />
                Transcription Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Video Player</h4>
                  <div className="aspect-video bg-tube-gray/20 rounded-lg flex items-center justify-center mb-4">
                    <Play className="w-12 h-12 text-tube-white/50" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </Button>
                    <Button size="sm" variant="outline">Generate Transcript</Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Transcript Editor</h4>
                  <Textarea 
                    placeholder="AI-generated transcript will appear here..."
                    className="h-64 bg-tube-gray/20 border-tube-gray/40 resize-none"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Save Transcript</Button>
                    <Button size="sm" variant="outline">Export SRT</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scene Segmentation Panel */}
        <TabsContent value="segmentation">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Scissors className="w-5 h-5" />
                Scene Segmentation Panel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="aspect-video bg-tube-gray/20 rounded-lg flex items-center justify-center">
                  <p className="text-tube-white/70">Timeline-based scene detection will appear here</p>
                </div>
                <div className="flex gap-4">
                  <Button>Auto Split Scenes</Button>
                  <Button variant="outline">Manual Split</Button>
                  <Button variant="outline">Export to /bolunmus_sahneler/</Button>
                </div>
                <div className="space-y-2">
                  <h4 className="text-tube-white font-medium">Detected Scenes</h4>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-3 bg-tube-gray/20 rounded-lg">
                      <span className="text-tube-white">Scene {i} (00:0{i}:00 - 00:0{i+1}:30)</span>
                      <Input placeholder="Add scene note" className="w-48 bg-tube-gray/40 border-tube-gray/60" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Translation & Subtitling Panel */}
        <TabsContent value="translation">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Languages className="w-5 h-5" />
                Translation & Subtitling Panel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Source Language</h4>
                  <Select>
                    <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40 mb-4">
                      <SelectValue placeholder="Turkish" />
                    </SelectTrigger>
                  </Select>
                  <Textarea 
                    placeholder="Source text..."
                    className="h-48 bg-tube-gray/20 border-tube-gray/40"
                  />
                </div>
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Target Language</h4>
                  <Select>
                    <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40 mb-4">
                      <SelectValue placeholder="English" />
                    </SelectTrigger>
                  </Select>
                  <Textarea 
                    placeholder="Translated text will appear here..."
                    className="h-48 bg-tube-gray/20 border-tube-gray/40"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button>Translate with DeepL</Button>
                <Button variant="outline">Generate TTS</Button>
                <Button variant="outline">Export SRT</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Montage Planning Board */}
        <TabsContent value="montage">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Video className="w-5 h-5" />
                Montage Planning Board
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="min-h-32 border-2 border-dashed border-tube-gray/40 rounded-lg p-4">
                  <p className="text-tube-white/70 text-center">Drag scene blocks here to create timeline</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-3 bg-tube-gray/20 rounded-lg cursor-move">
                      <div className="aspect-video bg-tube-gray/40 rounded mb-2 flex items-center justify-center">
                        <Video className="w-6 h-6 text-tube-white/50" />
                      </div>
                      <p className="text-tube-white text-sm">Scene {i}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button>Export to Premiere (.xml)</Button>
                  <Button variant="outline">Export to DaVinci (.drp)</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Project Status & Logs */}
        <TabsContent value="status">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <BarChart3 className="w-5 h-5" />
                Project Status & Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="p-4 bg-tube-gray/20 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{project.status}</span>
                        <div>
                          <h4 className="text-tube-white font-medium">{project.name}</h4>
                          <p className="text-tube-white/70 text-sm">{project.channel}</p>
                        </div>
                      </div>
                      <Badge variant={project.status === '✅' ? 'default' : project.status === '🔄' ? 'secondary' : 'destructive'}>
                        {project.progress}% Complete
                      </Badge>
                    </div>
                    <Progress value={project.progress} className="mb-3" />
                    <div className="text-sm text-tube-white/70">
                      <p>✅ Video uploaded</p>
                      <p>✅ Transcript generated</p>
                      <p>{project.progress > 50 ? '✅' : '🔄'} Scenes segmented</p>
                      <p>{project.progress > 80 ? '✅' : '⏳'} Translation completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Thumbnail & Metadata Creator */}
        <TabsContent value="thumbnail">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Image className="w-5 h-5" />
                Thumbnail & Metadata Creator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Thumbnail Generator</h4>
                  <div className="aspect-video bg-tube-gray/20 rounded-lg flex items-center justify-center mb-4">
                    <Image className="w-12 h-12 text-tube-white/50" />
                  </div>
                  <div className="flex gap-2">
                    <Button>Generate AI Thumbnail</Button>
                    <Button variant="outline">Upload Custom</Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-tube-white font-medium mb-4">Video Metadata</h4>
                  <div className="space-y-4">
                    <Input placeholder="Video title" className="bg-tube-gray/20 border-tube-gray/40" />
                    <Textarea placeholder="Video description" className="bg-tube-gray/20 border-tube-gray/40" />
                    <Input placeholder="Tags (comma separated)" className="bg-tube-gray/20 border-tube-gray/40" />
                    <Button className="w-full">Save to /yayin/</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Publishing & Insights Panel */}
        <TabsContent value="publishing">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <Send className="w-5 h-5" />
                Publishing & Insights Panel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-tube-white font-medium mb-4">Upload to YouTube</h4>
                    <div className="space-y-4">
                      <Select>
                        <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40">
                          <SelectValue placeholder="Select channel" />
                        </SelectTrigger>
                      </Select>
                      <Select>
                        <SelectTrigger className="bg-tube-gray/20 border-tube-gray/40">
                          <SelectValue placeholder="Privacy setting" />
                        </SelectTrigger>
                      </Select>
                      <Button className="w-full bg-tube-red hover:bg-tube-red/80">
                        <Send className="w-4 h-4 mr-2" />
                        Upload to YouTube
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-tube-white font-medium mb-4">Live Analytics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-tube-white">
                        <span>Views:</span>
                        <span>1,234</span>
                      </div>
                      <div className="flex justify-between text-tube-white">
                        <span>Likes:</span>
                        <span>45</span>
                      </div>
                      <div className="flex justify-between text-tube-white">
                        <span>Comments:</span>
                        <span>12</span>
                      </div>
                      <div className="flex justify-between text-tube-white">
                        <span>Retention:</span>
                        <span>78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights */}
        <TabsContent value="insights">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tube-white">
                <BarChart3 className="w-5 h-5" />
                Analytics & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 bg-tube-gray/20 rounded-lg flex items-center justify-center">
                  <p className="text-tube-white/70">Views Chart</p>
                </div>
                <div className="h-64 bg-tube-gray/20 rounded-lg flex items-center justify-center">
                  <p className="text-tube-white/70">Engagement Chart</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-tube-gray/20 rounded-lg">
                <h4 className="text-tube-white font-medium mb-2">AI Suggestions</h4>
                <p className="text-tube-white/70">Based on your analytics, consider uploading at 2 PM for better engagement.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagement;