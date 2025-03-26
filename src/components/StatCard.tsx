
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  className 
}) => {
  return (
    <div className={cn(
      "glass-panel rounded-xl p-4 hover-scale transition-all duration-300 card-shadow",
      className
    )}>
      <div className="flex justify-between items-start mb-3">
        <p className="text-tube-white/70 text-sm font-medium">{title}</p>
        {icon && <span className="text-tube-white/90">{icon}</span>}
      </div>
      
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-tube-white mb-1">{value}</h3>
        
        {change && (
          <div className="flex items-center">
            <span className={cn(
              "text-xs font-medium flex items-center",
              change.type === 'increase' ? 'text-green-500' : 'text-red-500'
            )}>
              {change.type === 'increase' ? (
                <ArrowUpRight size={14} className="mr-1" />
              ) : (
                <ArrowDownRight size={14} className="mr-1" />
              )}
              {Math.abs(change.value)}%
            </span>
            <span className="text-xs text-tube-white/50 ml-1">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
