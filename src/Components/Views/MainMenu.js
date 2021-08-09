import React, { Component } from 'react'

export class MainMenu extends Component {
    render() {
        return (
            <div className="container row" style={{ marginTop: 90 }}>
                <div className="col s12 m4 l3">
                    <div className="card hoverable">
                        <div className="card-content">
                            <img src="user.png" alt className="responsive-img" />
                            <span className="card-title activator grey-text text-darken-4">Gestion de usuarios<i className="material-icons right">more_vert</i></span>
                            <a className="btn right" href="#">Ir aqui</a>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">Gestion de usuarios<i className="material-icons right">close</i></span>
                            <p>En esta opcion podra realizar la gestion de los usuarios del sistema</p>
                        </div>
                    </div>
                </div>
                <div className="col s12 m4 l3">
                    <div className="card hoverable">
                        <div className="card-content">
                            <img src="group.png" alt className="responsive-img" />
                            <span className="card-title activator grey-text text-darken-4">Gestion de personal<i className="material-icons right">more_vert</i></span>
                            <a className="btn right" style={{ marginBottom: 50 }} href="#">Ir aqui</a>
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
                            <img src="trend.png" alt className="responsive-img" />
                            <span className="card-title activator grey-text text-darken-4">Metricas<i className="material-icons right">more_vert</i></span>
                            <a className="btn right" href="#">Ir aqui</a>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">Metricas<i className="material-icons right">close</i></span>
                            <p>En esta opcion podra ver las metricas generadas en el sistema</p>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default MainMenu
