import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, Calendar, Clock, Copy, List, Mail, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewLink({interview_id, formData}) {

    const url = process.env.NEXT_PUBLIC_HOST_URL + '/interview/' + interview_id;

    const GetInterviewUrl = ()=>{
            return url;
        }

    const onCopyLink=async()=>{
        await navigator.clipboard.writeText(url);
        toast('Link Copied');
    }

  return (
    <div className='flex flex-col items-center justify-center mt-10'>  
      <Image src={'/check.png'} alt='check' 
      width={200}
      height={200}
      className='w-[50px] h-[50px]'
      />

      <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
      <p className='mt-3'>Share this link to start the interview process</p>
    
        <div className='w-full p-7 mt-6 bg-white rounded-xl'>
            <div className='flex   justify-between items-center'>
                <h2 className='font-bold'>Interview Link</h2>
                <h2 className='p-1 px-2  text-green-700 bg-green-200 rounded-2xl'>Valid for 30 days</h2>
            </div>
            
            <div className='mt-3 flex gap-3 items-center'>
                <Input defaultValue={GetInterviewUrl()} disabled={true}/>
                <Button onClick={()=>onCopyLink()} > <Copy/>Copy Link </Button>
            </div>

            <hr className='my-5'/>

            <div className='flex gap-5'>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'>
                    <Clock className='h-4 w-4'/> {formData?.duration}
                </h2>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'>
                    <List className='h-4 w-4'/> 10 Questions
                </h2> 
            </div>
        </div>

        <div className="mt-7 bg-white p-5 rounded-lg w-full">
  <h2 className="font-bold text-base">Share Via</h2>
  
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-7 mt-3 w-full">
    <Button variant="outline" className="w-full sm:w-auto">
      <Mail className="mr-2 h-4 w-4" /> Email
    </Button>
    
    <Button variant="outline" className="w-full sm:w-auto">
      <Mail className="mr-2 h-4 w-4" /> Telegram
    </Button>
    
    <Button variant="outline" className="w-full sm:w-auto">
      <Mail className="mr-2 h-4 w-4" /> Whatsapp
    </Button>
  </div>
</div>


       <div className='mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between w-full'>
  <Link href="/dashboard" className="w-full sm:w-auto">
    <Button className="w-full sm:w-auto border-none bg-[#FFFFFF] text-primary hover:text-white">
      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
    </Button>
  </Link>

  <Link href={`/interview/${interview_id}`} className="w-full sm:w-auto">
    <Button className="w-full sm:w-auto bg-primary text-white">
      Go to Interview <ArrowRight/>
    </Button>
  </Link> 
</div>


    
    </div>
  )
}

export default InterviewLink
