import GraphHolder from "./GraphHolder"

export default function ExploreInsights(){
   return (
        <div className="my-8 text-black">
            <h1 className="text-2xl font-semibold">Explore Nutritional Insights</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 my-6">
                <GraphHolder
                    title={"Bar Chart"}
                    desc={"Average macronutrient content by diet type."}
                    type={"bar"}
                    />
                <GraphHolder
                    title={"Scatter Plot"}
                    desc={"Nutrient relationships (e.g., protein vs carbs)."}
                    type={"scatter"}
                    />
                <GraphHolder
                    title={"Heatmap"}
                    desc={"Nutrient correlations."}
                    type={"heat"}
                    />
                <GraphHolder
                    title={"Pie Chart"}
                    desc={"Recipe distribution by diet type."}
                    type={"pie"}
                />
            </div>
        </div>
   ) 
}