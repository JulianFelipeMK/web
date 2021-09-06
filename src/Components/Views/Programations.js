import React, { Component } from 'react'
import { apiCall } from '../../Api/ApiWrapper'
import Navbar from '../Subcomponents/Navbar'
import M from 'materialize-css';

export class Programations extends Component {

    state = {
        programations: [],
        cprogramations: [],

        id_prom: 0
    }

    componentDidMount = () => {
        M.AutoInit()
        this.handleRead()
    }

    handleRead = async () => {
        const res = await apiCall("get", "/programation/programation")
        const programations = res.status === 200 ? res.data : []
        console.log(programations)
        this.setState({ cprogramations: programations, programations })
    }

    filterLine = async (e) => {
        const { value, programations } = e.target
        if (value !== 0) {
            let data = []
            //data = programations.filter(item => item)
        }
    }

    handleDelete = async () => {
        const { id_prom, cprogramations } = this.state
        if (id_prom !== 0) {
            const res = await apiCall("delete", "programation/delete", { id_prom })
            if (res.status === 200) {
                window.M.toast({ html: res.message }, 3000)
                const data = cprogramations.filter(items => items.id_prom !== id_prom)
                this.setState({ cprogramations: data, programations: data })
            } else {
                window.M.toast({ html: res.message }, 3000)
            }
        } else {
            window.M.toast({ html: "Debe seleccionar un item para realizar esta accion" }, 3000)
        }
    }

    render() {
        const { programations, id_prom } = this.state
        let tabla = <div>NO hay nada que mostrar</div>
        if (programations.length > 0) {
            tabla = programations.map(item => {
                let linea = ""

                if (item.people.line_peo === 3) {
                    linea = "Linea 1"
                } else if (item.people.line_peo === 4) {
                    linea = "Linea 2"
                } else if (item.people.line_peo === 5) {
                    linea = "Linea 3"
                } else if (item.people.line_peo === 6) {
                    linea = "Linea 4"
                } else if (item.people.line_peo === 7) {
                    linea = "Linea 5"
                } else if (item.people.line_peo === 8) {
                    linea = "No Aplica"
                }
                return <tr key={item.id_prom} >
                    <td>
                        <p>
                            <label>
                                <input type="checkbox" value={item.id_prom} checked={item.id_prom === id_prom ? true : false} onChange={() => {
                                    this.setState({ id_prom: item.id_prom })
                                }} />
                                <span />
                            </label>
                        </p>
                    </td>

                    <td>{item.people.name_peo + " " + item.people.last_name_peo}</td>
                    <td>{linea}</td>
                    <td>{item.date_prom}</td>
                    <td>{item.days_prom}</td>
                    <td>{item.note_prom}</td>
                </tr >
            })
        }

        return (
            <div >
                <Navbar></Navbar>

                <div className="container row">
                    <div style={{ marginBottom: "50px", marginTop: "40px" }} className="col s12">
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

                    <table className="responsive-table centered highlight striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre de persona asignada</th>
                                <th>Linea de pertenencia</th>
                                <th>Fecha de inicio</th>
                                <th>Dias de inhabilitacion</th>
                                <th>Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabla}
                        </tbody>
                    </table>
                </div>


                <div class="fixed-action-btn" onClick={this.handleDelete}>
                    <a class="btn-floating btn-large" >
                        <i class="large material-icons">delete</i>
                    </a>
                </div>

            </div>
        )
    }
}

export default Programations
