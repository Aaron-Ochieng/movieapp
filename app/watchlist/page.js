"use client";

import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard';
import { getWatchlist } from '../../utils/watchlistUtils';

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = getWatchlist();
    setWatchlist(storedWatchlist);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">My Watchlist</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">Your watchlist is empty.</p>
        )}
      </main>
    </div>
  );
};

export default WatchlistPage;
