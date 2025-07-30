import React from 'react';
import { Box } from '@mui/material';
import type { Article } from '../../../@types/Article';
import { ArticleCard } from './ArticleCard';
import { LoadingSkeletons } from './LoadingSkeletons';

interface ArticleGridProps {
  articles: Article[];
  loading?: boolean;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, loading = false }) => {
  if (loading) {
    return <LoadingSkeletons count={6} />;
  }

  if (articles.length === 0) {
    return null;
  }

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
      {articles.map((article) => (
        <Box key={article.id} sx={{ display: 'flex' }}>
          <ArticleCard article={article} />
        </Box>
      ))}
    </Box>
  );
};