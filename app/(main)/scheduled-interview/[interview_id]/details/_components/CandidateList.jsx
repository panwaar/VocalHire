import { Button } from "@/components/ui/button";
import moment from "moment";
import React from "react";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

function CandidateList({ candidateList }) {
  return (
    <div>
      <h2 className="font-bold my-5">Candidates ({candidateList?.length})</h2>
      {candidateList?.map((candidate, index) => (
        <div
          key={index}
          className="p-5 flex gap-3 items-center justify-between bg-[#FFFFFF] rounded-lg"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-5 w-full p-4 bg-white rounded-md shadow-sm">
            {/* Left: Avatar + Info */}
            <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
              <h2 className="bg-primary p-3 px-4 font-bold text-[beige] rounded-full text-center text-lg">
                {candidate.userName[0]}
              </h2>
              <div>
                <h2 className="font-bold text-base">{candidate?.userName}</h2>
                <h2 className="text-sm text-gray-500">
                  Completed On:{" "}
                  {moment(candidate?.created_at).format("MMM DD, yyyy")}
                </h2>
              </div>
            </div>

            {/* Right: Score + Button */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center font-semibold w-full sm:w-auto">
              <h2 className="text-green-600 text-base">7.5/10</h2>
              <CandidateFeedbackDialog candidate={candidate}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CandidateList;
