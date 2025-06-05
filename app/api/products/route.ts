import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const feedbackSchema = z.object({
  message: z.string().min(1),
  response: z.string().min(1),
  user: z.string().min(1),
  ai: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = feedbackSchema.parse(body);

    const feedback = await prisma.feedback.create({
      data: {
        message: validated.message,
        response: validated.response,
        user: validated.user,    // Make sure to include user
        ai: validated.ai         // Make sure to include ai
      },
    });

    return NextResponse.json(feedback);
  } catch (err) {
    console.error("❌ Error en feedback:", err);
    return NextResponse.json(
      { error: "Datos inválidos o error al guardar." },
      { status: 400 }
    );
  }
}


