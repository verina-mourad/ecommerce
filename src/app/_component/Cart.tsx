import { Button } from '@src/components/ui/button'
import React from 'react'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import { CiLocationArrow1 } from 'react-icons/ci'
import { FaCarSide } from 'react-icons/fa'
import { GiThreeLeaves } from 'react-icons/gi'

const Cart = () => {
  return <>
  <div className='bg-blue-200'>
    <div className='gap-3 w-fit flex items-center justify-center'>
      <Button className='bg-blue-400 p-3'>  <BiMessageRoundedDetail /></Button>
    <p className='text-blue-400'>NEWLETTER <br /> <span className='text-sm'>50,000+ Subscribes</span></p>
    </div>
    <div className='text-2xl font-bold'>Get the Freshest Updates <span className='text-blue-400'>Delivered Free
</span></div>
<div>Weekly recipes, seasonal offers & exclusive member perks.</div>
<div className='flex gap-4'>
<button className='bg-white rounded-2xl px-4 py-2 flex items-center gap-2 shadow-sm hover:shadow-md transition'>
  <GiThreeLeaves className='text-blue-400 text-lg' />
  Free Delivery Codes
</button> 
   <button className='bg-white rounded-2xl p-2 flex items-center'><FaCarSide  className='text-blue-400 p-2 text-lg' />Free Delivery Codes</button>
    <button className='bg-white rounded-2xl p-2 flex items-center'><CiLocationArrow1  className='text-blue-400 p-2 text-lg'/>Members-Only Deeals</button>
</div>
  </div>
  </>
}

export default Cart