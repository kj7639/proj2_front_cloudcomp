export default function FiltersDataInteract(){
    return (
        <div>
            <h1 className="text-2xl font-semibold">Filters and Data Interaction</h1>
            <div className="my-3">
                <input 
                    type="text"
                    placeholder="Search by Diet Type"
                    className="bg-white p-2 border border-solid border-gray-200 rounded-sm"
                ></input>
                <select className="bg-white mx-4 p-3 border border-solid border-gray-200 rounded-sm">
                    <option>All Diet Types</option>
                    <option>Vegan</option>
                    <option>Keto</option>
                </select>
            </div>
        </div>
    )
}