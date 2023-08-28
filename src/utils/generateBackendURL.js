const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

export default function generateBackendURL(path) {
  if (!path) return BACKEND_BASE_URL
  return new URL(path, BACKEND_BASE_URL).href
}
