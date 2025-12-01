import styles from './Sidebar.module.css'
import { topics, authors } from '@/lib/data'
import { TrendingUp } from 'lucide-react'

export default function Sidebar() {
  const authorList = Object.values(authors).slice(0, 3)

  return (
    <aside className={styles.sidebar}>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <TrendingUp size={18} className={styles.headerIcon} />
          <h3 className={styles.sectionTitle}>Trending Topics</h3>
        </div>
        <div className={styles.topics}>
          {topics.map(topic => (
            <a key={topic} href={`/topic/${topic.toLowerCase()}`} className={styles.topic}>
              {topic}
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Writers to Follow</h3>
        <div className={styles.writers}>
          {authorList.map(author => (
            <a 
              key={author.name} 
              href={`/author/${author.name.toLowerCase().replace(' ', '-')}`}
              className={styles.writer}
            >
              <img 
                src={author.avatar} 
                alt={author.name}
                className={styles.writerAvatar}
              />
              <div className={styles.writerInfo}>
                <span className={styles.writerName}>{author.name}</span>
                <span className={styles.writerBio}>{author.bio}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Newsletter</h3>
        <p className={styles.newsletterText}>
          Get the best stories delivered to your inbox every week.
        </p>
        <form className={styles.newsletterForm}>
          <input 
            type="email" 
            placeholder="your@email.com"
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterButton}>
            Subscribe
          </button>
        </form>
      </section>

      <footer className={styles.footer}>
        <nav className={styles.footerNav}>
          <a href="/about">About</a>
          <a href="/help">Help</a>
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
        </nav>
        <p className={styles.copyright}>© 2024 Inkwell</p>
      </footer>
    </aside>
  )
}
