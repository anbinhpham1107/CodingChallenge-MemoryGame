import React, {useState, useEffect} from 'react';
import Board from './components/board'
import ReactDOM from 'react-dom';
import initializeDeck from './deck'
/******************************************************************************
* Author: Binh An Pham
*
* Version: 12/29/2019
*
* Description: App.jsx holds the high level designs and logics for the game
*
* Game(App) Layout and Design: The game will have a board of 36 (6X6 grid) cards. 
*      Each card will have a distinct id, the back faces up and the hidden front 
*      faces down. The rules of the game are below:
*         1.The cards should be laid out in a grid
*         2.Click to turn over any two cards.
*         3.If the two cards match, keep them in a revealed state.
*         4.If they don't match, turn them back over.
*         5.The game is over when all the cards have been matched
*******************************************************************************/
// Initialize a counter to count the number matched pairs
let matchedCounter = 0
export default function App() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [disabled, setDisabled] = useState(false)

  // Initialize the deck with randomized positions of cards
  useEffect(() => {
    setCards(initializeDeck())
  }, [])
  
/**********************************************************
* Function: handleClick
* Arguments: id
* Return: none
* Description: handles the clicking events, get called every
* time a card is clicked
***********************************************************/

  const handleClick = (id) => {
    setDisabled(true)
    // Handle the first flipped card of the deck 
    if (flipped.length === 0){
      setFlipped([id])
      setDisabled(false)
    }
    // Handle the second flipped card 
    else{
    // Handle the same flipped card being clicked again
      if (sameCardClicked(id)){ 
        setFlipped([id])
        setDisabled(false)
      }
    // If the second flipped card is a different card 
      setFlipped([flipped[0], id])
    // Check for match. If true set the two matched cards to be solved.
      if (isMatch(id) && !sameCardClicked(id)) {
        setSolved([...solved, flipped[0], id])
        resetCards()
        //Increment the counter for matched pairs 
        matchedCounter += 1
        console.log(matchedCounter)
      }
      // Game Over if there are 18 pairs matched
      if (matchedCounter === 18 ){
        // Render the Game Over screen
        ReactDOM.render(renderGameOver, document.getElementById('root'));
      }
      // If two flipped cards are not matched reset the cards
      else {
        setTimeout(resetCards, 1500)
      }
    }
  }
/**********************************************************
* Function: resetCards
* Arguments: none
* Return: none
* Description: resets the cards, unflips every flipped cards
***********************************************************/
  const resetCards = () => {
    setFlipped([])
    setDisabled(false)
  }
  
/**********************************************************
* Function: sameCardClicked
* Arguments: id
* Return: boolean
* Description: checks if the same card id has been flipped
***********************************************************/
  const sameCardClicked = (id) => flipped.includes(id)

/**********************************************************
* Function: isMatch
* Arguments: id
* Return: boolean
* Description: checks if two flipped cards are the same
***********************************************************/
  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id)
    const flippedCard = cards.find((card) => flipped[0] === card.id)
    return flippedCard.type === clickedCard.type
  }

/**********************************************************
* Function: resetBoard
* Arguments: none
* Return: none
* Description: resets all game states, reinitializes the deck, 
* randomizes the positions of the cards
***********************************************************/
  const resetBoard = () => {
    resetCards()
    setSolved([])
    setCards(initializeDeck())
  }

/**************************************************************
* Function: refreshPage
* Arguments: none
* Return: none
* Description: refreshes the game over page to start a new game
***************************************************************/
  function refreshPage() {
    window.location.reload(false);
  }

/**********************************************************
* jsx scripts for the layout of the Game Over screen
***********************************************************/
  const renderGameOver = (
    <div align="center">
      <h1>Game Over! Press Restart to start a new game...</h1>
      <button onClick={refreshPage}>
       ↻ RESTART
      </button>
    </div>
  );

/**********************************************************
* return the layout for the Game(App)
***********************************************************/
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


