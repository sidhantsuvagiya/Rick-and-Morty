import React from "react";

interface FilterProps {
  selectedFilter: string | null;
  onSelectFilter: (selectedFilter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ selectedFilter, onSelectFilter }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectFilter(e.target.value);
  };

  return (
    <div className="flex items-center space-x-4">
      <label className="text-gray-700">Filter by:</label>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="filterOption"
            value="character"
            onChange={handleFilterChange}
            className="mr-1"
            checked={selectedFilter === "character"}
          />
          Characters
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="filterOption"
            value="location"
            onChange={handleFilterChange}
            className="mr-1"
            checked={selectedFilter === "location"}
          />
          Locations
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="filterOption"
            value="episode"
            onChange={handleFilterChange}
            className="mr-1"
            checked={selectedFilter === "episode"}
          />
          Episodes
        </label>
      </div>
    </div>
  );
};

export default Filter;
