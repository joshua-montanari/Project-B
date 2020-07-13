import React, { useEffect, useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Axios from 'axios'

import SingleMatch from '../Components/SingleMatch'

const Scores = () => {

    const [matchData, setMatchData] = useState([])

    const {userData, setUserData} = useContext(UserContext)

    const {allUsers} = useContext(UserContext)

    const history = useHistory()
    const login = () => history.push('/login')
    const newMatch = () => history.push('/new-match')

    useEffect( () => {

        //gets users matches and displays them accordingly
        const getUserMatches = async () => {
            const userRes = await Axios.get('http://localhost:5000/match/')
            //console.log('userRes.data'+JSON.stringify(userRes.data))

            const match = userRes.data
             setMatchData(matchData => [...matchData, match])
        }

        getUserMatches()

    }, [])

    const userMatchData = matchData.map((match) => {   
    
        //TODO: Error that causees userdata.user.id to be undefined after refresh
        const singleMatchData = match.map((singleMatch) => {
            //console.log(singleMatch.matchScore)
            if (singleMatch.winnerID === localStorage.getItem('user-id') || singleMatch.loserID === localStorage.getItem('user-id')) {
                return <SingleMatch winner={singleMatch.winnerName} loser={singleMatch.loserName} winScore={singleMatch.winnerScore} loseScore={singleMatch.loserScore}/>
            }
            else{
                return
            }
        })

        return singleMatchData
    })

    return (
        // <>
        //     <div>
        //         <h1>{userData.user.username} recent matches</h1>
        //         <ul>
        //             {userMatchData}
        //         </ul>
        //     </div>
        // </>

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
                    <h1>no matches present</h1>
                    {/* <button onClick={login}>Click here to login</button> */}
                </>
            )}

        </div>
    )
}

export default Scores
