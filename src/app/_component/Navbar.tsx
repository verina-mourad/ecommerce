'use client'

import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { FaGift, FaPhoneAlt, FaRegHeart, FaTractor } from 'react-icons/fa'
import { MdOutlinePerson, MdShoppingCart } from 'react-icons/md'
import { SlEnvolopeLetter } from 'react-icons/sl'
import { FiLogOut } from "react-icons/fi";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@src/components/ui/navigation-menu"

import { Input } from '@src/components/ui/input'
import { IoCloseOutline, IoMusicalNotesSharp, IoSearch } from 'react-icons/io5'
import { IoMdMusicalNotes } from 'react-icons/io'
import { BsCart4 } from 'react-icons/bs'
import { Button } from '@src/components/ui/button'
import { CiMenuBurger } from 'react-icons/ci'
import { CgMenuLeft } from 'react-icons/cg'
import { useSession } from 'next-auth/react'
import LogoutButton from './Logout'
import { MyProfile } from './MyProfile'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Count } from '@src/Context/Count'
import { ImSpinner9 } from 'react-icons/im'
import { CartCount } from '@src/Context/CountCart'
import { getCategories } from '@src/services/getcategories'
import { Product } from '@src/types/SubCategories'
const Navbar = () => {
  const{data,status}=useSession()
    const Data=useContext(Count)
      const CountCart=useContext(CartCount)
{/*sub category*/}
    const [categories, setCategories] = useState<Product[]>([])
    const musiccategory=categories.find((category)=>category.name==='Music');
    const WomensFashion=categories.find((category)=>category.name===`Women's Fashion`)
    const MensFashion=categories.find((category)=>category.name===`Men's Fashion`)
    const SuperMarket=categories.find((category)=>category.name===`SuperMarket`)
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data)
    })
  }, [])

    const [open, setopen] = useState(false)
    const [search, setSearch] = useState('')
    const router=useRouter()
  const handleWishlist = () => {
  if (status !== 'authenticated') {
    toast.error('Please login first',{position:'top-center'})
    return
  }
  router.push('/whishlist')
}
  const handlecart = () => {
  if (status !== 'authenticated') {
    toast.error('Please login first',{position:'top-center'})
    return
  }
  router.push('/Cart')
}


