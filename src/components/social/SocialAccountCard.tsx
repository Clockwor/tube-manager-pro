
import React from 'react';
import { MoreVertical } from 'lucide-react';
import SocialIcon from './SocialIcon';
import { Button } from '@/components/ui/button';

interface SocialAccountCardProps {
  platform: string;
  platformColor: string;
  iconName: string;
  connected: boolean;
  onConnect?: () => void;
  onMoreOptions?: () => void;
}

const SocialAccountCard: React.FC<SocialAccountCardProps> = ({
  platform,
  platformColor,
  iconName,
  connected,
  onConnect,
  onMoreOptions
}) => {
  // Generate platform-specific styling
  const iconBackgroundClass = 
    platform === 'Instagram' ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400' :
    platform === 'TikTok' ? 'bg-black' :
    platform === 'Youtube' ? 'bg-red-600' :
    platform === 'X' ? 'bg-blue-400' :
    platform === 'Facebook' ? 'bg-blue-600' :
    'bg-blue-700';

  return (
    <div className="relative bg-[#111] rounded-lg p-4 flex flex-col items-center justify-between h-[180px] w-full">
      {/* More options button */}
      <button 
        onClick={onMoreOptions}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        <MoreVertical size={18} />
      </button>
      
      {/* Icon */}
      <div className={`${iconBackgroundClass} rounded-full p-4 flex items-center justify-center w-16 h-16`}>
        <SocialIcon iconName={iconName} className="h-7 w-7" />
      </div>
      
      {/* Platform name */}
      <div className="text-white font-medium mt-2 mb-4">{platform}</div>
      
      {/* Connection status */}
      {connected ? (
        <div className="flex items-center gap-1 text-green-500 text-sm bg-green-500/10 px-3 py-1 rounded-full">
          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
          Connected
        </div>
      ) : (
        <Button 
          onClick={onConnect}
          variant="outline" 
          className="text-white border-gray-700 hover:bg-gray-800 text-sm px-4 py-1 h-8"
        >
          Connect
        </Button>
      )}
    </div>
  );
};

export default SocialAccountCard;
