'use client'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { FcGoogle } from 'react-icons/fc'
import { RiFacebookCircleFill } from 'react-icons/ri'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { FaArrowRightLong } from 'react-icons/fa6'
import { LoadingContext } from '@src/Context/Loading'
import Loading from '@src/app/loading'
function page() {
  const context = useContext(LoadingContext)
    const [send, setsend] = useState(false)
  if (!context) throw new Error("LoadingContext missing")
  
  const { loading, setLoading } = context
  const router=useRouter()
  const SchemaSignIn=z.object({
    name:z.string().min(3,'Name must be at least 3 characters').max(20,'Name must be less than 15 characters'),
    email:z.string().email().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please enter a valid email'),
    password: z
   .string()
   .regex(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    "Password is too weak (Min. 8 chars, 1 Upper, 1 Special)"
  ),
      rePassword:z.string(),
  phone: z.string().regex(/^(\+2)?01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number")

  }).refine((data)=> data.password ===data.rePassword,{path:['rePassword'],message:'password and repassword do not match'})



  const signinform=useForm({
    defaultValues:{
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":""
    },
    resolver:zodResolver(SchemaSignIn),
    mode:'onChange'

  })

  type RegisterType=z.infer<typeof SchemaSignIn>
  async function HandleLogin(value:RegisterType){
    setLoading(true)
    setsend(true)
    try{
      const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,{
        method:'POST',
        body:JSON.stringify(value),
        headers:{'Content-Type': 'application/json'}
      })
      const data = await res.json()
      if (res.status >= 200 && res.status < 300){
        toast.success('Registered successfully 🎉',{position:'top-center'})
        router.push('/sign-in')
        setsend(false)
        }
        else{
        toast.error(data.message|| 'signup failed',{position:'top-center'})
        setsend(false)
        }
    }

    catch(error){
          toast.error("Something went wrong",{position:'top-center'})
    }finally{
      setLoading(false)
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
    <div className='hidden lg:flex w-full lg:bg-blue-950 lg:w-1/3 rounded-tl-2xl rounded-bl-2xl pt-14 '>
    <div className='flex flex-col gap-5 px-8'>
      <div className='bg-blue-400/40 rounded-2xl p-1 px-2 text-xs w-fit text-white flex items-center gap-1'>
        <p className='rounded-full bg-green-600 w-2 h-2 px-1'></p>
        New JOURNEY
      </div>  
     <h2 className='text-4xl font-bold text-white'>START <br /> <span className='text-blue-400'>Fresh</span></h2>
     <p className='text-gray-400'>Join our community for <br /> the finest organic <br /> selection delivered to <br /> your door.</p>

    </div>
    </div>
<div className='bg-white w-full lg:w-2/3 rounded-tr-2xl rounded-br-2xl'>   <div className='mx-16 gap-3 flex flex-col'>
    <h2 className='text-5xl font-bold mt-8'>create Account</h2>
    <h2 className='text-gray-500'>Already a member? <Link href='/sign-in' className='text-blue-400'>Log in</Link> <span></span></h2>
    <p className='text-gray-300 text-center text-sm'>SOCIAL SIGNUP</p>
    <div className='flex items-center justify-between'>
    <Button className='bg-gray-50 hover:bg-gray-100 shadow-2xl text-black cursor-pointer'><FcGoogle className='size-6'/> Google</Button>
    <Button className='bg-gray-50 hover:bg-gray-100 shadow-2xl text-black cursor-pointer'><RiFacebookCircleFill className='size-6 text-blue-800' /> Facebook</Button>
    </div>
        <Form {...signinform}>
      <form onSubmit={signinform.handleSubmit(HandleLogin)}>
        <FormField
        control={signinform.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mt-2'>Username:</FormLabel>
              <FormControl>
                <Input {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormLabel className='mt-2'>password:</FormLabel>
              <FormControl>
                <Input {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={signinform.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mt-2'>rePassword:</FormLabel>
              <FormControl>
                <Input {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={signinform.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mt-2'>phone:</FormLabel>
              <FormControl>
                <Input {...field} type='tel' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button disabled={send} className='group overflow-hidden relative cursor-pointer p-6 mt-6 bg-blue-950 w-full' type="submit">
            <span className='flex z-10 items-center gap-2 text-white'>
              Register <FaArrowRightLong />
            </span>
            <span className='absolute top-0 left-0 h-full w-0 bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full'></span>
          </Button>
      </form>
    </Form>
   </div>
    </div>
  </div>
  </div>
  </>
}

export default page