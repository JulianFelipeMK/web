import React, { Component } from 'react'
import M from 'materialize-css';
import  {Doughnut} from 'chart.js';
import { BackgroundColor } from 'jest-matcher-utils/node_modules/chalk';

export class Grafica extends Component {
    render() {
        return (

            <Doughnut
            
            data={{
               labels:['Activo','Inactivo'],
               datasets: [
                   {

                label: '#Activos e Inactivos',
                data:[70,40],
                BackgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
    
                 
                
                ]



               },
            ],
               





            }}
            height={50}
            width={100}
            options={{

                mainAspectRatio:false,
            }}
            
            
            
            
            />
          

        )
    }
}

export default Grafica
