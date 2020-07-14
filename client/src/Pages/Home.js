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
                const match = userRes.data
                 setMatchData(matchData => [...matchData, match])
            }
    
            getUserMatchs()
        
    }, [])

        const userMatchData = matchData.map((match) => {
        
            const singleMatchData = match.map((singleMatch) => {
                return <SingleMatch winner={singleMatch.winnerName} loser={singleMatch.loserName} winScore={singleMatch.winnerScore} loseScore={singleMatch.loserScore} date={singleMatch.date}/>
            })
            return singleMatchData
        })

    return (
        <div>
                <>
                    <div>
                        <h1>All BNW Matches</h1>
                        <ul>
                            {userMatchData}
                        </ul>
                    </div>
                </>
        </div>
    )
}

export default Home
