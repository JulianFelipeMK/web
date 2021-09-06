import React, { Component } from 'react'
import M from 'materialize-css';
import Navbar from '../Subcomponents/Navbar';
import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { PolarArea } from 'react-chartjs-2'
import { apiCall } from '../../Api/ApiWrapper';


export class Graphs extends Component {

  componentDidMount = async () => {
    M.AutoInit()
    await this.handleRead()
  }

  state = {
    people: [],
    subdomains: [],
    line_filter: 3,

    data_donut: [],
    label_donut: [],
    data_lines: [],
    label_lines: [],
    data_cargos: [],
    label_cargos: [],
    data_enferm: [],
    label_enferm: []
  }

  formatData = (array = null, filter = null, domains = null) => {
    const { people, line_filter, subdomains } = this.state
    const personas = array === null ? people : array
    const subdominios = subdomains === null ? subdomains : domains

    let cargos = {}
    let activos = {}
    let razones = {}
    let lineas = {}

    const cargl = []
    const cargv = []
    const linel = []
    const linev = []
    const enfel = []
    const enfev = []
    const actil = []
    const activ = []

    let formc = []
    let forma = []
    let formr = []
    let forml = []

    const filtro = filter === null ? line_filter : filter

    if (personas.length > 0) {
      personas.map(item => {
        if (item.line_peo === filtro) {
          activos[item.state_peo] = (activos[item.state_peo] || 0) + 1;
          razones[item.reason_peo] = (razones[item.reason_peo] || 0) + 1;
          cargos[item.cargo_peo] = (cargos[item.cargo_peo] || 0) + 1;
          lineas[item.line_peo] = (lineas[item.line_peo] || 0) + 1;
        }

        if (filtro === 0) {
          activos[item.state_peo] = (activos[item.state_peo] || 0) + 1;
          razones[item.reason_peo] = (razones[item.reason_peo] || 0) + 1;
          cargos[item.cargo_peo] = (cargos[item.cargo_peo] || 0) + 1;
          lineas[item.line_peo] = (lineas[item.line_peo] || 0) + 1;
        }
      })
    }

    console.log(activos)

    for (const key in cargos) {
      subdominios.map(item => {
        if (parseInt(key) === item.id_sub) {
          const values = {
            label: item.value_sub,
            value: cargos[key]
          }
          formc.push(values)
        }
      })
    }

    for (const key in razones) {
      subdominios.map(item => {
        if (parseInt(key) === item.id_sub) {
          const values = {
            label: item.value_sub,
            value: razones[key]
          }
          formr.push(values)
        }
      })
    }

    for (const key in activos) {
      subdominios.map(item => {
        if (parseInt(key) === item.id_sub) {
          const values = {
            label: item.value_sub,
            value: activos[key]
          }
          forma.push(values)
        }
      })
    }

    console.log(forma)

    for (const key in lineas) {
      subdominios.map(item => {
        if (parseInt(key) === item.id_sub) {
          const values = {
            label: item.value_sub,
            value: lineas[key]
          }
          forml.push(values)
        }
      })
    }

    formc.map(item => {
      cargl.push(item.label)
      cargv.push(item.value)
    })

    forma.map(item => {
      actil.push(item.label)
      activ.push(item.value)
    })

    formr.map(item => {
      enfel.push(item.label)
      enfev.push(item.value)
    })

    forml.map(item => {
      linel.push(item.label)
      linev.push(item.value)
    })

    console.log(activ)

    this.setState({ data_lines: linev, label_lines: linel, data_donut: activ, label_donut: actil, data_enferm: enfev, label_enferm: enfel, label_cargos: cargl, data_cargos: cargv })
  }

  handleRead = async () => {
    const resd = await apiCall("get", "/people/subs")
    const subdomains = resd.status === 200 ? resd.data : []
    const res = await apiCall("get", "/people/people")
    const people = res.status === 200 ? res.data : []
    this.formatData(people, null, subdomains)
    this.setState({ people, subdomains })
  }

  render() {
    const { data_donut, data_lines, data_cargos, data_enferm, label_cargos, label_donut, label_enferm, label_lines } = this.state


    const data = {
      labels: label_donut,
      datasets: [
        {
          data: data_donut,
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
      labels: label_lines,
      datasets: [
        {
          label: '# de personal por lineas',
          data: data_lines,
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
      labels: label_cargos,
      datasets: [
        {
          label: 'Cargos',
          data: data_cargos,
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
      labels: label_enferm,
      datasets: [
        {
          label: 'Enfermedades ',
          data: data_enferm,
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

          <div className="col s12" style={{ marginBottom: "50px" }} >
            <div>
              <select className="select" value={this.state.line_filter} onChange={(e) => {
                const value = parseInt(e.target.value)
                this.setState({ line_filter: value })
                this.formatData(this.state.people, value, this.state.subdomains)
              }}>
                <option value disabled selected>Filtrar Por Linea</option>
                <option value={3}> Linea 1 </option>
                <option value={4}> Linea 2 </option>
                <option value={5}> Linea 3 </option>
                <option value={6}> Linea 4 </option>
                <option value={7}> Linea 5 </option>
                <option value={0}> General </option>
              </select>
            </div>
          </div>

          <div className="col s12 m6 l4" >
            <span style={{ color: "#0B1B4F" }}>Activos e inactivos </span>
            <Doughnut
              data={data}
              options={{
                mainAspectRatio: false,
              }}
            />
          </div>

          <div className="col s12 m6 l4">
            <span style={{ color: "#0B1B4F" }}>Cargos </span>
            <Pie
              data={carg} />
          </div>

          <div className="col s12 m6 l4">
            <span style={{ color: "#0B1B4F" }}>Razones de ausentismo</span>
            <PolarArea data={enferm} />
          </div>


          <div className="col s12 m6 l4">
            <div  >
              <p></p>
              <span style={{ color: "#0B1B4F" }}>Total personas</span>
              <p style={{ fontSize: "22px" }} ><strong>{this.state.people.length}</strong></p>
            </div>
            <Bar data={drop} />
          </div>

        </div>
      </div>
    )
  }
}

export default Graphs