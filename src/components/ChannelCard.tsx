
import React from 'react';
import { Users, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ChannelCardProps {
  name: string;
  subscribers: string;
  views: string;
  thumbnailUrl: string;
  country?: string;
}

// Map of country codes to flag emojis
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

const ChannelCard: React.FC<ChannelCardProps> = ({ 
  name, 
  subscribers, 
  views, 
  thumbnailUrl,
  country
}) => {
  return (
    <div className="glass-panel rounded-xl overflow-hidden hover-scale transition-all duration-300 card-shadow bg-tube-darkest">
      <div 
        className="h-32 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-tube-darkest to-transparent"></div>
        <div className="absolute bottom-3 left-3 flex items-center">
          <div className="w-10 h-10 rounded-full bg-tube-red flex items-center justify-center text-white overflow-hidden border-2 border-tube-darkest">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="font-bold">{name.charAt(0)}</div>
            )}
          </div>
          <div className="ml-2 flex items-center">
            <h3 className="font-bold text-white text-shadow truncate max-w-[140px]">{name}</h3>
            {country && countryFlags[country] && (
              <span className="ml-2 text-lg" title={country.toUpperCase()}>{countryFlags[country]}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <div className="flex items-center text-sm text-tube-white/70">
            <Users size={14} className="mr-1" />
            <span>{subscribers} subscribers</span>
          </div>
          <div className="flex items-center text-sm text-tube-white/70">
            <Eye size={14} className="mr-1" />
            <span>{views} views</span>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            size="sm" 
            className="bg-tube-red hover:bg-tube-darkred text-white"
          >
            Manage
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-tube-gray/40 text-tube-white border-tube-lightgray/20 hover:bg-tube-gray"
          >
            View Studio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
