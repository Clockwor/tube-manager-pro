
import React from 'react';
import { Play, Users, Eye } from 'lucide-react';

interface ChannelCardProps {
  name: string;
  subscribers: string;
  views: string;
  thumbnailUrl: string;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ 
  name, 
  subscribers, 
  views, 
  thumbnailUrl 
}) => {
  return (
    <div className="glass-panel rounded-xl overflow-hidden hover-scale transition-all duration-300 card-shadow">
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
              <Play size={16} />
            )}
          </div>
          <h3 className="ml-2 font-bold text-white text-shadow truncate max-w-[180px]">{name}</h3>
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
          <button className="px-3 py-1.5 bg-tube-red hover:bg-tube-darkred text-white text-sm rounded-md transition-colors">
            Manage
          </button>
          <button className="px-3 py-1.5 bg-tube-gray hover:bg-tube-lightgray text-white text-sm rounded-md transition-colors">
            View Studio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
