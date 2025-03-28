
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundMessage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <h2 className="text-xl font-bold text-tube-white mb-4">Account not found</h2>
      <Button onClick={() => navigate('/social')} className="bg-purple-600 hover:bg-purple-700">
        Back to Social Media
      </Button>
    </div>
  );
};

export default NotFoundMessage;
