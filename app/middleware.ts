import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function authMiddleware(request: NextRequest) {
    const isAdmin = request.nextUrl.pathname.startsWith('/admin');
    const isLogin = request.nextUrl.pathname === '/admin/login';

    if(!isAdmin || isLogin) {
        return NextResponse.next();
    }

    const token = request.cookies.get('kxh_auth_token')?.value;

    if(!token) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/old-path"],
};