import React, { Component } from 'react'
import M from 'materialize-css';
import Navbar from '../Subcomponents/Navbar';
import { Doughnut } from 'react-chartjs-2';
import { Pie} from  'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {PolarArea} from 'react-chartjs-2'
import { apiCall } from '../../Api/ApiWrapper';


export class Graphs extends Component {

  componentDidMount = async () => {
    M.AutoInit()
    await this.handleRead()
  }

  state = {
    people: [],
    line_filter: 3,

    data_donut: [],
    data_lines: [],
    data_cargos:  [],
    data_enferm:  []
  }

  formatData = (array = null, filter = null) => {
    const { people, line_filter } = this.state

    const personas = array === null ? people : array
    let active = 0
    let inactive = 0

    let line_1 = 0
    let line_2 = 0
    let line_3 = 0
    let line_4 = 0
    let line_5 = 0

    let vacaciones = 0
    let enfermedadGeneral = 0
    let covid19=0
    let permisoSindical = 0
    let calamidad = 0
    let compromisoEmpresarial = 0
    let otros = 0

    let envasador = 0
    let etiquetador = 0
    let paster = 0
    let lavadora= 0
    let palet = 0
    let depa = 0
    let operador = 0
    let op3 = 0
    let mecanico = 0
    let soplador = 0
    let varioPack = 0
    let var1 = 0
    let var2 = 0
    let var3 = 0
    let var4 = 0
    let ocme150 = 0
    let ocme80 = 0
    let electricista = 0
    let coordinador = 0
    let planeador = 0
    let liderProduccion = 0
    let liderMantenimiento = 0
    let bte = 0
    let auxAdministrativo = 0
    let variosHab = 0



    const filtro = filter === null ? line_filter : filter

    if (personas.length > 0) {
      console.log("Entre")
      personas.map(item => {
        if (item.line_peo === filtro) {

          if (item.state_peo === 12) {
            active = active + 1
          }

          if (item.state_peo === 13) {
            inactive = inactive + 1
          }
        }
      })

      personas.map(item => {
        if (item.reason_peo === 39) {
          vacaciones = vacaciones + 1
        }

        if (item.reason_peo === 40) {
          enfermedadGeneral = enfermedadGeneral + 1
        }

        if (item.reason_peo === 41) {
          covid19 = covid19 + 1
        }

        if (item.reason_peo === 42) {
           permisoSindical = permisoSindical + 1
        }
        if (item.reason_peo === 43) {
          calamidad = calamidad + 1
        }
        if (item.reason_peo === 44) {
          compromisoEmpresarial = compromisoEmpresarial + 1
        }
        if (item.reason_peo === 45) {
          otros = otros + 1
        }

      })
   



      personas.map(item => {
        if (item.line_peo === 3) {
          line_1 = line_1 + 1
        }

        if (item.line_peo === 4) {
          line_2 = line_2 + 1
        }

        if (item.line_peo === 5) {
          line_3 = line_3 + 1
        }

        if (item.line_peo === 6) {
          line_4 = line_4 + 1
        }

        if (item.line_peo === 7) {
          line_5 = line_5 + 1
        }

        personas.map(item => {
          if (item.line_peo === filtro) {

            if (item.cargo_peo === 14) {
                envasador = envasador + 1
           }
 
  
            if (item.cargo_peo === 15) {
               etiquetador = etiquetador + 1
            }
  
            if (item.cargo_peo === 16) {
              paster = paster + 1
            }
            if (item.cargo_peo === 17) {
              lavadora = lavadora + 1
            }
            if (item.cargo_peo === 18) {
              palet = palet + 1
            }
            if (item.cargo_peo === 19) {
              depa = depa + 1
            }
            if (item.cargo_peo === 20) {
              operador = operador + 1
            }
            if (item.cargo_peo === 21) {
              op3 = op3 + 1
            }
            if (item.cargo_peo === 22) {
              mecanico = soplador + 1
            }
            if (item.cargo_peo === 23) {
              soplador = soplador + 1
            }
            if (item.cargo_peo === 24) {
              varioPack = varioPack + 1
            }
            if (item.cargo_peo === 25) {
              var1 = var1 + 1
            }
            if (item.cargo_peo === 26) {
              var2 = var2 + 1
            }
            if (item.cargo_peo === 27) {
               ocme150 = ocme150 + 1
            }
            if (item.cargo_peo === 28) {
              ocme80 = ocme80 + 1
            }
            if (item.cargo_peo === 29) {
              electricista = electricista + 1
            }
            if (item.cargo_peo === 30) {
              var3 = var3 + 1
            }
            if (item.cargo_peo === 31) {
              var4 = var4 + 1
            }
            if (item.cargo_peo === 32) {
              coordinador = coordinador + 1
            }
            if (item.cargo_peo === 33) {
              planeador = planeador + 1
            }
            if (item.cargo_peo === 34) {
              liderProduccion = liderProduccion + 1
            }
            if (item.cargo_peo === 35) {
              liderMantenimiento = liderMantenimiento + 1
            }
            if (item.cargo_peo === 36) {
              bte = bte + 1
            }
            if (item.cargo_peo === 37) {
              auxAdministrativo = auxAdministrativo + 1
            }
            if (item.cargo_peo === 38) {
              variosHab = variosHab + 1
            }
            

          }
        })
    

      })
    }

    const data_lines = [line_1, line_2, line_3, line_4, line_5]
    const data_donut = [active, inactive]
    const data_cargos = [envasador, etiquetador,paster,lavadora,palet,depa,operador,op3,mecanico,soplador,varioPack,var1,var2,ocme150,ocme80,electricista,var3,var4,coordinador,planeador,liderProduccion,liderMantenimiento,bte,auxAdministrativo,variosHab]
    const data_enferm = [vacaciones,enfermedadGeneral,covid19,permisoSindical,calamidad,compromisoEmpresarial,otros]
    this.setState({ data_lines, data_donut, data_cargos,data_enferm })
  }

