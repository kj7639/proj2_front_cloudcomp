'use client'

import {useRecipeData} from "../context/RecipeContext";

export function RecipeDisplay() {
  const { recipeData } = useRecipeData();

  // ensure we always have an array before mapping to avoid runtime errors
  const recipes = Array.isArray(recipeData?.recipes) ? recipeData.recipes : [];

  return(
      <div className='bg-white rounded-lg shadow-lg p-2'>
        <ul className='list-disc ml-4'>
          {recipes.length > 0 ? (
            recipes.map((recipe, idx) => (
              <li key={idx} className="m-4 font-bold text-gray-600">{recipe}</li>
            ))
          ) : (
            <li className="m-4 text-gray-500">No recipes available</li>
          )}
        </ul>
      </div>
  )
}