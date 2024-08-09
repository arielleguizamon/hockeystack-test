import Table from "../components/Table";
import { DataItem, FormattedData } from "@/types";
import "./globals.css";

const formatData = (data: DataItem[]): FormattedData[] =>
  data.map((each) => {
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

const calculateBounceCount = (bounceCount: number, totalCount: number) => {
  if (totalCount === 0) {
    return "N/A";
  }
  const bouncePercentage = (bounceCount * 100) / totalCount;
  return `${bouncePercentage.toFixed(2)}%`;
};

type AnalyticsResponse = {
  analytics: DataItem[];
};

const Page = async () => {
  // Change to environment variable based URL. Harcoded localhost for faster development process.
  const response = await fetch("http://localhost:3000/api/analytics");
  const data: AnalyticsResponse = await response.json();
  console.log(data);
  const formattedData = formatData(data.analytics);
  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-4xl font-extrabold mb-8">Hockeystack</h1>
      {formattedData.length > 0 ? (
        <Table data={formattedData} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};
export default Page;
