import React, { Component } from 'react'
import M from 'materialize-css';
import Navbar from '../Subcomponents/Navbar';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
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
    data_lines: []
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
      })
    }

    const data_lines = [line_1, line_2, line_3, line_4, line_5]
    const data_donut = [active, inactive]
    this.setState({ data_lines, data_donut })
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
            </div>

          </div>
          <div className="col m2 l2"></div>

          <div className="col s12 m6 l6">
            <div  >
              <h5 style={{ color: "#0B1B4F" }}><i>Total Personas</i></h5>
              <p style={{ fontSize: "22px" }} ><strong>{this.state.people.length}</strong></p>
            </div>
            <Bar data={drop}

            />
          </div>

        </div>
        <div>
        </div>
      </div>
    )
  }
}

export default Graphs