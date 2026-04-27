interface SectionShellProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: 'white' | 'cream' | 'maroon' | 'navy' | 'light';
  maxWidth?: 'full' | 'site' | 'narrow';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const bgColorMap = {
  white: 'bg-white',
  cream: 'bg-[var(--color-brand-sand)]',
  maroon: 'bg-maroon',
  navy: 'bg-[var(--color-brand-navy)]',
  light: 'bg-[var(--color-gray-light)]',
};

const maxWidthMap = {
  full: 'max-w-full',
  site: 'max-w-[1200px]',
  narrow: 'max-w-5xl',
};

const paddingMap = {
  none: '',
  small: 'py-10 md:py-12',
  medium: 'py-16 md:py-20',
  large: 'py-20 md:py-28',
};

export function SectionShell({
  children,
  className = '',
  bgColor = 'white',
  maxWidth = 'site',
  padding = 'medium',
}: SectionShellProps) {
  return (
    <section className={`${bgColorMap[bgColor]} ${paddingMap[padding]} ${className}`}>
      <div className={`${maxWidthMap[maxWidth]} mx-auto px-4 lg:px-8`}>
        {children}
      </div>
    </section>
  );
}
