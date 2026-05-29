import Link from 'next/link'
import { FaArrowRight, FaCircle, FaLongArrowAltLeft } from 'react-icons/fa'
import { GoFileSubmodule } from 'react-icons/go'

export const dynamic = 'force-dynamic'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string, name: string }>
}) {

  const { id, name } = await params

  console.log(id);
  console.log(name);
  // subcategories
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${id}/subcategories`,
    { cache: 'no-store' }
  )

  const data = await res.json()
  const categoryDetails = data?.data || []

  // categories (for name)
  const catRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`,
    { cache: 'no-store' }
  )

  const catData = await catRes.json()
  const categories = catData?.data || []

  const categoryName =
    categories.find((cat: any) => String(cat._id) === String(id))?.name
    || 'Category'

  console.log("id:", id)
  console.log("categoryName:", categoryName)

  return (
    <div className='container mx-auto p-4'>

      <h2 className='font-bold text-3xl'>
        Premium <span className='text-blue-400'>Sub Category</span>
      </h2>

      <p className='text-gray-400'>
        shop from your favorite Music
      </p>

      <Link href={'/Categories'}>
        <div className='text-gray-400 flex items-center gap-2 m-4'>
          <FaLongArrowAltLeft className='size-6' />
          <p>Back To Categories</p>
        </div>
      </Link>

      {/* header */}
      <div className='flex items-center bg-gray-100 gap-2 shadow-2xl rounded'>

        <FaCircle className='text-blue-400 animate-pulse' />

        <p>{categoryDetails.length} Subcategories</p>

        <p className='text-gray-400'>
          found in{' '}
          <span className='text-blue-400'>
            {categoryName}
          </span>
        </p>

      </div>

      {/* grid */}
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>

        {categoryDetails.map((sub: any) => (



          <div key={sub._id} className='bg-gray-100 rounded-2xl p-4 flex flex-col items-center gap-3 hover:shadow-lg transition'>

            <GoFileSubmodule className='text-5xl text-blue-400' />

            <p className='font-bold'>
              {sub.name}
            </p>

            <p className='text-gray-400 text-xs flex items-center gap-1'>
              VIEW PRODUCTS <FaArrowRight />
            </p>

          </div>


        ))}

      </div>

    </div>
  )
}