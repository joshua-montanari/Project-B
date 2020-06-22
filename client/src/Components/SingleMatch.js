import React from 'react'

const SingleMatch = (props) => {
    return (
    <li>{props.winner} user beat {props.loser} user with a score of {props.score}</li>
    )
}

export default SingleMatch
