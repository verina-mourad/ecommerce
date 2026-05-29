'use client'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { FcGoogle } from 'react-icons/fc'
import { RiFacebookCircleFill } from 'react-icons/ri'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form'
import { redirect, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { FaArrowRightLong } from "react-icons/fa6";
import { signIn } from "next-auth/react"
import Loading from '@src/app/loading'
import { LoadingContext } from '@src/Context/Loading'
function page() {
  const [send, setsend] = useState(false)
  const context = useContext(LoadingContext)

  if (!context) throw new Error("LoadingContext missing")

  const { loading,setLoading } = context

  const router = useRouter()
    const SchemaSignIn=z.object({
    email:z.string().email().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please enter a valid email'),
password: z
  .string()
  .regex(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    "Password is too weak (Min. 8 chars, 1 Upper, 1 Special)"
  )
  })



  const signinform=useForm({
    defaultValues:{
    "email":"",
    "password":"",
    },
    resolver:zodResolver(SchemaSignIn),
    mode:'onChange'
  })

  type RegisterType=z.infer<typeof SchemaSignIn>
  async function HandleLogin(value:RegisterType){
     (true)
     setsend(true)
    const data =await signIn ('credentials',{
      email:value.email,
      password:value.password,
    redirect:false
  })
  console.log(data);
  
if (data?.ok) {
  toast('login successfully',{position:'top-center'})
  router.push('/')
  setsend(false)
  
}else{
  toast.error(data?.error,{position:'top-center'})
    setsend(false)
}
    
  }

  return <>
 
 <div className='relative'>
 {loading && (
  <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center">
    <Loading />
  </div>
)}
      <div className='container mx-auto shadow-2xl max-w-[700px]  h-[700px] flex '>
    <div className='hidden lg:flex lg:bg-blue-950 lg:w-1/3 rounded-tl-2xl rounded-bl-2xl pt-14 '>
    <div className=' flex flex-col gap-5 px-8'>
      <div className='bg-blue-400/40 rounded-2xl p-1 px-2 text-xs w-fit text-white flex items-center gap-1'>
        <p className='rounded-full bg-green-600 w-2 h-2 px-1'></p>
        New JOURNEY
      </div>  
      <h2 className='text-4xl font-bold text-white'>Your <br />GateWay <br /> To <br /> <span className='text-blue-400'>Freshness</span></h2>
    <p className='text-gray-400'>Experience the finest <br />organic selection.</p>
      <p className=" absolute  left-1/2 -translate-x-1/2 bottom-0 text-gray-400 text-center p-2">
       2026 <br /> collection
    </p>   
   </div>
    </div>
    <div className='bg-white rounded-2xl w-full lg:w-2/3 lg:rounded-tr-2xl lg:rounded-br-2xl'>
   <div className='mx-16 gap-3 flex flex-col'>
    <h2 className='text-5xl font-bold mt-8'>Welcome Back</h2>
    <h2 className='text-gray-500'>please enter your details to sign in<span></span></h2>
    <p className='text-gray-300 text-center text-sm'>CONNECT WITH</p>
    <div className='flex  items-center justify-between'>
    <Button className='bg-gray-50 hover:bg-gray-100 shadow-2xl text-black cursor-pointer'><FcGoogle className='size-6'/> Google</Button>
    <Button className='bg-gray-50 hover:bg-gray-100 shadow-2xl text-black cursor-pointer'><RiFacebookCircleFill className='size-6 text-blue-800' /> Facebook</Button>
    </div>
        <Form {...signinform}>
      <form onSubmit={signinform.handleSubmit(HandleLogin)}>
        <FormField
        control={signinform.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mt-2'>Email:</FormLabel>
              <FormControl>
                <Input {...field} type='email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={signinform.control}
          name="password"
          render={({ field }) => (
            <FormItem>
                  <div className='flex justify-between items-center'>
                 <FormLabel className='mt-2'>password:</FormLabel>
              <Link href='/forgetpassword' className='text-xs cursor-pointer   text-blue-400'>FORGET PASSWORD ?</Link>

                  </div>
              <FormControl>
                <Input {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<Button disabled={send}  className="relative overflow-hidden p-6 mt-6 cursor-pointer  w-full bg-blue-950 text-white group">
  
  <span className="relative z-10 flex items-center gap-2 ">
    Sign In <FaArrowRightLong />
  </span>

  <span className="absolute left-0 top-0 h-full w-0 bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>

</Button>    
  </form>
    </Form>
    <p >New to Far Mart? <Link className='text-blue-400' href='/sign-up'>Create account </Link></p>
   </div>
    </div>
  </div>
 </div>
  </>
}

export default page