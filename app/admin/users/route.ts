import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(["admin", "user"]),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = userSchema.parse(body);

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const user = await prisma.user.create({
      data: {
        email: validated.email,
        name: validated.name,
        role: validated.role,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error("❌ Error al crear usuario:", err);
    return NextResponse.json(
      { error: "Datos inválidos o error al crear usuario." },
      { status: 400 }
    );
  }
}
