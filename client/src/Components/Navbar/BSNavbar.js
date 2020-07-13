import React from 'react'
import * as ReactBootStrap from 'react-bootstrap'
import AuthOptions from '../AuthOptions'
import logo from "../../images/bnwlogo.png"

const BSNavbar = () => {
    return (
        <div>
            <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <ReactBootStrap.Navbar.Brand href="/" to='/'><div className='nav-logo-box'><img className='nav-logo' src={logo} alt='LOGO'></img></div> </ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                    <ReactBootStrap.Nav.Link className='text-white'href="/">Home</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link className='text-white' href="/scores">Scores and Stats</ReactBootStrap.Nav.Link>
                </ReactBootStrap.Nav>
                <ReactBootStrap.Nav>
                    <ReactBootStrap.Nav className='text-danger'><AuthOptions/></ReactBootStrap.Nav>
                </ReactBootStrap.Nav>
            </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
        </div>
    )
}

export default BSNavbar
