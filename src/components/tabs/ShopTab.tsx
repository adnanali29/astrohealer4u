'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SubCrystalProduct, ShopCategory } from '@/lib/data';

const GRAM_OPTIONS = [
  { value: '30', label: '30 grams — ₹150' },
  { value: '50', label: '50 grams — ₹250' },
  { value: '100', label: '100 grams — ₹500' },
  { value: '250', label: '250 grams — ₹1,250' },
  { value: '500', label: '500 grams — ₹2,500' },
  { value: '1000', label: '1000 grams — ₹5,000' },
  { value: '2000', label: '2000 grams — ₹10,000' },
];

const WA_NUMBER = '919041544404';

interface OrderForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  weight: string;
  sizeIndex: string;
}

export default function ShopTab() {
  const { playTone, wishlist, toggleWishlist, contactPhone, shopCategories, shopSubProducts } = useApp();

  // Helper: returns true if category is single-product (shows Buy Now directly)
  const isSingle = (cat: ShopCategory) => !!(cat.isSingleProduct || cat.id.endsWith('-bracelet'));
  const [viewState, setViewState] = useState<0 | 1 | 2>(0); // 0: Category, 1: Sub-Products, 2: Detail
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<SubCrystalProduct | null>(null);
  
  // Local quantity map for grid cards
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  // Quantity and Form for Detail Page
  const [detailQty, setDetailQty] = useState(1);
  const [form, setForm] = useState<OrderForm>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    weight: '30',
    sizeIndex: '0',
  });

  const getCardQty = (id: string) => quantities[id] || 1;

  const setCardQty = (id: string, val: number) => {
    if (val < 1) return;
    playTone(440, 'sine', 0.08);
    setQuantities(prev => ({ ...prev, [id]: val }));
  };

  const handleExploreCategory = (category: ShopCategory) => {
    playTone(523.25, 'triangle', 0.15);
    setSelectedCategory(category);
    setViewState(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (product: SubCrystalProduct) => {
    playTone(587.33, 'triangle', 0.18);
    setSelectedProduct(product);
    setDetailQty(getCardQty(product.id));
    setForm({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      weight: '30',
      sizeIndex: '0',
    });
    setViewState(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category: ShopCategory) => {
    if (isSingle(category)) {
      const prod = shopSubProducts.find(p => p.categoryId === category.id);
      if (prod) {
        handleOpenProduct(prod);
        return;
      }
    }
    handleExploreCategory(category);
  };

  const handleBackToGrid = () => {
    playTone(392.00, 'sine', 0.1);
    if (selectedProduct && !!(shopCategories.find(c => c.id === selectedProduct?.categoryId)?.isSingleProduct || !!(shopCategories.find(c => c.id === selectedProduct?.categoryId)?.isSingleProduct || selectedProduct.categoryId.endsWith('-bracelet')))) {
      setViewState(0);
    } else {
      setViewState(1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCategory = () => {
    playTone(329.63, 'sine', 0.08);
    setViewState(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onFieldChange = (key: keyof OrderForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }));
  };

  // Filtered sub-products for active category
  const filteredProducts = selectedCategory
    ? shopSubProducts.filter(p => p.categoryId === selectedCategory.id)
    : [];

  // Pricing Helpers
  const getProductPriceString = (product: SubCrystalProduct) => {
    if (product.pricingType === 'per-gram') {
      return `₹${product.basePrice}/gm (₹150 Min)`;
    }
    if (product.pricingType === 'per-kg') {
      return `₹${product.basePrice.toLocaleString('en-IN')}/kg`;
    }
    if (product.pricingType === 'size-based' && product.sizes) {
      const prices = product.sizes.map(s => s.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return `₹${min.toLocaleString('en-IN')} - ₹${max.toLocaleString('en-IN')}`;
    }
    return `₹${product.basePrice.toLocaleString('en-IN')}`;
  };

  const getUnitPriceAndLabel = (): { price: number; label: string } => {
    if (!selectedProduct) return { price: 0, label: '' };
    
    if (selectedProduct.pricingType === 'per-gram') {
      const grams = parseInt(form.weight) || 30;
      return { price: grams * selectedProduct.basePrice, label: `${grams}g Specimen` };
    }
    
    if (selectedProduct.pricingType === 'size-based' && selectedProduct.sizes) {
      const idx = parseInt(form.sizeIndex) || 0;
      const sz = selectedProduct.sizes[idx] || selectedProduct.sizes[0];
      return { price: sz.price, label: sz.label };
    }
    
    return { price: selectedProduct.basePrice, label: 'Standard Specimen' };
  };

  const { price: unitPrice, label: variantLabel } = getUnitPriceAndLabel();
  const totalPrice = unitPrice * detailQty;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const msg =
`🙏 *Order Request — Astro Apothecary*
━━━━━━━━━━━━━━━━━━
💎 *Product:* ${selectedProduct.name}
✨ *Specification:* ${variantLabel}
📦 *Quantity:* ${detailQty}
💰 *Total Price:* ₹${totalPrice.toLocaleString('en-IN')} (₹${unitPrice.toLocaleString('en-IN')} each)
━━━━━━━━━━━━━━━━━━
👤 *Customer Name:* ${form.fullName}
📞 *Phone Number:* ${form.phone}
📧 *Email Address:* ${form.email}
📍 *Shipping Address:* ${form.address}
━━━━━━━━━━━━━━━━━━
Please confirm my order. Thank you! 🙏`;

    const rawNum = contactPhone.replace(/\D/g, '');
    const waNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="py-12 md:py-20 px-4 min-h-[85vh] bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto">

        {/* ── STATE 0: 18 Main Category Cards Grid ───────────────────────────── */}
        {viewState === 0 && (
          <div className="space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-purple-600 font-bold block">Blessed Relics & Minerals</span>
              <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 leading-tight">The Celestial Apothecary</h1>
              <p className="text-stone-500 font-light text-sm leading-relaxed">
                Explore our catalog of 18 sacred mineral collections. Cleansed with Himalayan salts and charged during auspicious astrological transits to harmonize your space.
              </p>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {shopCategories.map(category => (
                <div
                  key={category.id}
                  className="bg-white rounded-3xl border border-stone-200/50 shadow-sm overflow-hidden hover:shadow-md hover:border-purple-200/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Gradient Image Sphere */}
                    <div className="w-full aspect-square bg-gradient-to-tr from-purple-50 via-rose-50/50 to-amber-50/80 flex items-center justify-center relative overflow-hidden border-b border-stone-100">
                      {category.image.startsWith('http') || category.image.startsWith('/') ? (
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="z-10 select-none text-6xl">{category.image}</span>
                      )}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,230,138,0.15)_0%,transparent_70%)] pointer-events-none" />
                    </div>
                    {/* Card Text */}
                    <div className="p-5 space-y-2">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-purple-600 block">{category.tagline}</span>
                        <h2 className="text-base font-serif font-bold text-stone-900">{category.name}</h2>
                      </div>
                      <p className="text-stone-500 font-light text-[11px] leading-relaxed line-clamp-2">
                        {category.desc}
                      </p>
                    </div>
                  </div>
                  {/* Explore or Buy button */}
                  <div className="p-5 pt-0 flex gap-2">
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`${isSingle(category) ? 'flex-grow' : 'w-full'} py-2.5 bg-stone-900 hover:bg-purple-800 text-white text-[10px] font-semibold tracking-widest uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-1`}
                    >
                      {isSingle(category) ? 'Buy Now' : 'Explore more →'}
                    </button>
                    {isSingle(category) && (() => {
                      const matchedProd = shopSubProducts.find(p => p.categoryId === category.id);
                      const targetId = matchedProd ? matchedProd.id : category.id;
                      return (
                        <button
                          onClick={() => toggleWishlist(targetId)}
                          className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center shrink-0 ${
                            wishlist.includes(targetId)
                              ? 'border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100/50'
                              : 'border-stone-200 bg-white text-stone-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50/30'
                          }`}
                          title={wishlist.includes(targetId) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        >
                          <svg
                            className="w-3.5 h-3.5 fill-current transition-transform duration-200 active:scale-75"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STATE 1: Sub-Products Grid ──────────────────────────────────────── */}
        {viewState === 1 && selectedCategory && (
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-stone-200/50 pb-5">
              <div className="text-center sm:text-left">
                <span className="text-[10px] uppercase tracking-widest text-purple-600 font-bold block">{selectedCategory.tagline}</span>
                <h1 className="text-2xl sm:text-3xl font-serif text-stone-900">{selectedCategory.name}</h1>
              </div>
              <button
                onClick={handleBackToCategory}
                className="px-4 py-2 border border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold rounded-xl transition-all"
              >
                ← Back to Catalog
              </button>
            </div>

            {/* Subcategories list */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-stone-400 font-light text-sm">
                No specimens currently synced under this category node.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const cardQty = getCardQty(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-3xl p-5 border border-stone-200/60 hover:border-purple-200/80 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full border border-purple-100/40">
                            {product.label}
                          </span>
                          <span className="text-[10px] text-stone-400">{selectedCategory.tagline}</span>
                        </div>

                        {/* Image */}
                        <div
                          onClick={() => handleOpenProduct(product)}
                          className="w-full aspect-square bg-[#FAF9F5]/70 rounded-2xl flex items-center justify-center cursor-pointer group-hover:scale-[1.02] transition-transform duration-300 mb-4 relative overflow-hidden border border-stone-100"
                        >
                          {product.image.startsWith('http') || product.image.startsWith('/') ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="z-10 select-none text-5xl">{product.image}</span>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/10 via-rose-100/5 to-transparent pointer-events-none" />
                        </div>

                        {/* Details */}
                        <div className="space-y-1">
                          <h3
                            onClick={() => handleOpenProduct(product)}
                            className="font-serif text-base text-stone-900 font-bold hover:text-purple-800 transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h3>
                          <p className="text-xs text-stone-500 font-light leading-relaxed line-clamp-2">
                            {product.desc}
                          </p>
                          <div className="pt-1.5">
                            <span className="font-mono text-sm font-bold text-stone-900">{getProductPriceString(product)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity [- 1 +] and Buy Button next to it */}
                      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-3">
                        <div className="flex items-center bg-stone-50 border border-stone-200/60 rounded-xl px-2.5 py-1.5 shrink-0">
                          <button
                            onClick={() => setCardQty(product.id, cardQty - 1)}
                            className="w-5 h-5 text-stone-500 hover:text-purple-700 active:scale-90 font-bold text-sm flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-800 font-mono">
                            {cardQty}
                          </span>
                          <button
                            onClick={() => setCardQty(product.id, cardQty + 1)}
                            className="w-5 h-5 text-stone-500 hover:text-purple-700 active:scale-90 font-bold text-sm flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleOpenProduct(product)}
                          className="flex-grow py-2.5 bg-stone-900 hover:bg-purple-800 active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md text-center"
                        >
                          Buy Now
                        </button>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center shrink-0 ${
                            wishlist.includes(product.id)
                              ? 'border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100/50'
                              : 'border-stone-200 bg-white text-stone-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50/30'
                          }`}
                          title={wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        >
                          <svg
                            className="w-4.5 h-4.5 fill-current transition-transform duration-200 active:scale-75"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── STATE 2: Product Detail & WhatsApp Order Form ──────────────────── */}
        {viewState === 2 && selectedProduct && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Nav */}
            <div className="flex justify-between items-center border-b border-stone-200/50 pb-4">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <button onClick={handleBackToGrid} className="hover:text-purple-700 font-medium transition-colors">
                  {!!(shopCategories.find(c => c.id === selectedProduct?.categoryId)?.isSingleProduct || selectedProduct.categoryId.endsWith('-bracelet')) ? 'Catalog' : 'Specimens'}
                </button>
                <span>›</span>
                <span className="text-purple-900 font-semibold">{selectedProduct.name}</span>
              </div>
              <button
                onClick={handleBackToGrid}
                className="px-4 py-2 border border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold rounded-xl transition-all"
              >
                {!!(shopCategories.find(c => c.id === selectedProduct?.categoryId)?.isSingleProduct || selectedProduct.categoryId.endsWith('-bracelet')) ? '← Back to Catalog' : '← Back to Grid'}
              </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              
              {/* Left Column: Visual Card, Spec Card & Supporting Vastu Cards */}
              <div className="space-y-6">
                <div className="w-full aspect-square bg-white border border-stone-200/60 rounded-3xl flex items-center justify-center shadow-sm relative overflow-hidden">
                  {(selectedProduct.detailImage || selectedProduct.image).startsWith('http') || (selectedProduct.detailImage || selectedProduct.image).startsWith('/') ? (
                    <img src={selectedProduct.detailImage || selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="z-10 select-none text-8xl animate-pulse">{selectedProduct.detailImage || selectedProduct.image}</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/10 via-rose-100/5 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 text-purple-300 text-xl animate-pulse">✦</div>
                  <div className="absolute bottom-4 right-4 text-amber-300 text-xl animate-pulse">★</div>
                </div>

                {/* Specs */}
                <div className="bg-white border border-stone-200/60 p-5 rounded-2xl space-y-3 shadow-sm">
                  <span className="font-bold text-purple-800 text-xs uppercase tracking-wider block">Metaphysical Spec Parameters</span>
                  <div className="space-y-2 text-xs font-light text-stone-600">
                    <div className="flex justify-between border-b border-stone-100 pb-1">
                      <span className="font-medium text-stone-700">Resonance Node</span>
                      <span>{selectedProduct.resonance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-stone-700">Chakra Node</span>
                      <span>{selectedProduct.node}</span>
                    </div>
                  </div>
                </div>

                {/* Supporting Card 1: Cleansing Info */}
                <div className="bg-white border border-stone-200/60 p-5 rounded-2xl shadow-sm space-y-3 flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl shrink-0 border border-amber-100/50">☀️</div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug">Solar Peak Cleansed & Programmed</h4>
                    <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                      Every {selectedProduct.name} specimen is hand-selected, cleansed with pure Himalayan rock salts, and energized under peak noon solar transits to activate its unique {selectedProduct.node} frequencies.
                    </p>
                  </div>
                </div>

                {/* Supporting Card 2: Placement Guide */}
                <div className="bg-white border border-stone-200/60 p-5 rounded-2xl shadow-sm space-y-3 flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl shrink-0 border border-purple-100/50">🧭</div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug">Apothecary Placement Instructions</h4>
                    <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                      Place this {selectedProduct.name} in the key quadrant matching the {selectedProduct.node} (living rooms, study desks, cash boxes, or bedrooms) to attract optimal spatial balance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Title, Benefits, Form */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-100/40 inline-block">
                    {selectedProduct.label}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">{selectedProduct.name}</h2>
                  <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">{selectedProduct.desc}</p>
                </div>

                {/* Benefits */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">Chakra Alignment Benefits</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {selectedProduct.benefits.map((benefit, bi) => (
                      <li key={bi} className="flex items-start gap-2.5 text-xs text-stone-600 leading-relaxed font-light">
                        <span className="text-purple-600 text-sm shrink-0 mt-0.5">✦</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmitOrder} className="bg-white border border-stone-200/60 rounded-3xl p-6 space-y-4 shadow-sm">
                  <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                    <span>📋</span> Order Checkout Details
                  </h3>

                  <div className="space-y-3.5">
                    
                    {/* Full Name */}
                    <div className="space-y-1 font-sans">
                      <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                        Full Name <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Aditi Roy"
                        value={form.fullName}
                        onChange={onFieldChange('fullName')}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 text-stone-855 text-xs focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all placeholder:text-stone-300"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1 font-sans">
                      <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                        WhatsApp Number <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={form.phone}
                        onChange={onFieldChange('phone')}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 text-stone-855 text-xs focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all placeholder:text-stone-300"
                        required
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1 font-sans">
                      <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                        Email Address <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. aditi@gmail.com"
                        value={form.email}
                        onChange={onFieldChange('email')}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 text-stone-855 text-xs focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all placeholder:text-stone-300"
                        required
                      />
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-1 font-sans">
                      <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                        Shipping Address <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Complete postal address for delivery..."
                        value={form.address}
                        onChange={onFieldChange('address')}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 text-stone-855 text-xs focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all placeholder:text-stone-300 resize-none"
                        required
                      />
                    </div>

                    {/* Dynamic selectors based on pricingType */}
                    {selectedProduct.pricingType === 'per-gram' && (
                      <div className="space-y-1 font-sans">
                        <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                          Select Specimen Weight <span className="text-rose-500 font-bold">*</span>
                        </label>
                        <select
                          value={form.weight}
                          onChange={onFieldChange('weight')}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 text-stone-855 text-xs focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                        >
                          {GRAM_OPTIONS.map(g => (
                            <option key={g.value} value={g.value}>
                              {g.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {selectedProduct.pricingType === 'size-based' && selectedProduct.sizes && (
                      <div className="space-y-1 font-sans">
                        <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                          Select Specimen Size/Type <span className="text-rose-500 font-bold">*</span>
                        </label>
                        <select
                          value={form.sizeIndex}
                          onChange={onFieldChange('sizeIndex')}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 text-stone-855 text-xs focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                        >
                          {selectedProduct.sizes.map((s, idx) => (
                            <option key={idx} value={idx.toString()}>
                              {s.label} — ₹{s.price.toLocaleString('en-IN')}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Quantity & Calculations */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="block text-[10px] text-stone-400 font-sans uppercase font-bold tracking-wide">Quantity</span>
                        <div className="flex items-center bg-stone-50 border border-stone-200/60 rounded-xl px-2.5 py-1 shrink-0 mt-1">
                          <button
                            type="button"
                            onClick={() => setDetailQty(Math.max(1, detailQty - 1))}
                            className="w-5 h-5 text-stone-500 hover:text-purple-700 font-bold text-sm flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-stone-800 font-mono">
                            {detailQty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setDetailQty(detailQty + 1)}
                            className="w-5 h-5 text-stone-500 hover:text-purple-700 font-bold text-sm flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 font-sans block uppercase font-bold tracking-wide">Total Price</span>
                        <span className="text-lg font-bold text-stone-900 font-mono block mt-1">
                          ₹{totalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5c] active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 uppercase tracking-wider"
                  >
                    <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Place Order via WhatsApp
                  </button>
                  <p className="text-center text-[10px] text-stone-400 font-light -mt-2">
                    Orders pre-filled and sent to our team registry. Tapping opens WhatsApp.
                  </p>
                </form>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
