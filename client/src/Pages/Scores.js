import React, { useEffect, useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Axios from 'axios'

import SingleMatch from '../Components/SingleMatch'

const Scores = () => {

    const [matchData, setMatchData] = useState([])

    const history = useHistory()
    const login = () => history.push('/login')
    const newMatch = () => history.push('/new-match')

    useEffect( () => {

        //gets users matches and displays them accordingly
        const getUserMatches = async () => {
            const userRes = await Axios.get('http://localhost:5000/match/')

            const match = userRes.data
             setMatchData(matchData => [...matchData, match])
        }
        getUserMatches()
    }, [])

    const userMatchData = matchData.map((match) => {   
        const singleMatchData = match.map((singleMatch) => {
            if (singleMatch.winnerID === localStorage.getItem('user-id') || singleMatch.loserID === localStorage.getItem('user-id')) {
                return <SingleMatch winnerIMG={singleMatch.winnerCharIMG} loserIMG={singleMatch.loserCharIMG} winner={singleMatch.winnerName} loser={singleMatch.loserName} winScore={singleMatch.winnerScore} loseScore={singleMatch.loserScore} date={singleMatch.date}/>
            }
            else{
                return
            }
        })
        return singleMatchData
    })

    return (
   
        <div>
            {localStorage.getItem('user-id') ? (
                <>
                    <div>
                        <h1>{localStorage.getItem('username')}'s BNW Matches</h1>
                        <button onClick={newMatch}>click here to submit a new match</button>
                        <ul>
                            {userMatchData}
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <h1>Please login to see your matches</h1>
                    <button onClick={login}>Click here to login</button>
                </>
            )}

        </div>
    )
}

export default Scores
