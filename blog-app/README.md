# Inkwell - A Medium-like Blogging Platform

A beautiful, modern blogging frontend built with React, Vite, and Tailwind CSS. Inspired by Medium's clean reading experience with a distinctive aesthetic of its own.

![Inkwell](https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=400&fit=crop)

## Features

- 📝 **Rich Text Editor** - Full-featured editor with TipTap for creating beautiful articles
- 🏠 **Dynamic Home Feed** - Browse articles with filtering by tags and search
- 📖 **Article Reading** - Clean, distraction-free reading experience
- 👤 **User Profiles** - View author profiles and their published articles
- 🔖 **Bookmarks** - Save articles to read later
- 👏 **Engagement** - Clap for articles and leave comments
- 🔐 **Authentication** - Login/Signup flow with persistent sessions
- 📱 **Responsive Design** - Works beautifully on all device sizes

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router v6** - Client-side routing
- **Zustand** - Lightweight state management
- **TipTap** - Headless rich text editor
- **Lucide React** - Beautiful icons
- **date-fns** - Date formatting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd blog-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Demo Credentials

The app includes mock data for demonstration. To log in:

- **Email:** elena@inkwell.com (or marcus@inkwell.com, sofia@inkwell.com)
- **Password:** password

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ArticleCard.jsx  # Article preview card
│   ├── Footer.jsx       # Site footer
│   ├── Header.jsx       # Navigation header
│   ├── Layout.jsx       # Page layout wrapper
│   ├── Sidebar.jsx      # Trending & topics sidebar
│   └── TagList.jsx      # Tag filter component
├── data/
│   └── mockData.js      # Mock articles and users
├── pages/
│   ├── Article.jsx      # Article detail page
│   ├── Bookmarks.jsx    # Saved articles
│   ├── Home.jsx         # Main feed page
│   ├── Login.jsx        # Login page
│   ├── Profile.jsx      # User profile page
│   ├── Settings.jsx     # User settings
│   ├── Signup.jsx       # Registration page
│   └── Write.jsx        # Article editor
├── store/
│   └── useStore.js      # Zustand state management
├── utils/
│   └── helpers.js       # Utility functions
├── App.jsx              # Main app with routing
├── index.css            # Global styles
└── main.jsx             # Entry point
```

## Design Philosophy

Inkwell embraces a warm, paper-like aesthetic with:

- **Typography**: Playfair Display for headings, Source Sans Pro for body text
- **Colors**: Warm paper tones with ink-like text and red accents
- **Spacing**: Generous whitespace for comfortable reading
- **Animations**: Subtle fade-ins and transitions for polish

## License

MIT
