import React, { Component } from 'react'
import M from 'materialize-css';
import Navbar from '../Subcomponents/Navbar';
import { apiCall } from './../../Api/ApiWrapper'
import Pagination from '../Subcomponents/Pagination';

export class ManagementUsers extends Component {

    state = {
        cusers: [],
        users: [],
        loading: false,
        search: "",

        id_use: 0,
        name_use: "",
        last_use: "",
        email_use: "",
        password_use: "",
        role_use: 1,
        line_lead: 3,

        open: true,
        pagesLimit: 5,
        currentPage: 1,
        indexLastPost: 0,
        indexFirstPost: 0
    }

    componentDidMount = async () => {
        M.AutoInit()
        await this.handleRead()
        this.setValues()
    }

    setValues = (page = null, array = null) => {
        const { pagesLimit, currentPage, cusers } = this.state
        let current
        let data
        if (page === null) {
            current = currentPage
        } else {
            current = page
        }

        if (array === null) {
            data = cusers
        } else {
            data = array
        }
        const indexLastPost = current * pagesLimit
        const indexFirstPost = indexLastPost - pagesLimit
        const users = data.slice(indexFirstPost, indexLastPost)
        this.setState({ indexLastPost, indexFirstPost, users })
    }

    handleSearch = (e) => {
        const { value } = e.target
        const { cusers } = this.state
        if (value !== "") {
            const data = cusers.filter(user => {
                const itemData = user.name_use ? user.name_use.toUpperCase() : ''.toUpperCase();
                const textData = value.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            this.setState({ users: data })
        } else {
            this.setValues(null, cusers)
        }
    }

    handleRead = async () => {
        const res = await apiCall("GET", "/users/users")
        if (res.status === 200) {
            this.setState({ users: res.data, cusers: res.data })
        }
    }

    handleCreate = async (e) => {
        e.preventDefault()
        const { name_use, last_use, email_use, password_use, role_use, line_lead } = this.state
        if (name_use !== "" && last_use !== "" && email_use !== "" && password_use !== "" && role_use && line_lead !== "") {
            const user = {
                name_use,
                last_use,
                email_use,
                password_use,
                role_use,
                line_lead
            }
            const response = await apiCall("post", "/users/register", user)
            if (response.status === 200) {
                window.M.toast({ html: response.message }, 3000)
                const data = this.state.users
                this.setState({ cusers: [...data, response.data] })
                this.setValues(null, [...data, response.data])
                this.clearInputs()
            } else {
                window.M.toast({ html: response.message }, 3000)
            }
        } else {
            window.M.toast({ html: 'Por favor ingrese los campos requeridos' }, 3000)
        }
    }

    handleUpdate = async (e) => {
        e.preventDefault()
        const { id_use, name_use, last_use, email_use, password_use, role_use, line_lead, cusers } = this.state
        if (id_use !== 0 && name_use !== "" && last_use !== "" && email_use !== "" && password_use !== "" && role_use !== 0 && line_lead !== 0) {
            const user = {
                id_use,
                name_use,
                last_use,
                email_use,
                password_use,
                role_use,
                line_lead
            }
            const res = await apiCall("put", "/users/user", user)
            if (res.status === 200) {
                const data = cusers.map(item => {
                    if (item.id_use === user.id_use) {
                        return res.data
                    }
                    return item
                })
                this.setState({ cusers: data })
                this.setValues(null, data)
                window.M.toast({ html: res.message }, 3000)
                this.clearInputs()
            } else {
                window.M.toast({ html: res.message }, 3000)
            }
        } else {
            window.M.toast({ html: 'Por favor ingrese los campos requeridos' }, 3000)
        }
    }

    handleDelete = async () => {
        const { id_use } = this.state
        console.log("Hola")
        if (id_use !== 0) {
            const response = await apiCall("delete", "/users/user", { id_use })
            console.log(response)
            if (response.status === 200) {
                window.M.toast({ html: response.message }, 3000)
                const data = this.state.users.filter(item => item.id_use !== id_use)
                this.setState({ cusers: data })
                this.setValues(null, data)
                this.clearInputs()
            } else {
                window.M.toast({ html: response.message }, 3000)
            }
        } else {
            window.M.toast({ html: 'Debe seleccionar un elemento para poder realizar esta accion' }, 3000)
        }
    }

    paginate = (page) => {
        this.setState({ currentPage: page })
        this.setValues(page)
    }

    putsFields = () => {
        const { id_use, users } = this.state
        if (id_use !== 0) {
            const filter = users.find(item => item.id_use === id_use)
            this.setState({
                name_use: filter.name_use,
                last_use: filter.last_use,
                email_use: filter.email_use,
                password_use: "",
                role_use: filter.role_use,
                line_lead: filter.line_lead
            })
        } else {
            window.M.toast({ html: 'Debe seleccionar un elemento para poder realizar esta accion' }, 3000)
        }
        this.setState({})
    }

    clearInputs = () => {
        this.setState({
            id_use: 0,
            name_use: "",
            last_use: "",
            email_use: "",
            password_use: "",
            role_use: 1,
            line_lead: 3
        })
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        const { users, pagesLimit, cusers } = this.state
        const { id_use, name_use, last_use, email_use, password_use, role_use, line_lead, currentPage } = this.state
        console.log(id_use)
        let table = <div>Lo sentimos, no hay nada que mostrar</div>
        if (users.length > 0) {
            table = users.map((item, i) => (
                <tr>
                    <td>
                        <p>
                            <label>
                                <input className="blue" type="checkbox" value={item.id_use} checked={item.id_use === id_use ? true : false} onChange={() => this.setState({ id_use: item.id_use })} />
                                <span />
                            </label>
                        </p>
                    </td>
                    <td>{item.email_use}</td>
                    <td>{item.name_use}</td>
                    <td>{item.last_use}</td>
                    <td>{item.role_use === 1 ? "Lider" : "Administrador"}</td>
                </tr>
            ))
        }


        return (
            <div>

                <Navbar />

                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="cloud">
                        <path d="M31.714,25.543c3.335-2.17,4.27-6.612,2.084-9.922c-1.247-1.884-3.31-3.077-5.575-3.223h-0.021
C27.148,6.68,21.624,2.89,15.862,3.931c-3.308,0.597-6.134,2.715-7.618,5.708c-4.763,0.2-8.46,4.194-8.257,8.919
c0.202,4.726,4.227,8.392,8.991,8.192h4.873h13.934C27.784,26.751,30.252,26.54,31.714,25.543z" />
                    </symbol>
                    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="lens">
                        <path d="M15.656,13.692l-3.257-3.229c2.087-3.079,1.261-7.252-1.845-9.321c-3.106-2.068-7.315-1.25-9.402,1.83
s-1.261,7.252,1.845,9.32c1.123,0.748,2.446,1.146,3.799,1.142c1.273-0.016,2.515-0.39,3.583-1.076l3.257,3.229
c0.531,0.541,1.404,0.553,1.95,0.025c0.009-0.008,0.018-0.017,0.026-0.025C16.112,15.059,16.131,14.242,15.656,13.692z M2.845,6.631
c0.023-2.188,1.832-3.942,4.039-3.918c2.206,0.024,3.976,1.816,3.951,4.004c-0.023,2.171-1.805,3.918-3.995,3.918
C4.622,10.623,2.833,8.831,2.845,6.631L2.845,6.631z" />
                    </symbol>
                </svg>

                <div style={{
                    display: "flex",
                    "flex-direction": "column",
                    "justify-content": "flex-start",
                    "align-items": "flex-start"
                }}>
                    <div className="search" style={{ marginLeft: '16%', marginTop: '2%' }}>
                        <input type="text" placeholder="Busqueda usuario por nombre" onChange={this.handleSearch} className="browser-default" />
                        <div className="symbol">
                            <svg className="cloud">
                                <use xlinkHref="#cloud" />
                            </svg>
                            <svg className="lens">
                                <use xlinkHref="#lens" />
                            </svg>
                        </div>
                    </div>
                </div>


                <div className="container" style={{ marginTop: '3%' }}>
                    <table className="responsive-table centered highlight striped">
                        <thead>
                            <tr>
                                <th> # </th>
                                <th>Correo</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <a className="btn-floating btn-large" style={{ backgroundColor: '#0B1B4F' }}>
                            <i className="large material-icons">menu</i>
                        </a>
                        <ul>
                            <li><a href="#create_user" className="btn-floating modal-trigger waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">add</i></a></li>
                            <li><a href="#update_user" onClick={this.putsFields} className={id_use !== 0 ? "btn-floating waves-effect waves-light modal-trigger" : "btn-floating waves-effect waves-light"} style={{ backgroundColor: '#0C0966' }}><i className="material-icons">update</i></a></li>
                            <li><a onClick={this.handleDelete} className="btn-floating waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">delete</i></a></li>
                        </ul>
                    </div>
                    <div id="create_user" className="modal">
                        <div className="modal-content">
                            <h4>Crear usuario</h4>
                            <div className="row">
                                <form>
                                    <div className="input-field col s6">
                                        <input id="name_use" type="text" onChange={this.handleOnChange} value={name_use} />
                                        <label htmlFor="name_use">Nombres</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="last_use" type="text" onChange={this.handleOnChange} value={last_use} />
                                        <label htmlFor="last_use">Apellidos</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="email_use" type="email" className="validate" onChange={this.handleOnChange} value={email_use} />
                                        <label htmlFor="email_use">Email</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="password_use" type="password" onChange={this.handleOnChange} value={password_use} />
                                        <label htmlFor="password_use">Password</label>
                                    </div>
                                    <div class="input-field col s12" >
                                        <select id="role_use" value={role_use} onChange={this.handleOnChange}>
                                            <option value="" disabled selected>Rol</option>
                                            <option value="1">Lider</option>
                                            <option value="2">Administrador</option>
                                        </select>
                                        <label>Rol de usuario</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <select id="line_lead" value={line_lead} onChange={this.handleOnChange}>
                                            <option value="" disabled selected>Linea (Opcional)</option>
                                            <option value="3">Linea 1</option>
                                            <option value="4">Linea 2</option>
                                            <option value="5">Linea 3</option>
                                            <option value="6">Linea 4</option>
                                            <option value="7">Linea 5</option>
                                            <option value="8">No aplica</option>
                                        </select>
                                        <label>Linea a gestionar</label>
                                    </div>
                                    {/* <div className="input-field col s6">
                                        <input id="avatar_use" type="text" className="validate" />
                                        <label htmlFor="avatar_use">Avatar</label>
                                    </div> */}

                                    <button onClick={this.handleCreate} className="btn" >guardar</button>
                                </form>

                            </div>
                        </div>
                    </div>

                    <Pagination recordsPerPage={5} totalRecords={cusers.length} paginate={this.paginate} currentPage={this.state.currentPage} />

                    <div id="update_user" className="modal">
                        <div className="modal-content">
                            <h4>Actualizar usuario</h4>
                            <div className="row">
                                <form>
                                    <div className="input-field col s12">
                                        <input disabled id="id_use" type="text" value={id_use} />
                                        <label htmlFor="name_use" class="active">Id de usuario</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="name_use" type="text" className="validate" onChange={this.handleOnChange} value={name_use} />
                                        <label htmlFor="name_use" class="active">Nombres</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="last_use" type="text" className="validate" onChange={this.handleOnChange} value={last_use} />
                                        <label htmlFor="last_use" class="active">Apellidos</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="email_use" type="email" className="validate" onChange={this.handleOnChange} value={email_use} />
                                        <label htmlFor="email_use" class="active">Email</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="password_use" type="password" className="validate" onChange={this.handleOnChange} value={password_use} />
                                        <label htmlFor="password_use" class="active">Password</label>
                                    </div>
                                    <div class="input-field col s12" >
                                        <select id="role_use" value={role_use} onChange={this.handleOnChange}>
                                            <option value="" disabled selected>Rol</option>
                                            <option value="1">Lider</option>
                                            <option value="2">Administrador</option>
                                        </select>
                                        <label>Rol de usuario</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <select id="line_lead" value={line_lead} onChange={this.handleOnChange}>
                                            <option value="" disabled selected>Linea (Opcional)</option>
                                            <option value="3">Linea 1</option>
                                            <option value="4">Linea 2</option>
                                            <option value="5">Linea 3</option>
                                            <option value="6">Linea 4</option>
                                            <option value="7">Linea 5</option>
                                            <option value="8">No aplica</option>
                                        </select>
                                        <label>Linea a gestionar</label>
                                    </div>
                                    {/* <div className="input-field col s6">
                                        <input id="avatar_use" type="text" className="validate" />
                                        <label htmlFor="avatar_use">Avatar</label>
                                    </div> */}

                                    <button onClick={this.handleUpdate} className="btn" >guardar</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

export default ManagementUsers
