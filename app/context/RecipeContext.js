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

    try {
      const recipeList = await getAllDietRecipes(dietType, currentPage);

      if (recipeList.error) {
        console.warn('Failed to fetch recipes:', recipeList.error);
        // keep existing recipes or reset to empty
        setRecipeData(prev => ({ ...prev, recipes: [] }));
      } else {
        setRecipeData({
          recipes: Array.isArray(recipeList.recipes) ? recipeList.recipes : [],
          total: recipeList.total || 0,
          page: recipeList.page || currentPage,
          pageSize: recipeList.pageSize || prev.pageSize || 10,
        });
      }
    } catch (err) {
      console.error('Unexpected error fetching recipes', err);
      setRecipeData(prev => ({ ...prev, recipes: [] }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetch whenever page changes; move logic into inline async function
    const fetchPage = async () => {
      setLoading(true);
      const recipeList = await getAllDietRecipes(dietType, currentPage);

      setRecipeData({
        recipes: recipeList.recipes,
        total: recipeList.total,
        page: recipeList.page,
        pageSize: recipeList.pageSize
      });
      setLoading(false);
    };

    fetchPage();
  }, [dietType, currentPage]);

  useEffect(() => {
    // reset pagination when the underlying diet data object changes.
    // defer state update to avoid the `set-state-in-effect` lint error.
    const id = setTimeout(() => setCurrentPage(1), 0);
    return () => clearTimeout(id);
  }, [data]);

  return (
    <RecipeContext.Provider value={{ dietType, recipeData, loading, setCurrentPage, loadRecipesForDiet }}>
      {children}
    </RecipeContext.Provider>
  );
}

export const useRecipeData = () => useContext(RecipeContext);