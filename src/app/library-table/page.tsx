import LibraryTable from "@/components/LibraryTable";
import { formatData } from "@/app/utils";
import { AnalyticsResponse } from "@/types";
import "@/app/globals.css";

const Page = async () => {
  // Change to environment variable based URL. Harcoded localhost for faster development process.
  // TODO: try-catch query, handle backend errors and show error component
  const response = await fetch("http://localhost:3000/api/analytics");
  const data: AnalyticsResponse = await response.json();
  const formattedData = formatData(data.analytics);
  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-4xl font-extrabold mb-8">
        Hockeystack (Library Table)
      </h1>
      {formattedData.length > 0 ? (
        <LibraryTable data={formattedData} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};
export default Page;
