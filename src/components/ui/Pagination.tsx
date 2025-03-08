interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxDisplayedPages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxDisplayedPages = 5,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    // If total pages is less than or equal to max displayed pages, show all pages
    if (totalPages <= maxDisplayedPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];

    const rangeStart = Math.max(
      2,
      currentPage - Math.floor(maxDisplayedPages / 2),
    );
    const rangeEnd = Math.min(
      totalPages - 1,
      rangeStart + maxDisplayedPages - 3,
    );

    if (rangeStart > 2) {
      pages.push("...");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center mt-8">
      <nav aria-label="Pagination" className="inline-flex">
        <button
          onClick={() =>
            currentPage > 1 && onPageChange(currentPage - 1)
          }
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-l-md border border-gray-600 
            ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {pages.map((page, idx) =>
          typeof page === "number" ? (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`px-4 py-2 border border-gray-600 border-l-0
                ${
                  currentPage === page
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={`ellipsis-${idx}`}
              className="px-4 py-2 border border-gray-600 border-l-0 bg-gray-800 text-gray-400"
            >
              {page}
            </span>
          ),
        )}

        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-r-md border border-gray-600 border-l-0
            ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
        >
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}
