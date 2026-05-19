export function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOPWORDS = new Set([
  "the","a","an","and","or","but","to","of","in","on","for","with","at",
  "by","from","as","is","are","was","were","be","been","it","this","that"
]);

export function extractTokens(text: string) {
  return normalizeText(text)
    .split(" ")
    .filter(w => w.length > 2 && !STOPWORDS.has(w));
}