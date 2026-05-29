import { Checkbox } from '@src/components/ui/checkbox'
import { Field, FieldGroup } from '@src/components/ui/field'
import React from 'react'
import { LiaFilterSolid } from 'react-icons/lia'

type FilterProps = {
  categories: any[]
  Brands: any[]
  selectedCategories: string[]
  selectedbrands: string[]
  handleCategoryChange: (id: string) => void
  handleBrandsChange: (id: string) => void
}

const FilterSideBar = ({
  categories,
  Brands,
  selectedCategories,
  selectedbrands,
  handleCategoryChange,
  handleBrandsChange,
}: FilterProps) => {
  return (
<aside className="w-full">
          <div className="border rounded-2xl p-5 bg-white shadow-sm sticky top-5 w-full">

        <h2 className="flex items-center gap-2 mb-5 text-lg font-semibold">
          <LiaFilterSolid />
          Filters
        </h2>

        <p className="font-semibold mb-3">Categories</p>

        <div className="space-y-2 mb-6 max-h-52 overflow-y-auto">
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
  )
}

export default FilterSideBar