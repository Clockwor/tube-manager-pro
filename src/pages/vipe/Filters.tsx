import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Filter, X, Search, Save, Download } from 'lucide-react';
import { format } from 'date-fns';
import PageContainer from '@/components/PageContainer';
import { cn } from '@/lib/utils';

const Filters = () => {
  const [viewCountRange, setViewCountRange] = useState([0, 10000000]);
  const [subscriberRange, setSubscriberRange] = useState([0, 1000000]);
  const [outlierScore, setOutlierScore] = useState([50]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [duration, setDuration] = useState('');
  const [includeShorts, setIncludeShorts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Entertainment', 'Music', 'Gaming', 'Technology', 'Education',
    'Sports', 'Comedy', 'News & Politics', 'Science & Tech', 'Travel',
    'Lifestyle', 'Food & Cooking', 'Health & Fitness', 'Business'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Japanese',
    'Korean', 'Portuguese', 'Italian', 'Russian', 'Chinese'
  ];

  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const removeCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
  };

  const addLanguage = (language: string) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const removeLanguage = (language: string) => {
    setSelectedLanguages(selectedLanguages.filter(l => l !== language));
  };

  const clearAllFilters = () => {
    setViewCountRange([0, 10000000]);
    setSubscriberRange([0, 1000000]);
    setOutlierScore([50]);
    setDateRange({});
    setSelectedCategories([]);
    setSelectedLanguages([]);
    setDuration('');
    setIncludeShorts(false);
    setSearchQuery('');
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Advanced Filters</h1>
            <p className="text-muted-foreground">
              Fine-tune your search criteria to find the perfect content
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Filter
            </Button>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Basic Filters
              </CardTitle>
              <CardDescription>
                Set basic search parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search-query">Search Query</Label>
                <Input
                  id="search-query"
                  placeholder="Enter keywords, channel names, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any duration</SelectItem>
                    <SelectItem value="short">Short (&lt; 4 minutes)</SelectItem>
                    <SelectItem value="medium">Medium (4-20 minutes)</SelectItem>
                    <SelectItem value="long">Long (&gt; 20 minutes)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="include-shorts"
                  checked={includeShorts}
                  onCheckedChange={setIncludeShorts}
                />
                <Label htmlFor="include-shorts">Include YouTube Shorts</Label>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Filter by video and channel performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">
                    View Count Range: {viewCountRange[0].toLocaleString()} - {viewCountRange[1].toLocaleString()}
                  </Label>
                  <Slider
                    value={viewCountRange}
                    onValueChange={setViewCountRange}
                    max={10000000}
                    step={100000}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Subscriber Count Range: {subscriberRange[0].toLocaleString()} - {subscriberRange[1].toLocaleString()}
                  </Label>
                  <Slider
                    value={subscriberRange}
                    onValueChange={setSubscriberRange}
                    max={1000000}
                    step={10000}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Minimum Outlier Score: {outlierScore[0]}%
                  </Label>
                  <Slider
                    value={outlierScore}
                    onValueChange={setOutlierScore}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Range */}
          <Card>
            <CardHeader>
              <CardTitle>Date Range</CardTitle>
              <CardDescription>
                Filter content by publication date
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>To Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange.to && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>
                Select content categories to include
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <Badge key={category} variant="default" className="cursor-pointer">
                    {category}
                    <X
                      className="h-3 w-3 ml-1"
                      onClick={() => removeCategory(category)}
                    />
                  </Badge>
                ))}
              </div>
              
              <Select onValueChange={addCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Add category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter(cat => !selectedCategories.includes(cat))
                    .map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <CardDescription>
              Filter content by language
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedLanguages.map((language) => (
                <Badge key={language} variant="secondary" className="cursor-pointer">
                  {language}
                  <X
                    className="h-3 w-3 ml-1"
                    onClick={() => removeLanguage(language)}
                  />
                </Badge>
              ))}
            </div>
            
            <Select onValueChange={addLanguage}>
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="Add language" />
              </SelectTrigger>
              <SelectContent>
                {languages
                  .filter(lang => !selectedLanguages.includes(lang))
                  .map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="lg">
            <Download className="h-4 w-4 mr-2" />
            Export Filter
          </Button>
          <Button size="lg">
            <Search className="h-4 w-4 mr-2" />
            Search with Filters
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Filters;