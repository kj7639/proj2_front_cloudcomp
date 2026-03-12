'use client';

import {useData} from "@/app/context/DataContext";
import {useRecipeData} from "@/app/context/RecipeContext";

export default function APIDataInteract(){
  const { loadDataForDiet, dietType } = useData();
  const { loadRecipesForDiet } = useRecipeData()

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-8">API Data Interaction</h1>
      <div className="my-3 flex gap-3">
        <button
            className="bg-blue-600 rounded-sm px-3 py-2 text-white font-bold hover:bg-blue-900 cursor-pointer"
            onClick={() => loadDataForDiet(dietType)}
        >
          Get Nutritional Insights
        </button>
        <button
            className="bg-green-700 rounded-sm px-3 py-2 text-white font-bold hover:bg-green-900 cursor-pointer"
            onClick={() => loadRecipesForDiet(dietType)}
        >
          Get Recipes
        </button>
        <button
            className="bg-purple-700 rounded-sm px-3 py-2 text-white font-bold hover:bg-purple-900 cursor-pointer"
        >
          Get Clusters
        </button>
      </div>
    </div>
  )
}