import { Link } from 'react-router-dom';
import { Bookmark, MessageCircle } from 'lucide-react';
import useStore from '../store/useStore';
import { formatDate, formatReadTime } from '../utils/helpers';

const ArticleCard = ({ article, featured = false }) => {
  const { isAuthenticated, currentUser, bookmarkArticle } = useStore();
  const isBookmarked = currentUser && article.bookmarkedBy.includes(currentUser.id);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      bookmarkArticle(article.id);
    }
  };

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl bg-ink-900 card-hover">
        <Link to={`/article/${article.id}`}>
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full bg-ink-700 ring-2 ring-white/20"
              />
              <div>
                <p className="font-medium text-white">{article.author.name}</p>
                <p className="text-sm text-ink-300">
                  {formatDate(article.publishedAt)} · {formatReadTime(article.readTime)}
                </p>
              </div>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-accent-light transition-colors">
              {article.title}
            </h2>
            <p className="text-ink-300 line-clamp-2 mb-4 hidden sm:block">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4">
              {article.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-xl p-5 border border-ink-100 card-hover">
      <Link to={`/article/${article.id}`} className="flex gap-5">
        <div className="flex-1 min-w-0">
          {/* Author */}
          <div className="flex items-center gap-2 mb-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full bg-ink-200"
            />
            <Link 
              to={`/profile/${article.author.username}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-medium text-ink-700 hover:text-ink-900 transition-colors"
            >
              {article.author.name}
            </Link>
          </div>

          {/* Title & Excerpt */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-ink-900 mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <p className="text-ink-500 text-sm line-clamp-2 mb-4 hidden sm:block">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-ink-400">
              <span>{formatDate(article.publishedAt)}</span>
              <span>{formatReadTime(article.readTime)}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-ink-400 flex items-center gap-1">
                <MessageCircle size={16} />
                {article.comments.length}
              </span>
              <button
                onClick={handleBookmark}
                className={`p-1.5 rounded-full transition-colors ${
                  isBookmarked 
                    ? 'text-accent' 
                    : 'text-ink-400 hover:text-ink-600'
                }`}
              >
                <Bookmark size={18} className={isBookmarked ? 'fill-accent' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={article.coverImage}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
