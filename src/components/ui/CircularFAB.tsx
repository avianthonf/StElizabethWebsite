/**
 * Walker circular '+' FAB — used in the Passions section.
 * Circular button with '+' icon, positioned at bottom center of panels.
 * Walker spec: 56px diameter, 2px border, transparent bg with dark text.
 * Hover: inverts to dark bg with light text.
 */
export function CircularFAB({
  label = '+',
  onClick,
  className,
}: {
  label?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        cutout-panel-circle-btn
        w-14 h-14 rounded-full border-2 flex items-center justify-center
        text-[28px] font-light leading-none
        transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
        hover:scale-110 active:scale-95
        ${className ?? ''}
      `}
      aria-label="Learn more"
    >
      {label}
    </button>
  );
}