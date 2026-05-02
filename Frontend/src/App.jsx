import React from 'react'
import Navbar from './Component/Navbar'
import Home from './Page/Home'
import {Routes, Route } from 'react-router-dom'
import Analyze from './Page/Analyze'
import History from './Page/History'
import PreparationPlan from './Page/PreparationPlan'
import MockInterview from './Page/MockInterview'
import Interview from './Component/Interview'
import Feedback from './Component/Feedback'
import SignIn from './Component/Signin'
import SignUp from './Component/SignUp'
import Footer from './Component/Footer'
import Upgrade from './Component/Upgrade'

const App = () => {
  return (
    <div className=''>
      <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/analyze' element={<Analyze/>}/>
      <Route path='/history' element={<History/>}/>
      <Route path='/prepare' element={<PreparationPlan/>}/>
      <Route path='/mock-interview' element={<MockInterview/>}/>
      <Route path='/interview' element={<Interview/>}/>
      <Route path='/interview/feedback/:id' element={<Feedback/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/upgrade' element={<Upgrade/>}/>
     </Routes>
     <Footer/>
    </div>
  )
}

export default App
