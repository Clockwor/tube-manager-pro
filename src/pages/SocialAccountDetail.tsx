
import React from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import AccountHeader from '@/components/social/AccountHeader';
import AccountInfoCard from '@/components/social/AccountInfoCard';
import AccountStatusCard from '@/components/social/AccountStatusCard';
import AnalyticsCard from '@/components/social/AnalyticsCard';
import NotFoundMessage from '@/components/social/NotFoundMessage';
import { socialAccountsData } from '@/data/socialAccounts';

const SocialAccountDetail = () => {
  const { id } = useParams();
  
  const account = socialAccountsData.find(acc => acc.id === id);
  
  if (!account) {
    return (
      <PageContainer>
        <NotFoundMessage />
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <div className="space-y-8">
        <AccountHeader accountName={account.name} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AccountInfoCard 
            account={account}
            allAccounts={socialAccountsData}
          />
          
          <AccountStatusCard 
            status={account.status}
            statusColor={account.statusColor}
          />
          
          <AnalyticsCard accountName={account.name} />
        </div>
      </div>
    </PageContainer>
  );
};

export default SocialAccountDetail;
