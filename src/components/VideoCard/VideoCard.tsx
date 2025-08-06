import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip
} from '@mui/material';
import type { VideoData } from '../../@types/video';

interface VideoCardProps {
  video: VideoData;
  onClick?: (video: VideoData) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(video);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: 3
        } : {}
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="194"
        image={video.thumbnail}
        alt={video.title}
        sx={{
          objectFit: 'cover'
        }}
      />
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {video.title}
        </Typography>
        
        {video.description && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: 1
            }}
          >
            {video.description}
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          {video.channelTitle && (
            <Chip 
              label={video.channelTitle} 
              size="small" 
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
          {video.publishedAt && (
            <Typography variant="caption" color="text.secondary">
              {formatDate(video.publishedAt)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;