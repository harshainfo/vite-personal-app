import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import type { Article } from '../../../@types/Article';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const handleReadMore = () => {
    window.open(article.link, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      {article.thumbnail && (
        <CardMedia
          component="img"
          height="200"
          image={article.thumbnail}
          alt={article.title}
          sx={{
            objectFit: 'cover',
          }}
          onError={() => {
            // Hide image if it fails to load
            setIsImageVisible(false);
          }}
        />
      )}
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="h2"
          sx={{
            fontWeight: 'bold',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1,
          }}
        >
          {article.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Published on {formatDate(article.pubDate)}
          </Typography>
        </Box>

        {article.categories.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {article.categories.slice(0, 3).map((category, index) => (
              <Chip
                key={index}
                label={category}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleReadMore}
          endIcon={<OpenInNewIcon fontSize="small" />}
          fullWidth
          sx={{
            textTransform: 'none',
            fontWeight: 'medium',
          }}
        >
          Read Article
        </Button>
      </CardActions>
    </Card>
  );
};