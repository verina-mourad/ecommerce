export async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch')
    }

    const data = await res.json()
    return data.data // ✅ رجعنا الـ array بس
  } catch (error) {
    console.error(error)
    return [] // كده نفس النوع
  }
}