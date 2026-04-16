import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'sonner'
const MockInterview = () => {
  const navigate=useNavigate();

  const [view, setView] = useState(null)
  const [level, setLevel] = useState("")
  const [type, setType] = useState("")
  const[loading,setLoading]=useState(false);
  const levels = ["Easy", "Medium", "Hard"]
  const types = ['Technical', 'Behavioral', 'Role-Based', 'HR', 'System-Design', 'Coding', 'Situational']

  const toggle = (v) => { setView(prev => prev === v ? null : v); setLevel(""); setType("") }


  //handleInterview-- book 1-1 interview call 
const handleRealInterview = async () => {
  try {
    setLoading(true);
   const token = localStorage.getItem('token')

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/interview/book-Online-Interview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        difficulty: level.toLowerCase(),
        questionTypes: type.toLowerCase(),
      }),
    })

    const data = await res.json()
    console.log("status:", res.status)  
    console.log("data:", data)          

    if (res.ok) {
      navigate('/')
      toast.success("Check your email  for next steps")
    } else {
      if (res.status === 401) navigate('/sign-in')
      toast.error(data.message)  
    }
   setLoading(false);
  } catch (error) {
    toast.error(error.message)
  }finally{
    setLoading(false);
  }
}

  return (
    <div className="relative min-h-screen bg-[#0f0a1e] flex flex-col items-center px-4 py-12 overflow-hidden">
      {/* Glows on both side */}
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-violet-600 opacity-25 blur-[80px] animate-pulse pointer-events-none" />
      <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-violet-600 opacity-20 blur-[80px] pointer-events-none" />
 
 {/* Header  */}
      <div className="z-10 inline-flex items-center gap-2 bg-violet-600/20 border border-violet-400/30 rounded-full px-4 py-1.5 text-[11px] text-violet-300 tracking-widest uppercase mb-10">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        Mock-Interview
      </div>
        {/* Header para data */}
      <h1 className="z-10 text-3xl font-bold text-white text-center">Ace Your Next Interview</h1>
      <p className="z-10 text-violet-300/70 text-sm mt-3 text-center max-w-sm">
        Practice with AI or book a real 1:1 session with an expert.
      </p>

      {/* Two Cards */}
      <div className="z-10 mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">

        {/* Mock Interview Card */}
        <div className="bg-white/5 border border-violet-400/20 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/30 flex items-center justify-center text-lg">🤖</div>
            <div>
              <p className="text-white font-semibold text-sm">Mock Interview</p>
              <p className="text-violet-300/60 text-xs">AI Powered · Instant</p>
            </div>
          </div>
          <p className="text-violet-300/70 text-xs leading-relaxed">
            Practice with our AI interviewer. Get instant feedback, scores, and improvement tips.
          </p>
          <button
            onClick={() => toggle('mock')}
            className={`mt-auto w-full py-2.5 rounded-xl text-sm font-medium transition ${
              view === 'mock'
                ? 'bg-violet-400 text-white'
                : 'bg-violet-600 text-white hover:bg-violet-500'
            }`}
          >
            {view === 'mock' ? 'Close ✕' : 'Start Now →'}
          </button>

          {view === 'mock' && (
            <div className="flex flex-col gap-4 pt-2 border-t border-violet-400/20">
              <div>
                <p className="text-violet-300 text-[11px] uppercase tracking-widest mb-2">Difficulty</p>
                <div className="flex gap-2">
                  {levels.map(l => (
                    <button key={l} onClick={() => setLevel(l)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        level === l ? 'bg-violet-600 border-violet-500 text-white' : 'border-violet-400/30 text-violet-300 hover:border-violet-400'
                      }`}>{l}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-violet-300 text-[11px] uppercase tracking-widest mb-2">Question Type</p>
                <div className="flex flex-wrap gap-2">
                  {types.map(t => (
                    <button key={t} onClick={() => setType(t)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        type === t ? 'bg-violet-600 border-violet-500 text-white' : 'border-violet-400/30 text-violet-300 hover:border-violet-400'
                      }`}>{t}</button>
                  ))}
                </div>
              </div>
              <button disabled={!level || !type} onClick={()=>navigate('/interview', {state: {difficulty: level, questionTypes: type}})} 
                className="w-full py-2.5 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed transition">
                Begin Interview →
              </button>
            </div>
          )}
        </div>

        {/* Book 1--1 Card */}
        <div className="bg-white/5 border border-emerald-400/20 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 flex items-center justify-center text-lg">🎯</div>
            <div>
              <p className="text-white font-semibold text-sm">Book 1:1 Interview</p>
              <p className="text-emerald-300/60 text-xs">With Expert · Google Meet</p>
            </div>
          </div>
          <p className="text-emerald-300/70 text-xs leading-relaxed">
            Schedule a real interview with an expert. Get personalized feedback and a detailed report.
          </p>
          <button
            onClick={() => toggle('book')}
            className={`mt-auto w-full py-2.5 rounded-xl text-sm font-medium transition ${
              view === 'book'
                ? 'bg-emerald-400 text-white'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
            {view === 'book' ? 'Close ✕' : 'Book Now →'}
          </button>

          {view === 'book' && (
            <div className="flex flex-col gap-4 pt-2 border-t border-emerald-400/20">
              <div>
                <p className="text-emerald-300 text-[11px] uppercase tracking-widest mb-2">Difficulty</p>
                <div className="flex gap-2">
                  {levels.map(l => (
                    <button key={l} onClick={() => setLevel(l)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        level === l ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-emerald-400/30 text-emerald-300 hover:border-emerald-400'
                      }`}>{l}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-emerald-300 text-[11px] uppercase tracking-widest mb-2">Question Type</p>
                <div className="flex flex-wrap gap-2">
                  {types.map(t => (
                    <button key={t} onClick={() => setType(t)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        type === t ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-emerald-400/30 text-emerald-300 hover:border-emerald-400'
                      }`}>{t}</button>
                  ))}
                </div>
              </div>
              <button disabled={!level || !type} onClick={handleRealInterview}
                className="w-full py-2.5 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition">
              {loading? "Booking..." : "Confirm Booking →"}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default MockInterview