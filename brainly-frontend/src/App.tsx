import './App.css'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SharePage } from './pages/SharePage'
import { PopupProvider } from './hooks/popupContext'

function App() {

  return (
  <PopupProvider>
    <BrowserRouter> 
        <Routes>
          <Route path='/signup' element={ <Signup/>}></Route>
          <Route path='/signin' element={ <Signin/>}></Route>
          <Route path='/dashboard' element={ <Dashboard/>}></Route>
          <Route path='/' element={ <Home/>}></Route>
          <Route path='/share/:shareLink' element={<SharePage/>}> </Route>
        </Routes>
    </BrowserRouter>
  </PopupProvider>
  )
 
  // <Dashboard />

}

export default App
