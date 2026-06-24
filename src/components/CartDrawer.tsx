'use client';

import { useApp } from '@/context/AppContext';
import { SHOP_PRODUCTS_DATA } from '@/lib/data';

export default function CartDrawer() {
  const { cart, cartDrawerOpen, setCartDrawerOpen, removeFromCart, adjustQty, cartTotal, cartCount, switchTab, showToast, playTone } = useApp();

  const tax = cartTotal * 0.08;
  const totalWithTax = cartTotal + tax;

  const handleCheckout = () => {
    playTone(523.25, 'sine', 0.2);
    setTimeout(() => playTone(659.25, 'sine', 0.2), 120);
    setTimeout(() => playTone(783.99, 'sine', 0.2), 240);
    setTimeout(() => playTone(1046.50, 'triangle', 0.35), 360);
    setCartDrawerOpen(false);
    showToast("Order Dispatched successfully across the layout stream! Check your inbox.");
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setCartDrawerOpen(false)}
        className={`fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          cartDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 w-full max-w-md h-full bg-[#FAF9F5] shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-out border-l border-stone-200/60 ${
        cartDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200/60 bg-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><line x1="3" x2="21" y1="6" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <h3 className="text-lg font-serif font-bold text-stone-800">Sacred Bundle</h3>
            <span className="text-xs px-2.5 py-0.5 bg-purple-50 text-purple-700 font-bold rounded-full">{cartCount}</span>
          </div>
          <button onClick={() => setCartDrawerOpen(false)} className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4 max-w-xs mx-auto">
              <div className="text-5xl animate-bounce" style={{ animationDuration: '5s' }}>🌌</div>
              <h4 className="text-base font-serif text-stone-700">Your Bundle is Void</h4>
              <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                Incorporate our small-batch candles or protective crystals to clear lingering spatial currents.
              </p>
              <button
                onClick={() => { setCartDrawerOpen(false); switchTab('shop'); }}
                className="px-4 py-2 bg-stone-800 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Browse Elements
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-stone-100 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-[#FAF9F5] flex items-center justify-center text-3xl shrink-0 border border-stone-100">
                  {item.image}
                </div>
                <div className="flex-grow space-y-0.5">
                  <span className="text-xs font-serif font-bold text-stone-800 block line-clamp-1">{item.name}</span>
                  <span className="text-[10px] text-purple-600 block">{item.category}</span>
                  <span className="text-[11px] font-mono font-bold text-stone-700 block">${item.price.toFixed(2)}</span>
                </div>
                <div className="flex flex-col items-end justify-between gap-2.5">
                  <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-rose-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                  </button>
                  <div className="flex items-center gap-2 bg-stone-50 border border-stone-200/80 rounded-lg p-1">
                    <button onClick={() => adjustQty(item.id, -1)} className="p-0.5 text-stone-400 hover:text-stone-700 rounded hover:bg-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
                    </button>
                    <span className="text-xs font-mono font-bold text-stone-800 px-1">{item.qty}</span>
                    <button onClick={() => adjustQty(item.id, 1)} className="p-0.5 text-stone-400 hover:text-stone-700 rounded hover:bg-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-stone-200/60 p-6 space-y-4">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal Value:</span>
                <span className="font-mono font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Planetary Calibration (8%):</span>
                <span className="font-mono font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-800 pt-1.5 border-t border-stone-100">
                <span>Total Exchange:</span>
                <span className="font-mono text-purple-800">${totalWithTax.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-gradient-to-r from-purple-700 to-indigo-900 hover:from-purple-800 hover:to-indigo-950 text-white font-medium text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              ✓ Dispatch Celestial Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
