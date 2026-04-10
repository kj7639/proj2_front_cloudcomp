import { toNextJsHandler } from "better-auth/next-js"
import { auth } from "../../../lib/auth"

const nextAuthHandler = toNextJsHandler(auth)

const handleRequest = (method) => async (req) => {
  const url = new URL(req.url)
  if (url.pathname === '/api/auth/session/get') {
    // Map /session/get to /get-session
    const newUrl = new URL(req.url)
    newUrl.pathname = '/api/auth/get-session'
    const newReq = new Request(newUrl, req)
    return nextAuthHandler[method](newReq)
  }
  return nextAuthHandler[method](req)
}

export const GET = handleRequest('GET')
export const POST = handleRequest('POST')
export const PATCH = handleRequest('PATCH')
export const PUT = handleRequest('PUT')
export const DELETE = handleRequest('DELETE')
export const OPTIONS = nextAuthHandler.OPTIONS
export const HEAD = nextAuthHandler.GET


