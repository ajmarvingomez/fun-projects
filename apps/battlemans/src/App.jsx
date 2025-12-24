import { useEffectEvent, useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false)
  function startGame() {
    console.log("Starting Game...")
    setIsGameStarted(true)
  }
  const gameIsStarted = useEffectEvent(gameState => addToGameLog("Game Started:", gameState))
  useEffect(() => {
      if( isGameStarted ) gameIsStarted(isGameStarted)
    }, [isGameStarted])


  const [gameLog, setGameLog] = useState([])

  function addToGameLog(entry) {
    setGameLog(prevLog => [...prevLog, entry])
  }


  return (
    <>
      <h1>BattleMans</h1>
      {
        !isGameStarted && <button onClick={() => startGame()}>Start Game</button>
      }
      {
        isGameStarted && <div className='game-container'>
          <div className='sidebar'>
            <h2>Sidebar</h2>
          </div>
          <div className='game-area'>
            <h2>Game Area</h2>
          </div>
          <div className='game-log'>
            <h2>Game Log</h2>
            {gameLog.map((logEntry, index) => (
              <div key={index}>{logEntry}</div>
            ))}
          </div>
        </div>
      }

    </>
  )
}

export default App
