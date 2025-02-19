import { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center border border-sky-200 rounded-lg p-2 bg-white shadow-sm focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-400 transition-all duration-300">
      <input
        type="text"
        className="w-full px-4 py-2 border-none focus:outline-none placeholder-slate-400 text-slate-700"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Allow search on "Enter" key
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-teal-600 text-white px-6 py-2 rounded-lg ml-2 hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
