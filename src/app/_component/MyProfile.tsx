'use client'

import { Button } from "@src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

import { BsBoxArrowLeft } from "react-icons/bs"
import { FaRegHeart } from "react-icons/fa"
import { FaBoxArchive } from "react-icons/fa6"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlinePersonOutline } from "react-icons/md"
import { TbAddressBook } from "react-icons/tb"

export function MyProfile() {
  const router = useRouter()
  const{data,status}=useSession()

  return (
  <DropdownMenu>
      
      {/* ✅ Trigger الصح */}
      <DropdownMenuTrigger asChild>
        <Button className="bg-white shadow-2xl cursor-pointer rounded-2xl">
          <MdOutlinePersonOutline className="text-blue-400 size-6" />
        </Button>
      </DropdownMenuTrigger>

      {/* ✅ Content */}
      <DropdownMenuContent
        className="w-48 z-[9999] bg-white"
        align="end"
        sideOffset={5}
      >

        <DropdownMenuGroup >
          <DropdownMenuItem onClick={() => router.push('/MyAccount')}>
              <div className="flex flex-row gap-2 w-fit">
              <div className="bg-blue-200 rounded-full border-2 border-white w-10 h-10 flex items-center justify-center">
                <MdOutlinePersonOutline className="text-blue-400 size-6" />
              </div>         
              <div className="flex flex-col">
                  <p className="font-bold">{data?.user.name}</p>
                  <p className="text-gray-400">{data?.user.email}</p>
                </div>
              </div>
          </DropdownMenuItem>
      

        <DropdownMenuItem onClick={() => router.push('/MyAccount')}>
                  <div className="flex items-center gap-3 w-full">
                    
                    {/* نفس عرض الدائرة فوق */}
                    <div className="icon-circle">
                    <MdOutlinePersonOutline className="size-5 text-gray-600" />
                    </div>

                    <span className="cursor-pointer">My Profile</span>
                  </div>
         </DropdownMenuItem>
         <DropdownMenuItem onClick={() => router.push('/getAllOrders')}>
                <div className="flex items-center gap-3 w-full">
                  
                  <div className="icon-circle">
                    <FaBoxArchive className="icon-container" />
                  </div>

                  <span className="cursor-pointer">My Orders</span>
                </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push('/whishlist')}>
                <div className="flex items-center gap-3 w-ful cursor-pointer">
                  
                  <div className="icon-circle">
                  <FaRegHeart className="size-5 text-gray-600" />
                  </div>

                  <span className="cursor-pointer">My Wishlist</span>
                </div>

          </DropdownMenuItem>

    <DropdownMenuItem onClick={() => router.push('/MyAccount/Addresses')}>
          <div className="flex items-center gap-3 w-full cursor-pointer">
            
            {/* نفس عرض الدائرة فوق */}
            <div className="icon-circle"> 
            <TbAddressBook className="size-5 text-gray-600" />
            </div>

            <span className="cursor-pointer">Addresses</span>
          </div>
    </DropdownMenuItem>

      <DropdownMenuItem onClick={() => router.push('/MyAccount/Password')}>
             <div className="flex items-center gap-3 w-full cursor-pointer">      
              <div className="icon-circle">
              <IoSettingsOutline className="size-5 text-gray-600 cursor-pointer" />
              </div>
              <span className="cursor-pointer">Settings</span>
              </div>
      </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
       <DropdownMenuItem
          className="text-red-600"
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
        >
           <div className="flex items-center gap-3 w-full cursor-pointer">
            
            <div className="icon-circle">
            <BsBoxArrowLeft className="size-5" />
            </div>

            <span>Sign out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>

  </DropdownMenu>
  )
}