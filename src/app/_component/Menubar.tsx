'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Menubar = () => {
    const pathname=usePathname()
    const profiles=[
        {path:'/ProfileInfo',title:'Profile Info'},
        {path:'/Addresses',title:'Addresses'},
        {path:'/Password',title:'Password'},
        {path:'/Logout',title:'Logout'},
    ]
  return <>
  <nav className='flex gap-4'>
  {profiles.map((profile)=>(
    <Link href={profile.path}className={pathname === profile.path ? "text-blue-500 font-bold" : ""} >{profile.title}</Link>
  ))
}
  </nav>
  </>

export default Menubar