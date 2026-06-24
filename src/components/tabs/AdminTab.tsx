'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { ConsultationService, TestimonialItem, FaqItem, ShopCategory, SubCrystalProduct } from '@/lib/data';

const GRADIENT_PRESETS = [
  { value: 'from-violet-100 to-purple-100', label: 'Violet Aura' },
  { value: 'from-amber-100 to-yellow-100', label: 'Amber Solar' },
  { value: 'from-rose-100 to-pink-100', label: 'Rose Heart' },
  { value: 'from-green-100 to-emerald-100', label: 'Emerald Mint' },
  { value: 'from-sky-100 to-blue-100', label: 'Sky Throat' },
  { value: 'from-purple-100 via-rose-100 to-amber-100', label: 'Rainbow Combo' },
];

export default function AdminTab() {
  const {
    playTone,
    showToast,
    heroTitle,
    heroSub,
    heroStats,
    services,
    displayedServices,
    testimonials,
    faqs,
    officeAddress,
    contactEmail,
    contactPhone,
    updateHero,
    updateDisplayedServices,
    addTestimonial,
    addFaq,
    editFaq,
    deleteFaq,
    addService,
    editService,
    deleteService,
    updateContactInfo,
    shopCategories,
    shopSubProducts,
    addShopCategory,
    editShopCategory,
    deleteShopCategory,
    addShopSubProduct,
    editShopSubProduct,
    deleteShopSubProduct,
    adminEmail,
    adminPassword,
    updateAdminCredentials,
  } = useApp();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Sub-tabs: 'home', 'consulation', 'shop', 'about', 'get_in_touch', 'settings'
  const [subTab, setSubTab] = useState<'home' | 'consulation' | 'shop' | 'about' | 'get_in_touch' | 'settings'>('home');

  // Settings form states
  const [settingsEmail, setSettingsEmail] = useState('');
  const [settingsPassword, setSettingsPassword] = useState('');
  const [settingsConfirmPassword, setSettingsConfirmPassword] = useState('');

  // Form states for Home Section 1 (Hero & Stats)
  const [tempHeroTitle, setTempHeroTitle] = useState('');
  const [tempHeroSub, setTempHeroSub] = useState('');
  const [tempCharts, setTempCharts] = useState('');
  const [tempPraise, setTempPraise] = useState('');
  const [tempEthics, setTempEthics] = useState('');

  // Form states for Home Section 3 (Add Testimonial)
  const [testName, setTestName] = useState('');
  const [testText, setTestText] = useState('');
  const [testSign, setTestSign] = useState('Aries');
  const [testStars, setTestStars] = useState('5');

  // Form states for Home Section 4 (Add FAQ)
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  
  // FAQ editing states
  const [faqEditIndex, setFaqEditIndex] = useState<number | null>(null);
  const [faqEditQuestion, setFaqEditQuestion] = useState('');
  const [faqEditAnswer, setFaqEditAnswer] = useState('');

  // Form states for Consultation: Add New Service
  const [newSrvTitle, setNewSrvTitle] = useState('');
  const [newSrvName, setNewSrvName] = useState('');
  const [newSrvLanguages, setNewSrvLanguages] = useState('English, Hindi');
  const [newSrvExperience, setNewSrvExperience] = useState('3 Years');
  const [newSrvDesc, setNewSrvDesc] = useState('');
  const [newSrvReviews, setNewSrvReviews] = useState('');
  const [newSrvRating, setNewSrvRating] = useState('5');
  const [newSrvBadge, setNewSrvBadge] = useState('');
  const [newSrvIcon, setNewSrvIcon] = useState('🔮');
  const [newSrvBg, setNewSrvBg] = useState('from-violet-100 to-purple-100');
  
  const [newSrvChatEnabled, setNewSrvChatEnabled] = useState(true);
  const [newSrvChatPrice, setNewSrvChatPrice] = useState('1500');
  const [newSrvChatDur, setNewSrvChatDur] = useState('30 min');
  
  const [newSrvCallEnabled, setNewSrvCallEnabled] = useState(true);
  const [newSrvCallPrice, setNewSrvCallPrice] = useState('3000');
  const [newSrvCallDur, setNewSrvCallDur] = useState('45 min');
  
  const [newSrvVideoEnabled, setNewSrvVideoEnabled] = useState(false);
  const [newSrvVideoPrice, setNewSrvVideoPrice] = useState('5000');
  const [newSrvVideoDur, setNewSrvVideoDur] = useState('45 min');

  // Form states for Contact Info Edit
  const [tempAddress, setTempAddress] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempPhone, setTempPhone] = useState('');

  // States for inline service editing
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editSrvFields, setEditSrvFields] = useState<Partial<ConsultationService>>({});

  // Shop: active panel within shop sub-tab ('categories' | 'products')
  const [shopPanel, setShopPanel] = useState<'categories' | 'products'>('categories');

  // Shop: Category form states
  const [catDesignation, setCatDesignation] = useState('');
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catImage, setCatImage] = useState('');
  const [catTagline, setCatTagline] = useState('');
  const [catIsSingle, setCatIsSingle] = useState(false);
  // Category editing
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editCatFields, setEditCatFields] = useState<Partial<ShopCategory>>({});

  // Shop: Sub-Product form states
  const [prodCategoryId, setProdCategoryId] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPricingType, setProdPricingType] = useState<'fixed' | 'per-gram' | 'per-kg'>('fixed');
  const [prodPrice, setProdPrice] = useState('');
  const [prodBigDesc, setProdBigDesc] = useState('');
  const [prodResonance, setProdResonance] = useState('');
  const [prodNode, setProdNode] = useState('');
  const [prodSolar, setProdSolar] = useState('');
  const [prodApothecary, setProdApothecary] = useState('');
  const [prodLabel, setProdLabel] = useState('Best Seller');
  // Sub-product editing
  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [editProdFields, setEditProdFields] = useState<Partial<SubCrystalProduct>>({});

  // Sync state variables once context elements load
  useEffect(() => {
    if (heroTitle) setTempHeroTitle(heroTitle);
    if (heroSub) setTempHeroSub(heroSub);
    if (heroStats) {
      setTempCharts(heroStats.charts);
      setTempPraise(heroStats.clientPraise);
      setTempEthics(heroStats.spiritualEthics);
    }
  }, [heroTitle, heroSub, heroStats]);

  useEffect(() => {
    if (officeAddress) setTempAddress(officeAddress);
    if (contactEmail) setTempEmail(contactEmail);
    if (contactPhone) setTempPhone(contactPhone);
  }, [officeAddress, contactEmail, contactPhone]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === adminEmail && loginPassword === adminPassword) {
      playTone(880, 'sine', 0.15);
      setIsLoggedIn(true);
      setLoginError('');
      setLoginEmail('');
      setLoginPassword('');
      showToast('Welcome, Garima! 💫');
    } else {
      playTone(220, 'sine', 0.1);
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  const handleLogout = () => {
    playTone(330, 'sine', 0.08);
    setIsLoggedIn(false);
    showToast('Aura registry locked.');
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(tempHeroTitle, tempHeroSub, {
      charts: tempCharts,
      clientPraise: tempPraise,
      spiritualEthics: tempEthics,
    });
    playTone(659.25, 'sine', 0.1);
    showToast('Hero text and site statistics updated successfully! ✨');
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName.trim() || !testText.trim()) {
      showToast('Testimonial name and text cannot be blank.');
      return;
    }
    const starsNum = Number(testStars);
    addTestimonial({
      stars: starsNum,
      sign: testSign,
      text: testText,
      name: testName,
    });
    playTone(523.25, 'triangle', 0.12);
    showToast('Testimonial published successfully! 💖');
    setTestName('');
    setTestText('');
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      showToast('FAQ fields cannot be blank.');
      return;
    }
    addFaq({ question: faqQuestion, answer: faqAnswer });
    playTone(493.88, 'sine', 0.1);
    showToast('New FAQ added successfully! ✦');
    setFaqQuestion('');
    setFaqAnswer('');
  };

  const handleSaveEditFaq = (index: number) => {
    if (!faqEditQuestion.trim() || !faqEditAnswer.trim()) {
      showToast('FAQ fields cannot be blank.');
      return;
    }
    editFaq(index, { question: faqEditQuestion, answer: faqEditAnswer });
    playTone(587.33, 'sine', 0.08);
    showToast('FAQ updated.');
    setFaqEditIndex(null);
  };

  const handleToggleDisplayedService = (id: string) => {
    let next: string[];
    if (displayedServices.includes(id)) {
      next = displayedServices.filter(item => item !== id);
    } else {
      next = [...displayedServices, id];
    }
    updateDisplayedServices(next);
    playTone(440, 'sine', 0.08);
    showToast('Homepage services filter adjusted.');
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrvTitle.trim() || !newSrvName.trim() || !newSrvDesc.trim()) {
      showToast('Please fill out the main service fields.');
      return;
    }
    const newId = 's_' + Date.now();
    const serviceObj: ConsultationService = {
      id: newId,
      title: newSrvTitle,
      name: newSrvName,
      languages: newSrvLanguages,
      experience: newSrvExperience,
      desc: newSrvDesc,
      reviews: Number(newSrvReviews) || 0,
      rating: Number(newSrvRating) || 5,
      badge: newSrvBadge.trim() || null,
      icon: newSrvIcon,
      bg: newSrvBg,
      chatPrice: newSrvChatEnabled ? Number(newSrvChatPrice) : null,
      chatDur: newSrvChatEnabled ? newSrvChatDur : null,
      callPrice: newSrvCallEnabled ? Number(newSrvCallPrice) : null,
      callDur: newSrvCallEnabled ? newSrvCallDur : null,
      videoPrice: newSrvVideoEnabled ? Number(newSrvVideoPrice) : null,
      videoDur: newSrvVideoEnabled ? newSrvVideoDur : null,
      image: '',
    };

    addService(serviceObj);
    playTone(523.25, 'triangle', 0.2);
    showToast('New service successfully added! 🔮');
    
    // Reset service fields
    setNewSrvTitle('');
    setNewSrvName('');
    setNewSrvLanguages('English, Hindi');
    setNewSrvExperience('3 Years');
    setNewSrvDesc('');
    setNewSrvReviews('');
    setNewSrvRating('5');
    setNewSrvBadge('');
    setNewSrvIcon('🔮');
    setNewSrvBg('from-violet-100 to-purple-100');
  };

  const startEditingService = (srv: ConsultationService) => {
    setEditingServiceId(srv.id);
    setEditSrvFields(srv);
  };

  const handleUpdateService = (id: string) => {
    editService(id, editSrvFields);
    playTone(587.33, 'sine', 0.1);
    showToast('Service updated successfully.');
    setEditingServiceId(null);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(tempAddress, tempEmail, tempPhone);
    playTone(659.25, 'sine', 0.1);
    showToast('Contact details successfully updated! 📞');
  };

  // ── Shop handlers ─────────────────────────────────────────────────────────
  const handleAddShopCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim() || !catDesc.trim()) {
      showToast('Category name and description are required.');
      return;
    }
    const slug = catDesignation.trim()
      ? catDesignation.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : catName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newCat: ShopCategory = {
      id: slug + '-' + Date.now(),
      name: catName.trim(),
      image: catImage.trim(),
      tagline: catTagline.trim() || catDesignation.trim() || 'Sacred Crystal',
      desc: catDesc.trim(),
      isSingleProduct: catIsSingle,
    };
    addShopCategory(newCat);
    playTone(659.25, 'triangle', 0.12);
    showToast('New category added to the Apothecary! ✨');
    setCatDesignation(''); setCatName(''); setCatDesc(''); setCatImage(''); setCatTagline(''); setCatIsSingle(false);
  };

  const handleSaveEditShopCategory = (id: string) => {
    if (!editCatFields.name?.trim()) { showToast('Name required.'); return; }
    editShopCategory(id, editCatFields);
    playTone(587.33, 'sine', 0.08);
    showToast('Category updated.');
    setEditingCatId(null); setEditCatFields({});
  };

  const handleAddSubProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodCategoryId || !prodName.trim() || !prodDesc.trim() || !prodPrice) {
      showToast('Category, name, description and price are required.');
      return;
    }
    const benefits = prodBigDesc.trim()
      ? prodBigDesc.split('\n').map(l => l.trim()).filter(Boolean)
      : ['Premium quality crystal, cleansed and programmed'];
    const newProd: SubCrystalProduct = {
      id: 'prod-' + Date.now(),
      categoryId: prodCategoryId,
      name: prodName.trim(),
      image: prodImage.trim(),
      desc: prodDesc.trim(),
      basePrice: parseFloat(prodPrice) || 0,
      pricingType: prodPricingType,
      label: prodLabel,
      benefits,
      resonance: prodResonance.trim() || '432Hz Universal Resonance',
      node: prodNode.trim() || 'Crown Chakra',
      solarPeakCleansed: prodSolar.trim() || undefined,
      apothecaryPlacement: prodApothecary.trim() || undefined,
    };
    addShopSubProduct(newProd);
    playTone(659.25, 'triangle', 0.12);
    showToast('New product added to the Apothecary! 💎');
    setProdCategoryId(''); setProdImage(''); setProdName(''); setProdDesc('');
    setProdPricingType('fixed'); setProdPrice(''); setProdBigDesc('');
    setProdResonance(''); setProdNode(''); setProdSolar(''); setProdApothecary('');
    setProdLabel('Best Seller');
  };

  const handleSaveEditSubProduct = (id: string) => {
    if (!editProdFields.name?.trim()) { showToast('Name required.'); return; }
    const updatedFields = { ...editProdFields };
    if (typeof updatedFields.benefits === 'string') {
      // In case benefits was edited as newline string
      updatedFields.benefits = (updatedFields.benefits as unknown as string).split('\n').map((l: string) => l.trim()).filter(Boolean);
    }
    editShopSubProduct(id, updatedFields);
    playTone(587.33, 'sine', 0.08);
    showToast('Product updated.');
    setEditingProdId(null); setEditProdFields({});
  };

  const switchSubTab = (tab: typeof subTab) => {
    playTone(440, 'sine', 0.05);
    setSubTab(tab);
  };

  if (!isLoggedIn) {
    return (
      <section className="py-20 px-4 min-h-[75vh] flex items-center justify-center bg-[#FAF9F5]">
        <div className="w-full max-w-sm bg-white border border-stone-200/60 rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-50 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-rose-50 rounded-full blur-xl pointer-events-none" />

          <div className="text-center space-y-3 relative z-10 font-sans">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center mx-auto text-2xl shadow-sm">
              🔮
            </div>
            <span className="text-xs uppercase tracking-widest text-purple-600 font-bold block">Admin Console</span>
            <h1 className="text-2xl font-serif text-stone-900 font-bold">Stellar Admin Portal</h1>
            <p className="text-stone-400 font-light text-xs">
              Enter your credentials to access the management dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="relative z-10 space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Email Address</label>
              <input
                type="text"
                value={loginEmail}
                onChange={(e) => { setLoginEmail(e.target.value); setLoginError(''); }}
                placeholder="Enter admin email"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => { setLoginPassword(e.target.value); setLoginError(''); }}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                required
              />
            </div>

            {loginError && (
              <div className="px-4 py-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 hover:bg-purple-800 active:scale-[0.98] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md"
            >
              Enter Console ✦
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 px-4 min-h-[85vh] bg-[#FAF9F5]">
      <div className="max-w-6xl mx-auto space-y-8 font-sans">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-200/50 pb-6 gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-purple-600 font-bold block">Console Active</span>
            <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 font-bold leading-none tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-purple-900 to-indigo-950">
              Welcome garima
            </h1>
            <p className="text-stone-500 font-light text-xs sm:text-sm">Manage dynamic pages configurations and client-side records.</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100/50 text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95"
          >
            Lock Console
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
          {[
            { key: 'home', label: 'Home', icon: '🏠' },
            { key: 'consulation', label: 'Consulation', icon: '🔮' },
            { key: 'shop', label: 'Shop', icon: '🛍️' },
            { key: 'about', label: 'About Us', icon: 'ℹ️' },
            { key: 'get_in_touch', label: 'Get in touch', icon: '📞' },
            { key: 'settings', label: 'Settings', icon: '⚙️' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => switchSubTab(tab.key as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
                subTab === tab.key
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 border border-stone-200/60 hover:bg-stone-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="space-y-8 animate-fadeIn">

          {/* ── SUB-TAB: HOME ────────────────────────────────────────────────── */}
          {subTab === 'home' && (
            <div className="space-y-10">
              {/* Section 1: Hero & Stats */}
              <div className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="text-lg font-serif font-bold text-stone-900">Section 1: Hero & Statistics Calibration</h3>
                  <p className="text-xs text-stone-500 font-light mt-0.5">Customize the landing copy and vibrational metrics numbers.</p>
                </div>
                <form onSubmit={handleSaveHero} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Hero Banner Title</label>
                    <input
                      type="text"
                      value={tempHeroTitle}
                      onChange={(e) => setTempHeroTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none transition-all font-sans"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Hero Banner Subheading</label>
                    <textarea
                      value={tempHeroSub}
                      onChange={(e) => setTempHeroSub(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none transition-all font-sans"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Charts Calibrated Number</label>
                      <input
                        type="text"
                        value={tempCharts}
                        onChange={(e) => setTempCharts(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-850 text-xs focus:ring-2 focus:ring-purple-200 outline-none transition-all font-mono"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Client Praise Metric</label>
                      <input
                        type="text"
                        value={tempPraise}
                        onChange={(e) => setTempPraise(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-850 text-xs focus:ring-2 focus:ring-purple-200 outline-none transition-all font-mono"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Spiritual Ethics Rating</label>
                      <input
                        type="text"
                        value={tempEthics}
                        onChange={(e) => setTempEthics(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-850 text-xs focus:ring-2 focus:ring-purple-200 outline-none transition-all font-mono"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors shadow-sm"
                  >
                    Save Banner Details
                  </button>
                </form>
              </div>

              {/* Section 2: Popular Services Selection */}
              <div className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="text-lg font-serif font-bold text-stone-900">Section 2: Popular Services Featured Matrix</h3>
                  <p className="text-xs text-stone-500 font-light mt-0.5">Toggle which consultation services are featured on the landing page.</p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs text-stone-500 italic bg-amber-50 border border-amber-200/50 rounded-xl p-3">
                    💡 <strong>Layout Tip:</strong> The homepage featured grid is optimized for exactly 3 services (with the middle card styled larger as the &quot;Best Seller&quot;). Currently featured: <span className="font-bold font-mono">{displayedServices.length}</span>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {services.map((srv) => {
                      const isFeatured = displayedServices.includes(srv.id);
                      return (
                        <div
                          key={srv.id}
                          onClick={() => handleToggleDisplayedService(srv.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-center justify-between ${
                            isFeatured
                              ? 'border-purple-300 bg-purple-50/20 shadow-sm'
                              : 'border-stone-200 bg-white hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{srv.icon || '🔮'}</span>
                            <div>
                              <span className="block text-xs font-bold text-stone-800 uppercase tracking-wide line-clamp-1">{srv.title}</span>
                              <span className="text-[10px] text-stone-400 font-light">By {srv.name}</span>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={isFeatured}
                            onChange={() => {}} // handled by div click
                            className="w-4 h-4 rounded border-stone-300 text-purple-600 focus:ring-purple-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Section 3: Add Testimonial */}
              <div className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="text-lg font-serif font-bold text-stone-900">Section 3: Publish Astral Reviews</h3>
                  <p className="text-xs text-stone-500 font-light mt-0.5">Add verified client testimonials directly to the autoscroll marquee.</p>
                </div>
                <form onSubmit={handleAddTestimonial} className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Client Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Garima Verma"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none font-sans"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Zodiac Rasi Sign</label>
                      <select
                        value={testSign}
                        onChange={(e) => setTestSign(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none font-sans"
                      >
                        {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map((sign) => (
                          <option key={sign} value={sign}>{sign}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Stars Rating</label>
                      <select
                        value={testStars}
                        onChange={(e) => setTestStars(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none font-sans"
                      >
                        <option value="3.5">3.5 Stars</option>
                        <option value="4.0">4.0 Stars</option>
                        <option value="4.5">4.5 Stars</option>
                        <option value="5.0">5.0 Stars (Perfect)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Testimonial Review</label>
                    <textarea
                      placeholder="Write review experience..."
                      value={testText}
                      onChange={(e) => setTestText(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none font-sans"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors shadow-sm"
                  >
                    Publish Testimonial
                  </button>
                </form>
              </div>

              {/* Section 4: CRUD FAQs */}
              <div className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="text-lg font-serif font-bold text-stone-900">Section 4: Celestial FAQs Registry Manager</h3>
                  <p className="text-xs text-stone-500 font-light mt-0.5">Add, update, or remove question registries available on the Home page.</p>
                </div>
                
                {/* Form to Add FAQ */}
                <form onSubmit={handleAddFaq} className="p-5 border border-purple-100 bg-purple-50/15 rounded-2xl space-y-3 font-sans">
                  <h4 className="text-xs font-bold text-purple-800 uppercase tracking-wider">Add New FAQ Query</h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Frequently Asked Question..."
                      value={faqQuestion}
                      onChange={(e) => setFaqQuestion(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none"
                      required
                    />
                    <textarea
                      placeholder="FAQ Response..."
                      value={faqAnswer}
                      onChange={(e) => setFaqAnswer(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-700 text-white text-xs font-bold rounded-lg hover:bg-purple-800 transition-colors"
                  >
                    Add FAQ Item
                  </button>
                </form>

                {/* List & Edit existing FAQs */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Active FAQs ({faqs.length})</h4>
                  <div className="divide-y divide-stone-100 space-y-3">
                    {faqs.map((item, idx) => (
                      <div key={idx} className="pt-3 first:pt-0 space-y-2">
                        {faqEditIndex === idx ? (
                          <div className="p-4 border border-stone-200 rounded-xl bg-stone-50 space-y-2">
                            <input
                              type="text"
                              value={faqEditQuestion}
                              onChange={(e) => setFaqEditQuestion(e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-stone-800 text-xs focus:outline-none"
                            />
                            <textarea
                              value={faqEditAnswer}
                              onChange={(e) => setFaqEditAnswer(e.target.value)}
                              rows={3}
                              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-stone-800 text-xs focus:outline-none"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveEditFaq(idx)}
                                className="px-3 py-1 bg-green-600 text-white text-[10px] font-bold rounded-md hover:bg-green-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setFaqEditIndex(null)}
                                className="px-3 py-1 bg-stone-300 text-stone-700 text-[10px] font-bold rounded-md hover:bg-stone-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <span className="block text-xs font-bold text-stone-800">{idx + 1}. {item.question}</span>
                              <span className="block text-xs font-light text-stone-500 leading-relaxed">{item.answer}</span>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setFaqEditIndex(idx);
                                  setFaqEditQuestion(item.question);
                                  setFaqEditAnswer(item.answer);
                                }}
                                className="px-2.5 py-1 text-purple-600 hover:bg-purple-50 text-[10px] font-bold rounded-lg transition-all"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Delete this FAQ query?')) deleteFaq(idx);
                                }}
                                className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 text-[10px] font-bold rounded-lg transition-all"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── SUB-TAB: CONSULTATION ───────────────────────────────────────── */}
          {subTab === 'consulation' && (
            <div className="space-y-10">
              
              {/* Form to Add New Service */}
              <div className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="text-lg font-serif font-bold text-stone-900">Add New Jyotish Service</h3>
                  <p className="text-xs text-stone-500 font-light mt-0.5 font-sans">Introduce new consultation specialists or reading types to the store.</p>
                </div>
                <form onSubmit={handleAddService} className="space-y-4 font-sans text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Service Title</label>
                      <input
                        type="text"
                        placeholder="e.g. COMPLETE KUNDLI STUDY"
                        value={newSrvTitle}
                        onChange={(e) => setNewSrvTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-850 text-xs focus:ring-2 focus:ring-purple-200 outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Astrologer Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Sachin R"
                        value={newSrvName}
                        onChange={(e) => setNewSrvName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-850 text-xs focus:ring-2 focus:ring-purple-200 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Languages</label>
                      <input
                        type="text"
                        value={newSrvLanguages}
                        onChange={(e) => setNewSrvLanguages(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Experience</label>
                      <input
                        type="text"
                        value={newSrvExperience}
                        onChange={(e) => setNewSrvExperience(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Reviews Count</label>
                      <input
                        type="number"
                        placeholder="e.g. 1500"
                        value={newSrvReviews}
                        onChange={(e) => setNewSrvReviews(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Rating Stars</label>
                      <select
                        value={newSrvRating}
                        onChange={(e) => setNewSrvRating(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs"
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Promo Badge Tag (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Popular / Offer"
                        value={newSrvBadge}
                        onChange={(e) => setNewSrvBadge(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Emoji Icon</label>
                      <input
                        type="text"
                        value={newSrvIcon}
                        onChange={(e) => setNewSrvIcon(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Background Theme Preset</label>
                      <select
                        value={newSrvBg}
                        onChange={(e) => setNewSrvBg(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs"
                      >
                        {GRADIENT_PRESETS.map((preset) => (
                          <option key={preset.value} value={preset.value}>{preset.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Service Short Description</label>
                    <textarea
                      placeholder="Brief details about what is analyzed..."
                      value={newSrvDesc}
                      onChange={(e) => setNewSrvDesc(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none"
                      required
                    />
                  </div>

                  {/* Booking Pricing Toggles */}
                  <div className="border border-stone-100 rounded-2xl p-5 space-y-4 bg-stone-50/30">
                    <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">Pricing Channels Configuration</h4>
                    
                    {/* Chat Channel */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 border-b border-stone-100 pb-3">
                      <label className="flex items-center gap-2 font-bold text-stone-600 text-xs">
                        <input
                          type="checkbox"
                          checked={newSrvChatEnabled}
                          onChange={(e) => setNewSrvChatEnabled(e.target.checked)}
                          className="rounded border-stone-300 text-purple-600 w-4 h-4"
                        />
                        💬 Chat Channel
                      </label>
                      <div className="space-y-1">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Price (₹)</span>
                        <input
                          type="number"
                          disabled={!newSrvChatEnabled}
                          value={newSrvChatPrice}
                          onChange={(e) => setNewSrvChatPrice(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-800 text-xs disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Duration description</span>
                        <input
                          type="text"
                          disabled={!newSrvChatEnabled}
                          value={newSrvChatDur}
                          onChange={(e) => setNewSrvChatDur(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-800 text-xs disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Call Channel */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 border-b border-stone-100 pb-3">
                      <label className="flex items-center gap-2 font-bold text-stone-600 text-xs">
                        <input
                          type="checkbox"
                          checked={newSrvCallEnabled}
                          onChange={(e) => setNewSrvCallEnabled(e.target.checked)}
                          className="rounded border-stone-300 text-purple-600 w-4 h-4"
                        />
                        📞 Call Channel
                      </label>
                      <div className="space-y-1">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Price (₹)</span>
                        <input
                          type="number"
                          disabled={!newSrvCallEnabled}
                          value={newSrvCallPrice}
                          onChange={(e) => setNewSrvCallPrice(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-800 text-xs disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Duration description</span>
                        <input
                          type="text"
                          disabled={!newSrvCallEnabled}
                          value={newSrvCallDur}
                          onChange={(e) => setNewSrvCallDur(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-800 text-xs disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Video Call Channel */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                      <label className="flex items-center gap-2 font-bold text-stone-600 text-xs">
                        <input
                          type="checkbox"
                          checked={newSrvVideoEnabled}
                          onChange={(e) => setNewSrvVideoEnabled(e.target.checked)}
                          className="rounded border-stone-300 text-purple-600 w-4 h-4"
                        />
                        📹 Video Call Channel
                      </label>
                      <div className="space-y-1">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Price (₹)</span>
                        <input
                          type="number"
                          disabled={!newSrvVideoEnabled}
                          value={newSrvVideoPrice}
                          onChange={(e) => setNewSrvVideoPrice(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-800 text-xs disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Duration description</span>
                        <input
                          type="text"
                          disabled={!newSrvVideoEnabled}
                          value={newSrvVideoDur}
                          onChange={(e) => setNewSrvVideoDur(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-800 text-xs disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors shadow-sm uppercase tracking-wider"
                  >
                    Save Service Blueprint
                  </button>
                </form>
              </div>

              {/* Display All Services and support edit/delete */}
              <div className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="text-lg font-serif font-bold text-stone-900">Manage Consultation Catalog</h3>
                  <p className="text-xs text-stone-500 font-light mt-0.5">Edit or remove active consultation services in the store catalog.</p>
                </div>

                <div className="space-y-6">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-5 border border-stone-200/60 rounded-2xl bg-stone-50/30 transition-all hover:shadow-sm"
                    >
                      {editingServiceId === srv.id ? (
                        /* Edit mode inputs */
                        <div className="space-y-4 font-sans text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="font-bold text-stone-500">Service Title</label>
                              <input
                                type="text"
                                value={editSrvFields.title || ''}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, title: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl border bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-stone-500">Astrologer Name</label>
                              <input
                                type="text"
                                value={editSrvFields.name || ''}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, name: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl border bg-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <label className="font-bold text-stone-500">Languages</label>
                              <input
                                type="text"
                                value={editSrvFields.languages || ''}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, languages: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl border bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-stone-500">Experience</label>
                              <input
                                type="text"
                                value={editSrvFields.experience || ''}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, experience: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl border bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-stone-500">Reviews Count</label>
                              <input
                                type="number"
                                value={editSrvFields.reviews ?? 0}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, reviews: Number(e.target.value) })}
                                className="w-full px-3 py-1.5 rounded-xl border bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-stone-500">Stars Rating</label>
                              <select
                                value={editSrvFields.rating ?? 5}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, rating: Number(e.target.value) })}
                                className="w-full px-3 py-1.5 rounded-xl border bg-white"
                              >
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <label className="font-bold text-stone-500">Badge Tag</label>
                              <input
                                type="text"
                                value={editSrvFields.badge || ''}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, badge: e.target.value || null })}
                                className="w-full px-3 py-1.5 rounded-xl border bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-stone-500">Emoji Icon</label>
                              <input
                                type="text"
                                value={editSrvFields.icon || ''}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, icon: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl border bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-stone-500">Bg Presets</label>
                              <select
                                value={editSrvFields.bg || ''}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, bg: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl border bg-white"
                              >
                                {GRADIENT_PRESETS.map((preset) => (
                                  <option key={preset.value} value={preset.value}>{preset.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-stone-500">Description</label>
                            <textarea
                              value={editSrvFields.desc || ''}
                              onChange={(e) => setEditSrvFields({ ...editSrvFields, desc: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-1.5 rounded-xl border bg-white"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 border rounded-xl bg-white">
                            <div className="space-y-1">
                              <span className="font-bold text-stone-700 block">💬 Chat Pricing (₹)</span>
                              <input
                                type="number"
                                value={editSrvFields.chatPrice ?? ''}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, chatPrice: e.target.value === '' ? null : Number(e.target.value) })}
                                className="w-full px-2.5 py-1.5 rounded border text-stone-850"
                                placeholder="Disabled"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="font-bold text-stone-700 block">📞 Call Pricing (₹)</span>
                              <input
                                type="number"
                                value={editSrvFields.callPrice ?? ''}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, callPrice: e.target.value === '' ? null : Number(e.target.value) })}
                                className="w-full px-2.5 py-1.5 rounded border text-stone-850"
                                placeholder="Disabled"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="font-bold text-stone-700 block">📹 Video Pricing (₹)</span>
                              <input
                                type="number"
                                value={editSrvFields.videoPrice ?? ''}
                                onChange={(e) => setEditSrvFields({ ...editSrvFields, videoPrice: e.target.value === '' ? null : Number(e.target.value) })}
                                className="w-full px-2.5 py-1.5 rounded border text-stone-850"
                                placeholder="Disabled"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => handleUpdateService(srv.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold"
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={() => setEditingServiceId(null)}
                              className="px-4 py-2 bg-stone-300 text-stone-700 rounded-lg font-bold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Normal display snippet */
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${srv.bg} flex items-center justify-center text-3xl shadow-sm shrink-0`}>
                              {srv.icon || '🔮'}
                            </div>
                            <div className="space-y-1 font-sans">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-stone-800 text-sm uppercase tracking-wide leading-none">{srv.title}</h4>
                                {srv.badge && (
                                  <span className="bg-purple-100 text-purple-700 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase">{srv.badge}</span>
                                )}
                              </div>
                              <p className="text-xs text-stone-500 font-light leading-snug">
                                Astrologer: <span className="font-semibold text-stone-700">{srv.name}</span> | Exp: {srv.experience} | Reviews: {srv.reviews.toLocaleString()}
                              </p>
                              <p className="text-stone-500 text-[11px] font-light leading-relaxed line-clamp-2 max-w-xl">{srv.desc}</p>
                              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px] text-stone-600 font-semibold">
                                {srv.chatPrice !== null && <span>💬 Chat: ₹{srv.chatPrice}</span>}
                                {srv.callPrice !== null && <span>📞 Call: ₹{srv.callPrice}</span>}
                                {srv.videoPrice !== null && <span>📹 Video: ₹{srv.videoPrice}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end pt-2 sm:pt-0">
                            <button
                              onClick={() => startEditingService(srv)}
                              className="px-3.5 py-1.5 border border-purple-200 text-purple-700 bg-white hover:bg-purple-50 text-[10px] font-bold rounded-lg transition-all"
                            >
                              Edit Details
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${srv.title}"?`)) {
                                  deleteService(srv.id);
                                  showToast('Service deleted from registry.');
                                }
                              }}
                              className="px-3.5 py-1.5 border border-rose-200 text-rose-600 bg-white hover:bg-rose-50 text-[10px] font-bold rounded-lg transition-all"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SUB-TAB: SHOP ────────────────────────────────────────────────── */}
          {subTab === 'shop' && (
            <div className="space-y-6">
              {/* Inner panel toggle */}
              <div className="flex gap-2">
                {(['categories', 'products'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setShopPanel(p)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      shopPanel === p
                        ? 'bg-stone-900 text-white shadow'
                        : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {p === 'categories' ? '📦 Categories' : '💎 Products'}
                  </button>
                ))}
              </div>

              {/* ── CATEGORIES PANEL ── */}
              {shopPanel === 'categories' && (
                <div className="space-y-6">
                  <div className="bg-white border border-stone-200/60 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3 mb-4">Add New Category (Branch)</h3>
                    <form onSubmit={handleAddShopCategory} className="space-y-4 font-sans text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Designation / Type (optional)</label>
                          <input type="text" value={catDesignation} onChange={e => setCatDesignation(e.target.value)} placeholder="e.g. Stone of Wealth" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Main Product Name *</label>
                          <input type="text" value={catName} onChange={e => setCatName(e.target.value)} placeholder="e.g. Pyrite Collection" required className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Tagline</label>
                          <input type="text" value={catTagline} onChange={e => setCatTagline(e.target.value)} placeholder="e.g. Stone of Wealth" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Image URL</label>
                          <input type="text" value={catImage} onChange={e => setCatImage(e.target.value)} placeholder="https://... (leave empty for emoji)" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Description *</label>
                        <textarea value={catDesc} onChange={e => setCatDesc(e.target.value)} rows={2} required placeholder="Brief category description..." className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                      </div>
                      <div className="flex items-center gap-3 p-3 border border-stone-100 rounded-xl bg-stone-50/30">
                        <input
                          type="checkbox"
                          id="cat-single-product"
                          checked={catIsSingle}
                          onChange={e => setCatIsSingle(e.target.checked)}
                          className="w-4 h-4 accent-purple-700 cursor-pointer"
                        />
                        <label htmlFor="cat-single-product" className="text-xs font-semibold text-stone-700 cursor-pointer select-none">
                          Single Product (no sub-categories) — shows <span className="bg-stone-900 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">Buy Now</span> directly on shop grid
                        </label>
                      </div>
                      <button type="submit" className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors shadow-sm uppercase tracking-wider">+ Add Category</button>
                    </form>
                  </div>

                  <div className="bg-white border border-stone-200/60 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3 mb-4">All Categories ({shopCategories.length})</h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {shopCategories.map(cat => (
                        <div key={cat.id} className="border border-stone-100 rounded-2xl p-4 font-sans text-xs">
                          {editingCatId === cat.id ? (
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Name</label><input value={editCatFields.name ?? cat.name} onChange={e => setEditCatFields(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                                <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Tagline</label><input value={editCatFields.tagline ?? cat.tagline} onChange={e => setEditCatFields(f => ({ ...f, tagline: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                              </div>
                              <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Image URL</label><input value={editCatFields.image ?? cat.image} onChange={e => setEditCatFields(f => ({ ...f, image: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                              <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Description</label><textarea value={editCatFields.desc ?? cat.desc} onChange={e => setEditCatFields(f => ({ ...f, desc: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                              <div className="flex items-center gap-2 p-2.5 border border-stone-100 rounded-xl bg-stone-50/30">
                                <input
                                  type="checkbox"
                                  id={`edit-single-${cat.id}`}
                                  checked={!!(editCatFields.isSingleProduct ?? cat.isSingleProduct)}
                                  onChange={e => setEditCatFields(f => ({ ...f, isSingleProduct: e.target.checked }))}
                                  className="w-4 h-4 accent-purple-700 cursor-pointer"
                                />
                                <label htmlFor={`edit-single-${cat.id}`} className="text-[10px] font-semibold text-stone-700 cursor-pointer select-none">Single Product — Buy Now CTA</label>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => handleSaveEditShopCategory(cat.id)} className="px-4 py-2 bg-stone-900 text-white rounded-xl text-[10px] font-bold hover:bg-stone-800 uppercase">Save</button>
                                <button onClick={() => { setEditingCatId(null); setEditCatFields({}); }} className="px-4 py-2 border rounded-xl text-[10px] font-bold text-stone-500 hover:bg-stone-50 uppercase">Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-stone-100 overflow-hidden flex items-center justify-center flex-shrink-0 text-lg">
                                  {cat.image.startsWith('http') || cat.image.startsWith('/') ? <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" /> : cat.image}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-stone-800 truncate">{cat.name}</p>
                                  <p className="text-[10px] text-purple-600 font-semibold uppercase">{cat.tagline}</p>
                                  <p className="text-stone-400 line-clamp-1 mt-0.5">{cat.desc}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-[9px] text-stone-300 font-mono">ID: {cat.id}</p>
                                    {cat.isSingleProduct && <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold uppercase">Single Product</span>}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <button onClick={() => { setEditingCatId(cat.id); setEditCatFields({ name: cat.name, tagline: cat.tagline, image: cat.image, desc: cat.desc, isSingleProduct: cat.isSingleProduct }); }} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-[10px] font-bold hover:bg-purple-100 uppercase">Edit</button>
                                <button onClick={() => { if (window.confirm('Delete ' + cat.name + ' and all its products?')) { deleteShopCategory(cat.id); showToast('Category deleted.'); } }} className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-bold hover:bg-rose-100 uppercase">Del</button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {shopCategories.length === 0 && <p className="text-xs text-stone-400 text-center py-6">No categories yet. Add one above.</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* ── PRODUCTS PANEL ── */}
              {shopPanel === 'products' && (
                <div className="space-y-6">
                  <div className="bg-white border border-stone-200/60 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3 mb-4">Add New Sub-Product</h3>
                    <form onSubmit={handleAddSubProduct} className="space-y-4 font-sans text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Category (Branch) *</label>
                          <select value={prodCategoryId} onChange={e => setProdCategoryId(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none">
                            <option value="">— Select Category —</option>
                            {shopCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Product Image URL</label>
                          <input type="text" value={prodImage} onChange={e => setProdImage(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Product Name *</label>
                          <input type="text" value={prodName} onChange={e => setProdName(e.target.value)} required placeholder="e.g. Raw Pyrite Specimen" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Badge / Tag</label>
                          <select value={prodLabel} onChange={e => setProdLabel(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none">
                            {['Best Seller', 'Highly Requested', 'Feng Shui Specimen', 'Daily Talisman', 'Limited Edition', 'New Arrival', 'Exclusive'].map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Small Description *</label>
                        <textarea value={prodDesc} onChange={e => setProdDesc(e.target.value)} rows={2} required placeholder="Short description shown on product card..." className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Price Type *</label>
                          <select value={prodPricingType} onChange={e => setProdPricingType(e.target.value as 'fixed' | 'per-gram' | 'per-kg')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none">
                            <option value="fixed">Single / Fixed Price</option>
                            <option value="per-gram">Per Gram (Rs/gm)</option>
                            <option value="per-kg">Per Kilogram (Rs/kg)</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                            {prodPricingType === 'per-gram' ? 'Price per gram (Rs) *' : prodPricingType === 'per-kg' ? 'Price per kg (Rs) *' : 'Price (Rs) *'}
                          </label>
                          <input type="number" value={prodPrice} onChange={e => setProdPrice(e.target.value)} required min="0" step="0.01" placeholder="0" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Big Detail Description (one benefit per line)</label>
                        <textarea value={prodBigDesc} onChange={e => setProdBigDesc(e.target.value)} rows={4} placeholder="Attracts abundance and financial prosperity&#10;Protects from negative energy&#10;Boosts motivation and confidence" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none font-mono" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Metaphysical Spec / Resonance Node</label>
                          <input type="text" value={prodResonance} onChange={e => setProdResonance(e.target.value)} placeholder="e.g. 432Hz Universal Resonance" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Chakra Node</label>
                          <input type="text" value={prodNode} onChange={e => setProdNode(e.target.value)} placeholder="e.g. Solar Plexus & Root Chakra" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Solar Peak Cleansed &amp; Programmed</label>
                          <input type="text" value={prodSolar} onChange={e => setProdSolar(e.target.value)} placeholder="e.g. Full Moon Solstice 2024" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Apothecary Placement Instructions</label>
                          <input type="text" value={prodApothecary} onChange={e => setProdApothecary(e.target.value)} placeholder="e.g. North-East corner of workspace" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" />
                        </div>
                      </div>
                      <button type="submit" className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors shadow-sm uppercase tracking-wider">+ Add Product</button>
                    </form>
                  </div>

                  <div className="bg-white border border-stone-200/60 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3 mb-4">All Sub-Products ({shopSubProducts.length})</h3>
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                      {shopSubProducts.map(prod => (
                        <div key={prod.id} className="border border-stone-100 rounded-2xl p-4 font-sans text-xs">
                          {editingProdId === prod.id ? (
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Product Name</label><input value={editProdFields.name ?? prod.name} onChange={e => setEditProdFields(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                                <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Image URL</label><input value={editProdFields.image ?? prod.image} onChange={e => setEditProdFields(f => ({ ...f, image: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                              </div>
                              <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Small Description</label><textarea value={editProdFields.desc ?? prod.desc} onChange={e => setEditProdFields(f => ({ ...f, desc: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Price Type</label>
                                  <select value={editProdFields.pricingType ?? prod.pricingType} onChange={e => setEditProdFields(f => ({ ...f, pricingType: e.target.value as SubCrystalProduct['pricingType'] }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs outline-none">
                                    <option value="fixed">Fixed</option><option value="per-gram">Per Gram</option><option value="per-kg">Per KG</option><option value="size-based">Size Based</option>
                                  </select>
                                </div>
                                <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Base Price (Rs)</label><input type="number" value={editProdFields.basePrice ?? prod.basePrice} onChange={e => setEditProdFields(f => ({ ...f, basePrice: parseFloat(e.target.value) || 0 }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                                <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Badge</label>
                                  <select value={editProdFields.label ?? prod.label} onChange={e => setEditProdFields(f => ({ ...f, label: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs outline-none">
                                    {['Best Seller', 'Highly Requested', 'Feng Shui Specimen', 'Daily Talisman', 'Limited Edition', 'New Arrival', 'Exclusive'].map(l => <option key={l} value={l}>{l}</option>)}
                                  </select>
                                </div>
                              </div>
                              <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Big Detail Description (one per line)</label>
                                <textarea
                                  value={Array.isArray(editProdFields.benefits) ? editProdFields.benefits.join('\n') : prod.benefits.join('\n')}
                                  onChange={e => setEditProdFields(f => ({ ...f, benefits: e.target.value.split('\n').map(l => l.trim()).filter(Boolean) }))}
                                  rows={3} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none font-mono"
                                />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Resonance Node</label><input value={editProdFields.resonance ?? prod.resonance} onChange={e => setEditProdFields(f => ({ ...f, resonance: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                                <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Chakra Node</label><input value={editProdFields.node ?? prod.node} onChange={e => setEditProdFields(f => ({ ...f, node: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Solar Peak Cleansed</label><input value={editProdFields.solarPeakCleansed ?? prod.solarPeakCleansed ?? ''} onChange={e => setEditProdFields(f => ({ ...f, solarPeakCleansed: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                                <div><label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Apothecary Placement</label><input value={editProdFields.apothecaryPlacement ?? prod.apothecaryPlacement ?? ''} onChange={e => setEditProdFields(f => ({ ...f, apothecaryPlacement: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-purple-200 outline-none" /></div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => handleSaveEditSubProduct(prod.id)} className="px-4 py-2 bg-stone-900 text-white rounded-xl text-[10px] font-bold hover:bg-stone-800 uppercase">Save</button>
                                <button onClick={() => { setEditingProdId(null); setEditProdFields({}); }} className="px-4 py-2 border rounded-xl text-[10px] font-bold text-stone-500 hover:bg-stone-50 uppercase">Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-stone-100 overflow-hidden flex items-center justify-center flex-shrink-0 text-lg">
                                  {prod.image?.startsWith('http') || prod.image?.startsWith('/') ? (
                                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                  ) : (prod.image || '💎')}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-stone-800 truncate">{prod.name}</p>
                                  <p className="text-[10px] text-purple-600 font-semibold uppercase">{prod.label}</p>
                                  <p className="text-stone-400 line-clamp-1 mt-0.5">{prod.desc}</p>
                                  <div className="flex gap-3 mt-1 text-[10px] text-stone-400">
                                    <span>Rs{prod.basePrice}{prod.pricingType === 'per-gram' ? '/gm' : prod.pricingType === 'per-kg' ? '/kg' : ''}</span>
                                    <span>·</span>
                                    <span>{shopCategories.find(c => c.id === prod.categoryId)?.name ?? prod.categoryId}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <button
                                  onClick={() => {
                                    setEditingProdId(prod.id);
                                    setEditProdFields({ name: prod.name, image: prod.image, desc: prod.desc, basePrice: prod.basePrice, pricingType: prod.pricingType, label: prod.label, benefits: [...prod.benefits], resonance: prod.resonance, node: prod.node, solarPeakCleansed: prod.solarPeakCleansed ?? '', apothecaryPlacement: prod.apothecaryPlacement ?? '' });
                                  }}
                                  className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-[10px] font-bold hover:bg-purple-100 uppercase"
                                >Edit</button>
                                <button onClick={() => { if (window.confirm('Delete ' + prod.name + '?')) { deleteShopSubProduct(prod.id); showToast('Product deleted.'); } }} className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-bold hover:bg-rose-100 uppercase">Del</button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {shopSubProducts.length === 0 && <p className="text-xs text-stone-400 text-center py-6">No sub-products yet. Add one above.</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* ── SUB-TAB: ABOUT US ────────────────────────────────────────────── */}
          {subTab === 'about' && (
            <div className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <h3 className="text-lg font-serif font-bold text-stone-900">Founder & Bio Customization</h3>
                <p className="text-xs text-stone-500 font-light mt-0.5">Edit founder details, credentials list, and timeline milestones.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); playTone(659.25, 'sine', 0.1); showToast('Milestone logs saved.'); }} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-500 block uppercase">Founder Name</label>
                    <input type="text" defaultValue="Garima Verma" disabled className="w-full px-4 py-2.5 rounded-xl border bg-stone-50 text-stone-600" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-stone-500 block uppercase">Founder Title Badge</label>
                    <input type="text" defaultValue="Founder & Astro-Alchemist" disabled className="w-full px-4 py-2.5 rounded-xl border bg-stone-50 text-stone-600" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-500 block uppercase font-sans">Biography Description Summary</label>
                  <textarea
                    rows={4}
                    defaultValue="Greetings, curious seeker. My journey into astrology and crystals began not with superstition, but with molecular grids. Holding a Masters degree in Chemistry, I spent years researching crystallization processes..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-600 text-xs focus:ring-2 focus:ring-purple-200 outline-none"
                    disabled
                  />
                </div>

                <div className="p-4 border rounded-xl bg-purple-50/10 space-y-2">
                  <span className="font-bold text-purple-900 block">Verified Qualifications</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-600">
                    <div className="flex gap-2">🎓 <span>Masters in Chemistry (RES-Grid alignment)</span></div>
                    <div className="flex gap-2">🔭 <span>Vedic Astrology Chart Decoding</span></div>
                    <div className="flex gap-2">🧭 <span>Spatial Vastu Shastra Harmonization</span></div>
                    <div className="flex gap-2">✨ <span>Mindfulness & Crystal Programming Guide</span></div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-850 shadow-sm"
                >
                  Save Biography Registry
                </button>
              </form>
            </div>
          )}

          {/* ── SUB-TAB: GET IN TOUCH ────────────────────────────────────────── */}
          {subTab === 'get_in_touch' && (
            <div className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <h3 className="text-lg font-serif font-bold text-stone-900">Get in touch (Contact Configurations)</h3>
                <p className="text-xs text-stone-500 font-light mt-0.5">Configure address values, email destinations, and active call frequencies.</p>
              </div>

              <form onSubmit={handleSaveContact} className="space-y-4 font-sans text-xs">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Office Physical Location Address</label>
                  <input
                    type="text"
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-850 text-xs focus:ring-2 focus:ring-purple-200 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Contact Email Destination</label>
                    <input
                      type="email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-850 text-xs focus:ring-2 focus:ring-purple-200 outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Active Phone Number (e.g. 9041544404)</label>
                    <input
                      type="text"
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-850 text-xs focus:ring-2 focus:ring-purple-200 outline-none font-mono"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors shadow-sm uppercase tracking-wider"
                >
                  Save Dispatch Settings
                </button>
              </form>
            </div>
          )}

          {/* ── SUB-TAB: SETTINGS ────────────────────────────────────────────── */}
          {subTab === 'settings' && (
            <div className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center text-xl shadow-sm">⚙️</div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-stone-900">Admin Credentials Settings</h3>
                    <p className="text-xs text-stone-500 font-light mt-0.5">Update the login email and password for the Admin Console. Changes are saved in the browser and persist across sessions.</p>
                  </div>
                </div>
              </div>

              {/* Current Credentials Info */}
              <div className="bg-stone-50 border border-stone-200/60 rounded-2xl p-4 space-y-2">
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Current Login Credentials</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400">Email:</span>
                    <span className="font-mono font-semibold text-stone-700 bg-white px-2 py-0.5 rounded-lg border border-stone-200">{adminEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400">Password:</span>
                    <span className="font-mono font-semibold text-stone-700 bg-white px-2 py-0.5 rounded-lg border border-stone-200">{'•'.repeat(adminPassword.length)}</span>
                  </div>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!settingsEmail.trim()) { showToast('Email cannot be empty.'); return; }
                  if (!settingsPassword.trim()) { showToast('Password cannot be empty.'); return; }
                  if (settingsPassword !== settingsConfirmPassword) { showToast('Passwords do not match!'); return; }
                  updateAdminCredentials(settingsEmail.trim(), settingsPassword);
                  playTone(659.25, 'sine', 0.1);
                  showToast('Admin credentials updated successfully! 🔐');
                  setSettingsEmail('');
                  setSettingsPassword('');
                  setSettingsConfirmPassword('');
                }}
                className="space-y-4 font-sans text-xs"
              >
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">New Admin Email</label>
                  <input
                    type="text"
                    value={settingsEmail}
                    onChange={(e) => setSettingsEmail(e.target.value)}
                    placeholder="Enter new email address"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">New Password</label>
                    <input
                      type="password"
                      value={settingsPassword}
                      onChange={(e) => setSettingsPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Confirm New Password</label>
                    <input
                      type="password"
                      value={settingsConfirmPassword}
                      onChange={(e) => setSettingsConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-purple-800 transition-all shadow-sm uppercase tracking-wider active:scale-[0.98]"
                  >
                    🔐 Update Credentials
                  </button>
                  <p className="text-[10px] text-stone-400 font-light">You will need to use the new credentials on your next login.</p>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
