import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Camera, Save } from 'lucide-react';
import useStore from '../store/useStore';

const Settings = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, updateProfile } = useStore();
  
  // Initialize with current user data
  const initialValues = useMemo(() => ({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    avatar: currentUser?.avatar || '',
  }), [currentUser]);
  
  const [name, setName] = useState(initialValues.name);
  const [bio, setBio] = useState(initialValues.bio);
  const [avatar, setAvatar] = useState(initialValues.avatar);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Only handle navigation in useEffect
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    updateProfile({ name, bio, avatar });
    
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAvatarChange = () => {
    const url = window.prompt('Enter avatar image URL:', avatar);
    if (url) setAvatar(url);
  };

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <div className="bg-gradient-to-b from-paper-dark to-paper py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link 
            to={`/profile/${currentUser.username}`}
            className="inline-flex items-center gap-2 text-ink-500 hover:text-ink-700 transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span>Back to profile</span>
          </Link>
          
          <h1 className="font-serif text-3xl font-bold text-ink-900">
            Settings
          </h1>
          <p className="text-ink-500 mt-2">
            Manage your profile and account preferences
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit}>
          {/* Profile Section */}
          <div className="bg-white rounded-xl border border-ink-100 p-6 sm:p-8 mb-6">
            <h2 className="font-serif text-xl font-bold text-ink-900 mb-6">
              Profile Information
            </h2>

            {/* Avatar */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-ink-700 mb-3">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={avatar || currentUser.avatar}
                    alt={name || currentUser.name}
                    className="w-20 h-20 rounded-xl bg-ink-200"
                  />
                  <button
                    type="button"
                    onClick={handleAvatarChange}
                    className="absolute -bottom-2 -right-2 p-2 bg-ink-900 text-white rounded-full hover:bg-ink-700 transition-colors"
                  >
                    <Camera size={14} />
                  </button>
                </div>
                <div>
                  <p className="text-sm text-ink-600">
                    Click to change your profile photo
                  </p>
                  <p className="text-xs text-ink-400 mt-1">
                    Recommended: 400x400px
                  </p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-ink-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={name || currentUser.name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-ink-200 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                required
              />
            </div>

            {/* Username (read-only) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-ink-700 mb-2">
                Username
              </label>
              <div className="flex">
                <span className="px-4 py-3 bg-ink-50 border border-r-0 border-ink-200 rounded-l-xl text-ink-500">
                  @
                </span>
                <input
                  type="text"
                  value={currentUser.username}
                  disabled
                  className="flex-1 px-4 py-3 border border-ink-200 rounded-r-xl bg-ink-50 text-ink-500 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-ink-400 mt-2">
                Username cannot be changed
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                maxLength={300}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 border border-ink-200 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
              />
              <p className="text-xs text-ink-400 mt-2">
                {bio.length}/300 characters
              </p>
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-white rounded-xl border border-ink-100 p-6 sm:p-8 mb-6">
            <h2 className="font-serif text-xl font-bold text-ink-900 mb-6">
              Account
            </h2>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={currentUser.email}
                disabled
                className="w-full px-4 py-3 border border-ink-200 rounded-xl bg-ink-50 text-ink-500 cursor-not-allowed"
              />
              <p className="text-xs text-ink-400 mt-2">
                Contact support to change your email
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between">
            <div>
              {saved && (
                <span className="text-green-600 text-sm animate-fade-in">
                  ✓ Changes saved successfully
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary flex items-center gap-2"
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="mt-12 pt-8 border-t border-ink-200">
          <h2 className="font-serif text-xl font-bold text-red-600 mb-4">
            Danger Zone
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="font-semibold text-red-900 mb-2">Delete Account</h3>
            <p className="text-red-700 text-sm mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-600 hover:text-white transition-colors">
              Delete my account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
