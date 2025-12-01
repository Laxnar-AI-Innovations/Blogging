import styles from './ArticleCard.module.css'
import { Article } from '@/lib/data'
import { formatDistanceToNow } from 'date-fns'
import { Bookmark, MoreHorizontal } from 'lucide-react'

interface ArticleCardProps {
  article: Article
  index: number
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })

  return (
    <article 
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.content}>
        <div className={styles.meta}>
          <a href={`/author/${article.author.name.toLowerCase().replace(' ', '-')}`} className={styles.author}>
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className={styles.avatar}
            />
            <span className={styles.authorName}>{article.author.name}</span>
          </a>
          <span className={styles.dot}>·</span>
          <span className={styles.date}>{timeAgo}</span>
        </div>

        <a href={`/article/${article.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{article.title}</h3>
        </a>

        <p className={styles.excerpt}>{article.excerpt}</p>

        <div className={styles.footer}>
          <div className={styles.tags}>
            {article.tags.slice(0, 2).map(tag => (
              <a key={tag} href={`/topic/${tag.toLowerCase()}`} className={styles.tag}>
                {tag}
              </a>
            ))}
            <span className={styles.readTime}>{article.readTime} min read</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.actionButton} aria-label="Bookmark">
              <Bookmark size={18} />
            </button>
            <button className={styles.actionButton} aria-label="More options">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>

      <a href={`/article/${article.id}`} className={styles.imageLink}>
        <img 
          src={article.coverImage} 
          alt=""
          className={styles.image}
        />
      </a>
    </article>
  )
}
