import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  MessageCircle, 
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  MoreHorizontal,
  Trash2,
  Edit
} from 'lucide-react';
import useStore from '../store/useStore';
import { formatDateFull, formatReadTime, formatClaps } from '../utils/helpers';

const ClapButton = ({ count, onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`group flex items-center gap-2 transition-all ${isAnimating ? 'scale-110' : ''}`}
    >
      <span className="text-2xl group-hover:scale-125 transition-transform">👏</span>
      <span className="font-medium text-ink-600">{formatClaps(count)}</span>
    </button>
  );
};

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getArticleById, 
    isAuthenticated, 
    currentUser, 
    clapArticle, 
    bookmarkArticle,
    addComment,
    deleteArticle
  } = useStore();
  
  const [shareOpen, setShareOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [localClaps, setLocalClaps] = useState(0);

  const article = useMemo(() => getArticleById(id), [id, getArticleById]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-ink-500">Article not found</p>
      </div>
    );
  }

  const isBookmarked = currentUser && article.bookmarkedBy.includes(currentUser.id);
  const isAuthor = currentUser && currentUser.id === article.author.id;

  const handleClap = () => {
    clapArticle(article.id);
    setLocalClaps(prev => prev + 1);
  };

  const handleBookmark = () => {
    if (isAuthenticated) {
      bookmarkArticle(article.id);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim() && isAuthenticated) {
      addComment(article.id, commentText);
      setCommentText('');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(article.id);
      navigate('/');
    }
  };

  const shareUrl = window.location.href;
  const shareTitle = article.title;

  return (
    <div className="min-h-screen bg-paper">
      {/* Article Header */}
      <header className="bg-gradient-to-b from-paper-dark to-paper pt-8 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-ink-500 hover:text-ink-700 transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span>Back to feed</span>
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-ink-100 text-ink-600 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 mb-6 leading-tight animate-fade-in">
            {article.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link 
              to={`/profile/${article.author.username}`}
              className="flex items-center gap-4 group"
            >
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full bg-ink-200"
              />
              <div>
                <p className="font-medium text-ink-900 group-hover:text-accent transition-colors">
                  {article.author.name}
                </p>
                <p className="text-sm text-ink-500">
                  {formatDateFull(article.publishedAt)} · {formatReadTime(article.readTime)}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              {/* Share */}
              <div className="relative">
                <button
                  onClick={() => setShareOpen(!shareOpen)}
                  className="p-2 hover:bg-ink-100 rounded-full transition-colors"
                >
                  <Share2 size={20} className="text-ink-500" />
                </button>
                {shareOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShareOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-ink-100 py-2 z-20">
                      <a
                        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 text-ink-700 hover:bg-ink-50"
                      >
                        <Twitter size={18} />
                        <span>Twitter</span>
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 text-ink-700 hover:bg-ink-50"
                      >
                        <Facebook size={18} />
                        <span>Facebook</span>
                      </a>
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 text-ink-700 hover:bg-ink-50"
                      >
                        <Linkedin size={18} />
                        <span>LinkedIn</span>
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shareUrl);
                          setShareOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-ink-700 hover:bg-ink-50 w-full"
                      >
                        <LinkIcon size={18} />
                        <span>Copy link</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Bookmark */}
              <button
                onClick={handleBookmark}
                className={`p-2 hover:bg-ink-100 rounded-full transition-colors ${
                  isBookmarked ? 'text-accent' : 'text-ink-500'
                }`}
              >
                <Bookmark size={20} className={isBookmarked ? 'fill-accent' : ''} />
              </button>

              {/* Author Menu */}
              {isAuthor && (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 hover:bg-ink-100 rounded-full transition-colors"
                  >
                    <MoreHorizontal size={20} className="text-ink-500" />
                  </button>
                  {menuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-ink-100 py-2 z-20">
                        <Link
                          to={`/write?edit=${article.id}`}
                          className="flex items-center gap-3 px-4 py-2 text-ink-700 hover:bg-ink-50"
                        >
                          <Edit size={18} />
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={handleDelete}
                          className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                        >
                          <Trash2 size={18} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Article Footer */}
      <footer className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-ink-200">
          {article.tags.map(tag => (
            <Link
              key={tag}
              to={`/?tag=${tag}`}
              className="px-4 py-2 bg-ink-100 text-ink-600 rounded-full text-sm font-medium hover:bg-ink-200 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Engagement */}
        <div className="flex items-center justify-between py-6 border-b border-ink-200">
          <div className="flex items-center gap-6">
            <ClapButton count={article.claps + localClaps} onClick={handleClap} />
            <button className="flex items-center gap-2 text-ink-500 hover:text-ink-700 transition-colors">
              <MessageCircle size={22} />
              <span>{article.comments.length}</span>
            </button>
          </div>
          <button
            onClick={handleBookmark}
            className={`flex items-center gap-2 transition-colors ${
              isBookmarked ? 'text-accent' : 'text-ink-500 hover:text-ink-700'
            }`}
          >
            <Bookmark size={22} className={isBookmarked ? 'fill-accent' : ''} />
            <span>{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        {/* Author Card */}
        <div className="py-8 border-b border-ink-200">
          <Link 
            to={`/profile/${article.author.username}`}
            className="flex items-start gap-4 group"
          >
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-16 h-16 rounded-full bg-ink-200"
            />
            <div className="flex-1">
              <p className="text-sm text-ink-500 uppercase tracking-wide mb-1">Written by</p>
              <h3 className="font-serif text-xl font-bold text-ink-900 group-hover:text-accent transition-colors">
                {article.author.name}
              </h3>
              <p className="text-ink-600 mt-2">{article.author.bio}</p>
            </div>
          </Link>
        </div>

        {/* Comments Section */}
        <div className="py-8">
          <h3 className="font-serif text-2xl font-bold text-ink-900 mb-6">
            Responses ({article.comments.length})
          </h3>

          {/* Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleComment} className="mb-8">
              <div className="flex gap-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full bg-ink-200"
                />
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a response..."
                    className="w-full px-4 py-3 border border-ink-200 rounded-xl resize-none focus:border-accent focus:ring-1 focus:ring-accent"
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Respond
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-ink-50 rounded-xl text-center">
              <p className="text-ink-600">
                <Link to="/login" className="text-accent hover:underline">Sign in</Link>
                {' '}to write a response
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {article.comments.map(comment => (
              <div key={comment.id} className="flex gap-4">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full bg-ink-200"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Link 
                      to={`/profile/${comment.author.username}`}
                      className="font-medium text-ink-900 hover:text-accent transition-colors"
                    >
                      {comment.author.name}
                    </Link>
                    <span className="text-sm text-ink-400">·</span>
                    <span className="text-sm text-ink-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-ink-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Article;
