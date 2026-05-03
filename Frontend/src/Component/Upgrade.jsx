import React from 'react'
import { useNavigate } from 'react-router-dom'

const Upgrade = () => {

  const plans = [
    {
      name: "Free",
      price: "₹0",
      time: "/month",
      para: "Get started with basic mock interviews — no credit card needed.",
      features: [
        { text: "3 interviews per month", included: true },
        { text: "Basic AI feedback", included: true },
        { text: "2 question categories", included: true },
        { text: "Resume-based questions", included: false },
        { text: "Interview history", included: false },
        { text: "Downloadable report", included: false },
        { text: "Priority support", included: false },
      ],
      buttontext: "Get Started",
      buttonLink: "/"
    },
    {
      name: "Pro",
      price: "₹499",
      time: "/month",
      para: "Everything you need to ace your next interview with full AI power.",
      features: [
        { text: "Unlimited interviews", included: true },
        { text: "Full AI feedback", included: true },
        { text: "All categories", included: true },
        { text: "Resume-based questions", included: true },
        { text: "Interview history", included: true },
        { text: "Downloadable report", included: true },
        { text: "Priority support", included: false },
      ],
      buttontext: "Get Started",
      buttonLink: "/"
    },
    {
      name: "Pro Annual",
      price: "₹4999",
      time: "/year",
      para: "Best value — get 2 months free compared to monthly billing.",
      features: [
        { text: "Unlimited interviews", included: true },
        { text: "Full AI feedback", included: true },
        { text: "All categories", included: true },
        { text: "Resume-based questions", included: true },
        { text: "Interview history", included: true },
        { text: "Downloadable report", included: true },
        { text: "Priority support", included: true },
      ],
      buttontext: "Get Started",
      buttonLink: "/"
    },
  ]

  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen bg-[#0f0a1e] flex flex-col items-center px-4 py-12 overflow-hidden">
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-violet-600 opacity-25 blur-[80px] animate-pulse pointer-events-none" />
      <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-violet-600 opacity-20 blur-[80px] pointer-events-none" />

      <div className="z-10 inline-flex items-center gap-2 bg-violet-600/20 border border-violet-400/30 rounded-full px-4 py-1.5 text-[11px] text-violet-300 tracking-widest uppercase mb-6">
        <span className="w-1.5 h-1.5 bg-violet-400 animate-spin" />
        Plan Details
      </div>

      <div className='z-10 w-full max-w-6xl grid gap-6 lg:grid-cols-3'>
        {plans.map((plan, i) => (
          <div key={i} className={`flex flex-col justify-between h-full rounded-xl p-4 text-white ${i === 1 ? 'bg-violet-500/30 border-2 border-violet-400' : 'bg-violet-200/20'}`}>

            <div>
              {i === 1 && (
                <div className='inline-block bg-violet-400 text-[#0f0a1e] text-xs font-semibold px-3 py-0.5 rounded-full mb-2'>
                  Recommended
                </div>
              )}
              <div className='text-2xl font-semibold'>{plan.name}</div>
              <div className='font-medium text-xl'>
                <span className='text-2xl font-bold text-violet-400'>{plan.price}</span>{plan.time}
              </div>
              <p className='mt-2 mb-2 text-violet-200/70 text-sm'>{plan.para}</p>
              <div className='bg-violet-500 h-0.5 mb-3'></div>

              <ul className='list-none space-y-2'>
                {plan.features.map((feature, k) => (
                  <li key={k} className='flex gap-2'>
                    <span className={`w-4 h-4 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 mt-0.5 ${feature.included ? 'bg-violet-400 text-white' : 'bg-violet-100 text-violet-400'}`}>
                      {feature.included ? '✓' : '—'}
                    </span>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex justify-center mt-6'>
              <button
                className='bg-violet-500 text-white px-6 py-2 rounded-xl text-lg cursor-pointer hover:bg-violet-600 transition'
                onClick={() => navigate(plan.buttonLink)}
              >
                {plan.buttontext} ↗
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Upgrade