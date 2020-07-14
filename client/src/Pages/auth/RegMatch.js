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

    const [winnerChar, setWinnerChar] = useState()
    const [winnerCharIMG, setWinnerCharIMG] = useState()
    const [loserChar, setLoserChar] = useState()
    const [loserCharIMG, setLoserCharIMG] = useState()

    const characterInfo = [
        { name: 'Mario', img: 'https://user-images.githubusercontent.com/50600343/87451827-695f2780-c5ce-11ea-8bcf-0c916961af9f.png'},
        { name: 'Bowser', img: 'https://user-images.githubusercontent.com/50600343/87458087-6c124a80-c5d7-11ea-8ade-46b780f98992.png'},
        { name: 'Peach', img: 'https://user-images.githubusercontent.com/50600343/87458112-77657600-c5d7-11ea-80fa-6f506ba2ad4a.png'},
        { name: 'Yoshi', img: 'https://user-images.githubusercontent.com/50600343/87458135-7fbdb100-c5d7-11ea-9dd5-d48e7454bb32.png'},
        { name: 'Donkey_kong', img: 'https://user-images.githubusercontent.com/50600343/87458163-8f3cfa00-c5d7-11ea-8da9-2b8ac89a3cba.png'},
        { name: 'Captain Falcon', img: 'https://user-images.githubusercontent.com/50600343/87458191-9a902580-c5d7-11ea-8e64-8b2cb203314a.png'},
        { name: 'Fox', img: 'https://user-images.githubusercontent.com/50600343/87458220-a7147e00-c5d7-11ea-8cf3-46d40601ad9f.png'},
        { name: 'Ness', img: 'https://user-images.githubusercontent.com/50600343/87458237-aed42280-c5d7-11ea-9967-120faa6b3513.png'},
        { name: 'Ice Climbers', img: 'https://user-images.githubusercontent.com/50600343/87458290-c1e6f280-c5d7-11ea-81a7-f996a1b0a7da.png'},
        { name: 'Lirby', img: 'https://user-images.githubusercontent.com/50600343/87458374-e17e1b00-c5d7-11ea-8c9c-ef28ce8f01e9.png'},
        { name: 'Samus', img: 'https://user-images.githubusercontent.com/50600343/87458398-ea6eec80-c5d7-11ea-8d09-e6dbc894f851.png'},
        { name: 'Zelda', img: 'https://user-images.githubusercontent.com/50600343/87458416-f195fa80-c5d7-11ea-9410-5849c7ce41cd.png'},
        { name: 'Sheik', img: 'https://user-images.githubusercontent.com/50600343/87458439-fce92600-c5d7-11ea-9409-cc1d2b0f7c4b.png'},
        { name: 'Link', img: 'https://user-images.githubusercontent.com/50600343/87458450-02df0700-c5d8-11ea-99e4-f5ac62c55aad.png'},
        { name: 'Pikachu', img: 'https://user-images.githubusercontent.com/50600343/87458463-096d7e80-c5d8-11ea-8278-6b55f3ba03c5.png'},
        { name: 'Jigglypuff', img: 'https://user-images.githubusercontent.com/50600343/87458481-0ffbf600-c5d8-11ea-9635-1362422813cb.png'},
        { name: 'Dr Mario', img: 'https://user-images.githubusercontent.com/50600343/87458527-2013d580-c5d8-11ea-80ba-2970c860ab4c.png'},
        { name: 'Luigi', img: 'https://user-images.githubusercontent.com/50600343/87458549-27d37a00-c5d8-11ea-82dc-cc4e34f7f62c.png'},
        { name: 'Gannondorf', img: 'https://user-images.githubusercontent.com/50600343/87458573-2efa8800-c5d8-11ea-95ad-84f9ef50ea33.png'},
        { name: 'Falco', img: 'https://user-images.githubusercontent.com/50600343/87458598-3752c300-c5d8-11ea-92db-0cb11adbde1a.png'},
        { name: 'Young Link', img: 'https://user-images.githubusercontent.com/50600343/87458631-3faafe00-c5d8-11ea-9444-c5a7fa94fd8c.png'},
        { name: 'Pichu', img: 'https://user-images.githubusercontent.com/50600343/87458645-45a0df00-c5d8-11ea-9205-1feb48505137.png'},
        { name: 'Mewtwo', img: 'https://user-images.githubusercontent.com/50600343/87458662-4c2f5680-c5d8-11ea-9e76-4d64531ad362.png'},
        { name: 'Mr Game & Watch', img: 'https://user-images.githubusercontent.com/50600343/87458676-52bdce00-c5d8-11ea-9d7a-686172b541ee.png'},
        { name: 'Marth', img: 'https://user-images.githubusercontent.com/50600343/87458702-5c473600-c5d8-11ea-868a-5ea5911b307e.png'},
        { name: 'Roy', img: 'https://user-images.githubusercontent.com/50600343/87458722-623d1700-c5d8-11ea-8d85-daa336776611.png'},
    ]

    const meleeCharacters=['Mario', 'Bowser', 'Peach', 'Yoshi', 'Donkey Kong', 'Captain Falcon', 'Fox', 'Ness', 'Ice Climbers', 'Kirby', 'Samus', 'Zelda', 'Sheik', 'Link', 'Pikachu', 'Jigglypuff', 'Dr Mario', 'Luigi', 'Ganondorf', 'Falco', 'Young Link', 'Pichu', 'Mewtwo', 'Mr Game & Watch', 'Marth', 'Roy']

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

    function winnerCharacterChange(e){
        setWinnerChar(e.target.value)
    }

    function loserCharacterChange(e){
        setLoserChar(e.target.value)
    }

    function winnerCharacterImageChange(){
        var activeWinnerCharIMG
        for(var i=0; i<characterInfo.length;i++){
            if(characterInfo[i].name === winnerChar){
                activeWinnerCharIMG = characterInfo[i].img
                setWinnerCharIMG(activeWinnerCharIMG)
            }
        }
    }

    function loserCharacterImageChange(){
        var activeLoserCharIMG
        for(var i=0; i<characterInfo.length;i++){
            if(characterInfo[i].name === loserChar){
                activeLoserCharIMG = characterInfo[i].img
                console.log('loserlink: '+activeLoserCharIMG)
                setLoserCharIMG(activeLoserCharIMG)
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
        winnerCharacterImageChange()
        loserCharacterImageChange()
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
            winnerChar,
            winnerCharIMG, 
            winnerScore, 
            loserID, 
            loserName, 
            loserChar,
            loserCharIMG,
            loserScore, 
            date,
        }
        console.log(newMatch)
        await Axios.post('http://localhost:5000/match/add', newMatch)
        history.push('/')
    }

    return (
        <div>
            <h3>Register a new match</h3>
            <h6>ONLY SUBMIT A MATCH IF YOU ARE THE WINNER</h6>
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
                    <label>Winner Character: </label>
                    <select
                            required
                            value={startLoserUsername.loserUsername}
                            onChange={winnerCharacterChange}
                            >
                                {
                                    meleeCharacters.map( function(char) {
                                            return <option key={char} value={char}>{char}</option>
                                    })
                                }
                    </select>
                </div>
                <div>
                    <h3>Winner score</h3>
                    <input type='radio' id='w2' name='winnerScore' value='2' onClick={winnerScoreChange}/>
                    <label for='w2'>2</label>
                    <input type='radio' id='w3' name='winnerScore' value='3' onClick={winnerScoreChange}/>
                    <label for='w3'>3</label>
                </div>
                <div>
                    <label>Loser Character: </label>
                    <select
                            required
                            value={startLoserUsername.loserUsername}
                            onChange={loserCharacterChange}
                            >
                                {
                                   meleeCharacters.map( function(char) {
                                    return <option key={char} value={char}>{char}</option>
                            })
                                }
                    </select>
                </div>
                <div>
                    <h3>Loser score</h3>
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
