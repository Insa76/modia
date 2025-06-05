import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.enum(['admin', 'user']),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const data = updateUserSchema.parse(body);

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('❌ Error en PUT /api/users/[id]:', error);
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
}
