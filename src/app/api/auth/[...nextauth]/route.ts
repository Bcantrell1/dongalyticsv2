import NextAuth from 'next-auth'
import SteamProvider from 'next-auth-steam'

import type { NextRequest } from 'next/server'

async function handler(
  req: NextRequest,
  ctx: { params: { nextauth: string[] } }
) {
  return NextAuth(req, ctx, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.STEAM_API_KEY!,
        callbackUrl: 'http://localhost:3000/api/auth/callback'
      })
    ]
  })
}

export {
	handler as GET,
	handler as POST
}

