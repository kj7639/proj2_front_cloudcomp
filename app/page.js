"use client"

import { useEffect } from "react";
import ExploreInsights from "./components/ExploreInsights";
import FiltersDataInteract from "./components/FiltersDataInteract";
import APIDataInteract from "./components/APIDataInteract"
import PageChange from "./components/PageChange"
import {RecipeDisplay} from "@/app/components/RecipeDisplay";
import SecurityAndCompliance from "@/app/components/Security";
import OAuth from "@/app/components/OAuth";
import ResourceCleanup from "@/app/components/Cleanup";
import { useSession } from "@/app/utils/session";
export const dynamic = 'force-dynamic';

export default function Home(){
    const { session } = useSession()
    useEffect(() => {
        alert("Welcome! By clicking OK, you consent to any potential use and storage of any data you share")
    }, [])
    
  return (
    <div className="bg-gray-100 w-screen h-screen overflow-auto">
      <header className="bg-blue-600 p-5 text-3xl font-semibold">
        Nutritional Insights
      </header>
      <main className="mx-20 text-black">
        <ExploreInsights/>
        <FiltersDataInteract/>
        <APIDataInteract/>
        <h1 className="text-2xl font-semibold my-8">Recipes</h1>
        <RecipeDisplay/>
        <PageChange pageNum={1}/>
        <SecurityAndCompliance/>
        <OAuth/>
        {session?.user && <ResourceCleanup/>}
      </main>
      <footer className="flex justify-center bg-blue-600 p-5 mt-15">
        &copy; 2025 Nutritional Insights. All Rights Reserved.
      </footer>
    </div>
  )
}