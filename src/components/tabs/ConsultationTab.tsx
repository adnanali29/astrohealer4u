'use client';

import { useApp } from '@/context/AppContext';
import { SERVICES, ConsultationService } from '@/lib/data';
import FadedAstrologyBg from '@/components/FadedAstrologyBg';

type ServiceType = ConsultationService;

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
    <section className="min-h-screen bg-[#0a0818] text-white relative overflow-hidden">
      <FadedAstrologyBg opacity={0.16} />

      {/* ── Seamless Header Content (No boxed hero block, single unified theme) ─── */}
      <div className="pt-12 pb-6 px-4 text-center relative z-10 font-sans max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/40 text-amber-300 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-1 shadow-md">
          ✨ Limited Time Birthday Offer
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold leading-tight text-white tracking-wide">
          Birthday Sale is LIVE!
        </h1>
        <p className="text-amber-300 text-base sm:text-xl font-bold tracking-wide">
          30% OFF on All Astrology Consultations 🔮
        </p>
        <p className="text-purple-200/90 text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto">
          Discover what the stars have in store — personalized guidance via Chat, Call or Video.
        </p>
        <div className="pt-2">
          <a
            href={`https://wa.me/${waNum}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            Book on WhatsApp ({contactPhone})
          </a>
        </div>
      </div>

      {/* ── Cards Grid (Crisp White Cards on Dark Cosmic BG) ───────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-7 relative z-10">
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

      {/* ── Trust Section (Why Choose Us — Clean bottom section, no extra space below) ── */}
      <div className="py-20 px-6 text-white relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">✦ Divine Alignment & Trust</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif uppercase tracking-wider text-white">
              Why Choose Us?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 via-purple-500 to-rose-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {/* Point 1 */}
            <div className="bg-white text-stone-900 p-6 rounded-2xl border border-stone-200 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center space-y-3">
              <span className="text-4xl">🔒</span>
              <h4 className="text-sm font-bold text-stone-900 font-serif leading-snug">
                100% Confidential & Private
              </h4>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                Your birth details and personal discussions remain strictly private.
              </p>
            </div>

            {/* Point 2 */}
            <div className="bg-white text-stone-900 p-6 rounded-2xl border border-stone-200 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center space-y-3">
              <span className="text-4xl">🎯</span>
              <h4 className="text-sm font-bold text-stone-900 font-serif leading-snug">
                Accurate & Trusted Guidance
              </h4>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                Empirical Vedic analysis backed by molecular chemistry principles.
              </p>
            </div>

            {/* Point 3 */}
            <div className="bg-white text-stone-900 p-6 rounded-2xl border border-stone-200 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center space-y-3">
              <span className="text-4xl">✨</span>
              <h4 className="text-sm font-bold text-stone-900 font-serif leading-snug">
                Personalized Remedies
              </h4>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                Custom crystal grids & practical remedies tailored to your planetary chart.
              </p>
            </div>

            {/* Point 4 */}
            <div className="bg-white text-stone-900 p-6 rounded-2xl border border-stone-200 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center space-y-3">
              <span className="text-4xl">⏰</span>
              <h4 className="text-sm font-bold text-stone-900 font-serif leading-snug">
                Timely Support
              </h4>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                Instant WhatsApp consultation booking with direct response.
              </p>
            </div>

            {/* Point 5 */}
            <div className="bg-white text-stone-900 p-6 rounded-2xl border border-stone-200 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center space-y-3 col-span-1 sm:col-span-2 md:col-span-1">
              <span className="text-4xl">🤝</span>
              <h4 className="text-sm font-bold text-stone-900 font-serif leading-snug">
                Results You Can Trust
              </h4>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                Over 12,500+ satisfied clients across 30+ countries.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

// ─── Service Card (Crisp White Card) ──────────────────────────────────────────
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
    <div className={`relative bg-white text-stone-900 rounded-[24px] overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border-2 ${isSelected ? 'border-[#54B435] ring-4 ring-green-400/30' : 'border-stone-100'} p-5 sm:p-6 flex flex-row gap-5 z-10`}>

      {/* Badge / Ribbon */}
      {service.badge && (
        <div className="absolute top-0 left-0 z-10 bg-[#54B435] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-br-2xl rounded-tl-[22px] shadow-sm">
          {service.badge}
        </div>
      )}

      {/* 30% OFF tag on top right */}
      {service.id !== 's1' && !service.title.toUpperCase().includes('COMPLETE ANALYSIS OF CHART') && (
        <div className="absolute top-3.5 right-3.5 z-10 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
          30% OFF
        </div>
      )}

      {/* Left Column */}
      <div className="flex flex-col items-center shrink-0 w-24 sm:w-28 pt-4">
        {/* Service Icon in a circle */}
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br ${service.bg} flex items-center justify-center text-4xl border-2 border-stone-100 shadow-md`}>
          {service.icon}
        </div>

        {/* Online Badge */}
        <div className="mt-3 bg-[#EDF7ED] text-[#2E7D32] text-[10px] sm:text-xs font-bold px-4 py-0.5 rounded-full border border-green-200/50">
          Online
        </div>

        {/* Reviews */}
        <div className="mt-2 text-[10px] text-stone-500 font-medium whitespace-nowrap">
          Reviews : <span className="font-bold text-rose-700">{service.reviews.toLocaleString('en-IN')}</span>
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 mt-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-sm text-amber-400 select-none">★</span>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col justify-between pt-3">
        <div className="pr-4">
          {/* Service Name */}
          <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-tight uppercase font-serif tracking-wide">
            {service.title}
          </h3>

          {/* Details (Languages & Exp) */}
          <div className="text-xs text-stone-600 mt-2 space-y-0.5 font-medium">
            <p>{service.languages}</p>
            <p>Exp : {service.experience}</p>
          </div>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-stone-500 mt-2.5 leading-relaxed font-light line-clamp-3" title={service.desc}>
            {service.desc}
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={isCombo ? onCombo : () => onBook(service)}
            className="bg-[#54B435] hover:bg-[#479e2c] text-white active:scale-[0.98] font-bold text-xs sm:text-sm py-2.5 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {isCombo ? 'Enquire Now' : 'Book now'}
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
