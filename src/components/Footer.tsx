'use client';

import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { switchTab } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-450 py-12 border-t border-stone-850 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left space-y-1">
            <span className="font-serif text-lg tracking-widest uppercase font-bold text-white block">
              astroheal4U
            </span>
            <p className="text-xs text-stone-500 font-light">
              Only i know what you are hiding 💫
            </p>
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
              © 2026 astroheal4U. All rights reserved.
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
