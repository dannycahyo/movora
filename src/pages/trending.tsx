import { GetServerSideProps } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createQueryClient } from "@/src/utils/reactQuery";
import { tmdbAPI } from "@/src/utils/tmdb";
import { movieKeys } from "@/src/hooks/useMovies";
import TrendingMoviesScreen from "@/src/screens/TrendingMoviesScreen";

import type { DehydratedState } from "@tanstack/react-query";

interface TrendingPageProps {
  dehydratedState: DehydratedState;
  initialTimeWindow: string;
  initialPage: number;
}

export default function TrendingPage({
  dehydratedState,
  initialTimeWindow,
  initialPage,
}: TrendingPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <TrendingMoviesScreen
        initialTimeWindow={initialTimeWindow}
        initialPage={initialPage}
      />
    </HydrationBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}) => {
  const timeWindow =
    typeof query.time === "string" &&
    (query.time === "day" || query.time === "week")
      ? query.time
      : "day";

  const page =
    typeof query.page === "string" ? parseInt(query.page) : 1;

  const queryClient = createQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: movieKeys.trending(timeWindow, page),
      queryFn: () => tmdbAPI.getTrending(timeWindow, page),
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        initialTimeWindow: timeWindow,
        initialPage: page,
      },
    };
  } catch (error) {
    console.error("Error prefetching trending data:", error);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        initialTimeWindow: timeWindow,
        initialPage: page,
      },
    };
  }
};
