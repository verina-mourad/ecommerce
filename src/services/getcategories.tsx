export async function getCategories() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await res.json();

  return data.data;
}
