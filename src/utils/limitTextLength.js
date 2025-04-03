export const limitTextLength = (text, max) => {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}...` : text;
};
