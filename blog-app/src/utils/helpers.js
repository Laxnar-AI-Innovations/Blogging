import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'MMM d, yyyy');
};

export const formatDateFull = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'MMMM d, yyyy');
};

export const formatRelativeTime = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatReadTime = (minutes) => {
  return `${minutes} min read`;
};

export const formatClaps = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export const generateExcerpt = (content, maxLength = 150) => {
  const text = stripHtml(content);
  return truncateText(text, maxLength);
};

export const calculateReadTime = (content) => {
  const text = stripHtml(content);
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
