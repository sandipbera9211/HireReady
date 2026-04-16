import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';


import { toast } from 'sonner';

const PreparationPlan = () => {
const navigate=useNavigate();
  const [jd, setJd] = useState('')
  const [fileName, setFileName] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [gapAreas, setGapAreas] = useState('')
  const [totalDays, setTotalDays] = useState(7)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const [preparationPlan, setPreparationPlan] = useState([])
 

  const handleFile = (file) => {
    if (file && file.type === 'application/pdf') setFileName(file.name)
  }

  //handleSubmit--to get preparation plan 
  const handleSubmit = async (e) => {
    e.preventDefault();
     const token = localStorage.getItem('token')
    try {
      setLoading(true);
      if(!jd || !fileName || !gapAreas){
      toast.warning("All Fields are required.")
      return;
    }
    const file=fileInputRef.current.files[0];
    const formData=new FormData();
    formData.append("jobDescription",jd);
    formData.append("totalDays",totalDays);
    formData.append("gapAreas",gapAreas);
    formData.append("file",file);
    const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/prepare/day-wise-preparation`,{
      method:"POST",
        headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    })
     const data=await res.json();

     if(!res.ok){
      toast.error(data.message);
        if (res.status === 401) navigate('/sign-in')
      return
     }
     setPreparationPlan(data.preparationPlan);
     setLoading(false);
     toast.success("Preparation Plan generated successfully.")
  } catch (error) {
       toast.error(error.message || "Something went wrong.")
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0f0a1e] flex flex-col items-center px-4 py-12 overflow-hidden">
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-violet-600 opacity-25 blur-[80px] animate-pulse pointer-events-none" />
      <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-violet-600 opacity-20 blur-[80px] pointer-events-none" />

      {/* Badge */}
      <div className="z-10 inline-flex items-center gap-2 bg-violet-600/20 border border-violet-400/30 rounded-full px-4 py-1.5 text-[11px] text-violet-300 tracking-widest uppercase mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        AI Powered Preparation Plan
      </div>

      <h1 className="z-10 text-3xl font-bold text-white text-center">
        Your Personalized <span className="text-violet-400">Preparation Plan</span>
      </h1>
      <p className="z-10 text-violet-300/70 text-sm mt-3 text-center max-w-sm">
        Get a customized roadmap to ace your next interview, tailored to your strengths and weaknesses.
      </p>

      {/* Form Card */}
      <div className="z-10 mt-10 w-full max-w-xl bg-white/5 border border-violet-400/20 rounded-2xl p-6 flex flex-col gap-5">

        {/* Job Description */}
        <div>
          <label className="block text-[12px] text-violet-300/80 uppercase tracking-widest mb-2">Job Description</label>
          <textarea
            value={jd}
            onChange={e => setJd(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full bg-white/5 border border-violet-400/25 rounded-xl px-4 py-3 text-[#e2d9f3] text-sm placeholder-[#5e5080] resize-y min-h-[120px] outline-none focus:border-violet-400/60 transition-colors"
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-[12px] text-violet-300/80 uppercase tracking-widest mb-2">Resume (PDF)</label>
          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              dragging || fileName ? 'border-violet-400/70 bg-violet-600/10' : 'border-violet-400/30 hover:border-violet-400/60 hover:bg-violet-600/10'
            }`}
          >
            <p className="text-2xl mb-1">📄</p>
            <p className="text-[#9c8ec2] text-sm">
              {fileName
                ? <span className="text-violet-300 font-medium">{fileName}</span>
                : <>Drop your PDF here or <span className="text-violet-400">browse files</span></>
              }
            </p>
          </div>
          <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={e => handleFile(e.target.files[0])} />
        </div>

        {/* Gap Areas */}
        <div>
          <label className="block text-[12px] text-violet-300/80 uppercase tracking-widest mb-2">Gap Areas</label>
          <textarea
            value={gapAreas}
            onChange={e => setGapAreas(e.target.value)}
            placeholder="e.g. System Design, DSA, Behavioral questions..."
            className="w-full bg-white/5 border border-violet-400/25 rounded-xl px-4 py-3 text-[#e2d9f3] text-sm placeholder-[#5e5080] resize-y min-h-[80px] outline-none focus:border-violet-400/60 transition-colors"
          />
        </div>

        {/* Total Days */}
        <div>
          <label className="block text-[12px] text-violet-300/80 uppercase tracking-widest mb-2">
            Preparation Days — <span className="text-violet-400">{totalDays} days</span>
          </label>
          <input
            type="range" min={3} max={30} value={totalDays}
            onChange={e => setTotalDays(Number(e.target.value))}
            className="w-full accent-violet-500"
          />
          <div className="flex justify-between text-[11px] text-violet-300/50 mt-1">
            <span>3 days</span><span>30 days</span>
          </div>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold text-sm transition-colors ${
            loading ? 'bg-violet-400 cursor-not-allowed' : 'bg-violet-700 hover:bg-violet-600 cursor-pointer'
          }`}
        >
          {loading ? 'Generating Plan...' : 'Generate My Plan →'}
        </button>
       
 {/* Preparation Plan */}

{preparationPlan && (
  <div className="z-10 mt-10 w-full max-w-xl mb-10">
    <h2 className="text-xl font-bold text-white text-center mb-6">
      Your <span className="text-violet-400">{totalDays}-Day</span> Preparation Plan
    </h2>

    <div className="flex flex-col gap-4">
      {preparationPlan.map((day, index) => (
        <div key={index} className="bg-white/5 border border-violet-400/20 rounded-2xl p-5 flex flex-col gap-3">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/40 flex items-center justify-center text-violet-300 font-bold text-sm">
              {day.day}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{day.topic}</p>
              <p className="text-violet-300/60 text-xs">{day.focus}</p>
            </div>
          </div>

          {/* Tasks */}
          <div>
            <p className="text-[11px] text-violet-300/50 uppercase tracking-widest mb-2">Tasks</p>
            <ul className="flex flex-col gap-1.5">
              {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-violet-200/80">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-[11px] text-violet-300/50 uppercase tracking-widest mb-2">Resources</p>
            <div className="flex flex-wrap gap-2">
              {day.resources.map((r, i) => (
                <span key={i} className="text-xs bg-violet-600/20 border border-violet-400/20 text-violet-300 px-3 py-1 rounded-full">
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* Practice Question */}
          <div className="bg-violet-600/10 border border-violet-400/20 rounded-xl px-4 py-3">
            <p className="text-[11px] text-violet-300/50 uppercase tracking-widest mb-1">Practice Question</p>
            <p className="text-sm text-violet-200/90 italic">"{day.practiceQuestion}"</p>
          </div>

        </div>
      ))}
    </div>
  </div>
)}
      </div>
    </div>
  )
}

export default PreparationPlan