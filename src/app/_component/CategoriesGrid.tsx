'use client'

import { useEffect, useState } from 'react'
import { getCategories } from '../../services/getcategories'
import Category from './Category'

function CategoriesGrid() {
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
          return (
          <Category category={category} key={category._id}/>
          )
        })}

      </div>
    </div>
  )
}

export default CategoriesGrid