'use client'

import React from 'react'
import { Input } from '@src/components/ui/input'
import { Button } from '@src/components/ui/button'
import { IoSearch } from 'react-icons/io5'

type SearchInputProps = {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  submitSearch: () => void
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchInput = ({
  search,
  setSearch,
  submitSearch,
  handleSearch,
}: SearchInputProps) => {
  return (
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
  )
}

export default SearchInput