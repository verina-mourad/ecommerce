import Information from "@src/app/_component/Information";
import Link from "next/link";
import { MdOutlinePersonOutline } from "react-icons/md";

export default function MyAccountLayout({ children }:{children:React.ReactNode}) {
 
  return (
    <div>

      <div className='m-5'>

        <div className='flex items-center gap-2 mb-4'>
          <Link href='/' className='text-gray-400'>Home {'>'}</Link>
          <p className='text-sm'>MY ACCOUNT</p>
        </div>

        <div className='flex items-center gap-2 mb-10'>
          <div className='bg-blue-400 w-fit rounded-2xl p-3'>
            <MdOutlinePersonOutline className='text-white size-8'/>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='font-bold text-2xl'>
              MY <span className='text-blue-400'>ACCOUNT</span>
            </h2>
            <p className='text-gray-400'>
              Manage your profile, addresses and security preferences.
            </p>
          </div>
        </div>

        <Information />
      </div>
        <div className="m-5">

      {children}
        </div>

    </div>
  );
}