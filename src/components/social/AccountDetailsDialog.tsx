
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SocialAccount } from './types';

interface AccountDetailsDialogProps {
  platform: string;
  accounts: SocialAccount[];
  isOpen: boolean;
  onClose: () => void;
}

const AccountDetailsDialog: React.FC<AccountDetailsDialogProps> = ({
  platform,
  accounts,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-tube-gray/90 backdrop-blur-md border-tube-lightgray/30 text-tube-white max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{platform} Accounts ({accounts.length})</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          {accounts.map((account) => (
            <div key={account.id} className="bg-tube-gray/60 rounded-lg p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0">
                <Avatar className="h-20 w-20 border-2 border-purple-500">
                  <AvatarImage src={account.profilePicture} alt={account.username} />
                  <AvatarFallback className="bg-purple-700 text-white text-lg">
                    {account.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{account.username}</h3>
                
                <div className="mt-3 grid grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col items-center p-2 bg-tube-gray/40 rounded-lg">
                    <span className="text-xl font-bold">{account.followers}</span>
                    <span className="text-sm text-tube-white/70">Followers</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-tube-gray/40 rounded-lg">
                    <span className="text-xl font-bold">{account.following}</span>
                    <span className="text-sm text-tube-white/70">Following</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-tube-gray/40 rounded-lg">
                    <span className="text-xl font-bold">{account.posts}</span>
                    <span className="text-sm text-tube-white/70">Posts</span>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-sm px-3 py-1"
                    onClick={() => window.location.href = `/social/manage/${account.id}`}
                  >
                    Yönet
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/20 text-sm px-3 py-1"
                    onClick={() => window.location.href = `/social/settings/${account.id}`}
                  >
                    Hesap Ayarları
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {accounts.length > 5 && (
          <div className="flex justify-center mt-4">
            <p className="text-tube-white/70">Showing all {accounts.length} accounts</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AccountDetailsDialog;
