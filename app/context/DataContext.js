'use client';

import {createContext, useContext, useEffect, useState} from "react";
import { getAvgMacroNutrients, getMacroPerRecipe, getAvgMacrosByDiet, getCuisineDistribution } from "../utils/apiUtils";

const NutritionContext = createContext();

export function DataProvider({ children }) {
  const [dietType, setDietType] = useState("paleo");
  const [data, setData] = useState({
    bar: null,
    scatter: null,
    heat: null,
    pie: null,
  });
  const [loading, setLoading] = useState(false);

  const loadDataForDiet = async (type) => {
    setLoading(true);
    setDietType(type);

    try {
      const barData = await getAvgMacroNutrients(type);
      const scatterData = await getMacroPerRecipe(type);
      const heatData = await getAvgMacrosByDiet();
      const pieData = await getCuisineDistribution(type);

      setData({
        bar: barData.error ? null : barData,
        scatter: scatterData.error ? null : scatterData,
        heat: heatData.error ? null : heatData,
        pie: pieData.error ? null : pieData,
      });

      if (barData.error || scatterData.error || heatData.error || pieData.error) {
        console.warn('One or more API calls returned an error', {
          bar: barData.error,
          scatter: scatterData.error,
          heat: heatData.error,
          pie: pieData.error,
        });
      }
    } catch (err) {
      console.error('Unexpected error loading diet data', err);
      // leave previous data intact or clear? we'll clear
      setData({ bar: null, scatter: null, heat: null, pie: null });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // perform initial fetch; wrap in async function to avoid lint warning
    const initialize = async () => {
      setLoading(true);
      const barData = await getAvgMacroNutrients(dietType);
      const scatterData = await getMacroPerRecipe(dietType);
      const heatData = await getAvgMacrosByDiet();
      const pieData = await getCuisineDistribution(dietType);

      setData({
        bar: barData,
        scatter: scatterData,
        heat: heatData,
        pie: pieData,
      });
      setLoading(false);
    };

    initialize();
  }, []);

  return (
    <NutritionContext.Provider value={{ dietType, data, loading, setDietType, loadDataForDiet }}>
      {children}
    </NutritionContext.Provider>
  );
}

export const useData = () => useContext(NutritionContext);