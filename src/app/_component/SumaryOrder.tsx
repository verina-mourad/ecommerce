'use client'
import { GetCart } from '@src/CartAction/CartAction'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import Loading from '../loading'
import { Cart } from '@src/types/cart'
import { FaShoppingBasket } from 'react-icons/fa'
import { CartCount } from '@src/Context/CountCart'

const SumaryOrder = () => {
    const [loading, setloading] = useState(false)
    const [carts, setcarts] = useState<Cart>()
        const CountCart=useContext(CartCount)
      async function GetAllOrder(){
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
      
          GetAllOrder()
        },[])
        
    const subtotal=carts?.products.reduce((total,items)=>
    total+ items.price * items.count,0    )
    const shipping= subtotal && subtotal>1500?0:100
    const tax=subtotal?subtotal*0.14:0
    const total=subtotal? subtotal+shipping+tax:0


  return <>
  <div className='flex items-center justify-between 3 bg-blue-400 p-2 rounded-t-2xl'>
        <div className='flex font-bold items-center gap-2 m-4 p- rounded-t-2xl'>
              <FaShoppingBasket className='text-white'/>
              <div className='flex flex-col gap-1'>
                <p className='text-white'>SUMMARY</p>
            </div>
              </div>
              <div className='bg-white/40 text-white text-xs'>
                {CountCart?.countCart}
              </div>
     </div>
   <div className='relative bg-blue-50'>
   {/* {loading && (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center">
      <Loading />
    </div>
  )} */}
  {carts?.products && carts.products.length > 0 ? (
  carts?.products?.map((product) => (
    <div key={product._id} className='text-sm'>
      <div className='justify-between flex items-center text-xs'>
        <div className='flex items-center gap-1'>
          <Image
            width={50}
            height={50}
            src={product.product.imageCover}
            alt=''
          />
          <p>
            {product.product.title.split(' ').slice(0,2).join(' ')}
            </p>
          <p className='text-blue-400'>
            {product.price} * {product.count}
          </p>
        </div>

        <div>{product.price * product.count}</div>
      </div>
    </div>
  ))
) : (
  <p>No products found</p>
)}
<div className='flex flex-col gap-1'>
<div className='flex items-center justify-between'>
    <p className='text-gray-400'>SUBTOTAL</p>
    <p>{subtotal}</p>
</div>
<div className='flex items-center justify-between'>
    <p className='text-green-400'>Shipping</p>
    <p className='bg-green-200 text-green-400'>{subtotal}</p>
</div>
<div className='flex items-center justify-between'>
    <p className='text-green-400'>Tax</p>
    <p className='bg-green-200 text-green-400'>{subtotal}</p>
</div>
</div>
<div className='border border-blue-200'/>
<div className='flex flex-col mt-4'>
<p className='text-blue-400'>Total to pay</p>
<p className='text-3xl font-bold'>{total} <span className='text-sm'>EGP</span></p>
</div>
     </div>
     
  </>
}

export default SumaryOrder