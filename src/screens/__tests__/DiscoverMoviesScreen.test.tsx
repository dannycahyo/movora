import "@/src/utils/test/mockMovieHooks";
import { render, screen, fireEvent } from "@/src/utils/test-utils";
import DiscoverMoviesScreen from "../DiscoverMoviesScreen";
import {
  setupMocksWithData,
  setupMocksLoading,
  clearAllMocks,
} from "@/src/utils/test/mockMovieHooks";
import { mockMovieData } from "@/src/utils/test/mockMovieData";
import { useRouter } from "next/router";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    pathname: "/discover",
    query: {},
  })),
}));

describe("DiscoverMoviesScreen", () => {
  beforeEach(() => {
    setupMocksWithData();
    clearAllMocks();
    mockPush.mockClear();
  });

  it("renders all components with movie data", () => {
    render(
      <DiscoverMoviesScreen
        initialYear=""
        initialGenreId=""
        initialSortBy="popularity.desc"
        initialPage={1}
      />,
    );

    expect(screen.getByTestId("discover-title")).toBeInTheDocument();
    expect(screen.getByTestId("discover-title").textContent).toBe(
      "Discover Movies",
    );

    expect(
      screen.getByTestId("header-container"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("header-logo")).toBeInTheDocument();
    expect(
      screen.getByTestId("header-nav-desktop"),
    ).toBeInTheDocument();

    expect(screen.getByTestId("year-filter")).toBeInTheDocument();
    expect(screen.getByTestId("genre-filter")).toBeInTheDocument();
    expect(screen.getByTestId("sort-filter")).toBeInTheDocument();

    expect(screen.getByTestId("movies-grid")).toBeInTheDocument();
    expect(screen.getByTestId("movies-count")).toBeInTheDocument();
    expect(screen.getByTestId("movies-count").textContent).toBe(
      `Showing ${mockMovieData.results.length} of ${mockMovieData.total_results} movies`,
    );

    expect(screen.getAllByTestId(/movie-card-/)).toHaveLength(
      mockMovieData.results.length,
    );

    expect(
      screen.getByTestId("pagination-container"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("pagination-prev")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-next")).toBeInTheDocument();
    expect(
      screen.getByTestId("pagination-page-1"),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("footer-container"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("footer-logo")).toBeInTheDocument();
  });

  it("handles loading state correctly", async () => {
    setupMocksLoading();

    render(
      <DiscoverMoviesScreen
        initialYear=""
        initialGenreId=""
        initialSortBy="popularity.desc"
        initialPage={1}
      />,
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByTestId("movies-count").textContent).toBe(
      "Loading movies...",
    );

    expect(screen.getByTestId("year-filter")).toBeInTheDocument();
    expect(screen.getByTestId("genre-filter")).toBeInTheDocument();
    expect(screen.getByTestId("sort-filter")).toBeInTheDocument();
  });

  it("handles error state correctly", async () => {
    const mockedHooks = setupMocksWithData();

    mockedHooks.useDiscoverMovies.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    render(
      <DiscoverMoviesScreen
        initialYear=""
        initialGenreId=""
        initialSortBy="popularity.desc"
        initialPage={1}
      />,
    );

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByTestId("error-message").textContent).toBe(
      "An error occurred while loading movies. Please try again later.",
    );

    expect(
      screen.queryByTestId("pagination-container"),
    ).not.toBeInTheDocument();
  });

  it("changes filters correctly", async () => {
    render(
      <DiscoverMoviesScreen
        initialYear=""
        initialGenreId=""
        initialSortBy="popularity.desc"
        initialPage={1}
      />,
    );

    fireEvent.change(screen.getByTestId("year-filter"), {
      target: { value: "2023" },
    });
    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: "/discover",
        query: {
          year: "2023",
          sort_by: "popularity.desc",
          page: "1",
        },
      },
      undefined,
      { scroll: true },
    );

    mockPush.mockClear();

    fireEvent.change(screen.getByTestId("genre-filter"), {
      target: { value: "28" },
    });
    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: "/discover",
        query: {
          genre: "28",
          sort_by: "popularity.desc",
          page: "1",
        },
      },
      undefined,
      { scroll: true },
    );

    mockPush.mockClear();

    fireEvent.change(screen.getByTestId("sort-filter"), {
      target: { value: "vote_average.desc" },
    });
    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: "/discover",
        query: {
          sort_by: "vote_average.desc",
          page: "1",
        },
      },
      undefined,
      { scroll: true },
    );
  });

  it("handles pagination correctly", async () => {
    render(
      <DiscoverMoviesScreen
        initialYear=""
        initialGenreId=""
        initialSortBy="popularity.desc"
        initialPage={1}
      />,
    );

    fireEvent.click(screen.getByTestId("pagination-next"));
    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: "/discover",
        query: {
          sort_by: "popularity.desc",
          page: "2",
        },
      },
      undefined,
      { scroll: true },
    );
  });

  it("applies initial props correctly", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: "/discover",
      query: {
        year: "2022",
        genre: "28",
        sort_by: "vote_average.desc",
        page: "3",
      },
    });

    render(
      <DiscoverMoviesScreen
        initialYear="2022"
        initialGenreId="28"
        initialSortBy="vote_average.desc"
        initialPage={3}
      />,
    );

    expect(screen.getByTestId("year-filter")).toHaveValue("2022");
    expect(screen.getByTestId("genre-filter")).toHaveValue("28");
    expect(screen.getByTestId("sort-filter")).toHaveValue(
      "vote_average.desc",
    );

    const page3Button = screen.getByTestId("pagination-page-3");
    expect(page3Button.getAttribute("aria-current")).toBe("page");
    expect(page3Button).toHaveClass("bg-red-600");
  });
});
