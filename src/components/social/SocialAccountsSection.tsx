
import React from 'react';
import { Info } from 'lucide-react';
import SocialPlatformList from './SocialPlatformList';

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  accountId?: string;
  accountCount?: number;
}

interface SocialAccountsSectionProps {
  platforms: SocialPlatform[];
  onConnect: (platformName: string) => void;
}

const SocialAccountsSection: React.FC<SocialAccountsSectionProps> = ({
  platforms,
  onConnect,
}) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-tube-white">Your social media accounts</h2>
        <div className="flex items-center gap-2 text-tube-white/70 bg-tube-gray/40 px-3 py-1 rounded-full text-sm">
          <Info className="h-4 w-4" />
          <span>We use Ayrshare for seamless social posting. Your data is absolutely secure at all times.</span>
        </div>
      </div>
      
      <SocialPlatformList platforms={platforms} onConnect={onConnect} />
    </section>
  );
};

export default SocialAccountsSection;
