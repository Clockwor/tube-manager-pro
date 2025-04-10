
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Eye, Play, ChevronLeft, Search, 
  ArrowRight, Trash2, Edit, Settings, PlusCircle
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

// Example channel data
const channelData = {
  name: 'Tech Tutorials',
  subscribers: '120K',
  views: '5.2M',
  thumbnailUrl: 'https://via.placeholder.com/300x150/FF0000/FFFFFF?text=Tech',
  country: 'us',
  keywordData: {
    score: 75,
    status: 'Good',
    keywords: [
      { id: 1, text: 'coffee for beginners', volume: 2500, active: true },
      { id: 2, text: 'best coffee machines', volume: 4800, active: true },
      { id: 3, text: 'how to grind coffee', volume: 1500, active: false },
      { id: 4, text: 'coffee for programmers', volume: 1800, active: true }
    ],
    matchingKeywords: [
      { id: 5, text: 'coffee for developers', volume: 1200, active: true },
      { id: 6, text: 'best coffee types', volume: 2000, active: false },
      { id: 7, text: 'coffee for techies', volume: 1550, active: true }
    ],
    competitors: [
      { id: 8, text: 'best coffee for mornings', volume: 3200, active: false },
      { id: 9, text: 'how coffee affects productivity', volume: 1700, active: true },
      { id: 10, text: 'coffee for tech professionals', volume: 1200, active: true }
    ]
  },
  topVideos: [
    { 
      id: 1, 
      title: "How to Get Started with Coffee", 
      thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png", 
      views: "54K",
      channel: "Coffee Lovers",
      channelAvatar: "https://via.placeholder.com/40/FF6700/FFFFFF?text=CL"
    },
    { 
      id: 2, 
      title: "Perfect Bean Selection Guide", 
      thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png", 
      views: "32K",
      channel: "Morning Coffee",
      channelAvatar: "https://via.placeholder.com/40/00A3FF/FFFFFF?text=MC"
    },
    { 
      id: 3, 
      title: "RATHER DIE Than Drink Bad Coffee", 
      thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png", 
      views: "128K",
      channel: "TotalCoffee",
      channelAvatar: "https://via.placeholder.com/40/FF3A5E/FFFFFF?text=TC"
    },
    { 
      id: 4, 
      title: "Coffee Break: A Beginner's Guide", 
      thumbnail: "/lovable-uploads/240e0d77-7132-495e-9635-c33ba6cd2a66.png", 
      views: "28K",
      channel: "Coffee Daily",
      channelAvatar: "https://via.placeholder.com/40/55BB00/FFFFFF?text=CD"
    }
  ]
};

const countryFlags: Record<string, string> = {
  us: '🇺🇸',
  uk: '🇬🇧',
  ca: '🇨🇦',
  au: '🇦🇺',
  de: '🇩🇪',
  fr: '🇫🇷',
  jp: '🇯🇵',
  kr: '🇰🇷',
  cn: '🇨🇳',
  in: '🇮🇳',
  br: '🇧🇷',
  mx: '🇲🇽',
  es: '🇪🇸',
  it: '🇮🇹',
  ru: '🇷🇺',
  tr: '🇹🇷'
};

