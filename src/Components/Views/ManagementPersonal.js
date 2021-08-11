import React, { Component } from 'react'
import M from 'materialize-css';
import Navbar from '../Subcomponents/Navbar';
import { apiCall } from './../../Api/ApiWrapper'
import axios from 'axios';

export class ManagementPersonal extends Component {

    state = {
        people: [],
        loading:false,

     
        id_peo: "",
        names_peo:"",
        last_name_peo:"",
        avatar_peo: "",
        phone_peo: "",
        state_peo: "",
        turn_peo: "",
        line_peo: "",
        
        open:true

      
       

    }

    componentDidMount = async () => {
        M.AutoInit()
        await this.handleRead()
        
    }
    handleRead = async () => {
        const res = await apiCall("get", "/people/people")
        this.setState({ people: res.data })
    }
    insertar=()=>{
      this.setState({insertar: !this.state.insertar})

    }
    
    handleCreate = async (e) => {
        e.preventDefault()
      const { names_peo, last_name_peo, avatar_peo, phone_peo, state_peo, turn_peo, line_peo } = this.state
      if (names_peo !== "" && last_name_peo !== "" && avatar_peo !== "" && phone_peo !== ""  && state_peo !== "" && turn_peo !== "" && line_peo !== "") {
       
        const peoples = {
        names_peo,
        last_name_peo,
        avatar_peo,
        phone_peo,
        state_peo,
        turn_peo,
        line_peo



        }
     const response = await apiCall ("post", "/people/create", peoples)
     if (response.status === 200){
        window.M.toast({ html: response.message  }, 3000)
        const data = this.state.people
        this.setState({ people: [...data, response.data] })
        this.clearInputs()

     }else {
        window.M.toast({ html: response.message }, 3000)
    }
    }else {
        window.M.toast({ html: 'Por favor ingrese los campos requeridos' }, 3000)
    }

    }
    
    handleUpdate = async () => {
    
    }
    handleDelete = async () => {
        const { id_peo } = this.state
        if (id_peo !== 0) {
            const response = await apiCall("delete", "/people/delete", { id_peo })
            console.log(response)
            if (response.status === 200) {
                window.M.toast({ html: response.message }, 3000)
                const data = this.state.people.filter(items => items.id_peo !== id_peo)
                this.setState({ people: data })
                this.clearInputs()
                window.location.replace(true)
            } else {
                window.M.toast({ html: response.message }, 3000)
            }
        } else {
            window.M.toast({ html: 'Debe seleccionar un elemento para poder realizar esta accion' }, 3000)
        }
    }

    handleOnChange = (e) =>{
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
            state_peo: "",
            turn_peo: "",
            line_peo: ""
        })
    }
   

    
    render() {
        const { people } = this.state
        const{id_peo,names_peo,last_name_peo,avatar_peo,phone_peo,state_peo,turn_peo,line_peo} = this.state
        console.log(people)
        let tabla 
        if (people.length >0){
            tabla=people.map((items) =>(

                <tr>
                <td>
                    <p>
                        <label>
                            <input type="checkbox" value={items.id_peo} checked={items.id_peo === id_peo ? true : false} onChange={() => this.setState({ id_peo: items.id_peo })} />
                            <span />
                        </label>
                    </p>
                </td>
                
                <td>{items.names_peo}</td>
                <td>{items.last_name_peo}</td>
                <td>{items.state_peo}</td>
                <td>{items.turn_peo}</td>
                <td>{items.line_peo}</td>
                <td>{items.phone_peo}</td>
            </tr>






            ))






        }
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
                            <li><a href="#create_personal"  className="btn-floating modal-trigger waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">add</i></a></li>
                            <li><a href="update_personal" onClick={this.putsFields}className="btn-floating modal-trigger waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">update</i></a></li>
                            <li><a onClick={this.handleDelete} className="btn-floating waves-effect waves-light" style={{ backgroundColor: '#0C0966' }}><i className="material-icons">delete</i></a></li>
                        </ul>
                    </div>
                    <div id="create_personal" className="modal" >
                        <div className="modal-content">
                            <h4>Crear Persona</h4>
                            <div className="row">
                             <form>
                                <div className="input-field col s6">
                                    <input  id="names_peo" type="text" className="validate"  onChange={this.handleOnChange} value={names_peo} />
                                    <label htmlFor="names_peo">Nombres</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="last_name_peo" type="text" className="validate"  onChange={this.handleOnChange} value={last_name_peo} />
                                    <label htmlFor="last_name_peo">Apellidos</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="avatar_peo" type="text" className="validate"  onChange={this.handleOnChange} value={avatar_peo} />
                                    <label htmlFor="avatar_peo">Avatar</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="phone_peo" type="text" className="validate"   onChange={this.handleOnChange} value={phone_peo} />
                                    <label htmlFor="phone_peo">Telefono</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="state_peo" type="text" className="validate"   onChange={this.handleOnChange} value={state_peo} />
                                    <label htmlFor="state_peo">Estado</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="turn_peo" type="text" className="validate"  onChange={this.handleOnChange} value={turn_peo}/>
                                    <label htmlFor="turn_peo">Turno</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="line_peo" type="text" className="validate"  onChange={this.handleOnChange} value={line_peo} />
                                    <label htmlFor="line_peo">Linea</label>
                                </div>
                                <button  onClick={this.handleCreate} className="btn" >Guardar</button>
                                </form> 
                            </div>
                         
                        </div>
                        {/* <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Guardar</a>
                        </div> */}
                    </div>
                </div>
                <div id="update_personal" className="modal">
                        <div className="modal-content">
                            <h4>Crear Persona</h4>
                            <div className="row">
                             <form>
                                <div className="input-field col s6">
                                    <input  id="names_peo" type="text" className="validate" onChange={this.handleOnChange} value={names_peo} />
                                    <label htmlFor="names_peo">Nombres</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="last_name_peo" type="text" className="validate" onChange={this.handleOnChange} value={last_name_peo} />
                                    <label htmlFor="last_name_peo">Apellidos</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="avatar_peo" type="text" className="validate" onChange={this.handleOnChange} value={avatar_peo} />
                                    <label htmlFor="avatar_peo">Avatar</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="phone_peo" type="text" className="validate" onChange={this.handleOnChange} value={phone_peo} />
                                    <label htmlFor="phone_peo">Telefono</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="state_peo" type="text" className="validate" onChange={this.handleOnChange} value={state_peo} />
                                    <label htmlFor="state_peo">Estado</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="turn_peo" type="text" className="validate"  onChange={this.handleOnChange} value={turn_peo}/>
                                    <label htmlFor="turn_peo">Turno</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="line_peo" type="text" className="validate" onChange={this.handleOnChange} value={line_peo} />
                                    <label htmlFor="line_peo">Linea</label>
                                </div>
                                <button onClick={this.handleCreate} className="btn" >Guardar</button>
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
