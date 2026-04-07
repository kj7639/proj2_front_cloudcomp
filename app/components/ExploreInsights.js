'use client';

import GraphHolder from "./GraphHolder"
import {useData} from "@/app/context/DataContext";

export default function ExploreInsights(){
  const { data, dietType, loading } = useData();

  if (loading) return <p>Loading data for {dietType}...</p>;

  return (
    <div className="my-8 text-black">
      <h1 className="text-2xl font-semibold">Explore Nutritional Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 my-6 auto-rows-[400px]">
        <GraphHolder
            title={"Bar Chart"}
            desc={"Average macronutrient content by diet type."}
            type={"bar"}
            data={data.bar}
            />
        <GraphHolder
            title={"Scatter Plot"}
            desc={"Nutrient relationships (e.g., protein vs carbs)."}
            type={"scatter"}
            data={data.scatter}
            />
        <GraphHolder
            title={"Heatmap"}
            desc={"Nutrient correlations."}
            type={"heat"}
            data={data.heat}
            />
        <GraphHolder
            title={"Pie Chart"}
            desc={"Recipe distribution by diet type."}
            type={"pie"}
            data={data.pie}
        />
      </div>
  </div>
  )
}