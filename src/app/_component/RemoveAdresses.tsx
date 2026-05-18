import { DeleteAddress } from '@src/api/Addresses'
import { product } from '@src/types/dataaddresses'
import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

const RemoveAdresses = ({ID,setAddresses}:{ID:string,setAddresses: React.Dispatch<React.SetStateAction<product[]>>}) => {
    async function DeleteAdresses(ID:string){
       const Delete= await DeleteAddress(ID)
       console.log(Delete);
       setAddresses((prev)=>prev.filter((item)=> item._id !==ID))
       

    }
  return (
     <div onClick={()=>DeleteAdresses(ID)}>
      <FaRegTrashAlt className='cursor-pointer'/>
    </div>
)}

export default RemoveAdresses