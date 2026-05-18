import React from 'react'

export default async function Page({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
    {
      cache: 'no-store',
    }
  )

  const data = await res.json()

  const subcategories = data.data

  return (
    <div className="container mx-auto p-4">

      {subcategories.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          Oops! No subcategories found
        </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {subcategories.map((sub: any) => (
            <div
              key={sub._id}
              className="bg-gray-100 p-4 rounded-2xl text-center"
            >
              {sub.name}
            </div>
          ))}

        </div>
      )}

    </div>
  )
}