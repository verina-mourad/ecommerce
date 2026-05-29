import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form'
import { Input } from '@src/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@src/components/ui/button'
import { IoIosKey } from 'react-icons/io'
import { UpdatePasswordAction } from '@src/UpdatePassword/UpdatePassword'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


const UpdatePassword = () => {
           const router = useRouter()
         const SchemaUpdatePassword = z.object({
      currentPassword: z
        .string()
        .regex(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
          "Password is too weak (Min. 8 chars, 1 Upper, 1 Special)"
        ),
    
      password: z
        .string()
        .regex(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
          "Password is too weak (Min. 8 chars, 1 Upper, 1 Special)"
        ),
        rePassword:z.string()
    }).refine((data)=>data.rePassword ===data.password,{path:['rePassword'],message:'password and repassword do not match'})
        const UpdatePassword=useForm({
         defaultValues:
        {currentPassword:"",
        password:"",
        rePassword:""},
        resolver:zodResolver(SchemaUpdatePassword),
        mode:'onChange'
        
        })
         type UpdatePasswordType=z.infer<typeof SchemaUpdatePassword>
        async function HandlePasword(value:UpdatePasswordType) {
            const data=await UpdatePasswordAction(value)
           console.log(data);
           if(data.statusMsg==='success')
           {
             toast('login successfully',{position:'top-center'})

           }else{
             toast.error(data?.error,{position:'top-center'})
           }
            
        }
  return <>
    <Form {...UpdatePassword}>
    <form onSubmit={UpdatePassword.handleSubmit(HandlePasword)}>      
        <FormField
        control={UpdatePassword.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mt-2 text-gray-400'>Current Password</FormLabel>
              <FormControl>
                <Input {...field}  type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={UpdatePassword.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mt-2 text-gray-400'>New Password</FormLabel>
              <FormControl>
                <Input {...field}  type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={UpdatePassword.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mt-2 text-gray-400'>Confirm New Password</FormLabel>
              <FormControl>
                <Input {...field}  type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <Button className='group overflow-hidden relative cursor-pointer p-6 mt-6 bg-blue-950 w-full' type="submit">
            <span className='flex z-10 items-center gap-2 text-white'>
              <IoIosKey /> Update Password
            </span>
            <span className='absolute top-0 left-0 h-full w-0 bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full'></span>
          </Button>
    </form>
        
  </Form>
  </>
}

export default UpdatePassword