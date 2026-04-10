"use client"
import { authClient } from "@/app/lib/auth-client"
import { useState, useEffect, useCallback } from "react"

export default function OAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totpCode, setTotpCode] = useState("")
  const [show2FA, setShow2FA] = useState(false)
  const [pendingUserId, setPendingUserId] = useState(null)

  // Check session on mount and periodically
  const checkSession = useCallback(async () => {
    try {
      console.log("🔍 Checking session...")
      const response = await authClient.session.get()
      console.log("🔍 Session response:", response)

      const sessionData = response?.data || response
      setSession(sessionData)

      if (sessionData?.user) {
        console.log("✅ User logged in:", sessionData.user.name || sessionData.user.email)
        console.log("🔐 2FA enabled:", sessionData.user.twoFactorEnabled ? "Yes" : "No")
      } else {
        console.log("❌ No active session")
      }
    } catch (error) {
      console.error("❌ Session check failed:", error)
      setSession(null)
      // Don't set error for session check failures, as this is normal when not logged in
    }
  }, [])

  useEffect(() => {
    checkSession()
    const interval = setInterval(checkSession, 3000)
    return () => clearInterval(interval)
  }, [checkSession])

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true)
      setError(null)
      console.log(`🔐 Starting ${provider} login...`)

      const response = await authClient.signIn.social({
        provider: provider,
        callbackURL: `${window.location.protocol}//${window.location.host}`
      })

      console.log(`${provider} sign-in response:`, response)

      // Check if we got a session
      if (response?.data?.user) {
        const user = response.data.user
        console.log("✅ User authenticated:", user)
        console.log("🔐 2FA status:", user.twoFactorEnabled ? "Enabled" : "Disabled")

        // If 2FA is enabled, show the 2FA prompt
        if (user.twoFactorEnabled) {
          console.log("⚠️ 2FA required - showing prompt")
          setPendingUserId(user.id)
          setShow2FA(true)
        } else {
          console.log("✅ No 2FA needed - fully authenticated")
          await checkSession()
        }
      } else if (response?.error) {
        console.error("❌ Auth error:", response.error)
        const errorMessage = response.error?.message || response.error?.detail || 'Authentication failed'
        setError(`Authentication error: ${errorMessage}`)
      } else {
        // Sometimes the response might be structured differently
        console.log("🔄 Waiting for session to be established...")
        await new Promise(p => setTimeout(p, 1000))
        await checkSession()
      }
    } catch (error) {
      console.error(`${provider} login error:`, error)
      setError(`Failed to login with ${provider}: ${error.message || "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handle2FA = async () => {
    try {
      if (totpCode.length !== 6) {
        setError("Please enter a 6-digit code")
        return
      }

      setLoading(true)
      console.log("🔐 Verifying 2FA code...")

      const response = await authClient.twoFactor.verify({ 
        token: totpCode 
      })

      console.log("2FA verify response:", response)

      // After verification, refresh the session
      await new Promise(p => setTimeout(p, 500))
      await checkSession()
      
      setTotpCode("")
      setShow2FA(false)
      setPendingUserId(null)
      console.log("✅ 2FA verified successfully")
    } catch (error) {
      console.error("2FA verification failed:", error)
      setError(`Invalid 2FA code: ${error.message || "Try again"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("🔓 Logging out...")

      await authClient.signOut()
      
      await new Promise(p => setTimeout(p, 300))
      await checkSession()
      
      setTotpCode("")
      setShow2FA(false)
      setPendingUserId(null)
      console.log("✅ Logout successful")
    } catch (error) {
      console.error("Logout failed:", error)
      setError("Failed to logout")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-semibold mb-8">OAuth & 2FA Integration</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {session?.user ? (
        <div className="bg-green-100 border border-green-400 rounded-lg p-6 w-full">
          <div className="space-y-4">
            <div>
              <p className="font-bold text-lg mb-3">✅ Logged In</p>
              <div className="bg-white p-4 rounded space-y-2 text-sm">
                <div>
                  <span className="font-semibold">Name:</span> {session.user?.name || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {session.user?.email || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">2FA Enabled:</span>{" "}
                  {session.user?.twoFactorEnabled ? "✓ Yes" : "No"}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-6 w-full">
          {!show2FA ? (
            <>
              <p className="font-medium mb-4">Secure Login</p>
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialLogin("google")}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                  {loading ? "Loading..." : "Login with Google"}
                </button>
                <button
                  onClick={() => handleSocialLogin("github")}
                  disabled={loading}
                  className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                  {loading ? "Loading..." : "Login with GitHub"}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="font-medium mb-4">Enter 2FA Code</p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  maxLength={6}
                  disabled={loading}
                  autoFocus
                />
                <button
                  onClick={handle2FA}
                  disabled={loading || totpCode.length !== 6}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
                <button
                  onClick={() => {
                    setShow2FA(false)
                    setTotpCode("")
                    setPendingUserId(null)
                    setError(null)
                  }}
                  className="w-full text-blue-600 hover:text-blue-700 py-2"
                >
                  Back to login
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}




