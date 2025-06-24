import React, { useState, useEffect } from "react";

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        onSearch(query.trim());
      } else {
        // If query is empty, maybe clear search results or show default content
        onSearch(""); // Pass empty string to signal clearing search results
      }
    }, 1000); // 1 second debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [query, onSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Search for movies..."
          aria-label="Movie search"
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchInput;
