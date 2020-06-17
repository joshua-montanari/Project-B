import React from 'react'
import { useHistory } from 'react-router-dom'

const AuthOptions = () => {
    const history = useHistory()

    const register = () => history.push('/register')
    const login = () => history.push('/login')

    return (
        <div>
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default AuthOptions
