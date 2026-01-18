import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // In production, save to database
    // For now, we'll use localStorage simulation
    const users = JSON.parse(
      globalThis.localStorage?.getItem('users') || '[]'
    );

    // Check if user exists
    if (users.find((u: { email: string }) => u.email === validatedData.email)) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    if (globalThis.localStorage) {
      globalThis.localStorage.setItem('users', JSON.stringify(users));
    }

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    return NextResponse.json(
      { message },
      { status: 400 }
    );
  }
}
