import React from 'react'

const SingleMatch = (props) => {
    return (
    <li>{props.winner} user beat {props.loser} user with a score of {props.winScore} - {props.loseScore} on {props.date}</li>
    )
}

export default SingleMatch
