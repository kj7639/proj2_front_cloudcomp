export default function APIDataInteract(){
    return (
        <div>
            <h1 className="text-2xl font-semibold mt-8">API Data Interaction</h1>
            <div className="my-3 flex gap-3">
                <button className="bg-blue-600 rounded-sm px-3 py-2 text-white">Get Nutritional Insights</button>
                <button className="bg-green-700 rounded-sm px-3 py-2 text-white">Get Recipes</button>
                <button className="bg-purple-700 rounded-sm px-3 py-2 text-white">Get Clusters</button>
            </div>
        </div>
    )
}