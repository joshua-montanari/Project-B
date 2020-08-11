import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as ReactBootStrap from 'react-bootstrap'



const SingleMatch = (props) => {
    const slug = props.matchID
    const history = useHistory()

    // function sendToMatchPage(){
    //     //<Link to={`/match/${slug}`} />
    // }

    const matchStatsPage = () => history.push(`/match/${slug}`)
    return (
    <>
    <ReactBootStrap.Container onClick={matchStatsPage}>
        <ReactBootStrap.Row>
            <ReactBootStrap.Col className='text-center'><div className='match-date'><h6>{props.date}</h6></div></ReactBootStrap.Col>
        </ReactBootStrap.Row>
        <ReactBootStrap.Row className='single-match'>
            <ReactBootStrap.Col className='match-winner'>
                    <img className='winner-img' src={props.winnerIMG} alt='Winner Character'></img>
                    <h3 className='winner-name'>{props.winner}</h3>
                    <h1 className='winner-score'>{props.winScore}</h1>
            </ReactBootStrap.Col>
            <ReactBootStrap.Col className='match-loser'>
                    <img className='loser-img' src={props.loserIMG} alt='Loser Character'></img>
                    <h3 className='loser-name'>{props.loser}</h3>
                    <h1 className='loser-score'>{props.loseScore}</h1>
            </ReactBootStrap.Col>
        </ReactBootStrap.Row>
    </ReactBootStrap.Container>

    <div className="gap"></div>
        
        {/* <li>{props.winner} user beat {props.loser} user with a score of {props.winScore} - {props.loseScore} on {props.date}</li> */}
    </>
    )
}

export default SingleMatch
