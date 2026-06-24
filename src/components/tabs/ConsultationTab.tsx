'use client';

import { useApp } from '@/context/AppContext';
import { SERVICES, ConsultationService } from '@/lib/data';

type ServiceType = ConsultationService;

const WA_NUMBER = '919041544404';

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ConsultationTab() {
  const { playTone, openBooking, booking, services, contactPhone } = useApp();
  const rawNum = contactPhone.replace(/\D/g, '');
  const waNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;

  const openComboWA = () => {
    playTone(523.25, 'triangle', 0.2);
    const msg = `🙏 *Combo Offer Enquiry*\n\nHello! I want to book 2 astrology services and avail the 10% discount.\n\nPlease guide me on the best combo for my needs. 🙏`;
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F7F5FF] to-[#FFF5F7] pb-24">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-700 text-white py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-[10%] text-6xl">🌙</div>
          <div className="absolute top-6 right-[15%] text-5xl">⭐</div>
          <div className="absolute bottom-4 left-[25%] text-4xl">✨</div>
          <div className="absolute bottom-6 right-[30%] text-5xl">🪐</div>
        </div>
        <div className="relative max-w-2xl mx-auto space-y-3 font-sans">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-2">
            ✦ Jyotish Consultation Services
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
            Talk to an Expert Astrologer
          </h1>
          <p className="text-purple-200 text-sm font-light leading-relaxed">
            Personalized guidance via Chat or Call. Book instantly via WhatsApp.
          </p>
          <a
            href={`https://wa.me/${waNum}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg transition-colors mt-2"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            {contactPhone}
          </a>
        </div>
      </div>

      {/* ── Cards Grid ───────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onBook={openBooking}
            onCombo={openComboWA}
            isSelected={booking?.id === service.id}
          />
        ))}
      </div>

      {/* ── Trust Section ─────────────────────────────────────────────────── */}
      <div className="bg-[#FAF9F5]/80 border-t border-b border-stone-200/60 py-16 px-6 mt-8">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold font-serif uppercase tracking-wider text-stone-900">
              Why Choose Us?
            </h2>
            <div className="w-16 h-1 bg-[#54B435] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {/* Point 1 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/40 shadow-sm flex flex-col items-center justify-center space-y-3 transition-transform hover:-translate-y-1">
              <span className="text-4xl">🔒</span>
              <h4 className="text-sm font-bold text-stone-800 font-serif leading-snug">
                100% Confidential & Private
              </h4>
            </div>

            {/* Point 2 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/40 shadow-sm flex flex-col items-center justify-center space-y-3 transition-transform hover:-translate-y-1">
              <span className="text-4xl">🎯</span>
              <h4 className="text-sm font-bold text-stone-800 font-serif leading-snug">
                Accurate & Trusted Guidance
              </h4>
            </div>

            {/* Point 3 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/40 shadow-sm flex flex-col items-center justify-center space-y-3 transition-transform hover:-translate-y-1">
              <span className="text-4xl">✨</span>
              <h4 className="text-sm font-bold text-stone-800 font-serif leading-snug">
                Personalized Remedies
              </h4>
            </div>

            {/* Point 4 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/40 shadow-sm flex flex-col items-center justify-center space-y-3 transition-transform hover:-translate-y-1">
              <span className="text-4xl">⏰</span>
              <h4 className="text-sm font-bold text-stone-800 font-serif leading-snug">
                Timely Support
              </h4>
            </div>

            {/* Point 5 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/40 shadow-sm flex flex-col items-center justify-center space-y-3 transition-transform hover:-translate-y-1 col-span-1 sm:col-span-2 md:col-span-1">
              <span className="text-4xl">🤝</span>
              <h4 className="text-sm font-bold text-stone-800 font-serif leading-snug">
                Results You Can Trust
              </h4>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}

// ─── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  onBook,
  onCombo,
  isSelected,
}: {
  service: ServiceType;
  onBook: (s: ServiceType) => void;
  onCombo: () => void;
  isSelected: boolean;
}) {
  const { isCombo } = service as { isCombo?: boolean };

  return (
    <div className={`relative bg-[#FFF6F4] rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-2 ${isSelected ? 'border-[#54B435] ring-2 ring-green-100' : 'border-[#FFEBE7]'} p-4 flex flex-row gap-4`}>

      {/* Badge / Ribbon */}
      {service.badge && (
        <div className="absolute top-0 left-0 z-10 bg-[#54B435] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-br-2xl rounded-tl-[22px]">
          {service.badge}
        </div>
      )}

      {/* Verified checkmark on top right */}
      <div className="absolute top-3.5 right-3.5 text-[#54B435]" title="Verified">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>

      {/* Left Column */}
      <div className="flex flex-col items-center shrink-0 w-24 sm:w-28 pt-4">
        {/* Service Icon in a circle */}
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br ${service.bg} flex items-center justify-center text-4xl border-2 border-white shadow-md`}>
          {service.icon}
        </div>

        {/* Online Badge */}
        <div className="mt-2.5 bg-[#EDF7ED] text-[#2E7D32] text-[10px] sm:text-xs font-semibold px-4 py-0.5 rounded-full">
          Online
        </div>

        {/* Reviews */}
        <div className="mt-2 text-[10px] text-stone-500 font-medium whitespace-nowrap">
          Reviews : <span className="font-bold text-rose-800">{service.reviews.toLocaleString('en-IN')}</span>
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 mt-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-sm text-amber-400">★</span>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col justify-between pt-4">
        <div className="pr-4">
          {/* Service Name */}
          <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-tight uppercase font-serif tracking-wide">
            {service.title}
          </h3>

          {/* Details (Languages & Exp) */}
          <div className="text-xs text-stone-600 mt-2 space-y-0.5 font-light">
            <p>{service.languages}</p>
            <p>Exp : {service.experience}</p>
          </div>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-stone-500 mt-3 leading-relaxed font-light line-clamp-3" title={service.desc}>
            {service.desc}
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={isCombo ? onCombo : () => onBook(service)}
            className="border-2 border-[#54B435] text-[#54B435] hover:bg-[#54B435] hover:text-white active:scale-[0.98] font-bold text-xs sm:text-sm py-2 px-6 rounded-full transition-all duration-200 shadow-sm"
          >
            {isCombo ? 'Enquire' : 'Book now'}
          </button>
        </div>
      </div>
    </div>
  );
}



// ─── WhatsApp Icon ─────────────────────────────────────────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
