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
import { FaTrashAlt } from 'react-icons/fa'
import FilterSideBar from './FilterSideBar'
import WishlistAddAction from './WishlistAddAction'

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
  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && search.trim()) {
      router.push(`/Shop?query=${search}`)
  
      setSearch('')
    }
  }
  const submitSearch = () => {
  if (search.trim()) {
    router.push(`/Shop?query=${search}`)
    setSearch('')
  }
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
       <div className="block md:hidden md:col-span-5 ">
          <div className="relative w-full">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search for products..."
              className="w-full pl-10 h-11"
            />
      
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
      
            <Button
              onClick={submitSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-400 text-white px-3"
            >
              Search
            </Button>
      </div>
          </div>

      {/* ✅ FIXED LAYOUT (IMPORTANT) */}
      <div className="flex w-full gap-8 ">

        {/* FILTERS (1/3) */}
        <div className='hidden lg:block w-full lg:w-[25%] sticky top-15 self-start'>        <FilterSideBar
            categories={categories}
            Brands={Brands}
            selectedCategories={selectedCategories}
            selectedbrands={selectedbrands}
            handleCategoryChange={handleCategoryChange}
            handleBrandsChange={handleBrandsChange}
            />
        </div>

        {/* PRODUCTS (2/3) */}
          <main className="w-full lg:w-[75%] min-w-0 ">
              <div className='flex items-center gap-2 w-full'>
              <p>FILTERS:</p>
              <p>search:{query || search}</p>
              <Link href={'/Shop'} className='text-red-400 cursor-pointer bg-white'><FaTrashAlt /></Link>
            </div>
          {hasProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {filteredProducts.map((product) => (
                 <div
            key={product._id}
            className="bg-white relative group rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition hover:border hover:border-blue-400"
          >

            {/* ACTIONS (Client Component عادي) */}
            <WishlistAddAction Id={product._id} />

            {/* IMAGE */}
            <div className="relative w-full h-60 overflow-hidden">
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col gap-2">

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < Math.round(product.ratingsAverage) ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.ratingsAverage}
                </span>
              </div>

              {/* Category */}
              <p className="text-sm text-blue-400">
                {product.category.name}
              </p>

              {/* Title */}
              <p className="font-semibold line-clamp-2">
                {product.title}
              </p>

              {/* Price */}
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold text-lg">
                  ${product.price}
                </p>

               <AddProductToCart Id={product._id}/>
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
              <div className='lg:hidden w-full lg:w-[25%]'>
              <FilterSideBar
                    categories={categories}
                    Brands={Brands}
                    selectedCategories={selectedCategories}
                    selectedbrands={selectedbrands}
                    handleCategoryChange={handleCategoryChange}
                    handleBrandsChange={handleBrandsChange}
              />
              </div>
          </div>
        </div>

      )}

    </div>
  )
}

export default ProductClient