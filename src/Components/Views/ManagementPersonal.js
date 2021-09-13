import React, { Component } from 'react'
import M from 'materialize-css';
import Navbar from '../Subcomponents/Navbar';
import { apiCall } from './../../Api/ApiWrapper'
import axios from 'axios';
import Pagination from '../Subcomponents/Pagination';
import moment from 'moment';
import Select from 'react-select';

export class ManagementPersonal extends Component {

    state = {
        cpeople: [],
        fpeople: [],
        people: [],
        subdomains: [],
        loading: false,
        filter: false,

        checked: false,
        id_peo: 0,
        names_peo: "",
        last_name_peo: "",
        email_peo: "",
        password_use: "",
        sharp_peo: "",
        rol_use: 1,
        avatar_peo: "",
        phone_peo: "",
        reason_peo: 39,
        state_peo: 12,
        turn_peo: 9,
        line_peo: 3,
        cargo_peo: 14,
        handle_lines_peo: [],

        cargosSelect: [],
        razonesSelect: [],

        open: true,
        pagesLimit: 5,
        currentPage: 1,
        indexLastPost: 0,
        indexFirstPost: 0,

        people_peo: 0,
        date_prom: "",
        state_prom: false,
        note_prom: "",
        days_prom: 0,

        filter_line: 0,
        filter_state: 0,
        filter_turn: 0,
        filter_name: ""
    }

    componentDidMount = async () => {
        M.AutoInit()
        await this.handleRead()
        //this.setValues()
    }

    handleChangeTurn = async () => {// sin probar
        const { cpeople, currentPage } = this.state
        var user = JSON.parse(localStorage.getItem("user"))
        let flag = false
        let vals = []
        let lines = user[0].handle_lines_peo !== null ? this.handleLines(user[0].handle_lines_peo) : []


        flag = true
        if (lines.length > 0) {
            cpeople.map(item => {
                if (lines.length > 0) {
                    flag = true
                    lines.map(line => {
                        if (item.line_peo === line.value) {
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
                            } else if (item.turn_gen_peo === 10) {
                                if (item.turn_peo === 10) {
                                    values.turn_peo = 9
                                } else {
                                    values.turn_peo = 10
                                }
                            } else if (item.turn_gen_peo === 11) {
                                if (item.turn_peo === 11) {
                                    values.turn_peo = 10
                                } else {
                                    values.turn_peo = 11
                                }
                            }
                            vals.push(values)
                        }
                    })
                }
            })
        }



