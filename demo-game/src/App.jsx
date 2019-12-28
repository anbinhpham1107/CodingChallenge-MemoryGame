import React, {useState, useEffect} from 'react';
import Board from './components/board'
import ReactDOM from 'react-dom';
import initializeDeck from './deck'


export default function App() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [disabled, setDisabled] = useState(false)
  let matchedCounter = 0

  useEffect(() => {
    setCards(initializeDeck())
  }, [])

  const handleClick = (id) => {
    setDisabled(true)
    if (flipped.length === 0){
      setFlipped([id])
      setDisabled(false)
    }
    else{
      if (sameCardClicked(id)) return
      setFlipped([flipped[0], id])
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id])
        resetCards()
        matchedCounter +=1
      }
      if (matchedCounter === 18 ){
        ReactDOM.render(renderGameOver, document.getElementById('root'));
      }
      else {
        setTimeout(resetCards, 1500)
      }
    }
  }
  
  const resetCards = () => {
    setFlipped([])
    setDisabled(false)
  }

  const sameCardClicked = (id) => flipped.includes(id)

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id)
    const flippedCard = cards.find((card) => flipped[0] === card.id)
    return flippedCard.type === clickedCard.type
  }

  const resetBoard = () => {
    resetCards()
    setSolved([])
    setCards(initializeDeck())
  }

  function refreshPage() {
    window.location.reload(false);
  }

  const renderGameOver = (
    <div align="center">
      <h1>Game Over! Press Restart to start a new game...</h1>
      <button onClick={refreshPage}>
       ↻ RESTART
      </button>
    </div>
  );

  return (
    <div >
      <div align="center">Memory Game</div>
      <div align="center">
      <button onClick={resetBoard}>
       ↻ RESTART
      </button>
      <div>Game In Progress...</div>
      </div>
      <Board
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
        />
    </div>
  );
}


