export const normalizeKeyword = (keywords: string) => {
  return keywords
    .replace(/[^a-z0-9]+/gi, ' ')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ',');
};
