'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { GoChevronRight } from 'react-icons/go'
import { getCategories } from '../../services/getcategories'
import Link from 'next/link'

function Category() {
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data)
    })
  }, [])

  return (
    <div className="container mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <p className="font-bold text-3xl">
          Shop By <span className="text-blue-400">Category</span>
        </p>

        <p className="text-blue-400 cursor-pointer">
          View All Categories
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">

        {categories.map((category) => {
          const { image, _id, name } = category

          return (
          <Link
      key={_id}
      href={`/SubCategories/${_id}?name=${name}`}
    >
              <div className="bg-gray-100 shadow-2xl rounded-2xl cursor-pointer transition hover:shadow-lg">

                <div className="p-4 h-60 flex flex-col justify-between">

                  {/* IMAGE */}
                  <div className="w-20 h-20 mx-auto relative">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="rounded-full object-cover bg-white transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* NAME */}
                  <p className="font-bold text-center group-hover:text-blue-400">
                    {name}
                  </p>

                  {/* CTA */}
                  <p className="text-gray-400 text-center text-sm flex items-center justify-center gap-1 group-hover:text-blue-400">
                    VIEW SUBCATEGORIES <GoChevronRight />
                  </p>

                </div>

              </div>
            </Link>
          )
        })}

      </div>
    </div>
  )
}

export default Category