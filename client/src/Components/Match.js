import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Axios from 'axios'

const Match = () => {

    const [matchData, setMatchData] = useState([])

    const {userData} = useContext(UserContext)

    const history = useHistory()

    useEffect( () => {
        const getUserMatchs = async () => {
            const userRes = await Axios.get('http://localhost:5000/match/')
            console.log(userRes.data)
            setMatchData(userRes.data)
        }
            getUserMatchs()
            console.log('1st match data' + matchData)

        // const userMatchData = matchData.map((match) => {
        //     console.log('loggedin user id'+userData._id)
        //     console.log('winnerid'+match.winnerID)
        //     console.log('loserid'+match.loserID)
        //     console.log('match'+match)
        //     return
        //     // if (userData._id === match.winnerID || userData._id === match.loserID){
        //     //     console.log(match)
        //     //     return match
                
        //     // }
        // })

        // setMatchData(userMatchData)
        // console.log(matchData)

    }, [])

    return (
        <div>
            Recent matches
        </div>
    )
}

export default Match
