import React, { Component } from 'react'
import M from 'materialize-css';

export class Navbar extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper" style={{ backgroundColor: '#0B1B4F' }}>
                    <a href="#!" className="brand-logo " style={{ fontSize: 40 }}><strong>GAE</strong></a>
                    {/* <ul className="right hide-on-med-and-down">
                        <li><a className="dropdown-trigger" href="dropper" data-target="dropdown1" title="Abrir" style={{ fontSize: 'xx-large' }}><strong>Juan Jose Ramirez</strong><i className="material-icons right">arrow_drop_down</i></a></li>
                    </ul> */}
                </div>
            </nav>

        )
    }
}

export default Navbar
