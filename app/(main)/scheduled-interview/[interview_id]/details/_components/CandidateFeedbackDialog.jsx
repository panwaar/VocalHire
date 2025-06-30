import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-[beige] w-full sm:w-auto cursor-pointer">
            View Report
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                    <h2 className="bg-primary p-3 px-4 font-bold text-[beige] rounded-full text-center text-lg">
                      {candidate.userName[0]}
                    </h2>
                    <div>
                      <h2 className="font-bold text-base">
                        {candidate?.userName}
                      </h2>
                      <h2 className="text-sm text-gray-500">
                        {candidate?.userEmail}
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-start  sm:items-center font-semibold w-full sm:w-auto">
                    <h2 className="text-primary text-2xl font-bold ">
                      7.5/10
                    </h2>
                  </div>
                </div>

                <div className="mt-5">
                  <h2 className="font-bold">Skills Assessment</h2>
                  <div className="mt-3 grid grid-cols-2 gap-10">
                    <div>
                      <h2 className="flex justify-between gap-4">
                        Technical Skills{" "}
                        <span>{feedback?.rating?.technicalSkills}/10</span>
                      </h2>
                      <Progress
                        value={feedback?.rating?.technicalSkills * 10}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <h2 className="flex justify-between gap-4">
                        Communication{" "}
                        <span>{feedback?.rating?.communication}/10</span>
                      </h2>
                      <Progress
                        value={feedback?.rating?.communication * 10}
                        className="mt-1 "
                      />
                    </div>
                    <div>
                      <h2 className="flex justify-between gap-4">
                        Problem Solving{" "}
                        <span>{feedback?.rating?.problemSolving}/10</span>
                      </h2>
                      <Progress
                        value={feedback?.rating?.problemSolving * 10}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <h2 className="flex justify-between gap-4">
                        Experience{" "}
                        <span>{feedback?.rating?.experience}/10</span>
                      </h2>
                      <Progress
                        value={feedback?.rating?.experience * 10}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <h2 className="font-semibold">Performance Summary</h2>
                  <div className="p-5 bg-[#FFF] rounded-lg text-primary mt-3">
                    <p>{feedback?.summary}</p>
                  </div>
                </div>

                <div className={`p-5 mt-3 rounded-md ${feedback?.Recommendation === 'No' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                <h2 className="pb-2 font-semibold">Recommendation Msg:</h2>
                <p>{feedback?.RecommendationMsg}</p>
                </div>

              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CandidateFeedbackDialog;
