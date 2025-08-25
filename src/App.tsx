
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Index";
import Channels from "./pages/Channels";
import ChannelManage from "./pages/ChannelManage";
import ChannelFollowing from "./pages/ChannelFollowing";
import Discover from "./pages/Discover";
import Analytics from "./pages/Analytics";
import Upload from "./pages/Upload";
import Clips from "./pages/Clips";
import Transcription from "./pages/Transcription";
import Social from "./pages/Social";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import VIPE from "./pages/VIPE";
import IdeaGenerator from "./pages/vipe/IdeaGenerator";
import TitleGenerator from "./pages/vipe/TitleGenerator";
import OutliersHub from "./pages/vipe/OutliersHub";
import ThumbnailGenerator from "./pages/vipe/ThumbnailGenerator";
import NicheExplorer from "./pages/vipe/NicheExplorer";
import TrackedChannels from "./pages/vipe/TrackedChannels";
import Bookmarks from "./pages/vipe/Bookmarks";
import AIVideoInsights from "./pages/vipe/AIVideoInsights";
import SimilarTopics from "./pages/vipe/SimilarTopics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/channels/:channelId" element={<ChannelManage />} />
            <Route path="/channels/:channelId/following" element={<ChannelFollowing />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/clips" element={<Clips />} />
            <Route path="/transcription" element={<Transcription />} />
            <Route path="/social" element={<Social />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/vipe" element={<VIPE />} />
            <Route path="/vipe/ideas" element={<IdeaGenerator />} />
            <Route path="/vipe/titles" element={<TitleGenerator />} />
            <Route path="/vipe/outliers" element={<OutliersHub />} />
            <Route path="/vipe/thumbnails" element={<ThumbnailGenerator />} />
            <Route path="/vipe/niche" element={<NicheExplorer />} />
            <Route path="/vipe/tracked" element={<TrackedChannels />} />
            <Route path="/vipe/bookmarks" element={<Bookmarks />} />
            <Route path="/vipe/ai-insights" element={<AIVideoInsights />} />
            <Route path="/vipe/similar-topics" element={<SimilarTopics />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
