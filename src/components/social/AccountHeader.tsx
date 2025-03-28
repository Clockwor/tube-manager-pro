
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AccountHeaderProps {
  accountName: string;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({ accountName }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/social')}
        className="mr-4 text-tube-white hover:bg-tube-lightgray/20"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </Button>
      <h1 className="text-3xl font-bold text-tube-white">{accountName}</h1>
    </div>
  );
};

export default AccountHeader;
