import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth.config";


export default async function middleware(req: NextRequest) {
    const session = await auth();
    if (!session) return null;
    const {user} = session;
    const absoluteUrl = new URL("/dashboard", req.url)
    if (user.rol.nombreRol !== 'Admin' && user.rol.nombreRol !== 'Root') {
        return NextResponse.redirect(absoluteUrl.toString())
    };
}

export const config = {
    matcher: ['/administraciones/new', '/edificios/new', '/guardias/new', '/hojas/new', '/usuarios/:path*']
  }