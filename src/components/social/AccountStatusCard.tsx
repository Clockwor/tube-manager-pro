
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AccountStatusCardProps {
  status: string;
  statusColor: string;
}

const AccountStatusCard: React.FC<AccountStatusCardProps> = ({ status, statusColor }) => {
  return (
    <Card className="border-tube-lightgray/30 bg-tube-gray/40 backdrop-blur-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-tube-white mb-4">Account Status</h3>
        
        <div className="space-y-4">
          <Badge 
            variant="outline" 
            className={`px-4 py-2 ${statusColor} text-sm flex items-center gap-2 w-full justify-center`}
          >
            {status === 'Running' && (
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
            )}
            {status === 'Start' && (
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
            )}
            {status === 'Fix Issues' && (
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
            )}
            {status}
          </Badge>
          
          <Button 
            className={`w-full ${
              status === 'Running' ? 'bg-red-600 hover:bg-red-700' :
              status === 'Start' ? 'bg-green-600 hover:bg-green-700' :
              'bg-yellow-600 hover:bg-yellow-700'
            }`}
          >
            {status === 'Running' ? 'Stop' : 
             status === 'Start' ? 'Start' : 'Fix'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountStatusCard;
