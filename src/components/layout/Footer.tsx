import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#002147] text-white pt-16 pb-8 border-t-[8px] border-[#800000]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand & Address */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#800000] font-bold">SE</span>
            </div>
            <div className="font-display font-semibold text-lg leading-tight">
              St. Elizabeth<br />High School
            </div>
          </div>

          <ul className="space-y-4 text-sm text-[#F5F5DC]">
            <li className="flex gap-3 items-start">
              <MapPin size={18} className="shrink-0 mt-0.5 text-[#D4AF37]" />
              <span>
                Pomburpa,<br />
                Bardez, Goa 403523<br />
                India
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={18} className="shrink-0 text-[#D4AF37]" />
              <span>+91 832 223 4567</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={18} className="shrink-0 text-[#D4AF37]" />
              <span>info@stelizabeth.edu.in</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-display font-semibold text-[#D4AF37] mb-6 text-lg">Quick Links</h3>
          <ul className="space-y-3 text-sm text-[#F5F5DC]">
            <li><Link href="/about" className="hover:text-white hover:underline transition-all">About Us</Link></li>
            <li><Link href="/admissions" className="hover:text-white hover:underline transition-all">Admissions</Link></li>
            <li><Link href="/academics" className="hover:text-white hover:underline transition-all">Academics</Link></li>
            <li><Link href="/student-life" className="hover:text-white hover:underline transition-all">Student Life</Link></li>
            <li><Link href="/alumni" className="hover:text-white hover:underline transition-all">Alumni Network</Link></li>
            <li><Link href="/contact" className="hover:text-white hover:underline transition-all">Contact Us</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-display font-semibold text-[#D4AF37] mb-6 text-lg">Resources</h3>
          <ul className="space-y-3 text-sm text-[#F5F5DC]">
            <li><Link href="/resources/calendar" className="hover:text-white hover:underline transition-all">School Calendar</Link></li>
            <li><Link href="/resources/newsletter" className="hover:text-white hover:underline transition-all">Newsletter</Link></li>
            <li><Link href="/resources/parent-portal" className="hover:text-white hover:underline transition-all">Parent Portal</Link></li>
            <li><Link href="/resources/uniform" className="hover:text-white hover:underline transition-all">Uniform Guidelines</Link></li>
            <li><Link href="/resources/transportation" className="hover:text-white hover:underline transition-all">Transportation</Link></li>
            <li><Link href="/careers" className="hover:text-white hover:underline transition-all">Careers</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="font-display font-semibold text-[#D4AF37] mb-6 text-lg">Connect With Us</h3>
          <p className="text-sm text-[#F5F5DC] mb-6">
            Follow us on social media to stay updated with the latest news, events, and stories from our community.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#800000] hover:text-white transition-all text-sm font-semibold">
              f
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#800000] hover:text-white transition-all text-sm font-semibold">
              ig
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#800000] hover:text-white transition-all text-sm font-semibold">
              yt
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
        <p>&copy; {new Date().getFullYear()} St. Elizabeth High School, Pomburpa. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}