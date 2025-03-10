# Movora - Movie and TV Show Information App

Movora is a web application that allows users to discover, search, and explore information about movies and TV shows using The Movie Database (TMDB) API.

## Table of Contents

- [Hosted Application](#hosted-application)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Pages](#pages)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Data Fetching](#data-fetching)
- [Credits](#credits)
- [License](#license)

## Hosted Application

This project is already hosted and can be accessed at [https://movora.vercel.app/](https://movora.vercel.app/).

## Features

- Browse trending movies and TV shows
- Search for specific movies and TV shows
- Discover movies and TV shows with filtering options (by year, genre, sort order)
- View detailed information about movies and TV shows
- See cast and crew information
- Find similar content recommendations

## Tech Stack

- **Next.js 15.2.1**: React framework with server-side rendering
- **React 19.0.0**: UI library
- **TypeScript**: Type safety
- **TanStack React Query**: Data fetching and state management
- **Tailwind CSS**: Styling
- **Jest & React Testing Library**: Testing

## Pages

- **Home** (`/`): Featured, trending, popular, upcoming, and top-rated movies
- **Search** (`/search`): Search for movies and TV shows
- **Movie Details** (`/movie/[movieId]`): Detailed information about a specific movie
- **TV Show Details** (`/tv/[id]`): Detailed information about a specific TV show
- **Trending** (`/trending`): Browse trending movies with time window filter
- **Discover** (`/discover`): Discover movies with various filters
- **TV Shows** (`/tv-shows`): Browse TV shows with filtering options

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/dannycahyo/movora.git
   cd movora
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env.local`:
     ```
     cp .env.example .env.local
     ```
   - Get your API read access token from [TMDB](https://www.themoviedb.org/settings/api)
   - Update the token in `.env.local`

4. Run the development server:
   ```
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Starts the development server with Turbopack
- `npm run test`: Runs tests
- `npm run test:watch`: Runs tests in watch mode
- `npm run build`: Builds the application for production
- `npm run start`: Starts the production server

## Environment Variables

- `BASE_URL`: The base URL for the TMDB API (default: https://api.themoviedb.org/3)
- `API_READ_ACCESS_TOKEN`: Your TMDB API read access token

## Project Structure

- `/src/pages`: Next.js pages and API routes
- `/src/screens`: Screen components for each page
- `/src/components`: Reusable components
- `/src/hooks`: Custom hooks for data fetching (useMovies, useTVShows)
- `/src/utils`: Utility functions including TMDB API client
- `/src/types`: TypeScript types and interfaces

## Data Fetching

The application uses TanStack React Query for data fetching with server-side rendering support. Each page prefetches necessary data using `getServerSideProps` and `dehydrates`/`rehydrates` the query client state for optimal performance.

## Credits

This project uses data from [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api). It is not endorsed or certified by TMDB.

## License

[MIT](https://choosealicense.com/licenses/mit/)
