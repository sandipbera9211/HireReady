import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Question from './Question';
import { toast } from 'sonner';
const Interview = () => {
  const navigate=useNavigate();
  const { state } = useLocation()
  const { difficulty, questionTypes } = state || {}
console.log(difficulty,questionTypes);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]); 
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);
const[interviewId,setInterviewId]=useState(null);
  const handleNext = () => {
    if (index < questions.length - 1) {
        setIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (index > 0) {
        setIndex(prev => prev - 1)
    }
  }

 const answerChange = (value) => {
  setAnswers(prev => ({ ...prev, [index]: value }))
}
//get  all mock interview question
  const handlegetQuestion=async()=>{
  const token = localStorage.getItem('token')
       try {
        setLoading(true);
        const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mock-interview/questions`,{
          method:'POST',
          headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify({
        difficulty,
        questionTypes
      })
        })
        const data=await res.json();
           
    if (!res.ok) {
      toast.error(data.message);
      return;
    }
    toast.success("Best of  luck for  your interview")
         setQuestions(data.questions);
         setInterviewId(data.interview);
        
         setLoading(false);
         setStart(true);
       } catch (error) {
        toast.error(error.message || 'Something went wrong')
        setInterviewId(null);
        setStart(false);
       }finally{
        setIndex(0);
        
        setLoading(false);
        
       }
  }

  //give all answers to backend  and go to get feedback report
  const handleSubmit = async() => {
  try {
   const token = localStorage.getItem('token')
    const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mock-interview/feedback`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
         answers,
         interviewId
      })
    })
    const data=await res.json();
    
    if (!res.ok) {
  toast.error(data.message || 'Failed to submit answers');
  return;
}

navigate(`/interview/feedback/${data.id}`);
  } catch (error) {
    toast.error(error.message || 'Something went wrong')
  }
  }

  return (
    <div className="relative min-h-screen bg-[#0f0a1e] flex flex-col items-center px-4 py-12 overflow-hidden">
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-violet-600 opacity-25 blur-[80px] animate-pulse pointer-events-none" />
      <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-violet-600 opacity-20 blur-[80px] pointer-events-none" />

      {!start ? (
        <div className='text-white'>
          <button
            className='text-violet-400 bg-violet-100 text-md lg:text-xl px-3 py-1 rounded-2xl cursor-pointer hover:bg-violet-700 transition-all'
            onClick={handlegetQuestion}>
            Start Your Interview
          </button>
        </div>

      ) : loading ? (
        <p className='text-violet-400 text-md lg:text-xl'>Wait, Question is Loading...</p>

      ) : (
        <div className='bg-white/5 border border-violet-400/20 rounded-2xl p-6 flex flex-col gap-4 w-full max-w-xl'>
      
          <Question
            question={questions[index]}
            no={index + 1}
            answer={answers[index] || ""}
            onAnswerChange={answerChange}
          />

          <p className='text-violet-300/50 text-xs text-center'>
            {index + 1} of {questions.length}
          </p>

          <div className='flex justify-between'>
            {index > 0 && (
              <button
                onClick={handlePrevious}
                className='text-violet-400 bg-violet-100 text-md lg:text-xl px-3 py-2 rounded-2xl cursor-pointer hover:bg-violet-700 transition-all'>
                Previous
              </button>
            )}

            {index < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className='ml-auto text-violet-400 bg-violet-100 text-md lg:text-xl px-3 py-2 rounded-2xl cursor-pointer hover:bg-violet-700 transition-all'>
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className='ml-auto text-violet-400 bg-violet-100 text-md lg:text-xl px-3 py-2 rounded-2xl cursor-pointer hover:bg-violet-700 transition-all'>
                Submit
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  )
}

export default Interview