  handleRead = async () => {
    const res = await apiCall("get", "/people/people")

    const people = res.status === 200 ? res.data : []
    console.log("valor" + people.length)
    console.log(people.length)
    this.formatData(people)
    this.setState({ people })
  }

  render() {
    const { data_donut, data_lines } = this.state
    //console.log(data_donut)
    //console.log(data_lines)
    const data = {
      labels: ['Activos', 'Inactivos'],
      datasets: [
        {
          data: this.state.data_donut,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 2,
        },
      ],

    };

    const drop = {
      labels: ['Linea 1', 'Linea 2', 'Linea 3', 'Linea 4', 'Linea 5',],
      datasets: [
        {
          label: '# de personal por lineas',
          data: this.state.data_lines,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
             
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],

    };
    const carg = {
      
     labels: ['Etiquetador','Paster','Lavadora','Palet','Depa',' 4 Operador','Op 3','Mecanico','Soplador','VarioPack','Var 1','Var 2','Ocme 150','Ocme 80','Electricista','Var 3','Var 4','Coordinador','Planeador','Lider produccion','Lider mantenimiento','BTE','Aux. Administrativo','Varios Hab'],
        
      datasets: [
        {
          label: 'Cargos',
          data: this.state.data_cargos,
          backgroundColor: [  //Los numeros son el color de cada cargo
            'rgba(255, 99, 132, 0.2)', // 14
            'rgba(54, 162, 235, 0.2)', // 15
            'rgba(255, 206, 86, 0.2)', // 16
            'rgba(75, 192, 192, 0.2)', // 17
            'rgba(153, 102, 255, 0.2)', // 18
            'rgba(0, 0, 255, 0.2)', // 19
            'rgba(138, 43, 226, 0.2)', // 20
            'rgba(165, 42, 42, 0.2)', // 21
            'rgba(222, 184, 135, 0.2)', // 22
            'rgba(95, 158, 160, 0.2)', // 23
            'rgba(127, 255, 0, 0.2)', // 24
            'rgba(210, 105, 30, 0.2)', // 25
            'rgba(255, 127, 80, 0.2)', // 26
            'rgba(100, 149, 237, 0.2)', // 27
            'rgba(255, 248, 220, 0.2)', // 28
            'rgba(220, 20, 60, 0.2)', // 29
            'rgba(0, 255, 255, 0.2)', // 30
            'rgba(0, 0, 139, 0.2)', // 31
            'rgba(0, 139, 139, 0.2)', // 32
            'rgba(184, 134, 11, 0.2)', // 33
            'rgba(169, 169, 169, 0.2)', // 34
            'rgba(0, 100, 0, 0.2)', // 35
            'rgba(169, 169, 169, 0.2)', // 36
            'rgba(189, 183, 107, 0.2)', // 37
            'rgba(139, 0, 139, 0.2)', // 38

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)', // 14
            'rgba(54, 162, 235, 1)', // 15
            'rgba(255, 206, 86, 1)', // 16
            'rgba(75, 192, 192, 1)', // 17
            'rgba(153, 102, 255, 1)', // 18
            'rgba(0, 0, 255, 1)', // 19
            'rgba(138, 43, 226, 1)', // 20
            'rgba(165, 42, 42, 1)', // 21
            'rgba(222, 184, 135, 1)', // 22
            'rgba(95, 158, 160, 1)', // 23
            'rgba(127, 255, 0, 1)', // 24
            'rgba(210, 105, 30, 1)', // 25
            'rgba(255, 127, 80, 1)', // 26
            'rgba(100, 149, 237, 1)', // 27
            'rgba(255, 248, 220, 1)', // 28
            'rgba(220, 20, 60, 1)', // 29
            'rgba(0, 255, 255, 1)', // 30
            'rgba(0, 0, 139, 1)', // 31
            'rgba(0, 139, 139, 1)', // 32
            'rgba(184, 134, 11, 1)', // 33
            'rgba(169, 169, 169, 1)', // 34
            'rgba(0, 100, 0, 1)', // 35
            'rgba(169, 169, 169, 1)', // 36
            'rgba(189, 183, 107, 1)', // 37
            'rgba(139, 0, 139, 1)', // 38
          ],
          borderWidth: 1,
        },
      ],

    };
    const enferm = {
      labels: ['Vaciones', 'Enfermedad General', 'Covid-19', 'Permiso Sindical', 'Calamidad','Compromiso Empresarial','Otros'],
      datasets: [
        {
          label: 'Enfermedades ',
          data: this.state.data_enferm,
          backgroundColor: [
            'rgba(0, 255, 255, 0.2)',
            'rgba(0, 0, 139, 0.2)', 
            'rgba(0, 139, 139, 0.2)', 
            'rgba(184, 134, 11, 0.2)', 
            'rgba(169, 169, 169, 0.2)', 
            'rgba(0, 100, 0, 0.2)', 
            'rgba(169, 169, 169, 0.2)', 
            'rgba(189, 183, 107, 0.2)', 
          ],
          borderColor: [
            'rgba(0, 255, 255, 1)',
            'rgba(0, 0, 139, 1)',
            'rgba(0, 139, 139, 1)', 
            'rgba(184, 134, 11, 1)', 
            'rgba(169, 169, 169, 1)', 
            'rgba(0, 100, 0, 1)', 
            'rgba(169, 169, 169, 1)', 
            'rgba(189, 183, 107, 1)', 
          ],
          borderWidth: 1,
        },
      ],

    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
      <div>
        <Navbar />
        <div className="row container">
          <div className="col s12 m4 l4">
            <div style={{ marginTop: "100px" }} >
              <div>
                <select className="select" value={this.state.line_filter} onChange={(e) => {
                  const value = parseInt(e.target.value)
                  this.setState({ line_filter: value })
                  this.formatData(this.state.people, value)
                }}>
                  <option value disabled selected>Filtrar Por Linea</option>
                  <option value={3}> Linea 1 </option>
                  <option value={4}> Linea 2 </option>
                  <option value={5}> Linea 3 </option>
                  <option value={6}> Linea 4 </option>
                  <option value={7}> Linea 5 </option>
                </select>
              </div>
              <div >

                <Doughnut
                  data={data}

                  options={{

                    mainAspectRatio: false,
                  }}
                />

              </div>
              <div>
                <h4  style={{color: "#0B1B4F" }}><strong>Cargos</strong></h4>
                <Pie
                data={carg}/>
              </div>
            </div>

          </div>
          <div className="col m2 l2"></div>

          <div className="col s12 m6 l6">
            <div  >
              <p></p>
              <h5 style={{ color: "#0B1B4F" }}><i>Total Personas</i></h5>
              <p style={{ fontSize: "22px" }} ><strong>{this.state.people.length}</strong></p>
            </div>
            <Bar data={drop}
             
            />
            <h4  style={{color: "#0B1B4F" }}><strong>Tipos de Ausentismo</strong></h4>
            <PolarArea  data={enferm}/>

          </div>
         

        </div>
        <div>
        </div>
      </div>
    )
  }
}

export default Graphs