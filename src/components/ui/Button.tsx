import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
}

/**
 * Walker primary button — solid black bg, white text, right chevron.
 * Hover: background slides from left-to-right (SOP-001 spec).
 */
export function Button({
  label,
  icon,
  href,
  variant = 'primary',
  onClick,
  className,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2.5 px-9 py-4 text-xs font-bold uppercase tracking-[0.15em] cursor-pointer select-none no-underline transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] relative overflow-hidden group';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-[#000] text-white border-2 border-[#000] hover:bg-transparent hover:text-white',
    outline:
      'bg-transparent text-[#000] border-2 border-[#000] hover:bg-[#000] hover:text-white',
    ghost:
      'bg-transparent text-[#333] border-none p-0 hover:text-[#6C1F35] underline',
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={cn(base, variants[variant], className)}
    >
      {/* Hover slide background */}
      <span
        className="absolute inset-0 bg-[#6C1F35] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center gap-2.5">
        {label}
        {icon ?? <ChevronRight size={16} />}
      </span>
    </Tag>
  );
}
