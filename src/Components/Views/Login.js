import React, { Component } from 'react'
import { apiCall } from './../../Api/ApiWrapper'

class Login extends Component {

    state = {
        email_use: "",
        password_use: ""
    }

    handleLogin = async (e) => {
        e.preventDefault()
        const { email_use, password_use } = this.state
        if (email_use !== "" && password_use !== "") {
            const res = await apiCall('post', '/users/login', { email_use, password_use })
            if (res.status === 200) {
                window.M.toast({ html: res.message }, 3000)
                const user = JSON.stringify(res.data)
                localStorage.setItem("logged", true)
                localStorage.setItem("user", user)
                this.props.history.push("/menu")
            } else {
                window.M.toast({ html: res.message }, 3000)
            }
        } else {
            window.M.toast({ html: "Debe ingresar los campos requeridos" }, 3000)
        }
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m12 l6">
                    <div className="container" style={{ marginTop: '30%' }}>
                        <h2 style={{ color: '#0B1B4F' }}><strong>Login</strong></h2>
                        <p style={{ fontSize: 20 }}>Gestiona tu personal, y mejora tu eficiencia</p>
                        <form className="col s12 m12 l12">
                            <div className="row">
                                <div className="input-field">
                                    <input id="email_use" type="email" className="validate" onChange={this.handleOnChange} />
                                    <label htmlFor="email_use">Email</label>
                                </div>
                                <div className="input-field">
                                    <input id="password_use" type="password" onChange={this.handleOnChange} />
                                    <label htmlFor="password_use">Contraseña</label>
                                </div>
                                <div>
                                    <button className="btn waves-effect  btn large" onClick={this.handleLogin} style={{ backgroundColor: '#0B1B4F', borderRadius: 20 }}>Ingresar
                                        <i className="material-icons right" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col l6 hide-on-med-and-down" style={{ backgroundColor: '#0B1B4F', height: '100vh' }}>
                    <img src="Images/team.png" className="responsive-img center-align" style={{ padding: '25%' }} />
                </div>
            </div>

        )
    }
}

export default Login
