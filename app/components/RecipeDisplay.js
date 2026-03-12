'use client'

import {useRecipeData} from "../context/RecipeContext";

export function RecipeDisplay() {
  const { recipeData } = useRecipeData();

  return(
      <div className='bg-white rounded-lg shadow-lg p-2'>
        <ul className='list-disc ml-4'>
          {recipeData.recipes.map(recipe => (
              <li key={recipe} className="m-4 font-bold text-gray-600">{recipe}</li>
          ))}
        </ul>
      </div>
  )
}