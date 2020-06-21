import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'

const AuthOptions = () => {
    const {userData, setUserData} = useContext(UserContext) //gets the data that is passed with the provider

    const history = useHistory()

    const register = () => history.push('/register')
    const login = () => history.push('/login')
    const logout = () => {
        //on logout, sets user context to undefined and deletes the jwt from local storage
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
    }

    return (
        <div>
            {/* if user is logged in, then show logout button instead */}
            { userData.user ? (
            <button onClick={logout}>Logout</button> ): (
                <>
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Login</button>
                </>
            )
            }
            
        </div>
    )
}

export default AuthOptions
