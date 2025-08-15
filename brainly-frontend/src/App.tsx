import './App.css'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return <BrowserRouter> 
      <Routes>
        <Route path='/signup' element={ <Signup/>}></Route>
        <Route path='/signin' element={ <Signin/>}></Route>
        <Route path='/dashboard' element={ <Dashboard/>}></Route>
        <Route path='/' element={ <Home/>}></Route>
      </Routes>
  </BrowserRouter>
  return <Signup/>
  // <Dashboard />

}

export default App
