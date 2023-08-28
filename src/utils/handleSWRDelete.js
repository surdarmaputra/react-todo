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
