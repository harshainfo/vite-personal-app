import axios from 'axios';
import type { Article } from '../@types/Article';
import { mockArticles } from './mockArticles';

// Use a CORS proxy service to fetch Medium RSS feed
const CORS_PROXY = 'https://api.allorigins.win/get?url=';

export class ArticleService {
  private static instance: ArticleService;
  private cache: { data: Article[]; timestamp: number } | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  public static getInstance(): ArticleService {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService();
    }
    return ArticleService.instance;
  }

  public async fetchArticles(mediumUrl: string): Promise<Article[]> {
    // Check cache first
    if (this.cache && Date.now() - this.cache.timestamp < this.CACHE_DURATION) {
      return this.cache.data;
    }

    try {
      // Construct RSS feed URL
      const rssUrl = `${mediumUrl}/feed`;
      const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(rssUrl)}`;

      const response = await axios.get(proxiedUrl, {
        timeout: 10000, // 10 seconds timeout
      });

      if (!response.data.contents) {
        throw new Error('No content received from Medium RSS feed');
      }

      const articles = this.parseRSSFeed(response.data.contents);
      
      // Cache the results
      this.cache = {
        data: articles,
        timestamp: Date.now(),
      };

      return articles;
    } catch (error) {
      console.error('Error fetching Medium articles:', error);
      
      // Fall back to mock data for development/demo purposes
      console.log('Falling back to mock articles for demonstration');
      this.cache = {
        data: mockArticles,
        timestamp: Date.now(),
      };
      
      return mockArticles;
    }
  }

  private parseRSSFeed(xmlString: string): Article[] {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      // Check for parsing errors
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        throw new Error('Error parsing RSS feed');
      }

      const items = xmlDoc.querySelectorAll('item');
      const articles: Article[] = [];

      items.forEach((item, index) => {
        try {
          const title = this.getTextContent(item, 'title');
          const link = this.getTextContent(item, 'link');
          const description = this.getTextContent(item, 'description');
          const pubDate = this.getTextContent(item, 'pubDate');
          const creator = this.getTextContent(item, 'dc:creator') || this.getTextContent(item, 'creator');

          // Extract categories
          const categoryElements = item.querySelectorAll('category');
          const categories: string[] = Array.from(categoryElements).map(cat => cat.textContent || '');

          // Extract thumbnail from description (Medium usually includes images in description)
          const thumbnail = this.extractThumbnailFromDescription(description);

          // Clean description (remove HTML tags)
          const cleanDescription = this.cleanDescription(description);

          if (title && link) {
            articles.push({
              id: `article-${index}-${Date.now()}`,
              title: this.cleanText(title),
              description: cleanDescription,
              link: link.trim(),
              pubDate: pubDate ? new Date(pubDate) : new Date(),
              thumbnail,
              author: creator || 'Unknown Author',
              categories: categories.filter(cat => cat.length > 0),
            });
          }
        } catch (itemError) {
          console.warn('Error parsing article item:', itemError);
        }
      });

      return articles;
    } catch (error) {
      console.error('Error parsing RSS feed:', error);
      throw new Error('Failed to parse articles data');
    }
  }

  private getTextContent(element: Element, tagName: string): string {
    const found = element.querySelector(tagName);
    return found?.textContent?.trim() || '';
  }

  private extractThumbnailFromDescription(description: string): string | undefined {
    try {
      // Extract first image URL from HTML description
      const imgRegex = /<img[^>]+src="([^">]+)"/i;
      const match = description.match(imgRegex);
      return match ? match[1] : undefined;
    } catch {
      return undefined;
    }
  }

  private cleanDescription(description: string): string {
    try {
      // Remove HTML tags and clean up description
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = description;
      let cleanText = tempDiv.textContent || tempDiv.innerText || '';
      
      // Limit to first 150 characters
      if (cleanText.length > 150) {
        cleanText = cleanText.substring(0, 150) + '...';
      }
      
      return cleanText.trim();
    } catch {
      return 'Article description...';
    }
  }

  private cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }
}

export const articleService = ArticleService.getInstance();