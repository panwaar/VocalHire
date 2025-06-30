'use client'
import React from "react";
import { Home, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const InterviewComplete = () => {
  const router = useRouter();
  return (
    <div
      className="bg-midnight text-primary font-sans antialiased flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/interview-bg.jpg')" }}
    >
      <main className="flex-grow flex flex-col items-center justify-center py-10 px-6 text-center">
        {/* Checkmark Icon */}
        <div className="rounded-full bg-green-500 p-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Headings */}
        <h1 className="text-4xl font-bold text-white">Interview Complete!</h1>
        <p className="text-lg text-[#fff] max-w-xl">
          Thank you for participating in the AI-driven interview with Alcruiter.
        </p>

        {/* Main Illustration */}
        <div className="w-full pt-5 pb-5 max-w-4xl rounded-xl overflow-hidden shadow-lg">
          <img
            src="/interview-end.jpg"
            alt="Interview Completed"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* What's Next Section */}
        <div className="bg-white rounded-xl p-8 shadow-md w-full max-w-xl space-y-4">
          <div className="flex  items-center justify-center rounded-full bg-gray-100 w-12 h-12 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">What's Next?</h2>

          <p className="text-gray-600">
            The recruiter will review your interview responses and contact you soon regarding the next steps.
          </p>

          <p className="text-gray-500 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Expect a response within 2-3 business days.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-6">
           
            <button 
            onClick={() => router.push('/dashboard')}
            className="bg-gray-100  cursor-pointer text-gray-800 hover:bg-gray-200 rounded-lg py-3 px-6 flex items-center space-x-2 transition duration-300 ease-in-out">
              <Home className="h-5 w-5" />
              <span>Return to Dashboard</span>
            </button> 

          <Link href="https://rahulpanwar.netlify.app" passHref>
            <button className="bg-blue-600  cursor-pointer hover:bg-blue-700 text-white rounded-lg py-3 px-6 flex items-center space-x-2 transition duration-300 ease-in-out">
              <span>Visit My Portfolio</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-4">
        <p>&copy; 2025 Alcruiter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InterviewComplete;
