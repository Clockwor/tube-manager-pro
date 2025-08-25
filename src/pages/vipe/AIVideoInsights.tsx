import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Brain,
  Upload,
  Link,
  Play,
  Users,
  MapPin,
  Calendar,
  Tag,
  Lightbulb,
  FileText,
  Download,
  Share2,
  Copy,
  Clock,
  Quote,
  ExternalLink,
  User,
  Building,
  Activity
} from 'lucide-react';

const AIVideoInsights = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  // Mock data for demonstration
  const mockData = {
    outline: [
      {
        id: '1',
        timestamp: '0:00',
        title: 'Introduction to AI in YouTube',
        duration: '2:30',
        keyPoints: ['AI overview', 'YouTube integration', 'Benefits']
      },
      {
        id: '2',
        timestamp: '2:30',
        title: 'Content Analysis Features',
        duration: '3:45',
        keyPoints: ['Video breakdown', 'Entity detection', 'Insights generation']
      },
      {
        id: '3',
        timestamp: '6:15',
        title: 'Export and Integration Options',
        duration: '2:15',
        keyPoints: ['PDF export', 'Google Sheets', 'Social media']
      }
    ],
    entities: {
      people: [
        { name: 'John Smith', confidence: 95, appearances: 12 },
        { name: 'Sarah Johnson', confidence: 88, appearances: 8 }
      ],
      places: [
        { name: 'San Francisco', confidence: 92, context: 'Company headquarters' },
        { name: 'YouTube Studio', confidence: 85, context: 'Recording location' }
      ],
      events: [
        { name: 'Product Launch', confidence: 90, timestamp: '3:20' },
        { name: 'Demo Presentation', confidence: 87, timestamp: '5:45' }
      ],
      objects: [
        { name: 'Laptop', confidence: 95, frequency: 15 },
        { name: 'Microphone', confidence: 93, frequency: 12 }
      ]
    },
    insights: {
      summary: 'This video provides a comprehensive overview of AI-powered YouTube analytics tools, demonstrating how content creators can leverage artificial intelligence to gain deeper insights into their video performance and audience engagement.',
      keyQuotes: [
        'AI is revolutionizing how we understand video content',
        'Data-driven decisions lead to better content strategy',
        'The future of YouTube is in intelligent analytics'
      ],
      relatedSources: [
        {
          title: 'YouTube Analytics Best Practices',
          url: 'https://example.com/article1',
          domain: 'youtube.com',
          snippet: 'Learn how to optimize your YouTube analytics for better insights...'
        },
        {
          title: 'AI in Content Creation',
          url: 'https://example.com/article2',
          domain: 'techcrunch.com',
          snippet: 'How artificial intelligence is transforming content creation...'
        }
      ]
    }
  };

  const handleProcessVideo = () => {
    if (!videoUrl) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setHasResults(true);
    }, 3000);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    // Export logic would go here
  };

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
              <Brain className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Video Insights</h1>
              <p className="text-muted-foreground">Analyze YouTube videos with artificial intelligence</p>
            </div>
          </div>

          {/* Video Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Video Input
              </CardTitle>
              <CardDescription>
                Paste a YouTube video URL to start AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="https://youtube.com/watch?v=..." 
                    className="pl-10"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleProcessVideo}
                  disabled={!videoUrl || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Activity className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Analyze Video
                    </>
                  )}
                </Button>
              </div>
              
              {isProcessing && (
                <div className="text-center py-8">
                  <div className="animate-pulse space-y-2">
                    <div className="h-2 bg-primary/20 rounded w-3/4 mx-auto"></div>
                    <div className="h-2 bg-primary/20 rounded w-1/2 mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Analyzing video content with AI...
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {hasResults && (
          <Tabs defaultValue="outline" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Outline
              </TabsTrigger>
              <TabsTrigger value="entities" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Entities
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </TabsTrigger>
            </TabsList>

            {/* Outline Tab */}
            <TabsContent value="outline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Video Breakdown</CardTitle>
                  <CardDescription>
                    Structured outline with timestamps and key points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.outline.map((section, index) => (
                      <Card key={section.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {section.timestamp}
                              </Badge>
                              <h3 className="font-semibold">{section.title}</h3>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {section.duration}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {section.keyPoints.map((point, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {point}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Entities Tab */}
            <TabsContent value="entities" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* People */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      People
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockData.entities.people.map((person, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{person.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {person.confidence}% confidence
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {person.appearances} appearances
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Places */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Places
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockData.entities.places.map((place, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <span className="font-medium block">{place.name}</span>
                            <span className="text-xs text-muted-foreground">{place.context}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {place.confidence}% confidence
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockData.entities.events.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{event.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {event.confidence}% confidence
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {event.timestamp}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Objects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Objects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockData.entities.objects.map((object, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{object.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {object.confidence}% confidence
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {object.frequency} times
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-4">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Summary */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      AI Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {mockData.insights.summary}
                    </p>
                  </CardContent>
                </Card>

                {/* Key Quotes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Quote className="h-5 w-5" />
                      Key Quotes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockData.insights.keyQuotes.map((quote, index) => (
                      <div key={index} className="p-3 rounded-lg bg-muted/50 border-l-4 border-l-primary">
                        <p className="text-sm italic">"{quote}"</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Related Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Related Sources
                  </CardTitle>
                  <CardDescription>
                    Internet sources and articles related to the video content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mockData.insights.relatedSources.map((source, index) => (
                      <Card key={index} className="border hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm">{source.title}</h4>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{source.snippet}</p>
                          <Badge variant="outline" className="text-xs">
                            {source.domain}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Export Tab */}
            <TabsContent value="export" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Export Options
                    </CardTitle>
                    <CardDescription>
                      Download your analysis in various formats
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleExport('pdf')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as PDF
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleExport('csv')}>
                      <Download className="h-4 w-4 mr-2" />
                      Export as CSV
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleExport('sheets')}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Push to Google Sheets
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Share & Social
                    </CardTitle>
                    <CardDescription>
                      Quick sharing options for social media
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy for Social Media
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Analysis Link
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Create Summary Post
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </PageContainer>
  );
};

export default AIVideoInsights;