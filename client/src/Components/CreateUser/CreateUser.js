// import React, { Component } from 'react'
// import axios from 'axios'

// class CreateUser extends Component {

//     state = {
//         username: '',
//         users: []
//     }

//     componentDidMount() {
//         axios.get('http://localhost:5000/users/')
//             .then(res =>{
//                 if (res.data.length > 0){
//                     this.setState({
//                         users: res.data.map(user => user.username),
//                         username: res.data[0].username
//                     })
//                 }
//             })
//     }

//     changeUsernameHandler = (e) =>{
//         this.setState({
//             username: e.target.value
//         })
//         console.log(this.state.username)
        
//     }

//     onSubmitHandler(e) {
//         e.preventDefault()
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Select your username</h1>
//                 <form onSubmit={this.onSubmit}>
//                     <div>
//                         <label>Username: </label>
//                         <select ref='userInput'
//                                 required
//                                 value={this.state.username}
//                                 onChange={this.changeUsernameHandler}>
//                                     {
//                                         this.state.users.map( user => {
//                                             return <option
//                                                 key={user}
//                                                 value={user}>
//                                                     {user}
//                                                 </option>
//                                         })
//                                     }
//                         </select>
                        
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }

// export default CreateUser
