import "@/src/utils/test/mockMovieHooks";
import { render, screen, fireEvent } from "@/src/utils/test-utils";
import TrendingMoviesScreen from "../TrendingMoviesScreen";
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
    pathname: "/trending",
    query: {},
  })),
}));

describe("TrendingMoviesScreen", () => {
  beforeEach(() => {
    setupMocksWithData();
    clearAllMocks();
    mockPush.mockClear();
  });

  it("renders all components with movie data", () => {
    render(
      <TrendingMoviesScreen
        initialTimeWindow="day"
        initialPage={1}
      />,
    );

    expect(screen.getByTestId("trending-title")).toBeInTheDocument();
    expect(screen.getByTestId("trending-title").textContent).toBe(
      "Trending Movies",
    );

    expect(
      screen.getByTestId("trending-subtitle"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("trending-subtitle").textContent).toBe(
      "Popular movies trending today",
    );

    expect(
      screen.getByTestId("header-container"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("header-logo")).toBeInTheDocument();
    expect(
      screen.getByTestId("header-nav-desktop"),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("time-window-filter"),
    ).toBeInTheDocument();

    expect(screen.getByTestId("movies-count")).toBeInTheDocument();
    expect(screen.getByTestId("movies-count").textContent).toBe(
      `Showing ${mockMovieData.results.length} of ${mockMovieData.total_results} trending movies`,
    );

    expect(screen.getByTestId("movies-grid")).toBeInTheDocument();
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
      <TrendingMoviesScreen
        initialTimeWindow="day"
        initialPage={1}
      />,
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByTestId("movies-count").textContent).toBe(
      "Loading trending movies...",
    );

    expect(
      screen.getByTestId("time-window-filter"),
    ).toBeInTheDocument();
  });

  it("handles error state correctly", async () => {
    const mockedHooks = setupMocksWithData();

    mockedHooks.useTrendingMovies.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    render(
      <TrendingMoviesScreen
        initialTimeWindow="day"
        initialPage={1}
      />,
    );

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByTestId("error-message").textContent).toBe(
      "An error occurred while loading trending movies. Please try again later.",
    );
    expect(
      screen.queryByTestId("pagination-container"),
    ).not.toBeInTheDocument();
  });

  it("handles pagination correctly", async () => {
    render(
      <TrendingMoviesScreen
        initialTimeWindow="day"
        initialPage={1}
      />,
    );

    fireEvent.click(screen.getByTestId("pagination-next"));
    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: "/trending",
        query: {
          time: "day",
          page: 2,
        },
      },
      undefined,
      { scroll: true },
    );
  });

  it("applies initial props correctly", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: "/trending",
      query: {
        time: "week",
        page: "3",
      },
    });

    render(
      <TrendingMoviesScreen
        initialTimeWindow="week"
        initialPage={3}
      />,
    );

    expect(screen.getByTestId("time-window-filter")).toHaveValue(
      "week",
    );
    expect(screen.getByTestId("trending-subtitle").textContent).toBe(
      "Popular movies trending this week",
    );

    const page3Button = screen.getByTestId("pagination-page-3");
    expect(page3Button.getAttribute("aria-current")).toBe("page");
    expect(page3Button).toHaveClass("bg-red-600");
  });

  it("updates from router query parameters", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: "/trending",
      query: {
        time: "week",
        page: "2",
      },
    });

    render(
      <TrendingMoviesScreen
        initialTimeWindow="day"
        initialPage={1}
      />,
    );

    expect(screen.getByTestId("time-window-filter")).toHaveValue(
      "week",
    );

    const page2Button = screen.getByTestId("pagination-page-2");
    expect(page2Button.getAttribute("aria-current")).toBe("page");
  });
});
