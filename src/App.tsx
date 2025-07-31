import React, { useState, useEffect } from 'react';
import { 
  Upload, Settings, Play, CheckCircle, AlertCircle, Youtube, HardDrive as Drive, 
  Zap, BarChart3, Clock, Tag, FileText, Video, Calendar, TrendingUp, Eye, 
  ThumbsUp, MessageSquare, Share2, DollarSign, Target, Brain, Sparkles,
  Filter, Search, Download, Bell, Users, Globe, Smartphone, Monitor,
  PieChart, Activity, Award, Star, Flame, Hash, Image, Music, Palette,
  Wand2, RefreshCw, Save, Copy, ExternalLink, ChevronDown, ChevronUp,
  Plus, Minus, Edit3, Trash2, MoreHorizontal, PlayCircle, PauseCircle
} from 'lucide-react';
import ConnectionManager from './components/ConnectionManager';
import SetupWizard from './components/SetupWizard';

interface VideoFile {
  id: string;
  name: string;
  size: string;
  duration: string;
  thumbnail: string;
  status: 'pending' | 'processing' | 'uploading' | 'completed' | 'failed' | 'scheduled';
  progress: number;
  uploadedUrl?: string;
  generatedTitle?: string;
  generatedDescription?: string;
  tags?: string[];
  scheduledTime?: string;
  views?: number;
  likes?: number;
  comments?: number;
  revenue?: number;
  category?: string;
  language?: string;
  aiScore?: number;
  thumbnailOptions?: string[];
  selectedThumbnail?: number;
  musicTrack?: string;
  hashtags?: string[];
  targetAudience?: string;
  uploadTime?: string;
  viralPotential?: number;
}

