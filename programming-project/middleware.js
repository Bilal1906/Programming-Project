import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const rol = request.cookies.get('rol')?.value
  const { pathname } = request.nextUrl

  const publiekeRoutes = [
    '/authentificator/login',
    '/authentificator/wachtwoord-vergeten',
    '/authentificator/first-time',
  ]

  if (publiekeRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/authentificator/login', request.url))
  }

  if (pathname.startsWith('/student') && rol !== 'student') {
    return NextResponse.redirect(new URL('/authentificator/login', request.url))
  }
  if (pathname.startsWith('/docent') && rol !== 'docent') {
    return NextResponse.redirect(new URL('/authentificator/login', request.url))
  }
  if (pathname.startsWith('/stagementor') && rol !== 'stagementor') {
    return NextResponse.redirect(new URL('/authentificator/login', request.url))
  }
  if (pathname.startsWith('/admin') && rol !== 'admin') {
    return NextResponse.redirect(new URL('/authentificator/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/student/:path*', '/docent/:path*', '/stagementor/:path*', '/admin/:path*']
}