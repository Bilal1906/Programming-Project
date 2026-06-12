import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Publieke paginas - geen token nodig
  const publiekeRoutes = [
    '/authentificator/login',
    '/authentificator/wachtwoord-vergeten',
    '/authentificator/first-time',
  ]

  if (publiekeRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Geen token → redirect naar login
  if (!token) {
    return NextResponse.redirect(new URL('/authentificator/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/student/:path*', '/docent/:path*', '/stagementor/:path*', '/admin/:path*']
}