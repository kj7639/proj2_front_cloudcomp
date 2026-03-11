import ExploreInsights from "./components/ExploreInsights";
import FiltersDataInteract from "./components/FiltersDataInteract";
import APIDataInteract from "./components/APIDataInteract"
import PageChange from "./components/PageChange"

export default function Home(){
    return (
        <div className="bg-gray-100 w-screen h-screen overflow-auto">
            <header className="bg-blue-600 p-5 text-3xl font-semibold">
                Nutritional Insights
            </header>
            <main className="mx-20 text-black">
                <ExploreInsights/>
                <FiltersDataInteract/>
                <APIDataInteract/>
                <h1 className="text-2xl font-semibold my-8">Pagination</h1>
                <PageChange pageNum={1}/>
            </main>
            <footer className="flex justify-center bg-blue-600 p-5 mt-15">
                &copy; 2025 Nutritional Insights. All Rights Reserved.
            </footer>
        </div>
    )
}