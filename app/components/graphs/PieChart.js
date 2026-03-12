"use client"

import { Chart, Colors } from "chart.js/auto"
import { Pie } from "react-chartjs-2"
import { useState, useEffect } from "react"

Chart.register(Colors)

export default function PieChart({ data }) {

  const [dataSet, setDataSet] = useState({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    if (!data || !data.distribution) return

    // Sort cuisines by count
    const sorted = Object.entries(data.distribution)
      .sort((a, b) => b[1] - a[1])

    // Take top 6 cuisines
    const top = sorted.slice(0, 6)
    const other = sorted.slice(6)

    const labels = top.map(([cuisine]) => cuisine)
    const values = top.map(([_, count]) => count)

    // Sum remaining as "Other"
    if (other.length > 0) {
      labels.push("Other")
      values.push(other.reduce((sum, [, count]) => sum + count, 0))
    }

    setDataSet({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "rgba(59,130,246,0.7)",
            "rgba(239,68,68,0.7)",
            "rgba(16,185,129,0.7)",
            "rgba(245,158,11,0.7)",
            "rgba(139,92,246,0.7)",
            "rgba(236,72,153,0.7)",
            "rgba(156,163,175,0.7)"
          ],
        },
      ],
    })
  }, [data])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Recipe Distribution by Diet Type",
        font: {
          size: 12
        }
      },
      legend: {
        position: "right"
      }
    }
  }

  return (
    <div className="h-full">
      <Pie data={dataSet} options={options} />
    </div>
  )
}