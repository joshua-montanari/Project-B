import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Axios from 'axios'

const Register = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [username, setUsername] = useState()

    const {setUserData} = useContext(UserContext)

    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault() // prevents page reload, so state isnt lost
        const newUser = {email, password, passwordCheck, username}
        await Axios.post('http://localhost:5000/users/register', newUser) //puts newUser object into the database using the register route

        const loginRes = await Axios.post('http://localhost:5000/users/login', {email, password})  //logs in the newly registed user, which also generates a jwt, in which will be stored in local stroage
        
        //sets context for whole app
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        //sets jwt in localstroage
        localStorage.setItem('auth-token', loginRes.data.token)
        //goes to the home page
        history.push('/')
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={submit}>
                <label htmlFor='register-email'>Email: </label>
                <input id='register-email' type='email' onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor='register-password'>Password: </label>
                <input id='register-password' type='password' onChange={(e) => setPassword(e.target.value)} />
                <input type='password' placeholder='Verify Password' onChange={(e) => setPasswordCheck(e.target.value)}/>

                <label htmlFor='register-username'>Username: </label>
                <input id='register-username' type='text' onChange={(e) => setUsername(e.target.value)}/>

                <input type='submit' value='Register' />
            </form>
        </div>
    )
}

export default Register
