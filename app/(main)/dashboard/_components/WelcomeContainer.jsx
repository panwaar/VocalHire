'use client'
import { useUser } from '@/app/Provider'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function WelcomeContainer() {
  const { user } = useUser(); 

  return (
    
    <div  className='bg-white m-10 p-5 rounded-lg flex justify-between items-center'>
    <div>
      <h2 className='text-lg font-bold'>Welcome Back, {user?.name}</h2>
      <h2 className='text-gray-500 '>AI-Driven Interview, Hassel-Free Hiring</h2>
    </div>

    {user &&<Image src={user?.picture} alt='userAvatar' width={40} height={40}
    className='rounded-full'/>}
    </div> 
  )
}

export default WelcomeContainer
 