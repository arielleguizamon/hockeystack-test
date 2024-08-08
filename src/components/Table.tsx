"use client";

import { DataItem } from "../types/DataItem";

type TableProps = {
  data: DataItem[];
};

const humanReadableHeaders: { [key in keyof DataItem]: string } = {
  url: "URL",
  totalCount: "Total",
  totalVisitorCount: "Visitors",
  bounceCount: "Bounce",
  startsWithCount: "Enters",
  endsWithCount: "Exits",
  avgScrollPercentage: "Scroll",
  totalPageviewCount: "Pageviews",
};

const prepareData = (item: DataItem) => {
  const {
    startsWithCount,
    endsWithCount,
    url,
    avgScrollPercentage,
    totalCount,
    totalVisitorCount,
    totalPageviewCount,
    bounceCount,
  } = item;
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
};

const calculateBounceCount = (bounceCount: number, totalCount: number) => {
  if (totalCount === 0) {
    return "N/A";
  }
  const bouncePercentage = (bounceCount * 100) / totalCount;
  return `${bouncePercentage.toFixed(2)}%`;
};

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} className="uppercase h-12 px-4 py-2 bg-gray-900">
                {humanReadableHeaders[key as keyof DataItem]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const preparedItem = prepareData(item);
            return (
              <tr key={index} className="hover:bg-gray-700 h-12">
                {Object.entries(preparedItem).map(([key, value]) => (
                  <td key={key} className="px-4 py-2 max-w-xs">
                    {value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
