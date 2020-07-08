import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Axios from 'axios'

import SingleMatch from '../Components/SingleMatch'

const Scores = () => {

    const [matchData, setMatchData] = useState([])

    const {userData, setUserData} = useContext(UserContext)

    const {allUsers} = useContext(UserContext)

    useEffect( () => {

        //gets users matches and displays them accordingly
        const getUserMatches = async () => {
            const userRes = await Axios.get('http://localhost:5000/match/')
            console.log('userRes.data'+JSON.stringify(userRes.data))

            const match = userRes.data
             setMatchData(matchData => [...matchData, match])
        }

        getUserMatches()

    }, [])

    const userMatchData = matchData.map((match) => {   
    
        //TODO: Error that causees userdata.user.id to be undefined after refresh
        const singleMatchData = match.map((singleMatch) => {
            //console.log(singleMatch.matchScore)
            if (singleMatch.winnerID === userData.user.id || singleMatch.loserID === userData.user.id) {
                return <SingleMatch winner={singleMatch.winnerName} loser={singleMatch.loserName} score={singleMatch.matchScore}/>
            }
            else{
                return
            }
        })

        return singleMatchData
    })

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
