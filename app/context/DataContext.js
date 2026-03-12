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

    const barData = await getAvgMacroNutrients(type);
    const scatterData = await getMacroPerRecipe(type);
    const heatData = await getAvgMacrosByDiet();
    const pieData = await getCuisineDistribution(type);

    setData({
      bar: barData,
      scatter: scatterData,
      heat: heatData,
      pie: pieData,
    });
    setLoading(false);
  };

  useEffect(() => {
    loadDataForDiet(dietType)
  }, []);

  return (
    <NutritionContext.Provider value={{ dietType, data, loading, setDietType, loadDataForDiet }}>
      {children}
    </NutritionContext.Provider>
  );
}

export const useData = () => useContext(NutritionContext);