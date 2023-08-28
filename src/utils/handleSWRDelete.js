export default async function handleSWRDelete(url, { arg }) {
  const deleteURL = `${url}/${arg.id}`
  const response = await fetch(deleteURL, {
    method: 'DELETE',
  })

  return response.json()
}
