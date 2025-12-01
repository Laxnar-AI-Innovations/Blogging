import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockArticles, mockUsers } from '../data/mockData';

const useStore = create(
  persist(
    (set, get) => ({
      // Auth state
      currentUser: null,
      isAuthenticated: false,
      
      // Articles state
      articles: mockArticles,
      
      // Users state
      users: mockUsers,
      
      // UI state
      searchQuery: '',
      selectedTag: null,
      
      // Auth actions
      login: (email, password) => {
        const user = get().users.find(u => u.email === email);
        if (user && password === 'password') {
          set({ currentUser: user, isAuthenticated: true });
          return { success: true };
        }
        return { success: false, error: 'Invalid credentials' };
      },
      
      signup: (userData) => {
        const newUser = {
          id: `user-${Date.now()}`,
          ...userData,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
          bio: '',
          followers: [],
          following: [],
          joinedAt: new Date().toISOString(),
        };
        set(state => ({
          users: [...state.users, newUser],
          currentUser: newUser,
          isAuthenticated: true,
        }));
        return { success: true };
      },
      
      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },
      
      updateProfile: (updates) => {
        set(state => ({
          currentUser: { ...state.currentUser, ...updates },
          users: state.users.map(u => 
            u.id === state.currentUser?.id ? { ...u, ...updates } : u
          ),
        }));
      },
      
      // Article actions
      createArticle: (articleData) => {
        const { currentUser } = get();
        if (!currentUser) return { success: false, error: 'Not authenticated' };
        
        const newArticle = {
          id: `article-${Date.now()}`,
          ...articleData,
          author: currentUser,
          publishedAt: new Date().toISOString(),
          readTime: Math.ceil(articleData.content.split(' ').length / 200),
          claps: 0,
          comments: [],
          bookmarkedBy: [],
        };
        
        set(state => ({
          articles: [newArticle, ...state.articles],
        }));
        
        return { success: true, article: newArticle };
      },
      
      updateArticle: (articleId, updates) => {
        set(state => ({
          articles: state.articles.map(a =>
            a.id === articleId ? { ...a, ...updates } : a
          ),
        }));
      },
      
      deleteArticle: (articleId) => {
        set(state => ({
          articles: state.articles.filter(a => a.id !== articleId),
        }));
      },
      
      clapArticle: (articleId) => {
        set(state => ({
          articles: state.articles.map(a =>
            a.id === articleId ? { ...a, claps: a.claps + 1 } : a
          ),
        }));
      },
      
      bookmarkArticle: (articleId) => {
        const { currentUser } = get();
        if (!currentUser) return;
        
        set(state => ({
          articles: state.articles.map(a => {
            if (a.id === articleId) {
              const isBookmarked = a.bookmarkedBy.includes(currentUser.id);
              return {
                ...a,
                bookmarkedBy: isBookmarked
                  ? a.bookmarkedBy.filter(id => id !== currentUser.id)
                  : [...a.bookmarkedBy, currentUser.id],
              };
            }
            return a;
          }),
        }));
      },
      
      addComment: (articleId, content) => {
        const { currentUser } = get();
        if (!currentUser) return;
        
        const newComment = {
          id: `comment-${Date.now()}`,
          author: currentUser,
          content,
          createdAt: new Date().toISOString(),
          likes: 0,
        };
        
        set(state => ({
          articles: state.articles.map(a =>
            a.id === articleId
              ? { ...a, comments: [...a.comments, newComment] }
              : a
          ),
        }));
      },
      
      // Follow actions
      followUser: (userId) => {
        const { currentUser } = get();
        if (!currentUser || currentUser.id === userId) return;
        
        set(state => ({
          currentUser: {
            ...state.currentUser,
            following: state.currentUser.following.includes(userId)
              ? state.currentUser.following.filter(id => id !== userId)
              : [...state.currentUser.following, userId],
          },
          users: state.users.map(u => {
            if (u.id === currentUser.id) {
              return {
                ...u,
                following: u.following.includes(userId)
                  ? u.following.filter(id => id !== userId)
                  : [...u.following, userId],
              };
            }
            if (u.id === userId) {
              return {
                ...u,
                followers: u.followers.includes(currentUser.id)
                  ? u.followers.filter(id => id !== currentUser.id)
                  : [...u.followers, currentUser.id],
              };
            }
            return u;
          }),
        }));
      },
      
      // Search & Filter
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedTag: (tag) => set({ selectedTag: tag }),
      
      // Getters
      getArticleById: (id) => get().articles.find(a => a.id === id),
      getUserById: (id) => get().users.find(u => u.id === id),
      getArticlesByUser: (userId) => get().articles.filter(a => a.author.id === userId),
      getBookmarkedArticles: () => {
        const { currentUser, articles } = get();
        if (!currentUser) return [];
        return articles.filter(a => a.bookmarkedBy.includes(currentUser.id));
      },
      getFilteredArticles: () => {
        const { articles, searchQuery, selectedTag } = get();
        return articles.filter(article => {
          const matchesSearch = !searchQuery || 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.author.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesTag = !selectedTag || article.tags.includes(selectedTag);
          return matchesSearch && matchesTag;
        });
      },
    }),
    {
      name: 'inkwell-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useStore;
