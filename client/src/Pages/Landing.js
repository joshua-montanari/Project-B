import React from 'react'
import { Link } from "react-router-dom";
const Landing = () => {
    return (
        <>
            <div>
                Landing page
            </div>
            
            <ul>
                <li>
                    <Link to='/home'>Sign in!</Link>
                </li>
            </ul>
        </>
    )
}

export default Landing
