import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vipeService } from '@/services/vipeService';
import { 
  VideoOutlier, 
  IdeaGeneration, 
  TitleGeneration, 
  ThumbnailAnalysis,
  NicheChannel,
  SearchFilters,
  ShortsOutlier,
  Bookmark,
  BookmarkFolder,
  TrackedChannelFolder
} from '@/types/vipe';
import { toast } from 'sonner';

// Ideas Hook
export const useIdeaGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateIdeas = useCallback(async (inputUrl: string, count?: number) => {
    setIsGenerating(true);
    try {
      const ideas = await vipeService.generateIdeas(inputUrl, count);
      toast.success(`Generated ${ideas.length} viral content ideas!`);
      return ideas;
    } catch (error) {
      toast.error('Failed to generate ideas');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { generateIdeas, isGenerating };
};

// Titles Hook
export const useTitleGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateTitles = useCallback(async (topic: string, niche: string, count?: number) => {
    setIsGenerating(true);
    try {
      const titles = await vipeService.generateTitles(topic, niche, count);
      toast.success(`Generated ${titles.length} viral titles!`);
      return titles;
    } catch (error) {
      toast.error('Failed to generate titles');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { generateTitles, isGenerating };
};

// Thumbnail Hook
export const useThumbnailGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateThumbnail = useCallback(async (prompt: string, style?: string) => {
    setIsGenerating(true);
    try {
      const thumbnailUrl = await vipeService.generateThumbnail(prompt, style);
      toast.success('Thumbnail generated successfully!');
      return thumbnailUrl;
    } catch (error) {
      toast.error('Failed to generate thumbnail');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const analyzeThumbnail = useCallback(async (imageUrl: string) => {
    try {
      return await vipeService.analyzeThumbnail(imageUrl);
    } catch (error) {
      toast.error('Failed to analyze thumbnail');
      throw error;
    }
  }, []);

  return { generateThumbnail, analyzeThumbnail, isGenerating };
};

// Outliers Hook
export const useOutliers = () => {
  const getChannelOutliers = useQuery({
    queryKey: ['channel-outliers'],
    queryFn: () => vipeService.getChannelOutliers('default'),
    enabled: false
  });

  const getRandomOutliers = useCallback(async (filters?: SearchFilters, count?: number) => {
    return await vipeService.getRandomOutliers(filters, count);
  }, []);

  const getShortsOutliers = useCallback(async (filters?: SearchFilters, count?: number) => {
    return await vipeService.getShortsOutliers(filters, count);
  }, []);

  return {
    getChannelOutliers: getChannelOutliers.data || [],
    getRandomOutliers,
    getShortsOutliers,
    isLoading: getChannelOutliers.isLoading,
    refetch: getChannelOutliers.refetch
  };
};

// Niche Explorer Hook
export const useNicheExplorer = () => {
  const [isExploring, setIsExploring] = useState(false);
  
  const exploreNiche = useCallback(async (keyword: string) => {
    setIsExploring(true);
    try {
      const channels = await vipeService.exploreNiche(keyword);
      toast.success(`Found ${channels.length} channels in the ${keyword} niche!`);
      return channels;
    } catch (error) {
      toast.error('Failed to explore niche');
      throw error;
    } finally {
      setIsExploring(false);
    }
  }, []);

  return { exploreNiche, isExploring };
};

// Thumbnail Search Hook
export const useThumbnailSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  
  const searchThumbnails = useCallback(async (query: string, filters?: SearchFilters) => {
    setIsSearching(true);
    try {
      return await vipeService.searchThumbnails(query, filters);
    } catch (error) {
      toast.error('Failed to search thumbnails');
      throw error;
    } finally {
      setIsSearching(false);
    }
  }, []);

  const findSimilarThumbnails = useCallback(async (imageUrl: string, count?: number) => {
    setIsSearching(true);
    try {
      return await vipeService.findSimilarThumbnails(imageUrl, count);
    } catch (error) {
      toast.error('Failed to find similar thumbnails');
      throw error;
    } finally {
      setIsSearching(false);
    }
  }, []);

  return { searchThumbnails, findSimilarThumbnails, isSearching };
};

// Similar Topics Hook
export const useSimilarTopics = () => {
  const [isSearching, setIsSearching] = useState(false);
  
  const findSimilarTopics = useCallback(async (videoId: string, count?: number) => {
    setIsSearching(true);
    try {
      return await vipeService.findSimilarTopics(videoId, count);
    } catch (error) {
      toast.error('Failed to find similar topics');
      throw error;
    } finally {
      setIsSearching(false);
    }
  }, []);

  return { findSimilarTopics, isSearching };
};

// Bookmarks Hook (Mock implementation)
export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [folders, setFolders] = useState<BookmarkFolder[]>([
    {
      id: 'default',
      name: 'Default',
      description: 'Default bookmark folder',
      color: '#4ECDC4',
      bookmarkCount: 0,
      createdAt: new Date().toISOString()
    }
  ]);

  const addBookmark = useCallback((bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `bookmark-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setBookmarks(prev => [...prev, newBookmark]);
    toast.success('Bookmark added!');
  }, []);

  const removeBookmark = useCallback((bookmarkId: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
    toast.success('Bookmark removed!');
  }, []);

  const createFolder = useCallback((folder: Omit<BookmarkFolder, 'id' | 'bookmarkCount' | 'createdAt'>) => {
    const newFolder: BookmarkFolder = {
      ...folder,
      id: `folder-${Date.now()}`,
      bookmarkCount: 0,
      createdAt: new Date().toISOString()
    };
    setFolders(prev => [...prev, newFolder]);
    toast.success('Folder created!');
  }, []);

  return {
    bookmarks,
    folders,
    addBookmark,
    removeBookmark,
    createFolder
  };
};

// Tracked Channels Hook (Mock implementation)
export const useTrackedChannels = () => {
  const [trackedFolders, setTrackedFolders] = useState<TrackedChannelFolder[]>([]);

  const createChannelFolder = useCallback((folder: Omit<TrackedChannelFolder, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newFolder: TrackedChannelFolder = {
      ...folder,
      id: `folder-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTrackedFolders(prev => [...prev, newFolder]);
    toast.success('Channel folder created!');
  }, []);

  const addChannelToFolder = useCallback((folderId: string, channelId: string) => {
    setTrackedFolders(prev => prev.map(folder => 
      folder.id === folderId 
        ? { ...folder, channelIds: [...folder.channelIds, channelId], updatedAt: new Date().toISOString() }
        : folder
    ));
    toast.success('Channel added to folder!');
  }, []);

  return {
    trackedFolders,
    createChannelFolder,
    addChannelToFolder
  };
};