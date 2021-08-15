import React, { Component } from 'react'
import M from 'materialize-css';
import Navbar from '../Subcomponents/Navbar';
import { apiCall } from './../../Api/ApiWrapper'
import axios from 'axios';
import Pagination from '../Subcomponents/Pagination';
import moment from 'moment';

export class ManagementPersonal extends Component {

    state = {
        cpeople: [],
        people: [],
        loading: false,

        id_peo: 0,
        names_peo: "",
        last_name_peo: "",
        avatar_peo: "",
        phone_peo: "",
        state_peo: 12,
        turn_peo: 9,
        line_peo: 3,

        open: true,
        pagesLimit: 5,
        currentPage: 1,
        indexLastPost: 0,
        indexFirstPost: 0,

        people_peo: 0,
        date_prom: "",
        state_prom: false,

        filter_line: 0,
        filter_state: 0,
        filter_turn: 0,
        filter_name: ""
    }

    componentDidMount = async () => {
        M.AutoInit()
        await this.handleRead()
        this.setValues()
    }

    handleChangeTurn = async () => {// probado perfecto
        const { cpeople, currentPage } = this.state
        var user = JSON.parse(localStorage.getItem("user"))
        const vals = []
        cpeople.map(item => {
            if (item.line_peo === user[0].lead_line) {
                let values = {
                    id_peo: item.id_peo,
                    turn_peo: 0
                }

                if (item.turn_gen_peo === 9) {
                    if (item.turn_peo === 9) {
                        values.turn_peo = 11
                    } else {
                        values.turn_peo = 9
                    }
                } else if (item.turn_peo === 10) {
                    if (item.turn_peo === 10) {
                        values.turn_peo = 9
                    } else {
                        values.turn_peo = 10
                    }
                } else if (item.turn_peo === 11) {
                    if (item.turn_peo === 11) {
                        values.turn_peo = 10
                    } else {
                        values.turn_peo = 11
                    }
                }
                vals.push(values)

            }
        })
        const people = await apiCall("put", "/people/changeTurn", { people: vals })
        if (people.status === 200) {
            window.M.toast({ html: people.message }, 3000)
            const res = await apiCall("get", "/people/people")
            const data = res.status === 200 ? res.data : []
            console.log(data)
            this.setState({ people: data, cpeople: data, currentPage: 1 })
            this.setValues(1, data)
        } else {
            window.M.toast({ html: people.message }, 3000)
        }
    }

    setValues = (page = null, array = null) => {
        const { pagesLimit, currentPage, cpeople } = this.state
        let current
        let data
        if (page === null) {
            current = currentPage
        } else {
            current = page
        }

        if (array === null) {
            data = cpeople
        } else {
            data = array
        }
        const indexLastPost = current * pagesLimit
        const indexFirstPost = indexLastPost - pagesLimit
        const people = data.slice(indexFirstPost, indexLastPost)
        this.setState({ indexLastPost, indexFirstPost, people })
    }

    paginate = (page) => {
        this.setState({ currentPage: page })
        this.setValues(page)
    }

