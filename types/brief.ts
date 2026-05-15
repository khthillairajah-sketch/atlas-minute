export type Story = {
  id?: string;
  category: string;
  title: string;
  summary: string;
  source: string;
  readTime: string;
  publishedAt: string;
};

export type BriefRow = {
  slug: string;
  date: string;
  heroTitle: string;
  heroDescription: string;
  stories: Story[];
};