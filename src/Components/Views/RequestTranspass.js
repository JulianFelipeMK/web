import React, { Component } from 'react'
import { apiCall } from '../../Api/ApiWrapper'
import Navbar from '../Subcomponents/Navbar'
import Select from 'react-select'
import M from 'materialize-css';
import Pagination from '../Subcomponents/Pagination';

export class RequestTranspass extends Component {

    state = {
        crequest: [],
        crequesta: [],
        requesta: [],
        request: [],
        users: [],
        people: [],

        speople: [],
        susers: [],

        id_req: 0,
        requested_req: 0,
        personal_req: 0,
        state_req: 1,

        currentPage: 1,
        pagesLimit: 5,
        indexLastPost: 0,
        indexFirstPost: 0

    }

    paginate = (page) => {
        this.setState({ currentPage: page })
        this.setValues(page)
    }

    setValues = (page = null, creque = null, crequea = null) => {
        const { pagesLimit, currentPage, crequest, crequesta } = this.state
        let current
        let creques
        let crequesa
        if (page === null) {
            current = currentPage
        } else {
            current = page
        }

        if (creque === null) {
            creques = crequest
        } else {
            creques = creque
        }

        if (crequea === null) {
            crequesa = crequesta
        } else {
            crequesa = crequea
        }
        const indexLastPost = current * pagesLimit
        const indexFirstPost = indexLastPost - pagesLimit
        const request = creques.slice(indexFirstPost, indexLastPost)
        const requesta = crequesa.slice(indexFirstPost, indexLastPost)
        this.setState({ indexLastPost, indexFirstPost, requesta: requesta, request: request })
    }

    componentDidMount = async () => {
        M.AutoInit()
        await this.handleRead()
        this.createDataSelects()

    }

    createDataSelects = () => {
        const { users, people } = this.state
        let susers = []
        let speople = []

        users.map(item => {
            let value = {
                label: item.name_use + " " + item.last_use,
                value: item.id_use
            }
            susers.push(value)
        })

        people.map(item => {
            let value = {
                label: item.names_peo + " " + item.last_name_peo,
                value: item.id_peo
            }
            speople.push(value)
        })

        this.setState({ speople, susers })
    }

    handleRead = async () => {
        var user = JSON.parse(localStorage.getItem("user"))
        const users = await apiCall("get", "/users/users")
        const people = await apiCall("get", "/people/people")
        const res = await apiCall("get", "/request/requests/" + user[0].id_use + "/requested")
        const resa = await apiCall("get", "/request/requests/" + user[0].id_use + "/applicant")
        if (res.status === 200 || (people.status === 200 && users.status === 200)) {
            const request = res.status === 200 ? res.data : []
            const requesta = resa.status === 200 ? resa.data : []
            //console.log(request)
            this.setState({ requesta, request, crequest: request, crequesta: requesta, people: people.data, users: users.data })
            this.setValues()
        }
    }

    paginate = (page) => {
        this.setState({ currentPage: page })
        this.setValues(page)
    }

    handleChangeState = async (e) => {
        e.preventDefault()
        console.log("hola")
        var user = JSON.parse(localStorage.getItem("user"))
        const { id_req, state_req, request } = this.state
        if (id_req !== 0) {
            let solicitud = {
                id_req,
                status_req: state_req
            }
            const res = await apiCall("PUT", "/request/changeState", solicitud)
            if (res.status === 200) {

                const response = await apiCall("get", "/request/requests/" + user[0].id_use + "/requested")
                let reque = response.status === 200 ? response.data : request
                let req
                let update
                let flag = false
                if (state_req === 1) {
                    flag = true
                    req = request.filter(item => item.id_req === id_req)
                    req[0].people.line_peo = req[0].users_request_requested_reqTousers.id_use
                    update = await apiCall("PUT", "/people/update", req[0].people)
                }
                window.M.toast({ html: res.message }, 3000)
                if (flag) {
                    if (update.status === 200) {
                        window.M.toast({ html: update.message }, 3000)
                    } else {
                        window.M.toast({ html: update.message }, 3000)
                    }
                } else {
                    window.M.toast({ html: "La solicitud ha sido rechazada exitosamente" }, 3000)
                }


                this.setState({ crequest: reque })
                this.setValues(1, reque, null)
                this.clearInputs()
            } else {
                window.M.toast({ html: res.message }, 3000)
            }
        } else {
            window.M.toast({ html: 'Debe seleccionar una solicitud' }, 3000)
        }
    }

    handleCreate = async (e) => {
        e.preventDefault()
        const { requested_req, personal_req } = this.state
        var user = JSON.parse(localStorage.getItem("user"))
        if (requested_req !== 0 && personal_req !== 0) {
            const applicant_req = user[0].id_use
            const request = {
                applicant_req,
                requested_req,
                personal_req
            }
            const res = await apiCall("post", "/request/create", request)
            if (res.status === 200) {
                window.M.toast({ html: res.message }, 3000)

                const resa = await apiCall("get", "/request/requests/" + user[0].id_use + "/applicant")
                const data = resa.status === 200 ? resa.data : []
                this.setState({ crequesta: data })
                this.setValues(1, null, data)
                this.clearInputs()
            } else {
                window.M.toast({ html: res.message }, 3000)
            }
        } else {
            window.M.toast({ html: 'Por favor ingrese los campos requeridos' }, 3000)
        }
    }

    clearInputs = () => {
        this.setState({
            id_req: 0,
            state_req: 1,
        })
    }

