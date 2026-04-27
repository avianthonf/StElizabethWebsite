"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteNavigation, type NavItem } from "@/lib/site-navigation";

export function EnhancedHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Track scroll position for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* Top utility bar */}
      <div className="bg-[#800000] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <span>St. Elizabeth High School, Pomburpa</span>
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+918322234567" className="hover:underline">
              +91 832 223 4567
            </a>
            <a href="mailto:info@stelizabeth.edu.in" className="hover:underline">
              info@stelizabeth.edu.in
            </a>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1 hover:bg-[#5c0000] rounded transition-colors"
              aria-label="Toggle search"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Search bar (expandable) */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-50 border-b border-zinc-200 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <input
                type="search"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

        {/* Desktop Navigation with Mega Menu */}
        <nav className="hidden lg:flex items-center gap-1">
          {siteNavigation.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#002147] hover:text-[#800000] transition-colors"
              >
                {item.label}
                {item.children && item.children.length > 0 && (
                  <svg
                    className={`w-4 h-4 ml-0.5 transition-transform duration-200 ${
                      hoveredItem === item.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </a>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {item.children && item.children.length > 0 && hoveredItem === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 pt-2 z-50"
                  >
                    <div className="bg-white shadow-xl rounded-md border border-zinc-100 py-3 min-w-[240px]">
                      {item.children.map((sub) => (
                        <a
                          key={sub.href}
                          href={sub.href}
                          className="block px-5 py-2.5 text-sm text-zinc-700 hover:text-[#800000] hover:bg-zinc-50 transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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

      {/* Mobile Navigation with Accordion */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-[104px] right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <nav className="px-4 py-6 flex flex-col gap-1">
                {siteNavigation.map((item) => (
                  <div key={item.label} className="border-b border-zinc-100">
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between py-3 text-sm font-medium text-[#002147]"
                    >
                      <span>{item.label}</span>
                      {item.children && item.children.length > 0 && (
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openSubmenu === item.label ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {item.children &&
                        item.children.length > 0 &&
                        openSubmenu === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-3 flex flex-col gap-1">
                              {item.children.map((sub) => (
                                <a
                                  key={sub.href}
                                  href={sub.href}
                                  className="py-2 text-sm text-zinc-600 hover:text-[#800000]"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {sub.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ))}

                <a
                  href="/admission/apply"
                  className="mt-4 px-5 py-3 bg-[#800000] text-white text-sm font-medium rounded-full text-center hover:bg-[#5c0000] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Apply Now
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
