'use client'
import { useUser } from '@/app/Provider'
import { supabase } from '@/services/supabaseClient'
import { duration } from 'moment'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard'
import { ArrowLeft, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function ScheduledInterview() {

    const {user} = useUser();
    const [interviewlist, setInterviewList] = useState();
    const router = useRouter();

    useEffect(()=>{
        user && GetInterviewList();
    },[user])

    const GetInterviewList = async()=>{
        const result = await supabase.from('interview')
        .select('jobPosition , duration, interview_id , interview-feedback(userEmail)')
        .eq('userEmail', user?.email)
        .order('id', {ascending:false})

        // console.log(result);
        setInterviewList(result.data);
    }

  return (
    <div className='mt-5'>
      <div className='flex items-center gap-2'>
        <ArrowLeft onClick={() => router.push("/dashboard")} className="cursor-pointer  " />
        <h2 className='font-bold text-xl'>Interview List With Candidate Feedback</h2>
      </div>
    
    {interviewlist?.length ==0 && 
        <div className='flex flex-col gap-3 items-center m-5 rounded-lg'>
            <Video className='h-10 w-10 text-primary'/>
            <h2>You Don't have any interview creater</h2>
            <Button>+ Create new interview</Button>
        </div>}

        {interviewlist && 
          <div className='grid grid-cols-2 xl:grid-cols-3 gap-2 mt-5'>
            {interviewlist.map((interview, index)=>(
              <InterviewCard interview={interview} key={index}
              viewDeatil = {true}/>
            ))}
          </div> 
        }
    
    </div>

    
  )
}

export default ScheduledInterview
