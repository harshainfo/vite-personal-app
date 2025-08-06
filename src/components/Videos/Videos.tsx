import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Link
} from '@mui/material';
import { YouTubeService } from '../../services/youtubeService';
import VideoCard from '../VideoCard/VideoCard';
import type { VideoData } from '../../@types/video';

export default function Videos() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const videoData = await YouTubeService.getChannelVideos();
        setVideos(videoData);
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
        console.error('Error loading videos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const handleVideoClick = (video: VideoData) => {
    // Open video in YouTube
    const youtubeUrl = `https://www.youtube.com/watch?v=${video.id}`;
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography variant="body1">
          Visit{' '}
          <Link
            href={import.meta.env.VITE_YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {import.meta.env.VITE_YOUTUBE_CHANNEL_NAME}
          </Link>
          {' '}to watch videos directly on YouTube.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Videos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Latest videos from{' '}
          <Link
            href={import.meta.env.VITE_YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {import.meta.env.VITE_YOUTUBE_CHANNEL_NAME}
          </Link>
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3
        }}
      >
        {videos.map((video) => (
          <VideoCard 
            key={video.id}
            video={video} 
            onClick={handleVideoClick}
          />
        ))}
      </Box>

      {videos.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No videos available at the moment.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
