import { GetServerSideProps } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createQueryClient } from "@/src/utils/reactQuery";
import { tmdbAPI } from "@/src/utils/tmdb";
import { tvShowsKeys } from "@/src/hooks/useTVShows";
import TVShowsScreen from "@/src/screens/TVShowsScreen";

import type { DehydratedState } from "@tanstack/react-query";

interface TVShowsPageProps {
  dehydratedState: DehydratedState;
  initialYear: string;
  initialGenreId: string;
  initialSortBy: string;
  initialPage: number;
}

export default function TVShowsPage({
  dehydratedState,
  initialYear,
  initialGenreId,
  initialSortBy,
  initialPage,
}: TVShowsPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <TVShowsScreen
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
    // Prefetch TV genres
    await queryClient.prefetchQuery({
      queryKey: tvShowsKeys.genres(),
      queryFn: tmdbAPI.getTVGenres,
    });

    // Prefetch discover TV shows with filters
    await queryClient.prefetchQuery({
      queryKey: tvShowsKeys.discover({ year, genreId, sortBy, page }),
      queryFn: () =>
        tmdbAPI.discoverTVShows({ year, genreId, sortBy, page }),
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
    console.error("Error prefetching TV shows data:", error);
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
