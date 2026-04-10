import { createAuthClient } from "better-auth/client"
import { twoFactorClient } from "better-auth/client/plugins"

// Create auth client lazily to avoid SSR issues
let authClientInstance = null

const getAuthClient = () => {
  if (!authClientInstance) {
    // BetterAuth requires an absolute URL, so construct it from the current window location
    const baseURL = typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.host}/api/auth`
      : "https://cpsy300.me/api/auth"

    authClientInstance = createAuthClient({
      baseURL,
      plugins: [twoFactorClient()]
    })
  }
  return authClientInstance
}

export const authClient = new Proxy({}, {
  get(target, prop) {
    const client = getAuthClient()
    return client[prop]
  }
})
