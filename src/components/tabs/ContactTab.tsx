'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function ContactTab() {
  const { playTone, showToast, officeAddress, contactEmail, contactPhone } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTone(523.25, 'triangle', 0.2);
    setSubmitted(true);
    showToast("Courier dispatch successfully initiated! 🕊️");
  };

  const reset = () => {
    playTone(293.66, 'sine', 0.12);
    setSubmitted(false);
  };

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border border-stone-200/60 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">

          {/* Contact Details */}
          <div className="lg:col-span-5 bg-gradient-to-tr from-purple-50/50 via-rose-50/40 to-amber-50/30 p-8 sm:p-12 space-y-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-purple-600 font-bold block mb-1">Aura Messenger</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-800">Stellar Dispatch</h2>
              <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">
                Send a courier with questions about birth mappings, customized celestial corporate schedules, or product details.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {[
                { icon: '📍', label: 'Office Location', value: officeAddress },
                { icon: '📧', label: 'Conatct email', value: contactEmail },
                { icon: '📞', label: 'Phone Number', value: contactPhone },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-purple-600 border border-stone-200/40 shadow-sm">
                    {icon}
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider block text-stone-400 font-bold">{label}</span>
                    <span className="font-semibold text-stone-700">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-stone-400 leading-relaxed font-light">
              We usually safely deliver return alignments in 1-2 solar cycles.
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 justify-center flex flex-col">
            {submitted ? (
              <div className="text-center py-8 space-y-4 max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto text-2xl">✦</div>
                <h3 className="text-xl font-serif text-stone-800">Dispatch Propagated</h3>
                <p className="text-sm text-stone-500 font-light leading-relaxed">
                  Your message has been launched successfully. Our astrohealer4U team will review it shortly.
                </p>
                <button onClick={reset} className="text-xs font-semibold text-purple-700 hover:underline">
                  Send another dispatch
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">Your Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200/60 bg-[#FAF9F5]/40 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">Email Destination</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200/60 bg-[#FAF9F5]/40 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">Inquiry Frequency</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200/60 bg-[#FAF9F5]/40 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-stone-900 hover:bg-stone-950 text-white font-medium text-xs tracking-widest uppercase rounded-xl transition-all shadow-sm"
                >
                  Transmit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
