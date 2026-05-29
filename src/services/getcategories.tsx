export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`)

  if (!res.ok) {
    throw new Error('Failed to fetch')
  }

  const data = await res.json()
  return data.data
} 