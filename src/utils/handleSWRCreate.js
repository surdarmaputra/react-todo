/**
 * Handles a POST request to create data using the SWR pattern.
 *
 * @async
 * @param {string} url - The URL where the data should be created.
 * @param {object} options - The options for the creation request.
 * @param {object} options.arg - The data to be created.
 * @returns {Promise<object>} - A promise resolving to the created data.
 *
 * @throws {Error} - Throws an error if the creation request fails.
 */
export default async function handleSWRCreate(url, { arg }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })

  if (!response.ok) {
    const error = new Error('An error occurred while creating the data.')
    error.response = await response.json()
    error.status = response.status
    throw error
  }

  return response.json()
}
