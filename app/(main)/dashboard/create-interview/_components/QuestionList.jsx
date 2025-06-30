import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/Provider";
import { v4 as uuidv4 } from 'uuid';

function QuestionList({ formData,onCreateLink }) {
  const [loading, setLoading] = useState(false);
  const {user} = useUser();

  const [saveLoading, setSaveLoading] = useState(false);

  const [questionList, setQuestionList] = useState(null);
  const hasFetched = useRef(false); // prevents double call in dev

  useEffect(() => {
    if (formData && !hasFetched.current) {
      hasFetched.current = true;
      GenerateQuestionList();
    }
  }, [formData]);

  // button to finish and save generated question
  const onFinish = async () => {
  setSaveLoading(true);
  const interview_id = uuidv4();

  // Step 1: Check if the same interview already exists
  const { data: existingData, error: fetchError } = await supabase
    .from("interview")
    .select("*")
    .eq("jobPosition", formData.jobPosition)
    .eq("userEmail", user?.email);

  if (fetchError) {
    console.error("Error checking existing interview:", fetchError);
    toast("Failed to check existing data.");
    setSaveLoading(false);
    return;
  }

  if (existingData && existingData.length > 0) {
    toast("You've already saved questions for this job.");
    setSaveLoading(false);
    return;
  }

  // Step 2: Proceed with saving
  const { data, error } = await supabase.from("interview").insert([
    {
      ...formData,
      questionList: questionList,
      userEmail: user?.email,
      interview_id: interview_id,
    },
  ]);

  if (error) {
    console.error("Error saving to DB:", error);
    toast("Failed to save interview data.");
  } else {
    toast("Interview questions saved successfully!");
  }

  setSaveLoading(false);
  onCreateLink(interview_id)
};
  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });

      const content = result.data.content;
      console.log("Raw AI content:", content);

      // Extract content between ```json ... ```
      const match = content.match(/```json\s*([\s\S]*?)```/);
      const rawJSON = match ? match[1].trim() : content;

      let parsed;
      try {
        parsed = JSON.parse(rawJSON);
      } catch (err) {
        console.error("JSON parsing failed", err);
        toast("Invalid JSON format from AI.");
        setLoading(false);
        return;
      }

      // Handle either direct array or { interviewQuestions: [...] }
      const questions = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed.interviewQuestions)
        ? parsed.interviewQuestions
        : null;

      if (!questions) {
        toast("Invalid interview question format received.");
        console.error("Parsed object:", parsed);
        setLoading(false);
        return;
      }

      setQuestionList(questions); // you can use this later if needed
      setLoading(false);
    } catch (e) {
      console.error("Error:", e);
      toast("Server Error, Try Again!");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="p-5 bg-green-50 rounded-lg border border-gray-100 flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              AI is crafting personalized questions based on your job position.
            </p>
          </div>
        </div>
      )}
      {questionList?.length > 0 && (
        <div>
           <QuestionListContainer questionList={questionList}/>
        </div>
      )}

      <div className="flex justify-end mt-10">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
            {saveLoading && <Loader2Icon className="animate-spin"/>}
            Create Interview Link & Finish
        </Button>
      </div>
    </>
  );
}

export default QuestionList;
