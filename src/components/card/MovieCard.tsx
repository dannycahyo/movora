import Link from "next/link";
import Image from "next/image";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  rating: number;
  releaseDate: string;
}

export default function MovieCard({
  id,
  title,
  posterPath,
  rating,
  releaseDate,
}: MovieCardProps) {
  const year = new Date(releaseDate).getFullYear();

  return (
    <Link
      href={`/movie/${id}`}
      className="block group"
      data-testid={`movie-card-${id}`}
    >
      <div className="relative rounded-lg overflow-hidden bg-gray-800">
        <div className="aspect-[2/3] relative">
          {posterPath ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={title}
              fill
              sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px"
              className="object-cover transition-transform group-hover:scale-105"
              loading="lazy"
              data-testid={`movie-poster-${id}`}
            />
          ) : (
            <div
              className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600"
              data-testid={`movie-no-poster-${id}`}
            >
              No Image
            </div>
          )}

          <div
            className="absolute bottom-2 left-2 bg-black/70 rounded-full px-2 py-1 text-xs font-bold flex items-center"
            data-testid={`movie-rating-${id}`}
          >
            <svg
              className="w-3 h-3 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating.toFixed(1)}
          </div>
        </div>
      </div>

      <div className="mt-2">
        <h3
          className="text-sm font-medium text-white line-clamp-1 group-hover:text-red-400 transition-colors"
          data-testid={`movie-title-${id}`}
        >
          {title}
        </h3>
        <p
          className="text-xs text-gray-400"
          data-testid={`movie-year-${id}`}
        >
          {year}
        </p>
      </div>
    </Link>
  );
}
