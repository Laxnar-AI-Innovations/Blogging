import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'
import ArticleCard from '@/components/ArticleCard'
import FeaturedArticle from '@/components/FeaturedArticle'
import Sidebar from '@/components/Sidebar'
import { featuredArticle, articles } from '@/lib/data'

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />)
    expect(screen.getByText('Inkwell')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Explore')).toBeInTheDocument()
    expect(screen.getByText('Topics')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders write button', () => {
    render(<Header />)
    expect(screen.getByText('Write')).toBeInTheDocument()
  })
})

describe('ArticleCard', () => {
  const mockArticle = articles[0]

  it('renders article title', () => {
    render(<ArticleCard article={mockArticle} index={0} />)
    expect(screen.getByText(mockArticle.title)).toBeInTheDocument()
  })

  it('renders author name', () => {
    render(<ArticleCard article={mockArticle} index={0} />)
    expect(screen.getByText(mockArticle.author.name)).toBeInTheDocument()
  })

  it('renders article excerpt', () => {
    render(<ArticleCard article={mockArticle} index={0} />)
    expect(screen.getByText(mockArticle.excerpt)).toBeInTheDocument()
  })

  it('renders read time', () => {
    render(<ArticleCard article={mockArticle} index={0} />)
    expect(screen.getByText(`${mockArticle.readTime} min read`)).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<ArticleCard article={mockArticle} index={0} />)
    mockArticle.tags.slice(0, 2).forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })
  })
})

describe('FeaturedArticle', () => {
  it('renders featured badge', () => {
    render(<FeaturedArticle article={featuredArticle} />)
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('renders article title', () => {
    render(<FeaturedArticle article={featuredArticle} />)
    expect(screen.getByText(featuredArticle.title)).toBeInTheDocument()
  })

  it('renders article excerpt', () => {
    render(<FeaturedArticle article={featuredArticle} />)
    expect(screen.getByText(featuredArticle.excerpt)).toBeInTheDocument()
  })

  it('renders author information', () => {
    render(<FeaturedArticle article={featuredArticle} />)
    expect(screen.getByText(featuredArticle.author.name)).toBeInTheDocument()
    expect(screen.getByText(featuredArticle.author.bio)).toBeInTheDocument()
  })
})

describe('Sidebar', () => {
  it('renders trending topics section', () => {
    render(<Sidebar />)
    expect(screen.getByText('Trending Topics')).toBeInTheDocument()
  })

  it('renders writers to follow section', () => {
    render(<Sidebar />)
    expect(screen.getByText('Writers to Follow')).toBeInTheDocument()
  })

  it('renders newsletter section', () => {
    render(<Sidebar />)
    expect(screen.getByText('Newsletter')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
    expect(screen.getByText('Subscribe')).toBeInTheDocument()
  })

  it('renders footer links', () => {
    render(<Sidebar />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Help')).toBeInTheDocument()
    expect(screen.getByText('Terms')).toBeInTheDocument()
    expect(screen.getByText('Privacy')).toBeInTheDocument()
  })
})
