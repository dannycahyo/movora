import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  releaseDate: string;
}

const MovieCard = ({
  id,
  title,
  posterPath,
  rating,
  releaseDate,
}: MovieCardProps) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(
      undefined,
      options,
    );
  };

  // Round rating to one decimal place
  const formattedRating = Math.round(rating * 10) / 10;

  return (
    <Link href={`/movie/${id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={
              posterPath
                ? `https://image.tmdb.org/t/p/w500${posterPath}`
                : "/placeholder-poster.jpg"
            }
            alt={`${title} poster`}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded-full flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-yellow-400 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {formattedRating}
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mt-auto">
            {releaseDate
              ? formatDate(releaseDate)
              : "Release date unknown"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
