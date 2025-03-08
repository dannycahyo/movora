import { GetServerSideProps } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createQueryClient } from "@/src/utils/reactQuery";
import { tmdbAPI } from "@/src/utils/tmdb";
import { movieKeys } from "@/src/hooks/useMovies";
import SearchMoviesScreen from "@/src/screens/SearchMoviesScreen";

import type { DehydratedState } from "@tanstack/react-query";

interface SearchPageProps {
  dehydratedState: DehydratedState;
  initialQuery: string;
  initialPage: number;
}

export default function SearchPage({
  dehydratedState,
  initialQuery,
  initialPage,
}: SearchPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <SearchMoviesScreen
        initialQuery={initialQuery}
        initialPage={initialPage}
      />
    </HydrationBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}) => {
  const searchQuery =
    typeof query.query === "string" ? query.query : "";
  const page =
    typeof query.page === "string" ? parseInt(query.page) : 1;

  if (!searchQuery) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const queryClient = createQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: movieKeys.search(searchQuery, page),
      queryFn: () => tmdbAPI.searchMoviesWithPage(searchQuery, page),
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        initialQuery: searchQuery,
        initialPage: page,
      },
    };
  } catch (error) {
    console.error("Error prefetching search data:", error);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        initialQuery: searchQuery,
        initialPage: page,
      },
    };
  }
};
