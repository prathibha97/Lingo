import db from '@/database/drizzle';
import { courses } from '@/database/schema';
import { isAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { courseId: number } }
) {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const data = await db.query.courses.findFirst({
      where: eq(courses.id, params.courseId),
    });
    return NextResponse.json(data);
  } catch (error: any) {
    console.log(`ERROR: ${error.message}`);
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { courseId: number } }
) {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  const data = await db
    .update(courses)
    .set({ ...body })
    .where(eq(courses.id, params.courseId))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: number } }
) {
  if (!isAdmin()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data = await db
    .delete(courses)
    .where(eq(courses.id, params.courseId))
    .returning();

  return NextResponse.json(data[0]);
}
