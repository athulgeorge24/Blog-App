import { Post, Category } from '@/types/blog';
import postsData from './blogPosts.json';

const posts: Post[] = postsData as Post[];

export async function fetchPosts(search?: string, category?: string): Promise<Post[]> {
  let filteredPosts = [...posts];

  // Filter by category
  if (category && category.toLowerCase() !== 'all') {
    filteredPosts = filteredPosts.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.authorName.toLowerCase().includes(q)
    );
  }

  // Sort by date descending
  return filteredPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function fetchPostById(id: string): Promise<Post | null> {
  const post = posts.find((p) => p.id === id);
  return post || null;
}

export async function fetchCategories(): Promise<Category[]> {
  // Dynamically extract categories from current posts list to stay in sync
  const uniqueCategories = Array.from(new Set(posts.map((p) => p.category))).filter(Boolean);
  return uniqueCategories.map((name, index) => ({
    id: String(index + 1),
    name,
    slug: name.toLowerCase(),
  }));
}
