import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user, ai, message, response } = body;

    if (!user || !ai || !message || !response) {
      return NextResponse.json(errorResponse( "Datos incompletos" ), { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        user,
        ai,
        message,
        response,
      },
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    console.error("Error al guardar feedback:", error);
    return NextResponse.json(errorResponse("Error interno" ), { status: 500 });
  }
}

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    return NextResponse.json(errorResponse("Error al obtener historial" ), { status: 500 });
  }
}