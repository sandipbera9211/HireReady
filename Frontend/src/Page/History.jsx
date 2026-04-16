import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
const History = () => {
  
  const [historyData, setHistoryData] = useState([])  // ← [] not null

   // handleHistory--for get  all analyze resume History
  const handleHistory = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/resume/analyze/history`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setHistoryData(data.data) 
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => { handleHistory() }, [])

  return (
    <div className="relative min-h-screen bg-[#0f0a1e] flex flex-col items-center px-4 py-12 overflow-hidden">
      {/* Glow on both side */}
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-violet-600 opacity-25 blur-[80px] animate-pulse pointer-events-none" />
      <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-violet-600 opacity-20 blur-[80px] pointer-events-none" />

        {/* Analyze History header */}
      <div className="z-10 inline-flex items-center gap-2 bg-violet-600/20 border border-violet-400/30 rounded-full px-4 py-1.5 text-[11px] text-violet-300 tracking-widest uppercase mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        Analysis History
      </div>

      <h1 className="z-10 text-white text-2xl lg:text-4xl font-semibold text-center mb-10">
        Your past <span className="text-violet-400">analyses</span>
      </h1>
  
  {/* History All Data */}
      <div className="z-10 w-full max-w-2xl flex flex-col gap-4">
        {historyData.length === 0 ? (
          <div className="text-center text-[#8b7eb8] py-16">No history found for this account.</div>
        ) : (
          historyData.map((item, i) => (
            <details key={i} className="bg-white/[0.04] border border-violet-400/20 rounded-2xl p-5 cursor-pointer">
              <summary className="flex justify-between items-center text-white font-medium list-none">
                <span>Analysis #<span className='font-bold text-violet-400'>{i + 1}</span></span>
                <span className={`text-sm font-semibold ${item.matchScore >= 75 ? 'text-green-400' : item.matchScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                  Score: {item.matchScore}
                </span>
              </summary>
              <div className="mt-4 flex flex-col gap-2 text-sm text-[#b8acd4]">
                <p><span className="text-violet-300 font-medium">Job:</span> {item.jobDescription?.slice(0, 120)}...</p>
                <p><span className="text-violet-300 font-medium">Missing:</span> {item.missingKeyWords?.join(', ')}</p>
                <p><span className="text-violet-300 font-medium">Strengths:</span> {item.strengths?.join(', ')}</p>
                <p><span className="text-violet-300 font-medium">Weaknesses:</span> {item.weaknesses?.join(', ')}</p>
                <p><span className="text-violet-300 font-medium">Suggestions:</span> {item.suggestions?.join(', ')}</p>
              </div>
            </details>
          ))
        )}
      </div>
    </div>
  )
}

export default History