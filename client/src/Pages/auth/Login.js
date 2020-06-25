import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const {setUserData} = useContext(UserContext)

    const history = useHistory()

    const register = () => history.push('/register')

    const submit = async (e) => {
        e.preventDefault() // prevents page reload, so state isnt lost
        const loginUser = {email, password}
        const loginRes = await Axios.post('http://localhost:5000/users/login', loginUser)  //logs in the newly registed user, which also generates a jwt, in which will be stored in local stroage
        
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
            <h2>login</h2>
            <form onSubmit={submit}>
                <label htmlFor='login-email'>Email: </label>
                <input id='login-email' type='email' onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor='login-password'>Password: </label>
                <input id='login-password' type='password' onChange={(e) => setPassword(e.target.value)} />
                
                <input type='submit' value='Login' />
            </form>
            <button onClick={register}>Need to make and account?</button>
        </div>
    )
}

export default Login
