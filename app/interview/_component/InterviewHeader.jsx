import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className="p-4 shadow-lg bg-[#ACCAFF] flex items-center justify-between">
  {/* Logo */}
  <Image
    src="/logo.png"
    alt="logo"
    width={200}
    height={100}
    className="w-[140px]"
  />

  {/* Heading */}
  <h2 className="text-primary text-lg font-semibold">
    AI-Powered Interview Platform
  </h2>
</div>

  )
}

export default InterviewHeader
