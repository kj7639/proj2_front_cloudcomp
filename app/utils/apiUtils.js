import {getData} from "./requestUtils";

export async function getAvgMacroNutrients(dietType = "paleo") {
  return getData("/avg_macro_nutrients", { diet_type: dietType });
}

export async function getMacroPerRecipe(dietType = "paleo") {
  return getData("/macro_per_recipe", { diet_type: dietType });
}

export async function getAvgMacrosByDiet() {
  return getData("/avg_macros_by_diet");
}

export async function getCuisineDistribution(dietType = "paleo") {
  return getData("/cuisine_distribution", { diet_type: dietType });
}

export async function getAllDietRecipes(dietType = "paleo", page = 1, pageSize = 10) {
  return getData("/all_diet_recipes", { diet_type: dietType, page, pageSize });
}