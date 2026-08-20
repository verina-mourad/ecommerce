export async function getProducts(page: number = 1, limit: number = 8) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    return {
      products: data.data || [],
      metadata: data.metadata || data.paginationResult || { numberOfPages: 1 },
    };
  } catch (error) {
    return { products: [], metadata: { numberOfPages: 1 } };
  }
}
