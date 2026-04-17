'use client'
import Link from 'next/link'
import React from 'react'
import { FaGift, FaPhoneAlt, FaTractor } from 'react-icons/fa'
import { MdOutlinePerson } from 'react-icons/md'
import { SlEnvolopeLetter } from 'react-icons/sl'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@src/components/ui/navigation-menu"
import { Input } from '@src/components/ui/input'
const Navbar = () => {
  return <>
  <div className='flex justify-between items-center bg-gray-400'>
    <div>
      <p><FaTractor /> Free Shipping in orders 500 EGP</p>
      <p><FaGift /> New Arrivals Daily</p>
    </div>
    <div>
      <p><FaPhoneAlt/> +1(800) 123-4567</p>
      <p><SlEnvolopeLetter /> support@farmart.com</p>
      <Link href='/signin'> <MdOutlinePerson /> sign in</Link>
      <Link href='/register'> <MdOutlinePerson /> sign Up</Link>
    </div>
  </div>
  <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <p className='bold'>Far <span className='text-blue-500'>Mart</span></p>
    </NavigationMenuItem>
    <NavigationMenuItem>
    <Input placeholder='Search for products,brands and morepo['/>
    </NavigationMenuItem>
    <NavigationMenuItem>
    <Input placeholder='Search for products,brands and morepo['/>
    </NavigationMenuItem>
    <NavigationMenuItem>
  <NavigationMenuContent>
        <NavigationMenuLink>Home</NavigationMenuLink>
      </NavigationMenuContent>
  <NavigationMenuContent>
        <NavigationMenuLink>Shop</NavigationMenuLink>
      </NavigationMenuContent>

      <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
      <NavigationMenuContent>
        <NavigationMenuLink>Brands</NavigationMenuLink>
      </NavigationMenuContent>
 
  </NavigationMenuItem>
   
  </NavigationMenuList>
</NavigationMenu>
  
  </>
}

export default Navbar