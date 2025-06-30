'use client'
import { useUser } from '@/app/Provider';
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient';
import { Camera, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard'; 

function LatestInterviewsList() {

    const [interviewlist, setInterviewList] = useState([]);
    const {user} = useUser();
    useEffect(()=>{
      user && GetInterviewList();
  },[user])

    const GetInterviewList = async() => {
    let { data: interview, error } = await supabase
    .from('interview')
    .select('*')
    .eq('userEmail',user?.email)
    .order('id',{ascending:false})
    .limit(6)

    setInterviewList(interview)
  }



  return (
    <div className='my-5 '>
        <h2 className='font-bold text-2xl pl-2'>Previously Created Interview</h2>
    
        {interviewlist?.length ==0 && 
        <div className='flex flex-col gap-3 items-center m-5 rounded-lg'>
            <Video className='h-10 w-10 text-primary'/>
            <h2>You Don't have any interview creater</h2>
            <Button>+ Create new interview</Button>
        </div>}

        {interviewlist && 
          <div className='grid grid-cols-2 xl:grid-cols-3 gap-2 mt-5'>
            {interviewlist.map((interview, index)=>(
              <InterviewCard interview={interview} key={index}/>
            ))}
          </div>
            
            
 
        }
    
    
    </div>
  )
}

export default LatestInterviewsList
