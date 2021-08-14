import React, { Component } from 'react'
import M from 'materialize-css';

export class Navbar extends Component {

    state = {
        user: {}
    }

    componentDidMount = () => {
        var user = JSON.parse(localStorage.getItem("user"))
        this.setState({ user })
    }
    logOff = () => {
        localStorage.clear()
    }

    render() {
        return (
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="#" className="sidenav-trigger" data-target="mobile-demo">
                            <i className="material-icons">menu</i>
                        </a>
                        <a href="/menu" className="brand-logo">Gestion de personal</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/" onClick={this.logOff}>Salir</a></li>
                        </ul>
                    </div>
                </div>
                <ul className="sidenav" id="mobile-demo">

                    <li>
                        <a href="/" onClick={this.logOff}>Salir</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar
