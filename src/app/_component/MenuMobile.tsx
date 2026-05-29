'use client'

import Link from 'next/link'
import React from 'react'
import { BsCart4 } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'
import { Button } from '@src/components/ui/button'
import SearchInput from './SearchBar'
import { Product } from '@src/types/SubCategories'

type Props = {
  open: boolean
  setopen: React.Dispatch<React.SetStateAction<boolean>>
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  submitSearch: () => void
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void
  status: string
  musiccategory?: Product
  MensFashion?: Product
  WomensFashion?: Product
  SuperMarket?: Product
}

const MobileMenu = ({
  open,
  setopen,
  search,
  setSearch,
  submitSearch,
  handleSearch,
  status,
  musiccategory,
  MensFashion,
  WomensFashion,
  SuperMarket,
}: Props) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[99999]">
      <div
        className="absolute inset-0 bg-blue-400/20"
        onClick={() => setopen(false)}
      />

      <div className="relative w-2/3 md:w-1/3 h-full bg-white top-0 p-4 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <BsCart4 className="size-6 text-blue-400 p-1" />
            <span>FarMart</span>
          </div>

          <div
            onClick={() => setopen(false)}
            className="cursor-pointer"
          >
            <IoCloseOutline />
          </div>
        </div>

        <SearchInput
          search={search}
          setSearch={setSearch}
          submitSearch={submitSearch}
          handleSearch={handleSearch}
        />

        <Link href="/">Home</Link>
        <Link href="/Shop">Shop</Link>
        <Link href="/brand">Brands</Link>

        <p className="text-sm text-gray-500">Categories</p>

        <Link href="/Categories">Allcategories</Link>

        {musiccategory && (
          <Link href={`/Categories/${musiccategory._id}`}>
            Music
          </Link>
        )}

        {MensFashion && (
          <Link href={`/Categories/${MensFashion._id}`}>
            Men's Fashion
          </Link>
        )}

        {WomensFashion && (
          <Link href={`/Categories/${WomensFashion._id}`}>
            Women's Fashion
          </Link>
        )}

        {SuperMarket && (
          <Link href={`/Categories/${SuperMarket._id}`}>
            SuperMarket
          </Link>
        )}

        {status === 'authenticated' ? (
          <Button className="bg-red-500 text-white rounded-xl shadow-2xl w-full">
            <Link href="/Logout">Logout</Link>
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={() => setopen(false)}
              className="bg-gray-100 text-black rounded-xl shadow-2xl w-1/2"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>

            <Button
              onClick={() => setopen(false)}
              className="bg-blue-400 text-white rounded-xl shadow-2xl w-1/2"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileMenu

