'use client';

import { useApp } from '@/context/AppContext';

export default function ToastContainer() {
  const { toasts } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-stone-900/95 text-stone-100 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-md border border-stone-800 pointer-events-auto animate-fade-in-up"
        >
          <span className="text-amber-300 animate-pulse shrink-0">✦</span>
          <p className="text-xs font-semibold tracking-wide">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
