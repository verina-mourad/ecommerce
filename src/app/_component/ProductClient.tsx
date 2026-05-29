'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import { Checkbox } from '@src/components/ui/checkbox'
import { Field, FieldGroup } from '@src/components/ui/field'
import { LiaFilterSolid } from 'react-icons/lia'
import { useRouter, useSearchParams } from 'next/navigation'
import { IoSearch, IoEyeOutline, IoCloseOutline } from 'react-icons/io5'
import AddProductToCart from './AddProductToCart'
import Link from 'next/link'
import AddWish from './AddWish'

type Props = {
  products: any[]
  categories: any[]
  Brands: any[]
}

const ProductClient = ({ products, categories, Brands }: Props) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedbrands, setselectedbrands] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setmaxPrice] = useState(5000)

  const searchparams = useSearchParams()
  const query = searchparams.get('query')
  const router = useRouter()

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product?.category?._id)

    const matchBrand =
      selectedbrands.length === 0 ||
      selectedbrands.includes(product?.brand?._id)

    const matchSearch =
      !query ||
      product?.title?.toLowerCase().includes(query.toLowerCase())

    const matchPrice =
      product.price >= minPrice && product.price <= maxPrice

    return matchCategory && matchBrand && matchSearch && matchPrice
  })

  const hasProducts = filteredProducts.length > 0

  const handleCategoryChange = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }         

  const handleBrandsChange = (id: string) => {
    setselectedbrands((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="container mx-auto w-full">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-400 text-sm">
          Discover nature's finest organic products
        </p>

        <Button className="lg:hidden" onClick={() => setOpen(true)}>
          <LiaFilterSolid /> FILTERS
        </Button>
      </div>

      {/* SEARCH */}
      <div className="relative w-1/2 mb-6">
        <Input
          placeholder="Search..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearch className="absolute left-3 top-2 text-blue-400" />
      </div>

      {/* ✅ FIXED LAYOUT (IMPORTANT) */}
      <div className="flex w-full gap-8 ">

        {/* FILTERS (1/3) */}
        <aside className="hidden lg:block lg:w-[30%]">
          <div className="border rounded-2xl p-5 bg-white shadow-sm sticky top-5 w-full">

            <h2 className="flex items-center gap-2 mb-5 text-lg font-semibold">
              <LiaFilterSolid />
              Filters
            </h2>

            <p className="font-semibold mb-3">Categories</p>
            <div className="space-y-2 mb-6">
              {categories.map((cat: any) => (
                <FieldGroup key={cat._id}>
                  <Field orientation="horizontal">
                    <Checkbox
                      checked={selectedCategories.includes(cat._id)}
                      onCheckedChange={() => handleCategoryChange(cat._id)}
                    />
                    <label className="text-sm">{cat.name}</label>
                  </Field>
                </FieldGroup>
              ))}
            </div>

            <p className="font-semibold mb-3">Brands</p>
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {Brands.map((brand: any) => (
                <FieldGroup key={brand._id}>
                  <Field orientation="horizontal">
                    <Checkbox
                      checked={selectedbrands.includes(brand._id)}
                      onCheckedChange={() => handleBrandsChange(brand._id)}
                    />
                    <label className="text-sm">{brand.name}</label>
                  </Field>
                </FieldGroup>
              ))}
            </div>

          </div>
        </aside>

        {/* PRODUCTS (2/3) */}
        <main className="w-full lg:w-[70%]">
            <div className='flex items-center gap-2 w-full'>
              <p>FILTERS:</p>
              <p>search:{query || search}</p>
              <Link href={'/Shop'} className='text-red-400 cursor-pointer bg-white'>CLEAR ALL</Link>
            </div>
          {hasProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border"
                >

                  <div className="relative h-60 group">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition"
                    />

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex flex-col gap-2">
                      <AddWish Id={product._id} />
                      <Link href={`/Shop/${product._id}`}>
                        <button className="bg-white p-2 rounded-full shadow">
                          <IoEyeOutline />
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-blue-500">
                      {product.category.name}
                    </p>

                    <h3 className="font-semibold line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="flex justify-between mt-4">
                      <p className="font-bold">${product.price}</p>
                      <AddProductToCart Id={product._id} />
                    </div>
                  </div>

                </div>
              ))}

            </div>
          ) : (
            /* EMPTY STATE CENTERED INSIDE RIGHT AREA */
            <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-400">Oops!</p>
                <p className="text-gray-500 mt-2">No products found</p>
                <Link href={'/Shop'}><Button className='hover:bg-blue-400 cursor-pointer'>Reset filters</Button></Link>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* MOBILE FILTER */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 w-2/3 h-full bg-white p-4">
            <IoCloseOutline onClick={() => setOpen(false)} />
          </div>
        </div>
      )}

    </div>
  )
}

export default ProductClient