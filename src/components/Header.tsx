'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const { activeTab, switchTab, wishlist, cartCount, setCartDrawerOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Brand Logo */}
          <button
            onClick={() => {
              switchTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-purple-100 via-rose-100 to-amber-100 flex items-center justify-center border border-white/60 shadow-sm overflow-hidden transition-transform duration-500 group-hover:rotate-180">
              <span className="text-lg animate-pulse">✦</span>
            </div>
            <div className="text-left">
              <span className="font-serif text-base sm:text-lg tracking-widest uppercase font-bold text-stone-850 block leading-tight">astrohealer4U</span>
              <span className="text-[10px] tracking-wide text-purple-600 hidden sm:block font-semibold">Only i know what you are hiding 💫</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {[
              { id: 'home', label: 'Home' },
              { id: 'consultation', label: 'Consultations' },
              { id: 'shop', label: 'Celestial Shop' },
              { id: 'about', label: 'About Us' },
              { id: 'contact', label: 'Get in Touch' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => switchTab(id)}
                className={`relative px-4 py-2.5 text-xs tracking-wider uppercase font-semibold rounded-full transition-all ${
                  activeTab === id
                    ? 'text-purple-900 font-bold bg-purple-50'
                    : 'text-stone-600 hover:text-purple-700 hover:bg-purple-50/50'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <button
              onClick={() => {
                switchTab('shop');
                setMobileMenuOpen(false);
              }}
              className="relative p-2.5 text-stone-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all group"
              title="Wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 transition-transform group-hover:scale-110 ${wishlist.length > 0 ? 'fill-rose-400 text-rose-500' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] bg-rose-400 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => {
                setCartDrawerOpen(true);
                setMobileMenuOpen(false);
              }}
              className="relative p-2.5 text-stone-600 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-all group"
              title="Celestial Bundle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] bg-purple-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2.5 text-stone-600 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-all md:hidden flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200/50 bg-[#FAF9F5]/95 backdrop-blur-md px-4 py-4 space-y-3 shadow-lg transition-all duration-300">
          {/* Mobile Branding Panel */}
          <div className="flex flex-col items-center justify-center py-4 border-b border-stone-200/50 mb-3 text-center">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-purple-100 via-rose-100 to-amber-100 flex items-center justify-center border border-white/60 shadow-sm overflow-hidden mb-2">
              <span className="text-xl animate-pulse">✦</span>
            </div>
            <span className="font-serif text-base tracking-widest uppercase font-bold text-stone-850 block leading-tight">astrohealer4U</span>
            <span className="text-[10px] tracking-wide text-purple-600 block font-semibold mt-1">Only i know what you are hiding 💫</span>
          </div>

          {[
            { id: 'home', label: 'Home' },
            { id: 'consultation', label: 'Consultations' },
            { id: 'shop', label: 'Celestial Shop' },
            { id: 'about', label: 'About Us' },
            { id: 'contact', label: 'Get in Touch' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                switchTab(id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-xs tracking-wider uppercase font-semibold rounded-xl transition-all block ${
                activeTab === id
                  ? 'text-purple-900 font-bold bg-purple-50'
                  : 'text-stone-600 hover:text-purple-700 hover:bg-purple-50/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
