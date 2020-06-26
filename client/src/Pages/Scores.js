import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Axios from 'axios'

import SingleMatch from '../Components/SingleMatch'

const Scores = () => {

    const [matchData, setMatchData] = useState([])

    const {userData} = useContext(UserContext)

    const {allUsers} = useContext(UserContext)

    useEffect( () => {

        const getUserMatchs = async () => {
            const userRes = await Axios.get('http://localhost:5000/match/')
            console.log('userRes.data'+JSON.stringify(userRes.data))

            const match = userRes.data
             setMatchData(matchData => [...matchData, match])
        }

        getUserMatchs()

    }, [])

    console.log(matchData)

    

    const userMatchData = matchData.map((match) => {   
    
        const singleMatchData = match.map((singleMatch) => {
            //console.log(singleMatch.matchScore)
            if (singleMatch.winnerID == userData.user.id || singleMatch.loserID == userData.user.id) {
                return <SingleMatch winner={singleMatch.winnerID} loser={singleMatch.loserID} score={singleMatch.matchScore}/>
            }
            else{
                return
            }
        })
        //console.log('match'+ JSON.stringify(match))
        //return  <SingleMatch winner={match.winnerID} loser={match.loserID} score={match.score}/>
        return singleMatchData
    })

    //console.log('usermatchdata' + JSON.stringify(userMatchData))
    
    return (
        <>
            <div>
                <h1>{userData.user.username} recent matches</h1>
                <ul>
                    {userMatchData}
                </ul>
            </div>
        </>
    )
}

export default Scores