interface AnalyticsData {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalRevenue: number;
  avgViralScore: number;
  topPerformingVideo: string;
  growthRate: number;
  engagementRate: number;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isConnectedDrive, setIsConnectedDrive] = useState(false);
  const [isConnectedYoutube, setIsConnectedYoutube] = useState(false);
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [showConnectionManager, setShowConnectionManager] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [aiOptimization, setAiOptimization] = useState(true);
  const [thumbnailGeneration, setThumbnailGeneration] = useState(true);
  const [musicGeneration, setMusicGeneration] = useState(false);
  const [targetLanguages, setTargetLanguages] = useState(['en', 'es', 'fr']);
  const [uploadFrequency, setUploadFrequency] = useState('optimal');
  const [contentStrategy, setContentStrategy] = useState('viral');
  
  const [uploadStats, setUploadStats] = useState({
    total: 0,
    completed: 0,
    failed: 0,
    pending: 0,
    processing: 0,
    scheduled: 0
  });

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 2847392,
    totalLikes: 184729,
    totalComments: 23847,
    totalRevenue: 4829.50,
    avgViralScore: 8.4,
    topPerformingVideo: 'Amazing_Sunset_Short.mp4',
    growthRate: 23.5,
    engagementRate: 12.8
  });

  // Enhanced sample video data
  useEffect(() => {
    const sampleVideos: VideoFile[] = [
      {
        id: '1',
        name: 'Amazing_Sunset_Short.mp4',
        size: '15.2 MB',
        duration: '0:58',
        thumbnail: 'https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
        status: 'completed',
        progress: 100,
        uploadedUrl: 'https://youtube.com/shorts/abc123',
        generatedTitle: '🌅 Breathtaking Sunset Views That Will Leave You Speechless! #Viral',
        generatedDescription: 'Experience the magic of golden hour with this stunning sunset compilation. Perfect lighting, amazing colors, and pure natural beauty captured in this short video. This breathtaking footage showcases nature at its finest, with vibrant oranges and pinks painting the sky in ways that will make you stop scrolling. Perfect for relaxation, meditation, or just appreciating the beauty of our world. Shot in 4K with professional equipment to bring you the highest quality experience. #Sunset #Nature #GoldenHour #Beautiful #Viral #Relaxing #Meditation #4K #Stunning #Breathtaking',
        tags: ['sunset', 'nature', 'beautiful', 'viral', 'shorts', 'relaxing', '4k', 'golden hour'],
        views: 847392,
        likes: 84729,
        comments: 3847,
        revenue: 1829.50,
        category: 'Nature & Travel',
        language: 'en',
        aiScore: 9.2,
        thumbnailOptions: [
          'https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg?auto=compress&cs=tinysrgb&w=300&h=400'
        ],
        selectedThumbnail: 0,
        musicTrack: 'Peaceful Ambient - Royalty Free',
        hashtags: ['#sunset', '#nature', '#viral', '#beautiful', '#relaxing'],
        targetAudience: 'Nature lovers, 18-45',
        uploadTime: '2024-01-15 18:30',
        viralPotential: 92
      },
      {
        id: '2',
        name: 'Cooking_Hack_Tutorial.mp4',
        size: '22.8 MB',
        duration: '0:45',
        thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
        status: 'processing',
        progress: 65,
        generatedTitle: '🍳 Mind-Blowing Cooking Hack You NEED to Try! #CookingHacks',
        generatedDescription: 'This simple cooking trick will save you time and make your food taste incredible! Easy to follow steps that anyone can master. Professional chefs have been using this secret technique for years, and now you can too! Perfect for busy people who want restaurant-quality results at home. This hack works with any type of cuisine and will revolutionize your cooking game forever. Save this video and thank me later! #CookingHacks #FoodTips #Kitchen #Viral #Cooking #ChefSecrets #FoodPrep #KitchenHacks #Recipes #FoodLover',
        tags: ['cooking', 'food', 'kitchen', 'hacks', 'tips', 'recipes', 'chef', 'tutorial'],
        category: 'Food & Cooking',
        language: 'en',
        aiScore: 8.7,
        thumbnailOptions: [
          'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=400'
        ],
        selectedThumbnail: 1,
        musicTrack: 'Upbeat Kitchen - Royalty Free',
        hashtags: ['#cookinghacks', '#foodtips', '#kitchen', '#viral', '#cooking'],
        targetAudience: 'Food enthusiasts, 25-55',
        viralPotential: 87
      },
      {
        id: '3',
        name: 'Workout_Motivation.mp4',
        size: '18.5 MB',
        duration: '0:52',
        thumbnail: 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
        status: 'scheduled',
        progress: 0,
        scheduledTime: '2024-01-16 06:00',
        generatedTitle: '💪 30-Second Workout That Changes Everything! #FitnessMotivation',
        generatedDescription: 'Transform your fitness routine with this powerful 30-second exercise. Perfect for busy people who want real results! This scientifically-proven workout technique has helped thousands of people achieve their fitness goals in record time. No equipment needed, no gym membership required - just you and 30 seconds of pure determination. Follow along and feel the burn! Your future self will thank you for starting today. #Fitness #Workout #Motivation #Health #Shorts #Exercise #NoEquipment #QuickWorkout #FitnessGoals #HealthyLifestyle',
        tags: ['fitness', 'workout', 'motivation', 'health', 'exercise', 'bodyweight', 'quick', 'results'],
        category: 'Sports & Fitness',
        language: 'en',
        aiScore: 8.9,
        thumbnailOptions: [
          'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=300&h=400'
        ],
        selectedThumbnail: 0,
        musicTrack: 'High Energy Workout - Royalty Free',
        hashtags: ['#fitness', '#workout', '#motivation', '#health', '#exercise'],
        targetAudience: 'Fitness enthusiasts, 18-40',
        viralPotential: 89
      },
      {
        id: '4',
        name: 'Tech_Review_iPhone.mp4',
        size: '28.3 MB',
        duration: '0:59',
        thumbnail: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
        status: 'pending',
        progress: 0,
        generatedTitle: '📱 iPhone 15 Pro Max: The Truth Nobody Tells You! #TechReview',
        generatedDescription: 'After using the iPhone 15 Pro Max for 30 days, here\'s what Apple doesn\'t want you to know! Honest review covering battery life, camera quality, performance, and whether it\'s worth the upgrade. No sponsored content, just real user experience and honest opinions. This comprehensive review will help you make the right decision before spending your hard-earned money. #iPhone15ProMax #TechReview #Apple #Smartphone #Technology #Review #Honest #Unbiased #TechTips #Mobile',
        tags: ['iphone', 'tech', 'review', 'apple', 'smartphone', 'technology', 'mobile', 'gadgets'],
        category: 'Science & Technology',
        language: 'en',
        aiScore: 9.1,
        thumbnailOptions: [
          'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300&h=400'
        ],
        selectedThumbnail: 0,
        musicTrack: 'Tech Background - Royalty Free',
        hashtags: ['#iphone15promax', '#techreview', '#apple', '#smartphone', '#technology'],
        targetAudience: 'Tech enthusiasts, 16-45',
        viralPotential: 91
      },
      {
        id: '5',
        name: 'Dance_Challenge_Viral.mp4',
        size: '19.7 MB',
        duration: '0:30',
        thumbnail: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
        status: 'uploading',
        progress: 85,
        generatedTitle: '💃 New Dance Challenge Taking Over TikTok! #DanceChallenge',
        generatedDescription: 'Learn the hottest dance moves that everyone\'s talking about! This viral dance challenge is sweeping social media and you don\'t want to miss out. Easy to follow tutorial with step-by-step breakdown. Perfect for beginners and experienced dancers alike. Tag your friends and let\'s see your version! #DanceChallenge #Viral #TikTok #Dance #Tutorial #Trending #Fun #Challenge #Social #Entertainment',
        tags: ['dance', 'challenge', 'viral', 'tiktok', 'trending', 'tutorial', 'fun', 'entertainment'],
        category: 'Entertainment',
        language: 'en',
        aiScore: 9.5,
        thumbnailOptions: [
          'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=300&h=400'
        ],
        selectedThumbnail: 1,
        musicTrack: 'Viral Dance Beat - Royalty Free',
        hashtags: ['#dancechallenge', '#viral', '#tiktok', '#dance', '#trending'],
        targetAudience: 'Gen Z, 13-25',
        viralPotential: 95
      },
      {
        id: '6',
        name: 'Life_Hack_Organization.mp4',
        size: '16.4 MB',
        duration: '0:41',
        thumbnail: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
        status: 'failed',
        progress: 0,
        generatedTitle: '🏠 Organization Hack That Will Change Your Life! #LifeHacks',
        generatedDescription: 'Discover the simple organization trick that will transform your living space and boost your productivity! This genius life hack takes less than 5 minutes but the results last forever. Perfect for small spaces, busy lifestyles, and anyone who wants a more organized life. You probably have everything you need at home already! #LifeHacks #Organization #Productivity #HomeHacks #Minimalism #CleanHome #OrganizedLife #HomeImprovement #DIY #Lifestyle',
        tags: ['lifehacks', 'organization', 'productivity', 'home', 'diy', 'lifestyle', 'minimalism', 'tips'],
        category: 'Howto & Style',
        language: 'en',
        aiScore: 8.3,
        thumbnailOptions: [
          'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
          'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=300&h=400'
        ],
        selectedThumbnail: 0,
        musicTrack: 'Calm Productivity - Royalty Free',
        hashtags: ['#lifehacks', '#organization', '#productivity', '#home', '#diy'],
        targetAudience: 'Lifestyle enthusiasts, 20-50',
        viralPotential: 83
      }
    ];
    
    setVideos(sampleVideos);
    
    // Calculate enhanced stats
    const stats = sampleVideos.reduce((acc, video) => {
      acc.total++;
      if (video.status === 'completed') acc.completed++;
      else if (video.status === 'failed') acc.failed++;
      else if (video.status === 'pending') acc.pending++;
      else if (video.status === 'processing') acc.processing++;
      else if (video.status === 'scheduled') acc.scheduled++;
      return acc;
    }, { total: 0, completed: 0, failed: 0, pending: 0, processing: 0, scheduled: 0 });
    
    setUploadStats(stats);
  }, []);

  const connectGoogleDrive = () => {
    setTimeout(() => {
      setIsConnectedDrive(true);
    }, 1500);
  };

  const connectYoutube = () => {
    setTimeout(() => {
      setIsConnectedYoutube(true);
    }, 1500);
  };

  const startAutomation = () => {
    if (!isConnectedDrive || !isConnectedYoutube) return;
    
    setIsAutoMode(true);
    videos.forEach((video, index) => {
      if (video.status === 'pending') {
        setTimeout(() => {
          setVideos(prev => prev.map(v => 
            v.id === video.id ? { ...v, status: 'processing' as const } : v
          ));
          
          setTimeout(() => {
            setVideos(prev => prev.map(v => 
              v.id === video.id ? { ...v, status: 'uploading' as const } : v
            ));
            
            const progressInterval = setInterval(() => {
              setVideos(prev => prev.map(v => {
                if (v.id === video.id && v.status === 'uploading') {
                  const newProgress = Math.min(v.progress + 15, 100);
                  if (newProgress === 100) {
                    clearInterval(progressInterval);
                    return { 
                      ...v, 
                      progress: newProgress, 
                      status: 'completed' as const,
                      uploadedUrl: `https://youtube.com/shorts/${video.id}`,
                      views: Math.floor(Math.random() * 100000),
                      likes: Math.floor(Math.random() * 10000),
                      comments: Math.floor(Math.random() * 1000)
                    };
                  }
                  return { ...v, progress: newProgress };
                }
                return v;
              }));
            }, 800);
          }, 2000);
        }, index * 3000);
      }
    });
  };

  const filteredVideos = videos.filter(video => {
    const matchesStatus = filterStatus === 'all' || video.status === filterStatus;
    const matchesSearch = video.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.generatedTitle?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const StatCard = ({ icon: Icon, title, value, color, subtitle, trend }: {
    icon: any;
    title: string;
    value: string | number;
    color: string;
    subtitle?: string;
    trend?: number;
  }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{title}</div>
          {trend && (
            <div className={`text-xs flex items-center gap-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              <TrendingUp className="w-3 h-3" />
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
      </div>
      {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
    </div>
  );

  const VideoCard = ({ video }: { video: VideoFile }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="flex gap-4">
        <div className="relative">
          <img 
            src={video.thumbnail} 
            alt={video.name}
            className="w-24 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PlayCircle className="w-8 h-8 text-white" />
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
          {video.viralPotential && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {video.viralPotential}%
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 truncate flex-1 mr-2">{video.name}</h3>
            <div className="flex items-center gap-2">
              {video.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {video.status === 'uploading' && <Clock className="w-5 h-5 text-blue-500 animate-pulse" />}
              {video.status === 'processing' && <Brain className="w-5 h-5 text-purple-500 animate-pulse" />}
              {video.status === 'scheduled' && <Calendar className="w-5 h-5 text-orange-500" />}
              {video.status === 'failed' && <AlertCircle className="w-5 h-5 text-red-500" />}
              {video.status === 'pending' && <Clock className="w-5 h-5 text-gray-400" />}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <span>{video.size}</span>
            <span>•</span>
            <span>{video.category}</span>
            {video.aiScore && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{video.aiScore}/10</span>
                </div>
              </>
            )}
          </div>
          
          {video.generatedTitle && (
            <div className="mb-3">
              <div className="text-xs text-gray-400 mb-1">AI Generated Title:</div>
              <div className="text-sm font-medium text-gray-700 line-clamp-2">{video.generatedTitle}</div>
            </div>
          )}

          {video.status === 'completed' && (
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {video.views?.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                {video.likes?.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                {video.comments?.toLocaleString()}
              </div>
              {video.revenue && (
                <div className="flex items-center gap-1 text-green-600">
                  <DollarSign className="w-3 h-3" />
                  ${video.revenue}
                </div>
              )}
            </div>
          )}

          {video.scheduledTime && video.status === 'scheduled' && (
            <div className="text-xs text-orange-600 mb-2">
              Scheduled: {new Date(video.scheduledTime).toLocaleString()}
            </div>
          )}
          
          {(video.status === 'uploading' || video.status === 'processing') && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{video.status === 'processing' ? 'AI Processing...' : 'Uploading...'}</span>
                <span>{video.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    video.status === 'processing' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                  style={{ width: `${video.progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {video.status === 'completed' && video.uploadedUrl && (
            <div className="flex items-center gap-2 mt-2">
              <a 
                href={video.uploadedUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 bg-red-50 px-2 py-1 rounded-full"
              >
                <Youtube className="w-3 h-3" />
                View on YouTube
              </a>
              <button className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-700 bg-gray-50 px-2 py-1 rounded-full">
                <Share2 className="w-3 h-3" />
                Share
              </button>
              <button className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-full">
                <BarChart3 className="w-3 h-3" />
                Analytics
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (showSetupWizard) {
    return <SetupWizard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">YouTube Automation Pro</h1>
                <p className="text-sm text-gray-500">AI-Powered Content Creation & Upload System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isConnectedDrive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                  <Drive className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Google Drive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isConnectedYoutube ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                  <Youtube className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">YouTube</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-400" />
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'videos', label: 'Video Queue', icon: Video },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'ai-studio', label: 'AI Studio', icon: Brain },
            { id: 'scheduler', label: 'Scheduler', icon: Calendar },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-red-600 shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              <StatCard
                icon={Video}
                title="Total Videos"
                value={uploadStats.total}
                color="bg-gradient-to-r from-blue-500 to-blue-600"
                trend={12.5}
              />
              <StatCard
                icon={CheckCircle}
                title="Completed"
                value={uploadStats.completed}
                color="bg-gradient-to-r from-green-500 to-green-600"
                trend={8.3}
              />
              <StatCard
                icon={Brain}
                title="Processing"
                value={uploadStats.processing}
                color="bg-gradient-to-r from-purple-500 to-purple-600"
              />
              <StatCard
                icon={Calendar}
                title="Scheduled"
                value={uploadStats.scheduled}
                color="bg-gradient-to-r from-orange-500 to-orange-600"
              />
              <StatCard
                icon={Clock}
                title="Pending"
                value={uploadStats.pending}
                color="bg-gradient-to-r from-yellow-500 to-yellow-600"
              />
              <StatCard
                icon={AlertCircle}
                title="Failed"
                value={uploadStats.failed}
                color="bg-gradient-to-r from-red-500 to-red-600"
                trend={-2.1}
              />
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  Performance Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Views</span>
                    <span className="font-bold text-2xl text-gray-900">{analytics.totalViews.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Likes</span>
                    <span className="font-bold text-xl text-gray-900">{analytics.totalLikes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Engagement Rate</span>
                    <span className="font-bold text-xl text-green-600">{analytics.engagementRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Revenue</span>
                    <span className="font-bold text-xl text-green-600">${analytics.totalRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-purple-500" />
                  AI Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avg Viral Score</span>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="font-bold text-xl text-gray-900">{analytics.avgViralScore}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Growth Rate</span>
                    <span className="font-bold text-xl text-green-600">+{analytics.growthRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Top Performer</span>
                    <span className="font-medium text-gray-900 truncate max-w-32">{analytics.topPerformingVideo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">AI Optimization</span>
                    <span className="font-bold text-xl text-purple-600">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
                AI-Powered Quick Start
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center group">
                  <div className={`p-6 rounded-2xl mb-4 transition-all duration-300 ${
                    isConnectedDrive ? 'bg-green-100 group-hover:bg-green-200' : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <Drive className={`w-10 h-10 mx-auto ${isConnectedDrive ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Connect Google Drive</h3>
                  <p className="text-sm text-gray-500 mb-4">Auto-sync your video files with AI analysis</p>
                  <button
                    onClick={connectGoogleDrive}
                    disabled={isConnectedDrive}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isConnectedDrive
                        ? 'bg-green-100 text-green-600 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105'
                    }`}
                  >
                    {isConnectedDrive ? '✓ Connected' : 'Connect Drive'}
                  </button>
                </div>

                <div className="text-center group">
                  <div className={`p-6 rounded-2xl mb-4 transition-all duration-300 ${
                    isConnectedYoutube ? 'bg-green-100 group-hover:bg-green-200' : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <Youtube className={`w-10 h-10 mx-auto ${isConnectedYoutube ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Connect YouTube</h3>
                  <p className="text-sm text-gray-500 mb-4">Enable automated uploads with AI optimization</p>
                  <button
                    onClick={connectYoutube}
                    disabled={isConnectedYoutube}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isConnectedYoutube
                        ? 'bg-green-100 text-green-600 cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600 transform hover:scale-105'
                    }`}
                  >
                    {isConnectedYoutube ? '✓ Connected' : 'Connect YouTube'}
                  </button>
                </div>

                <div className="text-center group">
                  <div className={`p-6 rounded-2xl mb-4 transition-all duration-300 ${
                    isAutoMode ? 'bg-purple-100 group-hover:bg-purple-200' : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <Zap className={`w-10 h-10 mx-auto ${isAutoMode ? 'text-purple-600 animate-pulse' : 'text-gray-400'}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Start AI Automation</h3>
                  <p className="text-sm text-gray-500 mb-4">Full AI-powered content pipeline</p>
                  <button
                    onClick={startAutomation}
                    disabled={!isConnectedDrive || !isConnectedYoutube || isAutoMode}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      !isConnectedDrive || !isConnectedYoutube
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : isAutoMode
                        ? 'bg-purple-100 text-purple-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transform hover:scale-105'
                    }`}
                  >
                    {isAutoMode ? '🤖 AI Running' : '🚀 Start AI'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Videos Tab */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            {/* Enhanced Filters and Controls */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search videos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
                    />
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="uploading">Uploading</option>
                    <option value="completed">Completed</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="failed">Failed</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="status">Sort by Status</option>
                    <option value="viral">Sort by Viral Score</option>
                    <option value="views">Sort by Views</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Monitor className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Smartphone className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Video className="w-6 h-6 text-red-500" />
                Video Queue ({filteredVideos.length})
              </h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  {videos.filter(v => v.status === 'completed').length} uploaded • 
                  {videos.filter(v => v.status === 'processing').length} processing • 
                  {videos.filter(v => v.status === 'pending').length} pending
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
                  <Plus className="w-4 h-4" />
                  Add Videos
                </button>
                <button 
                  onClick={() => setShowSetupWizard(true)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Setup Wizard"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              {filteredVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-green-500" />
              Advanced Analytics
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Trends</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Interactive charts and graphs would be displayed here</p>
                    <p className="text-sm">Showing views, engagement, and revenue over time</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Top Performers
                  </h3>
                  <div className="space-y-3">
                    {videos.filter(v => v.status === 'completed').slice(0, 3).map((video, index) => (
                      <div key={video.id} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-600' :
                          index === 1 ? 'bg-gray-100 text-gray-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {index + 1}
                        </div>
                        <img src={video.thumbnail} alt="" className="w-8 h-10 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{video.name}</p>
                          <p className="text-xs text-gray-500">{video.views?.toLocaleString()} views</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    Audience Insights
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Primary Age Group</span>
                      <span className="text-sm font-medium">18-34 (68%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Top Location</span>
                      <span className="text-sm font-medium">United States</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Peak Watch Time</span>
                      <span className="text-sm font-medium">7-9 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Mobile vs Desktop</span>
                      <span className="text-sm font-medium">85% / 15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Studio Tab */}
        {activeTab === 'ai-studio' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-500" />
              AI Content Studio
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Wand2 className="w-6 h-6 text-purple-500" />
                  AI Title Generator
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video Topic/Keywords</label>
                    <input
                      type="text"
                      placeholder="e.g., cooking hack, sunset, workout"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>General Audience</option>
                      <option>Gen Z (13-25)</option>
                      <option>Millennials (26-40)</option>
                      <option>Gen X (41-55)</option>
                      <option>Boomers (56+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Style</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Viral & Catchy</option>
                      <option>Educational</option>
                      <option>Entertaining</option>
                      <option>Inspirational</option>
                      <option>How-to Guide</option>
                    </select>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Generate AI Titles
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Image className="w-6 h-6 text-blue-500" />
                  AI Thumbnail Creator
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Style</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>High Energy</option>
                      <option>Minimalist</option>
                      <option>Colorful & Bold</option>
                      <option>Professional</option>
                      <option>Trendy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Overlay</label>
                    <input
                      type="text"
                      placeholder="e.g., AMAZING!, WOW, MUST SEE"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
                    <div className="flex gap-2">
                      {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500'].map(color => (
                        <button key={color} className={`w-8 h-8 rounded-full ${color} hover:scale-110 transition-transform`}></button>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2">
                    <Palette className="w-5 h-5" />
                    Generate Thumbnails
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Hash className="w-6 h-6 text-green-500" />
                AI Hashtag & SEO Optimizer
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Content</label>
                  <textarea
                    placeholder="Describe your video content..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Keywords</label>
                  <textarea
                    placeholder="Enter keywords separated by commas..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Competition Level</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4">
                    <option>Low Competition</option>
                    <option>Medium Competition</option>
                    <option>High Competition</option>
                  </select>
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2">
                    <Target className="w-5 h-5" />
                    Optimize SEO
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scheduler Tab */}
        {activeTab === 'scheduler' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-orange-500" />
              Smart Scheduler
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Upload Calendar</h3>
                <div className="h-96 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Interactive calendar would be displayed here</p>
                    <p className="text-sm">Showing scheduled uploads and optimal posting times</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Optimal Times
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monday</span>
                      <span className="text-sm font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded">7-9 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tuesday</span>
                      <span className="text-sm font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded">6-8 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Wednesday</span>
                      <span className="text-sm font-medium bg-green-100 text-green-600 px-2 py-1 rounded">8-10 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Thursday</span>
                      <span className="text-sm font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded">7-9 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Friday</span>
                      <span className="text-sm font-medium bg-green-100 text-green-600 px-2 py-1 rounded">5-7 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Weekend</span>
                      <span className="text-sm font-medium bg-purple-100 text-purple-600 px-2 py-1 rounded">12-2 PM</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-500" />
                    Auto-Schedule
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Smart Scheduling</span>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Frequency</span>
                      <select className="text-sm border border-gray-300 rounded px-2 py-1">
                        <option>Daily</option>
                        <option>Every 2 hours</option>
                        <option>Twice daily</option>
                        <option>Weekly</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Time Zone</span>
                      <select className="text-sm border border-gray-300 rounded px-2 py-1">
                        <option>EST</option>
                        <option>PST</option>
                        <option>GMT</option>
                        <option>CET</option>
                      </select>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 text-sm">
                      Apply Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Settings className="w-6 h-6 text-gray-500" />
              Advanced Settings
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-blue-600" />
                API Connections
              </h2>
              <ConnectionManager />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  AI Content Generation
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Auto-generate titles</label>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    </div>
                    <p className="text-xs text-gray-500">Create engaging, SEO-optimized titles using advanced AI</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Auto-generate descriptions</label>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    </div>
                    <p className="text-xs text-gray-500">Generate comprehensive descriptions with hashtags and keywords</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Auto-generate thumbnails</label>
                      <input 
                        type="checkbox" 
                        checked={thumbnailGeneration}
                        onChange={(e) => setThumbnailGeneration(e.target.checked)}
                        className="rounded border-gray-300" 
                      />
                    </div>
                    <p className="text-xs text-gray-500">Create eye-catching thumbnails with AI-powered design</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Background music generation</label>
                      <input 
                        type="checkbox" 
                        checked={musicGeneration}
                        onChange={(e) => setMusicGeneration(e.target.checked)}
                        className="rounded border-gray-300" 
                      />
                    </div>
                    <p className="text-xs text-gray-500">Add royalty-free background music automatically</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Strategy</label>
                    <select 
                      value={contentStrategy}
                      onChange={(e) => setContentStrategy(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="viral">Viral Optimization</option>
                      <option value="educational">Educational Focus</option>
                      <option value="entertainment">Entertainment Focus</option>
                      <option value="brand">Brand Building</option>
                      <option value="engagement">Engagement Focused</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-500" />
                  Upload & Publishing
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default visibility</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Public</option>
                      <option>Unlisted</option>
                      <option>Private</option>
                      <option>Scheduled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload frequency</label>
                    <select 
                      value={uploadFrequency}
                      onChange={(e) => setUploadFrequency(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="optimal">AI Optimal Times</option>
                      <option value="hourly">Every hour</option>
                      <option value="daily">Daily</option>
                      <option value="custom">Custom Schedule</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default category</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Entertainment</option>
                      <option>Education</option>
                      <option>Sports</option>
                      <option>Gaming</option>
                      <option>Music</option>
                      <option>Science & Technology</option>
                      <option>Howto & Style</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Auto-schedule uploads</label>
                      <input 
                        type="checkbox" 
                        checked={autoSchedule}
                        onChange={(e) => setAutoSchedule(e.target.checked)}
                        className="rounded border-gray-300" 
                      />
                    </div>
                    <p className="text-xs text-gray-500">Automatically schedule uploads for optimal engagement</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Languages</label>
                    <div className="flex flex-wrap gap-2">
                      {['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko'].map(lang => (
                        <button
                          key={lang}
                          onClick={() => {
                            if (targetLanguages.includes(lang)) {
                              setTargetLanguages(targetLanguages.filter(l => l !== lang));
                            } else {
                              setTargetLanguages([...targetLanguages, lang]);
                            }
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                            targetLanguages.includes(lang)
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {lang.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-500" />
                Advanced Features
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Multi-language support</label>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">Auto-translate titles and descriptions</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">A/B test thumbnails</label>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">Test multiple thumbnails for best performance</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Trend analysis</label>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">Analyze trending topics for content ideas</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Competitor tracking</label>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">Monitor competitor performance</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Revenue optimization</label>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">Optimize for maximum ad revenue</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Auto-respond to comments</label>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">AI-powered comment responses</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200">
                Reset to Defaults
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2">
                <Save className="w-5 h-5" />
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;