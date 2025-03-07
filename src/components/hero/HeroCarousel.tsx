import { useState, useEffect } from "react";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdropPath: string;
  releaseDate: string;
};

interface HeroCarouselProps {
  movies: Movie[];
}

export default function HeroCarousel({ movies }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1,
    );
  };

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-lg mb-10">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdropPath})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            {currentMovie.title}
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-2">
            Release Date:{" "}
            {new Date(currentMovie.releaseDate).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          </p>
          <p className="text-sm md:text-base text-gray-300 mb-4 line-clamp-3 md:line-clamp-4">
            {currentMovie.overview}
          </p>
          <Link
            href={`/movie/${currentMovie.id}`}
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition"
          >
            <span>View Details</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </Link>
        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>

      <div className="absolute bottom-5 left-0 right-0 z-10 flex justify-center">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`mx-1 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-red-600"
                : "w-2 bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
