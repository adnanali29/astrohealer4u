'use client';

import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ToastContainer from '@/components/ToastContainer';
import AudioButton from '@/components/AudioButton';
import BookingModal from '@/components/BookingModal';
import HomeTab from '@/components/tabs/HomeTab';
import ConsultationTab from '@/components/tabs/ConsultationTab';
import ShopTab from '@/components/tabs/ShopTab';
import AboutTab from '@/components/tabs/AboutTab';
import ContactTab from '@/components/tabs/ContactTab';
import AdminTab from '@/components/tabs/AdminTab';

function AppContent() {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-900 bg-[#FAF9F5]">
      {/* Celestial backdrop gradients */}
      <div className="absolute inset-x-0 top-0 h-[600px] overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-32 left-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(233,227,248,0.6) 0%, rgba(250,249,245,0) 70%)',
            animation: 'pulseGlow 12s infinite ease-in-out',
          }}
        />
        <div
          className="absolute top-[10%] -right-48 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251,232,235,0.6) 0%, rgba(250,249,245,0) 70%)',
            animation: 'pulseGlow 16s infinite ease-in-out',
          }}
        />
      </div>

      <Header />

      <main className="flex-grow relative z-10">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'consultation' && <ConsultationTab />}
        {activeTab === 'shop' && <ShopTab />}
        {activeTab === 'about' && <AboutTab />}
        {activeTab === 'contact' && <ContactTab />}
        {activeTab === 'admin' && <AdminTab />}
      </main>

      <Footer />

      {/* Global Overlays */}
      <CartDrawer />
      <ToastContainer />
      <AudioButton />
      <BookingModal />
    </div>
  );
}

export default function Home() {
  return <AppContent />;
}
