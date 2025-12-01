import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';
import { allTags } from '../data/mockData';

const Sidebar = () => {
  const { articles, setSelectedTag } = useStore();

  // Get trending articles (most claps)
  const trendingArticles = [...articles]
    .sort((a, b) => b.claps - a.claps)
    .slice(0, 3);

  // Get popular tags
  const popularTags = allTags.slice(0, 8);

  return (
    <aside className="space-y-8">
      {/* Trending */}
      <div className="bg-white rounded-xl p-6 border border-ink-100">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={20} className="text-accent" />
          <h3 className="font-serif text-lg font-bold text-ink-900">Trending</h3>
        </div>
        <div className="space-y-5">
          {trendingArticles.map((article, index) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="block group"
            >
              <div className="flex gap-3">
                <span className="text-3xl font-serif font-bold text-ink-200 group-hover:text-accent transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm text-ink-500 mb-1">{article.author.name}</p>
                  <h4 className="font-serif font-semibold text-ink-900 line-clamp-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="bg-white rounded-xl p-6 border border-ink-100">
        <h3 className="font-serif text-lg font-bold text-ink-900 mb-4">Popular Topics</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className="px-3 py-1.5 bg-ink-50 text-ink-600 rounded-full text-sm hover:bg-ink-100 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-ink-900 to-ink-800 rounded-xl p-6 text-white">
        <h3 className="font-serif text-xl font-bold mb-2">Start Writing Today</h3>
        <p className="text-ink-300 text-sm mb-4">
          Share your stories with a community of curious readers and thoughtful writers.
        </p>
        <Link
          to="/write"
          className="inline-block bg-white text-ink-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-ink-100 transition-colors"
        >
          Write a Story
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
