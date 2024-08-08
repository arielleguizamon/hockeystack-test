export type DataItem = {
  url: string;
  totalCount: number;
  totalVisitorCount: number;
  bounceCount: number;
  startsWithCount: number;
  endsWithCount: number;
  avgScrollPercentage: number;
  totalPageviewCount: number;
};

export type FormattedData = {
  url: JSX.Element;
  totalCount: number;
  totalVisitorCount: number;
  bounceCount: string;
  startsWithCount: number;
  endsWithCount: number;
  avgScrollPercentage: string;
  totalPageviewCount: number;
};
