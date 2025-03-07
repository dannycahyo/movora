/**
 * Determine if the code is running on the server or client
 */
export const isServer = (): boolean => {
  return typeof window === "undefined";
};