const ChannelManage = () => {
  const navigate = useNavigate();
  const { channelId } = useParams<{ channelId: string }>();
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Using hardcoded data since we don't have actual API integration
  const channel = channelData;
  
  const handleBackClick = () => {
    navigate('/channels');
  };

  // Calculate the gauge color based on the score
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4ade80'; // Green
    if (score >= 50) return '#facc15'; // Yellow
    return '#ef4444'; // Red
  };

  // Calculate the gauge rotation based on the score (0-100)
  const getGaugeRotation = (score: number) => {
    // Convert score to angle (-90 to 90 degrees)
    const angle = -90 + (score / 100) * 180;
    return `rotate(${angle}deg)`;
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackClick}
            className="text-tube-white hover:bg-tube-dark mr-2"
          >
            <ChevronLeft size={16} />
            <span>Back to Channels</span>
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-tube-white">{channel.name}</h1>
            {channel.country && countryFlags[channel.country] && (
              <span className="text-2xl" title={channel.country.toUpperCase()}>
                {countryFlags[channel.country]}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-tube-gray/40 text-tube-white border-tube-lightgray/20 hover:bg-tube-gray"
            >
              <Settings size={16} className="mr-2" />
              Settings
            </Button>
            <Button 
              className="bg-tube-red hover:bg-tube-darkred text-white"
            >
              View Studio
            </Button>
          </div>
        </div>
        
        <div className="mb-8 flex gap-6 items-center bg-tube-darkest p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded overflow-hidden border-2 border-tube-lightgray/20">
              <img 
                src={channel.thumbnailUrl} 
                alt={channel.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Users size={16} className="mr-1 text-tube-white/70" />
                <span className="text-tube-white">{channel.subscribers} subscribers</span>
              </div>
              <div className="flex items-center mb-2">
                <Eye size={16} className="mr-1 text-tube-white/70" />
                <span className="text-tube-white">{channel.views} views</span>
              </div>
              <div className="flex items-center">
                <Play size={16} className="mr-1 text-tube-white/70" />
                <span className="text-tube-white">87 videos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-tube-white mb-4">Keywords</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-tube-darkest border-tube-lightgray/20 p-6">
          <h3 className="text-xl font-bold text-tube-white mb-4">Channel: coffee for...</h3>
          
          <div className="flex justify-center mb-8">
            <div className="relative w-52 h-52">
              {/* Gauge Background */}
              <div className="absolute w-full h-full rounded-full border-[16px] border-gray-800"></div>
              
              {/* Gauge Segments */}
              <div className="absolute w-full h-full">
                <div className="absolute w-full h-full rounded-full border-[16px] border-t-red-500 border-r-transparent border-b-transparent border-l-transparent transform -rotate-90"></div>
                <div className="absolute w-full h-full rounded-full border-[16px] border-t-yellow-500 border-r-yellow-500 border-b-transparent border-l-transparent transform -rotate-90"></div>
                <div className="absolute w-full h-full rounded-full border-[16px] border-t-green-500 border-r-transparent border-b-transparent border-l-green-500 transform -rotate-90"></div>
              </div>
              
              {/* Gauge Needle */}
              <div 
                className="absolute w-full h-full flex justify-center"
                style={{ transform: getGaugeRotation(channel.keywordData.score) }}
              >
                <div className="w-1 h-1/2 bg-tube-white rounded-full transform origin-bottom"></div>
              </div>
              
              {/* Center Circle and Score */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-tube-darkest flex items-center justify-center">
                  <div className="text-4xl font-bold" style={{ color: getScoreColor(channel.keywordData.score) }}>
                    {channel.keywordData.score}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-red-500">LET'S FIX</div>
              <div className="text-sm text-tube-white/70">SCORE: 0-49</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-500">OK</div>
              <div className="text-sm text-tube-white/70">SCORE: 50-79</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-500">GOOD</div>
              <div className="text-sm text-tube-white/70">SCORE: 80+</div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              className="bg-tube-gray hover:bg-tube-lightgray text-white" 
              size="sm"
            >
              <PlusCircle size={16} className="mr-2" />
              Add Keywords
            </Button>
          </div>
        </Card>
        
        <Card className="bg-tube-darkest border-tube-lightgray/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-tube-white">Related Keywords</h3>
            <div className="flex items-center">
              <Search className="h-4 w-4 text-tube-white/70 absolute ml-2" />
              <Input 
                placeholder="Search" 
                className="pl-8 bg-tube-dark border-tube-lightgray/20 text-tube-white"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-auto max-h-[400px]">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-tube-lightgray/20">
                  <TableHead className="text-tube-white">Keyword</TableHead>
                  <TableHead className="text-tube-white text-right">Search volume</TableHead>
                  <TableHead className="text-tube-white text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {channel.keywordData.keywords.map((keyword) => (
                  <TableRow key={keyword.id} className="border-b border-tube-lightgray/20">
                    <TableCell className="text-tube-white">{keyword.text}</TableCell>
                    <TableCell className="text-tube-white text-right">{keyword.volume.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={keyword.active} 
                        className="data-[state=checked]:bg-green-500" 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline" 
              className="bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500/10" 
              size="sm"
            >
              Unlock With Boost
            </Button>
          </div>
        </Card>
        
        <Card className="bg-tube-darkest border-tube-lightgray/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-tube-white">Matching Keywords</h3>
            <div className="flex items-center gap-2">
              <Badge className="bg-tube-red text-white">7</Badge>
              <Search className="h-4 w-4 text-tube-white/70" />
            </div>
          </div>
          
          <div className="overflow-auto max-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-tube-lightgray/20">
                  <TableHead className="w-8 p-4">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="text-tube-white">Keyword</TableHead>
                  <TableHead className="text-tube-white text-right">Search volume</TableHead>
                  <TableHead className="text-tube-white text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {channel.keywordData.matchingKeywords.map((keyword) => (
                  <TableRow key={keyword.id} className="border-b border-tube-lightgray/20">
                    <TableCell className="p-4">
                      <Checkbox />
                    </TableCell>
                    <TableCell className="text-tube-white">{keyword.text}</TableCell>
                    <TableCell className="text-tube-white text-right">{keyword.volume.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={keyword.active} 
                        className="data-[state=checked]:bg-green-500" 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline" 
              className="bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500/10" 
              size="sm"
            >
              Unlock With Boost
            </Button>
          </div>
        </Card>
        
        <Card className="bg-tube-darkest border-tube-lightgray/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-tube-white">Competitors</h3>
            <div className="flex items-center gap-2">
              <Badge className="bg-tube-red text-white">5</Badge>
              <Search className="h-4 w-4 text-tube-white/70" />
            </div>
          </div>
          
          <div className="overflow-auto max-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-tube-lightgray/20">
                  <TableHead className="w-8 p-4">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="text-tube-white">Keyword</TableHead>
                  <TableHead className="text-tube-white text-right">Search volume</TableHead>
                  <TableHead className="text-tube-white text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {channel.keywordData.competitors.map((keyword) => (
                  <TableRow key={keyword.id} className="border-b border-tube-lightgray/20">
                    <TableCell className="p-4">
                      <Checkbox />
                    </TableCell>
                    <TableCell className="text-tube-white">{keyword.text}</TableCell>
                    <TableCell className="text-tube-white text-right">{keyword.volume.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={keyword.active} 
                        className="data-[state=checked]:bg-green-500" 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline" 
              className="bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500/10" 
              size="sm"
            >
              Unlock With Boost
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-tube-white mb-4">Top trending videos for coffee for...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channel.topVideos.map((video) => (
            <div key={video.id} className="bg-tube-darkest border border-tube-lightgray/20 rounded-lg overflow-hidden hover:border-tube-lightgray transition-all">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                  {video.views}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-tube-white text-sm mb-2 line-clamp-2">{video.title}</h3>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                    <img 
                      src={video.channelAvatar} 
                      alt={video.channel} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-tube-white/70 text-xs">{video.channel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default ChannelManage;
