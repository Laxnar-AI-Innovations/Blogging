import { useMemo } from 'react';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';
import TagList from '../components/TagList';
import useStore from '../store/useStore';

const Home = () => {
  const { getFilteredArticles, searchQuery, selectedTag } = useStore();
  
  const articles = useMemo(() => getFilteredArticles(), [getFilteredArticles]);
  const featuredArticle = articles[0];
  const restArticles = articles.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-paper-dark to-paper py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-900 mb-6 animate-fade-in">
            Where <span className="gradient-text">Ideas</span> Flow
          </h1>
          <p className="text-lg sm:text-xl text-ink-600 max-w-2xl mx-auto mb-8 animate-fade-in stagger-1">
            Discover stories, thinking, and expertise from writers on any topic 
            that matters to you.
          </p>
          <div className="animate-fade-in stagger-2">
            <TagList />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Feed */}
          <div className="lg:col-span-2 space-y-6">
            {searchQuery && (
              <div className="mb-6">
                <p className="text-ink-500">
                  Showing results for "<span className="font-medium text-ink-900">{searchQuery}</span>"
                  <span className="ml-2 text-sm">({articles.length} articles)</span>
                </p>
              </div>
            )}

            {selectedTag && (
              <div className="mb-6">
                <p className="text-ink-500">
                  Browsing: <span className="font-medium text-ink-900">{selectedTag}</span>
                  <span className="ml-2 text-sm">({articles.length} articles)</span>
                </p>
              </div>
            )}

            {articles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-ink-500 text-lg">No articles found.</p>
                <p className="text-ink-400 mt-2">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <>
                {/* Featured Article */}
                {featuredArticle && !searchQuery && !selectedTag && (
                  <div className="mb-8 animate-fade-in">
                    <ArticleCard article={featuredArticle} featured />
                  </div>
                )}

                {/* Article List */}
                <div className="space-y-4">
                  {(searchQuery || selectedTag ? articles : restArticles).map((article, index) => (
                    <div 
                      key={article.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
