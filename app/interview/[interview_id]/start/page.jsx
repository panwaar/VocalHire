"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import TimerComponent from "./_components/TimerComponent"
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  const [activeUser, setActiveUser] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [conversation,setConversation] = useState(); 
  const listenersAttached = useRef(false);
  const conversationRef = useRef(null);
  const {interview_id} = useParams();
  const router =  useRouter();
  const [loading, setloading] = useState();

useEffect(() => {
  if (!vapiRef.current) {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  }

  const vapi = vapiRef.current;

  // Prevent multiple registrations
  if (listenersAttached.current) return;

  vapi.on("call-start", () => {
    console.log("Call has started.");
    setInterviewStarted(true);
    setActiveUser(false);
    toast("Call Connected...");
  });

  vapi.on("speech-start", () => {
    console.log("Assistant speech has started.");
    setActiveUser(false);
  });

  vapi.on("speech-end", () => {
    console.log("Assistant Speech has ended.");
    setActiveUser(true);
  });

  vapi.on("call-end", () => {
    console.log("Call has ended");
    setInterviewStarted(false);
    toast("Interview Ended");
    GenerateFeedback();
  });

  vapi.on("message", (message) => {
  if (message?.conversation) {
    conversationRef.current = message.conversation; // ✅ real-time
    setConversation(message.conversation); // optional if you show it in UI
    console.log("Conversation so far:", message.conversation);
  }
});


  listenersAttached.current = true;
}, []);


const GenerateFeedback = async () => {
  const convo = conversationRef.current;

  if (!convo) {
    console.warn("No conversation data available yet.");
    return;
  }

  setloading(true); // Start loading before async ops

  let finalContent;

  try {
    const result = await axios.post('/api/ai-feedback', {
      conversation: convo,
    });

    const content = result?.data?.content || '';

    // Clean up formatting
    finalContent = content.replace('```json', '').replace(/```$/, '');

    console.log("Interview Feedback:", finalContent);
  } catch (error) {
    console.error("Error generating feedback:", error);
    setloading(false);
    return;
  }

  try {
    const { data, error } = await supabase
      .from('interview-feedback')
      .insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          feedback: JSON.parse(finalContent),
          recommended: false,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    console.log(data);
    router.replace(`/interview/${interview_id}/completed`);
  } catch (dbError) {
    console.error("Error saving feedback to database:", dbError);
  } finally {
    setloading(false);
  }
};


  useEffect(() => {
    if (interviewInfo?.interviewData?.questionList) {
      startCall();
    } else {
      console.warn("interviewData or questionList not available yet.");
    }
  }, [interviewInfo]);

  const startCall = () => {
    const vapi = vapiRef.current;
    const questions = interviewInfo.interviewData.questionList
      .map((q) => q.question)
      .join(", ");

    const assistantOptions = {
      name: "Hana",
      firstMessage: `Hello ${interviewInfo.userName}, I'm Hana. I hope you're having a great day. Shall we begin your interview for the ${interviewInfo.interviewData.jobPosition} position?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "vapi",
        voiceId: "Savannah",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant named Hana conducting interviews.
Start with a friendly intro, like:
"Hey there! Welcome to your ${interviewInfo.interviewData.jobPosition} interview. Let's get started!"
Ask the following questions one by one:
${questions}
Encourage the candidate, give hints if stuck, and be brief and positive.
Wrap up after 5-7 questions with a summary and motivating message.
Keep it friendly, short, and focused on React.`.trim(),
          },
        ],
      },
    };

    try {
      console.log("Starting Vapi with options:", assistantOptions);
      vapi.start(assistantOptions);
    } catch (error) {
      console.error("Vapi failed to start:", error);
    }
  };

 const stopInterview = () => {
  const vapi = vapiRef.current;
  vapi.stop(); 
};

  return (
    <div
      className="p-20 lg:px-48 xl:px-56 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/interview-bg.jpg')" }}
    >
      <h2 className="font-bold text-sm sm:text-xl md:text-2xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <TimerComponent running={interviewStarted} />
        </span>
      </h2>
      <hr className="mt-2 border-gray-800" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5 ">
        <div
          className="h-[400px] rounded-lg border flex flex-col gap-3 justify-center items-center "
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.65)",
            backdropFilter: "blur(7px)",
          }}
        >
          <div className="relative w-[60px] h-[60px]">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-green-300 opacity-75 animate-ping" />
            )}
            <Image
              src={"/ai.jpg"}
              alt="AI interviewer"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>

        <div
          className="h-[400px] rounded-lg border flex flex-col gap-3 justify-center items-center"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.65)",
            backdropFilter: "blur(7px)",
          }}
        >
          <div className="relative w-[60px] h-[60px]">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-green-300 opacity-75 animate-ping" />
            )}
            <h2 className="text-2xl bg-primary text-white p-2 rounded-full px-4.5">
              {interviewInfo?.userName?.[0] || "U"}
            </h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex gap-5 items-center justify-center mt-5">
        <Mic className="h-12 w-12 p-3 text-[beige] bg-primary rounded-full cursor-pointer" />
        {/* <AlertConfirmation stopInterview={stopInterview}> */}
          {!loading?<Phone className="h-12 w-12 p-3 bg-red-600 rounded-full cursor-pointer"
            onClick={()=> stopInterview()}
            />:<Loader2Icon className="animate-spin"/>}
        {/* </AlertConfirmation> */}
      </div>

      <h2 className="text-sm text-white font-bold text-center mt-4">
        Interview is in Progress...
      </h2>
    </div>
  );
}

export default StartInterview;
