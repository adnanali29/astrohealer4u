'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  tob: string;
  pob: string;
  apptDate: string;
  apptTime: string;
}

const WA_NUMBER = '919041544404';

export default function BookingModal() {
  const { booking, closeBooking, selectedMode, setSelectedMode, isFormVisible, contactPhone } = useApp();
  const [form, setForm] = useState<FormData>({ fullName: '', email: '', phone: '', dob: '', tob: '', pob: '', apptDate: '', apptTime: '' });

  if (!booking) return null;

  const rawNum = contactPhone.replace(/\D/g, '');
  const waNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = selectedMode === 'Chat' 
      ? booking.chatPrice 
      : selectedMode === 'Call' 
        ? booking.callPrice 
        : booking.videoPrice;
    const duration = selectedMode === 'Chat' 
      ? booking.chatDur 
      : selectedMode === 'Call' 
        ? booking.callDur 
        : booking.videoDur;

    const formatDate = (d: string) => {
      if (!d) return '—';
      const dt = new Date(d);
      return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    };
    const formatTime = (t: string) => {
      if (!t) return '—';
      const [h, m] = t.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
    };

    const msg =
`🙏 *Booking Request — Jyotish Consultation*

━━━━━━━━━━━━━━━━━━
📋 *Service:* ${booking.title}
${selectedMode === 'Chat' ? '💬' : selectedMode === 'Call' ? '📞' : '📹'} *Mode:* ${selectedMode} (${duration})
💰 *Price:* ₹${price?.toLocaleString('en-IN')}
━━━━━━━━━━━━━━━━━━

👤 *Full Name:* ${form.fullName}
📧 *Email:* ${form.email}
📞 *Phone:* ${form.phone}
🎂 *Date of Birth:* ${formatDate(form.dob)}
⏰ *Time of Birth:* ${formatTime(form.tob)}
📍 *Place of Birth:* ${form.pob}
📅 *Appointment Date:* ${formatDate(form.apptDate)}
🕐 *Preferred Time:* ${formatTime(form.apptTime)}

━━━━━━━━━━━━━━━━━━
Please confirm my booking. Thank you! 🙏`;

    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const f = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300 ${isFormVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeBooking}
      />

      {/* Sheet */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 max-h-[92vh] overflow-y-auto bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${isFormVisible ? 'translate-y-0' : 'translate-y-full'}`}>

        {/* Pull handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-stone-200" />
        </div>

        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-100 flex items-start justify-between gap-4 z-10 font-sans">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br ${booking.bg} flex items-center justify-center text-2xl border border-stone-200 shrink-0`}>
              {booking.icon}
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Booking Consultation</p>
              <h3 className="text-base font-bold text-stone-900 leading-tight">{booking.title}</h3>
              <p className="text-[11px] text-rose-500 font-semibold">Exp : {booking.experience}</p>
            </div>
          </div>
          <button onClick={closeBooking} className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 text-lg transition-colors shrink-0 mt-1">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5 max-w-lg mx-auto">

          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700 font-medium flex items-start gap-2">
            <span className="text-base shrink-0">💡</span>
            Fill in your details. We&apos;ll pre-fill your WhatsApp message — just tap <strong>Send</strong>!
          </div>

          {/* Option Selection: Chat vs Call */}
          <div className="space-y-2 font-sans">
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide">
              Select Consultation Mode <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className={`grid gap-3 ${booking.videoPrice ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {/* Chat Option */}
              {booking.chatPrice !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedMode('Chat')}
                  className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl border-2 transition-all ${
                    selectedMode === 'Chat'
                      ? 'border-[#54B435] bg-green-50/50 text-stone-850 ring-2 ring-green-100'
                      : 'border-stone-200 bg-stone-50 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  <span className="text-lg">💬</span>
                  <span className="text-xs font-bold mt-1 text-stone-805">Chat ({booking.chatDur})</span>
                  <span className="text-sm font-bold text-[#54B435] mt-1">₹{booking.chatPrice}</span>
                </button>
              )}

              {/* Call Option */}
              {booking.callPrice !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedMode('Call')}
                  className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl border-2 transition-all ${
                    selectedMode === 'Call'
                      ? 'border-[#54B435] bg-green-50/50 text-stone-850 ring-2 ring-green-100'
                      : 'border-stone-200 bg-stone-50 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  <span className="text-lg">📞</span>
                  <span className="text-xs font-bold mt-1 text-stone-805">Call ({booking.callDur})</span>
                  <span className="text-sm font-bold text-[#54B435] mt-1">₹{booking.callPrice}</span>
                </button>
              )}

              {/* Video Call Option */}
              {booking.videoPrice !== undefined && booking.videoPrice !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedMode('Video Call')}
                  className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl border-2 transition-all ${
                    selectedMode === 'Video Call'
                      ? 'border-[#54B435] bg-green-50/50 text-stone-850 ring-2 ring-green-100'
                      : 'border-stone-200 bg-stone-50 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  <span className="text-lg">📹</span>
                  <span className="text-xs font-bold mt-1 text-stone-805">Video ({booking.videoDur})</span>
                  <span className="text-sm font-bold text-[#54B435] mt-1">₹{booking.videoPrice}</span>
                </button>
              )}
            </div>
          </div>

          {/* Full Name */}
          <FormField label="Full Name" required>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={form.fullName}
              onChange={f('fullName')}
              className={INPUT}
              required
            />
          </FormField>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Email Address" required>
              <input
                type="email"
                placeholder="e.g. rahul@example.com"
                value={form.email}
                onChange={f('email')}
                className={INPUT}
                required
              />
            </FormField>
            <FormField label="Phone Number" required>
              <input
                type="tel"
                placeholder="e.g. +91 98765 43210"
                value={form.phone}
                onChange={f('phone')}
                className={INPUT}
                required
              />
            </FormField>
          </div>

          {/* DOB + TOB */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Date of Birth" required>
              <input type="date" value={form.dob} onChange={f('dob')} className={INPUT} required />
            </FormField>
            <FormField label="Time of Birth" required>
              <input type="time" value={form.tob} onChange={f('tob')} className={INPUT} required />
            </FormField>
          </div>

          {/* Place of Birth */}
          <FormField label="Place of Birth" required>
            <input
              type="text"
              placeholder="City, State, Country"
              value={form.pob}
              onChange={f('pob')}
              className={INPUT}
              required
            />
          </FormField>

          {/* Appointment Date + Time */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Appointment Date" required>
              <input
                type="date"
                value={form.apptDate}
                onChange={f('apptDate')}
                min={new Date().toISOString().split('T')[0]}
                className={INPUT}
                required
              />
            </FormField>
            <FormField label="Preferred Time" required>
              <input type="time" value={form.apptTime} onChange={f('apptTime')} className={INPUT} required />
            </FormField>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5c] active:scale-[0.98] text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 mt-2"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white" />
            Book Appointment via WhatsApp
          </button>
          <p className="text-center text-[11px] text-stone-400 font-light -mt-2">
            Your WhatsApp will open with all details pre-filled · Just tap Send 🙏
          </p>
        </form>
      </div>
    </>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5 font-sans">
      <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide">
        {label} {required && <span className="text-rose-500 font-bold">*</span>}
      </label>
      {children}
    </div>
  );
}

const INPUT = 'w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/60 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all placeholder:text-stone-300';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
