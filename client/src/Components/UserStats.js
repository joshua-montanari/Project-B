import React, { useEffect, useState} from 'react'
import Axios from 'axios'

//TODO: Big Problems here, does not work: too many re-renders ie: renders 4 times (1 per component on the scores page?)

const UserStats = (props) => {
 
    const [matchData, setMatchData] = useState([])

    const [wins, setWins] = useState(0)
    const [losses, setLosses] = useState(0)
    const [winPer, setWinPer] = useState(0)

    const [loggedUser, setLoggedUser] = useState({
        username: '',
        userID: ''
    })


    useEffect( () => {

        //gets user
        const getLoggedUser = () => {
            setLoggedUser({
                username: localStorage.getItem('username'),
                userID: localStorage.getItem('user-id')
            })
        }
        getLoggedUser()

        //gets matches
        const getUserMatchs = async () => {
            const userRes = await Axios.get('http://localhost:5000/match/')
            const match = userRes.data

            setMatchData(match)
            //setMatchData(match.map(singleMatch => singleMatch))
            }

        getUserMatchs()

        

    }, [props.user])


    console.log(matchData)
    function setStatData(){
        var winCount = 0
        var lossCount = 0
        for(var i = 0; i < matchData.length; i++){
            if(matchData[i].winnerID === loggedUser.userID){
                winCount = winCount + 1
            }
            if(matchData[i].loserID === loggedUser.userID){
                lossCount = lossCount + 1
            }
        }
        //console.log('win:' + winCount)
        //console.log('loss'+lossCount)
        //setWins(winCount)
        //setLosses(lossCount)
        //console.log(wins)
        //console.log(losses)
        setWins(winCount)
    }
    setStatData()

//     function setWinPercentage(){
//         var winPercentage = (losses / wins) * 100
//         console.log(winPercentage)
//     }

// //setWinPercentage()

    return (
        <div>
            <h4>User Stats</h4>
        </div>
    )
}
 
export default UserStats
