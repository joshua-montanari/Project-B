import React from 'react'
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <>
                <div>
                    Error 404 page not found
                </div>
                <ul>
                    <li>
                        <Link to='/home'>Back to home page</Link>
                    </li>
                </ul>
        </>
    )
}

export default Error
