import Header from "@/src/components/header/Header";
import Footer from "@/src/components/footer/Footer";
import TVShowHero from "@/src/components/tvshow/TVShowHero";
import CastSection from "@/src/components/tvshow/CastSection";
import CrewSection from "@/src/components/tvshow/CrewSection";
import SimilarTVShows from "@/src/components/tvshow/SimilarTVShows";
import {
  useTVShowDetails,
  useTVShowCredits,
  useSimilarTVShows,
} from "@/src/hooks/useTVShows";

export default function TVShowDetailScreen({
  tvShowId,
}: {
  tvShowId: number;
}) {
  const {
    data: tvShow,
    isLoading: isLoadingTVShow,
    isError: isErrorTVShow,
    error: tvShowError,
  } = useTVShowDetails(tvShowId);

  const { data: credits, isLoading: isLoadingCredits } =
    useTVShowCredits(tvShowId);

  const { data: similarTVShows, isLoading: isLoadingSimilar } =
    useSimilarTVShows(tvShowId);

  if (isLoadingTVShow) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header data-testid="header-container" />
        <div className="flex-grow flex items-center justify-center">
          <div
            data-testid="loading-spinner"
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"
          ></div>
        </div>
        <Footer data-testid="footer-container" />
      </div>
    );
  }

  if (isErrorTVShow) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header data-testid="header-container" />
        <div className="flex-grow flex items-center justify-center flex-col p-4">
          <h2
            data-testid="error-title"
            className="text-2xl font-bold mb-4"
          >
            Error Loading TV Show
          </h2>
          <p data-testid="error-message" className="text-red-400">
            {(tvShowError as Error)?.message ||
              "Failed to load TV show details"}
          </p>
        </div>
        <Footer data-testid="footer-container" />
      </div>
    );
  }

  if (!tvShow) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header data-testid="header-container" />
        <div className="flex-grow flex items-center justify-center">
          <p data-testid="not-found-message" className="text-xl">
            TV Show not found
          </p>
        </div>
        <Footer data-testid="footer-container" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header data-testid="header-container" />

      <main className="flex-grow">
        <TVShowHero tvShow={tvShow} />

        <div className="container mx-auto px-4">
          {isLoadingCredits ? (
            <div className="py-10 flex justify-center">
              <div
                data-testid="credits-loading"
                className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"
              ></div>
            </div>
          ) : credits?.cast && credits.cast.length > 0 ? (
            <CastSection cast={credits.cast} />
          ) : null}

          {isLoadingCredits ? null : credits?.crew &&
            credits.crew.length > 0 ? (
            <CrewSection crew={credits.crew} />
          ) : null}

          {isLoadingSimilar ? (
            <div className="py-10 flex justify-center">
              <div
                data-testid="similar-loading"
                className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"
              ></div>
            </div>
          ) : similarTVShows?.results &&
            similarTVShows.results.length > 0 ? (
            <SimilarTVShows tvShows={similarTVShows.results} />
          ) : null}
        </div>
      </main>

      <Footer data-testid="footer-container" />
    </div>
  );
}
