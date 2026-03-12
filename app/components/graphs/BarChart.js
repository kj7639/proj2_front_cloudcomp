"use client"

import { Chart, Colors }from "chart.js/auto"
import { Bar } from 'react-chartjs-2'
import { useState, useEffect } from "react"

Chart.register(Colors)

export default function BarChart({data}){

  const [dataSet, setDataSet] = useState({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    if (!data || !data.macros) return

    const labels = Object.keys(data.macros)
    const values = Object.values(data.macros)

    setDataSet({
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "rgba(59, 130, 246, 0.5)",
            "rgba(34, 197, 94, 0.5)",
            "rgba(249, 115, 22, 0.5)"
          ],
          borderColor: [
            "rgba(59, 130, 246, 1)",
            "rgba(34, 197, 94, 1)",
            "rgba(249, 115, 22, 1)"
          ],
          borderWidth: 2,
        },
      ]
    });
  }, [data]);

  return (
    <div className="h-full">
      <Bar
        data={dataSet}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: "Average Macronutrients by Diet",
              font: {
                size: 12
              }
            }
          },
        }}
      />
    </div>
  )
}