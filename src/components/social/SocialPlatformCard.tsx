import React from 'react';
import { MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SocialAccount } from './types';

interface SocialPlatformCardProps {
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  accountId?: string;
  accountCount?: number;
  accounts?: SocialAccount[];
  onConnect: (platformName: string) => void;
}

const SocialPlatformCard: React.FC<SocialPlatformCardProps> = ({
  name,
  icon,
  connected,
  accountId,
  accountCount,
  accounts = [],
  onConnect,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (connected) {
      navigate('/upload');
    }
  };

  return (
    <Card
      className={`border-tube-lightgray/30 bg-tube-gray/40 backdrop-blur-md relative group ${connected ? 'cursor-pointer hover:bg-tube-gray/60' : ''}`}
      onClick={handleCardClick}
    >
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
          <>
            <Badge
              variant="outline"
              className="mt-3 px-3 py-1 bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1"
            >
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Bağlı
            </Badge>
            {accountCount !== undefined && (
              <div className="mt-2 text-xs text-tube-white/70">
                {accountCount} hesap
              </div>
            )}
            {accounts.length > 0 && (
              <div className="mt-3 flex -space-x-2 overflow-hidden">
                {accounts.slice(0, 3).map((account) => (
                  <div
                    key={account.id}
                    className="inline-block h-6 w-6 rounded-full border border-tube-gray overflow-hidden"
                  >
                    <img
                      src={account.profilePicture}
                      alt={account.username}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${account.username.substring(0, 2)}&background=8B5CF6&color=fff`;
                      }}
                    />
                  </div>
                ))}
                {accounts.length > 3 && (
                  <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-tube-gray text-white text-xs font-medium">
                    +{accounts.length - 3}
                  </div>
                )}
              </div>
            )}
            <p className="mt-2 text-xs text-purple-400">Yönetim Paneli →</p>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="mt-3 bg-transparent text-tube-white border-tube-lightgray/50 hover:bg-tube-lightgray/20"
            onClick={(e) => {
              e.stopPropagation();
              onConnect(name);
            }}
          >
            Bağlan
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialPlatformCard;
