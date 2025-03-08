import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useSearchMovies } from "@/src/hooks/useMovies";
import SearchResults from "@/src/components/search/SearchResults";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchFormRef = useRef<HTMLFormElement>(null);

  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data: searchResults, isLoading: searchLoading } =
    useSearchMovies(debouncedQuery);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsSearchFocused(false);
    }
  };

  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(e.target.value);
  };

  const closeSearchResults = () => {
    setIsSearchFocused(false);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-red-500">
          Movora
        </Link>

        <nav className="hidden md:flex items-center space-x-2 lg:space-x-10 flex-grow justify-center">
          <Link
            href="/"
            className="hover:text-red-400 transition-colors text-sm lg:text-base"
          >
            Home
          </Link>
          <Link
            href="/trending"
            className="hover:text-red-400 transition-colors text-sm lg:text-base"
          >
            Trending
          </Link>
          <Link
            href="/discover"
            className="hover:text-red-400 transition-colors text-sm lg:text-base"
          >
            Discover
          </Link>
          <Link
            href="/tv-shows"
            className="hover:text-red-400 transition-colors text-sm lg:text-base"
          >
            TV Shows
          </Link>
        </nav>

        <div className="hidden md:block relative ml-2">
          <form
            ref={searchFormRef}
            onSubmit={handleSearch}
            className="flex items-center"
          >
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() => setIsSearchFocused(true)}
              className="px-4 py-1 rounded-l-full bg-gray-800 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm w-36 md:w-40 lg:w-64 transition-all"
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 px-2 lg:px-4 py-1 rounded-r-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 lg:h-5 lg:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          {isSearchFocused && debouncedQuery.length > 2 && (
            <div className="absolute right-0 mt-1 w-full min-w-[250px]">
              <SearchResults
                results={searchResults?.results || []}
                isLoading={searchLoading}
                query={debouncedQuery}
                onResultClick={closeSearchResults}
              />
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className="hover:text-red-400 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/trending"
              className="hover:text-red-400 transition-colors"
              onClick={toggleMenu}
            >
              Trending
            </Link>
            <Link
              href="/discover"
              className="hover:text-red-400 transition-colors"
              onClick={toggleMenu}
            >
              Discover
            </Link>
            <Link
              href="/tv-shows"
              className="hover:text-red-400 transition-colors"
              onClick={toggleMenu}
            >
              TV Shows
            </Link>

            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center mt-2 relative"
            >
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => setIsSearchFocused(true)}
                className="px-4 py-1 rounded-l-full bg-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500 flex-grow text-sm"
              />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-r-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {/* Mobile Search Results */}
            {isSearchFocused &&
              isMenuOpen &&
              debouncedQuery.length > 2 && (
                <div className="mt-2 bg-gray-700 rounded-lg max-h-60 overflow-y-auto">
                  <SearchResults
                    results={searchResults?.results || []}
                    isLoading={searchLoading}
                    query={debouncedQuery}
                    onResultClick={() => {
                      closeSearchResults();
                      setIsMenuOpen(false);
                    }}
                  />
                </div>
              )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
