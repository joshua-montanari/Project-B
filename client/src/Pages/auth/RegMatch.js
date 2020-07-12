import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Axios from 'axios'

const RegMatch = () => {

    const {userData} = useContext(UserContext)

    const [matchState, setMatchState] = useState({
        winnerID: '',
        winnerUsername: '',
        winnerScore: 0,
        loserID: '',
        loserUsername: 'pick the loser',
        loserScore: 0,
        date: new Date(),
        users: []
    })

    useEffect( () => {
        Axios.get('http://localhost:5000/users/all-users')
        .then(res => {
            if (res.data.length > 0){
                setMatchState({
                    users: res.data.map(user => user.username), //sets user array
                    winnerUsername: userData.user.username
                })
            }
        })
          
    }, [])

    function usernameChange(e) {
        setMatchState({
            loserUsername: e.target.value
        })
    }

    return (
        <div>
            <h3>Register a new match</h3>
            <form>
                <div>
                    <label>Match loser: </label>
                    <select
                            required
                            value={matchState.loserUsername}
                            onChange={usernameChange}
                            >
                                {
                                    matchState.users.map( user => {
                                    return <option key={user} value={user}>{user}</option>
                                    })
                                }
                    </select>
                </div>
            </form>
        </div>
    )
}

export default RegMatch
