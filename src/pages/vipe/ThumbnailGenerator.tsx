import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ImageIcon, 
  Upload, 
  Wand2, 
  Download, 
  RefreshCw,
  Palette,
  Type,
  Layout
} from 'lucide-react';
import { useVIPE } from '@/hooks/useVIPE';
import { toast } from 'sonner';

const ThumbnailGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('viral');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedThumbnails, setGeneratedThumbnails] = useState<string[]>([]);
  const { generateThumbnails } = useVIPE();

  const styles = [
    { id: 'viral', name: 'Viral Style', description: 'Bold, colorful, eye-catching' },
    { id: 'minimal', name: 'Minimal', description: 'Clean, simple, professional' },
    { id: 'dramatic', name: 'Dramatic', description: 'High contrast, emotional' },
    { id: 'gaming', name: 'Gaming', description: 'Gaming-focused design' },
    { id: 'educational', name: 'Educational', description: 'Clean, informative' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a thumbnail description');
      return;
    }

    setIsGenerating(true);
    try {
      const thumbnails = await generateThumbnails({
        prompt,
        style,
        count: 4
      });
      setGeneratedThumbnails(thumbnails);
      toast.success('Thumbnails generated successfully!');
    } catch (error) {
      toast.error('Failed to generate thumbnails');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Thumbnail Generator</h1>
              <p className="text-muted-foreground">Create viral-style thumbnails with AI</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generation Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Generate Thumbnail
                </CardTitle>
                <CardDescription>
                  Describe your thumbnail concept and we'll create viral-style designs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Thumbnail Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="e.g., 'Young entrepreneur shocked by laptop screen showing profit graphs, bright office background'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Style</Label>
                  <div className="space-y-2">
                    {styles.map((styleOption) => (
                      <div
                        key={styleOption.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          style === styleOption.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setStyle(styleOption.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{styleOption.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {styleOption.description}
                            </div>
                          </div>
                          {style === styleOption.id && (
                            <Badge variant="default" className="text-xs">Selected</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Thumbnails
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Tools Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Design Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Type className="h-4 w-4 mr-2" />
                  Add Text Overlay
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Layout className="h-4 w-4 mr-2" />
                  Change Layout
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Base Image
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Generated Thumbnails</CardTitle>
                <CardDescription>
                  {generatedThumbnails.length > 0 
                    ? `${generatedThumbnails.length} thumbnails generated`
                    : 'Your generated thumbnails will appear here'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedThumbnails.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {generatedThumbnails.map((thumbnail, index) => (
                      <div key={index} className="space-y-3">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={thumbnail} 
                            alt={`Generated thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Wand2 className="h-4 w-4" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No thumbnails generated yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Enter a description and generate your first viral thumbnail
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ThumbnailGenerator;