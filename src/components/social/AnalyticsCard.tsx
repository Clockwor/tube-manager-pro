
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AnalyticsCardProps {
  accountName: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ accountName }) => {
  return (
    <Card className="border-tube-lightgray/30 bg-tube-gray/40 backdrop-blur-md lg:col-span-3">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-tube-white mb-4">Recent Analytics</h3>
        
        <div className="h-64 flex items-center justify-center text-tube-white/70">
          Analytics chart for {accountName} would be displayed here
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
