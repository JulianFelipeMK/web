import React, { Component } from 'react'
import { Doughnut, PolarArea } from 'react-chartjs-2'
import { apiCall } from '../../Api/ApiWrapper'
import M from 'materialize-css';
import Navbar from '../Subcomponents/Navbar'
import moment from 'moment';

export class History extends Component {

    state = {
        history: [],
        ahistory: [],
        bhistory: [],
        date_his: "",
        line_his: "0"
    }


    componentDidMount = async () => {
        M.AutoInit()
        //this.handleGetHistory()
    }

    handleGetHistory = async (line_his) => {
        //const { line_his } = this.state
        const data = await apiCall("get", "/history/graphs", { line_his })
        if (data.data.length > 0) {
            this.setState({ history: data.data })
        } else {
            window.M.toast({ html: "No hay resultados asociados a esta busqueda" }, 3000)
        }
    }

    handleSetData = (line) => {
        const { history } = this.state
        const line_his = line === null ? this.state.line_his : line

        //console.log(line_his)
        var filtera = []
        var filterb = []
        const labela = []
        const labelb = []
        const dataa = []
        const datab = []

        //console.log(history)

        history.map(item => {
            if (item.type_his === "pie") {
                if (item.line_his === line_his.toString()) {
                    filtera.push(item)
                }
            }

            if (item.type_his === "pie-simple") {
                console.log("if entre")
                if (item.line_his === line_his.toString()) {
                    filterb.push(item)
                }
            }
        })
        console.log(filterb)
        if (filtera.length > 0) {
            const temp = JSON.parse(filtera[0].stadistic_his)
            temp.map(item => {
                labela.push(item.label)
                dataa.push(item.value)
            })
        }

        if (filterb.length > 0) {
            const temp = JSON.parse(filterb[0].stadistic_his)
            temp.map(item => {
                labelb.push(item.label)
                datab.push(item.value)
            })
        }

        const activos = {
            labels: labela,
            datasets: [
                {
                    data: dataa,
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

        console.log(datab)
        const ausentismo = {
            labels: labelb,
            datasets: [
                {
                    label: 'Enfermedades ',
                    data: datab,
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

        this.setState({ ahistory: activos, bhistory: ausentismo })
    }

    handleOnChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        const { date_his, ahistory, bhistory, history } = this.state
        //console.log(history)
        return (
            <div>
                <Navbar />
                <div className="row container">

                    <div className="col s6" style={{ marginBottom: "50px" }} >
                        <div>
                            <select className="select" value={this.state.line_his} onChange={(e) => {
                                const value = parseInt(e.target.value)
                                this.setState({ line_his: value })
                                this.handleSetData(e.target.value)
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

                    <div className='col s6' style={{ marginBottom: "50px" }}>
                        <input type="date" value={date_his} id="date_his" onChange={e => {
                            const date = moment(e.target.value).format("DD/MM/YYYY")
                            this.setState({ date_his: date })
                            this.handleGetHistory(date_his)
                            this.handleSetData()
                        }} />
                    </div>

                    <div className="col s12 m6 l4" >
                        <span style={{ color: "#0B1B4F" }}>Activos e inactivos </span>
                        <Doughnut
                            data={ahistory}
                            options={{
                                mainAspectRatio: false,
                            }}
                        />
                    </div>


                    <div className="col s12 m6 l4">
                        <span style={{ color: "#0B1B4F" }}>Razones de ausentismo</span>
                        <PolarArea data={bhistory} />
                    </div>

                </div>
            </div>
        )
    }
}

export default History