import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const AUTH_ROUTES = ["/login", "/signup", "/verify"];

export async function proxy(request: NextRequest) {

    const { pathname } = request.nextUrl;
    const token = request.cookies.get("token")?.value;

    let userIsLoggedIn = false;
    let user: any = null;

    if (token) {
        try {
            // Verify the token to check if the user is authenticated.
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            user = decoded;
            userIsLoggedIn = true;
        } catch (error) {
            // If token verification fails, treat the user as not logged in.
            userIsLoggedIn = false;
        }
    }

    const isAuthRoute = AUTH_ROUTES.includes(pathname);
    const isDashboardRoute = pathname.startsWith("/dashboard");

    // Redirect logged-in users from auth routes to the dashboard.
    if (isAuthRoute && userIsLoggedIn) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect non-logged-in users from dashboard routes to the login page.
    if (isDashboardRoute && !userIsLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // New authorization logic for create-blog page
    if (pathname === "/dashboard/blog/create-blog") {
        if (!userIsLoggedIn || user?.role !== "admin") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/verify"],
};
