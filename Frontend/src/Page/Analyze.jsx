import React, {useEffect, useState, useRef } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
const Analyze = () => {
 
  const navigate=useNavigate();
  const [jd, setJd] = useState('')
  const [fileName, setFileName] = useState(null)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)
const[loading,setLoading]=useState(false);
const [load,setLoad]=useState(false);
const [result,setResult]=useState(null);
  const handleFile = (file) => {
    if (file?.type === 'application/pdf') setFileName(file.name)
  }

  // handleSubmit--for submit the form to analyze resume
  const handleSubmit = async(e) => {
    e.preventDefault();
     if (!jd || !fileInputRef.current?.files[0]) {
    toast.warning("All fields required")
    return
  }

        setLoading(true);
   try {
   const token = localStorage.getItem('token')
    const formData=new FormData();
    formData.append("jobDescription",jd);
    formData.append("resume", fileInputRef.current.files[0])
   
    const res=await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/resume/analyze`,{
        method:'POST',
       body:formData,
        headers: {
        Authorization: `Bearer ${token}`,  
      },
    })
    const data=await res.json();
     if (!res.ok) {
      toast.error(data.message)
     if (res.status === 401) navigate('/sign-in')
      return
        
    }
       const formatted = {
      score: data.analysis.matchScore,
      missingKeywords: data.analysis.missingKeyWords,
      strengths: data.analysis.strengths,
      weaknesses: data.analysis.weaknesses,
      suggestions: data.analysis.suggestions
    }
   
    setResult(formatted)
    setLoading(false)
    toast.success("Resume Analyzed successfully.")
   } catch (error) {
     toast.error(error.message || "Something went wrong.")   
   }
   finally{
    setLoading(false)
   }
  }



 // handleDownload--for download the optimise latex analyze resume
const handleDownload = async (e) => {
  e.preventDefault();
  try {
    setLoad(true);
   const token = localStorage.getItem('token')

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/resume/analyze/download`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
     if (!res.ok) {
  toast.error("Download failed");
  return;
}
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'optimized_resume.tex'
    a.click()
    URL.revokeObjectURL(url)
    setLoad(false);
    toast.success("Latex Resume is downloading...")
  } catch (error) {
     toast.error(error.message || "Something went wrong.") 
  }finally{
    setLoad(false);
  }
}

  return (
    <div className="relative min-h-screen bg-[#0f0a1e] flex flex-col items-center justify-start px-4 py-12 overflow-hidden">

      {/* Glows */}
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-violet-600 opacity-25 blur-[80px] animate-pulse pointer-events-none" />
      <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-violet-600 opacity-20 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-16 -right-10 w-64 h-64 rounded-full bg-indigo-500 opacity-20 blur-[80px] pointer-events-none" />

      {/* Badge */}
      <div className="z-10 inline-flex items-center gap-2 bg-violet-600/20 border border-violet-400/30 rounded-full px-4 py-1.5 text-[11px] text-violet-300 tracking-widest uppercase mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        AI-Powered Resume Analyzer
      </div>

      {/* Heading */}
      <h1 className="z-10 text-white text-4xl font-semibold text-center leading-tight mb-3">
        Match your resume to <br />
        <span className="text-violet-400">any job description</span>
      </h1>
      <p className="z-10 text-[#8b7eb8] text-sm text-center mb-10">
        Get instant AI feedback on fit, gaps, and improvements
      </p>

      {/* Form Card */}
      <div className="z-10 w-full max-w-2xl bg-white/[0.04] border border-violet-400/20 rounded-2xl p-7 flex flex-col gap-5">

        {/* Job Description */}
        <div>
          <label className="block text-[13px] text-violet-300/80 font-medium mb-2">Job description</label>
          <textarea
            value={jd}
            onChange={e => setJd(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full bg-white/5 border border-violet-400/25 rounded-xl px-4 py-3 text-[#e2d9f3] text-sm placeholder-[#5e5080] resize-y min-h-[130px] outline-none focus:border-violet-400/60 transition-colors"
          />
        </div>

        <hr className="border-violet-400/15" />

        {/* PDF Upload */}
        <div>
          <label className="block text-[13px] text-violet-300/80 font-medium mb-2">Resume (PDF)</label>
          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
            className={`border-2 border-dashed rounded-xl p-7 text-center cursor-pointer transition-all
              ${dragging || fileName ? 'border-violet-400/70 bg-violet-600/10' : 'border-violet-400/30 bg-violet-600/5 hover:border-violet-400/60 hover:bg-violet-600/10'}`}
          >
            <div className="text-2xl mb-2">📄</div>
            <p className="text-[#9c8ec2] text-sm">
              Drop your PDF here or <span className="text-violet-400">browse files</span>
            </p>
            {fileName && <p className="text-violet-300 text-xs mt-2 font-medium">{fileName}</p>}
          </div>
          <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={e => handleFile(e.target.files[0])} />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}  disabled={loading}
          className={`w-full py-3.5 rounded-xl bg-violet-700  text-white font-semibold text-sm transition-colors cursor-pointer ${!loading ? 'hover:bg-violet-600':'bg-violet-400 cursor-not-allowed'}`}
        >
          {!loading? 'Analyze My Resume' :'Analyzing...'}
        </button>



{result && (
  <div className="z-10 w-full max-w-2xl mt-6 bg-white/[0.04] border border-violet-400/20 rounded-2xl p-7 flex flex-col gap-6">

    {/* Header */}
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
      <span className="text-violet-300 text-[13px] font-semibold tracking-widest uppercase">Your Analysis Results</span>
    </div>

    {/* ATS Score */}
    <div className="flex items-center gap-6 bg-white/5 border border-violet-400/15 rounded-xl p-5">
      <div className="relative w-20 h-20 shrink-0">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.9" fill="none" strokeWidth="3" strokeLinecap="round"
            stroke={result.score >= 75 ? '#4ade80' : result.score >= 50 ? '#fbbf24' : '#f87171'}
            strokeDasharray={`${result.score} ${100 - result.score}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${result.score >= 75 ? 'text-green-400' : result.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
            {result.score}
          </span>
        </div>
      </div>
      <div>
        <p className="text-white font-semibold text-lg">ATS Score</p>
        <p className="text-[#8b7eb8] text-sm mt-1">
          {result.score >= 75 ? 'Strong match — great fit for this role.' : result.score >= 50 ? 'Moderate match — some gaps to address.' : 'Low match — significant improvements needed.'}
        </p>
      </div>
    </div>

    {/* Strengths & Weaknesses */}
    <div className="grid grid-cols-2 gap-4">
      {[
        { title: '✅ Strengths',  items: result.strengths,  cls: 'bg-green-500/10 text-green-300 border-green-500/20' },
        { title: '⚠️ Weaknesses', items: result.weaknesses, cls: 'bg-red-500/10 text-red-300 border-red-500/20' },
      ].map(({ title, items, cls }) => (
        <div key={title} className="bg-white/5 border border-violet-400/15 rounded-xl p-4">
          <p className="text-[13px] font-semibold text-violet-300 mb-3">{title}</p>
          <div className="flex flex-col gap-2">
            {items?.map((item, i) => (
              <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${cls}`}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Missing Keywords */}
    <div>
      <p className="text-[13px] font-semibold text-violet-300 mb-3">Missing Keywords</p>
      <div className="flex flex-wrap gap-2">
        {result.missingKeywords?.map(k => (
          <span key={k} className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">{k}</span>
        ))}
      </div>
    </div>

    {/* Suggestions */}
    <div>
      <p className="text-[13px] font-semibold text-violet-300 mb-3">Suggestions</p>
      <ul className="flex flex-col">
        {result.suggestions?.map((s, i) => (
          <li key={i} className="flex gap-3 text-[#b8acd4] text-sm leading-relaxed py-2.5 border-b border-violet-400/10 last:border-none">
            <span className="text-violet-500 shrink-0">→</span>{s}
          </li>
        ))}
      </ul>
    </div>
 


{/* Action Buttons */}
<div className="z-10 w-full max-w-2xl mt-6 grid grid-cols-2 gap-4">

  <button onClick={handleDownload} className="flex items-center justify-center gap-2 bg-violet-700 hover:bg-violet-600 border border-violet-500/30 rounded-xl px-5 py-4 text-white text-sm font-semibold transition-colors group">
    <span className="text-base">↓</span>
    {!load?'Download LaTeX Resume':'Waiting...'}
  </button>

  <a
    href="https://www.youtube.com/watch?v=3ybM5sOzdFU"
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-violet-400/20 rounded-xl px-5 py-4 text-violet-300 text-sm font-semibold transition-colors"
  >
    <span className="text-base">▶</span>
    How to use Latex (Tutorial)
  </a>

</div>
   

   <div className="z-10 w-full max-w-2xl mt-4 text-center" onClick={()=>navigate('/prepare')}>
    <div className='text-violet-400 cursor-pointer text-decoration: underline hover:text-violet-800' >Want Preparation Plan?</div>

   </div>
  </div>
)}
      </div>
    </div>
  )
}

export default Analyze