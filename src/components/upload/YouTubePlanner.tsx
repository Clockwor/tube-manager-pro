
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Upload, Video } from 'lucide-react';

const YouTubePlanner = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleScheduleVideo = () => {
    console.log('Scheduling video:', {
      title: videoTitle,
      description: videoDescription,
      date: scheduledDate,
      time: scheduledTime
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass-panel border-tube-lightgray/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-tube-white">
            <Video size={20} />
            Video Upload & Schedule
          </CardTitle>
          <CardDescription className="text-tube-white/70">
            Upload and schedule your YouTube videos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-tube-white">Video Title</label>
            <Input
              placeholder="Enter video title..."
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-tube-white">Description</label>
            <Textarea
              placeholder="Enter video description..."
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              className="bg-tube-gray/40 border-tube-lightgray/30 text-tube-white min-h-[100px]"
            />
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
              <Upload size={16} className="mr-2" />
              Upload Now
            </Button>
            <Button 
              variant="outline" 
              onClick={handleScheduleVideo}
              className="border-tube-lightgray/30 text-tube-white hover:bg-tube-gray/40"
            >
              Schedule Video
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-panel border-tube-lightgray/30">
        <CardHeader>
          <CardTitle className="text-tube-white">Scheduled Videos</CardTitle>
          <CardDescription className="text-tube-white/70">
            Your upcoming video releases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-tube-white/60">
            No scheduled videos yet. Schedule your first video above!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubePlanner;
