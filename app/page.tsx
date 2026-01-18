import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-6xl font-bold mb-4">💧 BeDrop</h1>
          <p className="text-2xl opacity-90">
            Your personal bedwetting tracking companion
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-12 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Take control of your journey
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Track patterns, understand triggers, and make progress with
              confidence.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="text-lg px-8">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Register
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Track Incidents</h3>
              <p className="text-gray-600">
                Log detailed information about bedwetting events
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Visualize Patterns</h3>
              <p className="text-gray-600">
                See trends and identify triggers with calendar view
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
              <p className="text-gray-600">
                Your data is encrypted and stored securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
