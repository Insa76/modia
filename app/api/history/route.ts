import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const history = await prisma.conversation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return NextResponse.json(history);
  } catch (err) {
    return NextResponse.json({ error: 'Error al obtener historial' }, { status: 500 });
  }
}
