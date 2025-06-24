import Image from "next/image";

// Function to generate dynamic metadata for the page
export async function generateMetadata({ params }) {
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const movieId = params.id;

  if (!TMDB_API_KEY) {
    return {
      title: "Movie Details - API Key Missing",
    };
  }

  try {
    const movieRes = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`);
    const movieData = await movieRes.json();

    if (!movieRes.ok || movieData.status_code === 34) {
      // 34 for "The resource you requested could not be found."
      return {
        title: "Movie Not Found",
      };
    }

    return {
      title: `${movieData.title} - Movie Discovery`,
      description: movieData.overview,
    };
  } catch (error) {
    console.error(`Failed to fetch metadata for movie ${movieId}:`, error);
    return {
      title: "Error Loading Movie",
    };
  }
}

export default async function MovieDetailsPage({ params }) {
  const { id } = params;
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  if (!TMDB_API_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500 p-4">
        Error: TMDB API Key is not set. Please set NEXT_PUBLIC_TMDB_API_KEY in
        your .env.local file.
      </div>
    );
  }

  let movie = null;
  let cast = [];
  let error = null;

  try {
    const [movieRes, creditsRes] = await Promise.all([
      fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`),
      fetch(`${BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`),
    ]);

    if (!movieRes.ok) {
      throw new Error(
        `HTTP error! status: ${movieRes.status} for movie details.`,
      );
    }
    if (!creditsRes.ok) {
      console.warn(`Could not fetch credits for movie ${id}: status ${creditsRes.status}`);
      // Do not throw, as credits might not be critical enough to fail the whole page
    }

    movie = await movieRes.json();
    const creditsData = await creditsRes.json();
    cast = creditsData.cast ? creditsData.cast.slice(0, 5) : []; // Get top 5 cast members
  } catch (err) {
    console.error("Failed to fetch movie details:", err);
    error = err.message;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500 p-4">
        Error: {error}
      </div>
    );
  }

  if (!movie || movie.status_code === 34) { // Handle "resource not found" explicitly
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
        Movie not found. Please check the movie ID.
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image-available.png";
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null; // Backdrop is optional

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {backdropUrl && (
        <div className="relative w-full h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={backdropUrl}
            alt={`${movie.title} backdrop`}
            layout="fill"
            objectFit="cover"
            priority={true}
            className="opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
      )}

      <div
        className={`container mx-auto px-4 py-8 ${
          backdropUrl ? "-mt-48 relative z-10" : "pt-8"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0 w-64 h-96 relative rounded-lg shadow-xl overflow-hidden">
            <Image
              src={posterUrl}
              alt={movie.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority={true}
            />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-gray-400 italic mb-4 text-xl">
                {movie.tagline}
              </p>
            )}

            <div className="flex items-center space-x-4 mb-4 text-lg">
              {movie.vote_average && (
                <span className="flex items-center bg-yellow-500 text-gray-900 px-3 py-1 rounded-full font-semibold">
                  ⭐ {movie.vote_average.toFixed(1)} / 10
                </span>
              )}
              {movie.release_date && (
                <span className="text-gray-300">
                  🗓️ {new Date(movie.release_date).getFullYear()}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {movie.overview || "No overview available."}
            </p>

            {cast.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-2">Cast</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {cast.map((person) => (
                    <span
                      key={person.id}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {person.name}{" "}
                      {person.character && `(${person.character.split("/")[0].trim()})`}
                    </span>
                  ))}
                </div>
              </>
            )}

            {movie.genres && movie.genres.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-2">Genres</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </>
            )}

            {movie.runtime && (
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Runtime:</span> {movie.runtime}{" "}
                minutes
              </p>
            )}
            {movie.budget > 0 && (
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Budget:</span> $
                {movie.budget.toLocaleString()}
              </p>
            )}
            {movie.revenue > 0 && (
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Revenue:</span> $
                {movie.revenue.toLocaleString()}
              </p>
            )}
            {movie.production_companies &&
              movie.production_companies.length > 0 && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Production Companies:</span>{" "}
                  {movie.production_companies
                    .map((company) => company.name)
                    .join(", ")}
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
