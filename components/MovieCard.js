import React from 'react';
import Image from 'next/image';

const MovieCard = ({ movie }) => {
  const { title, poster_path, vote_average, release_date } = movie;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : '/no-image-available.png'; // Placeholder for missing image

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
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
        <h3 className="text-xl font-semibold text-white mb-2 truncate">{title}</h3>
        <div className="flex items-center justify-between text-gray-400 text-sm">
          {vote_average && (
            <span className="flex items-center">
              ⭐ {vote_average.toFixed(1)}
            </span>
          )}
          {release_date && (
            <span>
              {new Date(release_date).getFullYear()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
