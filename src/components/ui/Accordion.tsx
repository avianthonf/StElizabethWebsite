'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Walker Accordion — used for "READ MORE" expanding info panels.
 * Animation: Framer Motion AnimatePresence (SOP-001 spec).
 * Height animates from 0 → auto with spring easing.
 */
interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={className}>
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="walker-accordion-btn"
            aria-expanded={openIndex === i}
          >
            <span>{item.title}</span>
            <motion.span
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.83, 0, 0.17, 1], // ease-in-out-quint (SOP-001)
                }}
                style={{ overflow: 'hidden' }}
              >
                <p className="walker-body" style={{ padding: '16px 0', fontSize: 15 }}>
                  {item.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
