
import React from 'react';
import { Eye, MessageSquare, ThumbsUp, Clock } from 'lucide-react';

interface VideoCardProps {
  title: string;
  views: string;
  likes: string;
  comments: string;
  thumbnailUrl: string;
  duration: string;
  uploadDate: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  views,
  likes,
  comments,
  thumbnailUrl,
  duration,
  uploadDate,
}) => {
  return (
    <div className="glass-panel rounded-xl overflow-hidden hover-scale transition-all duration-300 card-shadow">
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-36 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-tube-darkest/80 text-white text-xs px-1.5 py-0.5 rounded">
          {duration}
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-tube-white mb-2 line-clamp-2" title={title}>
          {title}
        </h3>

        <div className="flex justify-between text-tube-white/70 text-xs mb-3">
          <span>{uploadDate}</span>
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            <span>Scheduled</span>
          </div>
        </div>

        <div className="flex justify-between text-tube-white/70 text-sm">
          <div className="flex items-center">
            <Eye size={14} className="mr-1" />
            <span>{views}</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp size={14} className="mr-1" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare size={14} className="mr-1" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
