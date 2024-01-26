import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'
import { decryptDate } from './lib/encryption';
 
export function middleware(req) {

    // console.log(req);
    
  const { pathname } = req.nextUrl;

  const session = req.cookies.get("session")


if (!session && pathname !== '/login') {
    return NextResponse.redirect( new URL('/login', req.url))
}

else if (session) {
    // console.log("vv", session.value);
    const res = decryptDate(session.value)

      const expires = new Date(res?.date)
      
      if (expires < new Date()) {
          return NextResponse.redirect( new URL('/login', req.url))
        }
        
       

      return NextResponse.next()
}



  
 
//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//   }

 
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|.|favicon.ico).*)',
    ],
  }