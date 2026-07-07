import { useState } from 'react'
import './App.css'
import GuessTheNumberGame from './components/GuessTheNumberGame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GuessTheNumberGame />
    </>
  )
}

export default App