        if (flag) {
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
        } else {
            window.M.toast({ html: "Usted debe tener al menos una linea asignada para realizar esta accion" }, 3000)
        }
    }

    setValues = (page = null, array = null, filt = null) => {
        const { pagesLimit, currentPage, cpeople, filter, fpeople } = this.state
        let current
        let data
        let filtering = false

        if (page === null) {
            current = currentPage
        } else {
            current = page
        }

        if (filt !== null) {
            data = array
            filtering = true
        } else {
            if (filter) {
                data = fpeople
                filtering = true
            } else if (array !== null) {
                data = array
                console.log("entre")
            } else {
                data = cpeople
            }

        }

        const indexLastPost = current * pagesLimit
        const indexFirstPost = indexLastPost - pagesLimit
        const people = data.slice(indexFirstPost, indexLastPost)
        this.setState({ indexLastPost, indexFirstPost, people, filter: filtering, fpeople: data })
    }

    paginate = (page) => {
        this.setState({ currentPage: page })
        this.setValues(page)
    }

    handleSearch = (e) => {
        e.preventDefault()
        const { filter_name, filter_line, filter_state, filter_turn, cpeople, currentPage } = this.state
        let flag1 = filter_name !== "" ? true : false
        let flag2 = filter_line != 0 ? true : false
        let flag3 = filter_state != 0 ? true : false
        let flag4 = filter_turn != 0 ? true : false

        let array1 = []

        let line = parseInt(filter_line)
        let state = parseInt(filter_state)
        let turn = parseInt(filter_turn)

        if (flag1) {
            array1 = cpeople.filter(personal => {
                const itemData = personal.name_peo ? personal.name_peo.toUpperCase() : ''.toUpperCase();
                const textData = filter_name.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
        }

        if (flag2) {
            if (flag1) {
                const temp = array1
                array1 = temp.filter(item => item.line_peo === line)
                flag2 = true
            } else {
                array1 = cpeople.filter(item => item.line_peo === line)
            }
        }

        if (flag3) {
            if (flag1 || flag2) {
                const temp = array1
                array1 = temp.filter(item => item.state_peo === state)
                flag3 = true
            } else {
                array1 = cpeople.filter(item => item.state_peo === state)
            }

        }

        if (flag4) {
            if (flag1 || flag2 || flag3) {
                const temp = array1
                array1 = temp.filter(item => item.turn_peo === turn)
                flag4 = true
            } else {
                array1 = cpeople.filter(item => item.turn_peo === turn)
            }

        }

        if (flag4 || flag3 || flag2 || flag1) {
            this.setValues(currentPage, array1, true)
        } else {
            this.setValues(currentPage, cpeople, false)
        }

    }

    handleRead = async () => {
        const resd = await apiCall("get", "/people/subs")
        const subdomains = resd.status === 200 ? resd.data : []
        const res = await apiCall("get", "/people/people")
        const people = res.status === 200 ? res.data : []
        const cargosSelect = []
        const razonesSelect = []

        subdomains.map(item => {
            if (item.name_dom === 5) {
                const value = {
                    label: item.value_sub,
                    value: item.id_sub
                }
                cargosSelect.push(value)
            }

            if (item.name_dom === 6) {
                const value = {
                    label: item.value_sub,
                    value: item.id_sub
                }
                razonesSelect.push(value)
            }
        })


        this.setState({ people: people, cpeople: people, fpeople: people, subdomains, cargosSelect, razonesSelect })
        this.setValues(this.state.currentPage, people)
    }

    codeLines = (values) => {
        let string = ""
        let flag = false
        if (values.length > 0) {
            values.map((item, i) => {
                if (item.value === 3) {
                    if (flag) {
                        string = string + ",3"
                    } else {
                        string = "3"
                        flag = true
                    }
                }

                if (item.value === 4) {
                    if (flag) {
                        string = string + ",4"
                    } else {
                        string = "4"
                        flag = true
                    }

                }

                if (item.value === 5) {
                    if (flag) {
                        string = string + ",5"
                    } else {
                        string = "5"
                        flag = true
                    }
                }

                if (item.value === 6) {
                    if (flag) {
                        string = string + ",6"
                    } else {
                        string = "6"
                        flag = true
                    }
                }

                if (item.value === 7) {
                    if (flag) {
                        string = string + ",7"
                    } else {
                        string = "7"
                        flag = true
                    }
                }

                if (item.value === 8) {
                    if (flag) {
                        string = string + ",8"
                    } else {
                        string = "8"
                        flag = true
                    }
                }
            })
        }
        return string
    }

    handleCreate = async (e) => {//testeado perfecto
        e.preventDefault()
        const { names_peo, last_name_peo, rol_use, sharp_peo, password_use, email_peo, phone_peo, state_peo, turn_peo, line_peo, cargo_peo, handle_lines_peo, currentPage } = this.state
        if (names_peo !== "" && last_name_peo !== "" && phone_peo !== "" && state_peo !== "" && turn_peo !== "" && line_peo !== "" && sharp_peo !== "" && cargo_peo !== "") {
            let email = ""
            let pass = ""
            let rol = ""
            let lines = null

            if (email_peo === "") {
                email = null
                pass = null
                rol = null
            } else {
                email = email_peo
                pass = password_use
                rol = rol_use
            }

            if (handle_lines_peo.length > 0) {
                lines = this.codeLines(handle_lines_peo)
            }

            const people = {
                name_peo: names_peo,
                last_name_peo,
                phone_peo,
                state_peo,
                turn_peo,
                line_peo,
                email_peo: email,
                password_use: pass,
                sharp_peo,
                rol_use: rol,
                cargo_peo,
                avatar_peo: "",
                handle_lines_peo: lines
            }

            const res = await apiCall("post", "/people/create", people)
            console.log(res)
            if (res.status === 200) {
                window.M.toast({ html: res.message }, 3000)
                const data = this.state.cpeople
                this.setState({ people: [...data, res.data], cpeople: [...data, res.data] })
                this.setValues(currentPage, [...data, res.data], false)
                this.clearInputs()
            } else {
                window.M.toast({ html: res.message }, 3000)
            }
        } else {
            window.M.toast({ html: 'Por favor ingrese los campos requeridos' }, 3000)
        }

    }

    handleUpdate = async (e, name = null) => {//perfecto, sin probar cambio de estado
        e.preventDefault()
        const { id_peo, names_peo, last_name_peo, rol_use, sharp_peo, password_use, email_peo, phone_peo, state_peo, turn_peo, line_peo, cargo_peo, handle_lines_peo, reason_peo, cpeople, currentPage } = this.state
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

        if (names_peo !== "" && last_name_peo !== "" && phone_peo !== "" && state_peo !== 0 && turn_peo !== "" && line_peo !== "" && sharp_peo !== "" && cargo_peo !== "") {
            let lines = null
            let email = email_peo !== null ? email_peo : null
            let reason = reason_peo !== null ? reason_peo : null
            let pass = password_use !== null ? password_use : null
            let rol = rol_use !== null ? rol_use : null

            if (handle_lines_peo.length > 0) {
                lines = this.codeLines(handle_lines_peo)
            }

            const peoples = {
                id_peo,
                names_peo,
                last_name_peo,
                avatar_peo: "",
                phone_peo,
                state_peo: state,
                turn_peo,
                line_peo,
                password_use: pass,
                reason_peo: reason,
                email_peo: email,
                handle_lines_peo: lines,
                sharp_peo,
                cargo_peo,
                rol_use: rol
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

                this.setState({ cpeople: data })
                this.setValues(currentPage, data)
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
                this.setState({ cpeople: data })
                this.setValues(currentPage, data, false)
                this.clearInputs()
            } else {
                window.M.toast({ html: response.message }, 3000)
            }
        } else {
            window.M.toast({ html: 'Debe seleccionar un elemento para poder realizar esta accion' }, 3000)
        }
    }

    handleLines = (lines) => {
        const values = lines.split(",")
        const selected = []
        values.map(item => {
            if (item === "3") {
                const val = { label: "Linea 1", value: 3 }
                selected.push(val)
            }

            if (item === "4") {
                const val = { label: "Linea 2", value: 4 }
                selected.push(val)
            }

            if (item === "5") {
                const val = { label: "Linea 3", value: 5 }
                selected.push(val)
            }

            if (item === "6") {
                const val = { label: "Linea 4", value: 6 }
                selected.push(val)
            }
            if (item === "7") {
                const val = { label: "Linea 5", value: 7 }
                selected.push(val)
            }

        })
        return selected
    }

    handleCreateProgram = async (e) => {//perfecto
        e.preventDefault()
        var user = JSON.parse(localStorage.getItem("user"))
        const { id_peo, currentPage, date_prom, days_prom, note_prom, reason_peo, cpeople } = this.state
        console.log(note_prom)
        if (id_peo !== 0 && date_prom !== "" && days_prom !== "", note_prom !== "" && reason_peo !== "") {

            const date = moment(new Date(date_prom)).format("YYYY/MM/DD")
            let flag = false
            let lines = user[0].handle_lines_peo !== null ? this.handleLines(user[0].handle_lines_peo) : null

            cpeople.map(item => {
                if (item.id_peo === id_peo) {
                    if (lines !== null)
                        lines.map(line => {
                            if (item.line_peo === line.value) {
                                flag = true
                            }
                        })
                }
            })

            if (flag) {
                const program = {
                    people_peo: id_peo,
                    date_prom: date,
                    days_prom: parseInt(days_prom),
                    note_prom: note_prom,
                    reason_prom: reason_peo
                }
                const response = await apiCall("post", "/programation/create", program)
                if (response.status === 200) {
                    window.M.toast({ html: response.message }, 3000)
                    this.clearInputs()
                } else {
                    window.M.toast({ html: response.message }, 3000)
                }

            } else {
                window.M.toast({ html: 'El personal a programar debe estar en su linea de manejo' }, 3000)
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
            sharp_peo: "",
            email_peo: "",
            password_use: "",
            cargo_peo: 14,
            state_peo: 12,
            turn_peo: 9,
            line_peo: 3
        })
    }

    handleLines = (lines) => {
        const values = lines.split(",")
        const selected = []
        values.map(item => {
            if (item === "3") {
                const val = { label: "Linea 1", value: 3 }
                selected.push(val)
            }

            if (item === "4") {
                const val = { label: "Linea 2", value: 4 }
                selected.push(val)
            }

            if (item === "5") {
                const val = { label: "Linea 3", value: 5 }
                selected.push(val)
            }

            if (item === "6") {
                const val = { label: "Linea 4", value: 6 }
                selected.push(val)
            }
            if (item === "7") {
                const val = { label: "Linea 5", value: 7 }
                selected.push(val)
            }

        })
        return selected
    }

    putsFields = (id = null) => {
        const { id_peo, cpeople } = this.state
        let id_find = id === null ? id_peo : id

        if (id_find !== 0) {
            const filter = cpeople.find(item => item.id_peo === parseInt(id_find))
            const lines = filter.handle_lines_peo === null ? [] : this.handleLines(filter.handle_lines_peo)
            this.setState({
                names_peo: filter.name_peo,
                last_name_peo: filter.last_name_peo,
                avatar_peo: "",
                phone_peo: filter.phone_peo,
                state_peo: filter.state_peo,
                turn_peo: filter.turn_peo,
                line_peo: filter.line_peo,
                cargo_peo: filter.cargo_peo,
                email_peo: filter.email_peo,
                password_use: filter.password_use,
                rol_use: filter.rol_use,
                sharp_peo: filter.sharp_peo,
                reason_peo: filter.reason_peo,
                handle_lines_peo: lines
            })
        } else {
            window.M.toast({ html: 'Debe seleccionar un elemento para poder realizar esta accion' }, 3000)
        }
        this.setState({})
    }

    render() {
        const { people } = this.state
        const { subdomains } = this.state
        const { id_peo, names_peo, last_name_peo, phone_peo, state_peo, sharp_peo, cargo_peo, turn_peo, line_peo, checked, password_use, email_peo, rol_use, reason_peo, cargosSelect, razonesSelect } = this.state

        let tabla = <div>NO hay nada que mostrar</div>
        console.log(this.state.cargo_peo)
        if (people.length > 0) {

            tabla = people.map((items) => {

                let cargo = " "
                let turno = ""
                let linea = ""
                let estado = ""

                subdomains.map((item) => {
                    if (item.id_sub === items.cargo_peo) {
                        cargo = item.value_sub
                    }
                })

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

                let turnop = ""

                if (items.turn_gen_peo === 9) {
                    if (items.turn_peo === 9) {
                        turnop = "Turno 3"
                    } else {
                        turnop = "Turno 1"
                    }
                } else if (items.turn_gen_peo === 10) {
                    if (items.turn_peo === 10) {
                        turnop = "Turno 3"
                    } else {
                        turnop = "Turno 2"
                    }
                } else if (items.turn_gen_peo === 11) {
                    if (items.turn_peo === 11) {
                        turnop = "Turno 2"
                    } else {
                        turnop = "Turno 3"
                    }
                }

                return < tr key={items.id_peo} >
                    <td>
                        <p>
                            <label>
                                <input type="checkbox" value={items.id_peo} checked={items.id_peo === id_peo && checked ? true : false} onChange={() => {
                                    if (!checked) {
                                        this.putsFields(items.id_peo)
                                        this.setState({ id_peo: items.id_peo, checked: true })
                                    } else {
                                        this.clearInputs()
                                        this.setState({ id_peo: 0, checked: false })
                                    }
                                }} />
                                <span />
                            </label>
                        </p>
                    </td>

                    <td>{items.name_peo}</td>
                    <td>{items.last_name_peo}</td>
                    <td>{estado}</td>
                    <td>{turno}</td>
                    <td>{turnop}</td>
                    <td>{linea}</td>
                    <td>{items.phone_peo}</td>
                    <td>{cargo}</td>

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
                                <th>Proximo turno</th>
                                <th>Linea</th>
                                <th>Celular</th>
                                <th>Cargo</th>
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
                            <li><a onClick={this.handleChangeTurn} className="btn-floating waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">published_with_changes</i></a></li>
                            <li><a href="#create_personal" className="btn-floating modal-trigger waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">add</i></a></li>
                            <li><a href="#update_personal" onClick={(e) => {
                                if (id_peo === 0) {
                                    window.M.toast({ html: 'Debe seleccionar un elemento para poder realizar esta accion' }, 3000)
                                }
                            }} className={id_peo !== 0 ? "btn-floating modal-trigger" : "btn-floating"} style={{ backgroundColor: '#0C0966' }}><i className="material-icons">update</i></a></li>
                            <li><a onClick={this.handleDelete} className="btn-floating " style={{ backgroundColor: '#0C0966' }}><i className="material-icons">delete</i></a></li>
                            <li><a href="#create_program" onClick={(e) => {
                                if (id_peo === 0) {
                                    window.M.toast({ html: 'Debe seleccionar un elemento para poder realizar esta accion' }, 3000)
                                }
                            }} className={this.state.id_peo !== 0 ? "btn-floating modal-trigger" : "btn-floating"} style={{ backgroundColor: '#0C0966' }}><i className="material-icons">alarm_add</i></a></li>
                        </ul>
                    </div>

                    <Pagination recordsPerPage={5} totalRecords={this.state.fpeople.length} paginate={this.paginate} currentPage={this.state.currentPage} />

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
                                <div className="input-field col s6">
                                    <input id="sharp_peo" type="text" className="validate" onChange={this.handleOnChange} value={sharp_peo} />
                                    <label htmlFor="sharp_peo" class="active">Codigo Sharp</label>
                                </div>

                                <div className="input-field col s6">
                                    <input id="email_peo" type="email" className="validate" onChange={this.handleOnChange} value={email_peo} />
                                    <label htmlFor="email_peo" class="active">Email (Opcional)</label>
                                </div>

                                <div className="input-field col s6">
                                    <input id="password_use" type="password" className="validate" onChange={this.handleOnChange} value={password_use} />
                                    <label htmlFor="password_use" class="active">Contraseña (Opcional)</label>
                                </div>

                                <div class="input-field col s6">
                                    <select id="rol_use" value={rol_use} onChange={this.handleOnChange}>
                                        <option value="" disabled selected>Turno</option>
                                        <option value={1}>Lider</option>
                                        <option value={2}>Administrador</option>
                                    </select>
                                    <label>Rol de usuario (opcional)</label>
                                </div>


                                <div class="input-field col s6">
                                    <select id="turn_peo" value={turn_peo} onChange={this.handleOnChange}>
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

                                <div className="col s12" style={{ marginBottom: "10px" }}>
                                    <span>Seleccione un cargo</span>
                                    <Select
                                        defaultValue={cargo_peo}
                                        onChange={(e) => this.setState({ cargo_peo: e.value })}
                                        className="basic-single"
                                        classNamePrefix="Seleccione un cargo"
                                        isSearchable={true}
                                        name="color"
                                        options={cargosSelect} />
                                </div>

                                <div className="col s12" style={{ marginBottom: "10px" }}>
                                    <span>Lineas asignadas</span>
                                    <Select
                                        value={this.state.handle_lines_peo}
                                        onChange={(e) => this.setState({ handle_lines_peo: e })}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        options={[
                                            { label: "Linea 1", value: 3 },
                                            { label: "Linea 2", value: 4 },
                                            { label: "Linea 3", value: 5 },
                                            { label: "Linea 4", value: 6 },
                                            { label: "Linea 5", value: 7 }
                                        ]}
                                        isMulti />
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
                            <div className="input-field col s6">
                                <input id="names_peo" type="text" onChange={this.handleOnChange} value={names_peo} />
                                <label htmlFor="names_peo" class="active">Nombres</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="last_name_peo" type="text" onChange={this.handleOnChange} value={last_name_peo} />
                                <label htmlFor="last_name_peo" class="active">Apellidos</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="phone_peo" type="number" onChange={this.handleOnChange} value={phone_peo} />
                                <label htmlFor="phone_peo" class="active">Telefono</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="sharp_peo" type="text" className="validate" onChange={this.handleOnChange} value={sharp_peo} />
                                <label htmlFor="sharp_peo" class="active">Codigo Sharp</label>
                            </div>

                            <div className="input-field col s6">
                                <input id="email_peo" type="email" className="validate" onChange={this.handleOnChange} value={email_peo} />
                                <label htmlFor="email_peo" class="active">Email (Opcional)</label>
                            </div>

                            <div className="input-field col s6">
                                <input id="password_use" type="password" className="validate" onChange={this.handleOnChange} value={password_use} />
                                <label htmlFor="password_use" class="active">Contraseña (Opcional)</label>
                            </div>

                            <div class="input-field col s6">
                                <select id="rol_use" value={rol_use} onChange={this.handleOnChange}>
                                    <option value="" disabled selected>Turno</option>
                                    <option value={1}>Lider</option>
                                    <option value={2}>Administrador</option>
                                </select>
                                <label>Rol de usuario (opcional)</label>
                            </div>

                            <div class="input-field col s6">
                                <select id="turn_peo" value={turn_peo} onChange={this.handleOnChange}>
                                    <option value="" disabled selected>Turno</option>
                                    <option value={9}>Turno 1</option>
                                    <option value={10}>Turno 2</option>
                                    <option value={11}>Turno 3</option>
                                </select>
                                <label>Turno de personal</label>
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

                            <div className="col s12" style={{ marginBottom: "10px" }}>
                                <span>Seleccione un cargo</span>
                                <Select
                                    defaultValue={cargo_peo}
                                    onChange={(e) => this.setState({ cargo_peo: e.value })}
                                    className="basic-single"
                                    classNamePrefix="Seleccione un cargo"
                                    name="color"
                                    options={cargosSelect} />
                            </div>

                            <div class="input-field col s12">
                                <span>Seleccione una razon de ausentismo</span>
                                <Select
                                    disabled={state_peo === 13 ? false : true}
                                    onChange={(e) => this.setState({ reason_peo: e.value })}
                                    className="basic-single"
                                    classNamePrefix="Seleccione una razon de ausentismo"
                                    value={reason_peo}
                                    isSearchable={true}
                                    name="color"
                                    options={razonesSelect} />
                            </div>

                            <div className="col s12" style={{ marginBottom: "10px" }}>
                                <span>Lineas asignadas</span>
                                <Select
                                    value={this.state.handle_lines_peo}
                                    onChange={(e) => this.setState({ handle_lines_peo: e })}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    options={[
                                        { label: "Linea 1", value: 3 },
                                        { label: "Linea 2", value: 4 },
                                        { label: "Linea 3", value: 5 },
                                        { label: "Linea 4", value: 6 },
                                        { label: "Linea 5", value: 7 }
                                    ]}
                                    isMulti />
                            </div>

                            <button onClick={this.handleUpdate} className="btn" >Guardar</button>

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
                                <div className="input-field col s6">
                                    <input id="date_prom" type="date" onChange={this.handleOnChange} />
                                    <label htmlFor="date_prom">Fecha de programacion</label>
                                </div>

                                <div className="input-field col s6">
                                    <input id="days_prom" type="number" onChange={this.handleOnChange} />
                                    <label htmlFor="days_prom">Dias de ausentismo</label>
                                </div>

                                <div className="input-field col s12">
                                    <input id="note_prom" type="text" onChange={this.handleOnChange} />
                                    <label htmlFor="note_prom">Nota</label>
                                </div>

                                <div className="input-field col s12">
                                    <span>Seleccione una razon de ausentismo</span>
                                    <Select
                                        disabled={state_peo === 13 ? false : true}
                                        onChange={(e) => this.setState({ reason_peo: e.value })}
                                        className="basic-single"
                                        classNamePrefix="Seleccione una razon de ausentismo"
                                        defaultValue={reason_peo}
                                        isSearchable={true}
                                        name="color"
                                        options={razonesSelect} />
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

            </div >


        )
    }
}

export default ManagementPersonal
