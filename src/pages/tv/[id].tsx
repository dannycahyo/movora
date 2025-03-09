import { GetServerSideProps } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createQueryClient } from "@/src/utils/reactQuery";
import { tmdbAPI } from "@/src/utils/tmdb";
import { tvShowsKeys } from "@/src/hooks/useTVShows";
import TVShowDetailScreen from "@/src/screens/TVShowDetailScreen";

import type { DehydratedState } from "@tanstack/react-query";

interface TVShowDetailPageProps {
  dehydratedState: DehydratedState;
  id: number;
}

export default function TVShowDetailPage({
  dehydratedState,
  id,
}: TVShowDetailPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <TVShowDetailScreen tvShowId={id} />
    </HydrationBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const id = Number(params?.id);

  if (isNaN(id)) {
    return {
      notFound: true,
    };
  }

  const queryClient = createQueryClient();

  try {
    // Prefetch TV show details
    await queryClient.prefetchQuery({
      queryKey: tvShowsKeys.detail(id),
      queryFn: () => tmdbAPI.getTVShowDetails(id),
    });

    // Prefetch TV show credits
    await queryClient.prefetchQuery({
      queryKey: tvShowsKeys.credits(id),
      queryFn: () => tmdbAPI.getTVShowCredits(id),
    });

    // Prefetch similar TV shows
    await queryClient.prefetchQuery({
      queryKey: tvShowsKeys.similar(id),
      queryFn: () => tmdbAPI.getSimilarTVShows(id),
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        id,
      },
    };
  } catch (error) {
    console.error("Error prefetching TV show data:", error);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        id,
      },
    };
  }
};
