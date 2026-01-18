'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { DAILY_TIPS } from '@/lib/constants';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dailyTip, setDailyTip] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const randomTip = DAILY_TIPS[Math.floor(Math.random() * DAILY_TIPS.length)];
    setDailyTip(randomTip);
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary">💧 BeDrop</div>
            <div className="flex gap-4 items-center">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/dashboard/incidents/new">
                <Button variant="ghost">Log Incident</Button>
              </Link>
              <Link href="/dashboard/calendar">
                <Button variant="ghost">Calendar</Button>
              </Link>
              <Link href="/dashboard/drinks">
                <Button variant="ghost">Drinks</Button>
              </Link>
              <Link href="/dashboard/goals">
                <Button variant="ghost">Goals</Button>
              </Link>
              <Link href="/dashboard/resources">
                <Button variant="ghost">Resources</Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="ghost">Settings</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-gray-600 mb-8">Here's your progress overview</p>

        {/* Daily Tip */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💡 Daily Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{dailyTip}</p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">0</p>
              <p className="text-sm text-gray-500">incidents</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">0</p>
              <p className="text-sm text-gray-500">incidents</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Dry Nights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">7</p>
              <p className="text-sm text-gray-500">last 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">
                Goal Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-purple-600">100%</p>
              <p className="text-sm text-gray-500">this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/incidents/new">
                <Button className="w-full" size="lg">
                  📝 Log Incident
                </Button>
              </Link>
              <Link href="/dashboard/drinks">
                <Button className="w-full" size="lg" variant="secondary">
                  💧 Log Drink
                </Button>
              </Link>
              <Link href="/dashboard/calendar">
                <Button className="w-full" size="lg" variant="outline">
                  📅 View Calendar
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