    handleOnChangeSelect = (e) => {
        this.setState({
            [e.label]: e.value
        });
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        const { request, requesta, id_req, speople, susers, requested_req, personal_req, state_req, pagesLimit, currentPage1, currentPage2, crequesta, crequest } = this.state
        let table = <div>No hay nada que mostrar</div>
        let table2 = <div>No hay nada que mostrar</div>
        if (request.length > 0) {
            table = request.map(item => {
                let status = ""
                let disable = true
                console.log(item)
                if (item.status_req === 1) {
                    status = "Aprobado"
                } else if (item.status_req === 2) {
                    status = "Rechazado"
                } else if (item.status_req === 3) {
                    status = "Solicitado"
                    disable = false
                }
                return < tr >
                    <td>
                        <p>
                            <label>
                                <input type="checkbox" disabled={disable} value={item.id_req} checked={item.id_req === id_req ? true : false} onChange={() => this.setState({ id_req: item.id_req })} />
                                <span />
                            </label>
                        </p>
                    </td>

                    <td>{item.date_req}</td>
                    <td>{item.users_request_applicant_reqTousers.name_use + " " + item.users_request_applicant_reqTousers.last_use}</td>
                    <td>{item.people.names_peo + " " + item.people.last_name_peo}</td>
                    <td>{status}</td>
                </tr >
            })
        }

        if (requesta.length > 0) {
            table2 = requesta.map(item => {
                let status = ""
                if (item.status_req === 1) {
                    status = "Aprobado"
                } else if (item.status_req === 2) {
                    status = "Rechazado"
                } else if (item.status_req === 3) {
                    status = "Solicitado"
                }
                return < tr >
                    <td>{item.date_req}</td>
                    <td>{item.users_request_applicant_reqTousers.name_use + " " + item.users_request_applicant_reqTousers.last_use}</td>
                    <td>{item.people.names_peo + " " + item.people.last_name_peo}</td>
                    <td>{status}</td>
                </tr >
            })


        }

        return (
            <div>
                <Navbar />

                <div class="container row" style={{ marginTop: "20px" }}>
                    <div class="col s12">
                        <ul class="tabs">
                            <li class="tab col s3"><a href="#applicant" className="active">Solicitudes generadas</a></li>
                            <li class="tab col s3"><a href="#requested">Solicitudes solicitadas</a></li>
                        </ul>
                    </div>
                    <div id="applicant" class="col s12">
                        <table className="responsive-table centered highlight striped">
                            <thead>
                                <tr>
                                    <th>Fecha de solicitud</th>
                                    <th>Solicitante</th>
                                    <th>Persona a transpasar</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table2}
                            </tbody>
                        </table>
                        <Pagination recordsPerPage={5} totalRecords={crequesta.length} paginate={this.paginate} currentPage={this.state.currentPage} />
                    </div>

                    <div id="requested" class="col s12">
                        <table className="responsive-table centered highlight striped">
                            <thead>
                                <tr>
                                    <th> # </th>
                                    <th>Fecha de solicitud</th>
                                    <th>Solicitante</th>
                                    <th>Persona a transpasar</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table}
                            </tbody>
                        </table>
                        <Pagination recordsPerPage={5} totalRecords={crequest.length} paginate={this.paginate} currentPage={this.state.currentPage} />
                    </div>
                </div>

                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large" style={{ backgroundColor: '#0B1B4F' }}>
                        <i className="large material-icons">menu</i>
                    </a>
                    <ul>
                        <li><a href="#create_request" className="btn-floating modal-trigger waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">add</i></a></li>
                        <li><a href="#change_state" className={id_req !== 0 ? "btn-floating modal-trigger" : "btn-floating"} style={{ backgroundColor: '#0C0966' }}><i className="material-icons">update</i></a></li>
                    </ul>
                </div>

                <div id="create_request" className="modal">
                    <div className="modal-content">
                        <h4>Crear solicitud</h4>
                        <div className="row">
                            <form>
                                <div className="col s12" style={{ marginBottom: "10px" }} >
                                    <span>Seleccione usuario a solicitar transpaso</span>
                                    <Select options={susers} defaultInputValue={requested_req.toString()} onChange={(e) => this.setState({ requested_req: e.value })} />
                                </div>

                                <div className="col s12" style={{ marginBottom: "10px" }}>
                                    <span>Seleccione personal al cual desea realizar transpaso</span>
                                    <Select options={speople} defaultInputValue={personal_req.toString()} onChange={(e) => this.setState({ personal_req: e.value })} />
                                </div>

                                <button onClick={this.handleCreate} className="btn" >guardar</button>
                            </form>

                        </div>
                    </div>
                </div>

                <div id="change_state" className="modal">
                    <div className="modal-content">
                        <h4>Cambiar estado de la solicitud</h4>
                        <div className="row">
                            <form>
                                <div className="input-field col s12">
                                    <input disabled id="id_req" type="text" value={id_req} />
                                    <label htmlFor="id_req" class="active">Id de solicitud</label>
                                </div>

                                <div class="input-field col s12">
                                    <select id="state_req" value={state_req} onChange={this.handleOnChange}>
                                        <option value="" disabled selected>Estado</option>
                                        <option value={1}>Aprobar</option>
                                        <option value={2}>Cancelar</option>
                                    </select>
                                    <label>Estado de la solicitud</label>
                                </div>

                                <button onClick={this.handleChangeState} className="btn" >guardar</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default RequestTranspass
