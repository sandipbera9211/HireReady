import React, { useRef, useState } from 'react'
import { toast } from 'sonner'

const Question = ({ question, no,answer ,onAnswerChange }) => {
  const [listening,setListening]=useState(false);
  const recognitionRef =useRef(null);

  const startMic=()=>{
    const speechRecognization=window.SpeechRecognition || window.webkitSpeechRecognition;

    if(!speechRecognization){
        toast.error("Speech recognization not support in this Browser.");
        return;
    }
    const recognization=new speechRecognization();

    recognitionRef.current=recognization;

    recognization.lang="en-US";
    recognization.continuous=true;
    recognization.interimResults=true;

    recognization.onstart=()=>{
      setListening(true);
    }

    recognization.onresult=(event)=>{
      let transcript="";

      for(let i=0;i< event.results.length;i++){
        transcript+=event.results[i][0].transcript;
      }
      onAnswerChange(transcript);
    }

   recognization.onerror = (event) => {
      toast.error("Speech Error....");
      console.log(event.error);
    };

  recognization.onend = () => {
      setListening(false);
    };

    recognization.start();
  }

   const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className='bg-white/5 border border-violet-400/20 rounded-2xl p-6 flex flex-col gap-4'>
      <p className='text-violet-300 text-xs uppercase tracking-widest'>Question {no}</p>
      <p className='text-white text-base leading-relaxed'>{question}</p>

      <textarea  value={answer} onChange={(e)=>onAnswerChange(e.target.value)}
        placeholder="Type your answer here..."
        rows={5}
        className='w-full bg-white/5 border border-violet-400/20 rounded-xl p-4 text-white text-sm placeholder-violet-300/30 resize-none focus:outline-none focus:border-violet-400/60 transition'
      />

        <button
        onClick={listening ? stopMic : startMic}
        className={`self-start flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition
          ${listening
            ? 'bg-red-900/20 border border-red-400/40 text-red-300 hover:bg-red-500/30'
            : 'bg-violet-500/20 border border-violet-400/40 text-violet-300 hover:bg-violet-500/30'
          }`}
      >
        {listening ? '⏹ Stop' : '🎤 Speak'}
      </button>

    </div>
  )
}

export default Question