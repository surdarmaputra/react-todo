const BACKEND_BASE_URL = 'http://localhost:3001'

export default function generateBackendURL(path) {
  if (!path) return BACKEND_BASE_URL
  return new URL(path, BACKEND_BASE_URL).href
}
