import React from 'react'
import { Link } from "react-router-dom";
import CreateUser from '../Components/CreateUser/CreateUser'
import Login from '../Components/login/Login'

const Landing = () => {
    return (
        <>
            <div>
                Landing page
            </div>

            {/* <CreateUser /> */}
            <Login />
            
            <ul>
                <li>
                    <Link to='/home'>Sign in!</Link>
                </li>
            </ul>
        </>
    )
}

export default Landing
