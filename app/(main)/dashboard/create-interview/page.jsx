"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setformData] = useState();
  const [interviewId, setInterviewId] = useState();

  const onHandleInputChange = (field, value) => {
    setformData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log("FormData", formData);
  };

  const onGoToNext = () => {
    if (
      !formData?.jobPosition ||
      !formData?.jobDescription ||
      !formData?.duration ||
      !formData?.type ||
      formData.type.length === 0
    ) {
      toast("Please Enter All Details");
      return;
    }
    setStep(step + 1);
  };

  const onCreateLink = (interview_id)=>{
      setInterviewId(interview_id);
      setStep(step+1);
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer  " />
        <h2 className="font-bold text-2xl  ">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />
      {step == 1 ? (
        <FormContainer
          onHandleInputChange={onHandleInputChange}
          GotoNext={() => onGoToNext()}
        />
      ) : step == 2 ? (
        <QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/>
      ) : step == 3 ? (
        <InterviewLink interview_id={interviewId}
          formData = {formData}/>
      ) : null}
    </div>
  );
}

export default CreateInterview;
