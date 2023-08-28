/**
 * Handles a DELETE request using the SWR pattern to delete data.
 *
 * @async
 * @param {string} url - The base URL where the data should be deleted.
 * @param {object} options - The options for the delete request.
 * @param {object} options.arg - The argument containing the ID of the data to be deleted.
 * @param {number} options.arg.id - The ID of the data to be deleted.
 * @returns {Promise<any>} - A promise resolving to the response data from the deletion.
 *
 * @throws {Error} - Throws an error if the deletion request fails.
 */
export default async function handleSWRDelete(url, { arg }) {
  const deleteURL = `${url}/${arg.id}`
  const response = await fetch(deleteURL, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the data.')
    error.response = await response.json()
    error.status = response.status
    throw error
  }

  return response.json()
}
