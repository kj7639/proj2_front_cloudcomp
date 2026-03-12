"use client"

import { Chart, Colors }from "chart.js/auto"
import { Scatter } from 'react-chartjs-2'
import { useState, useEffect } from "react"

Chart.register(Colors)

export default function ScatterChart({ data }){

  const [dataSet, setDataSet] = useState({
    datasets: []
  })

  useEffect(() => {
    if (!data || !data.recipes) return

    const points = data.recipes.map((recipe) => ({
      x: recipe["Protein(g)"],
      y: recipe["Carbs(g)"],
      recipe: recipe["Recipe_name"]
    }))

    setDataSet({
      datasets: [
        {
          label: "Protein vs Carbs",
          data: points,
          backgroundColor: "rgba(59,130,246,0.5)",
          pointRadius: 3
        }
      ]
    })
  }, [data])

  return (
    <div className="h-full">
      <Scatter
        data={dataSet}
        options = {
          {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: "Protein vs Carbohydrates by Recipe",
                font: {
                  size: 12
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const point = context.raw
                    return [
                      point.recipe,
                      `Protein: ${point.x} g`,
                      `Carbs: ${point.y} g`
                    ]
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Protein (g)"
                }
              },
              y: {
                title: {
                  display: true,
                  text: "Carbs (g)"
                }
              }
            }
          }
        }
      />
    </div>
  )
}