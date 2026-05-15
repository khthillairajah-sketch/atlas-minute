import { briefs } from "@/app/data/briefs";

export function addBrief(newBrief: any) {
  briefs.unshift(newBrief);
}