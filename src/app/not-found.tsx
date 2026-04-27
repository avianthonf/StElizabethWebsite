import Link from "next/link";
import { WalkHeader } from "@/components/layout/WalkHeader";
import { Button } from "@/components/ui/Button";

/**
 * Custom 404 page for Next.js App Router.
 *
 * Branded with St. Elizabeth identity:
 * - Maroon accent color (#6C1F35)
 * - Montserrat font for headings
 * - Consistent navigation via WalkHeader
 * - Friendly messaging with clear path back to homepage
 */
export default function NotFound() {
  return (
    <>
      <WalkHeader />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="text-center max-w-2xl">
          <h1
            className="text-6xl font-bold mb-4"
            style={{
              color: 'var(--color-primary-maroon, #6C1F35)',
              fontFamily: 'var(--font-heading), Montserrat, sans-serif'
            }}
          >
            404
          </h1>
          <h2
            className="text-3xl font-semibold mb-6"
            style={{ fontFamily: 'var(--font-heading), Montserrat, sans-serif' }}
          >
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button href="/" label="Return to Homepage" />
        </div>
      </main>
    </>
  );
}
