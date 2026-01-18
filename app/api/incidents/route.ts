import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { incidentSchema } from '@/lib/validation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // In production, fetch from database
    const incidents = JSON.parse(
      globalThis.localStorage?.getItem('incidents') || '[]'
    );

    const userIncidents = incidents.filter(
      (i: { userId: string }) => i.userId === session.user!.id
    );

    return NextResponse.json(userIncidents);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch incidents' },
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
    const validatedData = incidentSchema.parse(body);

    const newIncident = {
      id: Date.now().toString(),
      userId: session.user!.id,
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    const incidents = JSON.parse(
      globalThis.localStorage?.getItem('incidents') || '[]'
    );
    incidents.push(newIncident);

    if (globalThis.localStorage) {
      globalThis.localStorage.setItem('incidents', JSON.stringify(incidents));
    }

    return NextResponse.json(newIncident, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create incident';
    return NextResponse.json(
      { message },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'Incident ID required' },
        { status: 400 }
      );
    }

    const incidents = JSON.parse(
      globalThis.localStorage?.getItem('incidents') || '[]'
    );

    const updatedIncidents = incidents.filter(
      (i: { id: string; userId: string }) => !(i.id === id && i.userId === session.user!.id)
    );

    if (globalThis.localStorage) {
      globalThis.localStorage.setItem(
        'incidents',
        JSON.stringify(updatedIncidents)
      );
    }

    return NextResponse.json({ message: 'Incident deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete incident' },
      { status: 500 }
    );
  }
}
