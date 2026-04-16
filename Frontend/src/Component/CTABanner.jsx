import { Link } from 'react-router-dom'

const stats = [
  { num: '10k+', label: 'Resumes analyzed' },
  { num: '95%',  label: 'Interview success rate' },
  { num: '500+', label: 'Companies hired from' },
]

const CTABanner = () => {
  return (
    <section className="px-6 pt-5 pb-10  bg-[#0f0a1e]">
      <div className="max-w-5xl mx-auto">
        <div className="relative  bg-[#0f0a1e] border border-violet-400/20 rounded-2xl px-8 py-14 text-center overflow-hidden">

          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-48 bg-violet-600/20 rounded-full blur-[60px] pointer-events-none" />

          <h2 className="relative text-3xl font-bold text-white mb-3">
            Ready to land your next role?
          </h2>
          <p className="relative text-[#9c8ec2] text-sm mb-8">
            Join thousands of job seekers already using AI to get hired faster.
          </p>

          <div className="relative flex items-center justify-center gap-3 flex-wrap">
            <Link to="/sign-up">
              <button className="bg-violet-700 hover:bg-violet-600 text-white px-7 py-3 rounded-xl text-sm font-semibold transition-colors">
                Get started for free
              </button>
            </Link>
            <Link to="/analyze">
              <button className="bg-white/5 hover:bg-white/10 border border-violet-400/30 text-violet-300 px-7 py-3 rounded-xl text-sm font-medium transition-colors">
                See how it works
              </button>
            </Link>
          </div>

          <div className="relative flex justify-center gap-10 flex-wrap mt-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-[1.4rem] font-bold text-violet-400">{s.num}</p>
                <p className="text-[#5a4e78] text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default CTABanner