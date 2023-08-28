/**
 * Handles a fetch request using the SWR pattern.
 *
 * @async
 * @param {...*} args - The arguments to be passed to the fetch function.
 * @returns {Promise<any>} - A promise resolving to the response data from the fetch.
 *
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export default async function handleSWRFetch(...args) {
  const response = await fetch(...args)

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.response = await response.json()
    error.status = response.status
    throw error
  }

  return response.json()
}
