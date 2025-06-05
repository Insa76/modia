// lib/auth/withRole.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Middleware genérico que recibe un handler y un rol requerido
export function withRole(handler: Function, role: string) {
  return async function (req: NextRequest, ...args: any[]) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== role) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    return handler(req, ...args);
  };
}
