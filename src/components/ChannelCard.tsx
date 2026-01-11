import React from 'react';
import { Users, Eye, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface ChannelCardProps {
  name: string;
  subscribers: string;
  views: string;
  thumbnailUrl: string;
  country?: string;
  id?: string;
  tags?: string[];
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
  country,
  id = '1',
  tags = []
}) => {
  const navigate = useNavigate();

  const handleManageClick = () => {
    navigate(`/channels/${id}`);
  };

  const handleFollowingChannelsClick = () => {
    navigate(`/channels/${id}/following`);
  };

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
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sm text-tube-white/70">
            <Users size={14} className="mr-1" />
            <span>{subscribers} subscribers</span>
          </div>
          <div className="flex items-center text-sm text-tube-white/70">
            <Eye size={14} className="mr-1" />
            <span>{views} views</span>
          </div>
        </div>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-tube-red/20 text-tube-red border-tube-red/30 hover:bg-tube-red/30"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs border-tube-lightgray/30 text-tube-white/60"
              >
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Country and Language indicators */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {country && countryFlags[country] && (
              <div className="flex items-center bg-tube-gray/30 px-2 py-1 rounded-full">
                <span className="text-lg">{countryFlags[country]}</span>
              </div>
            )}
            <div className="flex items-center bg-tube-gray/30 px-2 py-1 rounded-full">
              <span className="text-xs text-tube-white/80">🌐 EN</span>
            </div>
          </div>
          <div className="flex items-center text-xs text-tube-white/60">
            <span>📺 YouTube</span>
          </div>
        </div>
        
        <div className="flex justify-between gap-2">
          <Button 
            size="sm" 
            className="bg-tube-red hover:bg-tube-darkred text-white"
            onClick={handleManageClick}
          >
            Manage
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-tube-gray/40 text-tube-white border-tube-lightgray/20 hover:bg-tube-gray flex items-center gap-1"
            onClick={handleFollowingChannelsClick}
          >
            <Bell size={14} />
            Takipteki Kanallar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
