import React from 'react'
import {Container, Navbar} from "react-bootstrap";
import logo from "../resources/off-piste-logo.jpeg";

export function NavbarOP() {
    return(
        <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Off-Piste
                </Navbar.Brand>
        </Navbar>
    )
}
