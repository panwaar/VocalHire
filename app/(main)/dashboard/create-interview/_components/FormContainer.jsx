import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"; 
 

function FormContainer({onHandleInputChange,GotoNext }) {

    const [interviewType, setInterviewType] = useState([]);

    useEffect(()=>{
        if(interviewType){
            onHandleInputChange('type',interviewType)
        }
    },[interviewType])

     
    const AddInterviewtype = (title) => {
    const exists = interviewType.includes(title);

    if (!exists) {
        setInterviewType(prev => [...prev, title]);
    } else {
        const result = interviewType.filter(item => item !== title);
        setInterviewType(result);
    }
    };





  return (
    <div className="p-4 bg-white rounded-lg w-full">
  {/* Job Position Input */}
  <div>
    <h2 className="text-sm font-medium">Job Position</h2>
    <Input
      placeholder="e.g. Full Stack Developer"
      className="mt-2 w-full"
      onChange={(event) => onHandleInputChange('jobPosition', event.target.value)}
    />
  </div>

  {/* Job Description */}
  <div className="mt-5">
    <h2 className="text-sm font-medium">Job Description</h2>
    <Textarea
      placeholder="Enter detailed job description"
      className="h-[150px] md:h-[200px] mt-2 w-full"
      onChange={(event) => onHandleInputChange('jobDescription', event.target.value)}
    />
  </div>

  {/* Interview Duration Dropdown */}
  <div className="mt-5">
    <h2 className="text-sm font-medium">Interview Duration</h2>
    <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
      <SelectTrigger className="w-full mt-2">
        <SelectValue placeholder="Select Duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5 Min">5 Min</SelectItem>
        <SelectItem value="15 Min">15 Min</SelectItem>
        <SelectItem value="30 Min">30 Min</SelectItem>
        <SelectItem value="45 Min">45 Min</SelectItem>
        <SelectItem value="60 Min">60 Min</SelectItem>
      </SelectContent>
    </Select>
  </div>

  {/* Interview Type Options */}
  <div className="mt-5">
    <h2 className="text-sm font-medium">Interview Type</h2>
    <div className="flex flex-wrap gap-3 mt-3">
      {InterviewType.map((type, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 cursor-pointer bg-white rounded-lg border border-gray-200 px-3 py-2
            hover:bg-[#317256] hover:text-white transition-all
             ${interviewType.includes(type.title) && 'bg-green-200 text-primary'}`}
          onClick={() => AddInterviewtype(type.title)}
        >
          <type.icon className="h-4 w-4" />
          <span className="text-sm">{type.title}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Submit Button */}
  <div className="mt-7 flex justify-end" onClick={() => GotoNext()}>
    <Button className="w-full md:w-auto text-sm">
      Generate Question <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
</div>

  );
}

export default FormContainer;
