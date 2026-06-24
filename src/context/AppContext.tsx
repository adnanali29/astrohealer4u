'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ShopProduct, SHOP_PRODUCTS_DATA, ConsultationService, SERVICES, FAQ_ITEMS_DEFAULT, TESTIMONIALS_DEFAULT, TestimonialItem, FaqItem, ShopCategory, SubCrystalProduct, SHOP_CATEGORIES, CRYSTAL_SUB_PRODUCTS } from '@/lib/data';
import { generateCelestialTone } from '@/lib/audio';

interface CartItem extends ShopProduct {
  qty: number;
}

interface AppContextType {
  // Navigation
  activeTab: string;
  switchTab: (tab: string) => void;

  // Audio
  audioEnabled: boolean;
  toggleAudio: () => void;
  playTone: (freq: number, type?: OscillatorType, vol?: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  adjustQty: (id: string, change: number) => void;
  cartTotal: number;
  cartCount: number;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string) => void;

  // Booking Modal
  booking: ConsultationService | null;
  openBooking: (service: ConsultationService) => void;
  closeBooking: () => void;
  selectedMode: 'Chat' | 'Call' | 'Video Call';
  setSelectedMode: (mode: 'Chat' | 'Call' | 'Video Call') => void;
  isFormVisible: boolean;

  // Admin dynamic states
  heroTitle: string;
  heroSub: string;
  heroStats: { charts: string; clientPraise: string; spiritualEthics: string };
  services: ConsultationService[];
  displayedServices: string[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  officeAddress: string;
  contactEmail: string;
  contactPhone: string;

  updateHero: (title: string, sub: string, stats: { charts: string; clientPraise: string; spiritualEthics: string }) => void;
  updateDisplayedServices: (ids: string[]) => void;
  addTestimonial: (t: TestimonialItem) => void;
  addFaq: (f: FaqItem) => void;
  editFaq: (index: number, f: FaqItem) => void;
  deleteFaq: (index: number) => void;
  addService: (s: ConsultationService) => void;
  editService: (id: string, updatedFields: Partial<ConsultationService>) => void;
  deleteService: (id: string) => void;
  updateContactInfo: (address: string, email: string, phone: string) => void;

  // Shop management
  shopCategories: ShopCategory[];
  shopSubProducts: SubCrystalProduct[];
  addShopCategory: (cat: ShopCategory) => void;
  editShopCategory: (id: string, fields: Partial<ShopCategory>) => void;
  deleteShopCategory: (id: string) => void;
  addShopSubProduct: (prod: SubCrystalProduct) => void;
  editShopSubProduct: (id: string, fields: Partial<SubCrystalProduct>) => void;
  deleteShopSubProduct: (id: string) => void;

  // Admin credentials
  adminEmail: string;
  adminPassword: string;
  updateAdminCredentials: (email: string, password: string) => void;
}

interface Toast {
  id: string;
  message: string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('home');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Booking Modal state
  const [booking, setBooking] = useState<ConsultationService | null>(null);
  const [selectedMode, setSelectedMode] = useState<'Chat' | 'Call' | 'Video Call'>('Chat');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Admin dynamic states
  const [heroTitle, setHeroTitle] = useState('Unveil Your Cosmic Blueprint');
  const [heroSub, setHeroSub] = useState('We align physical objects, cosmic transits, and customized daily astrological calendars to guide your spatial and spiritual energy toward harmonic tranquility.');
  const [heroStats, setHeroStats] = useState({ charts: '12,500+', clientPraise: '4.96 ★', spiritualEthics: '100%' });
  const [services, setServices] = useState<ConsultationService[]>([]);
  const [displayedServices, setDisplayedServices] = useState<string[]>(['s2', 's1', 's3']);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  
  // Contact details states
  const [officeAddress, setOfficeAddress] = useState('amar complex Garhdiwala punjab');
  const [contactEmail, setContactEmail] = useState('astrohealer4u@gmail.com');
  const [contactPhone, setContactPhone] = useState('9041544404');

