export interface Post {
  id: string;
  createdAt: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  authorName: string;
  authorAvatar: string;
  readTime: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
