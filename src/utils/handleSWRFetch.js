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
