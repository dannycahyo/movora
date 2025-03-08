import Header from "@/src/components/header/Header";
import Footer from "@/src/components/footer/Footer";
import MovieHero from "@/src/components/movie/MovieHero";
import CastSection from "@/src/components/movie/CastSection";
import CrewSection from "@/src/components/movie/CrewSection";
import SimilarMovies from "@/src/components/movie/SimilarMovies";
import {
  useMovieDetails,
  useMovieCredits,
  useSimilarMovies,
} from "@/src/hooks/useMovies";

export default function MovieDetailScreen({
  movieId,
}: {
  movieId: number;
}) {
  const {
    data: movie,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
    error: movieError,
  } = useMovieDetails(movieId);

  const { data: credits, isLoading: isLoadingCredits } =
    useMovieCredits(movieId);

  const { data: similarMovies, isLoading: isLoadingSimilar } =
    useSimilarMovies(movieId);

  if (isLoadingMovie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isErrorMovie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center flex-col p-4">
          <h2 className="text-2xl font-bold mb-4">
            Error Loading Movie
          </h2>
          <p className="text-red-400">
            {(movieError as Error)?.message ||
              "Failed to load movie details"}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">Movie not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />

      <main className="flex-grow">
        <MovieHero movie={movie} />

        <div className="container mx-auto px-4">
          {isLoadingCredits ? (
            <div className="py-10 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
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
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : similarMovies?.results &&
            similarMovies.results.length > 0 ? (
            <SimilarMovies movies={similarMovies.results} />
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
