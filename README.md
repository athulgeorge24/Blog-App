# 📝 BlogApp

A modern, full-featured blog platform built with **Next.js 16**, **React Query**, and **Tailwind CSS v4**. Features server-side rendering, dynamic routing, live API integration, real-time search, and a premium dark glassmorphism UI.

> **Live Demo:** Deployed on Vercel  
> **API:** [MockAPI.io](https://mockapi.io) — RESTful backend for blog posts

![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![React Query](https://img.shields.io/badge/React_Query-5-FF4154?logo=reactquery)

---

## ✨ Features

| Feature | Description |
|:--------|:------------|
| **Server-Side Rendering** | Homepage and post pages render on the server for fast initial loads and SEO |
| **Dynamic Routing** | `/blog/[id]` routes with `generateMetadata` for per-page SEO |
| **Live API Integration** | Connected to MockAPI.io for fetching blog posts and categories |
| **React Query** | Data fetching with `@tanstack/react-query` for caching and state management |
| **Real-Time Search** | Dedicated `/blog` route with search bar and category filtering pills |
| **Dark Glassmorphism UI** | Premium design with gradient accents, hover animations, and backdrop blur |
| **Responsive Design** | Fully responsive across mobile, tablet, and desktop breakpoints |
| **SEO Optimized** | Dynamic metadata, OpenGraph tags, semantic HTML, proper heading hierarchy |
| **Accessible** | WCAG-compliant with role specifications, ARIA labels, keyboard focus indicators |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router + Turbopack)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with `@theme` design tokens
- **Data Fetching:** [TanStack React Query v5](https://tanstack.com/query)
- **API:** [MockAPI.io](https://mockapi.io/) (RESTful JSON API)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — providers, header, footer, SEO metadata
│   ├── page.tsx                # Homepage — SSR hero section + recent articles + overview
│   ├── globals.css             # Design system — CSS variables, transitions, @apply variables
│   ├── error.tsx               # Error boundary boundary wrapper
│   ├── loading.tsx             # Skeleton loader overlay page
│   ├── not-found.tsx           # Custom 404 page
│   ├── about/
│   │   └── page.tsx            # About page — crew list, tech stats, values grid
│   ├── blog/
│   │   ├── page.tsx            # Blog index — SSR with prefetching queries
│   │   └── [id]/
│   │       └── page.tsx        # Dynamic post detail — custom markdown content parser
│   └── contact/
│       └── page.tsx            # Contact page — feedback form with state validations
├── components/
│   ├── Navbar.tsx              # Sticky glassmorphic header with search integration
│   ├── Footer.tsx              # Footer with structured link directories
│   ├── SearchBar.tsx           # Category selection pills & search input
│   ├── BlogCard.tsx            # Responsive article card with hover indicators
│   ├── BlogGrid.tsx            # Result counters, query states & layout grids
│   ├── HeroSection.tsx         # Featured hero banner slideshow
│   ├── ReadingProgressBar.tsx  # Dynamic scroll progress tracking bar
│   ├── RelatedPosts.tsx        # Inline recommendation links
│   ├── ShareButtons.tsx        # URL clippers and social share bindings
│   └── icons.tsx               # Local SVG brand assets (Twitter, LinkedIn, GitHub)
├── lib/
│   ├── api.ts                  # Fetch handlers with local mock fallbacks
│   └── mockData.ts             # Static mock articles database fallback
├── providers/
│   ├── QueryProvider.tsx       # React Query provider wrapper
│   └── ThemeProvider.tsx       # LocalStorage-synced dark mode context
└── types/
    └── blog.ts                 # TypeScript type interfaces (Post, Category)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18 or later
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/athulgeorge24/Blog-App.git
   cd Blog-App
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🔌 API Configuration

The app is preconfigured to query a live **MockAPI.io** backend:

```
Base URL: https://6a474838abfcbaade1182d46.mockapi.io/api/v1
```

### Endpoints

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/posts` | Fetch all blog posts |
| `GET` | `/posts/:id` | Fetch a single post by ID |
| `GET` | `/categories` | Fetch all categories |

### Post Schema

```typescript
export interface Author {
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: Author;
  createdAt: string;
  readTime: number;
  featured: boolean;
}
```

### Using Your Own API

To connect a different MockAPI project, update the environment variable in your `.env` file:

```env
NEXT_PUBLIC_API_URL=https://<your-project-id>.mockapi.io/api/<prefix>
```

---

## 📄 Pages

### 🏠 Homepage (`/`)
- Featured large Hero article card
- Editorial pick secondary articles
- Grid highlighting Next.js architectural patterns and values
- Fast initial page load optimized for SEO

### 📖 Post Detail (`/blog/[id]`)
- Server-side rendered with dynamic meta headers
- Back navigation
- Custom markdown-like parser supporting headings, lists, quotes, and inline code formatting
- Read progress scroll bar at the very top of the window
- Share panel (Twitter, LinkedIn, Facebook, URL copying)
- Recommended items in matching categories

### 📚 Blog Index (`/blog`)
- Live search bar filtering titles, excerpts, categories, and authors
- Horizontal slider showing active category filters
- Async loading skeletons

### ℹ️ About (`/about`)
- Mission descriptions
- Dynamic key statistic metrics
- Core value cards
- Technical Crew cards

### ✉️ Contact (`/contact`)
- Support desk channels (mail, office, operating hours)
- Direct form input elements with error status checks
- Success popup verification

---

## 🙏 Credits

**Created by [Athul George](https://github.com/athulgeorge24)**

Built with ❤️ using Next.js, React Query, and Tailwind CSS.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
