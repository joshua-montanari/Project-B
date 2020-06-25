import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Axios from 'axios'

import SingleMatch from '../Components/SingleMatch'

const Home = () => {

    const [matchData, setMatchData] = useState([])

    const {userData} = useContext(UserContext)

    const history = useHistory()

    const login = () => history.push('/login')

    useEffect( () => {

                const getUserMatchs = async () => {
                const userRes = await Axios.get('http://localhost:5000/match/')
                console.log('userRes.data'+JSON.stringify(userRes.data))
    
                const match = userRes.data
                 setMatchData(matchData => [...matchData, match])
            }
    
            getUserMatchs()
        
    }, [])

 

        const userMatchData = matchData.map((match) => {   
        
            const singleMatchData = match.map((singleMatch) => {
                console.log(singleMatch.matchScore)
                return <SingleMatch winner={singleMatch.winnerID} loser={singleMatch.loserID} score={singleMatch.matchScore}/>
            })

            return singleMatchData
        })
    

    return (
        <div>
            {userData.user ? (
                <>
                    <div>
                        <h1>All BNW Matchs</h1>
                        <ul>
                            {userMatchData}
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <h1>please log in to see matches</h1>
                    <button onClick={login}>Click here to login</button>
                </>
            )}
            
        </div>
    )
}

export default Home
