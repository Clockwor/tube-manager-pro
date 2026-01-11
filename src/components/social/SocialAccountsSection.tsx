import React from 'react';
import { Info, Plus, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SocialPlatformList from './SocialPlatformList';
import { SocialPlatform } from './types';

interface SocialAccountsSectionProps {
  platforms: SocialPlatform[];
  onConnect: (platformName: string) => void;
}

const SocialAccountsSection: React.FC<SocialAccountsSectionProps> = ({
  platforms,
  onConnect,
}) => {
  const connectedCount = platforms.filter(p => p.connected).length;
  const totalAccounts = platforms.reduce((acc, p) => acc + (p.accountCount || 0), 0);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-tube-white">Bağlı Hesaplar</h2>
            <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              {connectedCount} platform • {totalAccounts} hesap
            </Badge>
          </div>
          <p className="text-tube-white/60 mt-1">Sosyal medya hesaplarınızı bağlayın ve yönetin</p>
        </div>
        
        <Button variant="outline" className="border-tube-lightgray/30 gap-2">
          <Plus className="h-4 w-4" />
          Hesap Ekle
        </Button>
      </div>

      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-200 font-medium">Güvenli Bağlantı</p>
            <p className="text-blue-200/70 text-sm">
              Hesap bağlantıları OAuth 2.0 ile güvenli bir şekilde yapılmaktadır. 
              Şifreleriniz asla depolanmaz.
            </p>
          </div>
        </div>
      </div>
      
      <SocialPlatformList platforms={platforms} onConnect={onConnect} />
    </section>
  );
};

export default SocialAccountsSection;
