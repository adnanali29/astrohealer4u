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

  // Load from localStorage on mount safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHeroTitle = localStorage.getItem('heroTitle');
      if (storedHeroTitle) setHeroTitle(storedHeroTitle);

      const storedHeroSub = localStorage.getItem('heroSub');
      if (storedHeroSub) setHeroSub(storedHeroSub);

      const storedHeroStats = localStorage.getItem('heroStats');
      if (storedHeroStats) {
        try { setHeroStats(JSON.parse(storedHeroStats)); } catch (e) {}
      }

      const storedServices = localStorage.getItem('services');
      if (storedServices) {
        try { setServices(JSON.parse(storedServices)); } catch (e) {}
      } else {
        setServices(SERVICES);
      }

      const storedDispServices = localStorage.getItem('displayedServices');
      if (storedDispServices) {
        try { setDisplayedServices(JSON.parse(storedDispServices)); } catch (e) {}
      }

      const storedTestimonials = localStorage.getItem('testimonials');
      if (storedTestimonials) {
        try { setTestimonials(JSON.parse(storedTestimonials)); } catch (e) {}
      } else {
        setTestimonials(TESTIMONIALS_DEFAULT);
      }

      const storedFaqs = localStorage.getItem('faqs');
      if (storedFaqs) {
        try { setFaqs(JSON.parse(storedFaqs)); } catch (e) {}
      } else {
        setFaqs(FAQ_ITEMS_DEFAULT);
      }

      const storedAddress = localStorage.getItem('officeAddress');
      if (storedAddress) setOfficeAddress(storedAddress);

      const storedEmail = localStorage.getItem('contactEmail');
      if (storedEmail) setContactEmail(storedEmail);

      const storedPhone = localStorage.getItem('contactPhone');
      if (storedPhone) setContactPhone(storedPhone);

      const storedShopCats = localStorage.getItem('shopCategories');
      if (storedShopCats) {
        try { setShopCategories(JSON.parse(storedShopCats)); } catch (e) {}
      } else {
        setShopCategories(SHOP_CATEGORIES);
      }

      const storedShopProds = localStorage.getItem('shopSubProducts');
      if (storedShopProds) {
        try { setShopSubProducts(JSON.parse(storedShopProds)); } catch (e) {}
      } else {
        setShopSubProducts(CRYSTAL_SUB_PRODUCTS);
      }

      const storedAdminEmail = localStorage.getItem('adminEmail');
      if (storedAdminEmail) setAdminEmail(storedAdminEmail);

      const storedAdminPassword = localStorage.getItem('adminPassword');
      if (storedAdminPassword) setAdminPassword(storedAdminPassword);
    }
  }, []);

  const updateHero = useCallback((title: string, sub: string, stats: typeof heroStats) => {
    setHeroTitle(title);
    setHeroSub(sub);
    setHeroStats(stats);
    localStorage.setItem('heroTitle', title);
    localStorage.setItem('heroSub', sub);
    localStorage.setItem('heroStats', JSON.stringify(stats));
  }, []);

  const updateDisplayedServices = useCallback((ids: string[]) => {
    setDisplayedServices(ids);
    localStorage.setItem('displayedServices', JSON.stringify(ids));
  }, []);

  const addTestimonial = useCallback((t: TestimonialItem) => {
    setTestimonials(prev => {
      const next = [t, ...prev];
      localStorage.setItem('testimonials', JSON.stringify(next));
      return next;
    });
  }, []);

  const addFaq = useCallback((f: FaqItem) => {
    setFaqs(prev => {
      const next = [...prev, f];
      localStorage.setItem('faqs', JSON.stringify(next));
      return next;
    });
  }, []);

  const editFaq = useCallback((index: number, f: FaqItem) => {
    setFaqs(prev => {
      const next = prev.map((item, idx) => idx === index ? f : item);
      localStorage.setItem('faqs', JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteFaq = useCallback((index: number) => {
    setFaqs(prev => {
      const next = prev.filter((_, idx) => idx !== index);
      localStorage.setItem('faqs', JSON.stringify(next));
      return next;
    });
  }, []);

  const addService = useCallback((s: ConsultationService) => {
    setServices(prev => {
      const next = [...prev, s];
      localStorage.setItem('services', JSON.stringify(next));
      return next;
    });
  }, []);

  const editService = useCallback((id: string, updatedFields: Partial<ConsultationService>) => {
    setServices(prev => {
      const next = prev.map(s => s.id === id ? { ...s, ...updatedFields } : s);
      localStorage.setItem('services', JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteService = useCallback((id: string) => {
    setServices(prev => {
      const next = prev.filter(s => s.id !== id);
      localStorage.setItem('services', JSON.stringify(next));
      return next;
    });
    setDisplayedServices(prev => {
      const next = prev.filter(item => item !== id);
      localStorage.setItem('displayedServices', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateContactInfo = useCallback((address: string, email: string, phone: string) => {
    setOfficeAddress(address);
    setContactEmail(email);
    setContactPhone(phone);
    localStorage.setItem('officeAddress', address);
    localStorage.setItem('contactEmail', email);
    localStorage.setItem('contactPhone', phone);
  }, []);

  // Shop CRUD
  const addShopCategory = useCallback((cat: ShopCategory) => {
    setShopCategories(prev => {
      const next = [...prev, cat];
      localStorage.setItem('shopCategories', JSON.stringify(next));
      return next;
    });
  }, []);

  const editShopCategory = useCallback((id: string, fields: Partial<ShopCategory>) => {
    setShopCategories(prev => {
      const next = prev.map(c => c.id === id ? { ...c, ...fields } : c);
      localStorage.setItem('shopCategories', JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteShopCategory = useCallback((id: string) => {
    setShopCategories(prev => {
      const next = prev.filter(c => c.id !== id);
      localStorage.setItem('shopCategories', JSON.stringify(next));
      return next;
    });
    setShopSubProducts(prev => {
      const next = prev.filter(p => p.categoryId !== id);
      localStorage.setItem('shopSubProducts', JSON.stringify(next));
      return next;
    });
  }, []);

  const addShopSubProduct = useCallback((prod: SubCrystalProduct) => {
    setShopSubProducts(prev => {
      const next = [...prev, prod];
      localStorage.setItem('shopSubProducts', JSON.stringify(next));
      return next;
    });
  }, []);

  const editShopSubProduct = useCallback((id: string, fields: Partial<SubCrystalProduct>) => {
    setShopSubProducts(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...fields } : p);
      localStorage.setItem('shopSubProducts', JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteShopSubProduct = useCallback((id: string) => {
    setShopSubProducts(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem('shopSubProducts', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateAdminCredentials = useCallback((email: string, password: string) => {
    setAdminEmail(email);
    setAdminPassword(password);
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminPassword', password);
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
