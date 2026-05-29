import Image from 'next/image'
import Link from 'next/link'
import { GoChevronRight } from 'react-icons/go'

const Category = ({category}:{category:any}) => {
  return <>
  <Link
        href={`/Categories/${category._id}?name=${category.name}`}
      >
                <div className="bg-gray-100 shadow-2xl rounded-2xl cursor-pointer transition hover:shadow-lg">
  
                  <div className="p-4 h-60 flex flex-col justify-between">
  
                    {/* IMAGE */}
                    <div className="w-20 h-20 mx-auto relative">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="rounded-full object-cover bg-white transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
  
                    {/* NAME */}
                    <p className="font-bold text-center group-hover:text-blue-400">
                      {category.name}
                    </p>
  
                    {/* CTA */}
                    <p className="text-gray-400 text-center text-sm flex items-center justify-center gap-1 group-hover:text-blue-400">
                      VIEW SUBCATEGORIES <GoChevronRight />
                    </p>
  
                  </div>
  
                </div>
              </Link>
  </>
}

export default Category