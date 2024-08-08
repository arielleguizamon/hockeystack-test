import { DataItem } from "@/types";

export const percentageFields = new Set(["avgScrollPercentage", "bounceCount"]);

export const humanReadableHeaders: { [key in keyof DataItem]: string } = {
  url: "URL",
  totalCount: "Total",
  totalVisitorCount: "Visitors",
  bounceCount: "Bounce",
  startsWithCount: "Enters",
  endsWithCount: "Exits",
  avgScrollPercentage: "Scroll",
  totalPageviewCount: "Pageviews",
};
