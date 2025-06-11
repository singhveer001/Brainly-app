import { useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/plusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {
  const [count, setCount] = useState(0)

  return <div >
      Brainly
      <Button variant='primary' text="Add Content" startIcon={<PlusIcon/>}></Button>
      <Button variant='secondary' text="Share brain" startIcon={<ShareIcon/>}></Button>
  </div>
}

export default App
