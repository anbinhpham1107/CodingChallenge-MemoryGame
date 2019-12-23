import React, {useState, useEffect} from 'react';
import Board from './components/board'

import initializeDeck from './deck'


export default function App() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [disabled, setDisabled] = useState(false)
 
  useEffect(() => {
    setCards(initializeDeck())
  }, [])

  useEffect(() => {
    preLoadImages()
  }, cards)

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
        setSolved([... solved, flipped[0], id])
        resetCards()
      }
      else {
        setTimeout(resetCards, 1500)
      }
    }
  }
  // Caching Images for better performance
  const preLoadImages = () => {
    cards.map(card => {
      const src =  `${card.type}.svg`
      console.log(src)
      new Image().src = src
    }) 
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

  return (
    <div>
      <h1>Memory Game</h1>
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


