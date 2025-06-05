import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validator/user";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { errorResponse, successResponse } from "@/lib/apiResponse";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(errorResponse("Datos inválidos"), { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(errorResponse("El email ya está registrado"), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user",
      },
    });

    return NextResponse.json(successResponse(newUser));
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(errorResponse("Error interno"), { status: 500 });
  }
}
