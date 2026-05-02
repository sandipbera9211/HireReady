import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'



const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
const stored = localStorage.getItem('user');
const user = stored && stored !== 'undefined' ? JSON.parse(stored) : null;



  const dropdownRef = React.useRef(null)


// handlelogout--for log out from the site {also have to use Kafka for token blacklisting next--pending!!!}
 const handleSignOut = async () => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    })
  } catch (err) {
    console.log(err)
  }

  localStorage.removeItem('user')
  localStorage.removeItem('token')

  navigate('/')
}

  const navLink = (to, label) => {
    const active = pathname === to
    return (
      <Link
        to={to}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
          ${active
            ? 'bg-violet-600/30 text-violet-200 border border-violet-500/40'
            : 'text-violet-400 hover:text-violet-200 hover:bg-white/5'
          }`}
      >
        {label}
      </Link>
    )
  }

  const mobileLinks = [
    { to: '/', label: 'Dashboard' },
    { to: '/analyze', label: 'Analyze' },
    { to: '/prepare', label: 'Preparation Plan' },
    { to: '/mock-interview', label: 'Mock interview' },
  ]

  return (
    <nav className='sticky top-0 z-50 border-b border-violet-500/15 bg-[#000000]/80 backdrop-blur-xl shadow-[0_1px_0_rgba(167,139,250,0.08)] px-6 py-3'>
      <div className='max-w-6xl mx-auto flex items-center justify-between'>

        {/* Logo */}
        <Link to='/' className='flex items-center'>
          <Logo size={36} showText={true} />
        </Link>

        {/* Desktop nav links */}
        <div className='hidden md:flex items-center gap-1'>
          {navLink('/', 'Dashboard')}
          {navLink('/analyze', 'Analyze')}
          {navLink('/prepare', 'Preparation Plan')}
          {navLink('/mock-interview', 'Mock interview')}
        </div>

        {/* Desktop auth */}
        <div className='hidden md:flex items-center gap-3'>
          {!user ? (
            <>
              <Link to='/sign-in'>
                <button className='border border-violet-500/30 text-violet-300 hover:bg-white/5 hover:border-violet-400/50 px-4 py-2 rounded-xl text-sm transition-all duration-200'>
                  Log in
                </button>
              </Link>
              <Link to='/sign-up'>
                <button className='bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-[0_0_16px_rgba(124,58,237,0.35)]'>
                  Get started
                </button>
              </Link>
            </>
          ) : (
            <div className='flex items-center gap-3'>
              <Link to={'/upgrade'}>
              <span className='text-xs bg-violet-500/15 text-violet-300 border border-violet-500/25 px-3 py-1 rounded-full font-medium hover:bg-violet-700 cursor-pointer'>
                Upgrade
              </span>
              </Link>

              {/* User dropdown */}
              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className='flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-violet-500/20 hover:border-violet-500/35 text-violet-300 px-3 py-2 rounded-xl text-sm transition-all duration-200'
                >
                  <div className='w-6 h-6 rounded-full bg-violet-600/40 border border-violet-500/40 flex items-center justify-center text-xs font-semibold text-violet-200'>
                    {user.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <span className='max-w-[100px] truncate'>{user.name}</span>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                    <path d="M6 9l6 6 6-6" strokeLinecap="round"/>
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className='absolute right-0 top-full mt-2 w-48 bg-[#0d0d0d] border border-violet-500/20 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden'>
                    <div className='px-4 py-3 border-b border-violet-500/15'>
                      <p className='text-xs text-violet-300 font-medium truncate'>{user.name}</p>
                      <p className='text-xs text-violet-500/70 truncate mt-0.5'>{user.email}</p>
                    </div>
                    <button
                      onClick={() => { navigate('/history'); setDropdownOpen(false) }}
                      className='w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-violet-400 hover:text-violet-200 hover:bg-white/5 transition-all duration-150 text-left'
                    >
                      <span>📋</span> History
                    </button>
                    <div className='border-t border-violet-500/15'>
                      <button
                        onClick={handleSignOut}
                        className='w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-300 hover:bg-red-500/5 transition-all duration-150 text-left'
                      >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className='md:hidden text-violet-400 hover:text-violet-200 transition-colors'
          onClick={() => setOpen(!open)}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open
              ? <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round"/>
              : <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round"/>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className='md:hidden mt-3 flex flex-col gap-1 border-t border-violet-500/15 pt-3'>
          {mobileLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`text-sm px-4 py-2.5 rounded-xl transition-all duration-200
                ${pathname === to
                  ? 'bg-violet-600/25 text-violet-200 border border-violet-500/35'
                  : 'text-violet-400 hover:bg-white/5 hover:text-violet-200'
                }`}
            >
              {label}
            </Link>
          ))}

          <div className='mt-2 pt-3 border-t border-violet-500/15 flex flex-col gap-2'>
            {!user ? (
              <>
                <Link to='/sign-in' onClick={() => setOpen(false)}>
                  <button className='w-full text-sm border border-violet-500/30 text-violet-300 hover:bg-white/5 px-4 py-2.5 rounded-xl transition-all duration-200'>
                    Log in
                  </button>
                </Link>
                <Link to='/sign-up' onClick={() => setOpen(false)}>
                  <button className='w-full text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200'>
                    Get started
                  </button>
                </Link>
              </>
            ) : (
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-3 px-3 py-2'>
                  <div className='w-7 h-7 rounded-full bg-violet-600/40 border border-violet-500/40 flex items-center justify-center text-xs font-semibold text-violet-200'>
                    {user.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <p className='text-sm text-violet-300 font-medium'>{user.name}</p>
                    <p className='text-xs text-violet-500/70'>{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { navigate('/history'); setOpen(false) }}
                  className='flex items-center gap-2 px-4 py-2.5 text-sm text-violet-400 hover:text-violet-200 hover:bg-white/5 rounded-xl transition-all duration-150'
                >
                  <span>📋</span> History
                </button>
                <button
                  onClick={() => { handleSignOut(); setOpen(false) }}
                  className='flex items-center gap-2 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-300 hover:bg-red-500/5 rounded-xl transition-all duration-150'
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar