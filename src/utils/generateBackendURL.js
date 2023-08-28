const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

/**
 * Generates a complete backend URL by appending a path to the base backend URL.
 *
 * @param {string} path - The path to be appended to the base backend URL.
 * @returns {string} - The complete backend URL.
 *
 * @example
 * const apiPath = '/users/123';
 * const backendURL = generateBackendURL(apiPath);
 * console.log(backendURL); // Output: "https://backend.example.com/users/123"
 */
export default function generateBackendURL(path) {
  if (!path) return BACKEND_BASE_URL
  return new URL(path, BACKEND_BASE_URL).href
}
