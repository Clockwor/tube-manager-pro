
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Share2, Instagram, Twitter, Facebook } from 'lucide-react';

const SocialMediaPlanner = () => {
  const [postContent, setPostContent] = useState('');
  const [platform, setPlatform] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleSchedulePost = () => {
    console.log('Scheduling post:', {
      content: postContent,
      platform: platform,
      date: scheduledDate,
      time: scheduledTime
    });
  };

  const platforms = [
    { value: 'instagram', label: 'Instagram', icon: Instagram },
    { value: 'twitter', label: 'Twitter/X', icon: Twitter },
    { value: 'facebook', label: 'Facebook', icon: Facebook },
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-panel border-tube-lightgray/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-tube-white">
            <Share2 size={20} />
            Social Media Post Scheduler
          </CardTitle>
          <CardDescription className="text-tube-white/70">
            Schedule posts across your social media platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-tube-white">Post Content</label>
            <Textarea
              placeholder="What's on your mind? Write your social media post here..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white min-h-[120px]"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-tube-white">Platform</label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                {platforms.map((p) => (
                  <SelectItem key={p.value} value={p.value} className="text-tube-white hover:bg-tube-lightgray/20">
                    <div className="flex items-center gap-2">
                      <p.icon size={16} />
                      {p.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-tube-white flex items-center gap-2">
                <Calendar size={16} />
                Schedule Date
              </label>
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-tube-white flex items-center gap-2">
                <Clock size={16} />
                Schedule Time
              </label>
              <Input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white"
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button className="bg-tube-red hover:bg-tube-darkred text-white">
              <Share2 size={16} className="mr-2" />
              Post Now
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSchedulePost}
              className="border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/40"
            >
              Schedule Post
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-panel border-tube-lightgray/30">
        <CardHeader>
          <CardTitle className="text-tube-white">Scheduled Posts</CardTitle>
          <CardDescription className="text-tube-white/70">
            Your upcoming social media posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-tube-white/60">
            No scheduled posts yet. Schedule your first post above!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaPlanner;
