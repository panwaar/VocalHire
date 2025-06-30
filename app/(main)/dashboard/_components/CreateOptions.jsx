import { PhoneCall, Video } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid grid-cols-1 gap-5 '>
            
      <Link href={'/dashboard/create-interview'} className='bg-[#FFFFFF] border-gray-200 rounded-lg p-5 flex flex-col cursor-pointer'>
        <Video className='p-3 text-primary bg-green-100 rounded-lg h-12 w-12 '/>
        <h2 className='font-bold'>Create New Interview</h2>
        <p className='text-gray-500'>Create AI-driven interviews and schedule them with candidates</p>
      </Link> 
    </div>
  )
}

export default CreateOptions
