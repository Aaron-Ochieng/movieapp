import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Import the Link component
import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  isMovieInWatchlist,
} from "../utils/watchlistUtils";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/no-image-available.png"; // Placeholder for missing image

  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    setIsInWatchlist(isMovieInWatchlist(id));
  }, [id]);

  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigation
    addMovieToWatchlist(movie);
    setIsInWatchlist(true);
  };

  const handleRemoveFromWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigation
    removeMovieFromWatchlist(id);
    setIsInWatchlist(false);
  };

  return (
    <Link href={`/movie/${id}`} passHref>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer">
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-white mb-2 truncate">
            {title}
          </h3>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            {vote_average && (
              <span className="flex items-center">
                ⭐ {vote_average.toFixed(1)}
              </span>
            )}
            {release_date && (
              <span>{new Date(release_date).getFullYear()}</span>
            )}
          </div>
        </div>
        {isInWatchlist ? (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleRemoveFromWatchlist}
          >
            Remove from Watchlist
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddToWatchlist}
          >
            Add to Watchlist
          </button>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
