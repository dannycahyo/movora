import Image from "next/image";
import { MovieDetail } from "@/src/types/MovieDetail";

interface MovieHeroProps {
  movie: MovieDetail;
}

export default function MovieHero({ movie }: MovieHeroProps) {
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/images/placeholder-backdrop.jpg";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/images/placeholder-poster.jpg";

  // Format release date to year only
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  // Format runtime to hours and minutes
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh]">
      <div className="absolute inset-0 z-0">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="hidden md:block w-64 h-96 rounded-lg overflow-hidden shadow-2xl flex-shrink-0">
            <Image
              src={posterUrl}
              alt={movie.title}
              width={256}
              height={384}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {movie.title} {releaseYear ? `(${releaseYear})` : ""}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm md:text-base text-gray-300">
              {movie.release_date && (
                <span>
                  {new Date(movie.release_date).toLocaleDateString()}
                </span>
              )}
              {movie.runtime > 0 && (
                <span>{formatRuntime(movie.runtime)}</span>
              )}
              {movie.genres && movie.genres.length > 0 && (
                <span>
                  {movie.genres.map((g) => g.name).join(", ")}
                </span>
              )}
            </div>

            {movie.tagline && (
              <p className="text-lg md:text-xl italic text-gray-300 mb-4">
                {movie.tagline}
              </p>
            )}

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300">{movie.overview}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="font-bold">
                  {Math.round(movie.vote_average * 10)}%
                </span>
              </div>
              <span className="text-sm">User Score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
