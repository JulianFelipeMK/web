import React, { Component } from 'react'
import { apiCall } from '../../Api/ApiWrapper'
import Navbar from '../Subcomponents/Navbar'

export class MainMenu extends Component {

    state = {
        users: false,
    }

    componentDidMount = () => {
        var user = JSON.parse(localStorage.getItem("user"))
        if (user.role_use === 2) {
            this.setState({ users: true })
        }
    }


    verifyProgramation = async () => {
        var user = JSON.parse(localStorage.getItem("user"))
        const res = await apiCall("GET", "/programation/programation")
        if (res.message === 200) {
            const values = []
            res.data.map(item => {
                const value = {
                    id_peo: item.people_peo
                }
                values.push(value)
            })
            const response = await apiCall("PUT", "/request/changeState", { people: values })
            if (response.message === 200) {
                window.M.toast({ html: 'Las programaciones del dia de hoy han sido aplicadas exitosamente' }, 3000)
            }
        } else {
            window.M.toast({ html: 'NO hay programacion pendientes para el dia de hoy' }, 3000)
        }
    }

    render() {
        const { users } = this.state
        return (
            <div>
                <Navbar />

                <div className="container row" style={{ marginTop: 90 }}>
                    {users &&
                        <div className="col s12 m4 l3">
                            <div className="card hoverable">
                                <div className="card-content">
                                    <img src="images/user.png" alt className="responsive-img" />
                                    <span className="card-title activator grey-text text-darken-4">Gestion de usuarios<i className="material-icons right">more_vert</i></span>
                                    <a className="btn" href="/users">Ir aqui</a>
                                </div>
                                <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">Gestion de usuarios<i className="material-icons right">close</i></span>
                                    <p>En esta opcion podra realizar la gestion de los usuarios del sistema</p>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="col s12 m4 l3">
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
                    <div className="col s12 m4 l3">
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
                    <div className="col s12 m4 l3">
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
                    </div>
                </div>
            </div>
        )
    }
}

export default MainMenu
