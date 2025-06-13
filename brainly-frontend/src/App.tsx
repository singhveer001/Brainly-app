import './App.css'
import { Dashboard } from './pages/dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return <BrowserRouter> 
      <Routes>
        <Route path='/signup' element={ <Signup/>}></Route>
        <Route path='/signin' element={ <Signin/>}></Route>
        <Route path='/dashboard' element={ <Dashboard/>}></Route>
      </Routes>
  </BrowserRouter>
  return <Signup/>
  // <Dashboard />

}

export default App
