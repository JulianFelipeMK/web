import React, { Component } from 'react'
import { apiCall } from '../../Api/ApiWrapper'
import Navbar from '../Subcomponents/Navbar'

export class MainMenu extends Component {

    state = {
        users: false,
    }

    render() {
        const { users } = this.state
        return (
            <div>
                <Navbar />

                <div className="container row" style={{ marginTop: 90 }}>

                    <div className="col s12 m4 l4">
                        <div className="card hoverable">
                            <div className="card-content">
                                <img src="images/group.png" alt className="responsive-img" />
                                <span className="card-title activator grey-text text-darken-4">Gestion de personal<i className="material-icons right">more_vert</i></span>
                                <a className="btn" href="/personal">Ir aqui</a>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">Gestion de personal<i className="material-icons right">close</i></span>
                                <p>En esta opcion podra realizar la gestion del personal de la empresa</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4 l4">
                        <div className="card hoverable">
                            <div className="card-content">
                                <img src="images/trend.png" alt className="responsive-img" />
                                <span className="card-title activator grey-text text-darken-4">Metricas<i className="material-icons right">more_vert</i></span>
                                <a className="btn" href="/statistics">Ir aqui</a>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">Metricas<i className="material-icons right">close</i></span>
                                <p>En esta opcion podra ver las metricas generadas en el sistema</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4 l4">
                        <div className="card hoverable">
                            <div className="card-content">
                                <img src="images/clock.png" alt className="responsive-img" />
                                <span className="card-title activator grey-text text-darken-4">Programaciones<i className="material-icons right">more_vert</i></span>
                                <a className="btn" href="/programations">Ir aqui</a>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">Programaciones<i className="material-icons right">close</i></span>
                                <p>En esta opcion podra ver las programaciones generadas en el sistema</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col s12 m4 l3">
                        <div className="card hoverable">
                            <div className="card-content">
                                <img src="images/interview.png" alt className="responsive-img" />
                                <span className="card-title activator grey-text text-darken-4">Solicitudes<i className="material-icons right">more_vert</i></span>
                                <a className="btn" href="/request">Ir aqui</a>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">Solicitudes<i className="material-icons right">close</i></span>
                                <p>En esta opcion podra ver las solicitudes de transpaso de personal</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default MainMenu
