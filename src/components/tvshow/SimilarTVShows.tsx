import TVShowCard from "@/src/components/card/TVShowCard";
import { TVShow } from "@/src/types/TVShowList";

interface SimilarTVShowsProps {
  tvShows: TVShow[];
}

export default function SimilarTVShows({
  tvShows,
}: SimilarTVShowsProps) {
  const displayTVShows = tvShows.slice(0, 12);

  return (
    <div className="py-8 border-t border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Similar TV Shows</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {displayTVShows.map((tvShow) => (
          <TVShowCard
            key={tvShow.id}
            id={tvShow.id}
            title={tvShow.name}
            posterPath={tvShow.poster_path || ""}
            rating={tvShow.vote_average}
            firstAirDate={tvShow.first_air_date}
          />
        ))}
      </div>
    </div>
  );
}