    handleSearch = (e) => {
        e.preventDefault()
        const { filter_name, filter_line, filter_state, filter_turn, cpeople } = this.state
        let flag1 = false
        let flag2 = false
        let flag3 = false
        let flag4 = false

        let array1 = []
        let array2 = []
        let array3 = []
        let array4 = []

        let line = parseInt(filter_line)
        let state = parseInt(filter_state)
        let turn = parseInt(filter_turn)

        if (filter_name !== "") {
            array1 = cpeople.filter(personal => {
                const itemData = personal.names_peo ? personal.names_peo.toUpperCase() : ''.toUpperCase();
                const textData = filter_name.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            flag1 = true
        }

        if (line !== 0 && flag1) {
            array2 = array1.filter(item => item.line_peo === line)
            flag2 = true
        } else if (line !== 0) {
            flag2 = true
            console.log("hola")
            array2 = cpeople.filter(item => item.line_peo === line)
        }

        if (turn !== 0 && flag2) {
            array3 = array2.filter(item => item.turn_peo === turn)
            flag3 = true
        } else if (turn !== 0) {
            flag3 = true
            array3 = cpeople.filter(item => item.turn_peo === turn)
        }

        if (state !== 0 && flag3) {
            array4 = array3.filter(item => item.state_peo === state)
            flag4 = true
        } else if (state !== 0) {
            flag4 = true
            array4 = cpeople.filter(item => item.state_peo === state)
        }

        if (flag4) {
            this.setState({ people: array4 })
        } else if (flag3) {
            this.setState({ people: array3 })
        } else if (flag2) {
            this.setState({ people: array2 })
        } else if (flag1) {
            this.setState({ people: array1 })
        } else {
            this.setValues(1, cpeople)
        }

    }

    handleRead = async () => {
        const res = await apiCall("get", "/people/people")
        const people = res.status === 200 ? res.data : []
        this.setState({ people: people, cpeople: people })
    }

    handleCreate = async (e) => {//testeado perfecto
        e.preventDefault()
        const { names_peo, last_name_peo, avatar_peo, phone_peo, state_peo, turn_peo, line_peo, currentPage } = this.state
        if (names_peo !== "" && last_name_peo !== "" && phone_peo !== "" && state_peo !== "" && turn_peo !== "" && line_peo !== "") {
            const people = {
                names_peo,
                last_name_peo,
                phone_peo,
                state_peo,
                turn_peo,
                line_peo,
                avatar_peo: ""
            }

            const res = await apiCall("post", "/people/create", people)
            console.log(res)
            if (res.status === 200) {
                window.M.toast({ html: res.message }, 3000)
                const data = this.state.cpeople
                this.setState({ people: [...data, res.data], cpeople: [...data, res.data], currentPage: 1 })
                this.setValues(1, [...data, res.data])
                this.clearInputs()
            } else {
                window.M.toast({ html: res.message }, 3000)
            }
        } else {
            window.M.toast({ html: 'Por favor ingrese los campos requeridos' }, 3000)
        }

    }

    handleUpdate = async (e, name = null) => {//perfecto
        e.preventDefault()
        const { id_peo, names_peo, last_name_peo, avatar_peo, phone_peo, turn_peo, line_peo, state_peo, cpeople, currentPage } = this.state
        let state = 0
        if (name === "change" && parseInt(state_peo) === 12) {
            state = 13
            console.log(state_peo)
            console.log("Entre 12")
        } else if (name === "change" && parseInt(state_peo) === 13) {
            state = 12
            console.log("Entre 13")
        } else {
            state = parseInt(state_peo)
        }

        let flag = e.target.id === "change_state" ? true : false

        if (names_peo !== "" && last_name_peo !== "" && phone_peo !== "" && state_peo !== 0 && turn_peo !== "" && line_peo !== "") {
            const peoples = {
                id_peo,
                names_peo,
                last_name_peo,
                avatar_peo: "",
                phone_peo,
                state_peo: state,
                turn_peo,
                line_peo
            }

            const res = await apiCall("put", "/people/update", peoples)
            if (res.status === 200) {
                const data = cpeople.map(item => {
                    if (item.id_peo === peoples.id_peo) {
                        return res.data
                    }
                    return item
                })

                if (flag) {
                    window.M.toast({ html: "Estado cambiado correctamente" }, 3000)
                } else {
                    window.M.toast({ html: res.message }, 3000)
                }

                this.setState({ cpeople: data, people: data, currentPage: 1 })
                this.setValues(1, data)
                this.clearInputs()

            } else {
                window.M.toast({ html: res.message }, 3000)
            }
        } else {
            window.M.toast({ html: 'Por favor ingrese los campos requeridos' }, 3000)
        }
    }

    handleDelete = async () => {//testeado perfecto
        const { id_peo, currentPage } = this.state
        if (id_peo !== 0) {
            const response = await apiCall("delete", "/people/delete", { id_peo })
            console.log(response)
            if (response.status === 200) {
                window.M.toast({ html: response.message }, 3000)
                const data = this.state.cpeople.filter(items => items.id_peo !== id_peo)
                this.setState({ people: data, cpeople: data, currentPage: 1 })
                this.setValues(1, data)
                this.clearInputs()
            } else {
                window.M.toast({ html: response.message }, 3000)
            }
        } else {
            window.M.toast({ html: 'Debe seleccionar un elemento para poder realizar esta accion' }, 3000)
        }
    }

    handleCreateProgram = async (e) => {
        e.preventDefault()
        var user = JSON.parse(localStorage.getItem("user"))
        const { id_peo, currentPage, date_prom, cpeople } = this.state
        if (id_peo !== 0 && date_prom !== "") {
            const date = moment(new Date(date_prom))
            let flag = false

            cpeople.map(item => {
                if (item.id_peo === id_peo) {
                    if (item.line_peo === user[0].lead_line) {
                        flag = true
                    }
                }
            })
            if (flag) {
                const program = {
                    people_peo: id_peo,
                    date_prom: date
                }
                const response = await apiCall("post", "/programation/create", program)
                if (response.status === 200) {
                    window.M.toast({ html: response.message }, 3000)
                    this.clearInputs()
                } else {
                    window.M.toast({ html: response.message }, 3000)
                }

            } else {
                window.M.toast({ html: 'No puede realizar programaciones a personal que no pertenece a su linea de manejo' }, 3000)
            }
        } else {
            window.M.toast({ html: 'Debe rellenar los campos requeridos' }, 3000)
        }
    }

    handleOnChange = (e) => {
        console.log(e.target.id)
        this.setState({
            [e.target.id]: e.target.value
        });
        console.log()
    }

    clearInputs = () => {
        this.setState({
            id_peo: 0,
            names_peo: "",
            last_name_peo: "",
            avatar_peo: "",
            phone_peo: "",
            state_peo: 12,
            turn_peo: 9,
            line_peo: 3
        })
    }

    putsFields = (id = null) => {
        const { id_peo, cpeople } = this.state
        let id_find = id === null ? id_peo : id
        if (id_find !== 0) {
            const filter = cpeople.find(item => item.id_peo === id_find)
            this.setState({
                names_peo: filter.names_peo,
                last_name_peo: filter.last_name_peo,
                avatar_peo: "",
                phone_peo: filter.phone_peo,
                state_peo: filter.state_peo,
                turn_peo: filter.turn_peo,
                line_peo: filter.line_peo
            })
        } else {
            window.M.toast({ html: 'Debe seleccionar un elemento para poder realizar esta accion' }, 3000)
        }
        this.setState({})
    }



    render() {
        const { people } = this.state
        const { id_peo, names_peo, last_name_peo, avatar_peo, phone_peo, state_peo, turn_peo, line_peo, cpeople } = this.state
        let tabla
        if (people.length > 0) {

            tabla = people.map((items) => {
                let turno = ""
                let linea = ""
                let estado = ""
                if (items.turn_peo === 9) {
                    turno = "Turno 1"
                } else if (items.turn_peo === 10) {
                    turno = "Turno 2"
                } else {
                    turno = "Turno 3"
                }

                if (items.line_peo === 3) {
                    linea = "Linea 1"
                } else if (items.line_peo === 4) {
                    linea = "Linea 2"
                } else if (items.line_peo === 5) {
                    linea = "Linea 3"
                } else if (items.line_peo === 6) {
                    linea = "Linea 4"
                } else if (items.line_peo === 7) {
                    linea = "Linea 5"
                } else if (items.line_peo === 8) {
                    linea = "No Aplica"
                }

                if (items.state_peo === 12) {
                    estado = "Activo"
                } else {
                    estado = "Inactivo"
                }

                return < tr key={items.id_peo} >
                    <td>
                        <p>
                            <label>
                                <input type="checkbox" value={items.id_peo} checked={items.id_peo === id_peo ? true : false} onChange={() => {
                                    this.putsFields(items.id_peo)
                                    this.setState({ id_peo: items.id_peo })
                                }} />
                                <span />
                            </label>
                        </p>
                    </td>

                    <td>{items.names_peo}</td>
                    <td>{items.last_name_peo}</td>
                    <td>{estado}</td>
                    <td>{turno}</td>
                    <td>{linea}</td>
                    <td>{items.phone_peo}</td>
                </tr >

            })
        }
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div style={{ marginTop: '3%' }} />
                    <form>
                        <div className="row ">
                            <div className="col s12 m12 l4" style={{ marginBottom: '2%' }}>
                                <div className="Input">
                                    <input value={this.state.filter_name} type="text" id="filter_name" className="Input-text browser-default" placeholder="Busqueda de usuario" onChange={this.handleOnChange} />

                                </div>
                            </div>
                            <div className="input-field col s12 m4 l2">
                                <select onChange={this.handleOnChange} id="filter_line" value={this.state.filter_line} >
                                    <option value disabled selected>Filtrar por linea</option>
                                    <option value={3}>Linea 1</option>
                                    <option value={4}>Linea 2</option>
                                    <option value={5}>Linea 3</option>
                                    <option value={6}>Linea 4</option>
                                    <option value={7}>Linea 5</option>
                                    <option value={0}>Sin filtro</option>
                                </select>
                                <label>Linea</label>
                            </div>
                            <div className="input-field col s6 m4 l2">
                                <select id="filter_turn" onChange={this.handleOnChange} value={this.state.filter_turn}>
                                    <option value disabled selected>Filtrar por turno</option>
                                    <option value={9}>Turno 1</option>
                                    <option value={10}>Turno 2</option>
                                    <option value={11}>Turno 3</option>
                                    <option value={0}>Sin filtro</option>
                                </select>
                                <label>Turno</label>
                            </div>
                            <div className="input-field col s6 m4 l2">
                                <select id="filter_state" onChange={this.handleOnChange} value={this.state.filter_state}>
                                    <option value disabled selected>Filtrar por estado</option>
                                    <option value={12}>Activo</option>
                                    <option value={13}>Inactivo</option>
                                    <option value={0}>Sin filtro</option>

                                </select>
                                <label>Estado</label>
                            </div>
                            <div>
                                <button className="btn" onClick={this.handleSearch}>Filtrar</button>
                            </div>
                        </div>
                    </form>

                    <table className="responsive-table centered highlight striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Estado</th>
                                <th>Turno</th>
                                <th>Linea</th>
                                <th>Celular</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabla}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <a className="btn-floating btn-large" style={{ backgroundColor: '#0B1B4F' }}>
                            <i className="large material-icons">menu</i>
                        </a>
                        <ul>
                            <li><a id="change_state" onClick={(e) => { this.handleUpdate(e, "change") }} className="btn-floating" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">track_changes</i></a></li>
                            <li><a onClick={this.handleChangeTurn} className="btn-floating waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">published_with_changes</i></a></li>
                            <li><a href="#create_personal" className="btn-floating modal-trigger waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">add</i></a></li>
                            <li><a href="#update_personal" onClick={this.putsFields} className={id_peo !== 0 ? "btn-floating modal-trigger" : "btn-floating"} style={{ backgroundColor: '#0C0966' }}><i className="material-icons">update</i></a></li>
                            <li><a onClick={this.handleDelete} className="btn-floating " style={{ backgroundColor: '#0C0966' }}><i className="material-icons">delete</i></a></li>
                            <li><a href="#create_program" onClick={(e) => {
                                if (id_peo === 0) {
                                    window.M.toast({ html: 'Debe seleccionar un elemento para poder realizar esta accion' }, 3000)
                                }
                            }} className={this.state.id_peo !== 0 ? "btn-floating modal-trigger" : "btn-floating"} style={{ backgroundColor: '#0C0966' }}><i className="material-icons">alarm_add</i></a></li>
                        </ul>
                    </div>

                    <Pagination recordsPerPage={5} totalRecords={cpeople.length} paginate={this.paginate} currentPage={this.state.currentPage} />

                    <div id="create_personal" className="modal" >
                        <div className="modal-content">
                            <h4>Crear Persona</h4>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="names_peo" type="text" onChange={this.handleOnChange} value={names_peo} />
                                    <label htmlFor="names_peo">Nombres</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="last_name_peo" type="text" onChange={this.handleOnChange} value={last_name_peo} />
                                    <label htmlFor="last_name_peo">Apellidos</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="phone_peo" type="number" onChange={this.handleOnChange} value={phone_peo} />
                                    <label htmlFor="phone_peo">Telefono</label>
                                </div>

                                <div class="input-field col s6">
                                    <select id="state_peo" value={state_peo} onChange={this.handleOnChange}>
                                        <option value="" disabled selected>Turno</option>
                                        <option value={9}>Turno 1</option>
                                        <option value={10}>Turno 2</option>
                                        <option value={11}>Turno 3</option>
                                    </select>
                                    <label>Estado de personal</label>
                                </div>

                                <div class="input-field col s12">
                                    <select id="state_peo" value={state_peo} onChange={this.handleOnChange}>
                                        <option value="" disabled selected>Estado</option>
                                        <option value={12}>Activo</option>
                                        <option value={13}>Inactivo</option>
                                    </select>
                                    <label>Estado de personal</label>
                                </div>

                                <div class="input-field col s12">
                                    <select id="line_peo" value={line_peo} onChange={this.handleOnChange}>
                                        <option value="" disabled selected>Linea</option>
                                        <option value={3}>Linea 1</option>
                                        <option value={4}>Linea 2</option>
                                        <option value={5}>Linea 3</option>
                                        <option value={6}>Linea 4</option>
                                        <option value={7}>Linea 5</option>
                                        <option value={8}>No aplica</option>
                                    </select>
                                    <label>Linea de pertenencia</label>
                                </div>
                                {/* <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancelar</a> */}
                                <button onClick={this.handleCreate} className="btn" >Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="update_personal" className="modal">
                    <div className="modal-content">
                        <h4>Actualizar Persona</h4>
                        <div className="row">
                            <form>
                                <div className="input-field col s6">
                                    <input id="names_peo" type="text" className="validate" onChange={this.handleOnChange} value={names_peo} />
                                    <label htmlFor="names_peo" class="active">Nombres</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="last_name_peo" type="text" className="validate" onChange={this.handleOnChange} value={last_name_peo} />
                                    <label htmlFor="last_name_peo" class="active">Apellidos</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="phone_peo" type="text" className="validate" onChange={this.handleOnChange} value={phone_peo} />
                                    <label htmlFor="phone_peo" class="active">Telefono</label>
                                </div>
                                <div class="input-field col s6">
                                    <select id="state_peo" value={state_peo} onChange={this.handleOnChange}>
                                        <option value="" disabled selected>Turno</option>
                                        <option value="9">Turno 1</option>
                                        <option value="10">Turno 2</option>
                                        <option value="11">Turno 3</option>
                                    </select>
                                    <label>Estado de personal</label>
                                </div>

                                <div class="input-field col s12">
                                    <select id="state_peo" value={state_peo} onChange={this.handleOnChange}>
                                        <option value="" disabled selected>Estado</option>
                                        <option value="12">Activo</option>
                                        <option value="13">Inactivo</option>
                                    </select>
                                    <label>Estado de personal</label>
                                </div>

                                <div class="input-field col s12">
                                    <select id="line_peo" value={line_peo} onChange={this.handleOnChange}>
                                        <option value="" disabled selected>Linea</option>
                                        <option value="3">Linea 1</option>
                                        <option value="4">Linea 2</option>
                                        <option value="5">Linea 3</option>
                                        <option value="6">Linea 4</option>
                                        <option value="7">Linea 5</option>
                                        <option value="8">No aplica</option>
                                    </select>
                                    <label>Linea de pertenencia</label>
                                </div>
                                <button onClick={this.handleUpdate} className="btn" >Guardar</button>
                            </form>
                        </div>

                    </div>
                    {/* <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Guardar</a>
                        </div> */}
                </div>

                <div id="create_program" className="modal">
                    <div className="modal-content">
                        <h4>Programar personal</h4>
                        <div className="row">
                            <form>
                                <div className="input-field col s12">
                                    <input id="date_prom" type="date" onChange={this.handleOnChange} />
                                    <label htmlFor="date_prom">Fecha de programacion</label>
                                </div>
                                <div>
                                    <button className="btn" onClick={this.handleCreateProgram} >Guardar</button>
                                </div>
                            </form>
                        </div>

                    </div>
                    {/* <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Guardar</a>
                        </div> */}
                </div>

            </div>


        )
    }
}

export default ManagementPersonal
