import React, {useContext, useState} from 'react'
import {Context} from '../../context'

function Login() {
    const [loginUser, setLoginUser] = useState('')

    const {allUsers, setUser} = useContext(Context)

    console.log(JSON.stringify(allUsers))

    const users =  allUsers.map( user => (
        <button >{user.username}</button>
    ))

    return (
        <main>
            <h1>User List</h1>
            <div>{users}</div>
            <h1>Type a user to check stats</h1>

            {/* <form onSubmit={setUser(loginUser)}>
                <label>
                    Username:
                    <input type="text" value={loginUser} onChange={setLoginUser} />
                </label>
                <input type="submit" value="Submit" />
            </form> */}
        </main>
    )
}

export default Login
