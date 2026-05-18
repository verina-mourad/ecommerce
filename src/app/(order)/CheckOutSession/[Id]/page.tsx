'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import CheckoutLinks from '@src/app/_component/CheckoutLinks'
import { Button } from '@src/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form';
import { Input } from '@src/components/ui/input';
import { CashOrder, CheckOutSession } from '@src/Getorder.tsx/Getorder';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { AiFillFile } from "react-icons/ai";
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoIosAlert } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import * as z from 'zod';
import Payment from "@src/app/_component/Payment";
import { OrderContext, ordertype } from '@src/Context/Order';
import { FaShoppingBasket } from 'react-icons/fa';
import Image from 'next/image';
import SumaryOrder from '@src/app/_component/SumaryOrder';
import { toast } from 'sonner';
import { error } from 'console';


const Page = () => {
const {Id}:{Id:string} = useParams()
const route=useRouter()

// console.log(params)
const status = useContext(OrderContext)

if (!status) {
  throw new Error("OrderContext must be used inside OrderContextProvider")
}
 const {method,setMethod}= status 
const Schemacheckout= z.object({
       details: z.string().min(2,'City name is required (min 2 characters)').max(100,'City name is required (max 100 characters'),
  phone: z.string().min(10,'Enter a valid Egyptian phone number').max(15,'max number is 15'),
  city: z.string().min(2,'City name is required (min 2 characters)').max(100)

})

const CheckOutForm=useForm({
  defaultValues:{
    details: '',
      phone: '',
      city: ''
  },
  resolver:zodResolver(Schemacheckout),
  mode:'onChange'

  })

  async function HandleCheckOut(value:any){
          if (!Id ) {
            toast.error("Cart ID is missing",{position:'top-center'})
            return
          }          
          if (method ==='cash') {
                 try{
              const data=await CashOrder(Id ,value )
              console.log(data);
              route.push('/getAllOrders')
              
            }catch(error){
                  alert("Payment failed, try again.")
            }
          }
          if (method=== 'visa') {
            
            try{
              const data=await CheckOutSession(Id ,value  )
                  window.location.href=data.session.url
            }catch(error){
                  alert("Payment failed, try again.")
            }
          }
  }

  return <>
  <CheckoutLinks/>
  <div className='flex  items-center m-4 '>
   <div className='bg-blue-400 p-3 rounded-2xl'>
    <AiFillFile className=' text-white ' />
   </div>
   <h2 className='text-2xl font-bold'>COMPLETE ORDER</h2>
  </div>
  <div className='border border-blue-100 m-2'/>
  <div>
    <div className='flex items-center gap-2 m-4 bg-blue-400 rounded-t-2xl'>
      <IoLocationSharp className='text-white'/>
      <div className='flex flex-col gap-1'>
        <p className='text-white'>SHIPPING ADDRESS</p>
      <p className='text-white text-xs'>where should we deliver?</p>
    </div>
      </div>
      <div>

      </div>
  </div>
     <div className='bg-blue-50 m-4 p-4 rounded-b-2xl'>
<div className="relative ">
  <IoIosAlert className="absolute left-3 top-1/2  -translate-y-1/2 bg-blue-400 rounded-full text-white" />
  <p className='bg-blue-50 border-blue-100 rounded-2xl border-2 px-8'>please ensure address is accurate</p>
</div>       
 <Form {...CheckOutForm} >
      <form onSubmit={CheckOutForm.handleSubmit(HandleCheckOut)}>
        <FormField
        control={CheckOutForm.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mt-2'>details:</FormLabel>
              <FormControl>
                <Input {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={CheckOutForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
                  <div className='flex justify-between items-center'>
                 <FormLabel className='mt-2'>phone:</FormLabel>

                  </div>
              <FormControl>
                <Input {...field} type='tel' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={CheckOutForm.control}
          name="city"
          render={({ field }) => (
            <FormItem>
                  <div className='flex justify-between items-center'>
                 <FormLabel className='mt-2'>city:</FormLabel>

                  </div>
              <FormControl>
                <Input {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    <Payment method={method} setMethod={setMethod}/>
 <SumaryOrder/>
<Button type='submit'  className="relative mt-4 overflow-hidden p-6 cursor-pointer  w-full bg-blue-950 text-white group">
  
  <span className="relative z-10 flex items-center gap-2 ">
    complete purchase <FaArrowRightLong/>
  </span>

  <span className="absolute left-0 top-0 h-full w-0 bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>

</Button>    
  </form>
    </Form>
     </div>
  


   
  
  </>
    
}

export default Page