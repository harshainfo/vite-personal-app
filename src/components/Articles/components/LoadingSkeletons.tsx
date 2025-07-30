import React from 'react';
import {
  Card,
  CardContent,
  Skeleton,
  Box,
} from '@mui/material';

export const ArticleCardSkeleton: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* Thumbnail skeleton */}
        <Skeleton 
          variant="rectangular" 
          height={200} 
          sx={{ bgcolor: 'grey.300' }}
        />
        
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          {/* Title skeleton */}
          <Skeleton 
            variant="text" 
            height={32} 
            width="80%" 
            sx={{ mb: 1 }}
          />
          <Skeleton 
            variant="text" 
            height={32} 
            width="60%" 
            sx={{ mb: 2 }}
          />
          
          {/* Description skeleton */}
          <Skeleton 
            variant="text" 
            height={20} 
            width="100%" 
            sx={{ mb: 0.5 }}
          />
          <Skeleton 
            variant="text" 
            height={20} 
            width="90%" 
            sx={{ mb: 0.5 }}
          />
          <Skeleton 
            variant="text" 
            height={20} 
            width="70%" 
            sx={{ mb: 2 }}
          />
          
          {/* Date skeleton */}
          <Skeleton 
            variant="text" 
            height={16} 
            width="40%" 
            sx={{ mb: 2 }}
          />
          
          {/* Categories skeleton */}
          <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={70} height={24} />
          </Box>
        </CardContent>
        
        {/* Button skeleton */}
        <Box sx={{ p: 2, pt: 0 }}>
          <Skeleton 
            variant="rounded" 
            height={36} 
            width="100%" 
          />
        </Box>
      </Card>
    </Box>
  );
};

interface LoadingSkeletonsProps {
  count?: number;
}

export const LoadingSkeletons: React.FC<LoadingSkeletonsProps> = ({ count = 6 }) => {
  return (
    <Box 
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 3,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </Box>
  );
};