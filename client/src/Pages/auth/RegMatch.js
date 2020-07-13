import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios'

const RegMatch = () => {

    const history = useHistory()
    const [startLoserUsername, setStartLoserUsername] = useState({
        startLoserUsername: ''
    })
    const [winnerID, setWinnerID] = useState()
    const [winnerName, setWinnerUsername] = useState()
    const [winnerScore, setWinnerScore] = useState()
    const [loserID, setloserID] = useState()
    const [loserName, setLoserUsername] = useState()
    const [loserScore, setloserScore] = useState()
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([]) //TODO: MUST BE A BETTER WAY than storing all users twice.

    useEffect( () => {
        Axios.get('http://localhost:5000/users/all-users')
        .then(res => {
            setUsers(res.data.map(user => user.username))
                if(res.data[0].username === localStorage.getItem('username')){
                    setStartLoserUsername({startLoserUsername: res.data[1].username})//TODO: messy
                }else{
                    setStartLoserUsername({startLoserUsername: res.data[0].username})
                }
        })

        Axios.get('http://localhost:5000/users/all-users')
        .then(res => {
            setAllUsers(res.data)
        })

    }, [])


    function usernameChange(e) {
        console.log('e.target.value: '+e.target.value)
        setLoserUsername(e.target.value)

    }

    function loserIDChange(){
        var activeLoserID 
        for(var i=0; i<allUsers.length; i++){
            if(allUsers[i].username === loserName){
                activeLoserID = allUsers[i]._id
                setloserID(activeLoserID)
            }
        }
    }

    function onChangeDate(date) {
        setDate(date)
    }

    function winnerScoreChange(e) {
        setWinnerScore(e.target.value)
    }

    function loserScoreChange(e) {
        setloserScore(e.target.value)
        loserIDChange() //TODO: move funciton locations please
        winnerInfo()
    }

    function winnerInfo(){
        setWinnerID(localStorage.getItem('user-id'))
        setWinnerUsername(localStorage.getItem('username'))
    }

    const submit = async (e) => {
        e.preventDefault()
        
        const newMatch = {
            winnerID, 
            winnerName, 
            winnerScore, 
            loserID, 
            loserName, 
            loserScore, 
            date,}
        await Axios.post('http://localhost:5000/match/add', newMatch)
        history.push('/')
    }

    return (
        <div>
            <h3>Register a new match</h3>
            <form onSubmit={submit}>
                <div>
                    <label>Match loser: </label>
                    <select
                            required
                            value={startLoserUsername.loserUsername}
                            onChange={usernameChange}
                            >
                                {
                                    users.map( function(user) {
                                        if(user !== localStorage.getItem('username')){
                                            return <option key={user} value={user}>{user}</option>
                                        }
                                    })
                                }
                    </select>
                </div>
                <div>
                    <h3>your score</h3>
                    <input type='radio' id='w2' name='winnerScore' value='2' onClick={winnerScoreChange}/>
                    <label for='w2'>2</label>
                    <input type='radio' id='w3' name='winnerScore' value='3' onClick={winnerScoreChange}/>
                    <label for='w3'>3</label>
                </div>
                <div>
                    <h3>their score</h3>
                    <input type='radio' id='l1' name='loserScore' value='0' onClick={loserScoreChange}/>
                    <label for='l0'>0</label>
                    <input type='radio' id='l2' name='loserScore' value='1' onClick={loserScoreChange}/>
                    <label for='l1'>1</label>
                    <input type='radio' id='l3' name='loserScore' value='2' onClick={loserScoreChange}/>
                    <label for='l2'>2</label>
                </div>
                <div>
                <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>
                <div>
                    <input type='submit' value='Submit New Match' />
                </div>
            </form>
        </div>
    )
}

export default RegMatch
