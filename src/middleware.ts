import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === '/login' || path === '/signup' || path === '/verifyemail';

  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    // If the user is authenticated and trying to access a public path, redirect them to the home page
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    // If the user is not authenticated and trying to access a protected path, redirect them to the login page
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

// This middleware will run on the specified paths and check for authentication
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:id',
    '/login',
    '/signup',
    '/verifyemail',
  ],
};
