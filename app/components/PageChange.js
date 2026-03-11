export default function PageChange({pageNum}){
    return (
        <div className="flex gap-2 justify-center">
            <a className={"py-1 px-4 rounded-sm text-black bg-gray-300 hover:bg-gray-400"}>
                Previous
            </a>
            <a
                href="../"
                className={`py-1 px-3 rounded-sm ${pageNum == 1 ? 'text-white bg-blue-600' : 'text-black bg-gray-300 hover:bg-gray-400'}`}
            >
                1
            </a>
            <a
                // href=""
                className={`py-1 px-3 rounded-sm ${pageNum == 2 ? 'text-white bg-blue-600' : 'text-black bg-gray-300 hover:bg-gray-400'}`}
            >
                2
            </a>
            <a className={"py-1 px-4 rounded-sm text-black bg-gray-300 hover:bg-gray-400"}>
                Next
            </a>
        </div>
    )
}