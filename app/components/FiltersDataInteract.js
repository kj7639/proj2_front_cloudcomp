'use client';

import {useData} from "@/app/context/DataContext";

export default function FiltersDataInteract(){
  const { setDietType  } = useData();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Filters and Data Interaction</h1>
      <div className="my-3">
        <select
          className="bg-white mx-4 p-3 border border-solid border-gray-200 rounded-sm"
          onChange={(e) => setDietType(e.target.value.toLowerCase())}>
          <option value="paleo">Paleo</option>
          <option value="vegan">Vegan</option>
          <option value="keto">Keto</option>
          <option value="mediterranean">Mediterranean</option>
          <option value="dash">Dash</option>
        </select>
      </div>
    </div>
  )
}