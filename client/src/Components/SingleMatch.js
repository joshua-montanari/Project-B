import React from 'react'

const SingleMatch = (props) => {
    return (
    <li>{props.winner} user beat {props.loser} user with a score of {props.winScore} - {props.loseScore}</li>
    )
}

export default SingleMatch
