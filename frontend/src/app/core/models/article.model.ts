export type ArticleCategory = 'Evidenza Scientifica' | 'Riflessioni';

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: ArticleCategory;
  readTime: string;
  publishedAt: string;
  author: string;
  authorRole: string;
  tags: string[];
  keyPoints: string[];
  content: string; // HTML formatted content
}
