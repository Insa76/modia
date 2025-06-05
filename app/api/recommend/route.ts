import { NextResponse } from "next/server";
import { z } from "zod";
import { OpenAI } from "openai";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Validación de entrada
const schema = z.object({
  message: z.string().min(1),
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const userMessage = result.data.message;

  try {
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // más liviano que GPT-4
      messages: [
        { role: "system", content: "Eres un asistente de moda que recomienda productos." },
        { role: "user", content: userMessage },
      ],
    });

    const aiText = aiResponse.choices[0].message.content || "";

    await prisma.feedback.create({
      data: {
        message: userMessage,
        response: aiText,
        user: session.user.email || "",
        ai: "gpt-3.5-turbo", // o el valor adecuado para el campo 'ai'
      },
    });

    return NextResponse.json({ response: aiText });
  } catch (err) {
    console.error("Error en /recommend:", err);
    return NextResponse.json({ error: "Error procesando recomendación." }, { status: 500 });
  }
}
