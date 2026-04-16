import React from "react";

import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {

const navigate=useNavigate();
const stored = localStorage.getItem('user');
const user = stored && stored !== 'undefined' ? JSON.parse(stored) : null;
console.log(user);

  return (
    <div className="relative min-h-screen bg-[#0f0a1e] flex items-center justify-center px-4 py-10 overflow-hidden">
  {/* {Glow on both side} */}
      <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-violet-500 opacity-30 blur-[80px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full bg-purple-500 opacity-20 blur-[80px]" />

      <div className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-violet-500 opacity-30 blur-[80px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full bg-purple-500 opacity-20 blur-[80px]" />


      <div className="relative z-10 max-w-4xl w-full">
        <div className="relative bg-white/[0.04] border border-violet-400/20 rounded-[28px] backdrop-blur-2xl p-10 sm:p-14 text-center">

          {/* {Header} */}
          <div className="inline-flex items-center gap-2 bg-violet-600/25 border border-violet-400/30 rounded-full px-4 py-1.5 text-[11px] text-violet-300 tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            AI-Powered Platform
          </div>

{/* logo   */}
<div className="flex justify-center mb-4">
  <Logo size={64} showText={true} showTagline={true} />
</div>
          
          <h1 className="font-['Syne'] text-5xl sm:text-6xl font-extrabold tracking-tight text-violet-50 leading-[1.05] mb-3">
            Analyse<br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              YourSelf
            </span>
          </h1>

          <p className="text-violet-400 text-base leading-relaxed max-w-3xl mx-auto mb-8">
            Your AI-powered prep companion. Resume Analyzer,Practice, sharpen, and walk into any interview ready to own the room.
          </p>

         
          <div className="flex items-center gap-3 max-w-[260px] mx-auto mb-8">
            <div className="flex-1 h-px bg-violet-400/15" />
            <div className="w-1 h-1 rounded-full bg-violet-400/40" />
            <div className="flex-1 h-px bg-violet-400/15" />
          </div>

          
          <p className="text-violet-100 font-medium text-lg mb-1">
            Welcome back, <strong className="text-white">{user?.name || "Guest"}</strong> 👋
          </p>
          <p className="text-violet-500 text-sm mb-8">Ready to crush your next interview?</p>

         
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button onClick={()=>navigate('/analyze')} className="bg-gradient-to-br from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium px-8 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(124,58,237,0.45)] active:scale-95">
              Analyze Your Resume 
            </button>
            <button onClick={()=>navigate('/mock-interview')} className="bg-transparent border border-violet-400/30 text-violet-400 hover:bg-violet-600/10 hover:border-violet-400/55 font-medium px-7 py-3 rounded-full transition-all">
              Mock Interview
            </button>
          </div>

          
          <div className="flex justify-center gap-8 mt-10 pt-7 border-t border-violet-400/10">
            {[["12k+", "Questions"], ["94%", "Success rate"], ["3.2k", "Users"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-['Syne'] text-2xl font-bold text-violet-300">{num}</div>
                <div className="text-[11px] text-violet-600 mt-0.5 tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;