function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === 'Enter' && search.trim()) {
    router.push(`/Shop?query=${search}`)

    setSearch('')
  }
}
  return (
    <>
<aside className="w-full bg-white shadow-2xl relative ">      
     <div className='bg-gray-200 hidden md:flex'>
         <div className=" container mx-auto px-4 flex flex-col md:flex-row justify-between items-center  px-4 py-2 text-sm gap-2 md:grid md:grid-cols-6">

        <div className="flex gap-4 col-span-2">
          <p className="flex items-center gap-1 col-span-1 ">
            <FaTractor className='text-blue-400 size-6' /> Free Shipping on orders 500 EGP+
          </p>
          <p className="flex items-center gap-1 col-span-1">
            <FaGift className='text-blue-400 size-6' /> New Arrivals Daily
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-center col-span-4">
          <p className="flex items-center gap-1 col-span-1">
            <FaPhoneAlt /> +1(800) 123-4567
          </p>

          <p className="flex items-center gap-1 col-span-1">
            <SlEnvolopeLetter /> support@farmart.com
          </p>

          <Link href="/sign-in" className="flex items-center gap-1 col-span-1">
            <MdOutlinePerson className='size-5' /> Sign In
          </Link>

          <Link href="/sign-up" className="flex items-center gap-1 col-span-1">
            <MdOutlinePerson className='size-5' /> Sign Up
          </Link>
        </div>,
      </div>

     </div>
      {/* MAIN NAVBAR */}

    {open && 
    <div className='fixed inset-0 z-[99999]'>
        <div
            className="absolute inset-0 bg-blue-400/20"
            onClick={() => setopen(false)}/>
        <div className='relative w-2/3 md:w-1/3 h-full bg-white top-0 p-4 flex flex-col gap-4 '>
          <div className='flex justify-between'>
             <div className='flex items-center '>
                <BsCart4 className='size-6 text-blue-400 p-1' />
                <span>FarMart</span>
             </div>
            <div onClick={()=>setopen(false)} className='cursor-pointer'><IoCloseOutline /></div>
          </div>
            <div className="relative w-full">

               <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
              />

                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />

            </div>
        <Link href="/" >Home</Link>
        <Link href="/Shop" >Shop</Link>
        <Link href="/brand" >Brands</Link>
        <p className='text-sm text-gray-500'>Categories</p>
        <Link href="/Categories" >Allcategories</Link>
        <Link href={`/SubCategories/${musiccategory?._id}`} >Music</Link>
        <Link href="/SubCategories/${MensFashion?._id}" >Men'sFashion</Link>
        <Link href={`/SubCategories/${WomensFashion?._id}`} >Women'sFashion</Link>
        <Link href={`/SubCategories/${SuperMarket?._id}`} >SuperMarket</Link>
        {status==='authenticated'? <Button className='bg-red-500 text-white rounded-xl shadow-2xl w-full'><Link href='/Logout'>Logout</Link></Button>  : <div className='flex gap-2'>
            <Button onClick={()=>(setopen(false))} className='bg-gray-100 text-black rounded-xl shadow-2xl w-1/2' ><Link href='/sign-in'>Sign In</Link></Button>
            <Button onClick={()=>(setopen(false))}  className='bg-blue-400 text-white rounded-xl shadow-2xl w-1/2'><Link href='/sign-up'>Sign Up</Link></Button>
        </div>
        }
    </div> 
    </div> 
      }
    </aside>
    <div className="bg-white shadow-2xl w-full sticky z-[999]  top-0 ">

  <div className="container mx-auto px-4  grid grid-cols-12 items-center py-3 gap-4">

    {/* MENU BUTTON */}
    <div className=" col-span-1 lg:hidden">
      <Button
        onClick={() => setopen(!open)}
        className="bg-white text-black cursor-pointer"
      >
        <CgMenuLeft className="size-6" />
      </Button>
    </div>
 
    {/* LOGO */}
    <div className=" col-span-7 md:col-span-2 ">
      <Link href="/" className="flex items-center gap-1 font-bold text-xl">
        <BsCart4 className="text-blue-400 size-6" />
        Far<span className="text-blue-500">Mart</span>
      </Link>
    </div>

    {/* SEARCH */}
    <div className="hidden md:block md:col-span-5 ">
      <div className="relative w-full"       >
        <Input
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        onKeyDown={handleSearch}
          placeholder="Search for products..."
          className="w-full pl-10 h-11"
        />
        <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
      </div>
    </div>

    <div className="hidden lg:flex col-span-3 items-center gap-4">

      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-5">

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/Shop">Shop</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-xl rounded-xl">
                  <div className="w-48 p-2 flex flex-col gap-2">
                      {categories.map((cat) => (
                      <NavigationMenuLink asChild key={cat._id}>
                          <Link
                          href={`/Categories/${cat._id}`}
                          className="block px-2 py-1 hover:bg-gray-100 rounded-md"
                            >
                          {cat.name}
                            </Link>
                      </NavigationMenuLink>
                      ))}
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/brand">Brands</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

    </div>

    {/* ICONS */}
    <div className="col-span-4 lg:col-span-2 flex justify-end items-center gap-4">
    
     <div className="relative"  onClick={handleWishlist}>
        <FaRegHeart className="size-6 cursor-pointer" />

        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
          {Data?.loading? <ImSpinner9 className='animate-spin' />: Data?.count}
        </span>
    </div>
    <div className="relative" onClick={handlecart}>
          <MdShoppingCart className="size-6 text-blue-400 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs px-1 rounded-full">
          {CountCart?.loading ? <ImSpinner9 className='animate-spin' /> : CountCart?.countCart}</span>
    </div>
      {status==='authenticated'?<>
      <MyProfile/>
     </>
     :
      <Link
        href="/sign-in"
        className="hidden md:flex items-center gap-1 bg-blue-400 text-white px-4 py-1 rounded-xl"
        >
        <MdOutlinePerson />
        <span className="hidden sm:block">Sign In</span>
      </Link>
}
    </div>
  </div>
</div>
</>
  )
}

export default Navbar