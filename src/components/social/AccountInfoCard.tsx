
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SocialAccount } from '@/types/social';
import SocialIcon from './SocialIcon';

interface AccountInfoCardProps {
  account: SocialAccount;
  allAccounts: SocialAccount[];
}

const AccountInfoCard: React.FC<AccountInfoCardProps> = ({ account, allAccounts }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="border-tube-lightgray/30 bg-tube-gray/40 backdrop-blur-md lg:col-span-2">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="h-20 w-20 rounded-full border-2 border-tube-lightgray/30">
            <AvatarImage src={account.avatar} alt={account.name} />
            <AvatarFallback className={`${account.platformColor} text-white text-xl`}>
              {account.avatarFallback}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold text-tube-white mr-2">{account.name}</h2>
                  <div className={`rounded-full p-1.5 ${account.platformColor} ml-1`}>
                    <SocialIcon iconName={account.iconName} />
                  </div>
                </div>
                <p className="text-tube-white/70">Last active: {account.lastActive}</p>
              </div>
              
              <div className="flex mt-3 sm:mt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border-tube-lightgray/30 text-tube-white mr-2"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-tube-white hover:bg-tube-lightgray/20"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-4">
              <div>
                <p className="text-tube-white/70 mb-1">Followers</p>
                <p className="text-xl font-bold text-tube-white">{account.followers}</p>
              </div>
              <div>
                <p className="text-tube-white/70 mb-1">Following</p>
                <p className="text-xl font-bold text-tube-white">{account.following}</p>
              </div>
            </div>
            
            {/* Connected Social Media Accounts */}
            <div>
              <p className="text-tube-white/70 mb-3">Connected Accounts</p>
              <div className="flex flex-wrap gap-2">
                {allAccounts.map((socialAccount) => (
                  <div
                    key={socialAccount.id}
                    className={`rounded-md p-2 ${socialAccount.platformColor} cursor-pointer hover:opacity-90 transition-opacity`}
                    onClick={() => navigate(`/social/${socialAccount.id}`)}
                  >
                    <SocialIcon iconName={socialAccount.iconName} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfoCard;
