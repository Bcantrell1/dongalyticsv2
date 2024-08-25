'use client'

import { signIn, signOut } from 'next-auth/react'
import { Button } from '../ui/button'

export function SignIn() {
  return <Button onClick={() => signIn()}>Sign In</Button>
}

export function SignOut() {
  return <Button onClick={() => signOut()}>Sign Out</Button>
}