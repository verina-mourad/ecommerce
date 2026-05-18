'use client'
import CartEmpty from '@src/app/_component/CartEmpty'
import { Loading } from '@src/app/_component/Loading'
import { GetCart, RemoveCart, UpdateCart } from '@src/CartAction/CartAction'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import { Count } from '@src/Context/Count'
import { CartCount } from '@src/Context/CountCart'
import { Cart } from '@src/types/cart'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { FaLongArrowAltLeft, FaLongArrowAltRight, FaRegTrashAlt, FaSpinner, FaTrashAlt } from 'react-icons/fa'
import { IoIosRemoveCircle, IoMdCart } from 'react-icons/io'
import { IoAddCircle } from 'react-icons/io5'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { toast } from 'sonner'

const page = () => {
    const [loading, setloading] = useState<boolean>(false)
  const [carts, setcarts] = useState<Cart|null>(null)
    const CountCart=useContext(CartCount)
async function DeleteProduct(Id: string) {
  const data = await RemoveCart(Id)

  setcarts((prev) => {
    if (!prev) return prev

    return {
      ...prev,
      products: prev.products.filter(
        (item) => item._id !== Id
      )
    }
  })

  if (data.status === "success") {
    toast.success("product delete successfully", {
      position: "top-center",
    })

    CountCart?.setcountCart(data.numOfCartItems)
  } else {
    toast.error("Error deleting product")
  }
}
  
  
async function UpdateProductCount(Id: string, count: number) {
  setloading(true)

  const data = await UpdateCart(Id, count)

  if (data.status === "success") {
    setcarts(data.data)

    const totalCount = data.data.products.reduce(
      (acc: number, item: any) => acc + item.count,
      0
    )

    CountCart?.setcountCart(totalCount)
  } else {
    toast.error("Error updating product")
  }

  setloading(false)
}

  async function GetAllProductCart(){
   try{
    setloading(true)
     const data=await GetCart()
     console.log(data.data);
     
     setcarts(data.data)
   }catch(error:any){
      toast.error(error?.message || 'Something went wrong')
    
   }finally{
        setloading(false)

   }

  }
  useEffect(()=>{

    GetAllProductCart()
  },[])
const subtotal = carts?.products.reduce(
  (total, item) => total + item.price * item.count,
  0
)
const shipping= subtotal && subtotal>1500?0:100
const tax=subtotal?subtotal*0.14:0
const total=subtotal? subtotal+shipping+tax:0
  return (
  <>
   {loading && (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center">
      <Loading />
    </div>
  )}   
    {!carts || carts.products.length === 0 ? (
      <CartEmpty />
    ) : <>
     <div className='bg-blue-50/70 m-4'>
   <header className='m-4'>
    <div className='flex items-center gap-2'>
      <div className='bg-blue-400 p-3 rounded-xl'>
      <IoMdCart  className='text-white'/>
    </div>
   <div className='flex flex-col'>
     <div className='font-bold'>SHOPPING <span className='text-blue-400'> CART</span></div>
    <div>You have <span className='text-blue-400'>{CountCart?.countCart} items</span> in your container</div>
   </div>
    </div>
   </header>
   {carts?.products.map((product)=>(
    <div key={product._id} className='flex justify-between bg-white items-center m-4 hover:shadow-2xl hover:border border-blue-300 rounded-2xl p-3'>
     <div className='flex items-center gap-2'>
      <div>
      <Image src={product.product.imageCover} alt={product.product.title} width={100} height={100}/>
      </div>
      <div className='flex flex-col'>
       <p>
  {product.product.title.split(' ').slice(0,2).join(' ')}
</p>
        <p>{product.product.category.name}</p>
        <p><span className='text-2xl text-blue-400 font-bold'>{product.price}</span> per unit</p>
          <div className='bg-white p-1'>
            <div className='flex items-center gap-1'>
            <Button disabled={loading} className='cursor-pointer size-6 bg-blue-400'  onClick={()=>UpdateProductCount(product.product._id,product.count - 1)} >{product.count ===1?<FaTrashAlt/>:<IoIosRemoveCircle/>}</Button>          
            {loading? <FaSpinner  className='animate-spin' />: product.count}
            <Button disabled={loading}  className='cursor-pointer size-6 bg-blue-400' onClick={()=>UpdateProductCount(product.product._id,product.count +1)} ><IoAddCircle/></Button>          
            
          </div>
          </div>
      </div>
    </div>
    <div className='flex items-center gap-1'>
      <p  className='font-bold'>{product.price * product.count} <span className='text-sm'>EGP</span></p>
      <Button disabled={loading} onClick={()=>DeleteProduct(product._id)} className='font-bold bg-red-100 p-2 rounded-2xl cursor-pointer'><FaRegTrashAlt className='text-red-400 mx-auto'/></Button>
    </div>
   </div>
   ))}
   <div>
    <h2>ORDER <span className='text-blue-400'>SUMMARY</span>
    </h2>
    <div className='flex items-center justify-between'>
      <p className='text-gray-400'>SUBTOTAL</p>
      <p className='text-black font-bold'>{subtotal}</p>
    </div>
    <div className='flex items-center justify-between'>
      <p className='text-gray-400'>SHIPPING</p>
      <p className='text-black font-bold'>{shipping}<span className='text-xs'>EGP</span></p>
    </div>
    <div className='flex items-center justify-between'>
      <p className='text-gray-400'>ESTIMATED TAX</p>
      <p className='text-black font-bold'>14 <span className='text-xs'>EGP</span></p>
    </div>
    <div className='border-1 border-blue-100 m-2'/>
    <p className='mt-3 text-sm'>TOTAL AMOUNT <span className='text-sm text-black'>EGP</span></p>
    <p className='text-2xl text-blue-400 font-bold'>{total} <span className='text-sm text-black'>EGP</span></p>
    <p className='text-xs m-1'>HAVE A PROMO CODE?</p>
    <div>
    <Input placeholder='Enter code relative'/>
    <Button className='bg-black absolute right-4 cursor-pointer text-white p-2 rounded-xl'>Apply</Button>
    </div>
   {carts._id &&  <Link href={`/CheckOutSession/${carts?._id}`}>
    <Button className='bg-blue-400 hover:bg-blue-500 text-white cursor-pointer w-full p-5 m-4'>PROCEED TO CHECKOUT <FaLongArrowAltRight className='text-white'/></Button>

    </Link>}
    <Link href='/' className='flex items-center text-xs hover:text-blue-400 flex items-center justify-center'><MdKeyboardArrowLeft /> BACK TO SHOPPING</Link>
   </div>
 </div>
    </>
    }


  </>
)}

export default page