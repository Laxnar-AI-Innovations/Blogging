import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, ArrowLeft } from 'lucide-react';
import useStore from '../store/useStore';
import ArticleCard from '../components/ArticleCard';
import { useEffect } from 'react';

const Bookmarks = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getBookmarkedArticles } = useStore();
  
  const bookmarkedArticles = useMemo(() => getBookmarkedArticles(), [getBookmarkedArticles]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <div className="bg-gradient-to-b from-paper-dark to-paper py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-ink-500 hover:text-ink-700 transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span>Back to feed</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-xl">
              <Bookmark size={24} className="text-accent" />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold text-ink-900">
                Your Bookmarks
              </h1>
              <p className="text-ink-500 mt-1">
                {bookmarkedArticles.length} saved article{bookmarkedArticles.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {bookmarkedArticles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-ink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark size={32} className="text-ink-400" />
            </div>
            <h2 className="font-serif text-xl font-bold text-ink-900 mb-2">
              No bookmarks yet
            </h2>
            <p className="text-ink-500 mb-6">
              Save articles to read later by clicking the bookmark icon
            </p>
            <Link to="/" className="btn-primary">
              Discover articles
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarkedArticles.map((article, index) => (
              <div 
                key={article.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
