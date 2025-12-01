'use client'

import { useState } from 'react'
import styles from './Header.module.css'
import { Search, PenLine, Bell, Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>Inkwell</span>
        </a>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/explore" className={styles.navLink}>Explore</a>
          <a href="/topics" className={styles.navLink}>Topics</a>
          <a href="/about" className={styles.navLink}>About</a>
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Search">
            <Search size={20} />
          </button>
          <button className={styles.iconButton} aria-label="Notifications">
            <Bell size={20} />
          </button>
          <button className={styles.writeButton}>
            <PenLine size={18} />
            <span>Write</span>
          </button>
          <button 
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}
