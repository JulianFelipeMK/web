import React, { Component } from 'react'
import M from 'materialize-css';
import Navbar from '../Subcomponents/Navbar';

export class ManagementPersonal extends Component {

    componentDidMount = () => {
        M.AutoInit()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div style={{ marginTop: '3%' }} />
                    <form>
                        <div className="row ">
                            <div className="col s12 m12 l6" style={{ marginBottom: '2%' }}>
                                <div className="Input">
                                    <input type="text" id="input" className="Input-text browser-default" placeholder="Busqueda de usuario" />
                                    <label htmlFor="input" className="Input-label">First name</label>
                                </div>
                            </div>
                            <div className="input-field col s12 m4 l2">
                                <select>
                                    <option value disabled selected>Filtrar por linea</option>
                                    <option value={1}>Option 1</option>
                                    <option value={2}>Option 2</option>
                                    <option value={3}>Option 3</option>
                                </select>
                                <label>Linea</label>
                            </div>
                            <div className="input-field col s6 m4 l2">
                                <select>
                                    <option value disabled selected>Filtrar por turno</option>
                                    <option value={1}>Option 1</option>
                                    <option value={2}>Option 2</option>
                                    <option value={3}>Option 3</option>
                                </select>
                                <label>Turno</label>
                            </div>
                            <div className="input-field col s6 m4 l2">
                                <select>
                                    <option value disabled selected>Filtrar por estado</option>
                                    <option value={1}>Option 1</option>
                                    <option value={2}>Option 2</option>
                                    <option value={3}>Option 3</option>
                                </select>
                                <label>Estado</label>
                            </div>
                        </div>
                    </form>
                    <table className="responsive-table centered highlight striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Linea</th>
                                <th>Turno</th>
                                <th>Estado</th>
                                <th>Celular</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p>
                                        <label>
                                            <input type="checkbox" />
                                            <span />
                                        </label>
                                    </p>
                                </td>
                                <td>Juan</td>
                                <td>Ramirez</td>
                                <td>1</td>
                                <td>1</td>
                                <td>Activo</td>
                                <td>3135678990</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <a className="btn-floating btn-large" style={{ backgroundColor: '#0B1B4F' }}>
                            <i className="large material-icons">menu</i>
                        </a>
                        <ul>
                            <li><a href="#create_personal" className="btn-floating modal-trigger waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">add</i></a></li>
                            <li><a className="btn-floating modal-trigger waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">update</i></a></li>
                            <li><a href="#!" className="btn-floating waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">delete</i></a></li>
                        </ul>
                    </div>
                    <div id="create_personal" className="modal">
                        <div className="modal-content">
                            <h4>Crear personal</h4>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="names_peo" type="text" className="validate" />
                                    <label htmlFor="names_peo">Nombres</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="last_name_peo" type="text" className="validate" />
                                    <label htmlFor="last_name_peo">Apellidos</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="avatar_use" type="text" className="validate" />
                                    <label htmlFor="avatar_use">Avatar</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="phone_peo" type="text" className="validate" />
                                    <label htmlFor="phone_peo">Telefono</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="turn_peo" type="text" className="validate" />
                                    <label htmlFor="turn_peo">Turno</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="line_peo" type="text" className="validate" />
                                    <label htmlFor="line_peo">Linea</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Guardar</a>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default ManagementPersonal
