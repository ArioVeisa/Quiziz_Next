import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './lib/supabase/middleware'


export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = new URL(request.url)
  
  // URL yang butuh login
  const protectedRoutes = ['/dashboard'];

  // Jika user belum login dan mencoba akses halaman yang dilindungi
  if (!user && protectedRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Jika user sudah login dan mencoba akses halaman login/register
  if (user && (url.pathname === '/login' || url.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}