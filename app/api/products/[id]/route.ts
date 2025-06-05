import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateProductSchema = z.object({
  title: z.string().min(1),
  price: z.number().nonnegative(),
  tags: z.string(),
  image: z.string().url(),
  featured: z.boolean().optional(),
  outOfStock: z.boolean().optional(),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const data = updateProductSchema.parse(body);

    // Convert tags string (e.g., comma-separated) to array
    const tagsArray = data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);

    const updated = await prisma.product.update({
      where: { id: Number(params.id) },
      data: {
        title: data.title,
        price: data.price,
        image: data.image,
        featured: data.featured,
        tags: {
          set: [], // Remove all existing tags
          connectOrCreate: tagsArray.map((tag: string) => ({
            where: { name: tag }, // 'name' must be unique in your Prisma schema for ProductTag
            create: { name: tag }
          })) as any // Add 'as any' if 'name' is unique, or update your schema accordingly
        }
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('❌ Error en PUT /api/products/[id]:', error);
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
}
