export default function ResourceCleanup() {

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-8">
        Cloud Resource Cleanup
      </h2>

      <div className="bg-white shadow-sm rounded-lg px-6 py-5 w-full">
        <p className="mb-4 text-sm text-gray-600">
          Ensure that cloud resources are efficiently managed and cleaned up post-deployment.
        </p>

        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md"
        >
          Clean Up Resources
        </button>
      </div>
    </div>
  )
}