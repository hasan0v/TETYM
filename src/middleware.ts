import { createClient } from '@/lib/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip middleware if Supabase is not configured (demo mode)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next()
  }

  const { supabase, response } = createClient(request)

  // Refresh session if expired - required for Server Components
  await supabase.auth.getUser()

  const url = request.nextUrl.clone()

  // Check if the request is for admin routes
  if (url.pathname.startsWith('/admin')) {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      // Redirect to login if not authenticated
      url.pathname = '/auth/login'
      url.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    // Check if user is an admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role, is_active')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single()

    if (!adminUser) {
      // Redirect to home if not an admin
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    // Check specific admin role requirements
    const pathname = url.pathname
    
    // Super admin only routes
    if (pathname.startsWith('/admin/users') || 
        pathname.startsWith('/admin/settings')) {
      if (adminUser.role !== 'super_admin') {
        url.pathname = '/admin/dashboard'
        return NextResponse.redirect(url)
      }
    }

    // Admin and above routes
    if (pathname.startsWith('/admin/projects') ||
        pathname.startsWith('/admin/students') ||
        pathname.startsWith('/admin/achievements') ||
        pathname.startsWith('/admin/clubs')) {
      if (!['super_admin', 'admin'].includes(adminUser.role)) {
        url.pathname = '/admin/dashboard'
        return NextResponse.redirect(url)
      }
    }
  }

  // Check if the request is for auth routes
  if (url.pathname.startsWith('/auth')) {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // Redirect to admin dashboard if already authenticated and is admin
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single()

      if (adminUser) {
        url.pathname = '/admin/dashboard'
        return NextResponse.redirect(url)
      } else {
        // Redirect to home if authenticated but not admin
        url.pathname = '/'
        return NextResponse.redirect(url)
      }
    }
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
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
