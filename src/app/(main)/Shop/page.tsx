import { getCategories } from '@src/services/getcategories'
import { getProducts } from '@src/services/getproduct'
import ProductClient from '@src/app/_component/ProductClient'
import getBrands from '@src/services/getBrands'

const Page = async () => {
  const products = await getProducts()
  const categories = await getCategories()
  const Brands = await getBrands()


  return (
    <ProductClient
      products={products}
      categories={categories}
      Brands={Brands}
    />
  )
}

export default Page