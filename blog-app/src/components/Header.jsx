import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  PenSquare, 
  Bell, 
  User, 
  LogOut, 
  Bookmark, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import useStore from '../store/useStore';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { isAuthenticated, currentUser, logout, searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-ink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-ink-900 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
              <span className="text-white font-serif font-bold text-lg">I</span>
            </div>
            <span className="font-serif text-xl font-semibold text-ink-900 hidden sm:block">
              Inkwell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stories..."
                    className="w-64 px-4 py-2 bg-paper-dark rounded-full text-sm focus:ring-2 focus:ring-accent/20 border border-ink-200"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="ml-2 p-2 hover:bg-ink-100 rounded-full transition-colors"
                  >
                    <X size={18} className="text-ink-500" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:bg-ink-100 rounded-full transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} className="text-ink-600" />
                </button>
              )}
            </div>

            {isAuthenticated ? (
              <>
                {/* Write Button */}
                <Link
                  to="/write"
                  className="flex items-center gap-2 text-ink-600 hover:text-ink-900 transition-colors"
                >
                  <PenSquare size={20} />
                  <span className="text-sm font-medium">Write</span>
                </Link>

                {/* Notifications */}
                <button className="p-2 hover:bg-ink-100 rounded-full transition-colors relative">
                  <Bell size={20} className="text-ink-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      className="w-8 h-8 rounded-full bg-ink-200 object-cover"
                    />
                  </button>

                  {menuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-ink-100 py-2 z-20 animate-fade-in">
                        <div className="px-4 py-3 border-b border-ink-100">
                          <p className="font-medium text-ink-900">{currentUser?.name}</p>
                          <p className="text-sm text-ink-500">@{currentUser?.username}</p>
                        </div>
                        
                        <Link
                          to={`/profile/${currentUser?.username}`}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-ink-700 hover:bg-ink-50 transition-colors"
                        >
                          <User size={18} />
                          <span>Profile</span>
                        </Link>
                        
                        <Link
                          to="/bookmarks"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-ink-700 hover:bg-ink-50 transition-colors"
                        >
                          <Bookmark size={18} />
                          <span>Bookmarks</span>
                        </Link>
                        
                        <Link
                          to="/settings"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-ink-700 hover:bg-ink-50 transition-colors"
                        >
                          <Settings size={18} />
                          <span>Settings</span>
                        </Link>
                        
                        <div className="border-t border-ink-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-ink-700 hover:bg-ink-50 transition-colors w-full"
                          >
                            <LogOut size={18} />
                            <span>Sign out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-ink-700 hover:text-ink-900 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-sm"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-ink-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-ink-700" />
            ) : (
              <Menu size={24} className="text-ink-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ink-200 bg-white animate-fade-in">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories..."
                className="w-full px-4 py-2.5 bg-paper-dark rounded-lg text-sm focus:ring-2 focus:ring-accent/20 border border-ink-200"
              />
            </form>

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="w-10 h-10 rounded-full bg-ink-200"
                  />
                  <div>
                    <p className="font-medium text-ink-900">{currentUser?.name}</p>
                    <p className="text-sm text-ink-500">@{currentUser?.username}</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  <Link
                    to="/write"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-ink-700 hover:bg-ink-50 rounded-lg transition-colors"
                  >
                    <PenSquare size={20} />
                    <span>Write a story</span>
                  </Link>
                  <Link
                    to={`/profile/${currentUser?.username}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-ink-700 hover:bg-ink-50 rounded-lg transition-colors"
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/bookmarks"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-ink-700 hover:bg-ink-50 rounded-lg transition-colors"
                  >
                    <Bookmark size={20} />
                    <span>Bookmarks</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 text-ink-700 hover:bg-ink-50 rounded-lg transition-colors w-full"
                  >
                    <LogOut size={20} />
                    <span>Sign out</span>
                  </button>
                </nav>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-secondary text-center"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary text-center"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
