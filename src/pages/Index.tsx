
import React from 'react';
import PageContainer from '@/components/PageContainer';
import StatCard from '@/components/StatCard';
import ChannelCard from '@/components/ChannelCard';
import VideoCard from '@/components/VideoCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import { Users, Eye, Clock, Film, Bell } from 'lucide-react';

// Mock data for the charts
const viewsData = [
  { name: 'Jan', views: 4000 },
  { name: 'Feb', views: 3000 },
  { name: 'Mar', views: 5000 },
  { name: 'Apr', views: 7000 },
  { name: 'May', views: 6000 },
  { name: 'Jun', views: 8000 },
  { name: 'Jul', views: 10000 },
];

const subscriberData = [
  { name: 'Jan', subscribers: 1200 },
  { name: 'Feb', subscribers: 1400 },
  { name: 'Mar', subscribers: 1500 },
  { name: 'Apr', subscribers: 1800 },
  { name: 'May', subscribers: 2300 },
  { name: 'Jun', subscribers: 2800 },
  { name: 'Jul', subscribers: 3500 },
];

const channelsData = [
  {
    name: 'Tech Tutorials',
    subscribers: '120K',
    views: '5.2M',
    thumbnailUrl: 'https://via.placeholder.com/300x150/FF0000/FFFFFF?text=Tech',
  },
  {
    name: 'Gaming Channel',
    subscribers: '85K',
    views: '3.8M',
    thumbnailUrl: 'https://via.placeholder.com/300x150/0000FF/FFFFFF?text=Gaming',
  },
  {
    name: 'Travel Vlogs',
    subscribers: '45K',
    views: '1.7M',
    thumbnailUrl: 'https://via.placeholder.com/300x150/00FF00/FFFFFF?text=Travel',
  },
];

const recentVideosData = [
  {
    title: 'How to Build a React App in 10 Minutes',
    views: '15K',
    likes: '1.2K',
    comments: '342',
    thumbnailUrl: 'https://via.placeholder.com/300x150/FF0000/FFFFFF?text=React',
    duration: '10:45',
    uploadDate: '2 days ago',
  },
  {
    title: 'The Ultimate Gaming Setup Tour 2023',
    views: '28K',
    likes: '3.5K',
    comments: '189',
    thumbnailUrl: 'https://via.placeholder.com/300x150/0000FF/FFFFFF?text=Gaming',
    duration: '15:20',
    uploadDate: '1 week ago',
  },
  {
    title: 'Exploring Hidden Gems in Tokyo - Travel Vlog',
    views: '32K',
    likes: '4.7K',
    comments: '256',
    thumbnailUrl: 'https://via.placeholder.com/300x150/00FF00/FFFFFF?text=Tokyo',
    duration: '22:17',
    uploadDate: '3 days ago',
  },
];

const Dashboard = () => {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-tube-white mb-2">Dashboard</h1>
        <p className="text-tube-white/70">Welcome back to your YouTube Studio</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Subscribers" 
          value="250,492" 
          change={{ value: 4.6, type: 'increase' }}
          icon={<Users size={18} />}
        />
        <StatCard 
          title="Total Views" 
          value="10.7M" 
          change={{ value: 8.3, type: 'increase' }}
          icon={<Eye size={18} />}
        />
        <StatCard 
          title="Watch Time (hrs)" 
          value="356,281" 
          change={{ value: 2.1, type: 'increase' }}
          icon={<Clock size={18} />}
        />
        <StatCard 
          title="Videos Published" 
          value="152" 
          change={{ value: 1.2, type: 'decrease' }}
          icon={<Film size={18} />}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AnalyticsChart 
          title="Views Growth" 
          data={viewsData}
          type="area"
          dataKeys={[{ key: 'views', color: '#FF0000' }]}
        />
        <AnalyticsChart 
          title="Subscriber Growth" 
          data={subscriberData}
          type="line"
          dataKeys={[{ key: 'subscribers', color: '#1D4ED8' }]}
        />
      </div>
      
      {/* Channels */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-tube-white">Your Channels</h2>
          <button className="px-3 py-1 bg-tube-gray hover:bg-tube-lightgray text-tube-white text-sm rounded-md transition-colors">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channelsData.map((channel, index) => (
            <ChannelCard key={index} {...channel} />
          ))}
        </div>
      </div>
      
      {/* Recent Videos */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-tube-white">Recent Videos</h2>
          <button className="px-3 py-1 bg-tube-gray hover:bg-tube-lightgray text-tube-white text-sm rounded-md transition-colors">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentVideosData.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
      </div>
      
      {/* Notifications */}
      <div className="glass-panel rounded-xl p-4 card-shadow">
        <div className="flex items-center mb-4">
          <Bell size={18} className="text-tube-red mr-2" />
          <h2 className="text-lg font-medium text-tube-white">Recent Notifications</h2>
        </div>
        <ul className="space-y-3">
          <li className="bg-tube-gray/40 p-3 rounded-md">
            <p className="text-tube-white">Your video "How to Build a React App" reached 10,000 views!</p>
            <p className="text-tube-white/60 text-sm mt-1">2 hours ago</p>
          </li>
          <li className="bg-tube-gray/40 p-3 rounded-md">
            <p className="text-tube-white">New comment on "The Ultimate Gaming Setup Tour 2023"</p>
            <p className="text-tube-white/60 text-sm mt-1">Yesterday</p>
          </li>
          <li className="bg-tube-gray/40 p-3 rounded-md">
            <p className="text-tube-white">Your scheduled video "Tokyo Travel Tips" will go live in 2 hours</p>
            <p className="text-tube-white/60 text-sm mt-1">Today</p>
          </li>
        </ul>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
