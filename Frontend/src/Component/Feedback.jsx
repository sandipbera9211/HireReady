import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
const Feedback = () => {

  const [report, setReport] = useState(null);
  const { id } = useParams();

 // handleReportData--give feedback data to user after interview
  useEffect(() => {
    const getReport = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/mock-interview/feedback-report/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setReport(data.report);
        toast.success("Feedback report generated successfully.")
      } catch (error) {
        toast.error(error);
      }
    };
    getReport();
  }, [id]);

  //scorecolor-depends on score
  const getScoreColor = (score) =>
    score >= 75 ? 'text-green-400' : score >= 50 ? 'text-amber-400' : 'text-red-400';

  const getScoreStroke = (score) =>
    score >= 75 ? '#4ade80' : score >= 50 ? '#f59e0b' : '#f87171';

  const getScoreMsg = (score) =>
    score >= 75
      ? 'Strong match — great fit for this role.'
      : score >= 50
      ? 'Moderate match — some gaps to address.'
      : 'Low match — significant improvements needed.';

  return (
    <div className="relative min-h-screen bg-[#0f0a1e] flex flex-col items-center px-4 py-12 overflow-hidden">
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-violet-600 opacity-25 blur-[80px] animate-pulse pointer-events-none" />
      <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-violet-600 opacity-20 blur-[80px] pointer-events-none" />

      <div className="z-10 w-full max-w-2xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-400/30 rounded-full px-4 py-1.5 text-[11px] text-violet-300 tracking-widest uppercase mb-6">
          AI Powered Interview Feedback
        </div>

        {!report ? (
          <div className="text-violet-400 mt-10">Loading...</div>
        ) : (
          <div className="flex flex-col gap-4">

            {/* Score Card */}
            <div className="flex items-center gap-5 bg-white/5 border border-violet-400/15 rounded-xl p-5">
              <svg width="72" height="72" viewBox="0 0 36 36" className="-rotate-90 shrink-0">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none" strokeWidth="3" strokeLinecap="round"
                  stroke={getScoreStroke(report.totalScore)}
                  strokeDasharray={`${report.totalScore} ${100 - report.totalScore}`}
                />
              </svg>
              <div>
                <p className="text-xs text-violet-400 uppercase tracking-widest mb-1">Overall Score</p>
                <p className={`text-3xl font-semibold ${getScoreColor(report.totalScore)}`}>
                  {report.totalScore}<span className="text-base text-white/30 font-normal"> / 100</span>
                </p>
                <p className="text-sm text-white/50 mt-1">{getScoreMsg(report.totalScore)}</p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white/5 border border-violet-400/15 rounded-xl p-5">
              <p className="text-xs text-violet-400 uppercase tracking-widest mb-2">Summary</p>
              <p className="text-sm text-white/60 leading-relaxed">{report.summary}</p>
            </div>

            {/* Question Breakdown */}
            <p className="text-xs text-violet-400 uppercase tracking-widest mt-2">Question Breakdown</p>

            {report.feedback.map((item, i) => (
              <div key={item._id} className="bg-white/5 border border-violet-400/15 rounded-xl p-5 flex flex-col gap-3">

                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30 uppercase tracking-widest">Q{i + 1}</span>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full border ${
                    item.score >= 75
                      ? 'bg-green-400/10 border-green-400/20 text-green-400'
                      : item.score >= 50
                      ? 'bg-amber-400/10 border-amber-400/20 text-amber-400'
                      : 'bg-red-400/10 border-red-400/20 text-red-400'
                  }`}>
                    {item.score} / 100
                  </span>
                </div>

                {/* Question */}
                <p className="text-sm font-medium text-white/90">{item.question}</p>

                {/* Answer */}
                <p className="text-sm text-white/40 italic border-l-2 border-violet-400/20 pl-3">
                  "{item.answer}"
                </p>

                {/* Strength */}
                {item.strength && item.strength !== 'None' && (
                  <div>
                    <p className="text-[11px] text-green-400 uppercase tracking-widest mb-1">Strength</p>
                    <p className="text-sm text-white/60 leading-relaxed">{item.strength}</p>
                  </div>
                )}

                {/* Improvement */}
                <div>
                  <p className="text-[11px] text-amber-400 uppercase tracking-widest mb-1">How to Improve</p>
                  <p className="text-sm text-white/60 leading-relaxed">{item.improvement}</p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;