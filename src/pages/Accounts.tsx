
import React, { useState } from 'react';
import { User, Instagram, Youtube, Twitter, Facebook, Linkedin, MoreHorizontal } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SocialAccount } from '@/components/social/types';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AccountOwner {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture: string;
  socialAccounts: {
    platform: string;
    accounts: SocialAccount[];
  }[];
}

const Accounts = () => {
  const [activeTab, setActiveTab] = useState<string>('team');

  // Sample data for team members and account owners
  const accountOwners: AccountOwner[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'Account Manager',
      profilePicture: 'https://i.pravatar.cc/150?img=1',
      socialAccounts: [
        {
          platform: 'Instagram',
          accounts: [
            {
              id: 'ig1',
              username: '@traveldiaries',
              profilePicture: 'https://i.pravatar.cc/150?img=29',
              followers: 15700,
              following: 843,
              posts: 342
            }
          ]
        },
        {
          platform: 'TikTok',
          accounts: [
            {
              id: 'tik1',
              username: '@dancekween',
              profilePicture: 'https://i.pravatar.cc/150?img=32',
              followers: 23400,
              following: 342,
              posts: 87
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Michael Reeves',
      email: 'michael.r@example.com',
      role: 'Content Creator',
      profilePicture: 'https://i.pravatar.cc/150?img=3',
      socialAccounts: [
        {
          platform: 'Youtube',
          accounts: [
            {
              id: 'yt1',
              username: 'Tech Insights',
              profilePicture: 'https://i.pravatar.cc/150?img=59',
              followers: 31200,
              following: 0,
              posts: 87
            }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Jessica Liu',
      email: 'jessica.l@example.com',
      role: 'Social Media Manager',
      profilePicture: 'https://i.pravatar.cc/150?img=5',
      socialAccounts: [
        {
          platform: 'Facebook',
          accounts: [
            {
              id: 'fb1',
              username: 'Digital Marketing Pros',
              profilePicture: 'https://i.pravatar.cc/150?img=68',
              followers: 4200,
              following: 182,
              posts: 234
            },
            {
              id: 'fb2',
              username: 'Local Business Network',
              profilePicture: 'https://i.pravatar.cc/150?img=51',
              followers: 1200,
              following: 104,
              posts: 87
            }
          ]
        },
        {
          platform: 'Instagram',
          accounts: [
            {
              id: 'ig2',
              username: '@foodiehaven',
              profilePicture: 'https://i.pravatar.cc/150?img=17',
              followers: 8900,
              following: 372,
              posts: 156
            }
          ]
        }
      ]
    }
  ];

  const renderPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'Instagram':
        return <Instagram className="h-4 w-4" />;
      case 'TikTok':
        return <User className="h-4 w-4" />;
      case 'Youtube':
        return <Youtube className="h-4 w-4" />;
      case 'X':
        return <Twitter className="h-4 w-4" />;
      case 'Facebook':
        return <Facebook className="h-4 w-4" />;
      case 'LinkedIn':
        return <Linkedin className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-tube-white mb-2">Accounts</h1>
          <p className="text-tube-white/70">Manage your social media account owners and team members</p>
        </div>

        <Tabs defaultValue="team" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-tube-dark/60">
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="pending">Pending Invites</TabsTrigger>
          </TabsList>
          
          <TabsContent value="team" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accountOwners.map((owner) => (
                <Card key={owner.id} className="glass-panel bg-tube-gray/40 backdrop-blur-md border-tube-lightgray/20 text-tube-white">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-purple-500">
                          <AvatarImage src={owner.profilePicture} alt={owner.name} />
                          <AvatarFallback className="bg-purple-700 text-white">
                            {owner.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{owner.name}</CardTitle>
                          <CardDescription className="text-tube-white/70">{owner.role}</CardDescription>
                        </div>
                      </div>
                      
                      <NavigationMenu>
                        <NavigationMenuList>
                          <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent hover:bg-tube-lightgray/20 p-1">
                              <MoreHorizontal className="h-5 w-5 text-tube-white/70" />
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-tube-gray border-tube-lightgray/20">
                              <ul className="grid w-[180px] p-2 text-sm">
                                <li>
                                  <NavigationMenuLink asChild>
                                    <a href="#" className="block px-2 py-1 rounded hover:bg-tube-lightgray/20 text-tube-white">
                                      Edit Account
                                    </a>
                                  </NavigationMenuLink>
                                </li>
                                <li>
                                  <NavigationMenuLink asChild>
                                    <a href="#" className="block px-2 py-1 rounded hover:bg-tube-lightgray/20 text-tube-white">
                                      View Stats
                                    </a>
                                  </NavigationMenuLink>
                                </li>
                                <li>
                                  <NavigationMenuLink asChild>
                                    <a href="#" className="block px-2 py-1 rounded hover:bg-tube-lightgray/20 text-tube-white">
                                      Remove User
                                    </a>
                                  </NavigationMenuLink>
                                </li>
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="text-sm text-tube-white/70 mb-3">{owner.email}</div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-tube-white/90">Manages {owner.socialAccounts.reduce((acc, curr) => acc + curr.accounts.length, 0)} social accounts:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {owner.socialAccounts.map((platformData) => (
                          platformData.accounts.map((account) => (
                            <Tooltip key={account.id}>
                              <TooltipTrigger asChild>
                                <div className="relative group">
                                  <Avatar className="h-7 w-7 border border-tube-lightgray/40">
                                    <AvatarImage src={account.profilePicture} alt={account.username} />
                                    <AvatarFallback className="bg-tube-dark text-white text-xs">
                                      {platformData.platform.substring(0, 1)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-tube-dark flex items-center justify-center">
                                    {renderPlatformIcon(platformData.platform)}
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="bg-tube-gray border-tube-lightgray/20 text-tube-white">
                                <div className="text-xs">
                                  <div className="font-medium">{account.username}</div>
                                  <div className="text-tube-white/70">{platformData.platform}</div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          ))
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="flex items-center justify-center h-48">
            <div className="text-tube-white/50 text-center">
              <p>No pending invites</p>
              <p className="text-sm mt-1">Team members you invite will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Accounts;
