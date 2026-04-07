export default function OAuth() {

  return (
      <div>
        <h2 className="text-2xl font-semibold mb-8">
            OAuth & 2FA Integration
          </h2>
        <div className="bg-white shadow-sm rounded-lg p-6 w-full mb-8">


          <p className="font-medium mb-2">Secure Login</p>

          <div className="flex gap-3 mb-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
              Login with Google
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
              Login with GitHub
            </button>
          </div>

          <p className="text-sm mb-2">Enter 2FA Code</p>

          <input
            type="text"
            placeholder="Enter your 2FA code"
            className="border border-gray-300 rounded-md px-3 py-2 w-80"
          />
        </div>
      </div>
  )
}