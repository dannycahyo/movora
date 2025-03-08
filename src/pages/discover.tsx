import { GetServerSideProps } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createQueryClient } from "@/src/utils/reactQuery";
import { tmdbAPI } from "@/src/utils/tmdb";
import { movieKeys } from "@/src/hooks/useMovies";
import DiscoverMoviesScreen from "@/src/screens/DiscoverMoviesScreen";

import type { DehydratedState } from "@tanstack/react-query";

interface DiscoverPageProps {
  dehydratedState: DehydratedState;
  initialYear: string;
  initialGenreId: string;
  initialSortBy: string;
  initialPage: number;
}

export default function DiscoverPage({
  dehydratedState,
  initialYear,
  initialGenreId,
  initialSortBy,
  initialPage,
}: DiscoverPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <DiscoverMoviesScreen
        initialYear={initialYear}
        initialGenreId={initialGenreId}
        initialSortBy={initialSortBy}
        initialPage={initialPage}
      />
    </HydrationBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}) => {
  const year = typeof query.year === "string" ? query.year : "";
  const genreId = typeof query.genre === "string" ? query.genre : "";
  const sortBy =
    typeof query.sort_by === "string"
      ? query.sort_by
      : "popularity.desc";
  const page =
    typeof query.page === "string" ? parseInt(query.page) : 1;

  const queryClient = createQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: movieKeys.genres(),
      queryFn: tmdbAPI.getGenres,
    });

    await queryClient.prefetchQuery({
      queryKey: movieKeys.discover({ year, genreId, sortBy, page }),
      queryFn: () =>
        tmdbAPI.discoverMovies({ year, genreId, sortBy, page }),
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        initialYear: year,
        initialGenreId: genreId,
        initialSortBy: sortBy,
        initialPage: page,
      },
    };
  } catch (error) {
    console.error("Error prefetching discover data:", error);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        initialYear: year,
        initialGenreId: genreId,
        initialSortBy: sortBy,
        initialPage: page,
      },
    };
  }
};
