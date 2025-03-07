import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red-500">
          Movora
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="hover:text-red-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/trending"
            className="hover:text-red-400 transition-colors"
          >
            Trending
          </Link>
          <Link
            href="/discover"
            className="hover:text-red-400 transition-colors"
          >
            Discover
          </Link>
          <Link
            href="/tv-shows"
            className="hover:text-red-400 transition-colors"
          >
            TV Shows
          </Link>
          <Link
            href="/people"
            className="hover:text-red-400 transition-colors"
          >
            People
          </Link>
          <Link
            href="/favorites"
            className="hover:text-red-400 transition-colors"
          >
            Favorites
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:block">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-1 rounded-l-full bg-gray-800 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-r-full transition-colors"
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
            <Link
              href="/people"
              className="hover:text-red-400 transition-colors"
              onClick={toggleMenu}
            >
              People
            </Link>
            <Link
              href="/favorites"
              className="hover:text-red-400 transition-colors"
              onClick={toggleMenu}
            >
              Favorites
            </Link>

            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center mt-2"
            >
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
