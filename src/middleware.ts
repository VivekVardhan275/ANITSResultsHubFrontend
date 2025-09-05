
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const userRole = request.cookies.get('userRole')?.value

  if (userRole) {
    response.headers.set('x-user-role', userRole)
  }

  return response
}

export const config = {
  matcher: '/settings',
}
