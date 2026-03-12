"use client"

import { Chart, Colors, Title, Tooltip, Legend } from "chart.js"
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix'
import { Chart as ReactChart } from "react-chartjs-2"
import { useMemo } from "react"

Chart.register(Colors, Title, Tooltip, Legend, MatrixController, MatrixElement)

export default function HeatMap({ data }) {
  // ensure we only treat data that's an array
  const isArray = Array.isArray(data);

  const nutrients = ["Protein(g)", "Carbs(g)", "Fat(g)"];
  const diets = isArray ? data.map(d => d.Diet_type) : [];

  // Compute chart data based solely on the incoming `data` prop.
  const chartData = useMemo(() => {
    if (!isArray || data.length === 0) return { datasets: [] };

    const maxValue = Math.max(
      ...data.flatMap(d => nutrients.map(n => d[n]))
    );

    const points = [];
    nutrients.forEach((nutrient) => {
      data.forEach((diet) => {
        points.push({
          x: diet.Diet_type,
          y: nutrient,
          v: diet[nutrient]
        });
      });
    });

    return {
      datasets: [
        {
          label: "Macros Heatmap",
          data: points,
          backgroundColor: context => {
            const val = context.dataset.data[context.dataIndex].v;
            const alpha = val / maxValue; // normalized opacity
            return `rgba(59,130,246,${alpha})`;
          },
          width: ({ chart }) => ((chart.chartArea?.width ?? 0) / diets.length) - 10,
          height: ({ chart }) => ((chart.chartArea?.height ?? 0) / nutrients.length) - 10
        }
      ]
    };
  }, [data, isArray]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Average Macronutrients per Diet Type",
        font: { size: 12 }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const point = context.raw;
            return `${point.y}: ${point.v}g (${point.x})`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'category',
        labels: diets,
        offset: true,
        title: { display: true, text: 'Diet Type' }
      },
      y: {
        type: 'category',
        labels: nutrients,
        offset: true,
      }
    }
  }

  return (
    <div className="h-full w-full">
      <ReactChart type="matrix" data={chartData} options={options} />
    </div>
  )
}