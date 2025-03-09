export const mockMovieDetailsData = {
  id: 1,
  title: "Test Movie",
  backdrop_path: "/backdrop.jpg",
  poster_path: "/poster.jpg",
  overview: "Test overview",
  tagline: "Test tagline",
  release_date: "2023-01-01",
  runtime: 120,
  genres: [{ id: 28, name: "Action" }],
  vote_average: 8.5,
};

export const mockMovieCreditsData = {
  id: 1,
  cast: [
    {
      cast_id: 1,
      name: "Actor 1",
      profile_path: "/profile1.jpg",
      character: "Character 1",
    },
    {
      cast_id: 2,
      name: "Actor 2",
      profile_path: "/profile2.jpg",
      character: "Character 2",
    },
  ],
  crew: [
    {
      id: 1,
      name: "Director",
      department: "Directing",
      job: "Director",
    },
    {
      id: 2,
      name: "Writer",
      department: "Writing",
      job: "Screenplay",
    },
  ],
};

export const mockSimilarMoviesData = {
  results: [
    {
      id: 2,
      title: "Similar Movie 1",
      poster_path: "/similarpath1.jpg",
      release_date: "2023-02-01",
      overview: "Overview",
      backdrop_path: "/backdrop.jpg",
      vote_average: 7.5,
      adult: false,
      genre_ids: [28],
      original_language: "en",
      original_title: "Original Title",
      popularity: 100,
      video: false,
      vote_count: 1000,
    },
  ],
  page: 1,
  total_pages: 1,
  total_results: 1,
};

export const mockMovieError = new Error("Failed to load movie");
