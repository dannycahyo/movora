import Link from "next/link";
import Image from "next/image";
import { formatReleaseDate } from "@/src/utils/formatters";

interface TVShowCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating?: number;
  firstAirDate?: string;
}

export default function TVShowCard({
  id,
  title,
  posterPath,
  rating,
  firstAirDate,
}: TVShowCardProps) {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : undefined;

  return (
    <Link
      href={`/tv/${id}`}
      className="block rounded-lg overflow-hidden bg-gray-800 hover:scale-105 transition-transform duration-200 shadow-md"
    >
      <div className="relative aspect-[2/3] bg-gray-700">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No Image
          </div>
        )}

        {rating !== undefined && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {rating.toFixed(1)}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{title}</h3>
        {firstAirDate && (
          <p className="text-xs text-gray-400 mt-1">
            {formatReleaseDate(firstAirDate)}
          </p>
        )}
      </div>
    </Link>
  );
}