  // Shop management states
  const [shopCategories, setShopCategories] = useState<ShopCategory[]>([]);
  const [shopSubProducts, setShopSubProducts] = useState<SubCrystalProduct[]>([]);

  // Admin credentials
  const [adminEmail, setAdminEmail] = useState('1');
  const [adminPassword, setAdminPassword] = useState('1');

  // Load from database on mount safely
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/api/db');
        const data = await res.json();
        if (data.success) {
          setHeroTitle(data.heroTitle);
          setHeroSub(data.heroSub);
          setHeroStats(data.heroStats);
          setServices(data.services);
          setDisplayedServices(data.displayedServices);
          setTestimonials(data.testimonials);
          setFaqs(data.faqs);
          setOfficeAddress(data.officeAddress);
          setContactEmail(data.contactEmail);
          setContactPhone(data.contactPhone);
          setShopCategories(data.shopCategories);
          setShopSubProducts(data.shopSubProducts);
          setAdminEmail(data.adminEmail);
          setAdminPassword(data.adminPassword);
        }
      } catch (err) {
        console.error('Failed to load database config, falling back:', err);
      }
    };
    loadData();
  }, []);

  const updateHero = useCallback(async (title: string, sub: string, stats: typeof heroStats) => {
    setHeroTitle(title);
    setHeroSub(sub);
    setHeroStats(stats);
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateHero', data: { title, sub, stats } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateDisplayedServices = useCallback(async (ids: string[]) => {
    setDisplayedServices(ids);
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateDisplayedServices', data: { ids } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const addTestimonial = useCallback(async (t: TestimonialItem) => {
    setTestimonials(prev => [t, ...prev]);
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addTestimonial', data: t }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const addFaq = useCallback(async (f: FaqItem) => {
    setFaqs(prev => [...prev, f]);
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addFaq', data: f }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const editFaq = useCallback(async (index: number, f: FaqItem) => {
    setFaqs(prev => prev.map((item, idx) => idx === index ? f : item));
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'editFaq', data: { index, ...f } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const deleteFaq = useCallback(async (index: number) => {
    setFaqs(prev => prev.filter((_, idx) => idx !== index));
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteFaq', data: { index } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const addService = useCallback(async (s: ConsultationService) => {
    setServices(prev => [...prev, s]);
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addService', data: s }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const editService = useCallback(async (id: string, updatedFields: Partial<ConsultationService>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedFields } : s));
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'editService', data: { id, fields: updatedFields } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const deleteService = useCallback(async (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    setDisplayedServices(prev => prev.filter(item => item !== id));
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteService', data: { id } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateContactInfo = useCallback(async (address: string, email: string, phone: string) => {
    setOfficeAddress(address);
    setContactEmail(email);
    setContactPhone(phone);
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateContactInfo', data: { address, email, phone } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Shop CRUD
  const addShopCategory = useCallback(async (cat: ShopCategory) => {
    setShopCategories(prev => [...prev, cat]);
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addShopCategory', data: cat }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const editShopCategory = useCallback(async (id: string, fields: Partial<ShopCategory>) => {
    setShopCategories(prev => prev.map(c => c.id === id ? { ...c, ...fields } : c));
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'editShopCategory', data: { id, fields } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const deleteShopCategory = useCallback(async (id: string) => {
    setShopCategories(prev => prev.filter(c => c.id !== id));
    setShopSubProducts(prev => prev.filter(p => p.categoryId !== id));
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteShopCategory', data: { id } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const addShopSubProduct = useCallback(async (prod: SubCrystalProduct) => {
    setShopSubProducts(prev => [...prev, prod]);
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addShopSubProduct', data: prod }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const editShopSubProduct = useCallback(async (id: string, fields: Partial<SubCrystalProduct>) => {
    setShopSubProducts(prev => prev.map(p => p.id === id ? { ...p, ...fields } : p));
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'editShopSubProduct', data: { id, fields } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const deleteShopSubProduct = useCallback(async (id: string) => {
    setShopSubProducts(prev => prev.filter(p => p.id !== id));
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteShopSubProduct', data: { id } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateAdminCredentials = useCallback(async (email: string, password: string) => {
    setAdminEmail(email);
    setAdminPassword(password);
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateAdminCredentials', data: { email, password } }),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);


  useEffect(() => {
    if (booking) {
      const timer = setTimeout(() => setIsFormVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsFormVisible(false), 0);
      return () => clearTimeout(timer);
    }
  }, [booking]);

  const showToast = useCallback((message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const playTone = useCallback((freq: number, type: OscillatorType = 'sine', vol: number = 0.25) => {
    if (audioEnabled) generateCelestialTone(freq, type, vol, audioEnabled);
  }, [audioEnabled]);

  const switchTab = useCallback((tab: string) => {
    generateCelestialTone(440, 'sine', 0.1, audioEnabled);
    setActiveTab(tab);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [audioEnabled]);

  const toggleAudio = useCallback(() => {
    setAudioEnabled(prev => {
      const next = !prev;
      if (next) generateCelestialTone(880, 'sine', 0.1, true);
      showToast(next ? 'Celestial Chime systems synchronized successfully ✨' : 'Soundscape system muted.');
      return next;
    });
  }, [showToast]);

  const addToCart = useCallback((id: string) => {
    const product = SHOP_PRODUCTS_DATA.find(p => p.id === id);
    if (!product) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    generateCelestialTone(523.25, 'triangle', 0.22, audioEnabled);
    showToast(`Added ${product.name} to your sacred bundle! ✨`);
  }, [audioEnabled, showToast]);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (item) showToast(`Purged ${item.name} from spatial bundle.`);
      return prev.filter(i => i.id !== id);
    });
    generateCelestialTone(293.66, 'sine', 0.15, audioEnabled);
  }, [audioEnabled, showToast]);

  const adjustQty = useCallback((id: string, change: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      const newQty = item.qty + change;
      if (newQty <= 0) {
        generateCelestialTone(293.66, 'sine', 0.15, audioEnabled);
        showToast("Item purged from bundle registry.");
        return prev.filter(i => i.id !== id);
      }
      generateCelestialTone(392.00, 'sine', 0.1, audioEnabled);
      return prev.map(i => i.id === id ? { ...i, qty: newQty } : i);
    });
  }, [audioEnabled, showToast]);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        generateCelestialTone(293.66, 'sine', 0.1, audioEnabled);
        showToast("Item removed from your planet desires.");
        return prev.filter(i => i !== id);
      }
      generateCelestialTone(587.33, 'sine', 0.15, audioEnabled);
      showToast("Item mapped directly into your desires! 💖");
      return [...prev, id];
    });
  }, [audioEnabled, showToast]);

  const openBooking = useCallback((service: ConsultationService) => {
    playTone(493.88, 'sine', 0.15);
    setIsFormVisible(false);
    setBooking(service);
    setSelectedMode(service.chatPrice !== null ? 'Chat' : 'Call');
  }, [playTone]);

  const closeBooking = useCallback(() => {
    playTone(329.63, 'sine', 0.1);
    setIsFormVisible(false);
    setTimeout(() => setBooking(null), 300);
  }, [playTone]);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <AppContext.Provider value={{
      activeTab, switchTab,
      audioEnabled, toggleAudio, playTone,
      cart, addToCart, removeFromCart, adjustQty, cartTotal, cartCount,
      cartDrawerOpen, setCartDrawerOpen,
      wishlist, toggleWishlist,
      toasts, showToast,
      booking, openBooking, closeBooking, selectedMode, setSelectedMode, isFormVisible,
      heroTitle, heroSub, heroStats, services, displayedServices, testimonials, faqs,
      officeAddress, contactEmail, contactPhone,
      shopCategories, shopSubProducts,
      updateHero, updateDisplayedServices, addTestimonial, addFaq, editFaq, deleteFaq, addService, editService, deleteService, updateContactInfo,
      addShopCategory, editShopCategory, deleteShopCategory, addShopSubProduct, editShopSubProduct, deleteShopSubProduct,
      adminEmail, adminPassword, updateAdminCredentials,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
