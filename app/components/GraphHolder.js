import BarChart from "./graphs/BarChart"
import PieChart from "./graphs/PieChart"
import ScatterChart from "./graphs/ScatterChart"
import HeatMap from "@/app/components/graphs/HeatMap";
// import HeatMap from "./graphs/HeatMap"

export default function GraphHolder({title, desc, type, data}){

  const charts = {
    bar: BarChart,
    pie: PieChart,
    scatter: ScatterChart,
    heat: HeatMap,
  }
  const Chart = charts[type]

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-md">{title}</h2>
      <p className="text-gray-500 text-sm">{desc}</p>
      <div className="flex-1">
        {Chart ? (
          data ? <Chart data={data}/> : <p>Loading...</p>
        ) : (
          <p>Error Loading Chart</p>
        )}
      </div>
    </div>
  )
}