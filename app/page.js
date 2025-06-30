'use client';
import { useRouter } from 'next/navigation';
import { CalendarClock, Bot, ArrowRight, Video, Sparkles} from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-beige text-[#222] px-6 py-20 overflow-hidden font-sans" style={{ backgroundColor: 'beige' }}>
      
      {/* Embedded CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slide-in {
          opacity: 0;
          transform: translateY(20px);
          animation: slideIn 0.8s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>

      {/* Floating icons */}
      <Sparkles className="absolute top-10 left-10 w-10 h-10 text-[#317256] opacity-20  " /> 

      {/* Hero Section */}
      <section className={`max-w-5xl mx-auto text-center transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="logo" width={80} height={80} className="w-[15rem] h-[13rem]" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-2 animate-fade-in">
          Schedule Interviews. <br />Let AI Handle the Rest.
        </h1>

        <p className="text-lg text-[#444] mb-8 max-w-2xl mx-auto">
          VocalHire automatically schedules, reschedules, and manages candidate interviews so you can focus on hiring, not logistics.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
          onClick={()=> router.push('/auth')} 
          className="bg-[#317256] hover:bg-[#275e47] transition-all duration-300 px-6 py-3 rounded-full font-semibold text-white flex items-center justify-center gap-2 shadow-lg hover:scale-105 cursor-pointer">
            <Bot className="w-5 h-5" /> 
            Get Started
          </button> 
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-15 max-w-4xl mx-auto text-[#333]">
        <h2 className="text-2xl font-semibold mb-6 text-[#222]">Why VocalHire?</h2>
        <ul className="space-y-4 text-left">
          <li className="flex items-start gap-3 animate-slide-in">
            <ArrowRight className="text-[#317256] mt-1" />
            AI-powered scheduling that adapts to availability in real time.
          </li>
          <li className="flex items-start gap-3 animate-slide-in delay-200">
            <ArrowRight className="text-[#317256] mt-1" />
            Automatically schedule interviews based on candidate and interviewer availability.
          </li>
          <li className="flex items-start gap-3 animate-slide-in delay-400">
            <ArrowRight className="text-[#317256] mt-1" />
            Centralize candidate feedback to streamline hiring decisions
          </li>
        </ul>
      </section>
    </main>
  );
}




