import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  // Get the pathname of the request
  const path = req.nextUrl.pathname;

  // Define protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/clientDash'];
  
  // Define auth routes
  const authRoutes = ['/signin', '/signup'];

  // If trying to access protected routes without session, redirect to signin
  if (protectedRoutes.includes(path) && !session) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // If trying to access auth routes with session, redirect based on user type
  if (session && authRoutes.includes(path)) {
    // Get user type
    const { data: lawyerData } = await supabase
      .from('lawyers')
      .select('*')
      .eq('auth_id', session.user.id)
      .single();

    const { data: clientData } = await supabase
      .from('clients')
      .select('*')
      .eq('auth_id', session.user.id)
      .single();

    if (clientData) {
      return NextResponse.redirect(new URL('/clientDash', req.url));
    } else if (lawyerData) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return res;
}

// Specify which routes this middleware should run for
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}