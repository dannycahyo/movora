import { GetServerSideProps } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createQueryClient } from "@/src/utils/reactQuery";
import { tmdbAPI } from "@/src/utils/tmdb";
import { movieKeys } from "@/src/hooks/useMovies";
import HomeScreen from "@/src/screens/HomeScreen";

import type { DehydratedState } from "@tanstack/react-query";

interface HomeProps {
  dehydratedState: DehydratedState;
}

export default function Home({ dehydratedState }: HomeProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeScreen />
    </HydrationBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = createQueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: movieKeys.trending(),
        queryFn: () => tmdbAPI.getTrending(),
      }),
      queryClient.prefetchQuery({
        queryKey: movieKeys.popular(),
        queryFn: tmdbAPI.getPopular,
      }),
      queryClient.prefetchQuery({
        queryKey: movieKeys.upcoming(),
        queryFn: tmdbAPI.getUpcoming,
      }),
      queryClient.prefetchQuery({
        queryKey: movieKeys.topRated(),
        queryFn: tmdbAPI.getTopRated,
      }),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error("Error prefetching data:", error);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};
