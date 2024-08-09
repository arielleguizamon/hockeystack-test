import { DataItem, FormattedData } from "@/types";

export const formatData = (data: DataItem[]): FormattedData[] => {
  return data.map((each) => {
    const {
      startsWithCount,
      endsWithCount,
      url,
      avgScrollPercentage,
      totalCount,
      totalVisitorCount,
      totalPageviewCount,
      bounceCount,
    } = each;
    const bounceCountPercentage = calculateBounceCount(bounceCount, totalCount);
    const formattedUrl = (
      <a
        href={`https://${url}`}
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </a>
    );
    const scrollPercentage = `${avgScrollPercentage}%`;
    return {
      url: formattedUrl,
      totalCount,
      totalVisitorCount,
      bounceCount: bounceCountPercentage,
      startsWithCount,
      endsWithCount,
      avgScrollPercentage: scrollPercentage,
      totalPageviewCount,
    };
  });
};

const calculateBounceCount = (bounceCount: number, totalCount: number) => {
  if (totalCount === 0) {
    return "N/A";
  }
  const bouncePercentage = (bounceCount * 100) / totalCount;
  return `${bouncePercentage.toFixed(2)}%`;
};
