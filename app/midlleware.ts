
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define admin routes
const adminRoutes = ["/admin"];

export default withAuth(
  async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAdminRoute = adminRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  // Si no está logueado
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

    // Si accede a ruta admin sin ser admin
  if (isAdminRoute && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (process.env.NODE_ENV === "production" && !req.url.startsWith("https")) {
  return NextResponse.redirect(new URL("https://" + req.headers.get("host"), req.url));
}
  
 return NextResponse.next();
  }
);

// Configura qué rutas debe interceptar este middleware
export const config = {
  matcher: ["/admin/:path*"], // Aplica a todas las rutas bajo /admin
};