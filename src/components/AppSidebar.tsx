
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart2, Play, Film, Settings, Upload, Scissors, FileText, Share2, Menu, Home, Users, Zap } from 'lucide-react';

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const AppSidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { name: "Dashboard", path: "/", icon: <Home size={20} /> },
    { name: "My Channels", path: "/channels", icon: <Play size={20} /> },
    { name: "Discover", path: "/discover", icon: <BarChart2 size={20} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart2 size={20} /> },
    { name: "Upload & Schedule", path: "/upload", icon: <Upload size={20} /> },
    { name: "Clip Creation", path: "/clips", icon: <Scissors size={20} /> },
    { name: "Transcription", path: "/transcription", icon: <FileText size={20} /> },
    { name: "Social Media", path: "/social", icon: <Share2 size={20} /> },
    { name: "VIP-E System", path: "/vipe", icon: <Zap size={20} /> },
    { name: "Accounts", path: "/accounts", icon: <Users size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div 
      className={cn(
        "h-screen sticky top-0 bg-tube-dark border-r border-tube-lightgray/20 transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center px-4 h-16 border-b border-tube-lightgray/20">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")} style={{ width: '100%' }}>
          {!collapsed && (
            <div className="flex items-center">
              <Film className="h-6 w-6 text-tube-red mr-2" />
              <span className="font-bold text-lg text-tube-white">TubePro</span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md text-tube-white/70 hover:text-tube-white hover:bg-tube-lightgray/20 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200",
                  location.pathname === item.path 
                    ? "bg-tube-red text-white" 
                    : "text-tube-white/70 hover:text-tube-white hover:bg-tube-lightgray/20",
                  collapsed ? "justify-center" : ""
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-tube-lightgray/20">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-tube-red to-tube-darkred flex items-center justify-center text-white font-bold">
            U
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium text-tube-white">User Name</p>
              <p className="text-xs text-tube-white/60">Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
