import { Story } from "./brief";

export type BriefRow = {
  slug: string;
  date: string;
  heroTitle: string;
  heroDescription: string;
  stories: Story[];
};