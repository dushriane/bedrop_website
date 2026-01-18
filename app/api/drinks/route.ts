import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { drinkSchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const drinks = JSON.parse(
      globalThis.localStorage?.getItem('drinks') || '[]'
    );

    const userDrinks = drinks.filter((d: any) => d.userId === session.user.id);

    return NextResponse.json(userDrinks);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch drinks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = drinkSchema.parse(body);

    const newDrink = {
      id: Date.now().toString(),
      userId: session.user.id,
      date: new Date().toISOString().split('T')[0],
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    const drinks = JSON.parse(
      globalThis.localStorage?.getItem('drinks') || '[]'
    );
    drinks.push(newDrink);

    if (globalThis.localStorage) {
      globalThis.localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    return NextResponse.json(newDrink, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to create drink' },
      { status: 400 }
    );
  }
}
