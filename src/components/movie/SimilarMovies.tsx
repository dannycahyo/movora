import Link from "next/link";
import Image from "next/image";
import { MovieList } from "@/src/types/MovieList";

interface SimilarMoviesProps {
  movies: MovieList[];
}

export default function SimilarMovies({
  movies,
}: SimilarMoviesProps) {
  const limitedMovies = movies.slice(0, 6);

  return (
    <section className="py-10" data-testid="similar-movies-section">
      <h2
        className="text-2xl font-bold mb-6"
        data-testid="similar-movies-title"
      >
        Similar Movies
      </h2>

      {movies.length === 0 ? (
        <p className="text-gray-400" data-testid="no-similar-movies">
          No similar movies found.
        </p>
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          data-testid="similar-movies-grid"
        >
          {limitedMovies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="block"
              data-testid={`similar-movie-${movie.id}`}
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition duration-200">
                <div className="relative w-full h-60">
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      data-testid={`similar-movie-image-${movie.id}`}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3
                    className="font-medium text-sm truncate"
                    data-testid={`similar-movie-title-${movie.id}`}
                  >
                    {movie.title}
                  </h3>
                  {movie.release_date && (
                    <p
                      className="text-xs text-gray-400"
                      data-testid={`similar-movie-year-${movie.id}`}
                    >
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
