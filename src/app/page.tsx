import styles from './page.module.css'
import ArticleCard from '@/components/ArticleCard'
import FeaturedArticle from '@/components/FeaturedArticle'
import Sidebar from '@/components/Sidebar'
import { articles, featuredArticle } from '@/lib/data'

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Stories that <span className={styles.accent}>illuminate</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Discover thoughtful perspectives from writers who dare to explore the depths of human experience.
          </p>
        </div>
        <div className={styles.heroPattern} aria-hidden="true" />
      </section>

      <div className="container">
        <section className={styles.featured}>
          <FeaturedArticle article={featuredArticle} />
        </section>

        <div className={styles.mainContent}>
          <section className={styles.articles}>
            <h2 className={styles.sectionTitle}>Recent Stories</h2>
            <div className={styles.articleGrid}>
              {articles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  index={index}
                />
              ))}
            </div>
          </section>

          <Sidebar />
        </div>
      </div>
    </div>
  )
}
