import Image from "next/image";
import { formatReleaseDate } from "@/src/utils/formatters";
import { TVShowDetail } from "@/src/types/TVShowDetail";

interface TVShowHeroProps {
  tvShow: TVShowDetail;
}

export default function TVShowHero({ tvShow }: TVShowHeroProps) {
  const {
    name,
    backdrop_path,
    poster_path,
    first_air_date,
    last_air_date,
    vote_average,
    episode_run_time,
    number_of_episodes,
    number_of_seasons,
    genres,
    overview,
    created_by,
    networks,
    status,
  } = tvShow;

  const backdropUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const formatRuntime = (minutes: number[]): string => {
    if (!minutes || minutes.length === 0) return "N/A";
    if (minutes.length === 1) {
      return `${minutes[0]} min`;
    }
    return `${Math.min(...minutes)}-${Math.max(...minutes)} min`;
  };

  const creators =
    created_by?.map((creator) => creator.name).join(", ") || "N/A";
  const runtime = formatRuntime(episode_run_time);

  return (
    <div className="relative">
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        <Image
          src={backdropUrl}
          alt={name}
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 -mt-40">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-48 md:w-64 h-auto rounded-lg overflow-hidden shadow-lg mx-auto md:mx-0">
            <Image
              src={posterUrl}
              alt={name}
              width={300}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="flex-grow mt-6 md:mt-0">
            <h1 className="text-3xl font-bold mb-2">{name}</h1>

            <div className="flex items-center gap-2 text-sm text-gray-300 mb-4 flex-wrap">
              {first_air_date && (
                <span className="bg-gray-800 px-2 py-1 rounded">
                  {formatReleaseDate(first_air_date)}
                  {last_air_date &&
                    first_air_date !== last_air_date &&
                    ` - ${formatReleaseDate(last_air_date)}`}
                </span>
              )}

              {vote_average !== undefined && (
                <span className="bg-gray-800 px-2 py-1 rounded flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {vote_average.toFixed(1)}
                </span>
              )}

              {runtime && (
                <span className="bg-gray-800 px-2 py-1 rounded">
                  {runtime}
                </span>
              )}

              {status && (
                <span className="bg-gray-800 px-2 py-1 rounded">
                  {status}
                </span>
              )}

              {number_of_seasons && (
                <span className="bg-gray-800 px-2 py-1 rounded">
                  {number_of_seasons}{" "}
                  {number_of_seasons === 1 ? "Season" : "Seasons"}
                </span>
              )}

              {number_of_episodes && (
                <span className="bg-gray-800 px-2 py-1 rounded">
                  {number_of_episodes}{" "}
                  {number_of_episodes === 1 ? "Episode" : "Episodes"}
                </span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-red-900 text-white text-xs px-2 py-1 rounded"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                {overview || "No overview available."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {creators && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Created By
                  </h3>
                  <p className="text-white">{creators}</p>
                </div>
              )}

              {networks && networks.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Network
                  </h3>
                  <div className="flex gap-3 items-center">
                    {networks.map((network) => (
                      <div key={network.id} className="max-h-10">
                        {network.logo_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                            alt={network.name}
                            width={60}
                            height={30}
                            className="object-contain h-8"
                          />
                        ) : (
                          <span>{network.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
