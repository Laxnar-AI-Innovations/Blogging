import { allTags } from '../data/mockData';
import useStore from '../store/useStore';

const TagList = () => {
  const { selectedTag, setSelectedTag } = useStore();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setSelectedTag(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          !selectedTag
            ? 'bg-ink-900 text-white'
            : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
        }`}
      >
        All
      </button>
      {allTags.map(tag => (
        <button
          key={tag}
          onClick={() => setSelectedTag(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedTag === tag
              ? 'bg-ink-900 text-white'
              : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagList;
