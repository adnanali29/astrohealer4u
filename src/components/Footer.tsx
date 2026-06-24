'use client';

import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { switchTab } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-450 py-12 border-t border-stone-850 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left space-y-3">
            <div>
              <span className="font-serif text-lg tracking-widest uppercase font-bold text-white block">
                astrohealer4U
              </span>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Only i know what you are hiding 💫
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="https://www.instagram.com/reel/DS2MZr7Eq_M/?igsh=MWw4Z2ZiczZueGZwaA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-rose-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/r/1JCB4e5FpX/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Links & Copyright */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-stone-400">
              {[
                { id: 'home', label: 'Home' },
                { id: 'consultation', label: 'Consultations' },
                { id: 'shop', label: 'Shop' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact' },
                { id: 'admin', label: 'Admin' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => switchTab(id)}
                  className="hover:text-white transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-stone-500 font-light mt-1">
              © 2026 astrohealer4U. All rights reserved.
            </p>
          </div>

          {/* Developed By */}
          <div className="text-xs text-stone-500 text-center md:text-right">
            <a
              href="https://www.pixelwebpages.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors font-bold"
            >
              Developed by Pixel Web Pages ❤️
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
