"use client"
import { authClient } from "@/app/lib/auth-client"
import { useState, useEffect, useCallback } from "react"
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const sendAccessStatus = async(status)=>{
    try {
        // Use relative path to avoid /api/api double prefix
        // The rewrite rule will handle routing to the backend
        await fetch(`/api/access-status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        })
    } catch (err) {
        console.warn("Failed to send access status:", err)
    }
}

export function useSession() {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(false)

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
            await sendAccessStatus(true)

        } catch (error) {
            console.error("❌ Session check failed:", error)
            setSession(null)
            await sendAccessStatus(false)
        // Don't set error for session check failures, as this is normal when not logged in
        }
  }, [])

  useEffect(() => {
    checkSession()
    const interval = setInterval(checkSession, 3000)
    return () => clearInterval(interval)
  }, [checkSession])

    return { session, loading, setLoading, checkSession }

}