import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { incidentSchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // In production, fetch from database
    const incidents = JSON.parse(
      globalThis.localStorage?.getItem('incidents') || '[]'
    );

    const userIncidents = incidents.filter(
      (i: any) => i.userId === session.user.id
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
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = incidentSchema.parse(body);

    const newIncident = {
      id: Date.now().toString(),
      userId: session.user.id,
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
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to create incident' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
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
      (i: any) => !(i.id === id && i.userId === session.user.id)
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
