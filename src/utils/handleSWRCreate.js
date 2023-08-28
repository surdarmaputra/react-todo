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
