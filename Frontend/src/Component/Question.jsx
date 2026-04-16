import React from 'react'

const Question = ({ question, no,answer ,onAnswerChange }) => {
  return (
    <div className='bg-white/5 border border-violet-400/20 rounded-2xl p-6 flex flex-col gap-4'>
      <p className='text-violet-300 text-xs uppercase tracking-widest'>Question {no}</p>
      <p className='text-white text-base leading-relaxed'>{question}</p>
      <textarea  value={answer} onChange={(e)=>onAnswerChange(e.target.value)}
        placeholder="Type your answer here..."
        rows={5}
        className='w-full bg-white/5 border border-violet-400/20 rounded-xl p-4 text-white text-sm placeholder-violet-300/30 resize-none focus:outline-none focus:border-violet-400/60 transition'
      />
    </div>
  )
}

export default Question