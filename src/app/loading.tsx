'use client'

export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <span className="loader"></span>
      <h2 className='text-xl'>Loading FarMart</h2>
      <p className='text-gray-400'>please wait a moment</p>
    </div>
  )
}