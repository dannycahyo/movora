/**
 * Formats a date string from YYYY-MM-DD to a more user-friendly format
 * @param dateString Date string in format YYYY-MM-DD
 * @returns Formatted date string (e.g., "Jan 2023" or "Unknown" if invalid)
 */
export const formatReleaseDate = (dateString?: string): string => {
  if (!dateString) return "Unknown";

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Unknown";
    }

    const month = date.toLocaleDateString("en-US", {
      month: "short",
    });
    const year = date.getFullYear();

    return `${month} ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Unknown";
  }
};
