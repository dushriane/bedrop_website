import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { goalSchema } from '@/lib/validation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const goals = JSON.parse(globalThis.localStorage?.getItem('goals') || '[]');

    const userGoals = goals.filter((g: { userId: string }) => g.userId === session.user!.id);

    return NextResponse.json(userGoals);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch goals' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = goalSchema.parse(body);

    const newGoal = {
      id: Date.now().toString(),
      userId: session.user!.id,
      ...validatedData,
      progress: 0,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const goals = JSON.parse(globalThis.localStorage?.getItem('goals') || '[]');
    goals.push(newGoal);

    if (globalThis.localStorage) {
      globalThis.localStorage.setItem('goals', JSON.stringify(goals));
    }

    return NextResponse.json(newGoal, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create goal';
    return NextResponse.json(
      { message },
      { status: 400 }
    );
  }
}
