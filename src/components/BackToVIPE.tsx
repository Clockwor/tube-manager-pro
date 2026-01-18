import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackToVIPEProps {
  className?: string;
}

const BackToVIPE: React.FC<BackToVIPEProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate('/vipe')}
      className={className}
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      VIP-E Sistemine Dön
    </Button>
  );
};

export default BackToVIPE;
