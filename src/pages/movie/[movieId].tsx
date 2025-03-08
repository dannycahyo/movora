import { GetServerSideProps } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createQueryClient } from "@/src/utils/reactQuery";
import { tmdbAPI } from "@/src/utils/tmdb";
import { movieKeys } from "@/src/hooks/useMovies";
import MovieDetailScreen from "@/src/screens/MovieDetailScreen";

import type { DehydratedState } from "@tanstack/react-query";

interface MoviePageProps {
  dehydratedState: DehydratedState;
  movieId: number;
}

export default function MoviePage({
  dehydratedState,
  movieId,
}: MoviePageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <MovieDetailScreen movieId={movieId} />
    </HydrationBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context,
) => {
  const { movieId } = context.params as { movieId: string };
  const parsedMovieId = parseInt(movieId, 10);

  if (isNaN(parsedMovieId)) {
    return {
      notFound: true,
    };
  }

  const queryClient = createQueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: movieKeys.detail(parsedMovieId),
        queryFn: () => tmdbAPI.getMovieDetails(parsedMovieId),
      }),
      queryClient.prefetchQuery({
        queryKey: movieKeys.credits(parsedMovieId),
        queryFn: () => tmdbAPI.getMovieCredits(parsedMovieId),
      }),
      queryClient.prefetchQuery({
        queryKey: movieKeys.similar(parsedMovieId),
        queryFn: () => tmdbAPI.getSimilarMovies(parsedMovieId),
      }),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        movieId: parsedMovieId,
      },
    };
  } catch (error) {
    console.error("Error prefetching movie data:", error);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        movieId: parsedMovieId,
      },
    };
  }
};
