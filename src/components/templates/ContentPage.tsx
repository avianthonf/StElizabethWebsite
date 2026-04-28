import { WalkHeader } from '@/components/layout/WalkHeader';

interface ContentPageProps {
  children: React.ReactNode;
  backgroundColor?: string;
  maxWidth?: string;
}

/**
 * ContentPage Template
 *
 * Reusable page template for interior pages. Provides:
 * - WalkHeader (ghost nav)
 * - Main content area with consistent padding
 * - Footer
 *
 * Usage:
 * ```tsx
 * <ContentPage>
 *   <YourPageContent />
 * </ContentPage>
 * ```
 */
export function ContentPage({
  children,
  backgroundColor = 'var(--color-white)',
  maxWidth = 'var(--container-max)',
}: ContentPageProps) {
  return (
    <>
      <WalkHeader />

      <main
        style={{
          backgroundColor,
          minHeight: '100vh',
          paddingTop: 80, // Account for fixed header height
        }}
      >
        <div
          style={{
            maxWidth,
            margin: '0 auto',
            padding: 'var(--section-padding-y) var(--container-padding)',
          }}
        >
          {children}
        </div>
      </main>

    </>
  );
}

/**
 * PageHero Component
 *
 * Simple hero section for interior pages (not the masked hero from homepage).
 * Displays page title and optional description.
 */
interface PageHeroProps {
  title: string;
  description?: string;
  backgroundImage?: string;
}

export function PageHero({ title, description, backgroundImage }: PageHeroProps) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: backgroundImage ? 400 : 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: backgroundImage ? 'transparent' : 'var(--color-primary-maroon)',
        color: 'var(--color-white)',
        marginBottom: 'var(--section-padding-y)',
      }}
    >
      {backgroundImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(108, 31, 53, 0.7)', // Maroon overlay
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, padding: '0 24px' }}>
        <h1
          className="walker-heading"
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            marginBottom: description ? 24 : 0,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="walker-body"
            style={{
              fontSize: 18,
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
