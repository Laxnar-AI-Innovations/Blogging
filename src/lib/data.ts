export interface Author {
  name: string
  avatar: string
  bio: string
}

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  author: Author
  publishedAt: string
  readTime: number
  tags: string[]
}

export const authors: Record<string, Author> = {
  'elena-rivers': {
    name: 'Elena Rivers',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'Writer exploring the intersection of technology and humanity.',
  },
  'marcus-chen': {
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    bio: 'Software architect by day, philosophical wanderer by night.',
  },
  'sophia-williams': {
    name: 'Sophia Williams',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    bio: 'Design thinking advocate with a passion for minimalism.',
  },
  'james-okonkwo': {
    name: 'James Okonkwo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    bio: 'Storyteller documenting the human condition across cultures.',
  },
}

export const featuredArticle: Article = {
  id: 'the-art-of-slow-thinking',
  title: 'The Art of Slow Thinking in a Fast World',
  excerpt: 'In an age of instant gratification, the deliberate practice of slow thinking has become both a radical act and an essential skill.',
  content: `The modern world moves at a pace our ancestors could never have imagined. Information flows in torrents, decisions demand instant responses, and the very notion of waiting has become almost obsolete. Yet in this rush toward efficiency, we've lost something profound: the ability to think slowly, deeply, and with intention.

Slow thinking isn't about being sluggish or inefficient. It's about giving our minds the space and time they need to process information thoroughly, to make connections that quick, reactive thinking cannot achieve. It's the difference between reading a headline and understanding a story, between forming an opinion and developing a perspective.`,
  coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
  author: authors['elena-rivers'],
  publishedAt: '2024-11-28',
  readTime: 12,
  tags: ['Philosophy', 'Productivity', 'Mindfulness'],
}

export const articles: Article[] = [
  {
    id: 'designing-for-emotion',
    title: 'Designing for Emotion: Beyond Functional Interfaces',
    excerpt: 'The best designs don\'t just work—they make us feel something. Exploring the subtle art of emotional design and why it matters more than ever.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop',
    author: authors['sophia-williams'],
    publishedAt: '2024-11-26',
    readTime: 8,
    tags: ['Design', 'UX', 'Psychology'],
  },
  {
    id: 'the-code-we-leave-behind',
    title: 'The Code We Leave Behind',
    excerpt: 'Every line of code tells a story. What will future developers think when they read yours? A meditation on software craftsmanship and legacy.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    author: authors['marcus-chen'],
    publishedAt: '2024-11-24',
    readTime: 6,
    tags: ['Programming', 'Career', 'Craftsmanship'],
  },
  {
    id: 'stories-from-the-silk-road',
    title: 'Stories from the Silk Road: A Modern Journey',
    excerpt: 'Tracing ancient trade routes through Central Asia, discovering how the echoes of history shape present-day communities.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=500&fit=crop',
    author: authors['james-okonkwo'],
    publishedAt: '2024-11-22',
    readTime: 15,
    tags: ['Travel', 'History', 'Culture'],
  },
  {
    id: 'the-last-bookshop',
    title: 'The Last Bookshop on the Corner',
    excerpt: 'In an era of digital everything, one independent bookstore owner shares why she refuses to close—and what keeps her customers coming back.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop',
    author: authors['elena-rivers'],
    publishedAt: '2024-11-20',
    readTime: 10,
    tags: ['Culture', 'Business', 'Community'],
  },
]

export const topics = [
  'Technology',
  'Design',
  'Philosophy',
  'Travel',
  'Culture',
  'Writing',
  'Productivity',
  'Creativity',
]
