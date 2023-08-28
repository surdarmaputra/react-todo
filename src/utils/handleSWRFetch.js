export default async function handleSWRFetch(...args) {
  const response = await fetch(...args)
  return response.json()
}
