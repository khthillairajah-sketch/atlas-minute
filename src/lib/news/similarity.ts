export function jaccardSimilarity(a: string[], b: string[]) {
  const setA = new Set(a);
  const setB = new Set(b);

  let intersection = 0;

  for (const token of setA) {
    if (setB.has(token)) intersection++;
  }

  const union = new Set([...setA, ...setB]).size;

  return union === 0 ? 0 : intersection / union;
}