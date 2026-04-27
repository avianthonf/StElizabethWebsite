import { cn } from '@/lib/utils';

type SkeletonVariant = 'text' | 'card' | 'image' | 'section';

interface SkeletonLoaderProps {
  variant?: SkeletonVariant;
  className?: string;
}

/**
 * Reusable skeleton loading component.
 *
 * Provides visual feedback during content loading with animated pulse effect.
 * Prevents layout shift and blank content during initial page load.
 *
 * Variants:
 * - text: Single line of text (h-4)
 * - card: Card-sized block (h-64)
 * - image: Image-sized block (h-96)
 * - section: Full section height (h-screen)
 */
export function SkeletonLoader({
  variant = 'text',
  className = '',
}: SkeletonLoaderProps) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';

  const variantClasses: Record<SkeletonVariant, string> = {
    text: 'h-4 w-full',
    card: 'h-64 w-full',
    image: 'h-96 w-full',
    section: 'h-screen w-full',
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      aria-label="Loading content"
      role="status"
    />
  );
}
