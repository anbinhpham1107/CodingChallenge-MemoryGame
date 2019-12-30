import React from 'react'
import PropTypes from "prop-types"
import './styles.css'
/**************************************************
* Author: Binh An Pham
* Version: 12/29/2019
* Description: holds layouts and attributes of card
* components
***************************************************/
export default function Card({ disabled, solved, handleClick, id, flipped, type, height, width}){
    return <div
        className={`flip-container ${flipped ? 'flipped' : ''}`}
        style={{
            width,
            height
        }}
        onClick={() => disabled ? null : handleClick(id)}
        >
            <div className="flipper">
                <img 
                    style={{
                        height,
                        width
                    }}
                    className={flipped ? 'front' : 'back'}
                    src={flipped || solved ? `${type}.svg` : `react.svg`}
                    alt = {`${type}`}
                />
            </div>
        </div>
}

Card.propTypes = {
    disabled: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    flipped: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
}
