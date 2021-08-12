import React, { Component } from 'react'
import M from 'materialize-css';
import Navbar from '../Subcomponents/Navbar';
import  {Doughnut} from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';


export class Graphs extends Component {
    componentDidMount = async () => {
        M.AutoInit()
        
        
    }
    render() {
        const data = {
            labels: ['Inactivos', 'Activos'],
            datasets: [
              {
                
                data: [70, 20],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
                
              },
            ],
           
          };

          const drop = {
            labels: ['Linea 1', 'Linea 2', 'Linea 3', 'Linea 4', 'Linea 5', ],
            datasets: [
              {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
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
             <Navbar/>
             <div className="row">
                <div className="col s12 m6 l6">
                  <div className="container" style={{}} >
                      
                          <p></p>
                          <p></p>
                          <p></p>
                          <p></p>
                          <p></p>
                          <p></p>
                          <p></p>
                          <p></p>
                         <div style={{float:"left", marginRight:"200px"}} >
                         <div>
                          <select className="select"  >
                              <option value disabled selected>Filtrar Por Linea</option>
                              <option value="value1"> Linea 1 </option>
                              <option value="value2"> Linea 2 </option>
                              <option value="value3"> Linea 3 </option>
                              <option value="value4"> Linea 4 </option>
                              <option value="value5"> Linea 5 </option>
                          </select>
                          </div>
                          <div style={{marginTop:"150px"}}>
                          <Doughnut data={data}  width={500}
                          height={500}
                         />
                         </div>
                         </div>
                          
                          
    
                      
                  </div>  
                           
                  
                </div>
                <div  style={{float:"left" ,marginLeft:"90px"}}>
                    <div  >
                            <h5  style={{color:"#0B1B4F"}}><i>Total Personas</i></h5>
                            <p  style={{fontSize:"22px"}} ><strong>202</strong></p>
                            <h5  style={{color:"#0B1B4F"}} ><i>Conteo</i></h5>
                            <p  style={{fontSize:"22px"}}><strong>198</strong></p>
                            </div>
                            <Bar data={drop} width={800}
                          height={500}
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