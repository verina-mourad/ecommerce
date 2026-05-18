'use client'

import React, { useContext, useEffect } from 'react'
import { Button } from '@src/components/ui/button'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@src/components/ui/input-otp'
import { LoadingContext } from '@src/Context/Loading'
import { resendResetCodeAPI, verifyResetCodeAPI } from '@src/api/Auth'
import { FaKey, FaLock, FaLongArrowAltLeft } from 'react-icons/fa'
import Link from 'next/link'
import { MdEmail } from 'react-icons/md'
import { Loading } from '@src/app/_component/Loading'
import { CiLocationArrow1 } from 'react-icons/ci'

export default function VerifyCodePage() {

  const { loading, setLoading } = useContext(LoadingContext)!
  const router = useRouter()

  // schema
  const schema = z.object({
    resetCode: z.string().min(6),
  })

  type FormType = z.infer<typeof schema>

  const form = useForm<FormType>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(schema),
  })

  // VERIFY
  async function handleVerifyCode(data: FormType) {
    try {
      setLoading(true)

      const res = await verifyResetCodeAPI(data)

      if (res.status === "Success") {
        toast.success("Code verified 🎉")
        router.push("/UpdatePasword")
      } else {
        toast.error(res.message)
      }

    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // RESEND
async function handleResendCode() {
  setLoading(true)
  try {

    const email = localStorage.getItem("resetEmail")

    if (!email) {
      toast.error("Email not found")
      return
    }

    const res = await resendResetCodeAPI(email )

    if (res.status === "Success") {
      toast.success("Code resent successfully 📩")
    } else {
      toast.error(res.message || "Failed to resend code")
    }

  } catch {
    toast.error("Something went wrong")
  } finally {
    setLoading(false)
  }
}
  const code = form.watch("resetCode")


return <>
 <div className='relative'>

 {loading && (
  <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center">
    <Loading />
  </div>
)}   
 </div>
     <div className='container mx-auto shadow-2xl max-w-[700px]  h-[700px] lg:flex '>
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
    <h2 className='text-gray-500'>Step 2: Enter the verification code<br /> receive reset instructions.</h2>
    <p className='text-gray-300 text-center text-sm'>CONNECT WITH</p>
  <div className="flex items-center">
  <Button className='bg-blue-400 shadow-2xl px-4 text-white rounded-full'>
    <MdEmail className='size-6 text-white'/>
  </Button>

  <div className="h-[2px] w-52 bg-blue-400"></div>

  <Button className='bg-blue-400 shadow-2xl px-4  text-white rounded-full'>
    <FaKey className='size-6' />
  </Button>

  <div className="h-[2px] w-52 bg-gray-400"></div>

  <Button className='bg-gray-400 shadow-2xl px-4 text-white rounded-full'>
    <FaLock className='size-6' />
  </Button>
</div>
            <Form {...form} >
        <form onSubmit={form.handleSubmit(handleVerifyCode)}>

          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Code</FormLabel>

                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>

                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* RESEND */}
            <div >
          <p className='flex items-center justify-between'>
  Didn't receive the code?{" "}
  <span
    onClick={handleResendCode}
    className="text-blue-400 cursor-pointer"
  >
    Resend Code
  </span>
</p>
            </div>

          {/* SUBMIT */}
        <Button disabled={loading}  className="relative overflow-hidden p-6 cursor-pointer m-6 w-full bg-blue-950 text-white group">
          
          <span className="relative z-10 flex items-center gap-2 ">
            Verify Code <CiLocationArrow1 className='text-white' />
          </span>
        
          <span className="absolute left-0 top-0 h-full w-0 bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        
        </Button>  

        </form>
      </Form>
    <p >Still having trouble?  <Link className='text-blue-400' href='/'>contact support </Link></p>
   </div>
    </div>

  </div>
  </>
}

