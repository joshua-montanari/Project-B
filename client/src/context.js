import React, { useState, useEffect } from 'react'

const Context = React.createContext()

function ContextProvider({children}){
    const [allUsers, setAllUsers] = useState([])
    const [activeUser, setActiveUser] = useState([])

const url = "http://localhost:5000/users/"

useEffect(() => {
  console.log("hi")  
   fetch(url)
    .then(res => res.json())
    .then(data => setAllUsers(data))
}, [])

console.log(JSON.stringify(allUsers))



function setUser(user){
    setActiveUser(user)
    console.log('current active user is' + user)
}

    return(
        <Context.Provider value={{allUsers, activeUser, setUser}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}