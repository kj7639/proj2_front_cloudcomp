"use client"

import { Chart, Colors }from "chart.js/auto"
import { Bar } from 'react-chartjs-2'
import { useState, useEffect } from "react"

Chart.register(Colors)

export default function BarChart(){

    const [data, setData] = useState({
            labels: ['One', 'Two', 'Three'],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [10, 12, 2]
                }, {
                    label: 'Dataset 2',
                    data: [19, 32, 14]
                }, {
                    label: 'Dataset 3',
                    data: [23, 12, 12]
                }
            ]
        })
        
        useEffect(() => {
        setData({
            labels: ['One', 'Two', 'Three'],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [10, 12, 2]
                }, {
                    label: 'Dataset 2',
                    data: [19, 32, 14]
                }, {
                    label: 'Dataset 3',
                    data: [23, 12, 12]
                }
            ]
        })
    }, [])


    return (
        <div>
            <Bar
                data={data}
                options={{}}
            />
        </div>
    )
}