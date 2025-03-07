import { useState, useRef } from "react";
import Link from "next/link";
import MovieCard from "@/src/components/card/MovieCard";

import type { Movie } from "@/src/types/Movie";

interface MovieRowProps {
  title: string;
  viewAllLink: string;
  movies: Movie[];
  isLoading?: boolean;
}

export default function MovieRow({
  title,
  viewAllLink,
  movies = [],
  isLoading = false,
}: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { current } = rowRef;
      const scrollAmount =
        direction === "left"
          ? current.scrollLeft - current.offsetWidth * 0.75
          : current.scrollLeft + current.offsetWidth * 0.75;

      current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });

      if (direction === "right" || scrollAmount > 0) {
        setShowLeftArrow(true);
      } else if (scrollAmount <= 0) {
        setShowLeftArrow(false);
      }
    }
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          href={viewAllLink}
          className="text-red-500 hover:text-red-400 text-sm font-medium flex items-center"
        >
          View all
          <svg
            className="w-4 h-4 ml-1"
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

      <div className="relative group">
        {showLeftArrow && !isLoading && movies.length > 0 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/80 text-white p-2 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
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
        )}

        <div
          ref={rowRef}
          className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 px-0.5"
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-none w-[160px] sm:w-[180px] md:w-[200px]"
              >
                <div className="bg-gray-800 rounded-lg overflow-hidden h-[270px] sm:h-[300px] animate-pulse">
                  <div className="w-full h-full"></div>
                </div>
              </div>
            ))
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="flex-none w-[160px] sm:w-[180px] md:w-[200px]"
              >
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                  releaseDate={movie.release_date}
                />
              </div>
            ))
          ) : (
            <div className="w-full py-8 text-center text-gray-400">
              No movies found.
            </div>
          )}
        </div>

        {!isLoading && movies.length > 5 && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/80 text-white p-2 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
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
        )}
      </div>
    </div>
  );
}
