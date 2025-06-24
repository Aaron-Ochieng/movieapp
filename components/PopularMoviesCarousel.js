import React from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';

const PopularMoviesCarousel = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-6">Popular Movies</h2>
      {movies && movies.length > 0 ? (
        <Slider {...settings}>
          {movies.map(movie => (
            <div key={movie.id} className="px-2">
              <MovieCard movie={movie} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-white text-center">No popular movies to display.</p>
      )}
    </div>
  );
};

export default PopularMoviesCarousel;
