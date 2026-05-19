import { extractTokens } from "./normalize";
import { jaccardSimilarity } from "./similarity";

export type Article = {
  id?: string;
  title: string;
  summary?: string;
  content?: string;
  source?: string;
  url?: string;
  category?: string;
  published_at?: string;
};

export type Cluster = {
  id: string;
  title?: string;
  articles: Article[];
  score: number;
};

function clusterSimilarity(
  clusterTokens: string[][],
  newTokens: string[]
) {
  const scores = clusterTokens.map(tokens =>
    jaccardSimilarity(tokens, newTokens)
  );

  return scores.length
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : 0;
}

export function clusterArticles(
  articles: Article[],
  threshold = 0.35
): Cluster[] {
  const clusters: Cluster[] = [];
  const processed = new Array(articles.length).fill(false);

  const tokenCache = articles.map(a =>
    extractTokens(`${a.title} ${a.summary ?? ""}`)
  );

  for (let i = 0; i < articles.length; i++) {
    if (processed[i]) continue;

    const clusterArticles: Article[] = [articles[i]];
    processed[i] = true;

    for (let j = i + 1; j < articles.length; j++) {
      if (processed[j]) continue;

      const clusterTokens = clusterArticles.map(a =>
        tokenCache[articles.indexOf(a)]
      );

      const similarity = clusterSimilarity(clusterTokens, tokenCache[j]);

      if (similarity >= threshold) {
        clusterArticles.push(articles[j]);
        processed[j] = true;
      }
    }

    clusters.push({
      id: `cluster_${i}`,
      title: clusterArticles[0].title,
      articles: clusterArticles,
      score:
        clusterArticles.length +
        Math.max(
          ...clusterArticles.map((_, idx) =>
            jaccardSimilarity(
              tokenCache[i],
              tokenCache[articles.indexOf(clusterArticles[idx])]
            )
          )
        )
    });
  }

  return clusters;
}