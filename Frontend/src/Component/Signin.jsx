import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { toast } from 'sonner'

//2 eye icon 1 for open and another for close eye
const EyeIcon = ({ open }) => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    {open ? (
      <>
        <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
)

export default function SignIn() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  //handleSubmit--use for sign in to site 
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    
    setLoading(true)
    try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-in`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: form.email,
    password: form.password
  })
})
   const data = await res.json();

if (!res.ok) {
  throw new Error(data.message || 'Login failed');
}

localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(data.user));
toast.success('Welcome back!');
navigate('/');
    } catch {
      toast.error('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4 relative overflow-hidden">
 
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] rounded-full bg-violet-700/10 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[20%] w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
      </div>

   
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />

      <div className="relative z-10 w-full max-w-md">
      
        <div className="bg-white/[0.03] border border-violet-500/15 rounded-2xl p-8 shadow-[0_0_60px_rgba(124,58,237,0.08)] backdrop-blur-sm">

         
          <div className="mb-8 text-center">
             <Logo/>
            
            <h1 className="text-xl font-semibold text-white tracking-tight">Welcome back</h1>
            <p className="text-sm text-violet-400/70 mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
          
            <div>
              <label className="block text-xs font-medium text-violet-300/70 mb-1.5 tracking-wide uppercase">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full bg-white/[0.04] border border-violet-500/20 text-violet-100 placeholder-violet-500/40 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all duration-200"
              />
            </div>

           
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-violet-300/70 tracking-wide uppercase">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-violet-500/20 text-violet-100 placeholder-violet-500/40 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all duration-200 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-500/60 hover:text-violet-400 transition-colors"
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>

         
            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

           
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl text-sm transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_28px_rgba(124,58,237,0.45)] mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Signing in…
                </span>
              ) : 'Sign in'}
            </button>
          </form>

         
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-violet-500/15" />
            <span className="text-xs text-violet-500/50">or</span>
            <div className="flex-1 h-px bg-violet-500/15" />
          </div>

          <p className="text-center text-sm text-violet-400/70">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}