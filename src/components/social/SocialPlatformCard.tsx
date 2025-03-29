
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SocialPlatformCardProps {
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  accountId?: string;
  onConnect: (platformName: string) => void;
}

const SocialPlatformCard: React.FC<SocialPlatformCardProps> = ({
  name,
  icon,
  connected,
  accountId,
  onConnect,
}) => {
  return (
    <Card className="border-tube-lightgray/30 bg-tube-gray/40 backdrop-blur-md relative group">
      <CardContent className="flex flex-col items-center justify-center p-6 relative">
        <button className="absolute top-2 right-2 text-tube-white/60 hover:text-tube-white">
          <MoreVertical className="h-5 w-5" />
        </button>
        
        <div className={`rounded-full p-3 ${
          name === 'TikTok' ? 'bg-black' :
          name === 'Instagram' ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400' :
          name === 'Youtube' ? 'bg-red-600' :
          name === 'X' ? 'bg-blue-400' :
          name === 'Facebook' ? 'bg-blue-600' :
          'bg-blue-700'
        }`}>
          {icon}
        </div>
        
        <h3 className="mt-3 font-semibold text-tube-white">{name}</h3>
        
        {connected ? (
          <Badge 
            variant="outline" 
            className="mt-3 px-3 py-1 bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1"
          >
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Connected
          </Badge>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 bg-transparent text-tube-white border-tube-lightgray/50 hover:bg-tube-lightgray/20"
            onClick={() => onConnect(name)}
          >
            Connect
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialPlatformCard;
