
import './App.css'

function App() {
  function startGame() {
    console.log("Starting Game...")
  }

  return (
    <>
      <h1>BattleMans</h1>
      <button onClick={() => startGame()}>Start Game</button>
      <div>

      </div>
    </>
  )
}

export default App
