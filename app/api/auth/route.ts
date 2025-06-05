import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}
