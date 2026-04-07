export default function SecurityAndCompliance() {

  return (
      <div>
        <h2 className="text-2xl font-semibold mb-8">
          Security & Compliance
        </h2>

        <div className="bg-white p-5 rounded-lg shadow-sm w-full mb-8">
          <p className="font-medium mb-2">Security Status</p>

          <p className="text-sm">
            Encryption: <span className="text-green-600">Enabled</span>
          </p>

          <p className="text-sm">
            Access Control: <span className="text-green-600">Secure</span>
          </p>

          <p className="text-sm">
            Compliance:{" "}
            <span className="text-green-600 underline">
              GDPR Compliant
            </span>
          </p>
        </div>
      </div>
  )
}