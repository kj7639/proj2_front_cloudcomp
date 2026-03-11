"use client"

import { Chart, Colors }from "chart.js/auto"
import { Pie } from 'react-chartjs-2'
import { useState, useEffect } from "react"

Chart.register(Colors)

export default function PieChart(){

    const [data, setData] = useState({
        datasets: [{
            label: 'Dataset 1',
            data: [10, 12, 2]
        }]
    })
        
    useEffect(() => {
        console.log("fetch data here")
    }, [])


    return (
        <div>
            <Pie
                data={data}
                options={{}}
            />
        </div>
    )
}