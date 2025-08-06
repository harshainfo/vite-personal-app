import type { VideoData, YouTubeApiResponse } from '../@types/video';

// Mock data for development - replace with real YouTube API calls
const mockVideos: VideoData[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    description: 'Learn how to build modern React applications with TypeScript',
    publishedAt: '2024-01-15',
    channelTitle: 'ElevateAcademyByHarsha'
  },
  {
    id: '2', 
    title: 'AWS Cloud Architecture Best Practices',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    description: 'Deep dive into AWS cloud architecture patterns and best practices',
    publishedAt: '2024-01-10',
    channelTitle: 'ElevateAcademyByHarsha'
  },
  {
    id: '3',
    title: 'Full Stack Development with Node.js',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    description: 'Complete guide to building full stack applications with Node.js',
    publishedAt: '2024-01-05',
    channelTitle: 'ElevateAcademyByHarsha'
  },
  {
    id: '4',
    title: 'Docker and Kubernetes for Developers',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    description: 'Learn containerization and orchestration for modern applications',
    publishedAt: '2024-01-01',
    channelTitle: 'ElevateAcademyByHarsha'
  },
  {
    id: '5',
    title: 'Building Scalable APIs with Express.js',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    description: 'Design and implement scalable REST APIs using Express.js',
    publishedAt: '2023-12-28',
    channelTitle: 'ElevateAcademyByHarsha'
  },
  {
    id: '6',
    title: 'Database Design and Optimization',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    description: 'Master database design principles and optimization techniques',
    publishedAt: '2023-12-25',
    channelTitle: 'ElevateAcademyByHarsha'
  }
];

export class YouTubeService {
  // private static readonly YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
  
  // Mock implementation - replace with real API when API key is available
  static async getChannelVideos(): Promise<VideoData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would make an API call:
    // const response = await fetch(
    //   `${this.YOUTUBE_API_BASE}/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${apiKey}`
    // );
    // const data = await response.json();
    // return this.parseYouTubeResponse(data);
    
    return mockVideos;
  }
  
  static parseYouTubeResponse(response: YouTubeApiResponse): VideoData[] {
    return response.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle
    }));
  }
  
  static extractChannelIdFromUrl(channelUrl: string): string {
    // Extract channel ID from YouTube URL
    const match = channelUrl.match(/\/channel\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  }
}