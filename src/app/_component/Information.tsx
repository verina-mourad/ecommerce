'use client'
import { LogoutContext } from '@src/Context/LogoutContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'

const Information = () => {
    const pathname=usePathname()
       const data=useContext(LogoutContext)
    
  return <>
  <div className='flex items-center gap-4'>
    <Link className={pathname==='/MyAccount'? "text-blue-500 bg-blue-100/40 p-3 font-bold" : ""} href='/MyAccount'>Profile Info</Link>
  <Link className={pathname==='/MyAccount/Addresses'? "text-blue-500  bg-blue-100/40 p-3  font-bold" : ""}  href='/MyAccount/Addresses'>Addresses</Link>
  <Link className={pathname==='/MyAccount/Password'? "text-blue-500  bg-blue-100/40 p-3  font-bold" : ""}  href='/MyAccount/Password'>Password</Link>
  <div onClick={()=>data.setopen(true)}>
      <Link className={pathname==='/MyAccount/Logout'? "text-blue-500  bg-blue-100/40 p-3  font-bold" : ""}  href='/MyAccount/Logout'>Logout</Link>

  </div>
  </div>
  </>
}

export default Information