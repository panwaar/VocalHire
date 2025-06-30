'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { supabase } from '@/services/supabaseClient'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation' 
import React, { useContext, useEffect, useState } from 'react' 
import { toast } from 'sonner'
import InterviewHeader from '../_component/InterviewHeader'

function Interview() {

    const {interview_id} = useParams();
    // console.log(interview_id);
    const [interviewData, setInterviewData] = useState();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [loading, setloading] = useState(false);
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext)
    const router = useRouter();
    

    useEffect(()=>{
        interview_id && GetInterviewDetails();
    },[interview_id])
        

    const GetInterviewDetails =async() =>{
        setloading(true);
        try{
        let { data: interview, error } = await supabase
        .from('interview')
        .select("jobPosition ,jobDescription , duration , type")
        .eq('interview_id',interview_id)

        setInterviewData(interview[0]);
        setloading(false);

        if(interview?.length==0){
            toast('Incorrect Interview Link')
            return;
        }

        }
        catch(e){
            setloading(false);
            toast('Incorrect Interview Link')
        }
    } 

    const onJoinInterview= async()=>{
        setloading(true)
        let { data: interview, error } = await supabase
        .from('interview')
        .select('*')
        .eq('interview_id',interview_id);


        // console.log(interview[0]);
        setInterviewInfo({
            userName:userName,
            userEmail:userEmail,
            interviewData: interview[0],
        });
        router.push('/interview/'+ interview_id+'/start')
        setloading(false);
    }

  return (   
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 pb-10 min-h-screen bg-cover bg-center bg-no-repeat p-10'   style={{ backgroundImage: "url('/interview-bg.jpg')" }}
>
      <div
        className="flex flex-col items-center justify-center border rounded-xl p-5 lg:px-32 xl:px-52 shadow-xl"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.65)", backdropFilter: "blur(6px)" }}
        > 
            <h2 className='m-2 text-primary'>Empowering Better Interviews with AI</h2>

            <Image src={'/interview.jpg'} alt='interview' 
            width={500}
            height={500}
            className='w-[250px] my-6 rounded-2xl'
            />

            <h2 className='font-bold text-lg text-primary'>
                {interviewData?.jobPosition}
            </h2>

            <h2 className='flex gap-2 items-center text-gray-600'>
                <Clock className='h-3 w-4'/>
                {interviewData?.duration}
            </h2>

            <div className='mt-10 w-full '>
                <h2 className='mb-2 text-primary font-bold'>Enter Your Full Name</h2>
                <Input placeholder='e.g. Rahul Panwar' onChange={(event)=>setUserName(event.target.value)} className='border-gray-600'/>
            </div>
            
            <div className='mt-10 w-full '>
                <h2 className='mb-2 text-primary font-bold'>Enter Your Email</h2>
                <Input placeholder='e.g. panwar123@mail.com' onChange={(event)=>setUserEmail(event.target.value)} className='border-gray-600'/>
            </div>

            <div className='bg-green-300 m-5 rounded-2xl p-3 w-full'>
                
                <h2 className='font-bold mt-2 mb-2 flex'> <Info className='mr-2'/>  Before you begin</h2>
                <ul >
                    <li className='text-sm text-primary ml-4 mb-1'>
                        - Ensure you have a stable internet connection
                    </li>
                    <li className='text-sm text-primary ml-4 mb-1'>
                        - Test your camera and microphone 
                    </li>
                    <li className='text-sm text-primary ml-4 '>
                        - Find a quiet place for interview 
                    </li>
                </ul> 
            </div>
            
            <Button className='min-w-[200px] text-[beige]'
                disabled={loading || !userName} 
                onClick={()=>onJoinInterview()}
                >
                <Video className='mr-1'/>
                {loading && <Loader2Icon/>}
                 Join Interview
            </Button>
      </div>
    </div>   
  )
}

export default Interview

