'use client';

import {createContext, useContext, useEffect, useState} from "react";
import { getAllDietRecipes } from "../utils/apiUtils";
import {useData} from "@/app/context/DataContext";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const { dietType, data  } = useData();
  const [currentPage, setCurrentPage] = useState(1)
  const [recipeData, setRecipeData] = useState({
    recipes: [],
    total: 0,
    page: 1,
    pageSize: 10
  });
  const [loading, setLoading] = useState(false);

  const loadRecipesForDiet = async () => {
    setLoading(true);

    const recipeList = await getAllDietRecipes(dietType, currentPage);

    console.log(recipeList)

    setRecipeData({
      recipes: recipeList.recipes,
      total: recipeList.total,
      page: recipeList.page,
      pageSize: recipeList.pageSize
    });
    setLoading(false);
  };

  useEffect(() => {
   loadRecipesForDiet()
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1)
  }, [data]);

  return (
    <RecipeContext.Provider value={{ dietType, recipeData, loading, setCurrentPage, loadRecipesForDiet }}>
      {children}
    </RecipeContext.Provider>
  );
}

export const useRecipeData = () => useContext(RecipeContext);