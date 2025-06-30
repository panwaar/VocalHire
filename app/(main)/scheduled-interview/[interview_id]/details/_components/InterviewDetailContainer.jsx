import { Calendar, Clock, MessageCircleQuestionIcon } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function InterviewDetailContainer({interviewDetail}) {
  return (
    <div className='p-5 bg-[#FFF] rounded-lg mt-5 text-primary'>
      <h2>{interviewDetail?.jobPosition}</h2>

      <div className='text-primary mt-4 flex items-center justify-between lg:pr-52'>
        <div>
          <h2 className='text-sm'>Duration</h2>
          <h2 className='flex text-md items-center gap-1 font-bold'><Clock className='h-4 w-4'/> {interviewDetail?.duration}</h2>
        </div>
        <div>
          <h2 className='text-sm'>Created On</h2>
          <h2 className='flex text-md items-center gap-2 font-bold'><Calendar className='h-4 w-4'/> {moment(interviewDetail?.created_at).format("MMM DD, yyyy")}</h2>
        </div>
        <div>
          <h2 className='text-sm'>Type</h2>
          <h2 className='flex text-md items-center gap-1 font-bold'>
            <Clock className='h-4 w-4' />
            {interviewDetail?.type ? (() => {
              try {
                return JSON.parse(interviewDetail.type)?.[0] ?? 'N/A';
              } catch {
                return 'N/A';
              }
            })() : 'N/A'}
          </h2>
        </div>
      </div>
      
      {/* job description shown on scheduled interview page */}
      <div className='mt-5'>
            <h2 className='font-bold'>Job Description</h2>
            <p className='text-sm leading-6'>{interviewDetail?.jobDescription}</p>
      </div>

      {/* interview questions  */}
      <div className='mt-5'>
      <h2 className='font-bold'>Interview Question</h2>
      <div className='grid grid-cols-2 gap-3 mt-3'>
        {interviewDetail?.questionList.map((item, index) => (
          <h2 key={index} className='text-sm flex'>
            {index + 1}. {item?.question}
          </h2>
        ))}
      </div>
    </div>


    </div>
  )
}

export default InterviewDetailContainer
