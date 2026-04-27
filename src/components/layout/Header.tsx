"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteNavigation } from "@/lib/site-navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-[#800000] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <span>St. Elizabeth High School, Pomburpa</span>
          <div className="flex gap-4">
            <a href="tel:+918322234567" className="hover:underline">+91 832 223 4567</a>
            <a href="mailto:info@stelizabeth.edu.in" className="hover:underline">info@stelizabeth.edu.in</a>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#800000] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">SE</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-lg font-semibold text-[#002147] leading-tight">
              St. Elizabeth High School
            </div>
            <div className="text-xs text-zinc-500">Pomburpa, Goa</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {siteNavigation.map((item) => (
            <div key={item.label} className="relative group">
              <a
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#002147] hover:text-[#800000] transition-colors"
              >
                {item.label}
                {item.children && item.children.length > 0 && (
                  <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </a>
              {item.children && item.children.length > 0 && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white shadow-lg rounded-md border border-zinc-100 py-2 min-w-[200px]">
                    {item.children.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-zinc-700 hover:text-[#800000] hover:bg-zinc-50"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a
            href="/admission/apply"
            className="ml-4 px-5 py-2 bg-[#800000] text-white text-sm font-medium rounded-full hover:bg-[#5c0000] transition-colors"
          >
            Apply Now
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-zinc-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-100">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {siteNavigation.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className="block py-2 text-sm font-medium text-[#002147] border-b border-zinc-100"
                  onClick={() => {
                    if (!item.children || item.children.length === 0) setMobileOpen(false);
                    else setOpenSubmenu(openSubmenu === item.label ? null : item.label);
                  }}
                >
                  {item.label}
                </a>
                {item.children && item.children.length > 0 && openSubmenu === item.label && (
                  <div className="pl-4 py-2 flex flex-col gap-1">
                    {item.children.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="py-1 text-sm text-zinc-600"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="/admission/apply"
              className="mt-2 px-5 py-3 bg-[#800000] text-white text-sm font-medium rounded-full text-center"
              onClick={() => setMobileOpen(false)}
            >
              Apply Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}