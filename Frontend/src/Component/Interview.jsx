import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Question from './Question';
import { toast } from 'sonner';

const Interview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { difficulty, questionTypes } = state || {};

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [interviewId, setInterviewId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startTimer = () => {
    const endTime = Date.now() + 10 * 60 * 1000; // fixed: milliseconds
    localStorage.setItem('InterviewEnd', endTime);
    localStorage.setItem('InterviewId', interviewId);
  };

  const clearTimer = () => {
    clearInterval(timerRef.current);
    localStorage.removeItem('InterviewEnd');
    localStorage.removeItem('InterviewQuestions');
    localStorage.removeItem('InterviewId');
  };

  // Restore on refresh
  useEffect(() => {
    const savedEndTime = localStorage.getItem('InterviewEnd');
    const savedQuestions = localStorage.getItem('InterviewQuestions');
    const savedInterviewId = localStorage.getItem('InterviewId');

    if (!savedEndTime || !savedQuestions) return;

    const remaining = Math.floor((savedEndTime - Date.now()) / 1000);
    if (remaining <= 0) {
      clearTimer();
      return;
    }

    setQuestions(JSON.parse(savedQuestions));
    setInterviewId(savedInterviewId);
    setTimeLeft(remaining);
    setStart(true);
  }, []);

  // Start countdown when interview starts
  useEffect(() => {
    if (!start) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          localStorage.removeItem('InterviewEnd');
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // cleanup on unmount
  }, [start]);

  const handleNext = () => {
    if (index < questions.length - 1) setIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (index > 0) setIndex(prev => prev - 1);
  };

  const answerChange = (value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handlegetQuestion = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mock-interview/questions`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ difficulty, questionTypes })
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Best of luck for your interview!");
      setQuestions(data.questions);
      setInterviewId(data.interview);
      setStart(true);
      setIndex(0);

      // Save to localStorage for refresh survival
      localStorage.setItem('InterviewQuestions', JSON.stringify(data.questions));
      localStorage.setItem('InterviewId', data.interview);
      const endTime = Date.now() + 10 * 60 * 1000;
      localStorage.setItem('InterviewEnd', endTime);

    } catch (error) {
      toast.error(error.message || 'Something went wrong');
      setInterviewId(null);
      setStart(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    clearTimer();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mock-interview/feedback`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ answers, interviewId })
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Failed to submit answers');
        return;
      }

      navigate(`/interview/feedback/${data.id}`);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f0a1e] flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute top-0 -left-16 w-80 h-80 rounded-full bg-violet-600 opacity-25 blur-[80px] animate-pulse pointer-events-none" />
      <div className="absolute top-0 -right-16 w-80 h-80 rounded-full bg-violet-600 opacity-20 blur-[80px] pointer-events-none" />

      {!start ? (
        <div className='flex flex-col items-center gap-6 text-center'>
          <h1 className='text-white text-2xl lg:text-4xl font-bold'>Ready to Begin?</h1>
          <p className='text-violet-300/70 text-sm lg:text-base max-w-sm'>
            Your interview is set up. Click below when you're ready.
          </p>
          <button
            onClick={handlegetQuestion}
            disabled={loading}
            className='group px-10 py-4 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-lg font-semibold rounded-2xl cursor-pointer transition-all duration-300 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 active:scale-95'>
            {loading ? (
              <span className='flex items-center gap-2'>
                <svg className='animate-spin w-5 h-5' viewBox='0 0 24 24' fill='none'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='white' strokeWidth='4' />
                  <path className='opacity-75' fill='white' d='M4 12a8 8 0 018-8v8z' />
                </svg>
                Loading...
              </span>
            ) : (
              <span className='flex items-center gap-2'>
                Start Your Interview
                <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M13 7l5 5m0 0l-5 5m5-5H6' />
                </svg>
              </span>
            )}
          </button>
        </div>

      ) : loading ? (
        <p className='text-violet-400 text-md lg:text-xl'>Wait, Questions are Loading...</p>

      ) : (
        <div className='bg-white/5 border border-violet-400/20 rounded-2xl p-6 flex flex-col gap-4 w-full max-w-xl'>

          {/* Timer */}
          <div className='flex justify-between items-center'>
            <p className='text-violet-300/50 text-xs'>{index + 1} of {questions.length}</p>
            <span className={`font-mono font-bold text-lg ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-violet-300'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <Question
            question={questions[index]}
            no={index + 1}
            answer={answers[index] || ""}
            onAnswerChange={answerChange}
          />

          <div className='flex justify-between'>
            {index > 0 && (
              <button
                onClick={handlePrevious}
                className='text-white bg-violet-600/40 hover:bg-violet-600 text-md px-5 py-2 rounded-2xl cursor-pointer transition-all'>
                Previous
              </button>
            )}
            {index < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className='ml-auto text-white bg-violet-600/40 hover:bg-violet-600 text-md px-5 py-2 rounded-2xl cursor-pointer transition-all'>
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className='ml-auto text-white bg-violet-600 hover:bg-violet-700 text-md px-5 py-2 rounded-2xl cursor-pointer transition-all'>
                Submit
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default Interview;