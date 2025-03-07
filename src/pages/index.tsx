import { useState } from "react";
import Header from "@/src/components/header/Header";
import Footer from "@/src/components/footer/Footer";
import HeroCarousel from "@/src/components/hero/HeroCarousel";
import MovieRow from "@/src/components/movie/MovieRow";

// Mock data for Hero carousel
const heroMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
    backdropPath: "/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg",
    releaseDate: "2024-03-01",
  },
  {
    id: 2,
    title: "Deadpool & Wolverine",
    overview:
      "Third film in the Deadpool franchise, bringing together Deadpool and Wolverine for the first time. The film will see the return of Reynolds as Deadpool and Hugh Jackman as Wolverine.",
    backdropPath: "/yQZjXjQeBG3ER6eg1pHBmYKR5kb.jpg",
    releaseDate: "2024-07-26",
  },
  {
    id: 3,
    title: "Oppenheimer",
    overview:
      "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
    backdropPath: "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    releaseDate: "2023-07-21",
  },
];

// Mock data for different movie categories
const upcomingMovies = [
  {
    id: 10,
    title: "Kingdom of the Planet of the Apes",
    posterPath: "/vJU3rXSP9hwUuLeq8IpfsJShLOk.jpg",
    rating: 7.9,
    releaseDate: "2024-05-10",
  },
  {
    id: 11,
    title: "Bad Boys: Ride or Die",
    posterPath: "/fBHHXKC34ffxAsQvDe0ZJbvmTEQ.jpg",
    rating: 8.0,
    releaseDate: "2024-06-07",
  },
  {
    id: 12,
    title: "Inside Out 2",
    posterPath: "/yjMIeJgPmEcwhQqJYNCWryEgIK0.jpg",
    rating: 8.2,
    releaseDate: "2024-06-14",
  },
  {
    id: 13,
    title: "A Quiet Place: Day One",
    posterPath: "/qZOWoXJe4X109oJY0jrDAVrxowd.jpg",
    rating: 7.8,
    releaseDate: "2024-06-28",
  },
  {
    id: 14,
    title: "Despicable Me 4",
    posterPath: "/kBeUxTlr1QXV1j4OYpY3YnLPG1p.jpg",
    rating: 7.6,
    releaseDate: "2024-07-03",
  },
  {
    id: 15,
    title: "Twisters",
    posterPath: "/jih0uzQ7YHS6i0yQkUZaB7fQpzr.jpg",
    rating: 7.5,
    releaseDate: "2024-07-19",
  },
  {
    id: 16,
    title: "Alien: Romulus",
    posterPath: "/acrkJ5gUmUxIhMW2ge6vYGwfCg7.jpg",
    rating: 8.1,
    releaseDate: "2024-08-16",
  },
];

const popularMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    posterPath: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    rating: 8.7,
    releaseDate: "1994-09-23",
  },
  {
    id: 2,
    title: "The Godfather",
    posterPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    rating: 8.7,
    releaseDate: "1972-03-14",
  },
  {
    id: 3,
    title: "The Dark Knight",
    posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 8.5,
    releaseDate: "2008-07-16",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    posterPath: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    rating: 8.5,
    releaseDate: "1994-09-10",
  },
  {
    id: 5,
    title: "Fight Club",
    posterPath: "/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg",
    rating: 8.4,
    releaseDate: "1999-10-15",
  },
  {
    id: 6,
    title: "Forrest Gump",
    posterPath: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    rating: 8.5,
    releaseDate: "1994-06-23",
  },
];

const topRatedMovies = [
  {
    id: 20,
    title: "The Shawshank Redemption",
    posterPath: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    rating: 8.7,
    releaseDate: "1994-09-23",
  },
  {
    id: 21,
    title: "The Godfather",
    posterPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    rating: 8.7,
    releaseDate: "1972-03-14",
  },
  {
    id: 22,
    title: "12 Angry Men",
    posterPath: "/ppd84D2i9W8jXmsyInGyihiSyqz.jpg",
    rating: 8.5,
    releaseDate: "1957-04-10",
  },
  {
    id: 23,
    title: "Schindler's List",
    posterPath: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    rating: 8.6,
    releaseDate: "1993-12-15",
  },
  {
    id: 24,
    title: "Spirited Away",
    posterPath: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    rating: 8.5,
    releaseDate: "2001-07-20",
  },
  {
    id: 25,
    title: "Parasite",
    posterPath: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    rating: 8.5,
    releaseDate: "2019-05-30",
  },
  {
    id: 26,
    title: "Interstellar",
    posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.4,
    releaseDate: "2014-11-07",
  },
];

export default function Home() {
  const [heroData] = useState(heroMovies);
  const [upcoming] = useState(upcomingMovies);
  const [popular] = useState(popularMovies);
  const [topRated] = useState(topRatedMovies);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-[family-name:var(--font-geist-sans)] flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <HeroCarousel movies={heroData} />

          <MovieRow
            title="Upcoming Movies"
            viewAllLink="/movies/upcoming"
            movies={upcoming}
          />

          <MovieRow
            title="Popular Movies"
            viewAllLink="/movies/popular"
            movies={popular}
          />

          <MovieRow
            title="Top Rated Movies"
            viewAllLink="/movies/top-rated"
            movies={topRated}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
