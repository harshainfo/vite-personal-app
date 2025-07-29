export interface Article {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  thumbnail?: string;
  author: string;
  categories: string[];
}