import styles from './FeaturedArticle.module.css'
import { Article } from '@/lib/data'
import { formatDistanceToNow } from 'date-fns'

interface FeaturedArticleProps {
  article: Article
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })

  return (
    <article className={styles.featured}>
      <a href={`/article/${article.id}`} className={styles.imageWrapper}>
        <img 
          src={article.coverImage} 
          alt=""
          className={styles.image}
        />
        <div className={styles.overlay} />
      </a>

      <div className={styles.content}>
        <div className={styles.badge}>Featured</div>

        <a href={`/article/${article.id}`}>
          <h2 className={styles.title}>{article.title}</h2>
        </a>

        <p className={styles.excerpt}>{article.excerpt}</p>

        <div className={styles.meta}>
          <a href={`/author/${article.author.name.toLowerCase().replace(' ', '-')}`} className={styles.author}>
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className={styles.avatar}
            />
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{article.author.name}</span>
              <span className={styles.authorBio}>{article.author.bio}</span>
            </div>
          </a>
          <div className={styles.details}>
            <span>{timeAgo}</span>
            <span className={styles.dot}>·</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </div>
    </article>
  )
}
