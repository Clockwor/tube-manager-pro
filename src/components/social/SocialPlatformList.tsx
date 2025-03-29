
import React from 'react';
import SocialPlatformCard from './SocialPlatformCard';

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  accountId?: string;
  accountCount?: number;
}

interface SocialPlatformListProps {
  platforms: SocialPlatform[];
  onConnect: (platformName: string) => void;
}

const SocialPlatformList: React.FC<SocialPlatformListProps> = ({
  platforms,
  onConnect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {platforms.map((platform) => (
        <SocialPlatformCard
          key={platform.name}
          name={platform.name}
          icon={platform.icon}
          connected={platform.connected}
          accountId={platform.accountId}
          accountCount={platform.accountCount}
          onConnect={onConnect}
        />
      ))}
    </div>
  );
};

export default SocialPlatformList;
