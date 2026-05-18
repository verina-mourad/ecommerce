'use client'
import { AddCart } from '@src/CartAction/CartAction';
import { Button } from '@src/components/ui/button';
import { CartCount } from '@src/Context/CountCart';
import React, { useContext, useState } from 'react'
import { FaCartArrowDown, FaCheck } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { toast } from 'sonner';

const AddSpecialProduct = ({ Id }: { Id: string }) => {
  const [added, setadded] = useState(false)
  const CountCart=useContext(CartCount)
  async function AddToCart(Id: string) {
    try {
      const data = await AddCart(Id);
      console.log(data);

      if (data?.status === 'success') {
        toast.success('Product added successfully', {
          position: 'top-center'
        });
        setadded(true)
        CountCart?.setcountCart((prev)=>prev+1)
      } else {
        toast.error(data?.message || 'Something went wrong', {
          position: 'top-center'
        });
        setadded(false)
      }

    } catch (error: any) {
      toast.error('you should login first', {
        position: 'top-center'
      });
    }
  }

  return (
  <Button onClick={()=>AddToCart(Id)} className='cursor-pointer bg-blue-400 col-span-2 text-white'>
            <FaCartArrowDown /> ADD TO SHOPPING CART
          </Button>
 



);
}

export default AddSpecialProduct;