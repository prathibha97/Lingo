import db from '@/database/drizzle';
import { lessons } from '@/database/schema';
import { isAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { lessonId: number } }
) {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const data = await db.query.lessons.findFirst({
      where: eq(lessons.id, params.lessonId),
    });
    return NextResponse.json(data);
  } catch (error: any) {
    console.log(`ERROR: ${error.message}`);
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { lessonId: number } }
) {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  const data = await db
    .update(lessons)
    .set({ ...body })
    .where(eq(lessons.id, params.lessonId))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: Request,
  { params }: { params: { lessonId: number } }
) {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, params.lessonId))
    .returning();

  return NextResponse.json(data[0]);
}
