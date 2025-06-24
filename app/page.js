"use client";
import { useState, useEffect } from "react";
import PopularMoviesCarousel from "../components/PopularMoviesCarousel";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!TMDB_API_KEY) {
          throw new Error(
            "TMDB API Key is not set. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file.",
          );
        }

        const endpoints = {
          popular: `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`,
          nowPlaying: `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`,
          topRated: `${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`,
          upcoming: `${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`,
        };

        const [popularRes, nowPlayingRes, topRatedRes, upcomingRes] =
          await Promise.all([
            fetch(endpoints.popular),
            fetch(endpoints.nowPlaying),
            fetch(endpoints.topRated),
            fetch(endpoints.upcoming),
          ]);

        if (!popularRes.ok)
          throw new Error(
            `HTTP error! status: ${popularRes.status} for popular movies`,
          );
        if (!nowPlayingRes.ok)
          throw new Error(
            `HTTP error! status: ${nowPlayingRes.status} for now playing movies`,
          );
        if (!topRatedRes.ok)
          throw new Error(
            `HTTP error! status: ${topRatedRes.status} for top rated movies`,
          );
        if (!upcomingRes.ok)
          throw new Error(
            `HTTP error! status: ${upcomingRes.status} for upcoming movies`,
          );

        const popularData = await popularRes.json();
        const nowPlayingData = await nowPlayingRes.json();
        const topRatedData = await topRatedRes.json();
        const upcomingData = await upcomingRes.json();

        setPopularMovies(popularData.results);
        setNowPlayingMovies(nowPlayingData.results);
        setTopRatedMovies(topRatedData.results);
        setUpcomingMovies(upcomingData.results);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [TMDB_API_KEY]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading movies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        Error: {error}
      </div>
    );
  }

  const MovieCategory = ({ title, movies }) => (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Movie Discovery</h1>
        </div>
      </header>

      <main className="pb-8">
        <PopularMoviesCarousel movies={popularMovies} />
        <MovieCategory title="Now Playing" movies={nowPlayingMovies} />
        <MovieCategory title="Top Rated" movies={topRatedMovies} />
        <MovieCategory title="Upcoming Movies" movies={upcomingMovies} />
      </main>

      <footer className="bg-gray-800 py-4 text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Movie Discovery. All rights
          reserved.
        </p>
        <p>Data provided by The Movie Database (TMDB)</p>
      </footer>
    </div>
  );
}
