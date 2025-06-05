import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const { user, pass } = await req.json();

  if (
    user === process.env.ADMIN_USER &&
    pass === process.env.ADMIN_PASS
  ) {
    setAuthCookie();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
