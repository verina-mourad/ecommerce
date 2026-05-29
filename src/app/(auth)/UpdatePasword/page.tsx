'use client'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { FcGoogle } from 'react-icons/fc'
import { RiFacebookCircleFill } from 'react-icons/ri'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaKey, FaLocationArrow, FaLock, FaLongArrowAltLeft } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { LoadingContext } from '@src/Context/Loading'
import { Loading } from '@src/app/_component/Loading'
function page() {
  const context = useContext(LoadingContext)

if (!context) throw new Error("LoadingContext missing")

const { loading, setLoading } = context

  const router=useRouter()
  const SchemaSignIn=z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),    
    newPassword: z.string().min(6, "Password must be at least 6 chars"),

  })



  type RegisterType=z.infer<typeof SchemaSignIn>
 const signinform = useForm<RegisterType>({
  defaultValues: {
    email: "",
    newPassword: ""
  },
  resolver: zodResolver(SchemaSignIn)
})
  async function handleResetPassword(value: RegisterType) {
    setLoading(true)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`, {
      method: "PUT",
      body: JSON.stringify(value),
      headers: { "Content-Type": "application/json" },
    })

    const data = await res.json() // استعملها مرة واحدة

    if(res.ok){
      console.log(data);
      toast("Registered successfully 🎉",{position:'top-center'}) 
      // toast.success("Registered successfully 🎉")
      router.push('/sign-in')
    } else {
      console.log('err');
      toast(data.message,{position:'top-center'})
      
      // toast.error(data.message || "Registration failed")
    }
  } catch (err) {
    console.log(err)
    // toast.error("Something went wrong")
  }finally{
    setLoading(false)
  }
}

  return <>
 <div className='container mx-auto shadow-2xl max-w-[700px]  h-[700px] flex '>
    <div className='hidden lg:flex lg:bg-blue-950 lg:w-1/3 rounded-tl-2xl rounded-bl-2xl pt-14 '>
    <div className=' flex flex-col gap-5 px-8'>
      <div className='bg-blue-400/40 rounded-2xl p-1 px-2 text-xs w-fit text-white flex items-center gap-1'>
        <p className='rounded-full bg-green-600 w-2 h-2 px-1'></p>
        Security First
      </div>  
      <h2 className='text-4xl font-bold text-white'>Don't <span className='text-blue-400'>WORRY</span></h2>
    <p className='text-gray-400'>We'll help you get back <br />to your fresh groceries in <br /> no time.</p>
      <p className=" absolute  left-1/2 -translate-x-1/2 bottom-0 text-gray-400 text-center p-2">
       Password  <br /> Recovery
    </p>   
   </div>
    </div>
    <div className='bg-white rounded-2xl w-full lg:w-2/3 lg:rounded-tr-2xl lg:rounded-br-2xl'>
   <div className='mx-16 gap-3 flex flex-col'>
         <Link href='/sign-in' className='text-gray-400 flex gap-2 items-center mt-12'><FaLongArrowAltLeft/> BACK TO LOGIN</Link>
    <h2 className='text-5xl font-bold'>Welcome Back</h2>
    <h2 className='text-gray-500'>Step 3: Update Your Password </h2>
    <p className='text-gray-300 text-center text-sm'>CONNECT WITH</p>
  <div className="flex items-center">
  <Button className='bg-blue-400 shadow-2xl px-4 text-white rounded-full'>
    <MdEmail className='size-6 text-white'/>
  </Button>

  <div className="h-[2px] w-52 bg-blue-400"></div>

  <Button className='bg-blue-400 shadow-2xl px-4  text-white rounded-full'>
    <FaKey className='size-6' />
  </Button>

  <div className="h-[2px] w-52 bg-blue-400"></div>

  <Button className='bg-blue-400 shadow-2xl px-4 text-white rounded-full'>
    <FaLock className='size-6' />
  </Button>
</div>
        <Form {...signinform}>
      <form onSubmit={signinform.handleSubmit(handleResetPassword)}>
        <FormField
        control={signinform.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mt-2'>Enter your Email</FormLabel>
              <FormControl>
                <Input {...field} type='email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={signinform.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mt-2'>Confirm your PASSWORD</FormLabel>
              <FormControl>
                <Input {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
   
<Button disabled={loading}  className="relative overflow-hidden p-6 cursor-pointer m-6 w-full bg-blue-950 text-white group">
  
  <span className="relative z-10 flex items-center gap-2 ">
    UPDATE PASSWORD
  </span>

  <span className="absolute left-0 top-0 h-full w-0 bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>

</Button>    
  </form>
    </Form>
    <p >Still having trouble?  <Link className='text-blue-400' href='/'>contact support </Link></p>
   </div>
    </div>
       {loading && <Loading/>}
    
  </div>
  </>
}

export default page