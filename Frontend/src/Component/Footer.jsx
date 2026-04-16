
import { Link } from 'react-router-dom'
import Logo from './Logo'
const Footer = () => {
  return (
    <footer className="border-t border-violet-500/15 bg-[#0f0a1e] px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

     
<div className="md:col-span-1">
  <Logo />
  <p className="text-[13px] text-[#7c6ea0] leading-relaxed max-w-[200px] mt-3">
    AI-powered tools to help you land your next role.
  </p>
</div>  

       
          <div>
            <p className="text-[11px] uppercase tracking-widest text-violet-400 font-medium mb-4">Product</p>
            <ul className="flex flex-col gap-2.5">
              {[['/', 'Dashboard'], ['/analyze', 'Analyze Resume'], ['/prepare', 'Preparation Plan'], ['/mock-interview', 'Mock Interview']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-[13px] text-[#7c6ea0] hover:text-violet-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

         
          <div>
            <p className="text-[11px] uppercase tracking-widest text-violet-400 font-medium mb-4">Account</p>
            <ul className="flex flex-col gap-2.5">
              {[['/sign-in', 'Sign in'], ['/sign-up', 'Get started']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-[13px] text-[#7c6ea0] hover:text-violet-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

         
          <div>
            <p className="text-[11px] uppercase tracking-widest text-violet-400 font-medium mb-4">Company</p>
            <ul className="flex flex-col gap-2.5">
              {[['#', 'About'], ['#', 'Privacy policy'], ['#', 'Terms of service'], ['#', 'Contact']].map(([to, label]) => (
                <li key={label}><Link to={to} className="text-[13px] text-[#7c6ea0] hover:text-violet-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

      
        <div className="border-t border-violet-500/10 pt-6 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[12px] text-[#5a4e78]">© 2025 ResumeAI. All rights reserved.</span>
          <div className="flex gap-2.5">
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer