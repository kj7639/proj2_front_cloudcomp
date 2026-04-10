'use client';

import { useEffect, useState } from 'react';

const EXPECTED = {
  encryption: "Enabled",
  access_control: "Secure",
  compliance: "GDPR Compliant",
};

export default function SecurityAndCompliance() {
  const [status, setStatus] = useState(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/security-status');
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error("Failed to fetch security status:", err);
      setStatus({
        encryption: "failed",
        access_control: "failed",
        compliance: "failed",
      });
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000)
    return () => clearInterval(interval)
  }, []);

  const color = (key) => {
    const value = status?.[key];
    
    // Special handling for access_control
    if (key === "access_control") {
      if (value?.toLowerCase().includes("authenticated") || value === "Secure") {
        return "text-green-600";
      } else if (value?.toLowerCase().includes("not authenticated") || value?.toLowerCase().includes("unauthenticated")) {
        return "text-yellow-600";
      } else{
        return "text-red-600";
      }
    }
    
    // Default behavior for other keys
    return value === EXPECTED[key] ? "text-green-600" : "text-red-600";
  };

  return (
      <div>
        <h2 className="text-2xl font-semibold mb-8">
          Security & Compliance
        </h2>

        <div className="bg-white p-5 rounded-lg shadow-sm w-full mb-8">
          <p className="font-medium mb-2">Security Status</p>

          <p className="text-sm">
            Encryption: <span className={color("encryption")}>{status?.encryption ?? "Unknown"}</span>
          </p>

          <p className="text-sm">
            Access Control: <span className={color("access_control")}>{status?.access_control ?? "Unknown"}</span>
          </p>

          <p className="text-sm">
            Compliance:{" "}
            <span className={`underline ${color("compliance")}`}>
              {status?.compliance ?? "Unknown"}
            </span>
          </p>
        </div>
      </div>
  )
}