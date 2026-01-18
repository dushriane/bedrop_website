import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-gray-800 mb-4">404</h2>
        <p className="text-2xl text-gray-600 mb-6">Page not found</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
