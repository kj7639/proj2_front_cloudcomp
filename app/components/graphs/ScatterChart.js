"use client"

import { Chart, Colors }from "chart.js/auto"
import { Scatter } from 'react-chartjs-2'
import { useState, useEffect } from "react"

Chart.register(Colors)

export default function ScatterChart(){

    const [data, setData] = useState({
        datasets: [
            {
                label: 'Dataset 1',
                data: [
                    {x: 1, y: 1},
                    {x: 3, y: 3},
                    {x: 4, y: 4},
                ]
            }, {
                label: 'Dataset 2',
                data: [
                    {x: 2, y: 2},
                    {x: 2, y: 4},
                    {x: 5, y: 5},
                    {x: 6, y: 6},
                ]
            }, {
                label: 'Dataset 3',
                data: [
                    {x: 1, y: 2},
                    {x: 3, y: 6}
                ]
            }]
        })
        
    useEffect(() => {
        console.log("fetch data here")
    }, [])


    return (
        <div>
            <Scatter
                data={data}
                options={{}}
            />
        </div>
    )
}