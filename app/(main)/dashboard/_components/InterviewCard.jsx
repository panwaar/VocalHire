import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function InterviewCard({ interview, viewDeatil = false, user }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Copied");
  };

  const onSend = () => {
    window.location.href = `mailto:accounts@panwarrahul3183@gmail.com?subject=Vocalhire Interview Link&body=Interview Link: ${url}`;
  };

  return (
    <div className="p-4 m-4 bg-white rounded-lg border shadow-sm w-full max-w-md mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary rounded-full overflow-hidden flex items-center justify-center">
            {user?.picture ? (
  <img
    src={user.picture}
    alt="userAvatar"
    className="w-full h-full object-cover rounded-full"
  />
) : (
  <img
    src="/avatar.jpg"  
    alt="defaultAvatar"
    className="w-full h-full object-cover rounded-full"
  />
)}
          </div>
          <h2 className="text-sm text-gray-600">
            {moment(interview?.created_at).format("DD MMM YYYY")}
          </h2>
        </div>
      </div>

      <h2 className="mt-4 font-semibold text-lg text-gray-800">
        {interview?.jobPosition}
      </h2>

      <div className="mt-2 flex justify-between items-center text-sm text-gray-700">
        <span>{interview?.duration}</span>
        <span>{interview["interview-feedback"]?.length} Candidates</span>
      </div>

      {!viewDeatil ? (
        <div className="flex flex-col gap-3 mt-4">
          <Button className="w-full py-5 text-base" onClick={copyLink}>
            <Copy className="mr-2 h-5 w-5" /> Copy Link
          </Button>
          <Button className="w-full py-5 text-base" onClick={onSend}>
            <Send className="mr-2 h-5 w-5" /> Send
          </Button>
        </div>
      ) : (
        <Link
          href={`/scheduled-interview/${interview?.interview_id}/details`}
          className="block mt-5"
        >
          <Button className="w-full py-5 text-base">
            <div className="flex items-center justify-center w-full">
              View Details <ArrowRight className="ml-2 h-5 w-5" />
            </div>
          </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;
