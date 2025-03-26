
import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "p-6 animate-fade-in",
      className
    )}>
      {children}
    </div>
  );
};

export default PageContainer;
