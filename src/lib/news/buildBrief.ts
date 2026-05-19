import { clusterArticles } from "./clusterEngine";

export function buildBrief(articles: any[]) {
  const clusters = clusterArticles(articles);

  const sorted = clusters.sort((a, b) => b.score - a.score);

  return sorted.slice(0, 10);
}