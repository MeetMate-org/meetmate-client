import React from "react";

interface Recommendation {
  id: string;
  name: string;
}

interface RecommendationsProps {
  items: Recommendation[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ items }) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-xl transition col-span-full md:col-span-2">
    <h2 className="text-lg sm:text-xl font-medium mb-4">
      Recommendations
    </h2>
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {items.map((r) => (
        <span
          key={r.id}
          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
        >
          {r.name}
        </span>
      ))}
    </div>
  </div>
);

export default Recommendations;
