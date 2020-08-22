import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Axios from 'axios'

const MatchStats = (props) => {

    const [selectedMatch, setSelectedMatch] = useState({})
    let {slug} = useParams()

    useEffect ( ()=> {

        //gets all match data based on the url parameter
        const getMatch = async () => {
            const matchRes = await Axios.get(`http://localhost:5000/match/${slug}`)
            const match = matchRes.data
            setSelectedMatch(match)
        }
        getMatch()

    }, [])

    const getWins = async() => {
        console.log(selectedMatch.winnerName)   
    }
    getWins()
    
    return (
        <div>
            This is the match stats page for match {slug} this is the winner {selectedMatch.winnerName}
        </div>
    )
}

export default MatchStats
