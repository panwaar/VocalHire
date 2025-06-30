'use client'
import { useUser } from '@/app/Provider';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import { supabase } from '@/services/supabaseClient';
import CandidateList from './_components/CandidateList';
import { ArrowLeft } from 'lucide-react';

function InterviewDetail() {
    const {interview_id} = useParams();
    const { user } = useUser();
    const [interviewDetail, setInterviewDetail] = useState();
    const router = useRouter();


    useEffect(()=>{
        user && GetInterviewDetail();
    },[user])
    
    const GetInterviewDetail= async()=>{
        const result = await supabase.from('interview')
                .select('jobPosition,jobDescription,type,questionList, duration, interview_id, created_at, interview-feedback(userEmail, userName, feedback, created_at)')
                .eq('userEmail', user?.email)
                .eq('interview_id',interview_id)

                setInterviewDetail(result?.data[0]);
                console.log(result);   
        }

        return (
        <div className='mt-5'>
            <div className='flex items-center gap-2'>
            <ArrowLeft onClick={() => router.push("/scheduled-interview")} className="cursor-pointer  " />
            <h2 className='font-bold text-2xl'>Interview Detail</h2>
            </div>
            <InterviewDetailContainer interviewDetail={interviewDetail}/>
            <CandidateList candidateList={interviewDetail?.['interview-feedback']}/>
        </div>
  )
}


export default InterviewDetail

