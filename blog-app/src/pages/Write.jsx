import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Heading1, 
  Heading2,
  Image as ImageIcon,
  Link as LinkIcon,
  Undo,
  Redo,
  X
} from 'lucide-react';
import useStore from '../store/useStore';
import { allTags } from '../data/mockData';

const MenuButton = ({ onClick, active, disabled, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded-lg transition-colors ${
      active 
        ? 'bg-ink-900 text-white' 
        : 'text-ink-600 hover:bg-ink-100 disabled:opacity-50'
    }`}
  >
    {children}
  </button>
);

const Write = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  
  const { isAuthenticated, createArticle, updateArticle, getArticleById } = useStore();
  
  // Get existing article data if editing
  const existingArticle = useMemo(() => 
    editId ? getArticleById(editId) : null,
    [editId, getArticleById]
  );

  const [title, setTitle] = useState(existingArticle?.title || '');
  const [excerpt, setExcerpt] = useState(existingArticle?.excerpt || '');
  const [coverImage, setCoverImage] = useState(existingArticle?.coverImage || '');
  const [selectedTags, setSelectedTags] = useState(existingArticle?.tags || []);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const hasSetContent = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Tell your story...',
      }),
    ],
    content: existingArticle?.content || '',
    editorProps: {
      attributes: {
        class: 'article-content focus:outline-none',
      },
    },
  });

  // Set editor content when editing and editor is ready
  useEffect(() => {
    if (editId && existingArticle && editor && !hasSetContent.current) {
      editor.commands.setContent(existingArticle.content);
      hasSetContent.current = true;
    }
  }, [editId, existingArticle, editor]);

  // Handle authentication redirect
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : prev.length < 5
          ? [...prev, tag]
          : prev
    );
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !editor?.getHTML()) {
      alert('Please add a title and content');
      return;
    }

    setIsPublishing(true);

    const articleData = {
      title: title.trim(),
      excerpt: excerpt.trim() || title.trim().substring(0, 150),
      content: editor.getHTML(),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=600&fit=crop',
      tags: selectedTags.length > 0 ? selectedTags : ['General'],
    };

    if (editId) {
      updateArticle(editId, articleData);
      navigate(`/article/${editId}`);
    } else {
      const result = createArticle(articleData);
      if (result.success) {
        navigate(`/article/${result.article.id}`);
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-paper border-b border-ink-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-ink-500 hover:text-ink-700 transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-ink-400">
              {editor?.storage.characterCount?.words() || 0} words
            </span>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="btn-accent"
            >
              {isPublishing ? 'Publishing...' : editId ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Cover Image */}
        <div className="mb-8">
          {coverImage ? (
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={coverImage} 
                alt="Cover" 
                className="w-full aspect-video object-cover"
              />
              <button
                onClick={() => setCoverImage('')}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                const url = window.prompt('Enter cover image URL:');
                if (url) setCoverImage(url);
              }}
              className="w-full aspect-video border-2 border-dashed border-ink-200 rounded-xl flex items-center justify-center text-ink-400 hover:border-ink-300 hover:text-ink-500 transition-colors"
            >
              <div className="text-center">
                <ImageIcon size={32} className="mx-auto mb-2" />
                <span>Add a cover image</span>
              </div>
            </button>
          )}
        </div>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full text-4xl sm:text-5xl font-serif font-bold text-ink-900 placeholder-ink-300 bg-transparent border-none focus:outline-none focus:ring-0 mb-4"
        />

        {/* Excerpt */}
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Write a brief excerpt (optional)..."
          className="w-full text-xl text-ink-600 placeholder-ink-300 bg-transparent border-none focus:outline-none focus:ring-0 resize-none mb-6"
          rows={2}
        />

        {/* Tags */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-ink-100 text-ink-700 rounded-full text-sm"
              >
                {tag}
                <button onClick={() => toggleTag(tag)} className="hover:text-accent">
                  <X size={14} />
                </button>
              </span>
            ))}
            <button
              onClick={() => setShowTagSelector(!showTagSelector)}
              className="px-3 py-1 border border-dashed border-ink-300 text-ink-500 rounded-full text-sm hover:border-ink-400 hover:text-ink-600 transition-colors"
            >
              + Add tags
            </button>
          </div>
          
          {showTagSelector && (
            <div className="mt-3 p-4 bg-white border border-ink-200 rounded-xl">
              <p className="text-sm text-ink-500 mb-3">Select up to 5 tags</p>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-ink-900 text-white'
                        : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div className="sticky top-16 z-30 bg-paper border border-ink-200 rounded-xl p-2 mb-6 flex flex-wrap items-center gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor?.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor?.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </MenuButton>
          
          <div className="w-px h-6 bg-ink-200 mx-1" />
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor?.isActive('bold')}
            title="Bold"
          >
            <Bold size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor?.isActive('italic')}
            title="Italic"
          >
            <Italic size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor?.isActive('code')}
            title="Code"
          >
            <Code size={18} />
          </MenuButton>
          
          <div className="w-px h-6 bg-ink-200 mx-1" />
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor?.isActive('bulletList')}
            title="Bullet List"
          >
            <List size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor?.isActive('orderedList')}
            title="Ordered List"
          >
            <ListOrdered size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor?.isActive('blockquote')}
            title="Quote"
          >
            <Quote size={18} />
          </MenuButton>
          
          <div className="w-px h-6 bg-ink-200 mx-1" />
          
          <MenuButton onClick={addLink} title="Add Link">
            <LinkIcon size={18} />
          </MenuButton>
          <MenuButton onClick={addImage} title="Add Image">
            <ImageIcon size={18} />
          </MenuButton>
          
          <div className="flex-1" />
          
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
            title="Undo"
          >
            <Undo size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
            title="Redo"
          >
            <Redo size={18} />
          </MenuButton>
        </div>

        {/* Editor Content */}
        <EditorContent editor={editor} className="min-h-[400px]" />
      </div>
    </div>
  );
};

export default Write;
