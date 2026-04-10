import { createAuthClient } from "better-auth/client"
import { twoFactorClient } from "better-auth/client/plugins"

// Create auth client lazily to avoid SSR issues
let authClientInstance = null

const getAuthClient = () => {
  if (!authClientInstance) {
    // On the client side, use relative URL so it stays within same domain
    // On the server side (SSR), this won't be called anyway due to typeof window check
    authClientInstance = createAuthClient({
      baseURL: "/api/auth",
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
