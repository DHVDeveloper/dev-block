import { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function getAuthUser(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token || !token.sub) {
    return null
  }

  return {
    id: token.sub,
    email: token.email,
    name: token.name,
  }
}
