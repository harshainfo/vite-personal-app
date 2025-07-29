import { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Alert,
  Box,
  Container,
  Button,
} from '@mui/material';
import { Refresh as RefreshIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import type { Article } from '../../@types/Article';
import { articleService } from '../../services/articleService';
import { ArticleGrid } from './components/ArticleGrid';

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mediumUrl = import.meta.env.VITE_MEDIUM_URL;

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedArticles = await articleService.fetchArticles(mediumUrl);
      setArticles(fetchedArticles);
    } catch (err) {
      // Only show error if we don't have any articles (including mock data)
      if (articles.length === 0) {
        setError(err instanceof Error ? err.message : 'Failed to load articles');
      }
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  }, [mediumUrl, articles.length]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleRetry = () => {
    fetchArticles();
  };

  const handleViewMedium = () => {
    window.open(mediumUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2,
          }}
        >
          Articles
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Latest articles and insights from my Medium blog
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRetry}
            disabled={loading}
          >
            Refresh Articles
          </Button>
          <Button
            variant="contained"
            startIcon={<OpenInNewIcon />}
            onClick={handleViewMedium}
          >
            Visit Medium Blog
          </Button>
        </Box>
      </Box>

      {/* Error State */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 4 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={handleRetry}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Articles Grid */}
      <ArticleGrid articles={articles} loading={loading} />

      {/* Empty State */}
      {!loading && !error && articles.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No articles found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            There might be an issue loading articles from Medium.
          </Typography>
          <Button
            variant="contained"
            startIcon={<OpenInNewIcon />}
            onClick={handleViewMedium}
          >
            Visit Medium Blog
          </Button>
        </Box>
      )}

      {/* Footer */}
      {articles.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 6, pt: 4, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Want to read more articles?
          </Typography>
          <Button
            variant="text"
            startIcon={<OpenInNewIcon />}
            onClick={handleViewMedium}
          >
            Visit my Medium blog
          </Button>
        </Box>
      )}
    </Container>
  );
}
    