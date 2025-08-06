export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  description?: string;
  publishedAt?: string;
  channelTitle?: string;
}

export interface YouTubeApiResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        medium: {
          url: string;
        };
        high: {
          url: string;
        };
      };
      publishedAt: string;
      channelTitle: string;
    };
  }>;
}