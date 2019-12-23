import React from 'react'
import PropTypes from 'prop-types'
import Card from '../card'
import './styles.css'

export default function Board({solved,disabled, cards, flipped, handleClick}){
    return <div className="board">
        {cards.map((card) => (
            <Card
                key = {card.id}
                id = {card.id}
                type={card.type}
                width = {125} 
                height = {125}
                flipped = {flipped.includes(card.id)}
                handleClick = {handleClick}
                solved = {solved.includes(card.id)}
                disabled = {disabled || solved.includes(card.id)}
            />       
        ))}
    </div>
}

Board.propTypes = {
    disabled: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleClick: PropTypes.func.isRequired,
}