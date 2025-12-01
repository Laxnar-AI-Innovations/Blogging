import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Link as LinkIcon, Edit, UserPlus, UserMinus } from 'lucide-react';
import useStore from '../store/useStore';
import ArticleCard from '../components/ArticleCard';
import { formatDate } from '../utils/helpers';

const Profile = () => {
  const { username } = useParams();
  const { 
    users, 
    currentUser, 
    isAuthenticated, 
    getArticlesByUser, 
    followUser 
  } = useStore();
  
  const [activeTab, setActiveTab] = useState('articles');

  const user = useMemo(() => 
    users.find(u => u.username === username),
    [users, username]
  );

  const articles = useMemo(() => 
    user ? getArticlesByUser(user.id) : [],
    [user, getArticlesByUser]
  );

  const isOwnProfile = currentUser?.id === user?.id;
  const isFollowing = currentUser?.following.includes(user?.id);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-ink-900 mb-2">User not found</h1>
          <p className="text-ink-500 mb-4">The profile you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">Go home</Link>
        </div>
      </div>
    );
  }

  const handleFollow = () => {
    if (isAuthenticated && !isOwnProfile) {
      followUser(user.id);
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Profile Header */}
      <div className="bg-gradient-to-b from-ink-900 to-ink-800 pt-16 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Empty space for visual balance */}
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-24">
        <div className="bg-white rounded-2xl shadow-xl border border-ink-100 overflow-hidden animate-fade-in">
          {/* Avatar Section */}
          <div className="relative h-16 bg-gradient-to-r from-accent/20 to-accent/5">
            <div className="absolute -bottom-12 left-6 sm:left-8">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-2xl bg-white ring-4 ring-white shadow-lg"
              />
            </div>
            
            {isOwnProfile && (
              <Link
                to="/settings"
                className="absolute top-4 right-4 sm:right-6 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-ink-700 hover:bg-white transition-colors"
              >
                <Edit size={16} />
                Edit profile
              </Link>
            )}
          </div>

          {/* Profile Info */}
          <div className="pt-16 pb-6 px-6 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900">
                  {user.name}
                </h1>
                <p className="text-ink-500">@{user.username}</p>
                
                {user.bio && (
                  <p className="mt-4 text-ink-700 max-w-xl">{user.bio}</p>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-ink-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    Joined {formatDate(user.joinedAt)}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mt-6">
                  <div>
                    <span className="font-bold text-ink-900">{articles.length}</span>
                    <span className="text-ink-500 ml-1">Articles</span>
                  </div>
                  <div>
                    <span className="font-bold text-ink-900">{user.followers.length}</span>
                    <span className="text-ink-500 ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-ink-900">{user.following.length}</span>
                    <span className="text-ink-500 ml-1">Following</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isAuthenticated && !isOwnProfile && (
                <button
                  onClick={handleFollow}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-colors ${
                    isFollowing
                      ? 'bg-ink-100 text-ink-700 hover:bg-ink-200'
                      : 'bg-ink-900 text-white hover:bg-ink-800'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus size={18} />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Follow
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-ink-100">
            <div className="flex">
              <button
                onClick={() => setActiveTab('articles')}
                className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'articles'
                    ? 'text-ink-900'
                    : 'text-ink-500 hover:text-ink-700'
                }`}
              >
                Articles
                {activeTab === 'articles' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'about'
                    ? 'text-ink-900'
                    : 'text-ink-500 hover:text-ink-700'
                }`}
              >
                About
                {activeTab === 'about' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="py-8">
          {activeTab === 'articles' ? (
            <>
              {articles.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-ink-500 text-lg">No articles yet</p>
                  {isOwnProfile && (
                    <Link to="/write" className="btn-primary mt-4 inline-block">
                      Write your first story
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((article, index) => (
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
            </>
          ) : (
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-ink-100">
              <h3 className="font-serif text-xl font-bold text-ink-900 mb-4">
                About {user.name}
              </h3>
              <p className="text-ink-700 leading-relaxed">
                {user.bio || 'This user hasn\'t added a bio yet.'}
              </p>
              
              <div className="mt-8 pt-8 border-t border-ink-100">
                <h4 className="font-semibold text-ink-900 mb-4">Member since</h4>
                <p className="text-ink-600">{formatDate(user.joinedAt)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
