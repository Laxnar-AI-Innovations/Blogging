# Inkwell — A Medium-like Blogging Platform

A beautiful, modern blogging platform built with Next.js 14, featuring a clean reading experience inspired by Medium.

![Inkwell Preview](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop)

## ✨ Features

- **Beautiful Typography** — Playfair Display serif headers with Source Sans body text
- **Responsive Design** — Looks great on desktop, tablet, and mobile
- **Featured Articles** — Highlight your best content with prominent featured sections
- **Topic Navigation** — Browse articles by topic/category
- **Author Profiles** — Showcase writer information and bios
- **Newsletter Signup** — Built-in newsletter subscription form
- **Smooth Animations** — Subtle, delightful micro-interactions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd medium-blog

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── globals.css     # Global styles and CSS variables
│   ├── layout.tsx      # Root layout with header
│   ├── page.tsx        # Homepage
│   └── page.module.css # Homepage styles
├── components/         # React components
│   ├── Header.tsx      # Navigation header
│   ├── ArticleCard.tsx # Article preview card
│   ├── FeaturedArticle.tsx
│   └── Sidebar.tsx     # Topics, writers, newsletter
└── lib/
    └── data.ts         # Mock data and types
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:ci
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |
| `npm run test:ci` | Run tests with coverage |

## 🎨 Design System

### Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-ink` | `#0d0d0d` | Primary text |
| `--color-paper` | `#faf9f6` | Background |
| `--color-accent` | `#c9533d` | Highlights, CTAs |
| `--color-muted` | `#6b6b6b` | Secondary text |

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Source Sans 3 (sans-serif)
- **Code**: JetBrains Mono (monospace)

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### GitHub Actions

This project includes a CI/CD workflow for the `beta` branch:

- **Lint** — Runs ESLint
- **Test** — Runs Jest with coverage
- **Build** — Creates production build
- **Preview** — Deploys PR previews to Vercel

## 📄 License

MIT License — feel free to use this for your own projects!

---

Built with ❤️ using Next.js, React, and TypeScript
