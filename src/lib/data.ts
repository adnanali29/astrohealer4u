export interface ZodiacSign {
  name: string;
  date: string;
  element: string;
  rulingPlanet: string;
  symbol: string;
  description: string;
  color: string;
  text: string;
  love: string;
  aura: string;
  lucky: string;
  synergy: string;
}

export interface ConsultationService {
  id: string;
  name: string;
  image: string;
  title: string;
  desc: string;
  languages: string;
  experience: string;
  reviews: number;
  rating: number;
  chatPrice: number | null;
  chatDur: string | null;
  callPrice: number | null;
  callDur: string | null;
  videoPrice?: number | null;
  videoDur?: string | null;
  badge: string | null;
  icon: string;
  bg: string;
  isCombo?: boolean;
}

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  desc: string;
  label: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: 'Aries', date: 'Mar 21 - Apr 19', element: 'Fire', rulingPlanet: 'Mars', symbol: '♈', description: 'Courageous, passionate, and trail-blazing leader.', color: 'from-rose-100 to-amber-100', text: 'text-rose-800', love: '92%', aura: 'Amber Glow', lucky: '7, 14, 22', synergy: 'Leo & Libra' },
  { name: 'Taurus', date: 'Apr 20 - May 20', element: 'Earth', rulingPlanet: 'Venus', symbol: '♉', description: 'Reliable, patient, and lover of sensory pleasures.', color: 'from-emerald-100 to-teal-100', text: 'text-teal-800', love: '88%', aura: 'Emerald Mint', lucky: '5, 12, 18', synergy: 'Virgo & Pisces' },
  { name: 'Gemini', date: 'May 21 - Jun 20', element: 'Air', rulingPlanet: 'Mercury', symbol: '♊', description: 'Expressive, curious, and incredibly versatile.', color: 'from-sky-100 to-indigo-100', text: 'text-sky-800', love: '95%', aura: 'Celestial Sky', lucky: '3, 9, 21', synergy: 'Aquarius & Libra' },
  { name: 'Cancer', date: 'Jun 21 - Jul 22', element: 'Water', rulingPlanet: 'Moon', symbol: '♋', description: 'Intuitive, sentimental, and deeply protective of loved ones.', color: 'from-blue-100 to-indigo-100', text: 'text-indigo-800', love: '97%', aura: 'Iridescent Blue', lucky: '2, 7, 11', synergy: 'Pisces & Taurus' },
  { name: 'Leo', date: 'Jul 23 - Aug 22', element: 'Fire', rulingPlanet: 'Sun', symbol: '♌', description: 'Radiant, generous, and natural-born majestic leader.', color: 'from-amber-100 to-rose-100', text: 'text-amber-800', love: '90%', aura: 'Solar Flare Gold', lucky: '1, 5, 19', synergy: 'Aries & Sagittarius' },
  { name: 'Virgo', date: 'Aug 23 - Sep 22', element: 'Earth', rulingPlanet: 'Mercury', symbol: '♍', description: 'Analytical, helpful, and deeply connected to nature.', color: 'from-teal-100 to-amber-50', text: 'text-teal-800', love: '85%', aura: 'Sage Mint', lucky: '4, 8, 14', synergy: 'Taurus & Capricorn' },
  { name: 'Libra', date: 'Sep 23 - Oct 22', element: 'Air', rulingPlanet: 'Venus', symbol: '♎', description: 'Diplomatic, artistic, and always seeking cosmic balance.', color: 'from-pink-100 to-purple-100', text: 'text-pink-800', love: '94%', aura: 'Dusty Lilac', lucky: '6, 15, 24', synergy: 'Gemini & Aquarius' },
  { name: 'Scorpio', date: 'Oct 23 - Nov 21', element: 'Water', rulingPlanet: 'Pluto', symbol: '♏', description: 'Passionate, resourceful, and master of personal transformation.', color: 'from-purple-100 to-rose-100', text: 'text-purple-800', love: '91%', aura: 'Deep Orchid', lucky: '9, 18, 27', synergy: 'Cancer & Pisces' },
  { name: 'Sagittarius', date: 'Nov 22 - Dec 21', element: 'Fire', rulingPlanet: 'Jupiter', symbol: '♐', description: 'Optimistic, freedom-loving, and seeker of ultimate wisdom.', color: 'from-orange-100 to-amber-100', text: 'text-amber-900', love: '89%', aura: 'Apricot Radiance', lucky: '3, 12, 30', synergy: 'Leo & Aries' },
  { name: 'Capricorn', date: 'Dec 22 - Jan 19', element: 'Earth', rulingPlanet: 'Saturn', symbol: '♑', description: 'Disciplined, ambitious, and grounded anchor of the zodiac.', color: 'from-stone-200 to-emerald-100', text: 'text-stone-800', love: '86%', aura: 'Obsidian Sheen', lucky: '8, 10, 22', synergy: 'Virgo & Taurus' },
  { name: 'Aquarius', date: 'Jan 20 - Feb 18', element: 'Air', rulingPlanet: 'Uranus', symbol: '♒', description: 'Humanitarian, original, and visionary catalyst of change.', color: 'from-cyan-100 to-blue-100', text: 'text-cyan-800', love: '93%', aura: 'Aqua Quartz', lucky: '2, 11, 20', synergy: 'Libra & Gemini' },
  { name: 'Pisces', date: 'Feb 19 - Mar 20', element: 'Water', rulingPlanet: 'Neptune', symbol: '♓', description: 'Compassionate, artistic, and deeply intuitive dreamer.', color: 'from-fuchsia-100 to-violet-100', text: 'text-violet-800', love: '96%', aura: 'Lavender Opal', lucky: '7, 11, 21', synergy: 'Cancer & Scorpio' },
];

export const HOROSCOPES_TEXT_BANK: Record<string, string[]> = {
  Today: [
    "The solar transit highlights your primary desires. Today is magnificent for setting fresh parameters in relationships and acting upon immediate instincts. Avoid over-analyzing minor shifts in the wind.",
    "A gentle moon aspect invites absolute stillness. Quiet reflection will unlock creative visions that have been clouding your subconscious. Wear soft shades of your color today to optimize this flux.",
    "Your governing rulers suggest a sudden burst of communication. An unexpected email, card, or cosmic message may disrupt your quiet afternoon. Greet it with open arms and soft intentions.",
  ],
  Weekly: [
    "As the celestial tides adjust, you will find clarity in physical environments. Tackle organizational changes in your home/office to reset sluggish pathways. Trust that the universe supports this layout transformation.",
    "The planetary alignments favor relationship calibration this week. A heart-to-heart conversation with an old acquaintance or a current partner will heal a lingering cycle. Prepare to speak with deep authenticity.",
    "Your planetary aspect invites you to treat yourself. Indulge in warm sensory healing—essential oils, salt baths, or beautiful gem-faceting. True wellness starts with deliberate physical grounding.",
  ],
  Yearly: [
    "2026 demands complete alignment of your life mission and external actions. It is the perfect year for career transits or initiating long-term spiritual masterclasses. Your luck doubles during your native season.",
    "You are breaking free from ancestral karmic patterns that have previously stalled your personal path. Cultivate patience, study ancestral elements, and trust that the stars have aligned your path beautifully.",
    "A major shift in Jupiter invites incredible creative and financial manifestation over the coming seasons. Establish strong foundations now so that this bounty is preserved and multiplied.",
  ],
};

export const SERVICES: ConsultationService[] = [
  {
    id: 's1',
    name: 'SachinR',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    title: 'COMPLETE ANALYSIS OF CHART',
    desc: 'In-depth study of your Kundli including planets, houses, yogas, dasha & life predictions.',
    languages: 'English, Hindi',
    experience: '3+ Years',
    reviews: 5180,
    rating: 5,
    chatPrice: 3100, chatDur: '30 min',
    callPrice: 5100, callDur: '45 min',
    videoPrice: 7100, videoDur: '45 min',
    badge: 'Offer',
    icon: '🔭',
    bg: 'from-violet-100 to-purple-100',
  },
  {
    id: 's2',
    name: 'Amit Verma',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    title: 'CAREER CONSULTATION',
    desc: 'Career guidance, job change, business, foreign opportunities.',
    languages: 'English, Hindi',
    experience: '4 Years',
    reviews: 3210,
    rating: 5,
    chatPrice: 1500, chatDur: '30 min',
    callPrice: 3000, callDur: '45 min',
    badge: null,
    icon: '💼',
    bg: 'from-amber-100 to-yellow-100',
  },
  {
    id: 's3',
    name: 'Sunita Devi',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    title: 'MARRIAGE CONSULTATION',
    desc: 'Find the right match, check compatibility, timing & remedies.',
    languages: 'English, Hindi',
    experience: '3.5 Years',
    reviews: 4120,
    rating: 5,
    chatPrice: 1500, chatDur: '30 min',
    callPrice: 3000, callDur: '45 min',
    badge: 'Popular',
    icon: '💍',
    bg: 'from-rose-100 to-pink-100',
  },
  {
    id: 's4',
    name: 'Vikram Malhotra',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
    title: 'FINANCIAL CONSULTATION',
    desc: 'Wealth, savings, investment, financial growth & stability analysis.',
    languages: 'English, Hindi',
    experience: '2.5 Years',
    reviews: 2790,
    rating: 5,
    chatPrice: 1500, chatDur: '30 min',
    callPrice: 3000, callDur: '45 min',
    badge: null,
    icon: '💰',
    bg: 'from-green-100 to-emerald-100',
  },
  {
    id: 's5',
    name: 'Priya Sen',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256',
    title: 'RELATIONSHIP CONSULTATION',
    desc: 'Resolve conflicts, improve relationships & emotional healing.',
    languages: 'English, Hindi',
    experience: '3 Years',
    reviews: 2140,
    rating: 5,
    chatPrice: 1500, chatDur: '30 min',
    callPrice: 3000, callDur: '45 min',
    badge: null,
    icon: '💖',
    bg: 'from-red-100 to-rose-100',
  },
  {
    id: 's6',
    name: 'Dr. N.K. Roy',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256',
    title: 'CHILD FUTURE ANALYSIS',
    desc: "Study of child's future, personality, education & career.",
    languages: 'English, Hindi',
    experience: '4 Years',
    reviews: 1860,
    rating: 5,
    chatPrice: 1500, chatDur: '30 min',
    callPrice: 3000, callDur: '45 min',
    badge: null,
    icon: '🧸',
    bg: 'from-sky-100 to-blue-100',
  },
  {
    id: 's7',
    name: 'Rajan Mehta',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256',
    title: 'FOREIGN TRAVEL & SETTLEMENT',
    desc: 'Visa, migration, settlement yog, travel timing & success chances.',
    languages: 'English, Hindi',
    experience: '3.5 Years',
    reviews: 1540,
    rating: 5,
    chatPrice: 1500, chatDur: '30 min',
    callPrice: 3000, callDur: '45 min',
    badge: null,
    icon: '✈️',
    bg: 'from-indigo-100 to-blue-100',
  },
  {
    id: 's8',
    name: 'Devendra Lal',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    title: 'GEMSTONE RECOMMENDATION',
    desc: 'Personalized gemstone suggestions for health, wealth & success.',
    languages: 'English, Hindi',
    experience: '2 Years',
    reviews: 2310,
    rating: 5,
    chatPrice: 1500, chatDur: '30 min',
    callPrice: 3000, callDur: '45 min',
    badge: null,
    icon: '💎',
    bg: 'from-teal-100 to-cyan-100',
  },
  {
    id: 's9',
    name: 'Sanjay B. Kkumaar',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256',
    title: 'NUMEROLOGY & NAME ANALYSIS',
    desc: 'Know your numbers, destiny, lucky number, name correction & future insights.',
    languages: 'English, Hindi',
    experience: '3 Years',
    reviews: 1420,
    rating: 5,
    chatPrice: 1500, chatDur: '30 min',
    callPrice: 3000, callDur: '45 min',
    badge: null,
    icon: '🔢',
    bg: 'from-orange-100 to-amber-100',
  },
  {
    id: 's10',
    name: 'Aether & Sol Team',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    title: 'COMBO OFFER',
    desc: 'Book 2 Services Together & Get 10% OFF',
    languages: 'English, Hindi',
    experience: '3+ Years Avg',
    reviews: 3900,
    rating: 5,
    chatPrice: null, chatDur: null,
    callPrice: null, callDur: null,
    badge: '10% Off',
    isCombo: true,
    icon: '🎁',
    bg: 'from-purple-100 via-rose-100 to-amber-100',
  },
];

export const SHOP_PRODUCTS_DATA: ShopProduct[] = [
  { id: 'p1', name: 'Amethyst Awakening Cluster', price: 42.00, category: 'Crystals', image: '💜', desc: 'Sourced from Uruguay. Promotes deep spiritual insight, dream lucidity, and physical relaxation.', label: 'Best Seller' },
  { id: 'p2', name: 'Ritual Soy Candle: Lunar Eclipse', price: 26.00, category: 'Rituals', image: '🕯️', desc: 'Hand-poured with lavender, frankincense, and obsidian chips. Designed for shadow-work.', label: 'Limited Run' },
  { id: 'p3', name: 'Ethereal Star Tarot Deck & Guidebook', price: 38.00, category: 'Tarot', image: '🃏', desc: '78 hand-gilded cards displaying pastel watercolor cosmic themes. Ideal for both beginners and scholars.', label: 'Artisan' },
  { id: 'p4', name: 'Luminous Sun & Moon Pendant', price: 64.00, category: 'Jewelry', image: '🌙', desc: '14k gold-filled double talisman. Symbolizes the divine marriage of conscious and unconscious mind.', label: 'Premium' },
  { id: 'p5', name: 'Celestial Aura Cleansing Spray', price: 18.00, category: 'Rituals', image: '✨', desc: 'Infused with moon water, white sage, and neroli essential oils. Refreshes negative energies.', label: 'Eco-Friendly' },
  { id: 'p6', name: 'Rose Quartz Eternal Harmony Sphere', price: 34.00, category: 'Crystals', image: '🌸', desc: 'Spherical rose quartz representing unconditional love and emotional healing.', label: 'New Arrival' },
];

export interface ShopCategory {
  id: string;
  name: string;
  image: string;
  tagline: string;
  desc: string;
  isSingleProduct?: boolean;
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  { id: 'pyrite', name: 'Pyrite Collection', image: 'https://i.ibb.co/Xk39jK7d/raw-pyrite.webp', tagline: 'Stone of Wealth', desc: 'Attracts financial growth, blocks negative energies, and stimulates self-motivation.' },
  { id: 'clear-quartz', name: 'Clear Quartz Collection', image: 'https://i.ibb.co/j9J2r5MJ/Clear-Quartz-Collection-raw-crystal.webp', tagline: 'Master Healer', desc: 'Amplifies energy, thoughts, intentions, and balances all auric blueprint levels.' },
  { id: 'green-aventurine', name: 'Green Aventurine Collection', image: 'https://i.ibb.co/VYMjXwWt/Green-Aventurine-Collection-Raw.webp', tagline: 'Stone of Opportunity', desc: 'Attracts professional luck, wealth, prosperity, and balances heart energies.' },
  { id: 'tiger-eye', name: 'Tiger Eye Collection', image: 'https://i.ibb.co/Xfm7xzWz/Tiger-Eye-Raw.webp', tagline: 'Stone of Courage', desc: 'Fosters physical courage, grounding, mental clarity, and protective shields.' },
  { id: 'amethyst', name: 'Amethyst Collection', image: 'https://i.ibb.co/V8NvGq5/Amethyst-Collection-Raw.webp', tagline: 'Spiritual Shield', desc: 'Brings calming vibrations, emotional balance, stress relief, and deep sleep.' },
  { id: 'selenite', name: 'Selenite Collection', image: 'https://i.ibb.co/nVt8g4P/Selenite-Collection-Raw.webp', tagline: 'Auric Cleanser', desc: 'Possesses high-vibration pure energy used to cleanse and charge other crystals.' },
  { id: 'citrine', name: 'Citrine Collection', image: 'https://i.ibb.co/2YL8R6pb/Citrine-Collection-raw-crystal.webp', tagline: 'Merchant’s Stone', desc: 'Attracts financial abundance, success, positive energy, and joyful creation.' },
  { id: 'howlite', name: 'Howlite Collection', image: 'https://i.ibb.co/nMyYGGMD/Howlite-Raw.webp', tagline: 'Stone of Calming', desc: 'Reduces overthinking, stress, anger, and supports quiet meditation.' },
  { id: 'black-obsidian', name: 'Black Obsidian Collection', image: 'https://i.ibb.co/ZpvRfpGz/Black-Obsidian-raw.webp', tagline: 'Ultimate Shield', desc: 'Absorbs environmental negativity, blocks psychic drain, and grounds the self.' },
  { id: 'smoky-quartz', name: 'Smoky Quartz Collection', image: 'https://i.ibb.co/Ld7rb5cd/Smoky-Quartz-raw.webp', tagline: 'Stress Disperser', desc: 'Releases stress, heavy emotional blockages, and toxic atmospheric charges.' },
  { id: 'lapis-lazuli', name: 'Lapis Lazuli Collection', image: 'https://i.ibb.co/Z6XFhCpk/Lapis-Lazuli-raw.webp', tagline: 'Stone of Wisdom', desc: 'Enhances communication, self-expression, intellect, and spiritual truth.' },
  { id: 'moonstone', name: 'Moonstone Collection', image: 'https://i.ibb.co/DHMWvVCy/Moonstone-raw.webp', tagline: 'Sacred Feminine', desc: 'Encourages inner growth, intuition, emotional healing, and new beginnings.' },
  { id: 'tourmaline', name: 'Tourmaline Collection', image: 'https://i.ibb.co/Y4yDnX0K/Tourmaline-raw.webp', tagline: 'Grounding Armor', desc: 'Repels negative energetic frequencies, shields cells, and anchors root node.' },
  { id: 'malachite', name: 'Malachite Collection', image: 'https://i.ibb.co/WW8GBVWR/Malachite-raw.webp', tagline: 'Stone of Transformation', desc: 'Supports rapid personal transformation, heart chakra release, and courage.' },
  { id: 'jade', name: 'Jade Collection', image: 'https://i.ibb.co/Lz5k02rR/Jade-Crystal.webp', tagline: 'Stone of Harmony', desc: 'Promotes abundance, balance, Vastu harmony, and physical well-being.' },
  { id: 'turquoise', name: 'Turquoise Collection', image: 'https://i.ibb.co/QvGw6nY8/Turquoise-raw.webp', tagline: 'Master Communicator', desc: 'Supports self-expression, emotional balance, and ancient protective shielding.' },
  { id: 'carnelian', name: 'Carnelian Collection', image: 'https://i.ibb.co/mMQ6M3X/Carnelian-raw.webp', tagline: 'Fire of Motivation', desc: 'Ignites creativity, personal power, motivation, action, and physical vitality.' },
  { id: 'hematite', name: 'Hematite Collection', image: 'https://i.ibb.co/m5mP7rtt/Hematite-Raw.webp', tagline: 'Grounding Anchor', desc: 'Grounds wandering thoughts, focuses logical mind, and stabilizes anxiety.' },
  { id: 'good-health-bracelet', name: 'Good Health Bracelet', image: 'https://i.ibb.co/qMrWJL9Z/good-health-main.webp', tagline: 'Holistic Vitality', desc: 'Promotes physical energy, immune support, and holistic health balance. Made with natural crystal beads.', isSingleProduct: true },
  { id: 'anxiety-bracelet', name: 'Anxiety Bracelet', image: 'https://i.ibb.co/PZvfBy0Y/anxitey-main.webp', tagline: 'Calm & Serene', desc: 'Infused with peaceful crystals to calm an overactive mind, ease stress, and ground emotions.', isSingleProduct: true },
  { id: 'desired-job-bracelet', name: 'Desired Job Bracelet', image: 'https://i.ibb.co/PvDrXZgd/Desired-job-main.webp', tagline: 'Career Manifestation', desc: 'Attracts professional opportunities, success, confidence, and clear career path alignment.', isSingleProduct: true },
  { id: 'dhan-yog-bracelet', name: 'Dhan Yog Bracelet', image: 'https://i.ibb.co/zTFrQrLn/dhan-yog-main.webp', tagline: 'Wealth Accumulation', desc: 'A powerful combination of crystals designed to attract financial abundance, prosperity, and wealth luck.', isSingleProduct: true },
  { id: 'self-confidence-bracelet', name: 'Self Confidence Bracelet', image: 'https://i.ibb.co/gFRQdvPD/self-cinfidence.png', tagline: 'Personal Empowerment', desc: 'Boosts self-esteem, inner strength, and courage to stand tall and speak your truth.', isSingleProduct: true },
  { id: 'meditation-bracelet', name: 'Meditation Bracelet', image: 'https://i.ibb.co/JjJzXMqq/meditation-main.webp', tagline: 'Deep Mindfulness', desc: 'Supports spiritual connection, quiet meditation, inner focus, and third eye awakening.', isSingleProduct: true },
  { id: 'buri-nazar-bracelet', name: 'Buri Nazar Bracelet', image: 'https://i.ibb.co/d4j1xrzF/buri-nazar-MAIN.webp', tagline: 'Evil Eye Protection', desc: 'Shields your aura from negative energy, jealousy, hexes, and the negative gaze of others.', isSingleProduct: true },
  { id: 'inner-peace-bracelet', name: 'Inner Peace Bracelet', image: 'https://i.ibb.co/BKzW7zJS/Inner-Peace-main.webp', tagline: 'Somatic Tranquility', desc: 'Gently balances heart and mind to invite emotional healing, deep peace, and relief from daily friction.', isSingleProduct: true },
  { id: 'seven-chakra-crystal', name: '7 Chakra Crystal Collection', image: 'https://i.ibb.co/4wDdQK64/7-crystal-main.webp', tagline: 'Universal Balance', desc: 'Bring balance, positivity, and harmony into your space and body with natural seven chakra crystals.' },
  { id: 'rakhis', name: 'Rakhis', image: 'https://i.ibb.co/whxBdsRS/7-chakra-chip-rakhi-main.webp', tagline: 'Sacred Protection Threads', desc: 'Beautifully handcrafted crystal Rakhis infused with sacred energies to protect, balance, and bless your siblings.' }
];

export interface SubCrystalProduct {
  id: string;
  categoryId: string;
  name: string;
  basePrice: number;
  pricingType: 'per-gram' | 'size-based' | 'fixed' | 'per-kg';
  sizes?: { label: string; price: number }[];
  image: string;
  desc: string;
  label: string;
  benefits: string[];
  resonance: string;
  node: string;
  detailImage?: string;
  solarPeakCleansed?: string;
  apothecaryPlacement?: string;
}

export const CRYSTAL_SUB_PRODUCTS: SubCrystalProduct[] = [
  // ─── PYRITE (c1-c6) ────────────────────────────────────────────────────────
  {
    id: 'py-1',
    categoryId: 'pyrite',
    name: 'Raw Pyrite',
    basePrice: 5,
    pricingType: 'per-gram',
    image: 'https://i.ibb.co/Xk39jK7d/raw-pyrite.webp',
    desc: 'Known as the Stone of Wealth, Pyrite is believed to attract abundance, confidence, protection, and success while enhancing motivation and decision-making.',
    label: 'Best Seller',
    benefits: [
      'Attracts abundance, financial luck, and material prosperity',
      'Protects from negative energy and emotional pollution',
      'Enhances focus, logic, memory, and executive action',
      'Boosts motivation, confidence, and solar plexus chakra strength'
    ],
    resonance: '188Hz Pyrite Solar Meridian Alignment',
    node: 'Solar Plexus & Root Chakra'
  },
  {
    id: 'py-2',
    categoryId: 'pyrite',
    name: 'Pyrite Tree',
    basePrice: 399,
    pricingType: 'size-based',
    sizes: [
      { label: 'Small Prosperity Tree (50 Beads)', price: 399 },
      { label: 'Medium Wealth Tree (150 Beads)', price: 999 },
      { label: 'Large Abundance Tree (300 Beads)', price: 2000 }
    ],
    image: 'https://i.ibb.co/0pnj8Gm3/pyrite-tree.webp',
    desc: 'A beautiful prosperity crystal tree believed to attract wealth, growth, business opportunities, and positive energy into your home or workplace.',
    label: 'Highly Requested',
    benefits: [
      'Fosters growth, new ventures, and professional opportunities',
      'Clears static energy fields in homes and work offices',
      'Brings stability and harmony to familial finances',
      'Acts as a daily visual focus for prosperity manifestation'
    ],
    resonance: '528Hz Solfeggio Prosperity Resonance',
    node: 'Heart & Solar Plexus Gateway'
  },
  {
    id: 'py-3',
    categoryId: 'pyrite',
    name: 'Pyrite Tortoise',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/nqmXdbMV/pyrite-turtoise.webp',
    desc: 'Combines the prosperity energy of Pyrite with the stability and longevity symbolism of the tortoise, making it ideal for financial growth and protection.',
    label: 'Feng Shui Specimen',
    benefits: [
      'Promotes career longevity, job stability, and promotion opportunities',
      'Creates a grounding energetic shield for family heads',
      'Attracts luck and shields from bad vastu placements',
      'Harmonizes flow of ancestral wealth lines'
    ],
    resonance: '396Hz Stability Frequency Calibration',
    node: 'Root Chakra & Vastu Balance'
  },
  {
    id: 'py-4',
    categoryId: 'pyrite',
    name: 'Pyrite Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/SDqVsxgP/pryite-bracelet.webp',
    desc: 'Worn to boost confidence, attract abundance, increase willpower, and protect against negative energies.',
    label: 'Daily Talisman',
    benefits: [
      'Acts as an active shield against psychic attacks and toxic peers',
      'Boosts personal charm, determination, and willpower',
      'Fosters immediate focus and eliminates mental lethargy',
      'Balances male-female energetic channels in the body'
    ],
    resonance: '639Hz Aura Shield Frequency',
    node: 'Solar Plexus Activation'
  },
  {
    id: 'py-5',
    categoryId: 'pyrite',
    name: 'Pyrite Ganesh',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/d433fb60/pyrite-ganesh.webp',
    desc: 'Lord Ganesha symbolizes wisdom and obstacle removal, while Pyrite enhances prosperity and success.',
    label: 'Vedic Protection',
    benefits: [
      'Removes cosmic blocks, delay cycles, and business hurdles',
      'Infuses spaces with deep wisdom, intellect, and memory power',
      'Attracts high-vibe beginnings to new projects or businesses',
      'Establishes deep spiritual protection at main entry points'
    ],
    resonance: '108Hz Vedic Obstacle Cleansing Sound',
    node: 'Crown & Root Chakra Realignment'
  },
  {
    id: 'py-6',
    categoryId: 'pyrite',
    name: 'Pyrite Anklet',
    basePrice: 799,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/C5FxmNsC/pyrite-anket.webp',
    desc: 'Designed to keep you grounded, confident, and connected to abundance throughout the day.',
    label: 'Grounding Talisman',
    benefits: [
      'Grounds overactive thoughts and physical anxiety immediately',
      'Maintains connection to Earth element abundance grids',
      'Shields lower extremities from energetic drains and exhaustion',
      'Stimulates dynamic foot chakra flow and path alignment'
    ],
    resonance: '228Hz Earth Node Synchronization',
    node: 'Foot Chakra & Root Grounding'
  },

  // ─── CLEAR QUARTZ (cq-1 to cq-3) ───────────────────────────────────────────
  {
    id: 'cq-1',
    categoryId: 'clear-quartz',
    name: 'Clear Quartz Crystal',
    basePrice: 499,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/j9J2r5MJ/Clear-Quartz-Collection-raw-crystal.webp',
    desc: 'Known as the Master Healer, Clear Quartz amplifies energy, intentions, focus, and spiritual growth. Used for energy cleansing and amplifying positive vibrations.',
    label: 'Essential',
    benefits: [
      'Amplifies the energies of other companion crystals',
      'Brings absolute mental clarity, focus, and concentration',
      'Cleanses and balances all bodily chakras',
      'Filters out psychic smog and environmental distractions'
    ],
    resonance: '741Hz Clear Mind Resonance',
    node: 'All Chakra Blueprint Harmony'
  },
  {
    id: 'cq-2',
    categoryId: 'clear-quartz',
    name: 'Clear Quartz Tower',
    basePrice: 499,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/YzHWw3W/Clear-Quartz-Collection-tower.webp',
    desc: 'A gorgeous focused tower carving. Focuses energy upward to cleanse spatial grids and establish solid meditation frequencies.',
    label: 'Highly Sacred',
    benefits: [
      'Focuses energy upwards into the room space',
      'Ideal anchor for meditation tables or study desks',
      'Clears mental blocks and negative thought patterns',
      'Channels higher celestial wisdom down into the space'
    ],
    resonance: '852Hz Crown Solfeggio Activation',
    node: 'Crown & Soul Star Gateway'
  },
  {
    id: 'cq-3',
    categoryId: 'clear-quartz',
    name: 'Clear Quartz Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/b5dBtWqm/Clear-Quartz-Collection-barcelet.webp',
    desc: 'Worn daily to improve clarity, concentration, balance, and energy amplification in your physical field.',
    label: 'Aura Balancer',
    benefits: [
      'Helps maintain steady focus and high energy levels during work',
      'Protects from absorbing emotional projections from colleagues',
      'Maintains clean spiritual boundaries throughout the day',
      'Stabilizes overactive emotions and keeps you centered'
    ],
    resonance: '639Hz Aura Harmony Node',
    node: 'Third Eye & Crown Alignment'
  },

  // ─── GREEN AVENTURINE (ga-1 to ga-5) ────────────────────────────────────────
  {
    id: 'ga-1',
    categoryId: 'green-aventurine',
    name: 'Green Aventurine Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/4gfpg5tf/Green-Aventurine-Collection-bracelet.webp',
    desc: 'Known as the Stone of Opportunity, believed to attract luck, prosperity, and emotional healing. Programmed for career growth.',
    label: 'Lucky Charm',
    benefits: [
      'Manifests lucky breaks, windfalls, and career opportunities',
      'Soothes emotional pain and opens the heart to new bonds',
      'Increases confidence in social and interview scenarios',
      'Protects against negative thoughts and anxious doubts'
    ],
    resonance: '528Hz Growth & Transformation',
    node: 'Heart Chakra Gateway'
  },
  {
    id: 'ga-2',
    categoryId: 'green-aventurine',
    name: 'Green Aventurine Ganesh',
    basePrice: 1299,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/hx2qgGsQ/Green-Aventurine-Collection-ganesh.webp',
    desc: 'An auspicious Ganesha carving in Green Aventurine. Brings blessings, abundance, positivity, and removes professional blocks.',
    label: 'Sacred Carving',
    benefits: [
      'Cleanses office workspaces of sluggish business cycles',
      'Supports academic success and focus for children',
      'Attracts wealth and smooth workflow to new startup projects',
      'Balances family harmony when placed in shared living areas'
    ],
    resonance: '108Hz Ganesha Obstacle Cleansing',
    node: 'Heart & Root Chakra Integration'
  },
  {
    id: 'ga-3',
    categoryId: 'green-aventurine',
    name: 'Green Aventurine Tree',
    basePrice: 999,
    pricingType: 'size-based',
    sizes: [
      { label: 'Small Prosperity Tree', price: 999 },
      { label: 'Large Abundance Tree', price: 1699 }
    ],
    image: 'https://i.ibb.co/MkN66JCz/Green-Aventurine-Collection-tree.webp',
    desc: 'Placed in rooms to attract prosperity, harmony, Vastu balance, and positive growth in personal and professional lives.',
    label: 'Home Harmonizer',
    benefits: [
      'Draws in wealth and creates a positive energetic atmosphere',
      'Ideal for home entryways, study tables, or billing counters',
      'Releases emotional stress and arguments in the household',
      'Supports physical vitality and connection to nature'
    ],
    resonance: '432Hz Heart Resonance Freq',
    node: 'Heart Chakra & Vastu Harmony'
  },
  {
    id: 'ga-4',
    categoryId: 'green-aventurine',
    name: 'Green Aventurine Raw Stone',
    basePrice: 499,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/VYMjXwWt/Green-Aventurine-Collection-Raw.webp',
    desc: 'Rough ethically mined Aventurine specimen. Supports emotional healing, optimism, heart chakra balance, and ground connection.',
    label: 'Raw specimen',
    benefits: [
      'Connects you directly to grounding Earth elemental fields',
      'Aids in soothing anxiety, anger, and daily irritation',
      'Promotes creative inspiration and problem-solving focus',
      'Balances masculine and feminine energies in rooms'
    ],
    resonance: '528Hz Earth Node Calibration',
    node: 'Heart Chakra Anchor'
  },
  {
    id: 'ga-5',
    categoryId: 'green-aventurine',
    name: 'Green Aventurine Anklet',
    basePrice: 799,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/d0djQh12/Green-Aventurine-Collection-anklet.webp',
    desc: 'Worn on the ankle to keep you connected to positivity, luck, and emotional well-being throughout the day.',
    label: 'Path Finder',
    benefits: [
      'Stabilizes walking energy and clears physical exhaustion',
      'Maintains lucky opportunities flowing into daily travel routes',
      'Repels negative earth energies and environmental pollution',
      'Keeps you feeling light, cheerful, and positive'
    ],
    resonance: '228Hz Foot Chakra Synchronization',
    node: 'Foot Chakra & Root Grounding'
  },

  // ─── TIGER EYE (te-1 to te-3) ──────────────────────────────────────────────
  {
    id: 'te-1',
    categoryId: 'tiger-eye',
    name: 'Tiger Eye Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/66D2FpF/Tiger-Eye-bracelet.webp',
    desc: 'Enhances confidence, courage, focus, and decision-making abilities. A powerhouse for eliminating self-doubt.',
    label: 'Courage Talisman',
    benefits: [
      'Banishes self-doubt, low self-esteem, and imposter syndrome',
      'Sharpens focus for high-pressure career situations',
      'Aids in making clear, rational decisions under stress',
      'Repels dark intentions or negative gaze from competitors'
    ],
    resonance: '396Hz Confidence Solfeggio',
    node: 'Solar Plexus Activation'
  },
  {
    id: 'te-2',
    categoryId: 'tiger-eye',
    name: 'Tiger Eye Tree',
    basePrice: 699,
    pricingType: 'size-based',
    sizes: [
      { label: 'Small Courage Tree', price: 699 },
      { label: 'Large Abundance Tree', price: 1699 }
    ],
    image: 'https://i.ibb.co/YB8tLJys/Tiger-Eye-tree.webp',
    desc: 'Used to attract stability, protection, and success. Excellent for setting solid boundaries at work or home.',
    label: 'Workspace Shield',
    benefits: [
      'Acts as a defensive shield for office desks and counters',
      'Encourages practical growth and long-term financial stability',
      'Assists in focus and study discipline in teenage children',
      'Establishes grounded, logical vibes in shared spaces'
    ],
    resonance: '417Hz Grounding Calibration',
    node: 'Solar Plexus & Root Anchor'
  },
  {
    id: 'te-3',
    categoryId: 'tiger-eye',
    name: 'Tiger Eye Raw Stone',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/Xfm7xzWz/Tiger-Eye-Raw.webp',
    desc: 'Rough Tiger Eye chunk. Helps increase personal strength, motivation, and physical grounding energy.',
    label: 'Raw Power',
    benefits: [
      'Quickly restores physical vitality and mental stamina',
      'Aids in deep meditation, rooting the mind to the present',
      'Cleanses root nodes of heavy ancestral blocks or panic',
      'Promotes creative fire and athletic determination'
    ],
    resonance: '228Hz Pranic Stabilization',
    node: 'Root & Sacral Alignment'
  },

  // ─── AMETHYST (am-1 to am-4) ───────────────────────────────────────────────
  {
    id: 'am-1',
    categoryId: 'amethyst',
    name: 'Amethyst Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/XZYKLq5F/Amethyst-Collection-tree.webp',
    desc: 'Promotes calmness, intuition, stress relief, and spiritual growth. The absolute peace bracelet.',
    label: 'Peace Talisman',
    benefits: [
      'Cools down temper, panic attacks, and daily stress',
      'Enhances third eye opening and psychic sensitivity',
      'Helps break addictive patterns or negative dependencies',
      'Maintains deep emotional equilibrium under pressure'
    ],
    resonance: '528Hz Aura Cleansing Resonance',
    node: 'Third Eye Chakra Activation'
  },
  {
    id: 'am-2',
    categoryId: 'amethyst',
    name: 'Amethyst Tree',
    basePrice: 699,
    pricingType: 'size-based',
    sizes: [
      { label: 'Small Meditation Tree', price: 699 },
      { label: 'Large Zen Harmony Tree', price: 1699 }
    ],
    image: 'https://i.ibb.co/V8NvGq5/Amethyst-Collection-Raw.webp',
    desc: 'Creates a peaceful environment and supports meditation, stress relief, and emotional balance.',
    label: 'Zen Centerpiece',
    benefits: [
      'Transforms home energy into a peaceful, temple-like sanctuary',
      'Ideal next to beds, meditation mats, or yoga studios',
      'Dissipates household arguments and cleanses bad vastu',
      'Fosters spiritual focus and calms hyperactive children'
    ],
    resonance: '432Hz Somatic Peace Resonance',
    node: 'Crown & Third Eye Node'
  },
  {
    id: 'am-3',
    categoryId: 'amethyst',
    name: 'Amethyst Raw Stone',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/TqHp0Mqp/Amethyst-Collection-anklet.webp',
    desc: 'Rough Uruguayan Amethyst piece. Helps reduce stress, improve sleep quality, and strengthen intuition.',
    label: 'Stress Buster',
    benefits: [
      'Fights insomnia and promotes deep, vivid spiritual dreams',
      'Releases spatial mental tension and headaches immediately',
      'Acts as a beautiful energy anchor for bedroom nightstands',
      'Purifies toxic energies or hexes from your surroundings'
    ],
    resonance: '852Hz Solfeggio Awakening',
    node: 'Crown & Soul Star Link'
  },
  {
    id: 'am-4',
    categoryId: 'amethyst',
    name: 'Amethyst Anklet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/35nz9Z9R/Amethyst-Collection-braclet.webp',
    desc: 'Provides calming energy, emotional stability, and spiritual protection for daily movement.',
    label: 'Shielded Path',
    benefits: [
      'Maintains calm walking energy and grounds somatic panic',
      'Protects your path from lower astral fields or projections',
      'Repels negative earth energies and bad vastu vibrations',
      'Keeps you feeling serene, intuitive, and spiritually safe'
    ],
    resonance: '228Hz Earth Node Balance',
    node: 'Foot Chakra & Root Peace'
  },

  // ─── SELENITE (se-1 to se-3) ───────────────────────────────────────────────
  {
    id: 'se-1',
    categoryId: 'selenite',
    name: 'Selenite Charger',
    basePrice: 1199,
    pricingType: 'size-based',
    sizes: [
      { label: 'Small Charging Plate (8cm)', price: 1199 },
      { label: 'Large Charging Plate (15cm)', price: 1799 }
    ],
    image: 'https://i.ibb.co/tpdZp4Dx/Selenite-Collection-Charger.webp',
    desc: 'A plate carved of pure Selenite. Used to cleanse, purify, and recharge your other gemstone bracelets and tumbles.',
    label: 'Charging Plate',
    benefits: [
      'Cleanses other crystals of stale energy automatically',
      'Never needs cleansing itself—maintains constant high vibrations',
      'Ideal for nightstands to charge your daily-wear bracelets',
      'Infuses room air with peace, purity, and light'
    ],
    resonance: '963Hz Cosmic Solfeggio',
    node: 'Crown & Higher Gateways'
  },
  {
    id: 'se-2',
    categoryId: 'selenite',
    name: 'Selenite Raw Stone',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/nVt8g4P/Selenite-Collection-Raw.webp',
    desc: 'Known for its powerful cleansing and high-vibrational energy. Instantly shifts sluggish spatial energy.',
    label: 'Liquid Light',
    benefits: [
      'Cleanses personal aura blocks by sweeping it over the body',
      'Fosters deep mental clarity and dissolves confusion',
      'Purifies toxic spatial environments of arguments and stress',
      'Brings spiritual light and angelic energy connection'
    ],
    resonance: '741Hz Energy Purification',
    node: 'Third Eye & Crown Node'
  },
  {
    id: 'se-3',
    categoryId: 'selenite',
    name: 'Selenite Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/hJVMdYFx/Selenite-Collection-Bracelet.webp',
    desc: 'Supports mental clarity, calmness, and spiritual connection. A continuous auric light grid.',
    label: 'Aura Light Grid',
    benefits: [
      'Ensures your energetic field is clean of toxic attachments',
      'Calms chaotic thoughts and boosts concentration',
      'Encourages gentle communication and spiritual honesty',
      'Shields from absorbing projections of high-conflict people'
    ],
    resonance: '639Hz Harmonic Calibration',
    node: 'Crown & Third Eye Alignment'
  },

  // ─── CITRINE (ci-1 to ci-3) ────────────────────────────────────────────────
  {
    id: 'ci-1',
    categoryId: 'citrine',
    name: 'Citrine Tree',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/YF1myds1/Citrine-Collection-tree.webp',
    desc: 'Attracts abundance, positivity, success, and joyful energy. The ultimate home office merchant tree.',
    label: 'Wealth Magnet',
    benefits: [
      'Brings financial breakthroughs, wealth, and commercial success',
      'Perfect anchor for office entryways or billing drawers',
      'Replaces financial stress with optimism and determination',
      'Energizes the Vastu wealth sector (Southeast corner)'
    ],
    resonance: '528Hz Abundance Frequency',
    node: 'Solar Plexus & Sacral Vastu'
  },
  {
    id: 'ci-2',
    categoryId: 'citrine',
    name: 'Citrine Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/2YL8R6pb/Citrine-Collection-raw-crystal.webp',
    desc: 'Believed to boost confidence, creativity, and manifestation of wealth. Keeps you optimistic.',
    label: 'Manifestation Key',
    benefits: [
      'Ignites willpower and self-belief to lock down goals',
      'Attracts lucky financial deals and career breakthroughs',
      'Increases positive charisma and charm in meetings',
      'Helps manifest creative ideas into physical wealth'
    ],
    resonance: '396Hz Solfeggio Manifestation',
    node: 'Solar Plexus Activation'
  },
  {
    id: 'ci-3',
    categoryId: 'citrine',
    name: 'Citrine Raw Stone',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/JRbP5nVG/Citrine-Collection-bracelet.webp',
    desc: 'Rough Citrine piece. Encourages happiness, motivation, and constant financial prosperity.',
    label: 'Joy Specimen',
    benefits: [
      'Radiates joyful solar energy, warding off depression',
      'Boosts digestive energy and physical stamina',
      'Ideal for study tables to motivate active thinking',
      'Never holds negative energy—constant solar light flow'
    ],
    resonance: '188Hz Solar Meridian Activation',
    node: 'Solar Plexus Alignment'
  },

  // ─── HOWLITE (hw-1 to hw-2) ────────────────────────────────────────────────
  {
    id: 'hw-1',
    categoryId: 'howlite',
    name: 'Howlite Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/DJXHSgn/Bracelate.jpg',
    desc: 'Promotes patience, extreme calmness, and emotional balance. Perfect for type-A personalities.',
    label: 'Calming Anchor',
    benefits: [
      'Cools down explosive anger, rage, and impulsive cycles',
      'Supports high patience levels during high-stress conflicts',
      'Helps quiet an overactive mind for deep rest',
      'Encourages diplomatic and compassionate communication'
    ],
    resonance: '432Hz Somatic Calm Frequency',
    node: 'Third Eye & Crown Peace'
  },
  {
    id: 'hw-2',
    categoryId: 'howlite',
    name: 'Howlite Raw Stone',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/GQJvk7PG/Raw.jpg',
    desc: 'Raw Howlite chunk. Helps reduce stress, chronic anger, and overthinking.',
    label: 'Anti-Stress spec',
    benefits: [
      'Calms stressful or frantic bedroom vibes immediately',
      'Aids in quiet mindfulness and stress relief',
      'Absorbs mental chaotic energy from workspace grids',
      'Encourages logical, quiet problem solving'
    ],
    resonance: '741Hz Mind Clearing Resonance',
    node: 'Crown & Third Eye Alignment'
  },

  // ─── BLACK OBSIDIAN (bo-1 to bo-3) ─────────────────────────────────────────
  {
    id: 'bo-1',
    categoryId: 'black-obsidian',
    name: 'Black Obsidian Raw Stone',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/G4ZPMDzX/Black-Obsidian-bracelet.webp',
    desc: 'A powerful protection stone that absorbs environmental negativity and emotional blockages.',
    label: 'Aura Shield',
    benefits: [
      'Quickly absorbs negative thoughts and psychic attacks',
      'Clears dark shadows and emotional blocks in spaces',
      'Ideal grounding stone for highly sensitive people',
      'Stabilizes chaotic, emotional family scenarios'
    ],
    resonance: '417Hz Cleansing Resonance',
    node: 'Root Chakra Foundation'
  },
  {
    id: 'bo-2',
    categoryId: 'black-obsidian',
    name: 'Black Obsidian Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/ZpvRfpGz/Black-Obsidian-raw.webp',
    desc: 'Provides grounding, deep protection, and energetic shielding from toxic peers.',
    label: 'Shield Talisman',
    benefits: [
      'Repels negative projections from co-workers or enemies',
      'Grounds physical focus and keeps mind from drifting',
      'Encourages strength and courage during massive changes',
      'Cuts toxic energetic ties to past relationships'
    ],
    resonance: '396Hz Shielding Frequency',
    node: 'Root Chakra Anchor'
  },
  {
    id: 'bo-3',
    categoryId: 'black-obsidian',
    name: 'Black Obsidian Locket',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/MxYc0RNN/Black-Obsidian-locket.webp',
    desc: 'Keeps protective, grounding energy close to the heart chakra throughout the day.',
    label: 'Talisman Locket',
    benefits: [
      'Continuous heart-level protection from dark vibrations',
      'Repels psychic drain or jealousy in crowded spaces',
      'Anchors your sense of personal safety and security',
      'Supports digestion and releases somatic chest panic'
    ],
    resonance: '639Hz Aura Harmony Protection',
    node: 'Heart & Root Chakra Guard'
  },

  // ─── SMOKY QUARTZ (sq-1 to sq-2) ───────────────────────────────────────────
  {
    id: 'sq-1',
    categoryId: 'smoky-quartz',
    name: 'Smoky Quartz Raw Stone',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/35wXqmZD/Smoky-Quartz-bracelite.webp',
    desc: 'Helps release negativity, deep stress, unwanted energies, and anxiety. A cosmic detoxifier.',
    label: 'Energy Detox',
    benefits: [
      'Absorbs and neutralizes constant mental stress',
      'Clears electromagnetic pollution in home offices',
      'Assists in releasing past regrets or heavy thoughts',
      'Grounds spiritual work into everyday physical focus'
    ],
    resonance: '417Hz Cleansing Solfeggio',
    node: 'Root Chakra Realignment'
  },
  {
    id: 'sq-2',
    categoryId: 'smoky-quartz',
    name: 'Smoky Quartz Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/Ld7rb5cd/Smoky-Quartz-raw.webp',
    desc: 'Promotes grounding, emotional balance, and protection against constant mental fatigue.',
    label: 'Grounded Focus',
    benefits: [
      'Maintains clean energetic space during stressful calls',
      'Aids in centering your mind when feeling overwhelmed',
      'Improves practical execution and business logic',
      'Wards off negative projections from toxic peers'
    ],
    resonance: '396Hz Anxiety Release Frequency',
    node: 'Root Chakra Anchor'
  },

  // ─── LAPIS LAZULI (ll-1 to ll-3) ───────────────────────────────────────────
  {
    id: 'll-1',
    categoryId: 'lapis-lazuli',
    name: 'Lapis Lazuli Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/FkjkG9D9/Lapis-Lazuli-bracelet.webp',
    desc: 'Enhances wisdom, communication, confidence, and self-expression. The stone of truth.',
    label: 'Truth Talisman',
    benefits: [
      'Boosts speech clarity, confidence, and vocal power',
      'Fosters intellectual growth, memory, and study skills',
      'Protects from throat chakra blocks and vocal fatigue',
      'Brings deep self-knowledge and emotional honesty'
    ],
    resonance: '741Hz Throat Solfeggio',
    node: 'Throat Chakra Activation'
  },
  {
    id: 'll-2',
    categoryId: 'lapis-lazuli',
    name: 'Lapis Lazuli Tree',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/Z6XFhCpk/Lapis-Lazuli-raw.webp',
    desc: 'Supports intellectual growth, wisdom, and spiritual awareness in home spaces.',
    label: 'Intellect Anchor',
    benefits: [
      'Enriches home libraries, studies, or child study tables',
      'Encourages quiet, logical family discussions',
      'Supports spiritual growth and psychic awareness',
      'Cleanses space of lies or hidden communication blocks'
    ],
    resonance: '852Hz Solfeggio Wisdom Activation',
    node: 'Throat & Third Eye Node'
  },
  {
    id: 'll-3',
    categoryId: 'lapis-lazuli',
    name: 'Lapis Lazuli Raw Stone',
    basePrice: 699,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/B249zW4z/Lapis-Lazuli-tree.webp',
    desc: 'Associated with truth, deep intuition, mental clarity, and memory power.',
    label: 'Wisdom Specimen',
    benefits: [
      'Releases deep throat and thyroid energetic blocks',
      'Enhances dream lucidity and memory recall',
      'Supports artists, writers, and lawyers in clear expression',
      'Brings royal energy and positive charisma to rooms'
    ],
    resonance: '741Hz Clear Communication Node',
    node: 'Throat & Third Eye Alignment'
  },

  // ─── MOONSTONE (ms-1 to ms-3) ─────────────────────────────────────────────
  {
    id: 'ms-1',
    categoryId: 'moonstone',
    name: 'Moonstone Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/XffJw2JY/bracelet.jpg',
    desc: 'Supports emotional balance, intuition, and divine feminine energy. Attunes with moon cycles.',
    label: 'Lunar Talisman',
    benefits: [
      'Balances erratic emotions and cools down hot tempers',
      'Soothes female health cycles and hormonal balance',
      'Enhances natural intuition, gut feelings, and empathy',
      'Fosters gentle vulnerability and romantic harmony'
    ],
    resonance: '639Hz Emotional Harmony',
    node: 'Sacral & Crown Alignment'
  },
  {
    id: 'ms-2',
    categoryId: 'moonstone',
    name: 'Moonstone Tree',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/SXbQMhCL/tree.jpg',
    desc: 'Promotes harmony, absolute peace, and emotional healing inside household spaces.',
    label: 'Home Harmony',
    benefits: [
      'Establishes soft, serene, and calm home environments',
      'Perfect next to baby cribs or in shared bedrooms',
      'Releases long-held family stress or silent tension',
      'Brings lunar blessing and peace to Vastu systems'
    ],
    resonance: '432Hz Somatic Harmony Node',
    node: 'Heart & Sacral Chakra Vastu'
  },
  {
    id: 'ms-3',
    categoryId: 'moonstone',
    name: 'Moonstone Raw Stone',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/1JrH9hrW/raw.jpg',
    desc: 'Encourages inner growth, intuition, and positive energy for new beginnings.',
    label: 'Lunar Chunk',
    benefits: [
      'Ideal for cleansing during New and Full Moon cycles',
      'Restores fluid sleep cycles and fights nightmares',
      'Encourages hope, adaptation, and smooth life transitions',
      'Connects mind to divine cosmic guidance systems'
    ],
    resonance: '852Hz Celestial Intuition Solfeggio',
    node: 'Crown & Third Eye Alignment'
  },

  // ─── TOURMALINE (tm-1 to tm-3) ─────────────────────────────────────────────
  {
    id: 'tm-1',
    categoryId: 'tourmaline',
    name: 'Tourmaline Tree',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/rGCfZL9Z/tree.jpg',
    desc: 'Provides protection and helps create a positive environment. An energetic shield tree.',
    label: 'Shield Tree',
    benefits: [
      'Repels negative energies, hexes, and bad vastu grids',
      'Cleanses heavy room atmospheres of constant tension',
      'Protects from electromagnetic fields (EMF) in rooms',
      'Brings deep security and peace to the household'
    ],
    resonance: '417Hz Clearing & Protection Resonance',
    node: 'Root Chakra Vastu Alignment'
  },
  {
    id: 'tm-2',
    categoryId: 'tourmaline',
    name: 'Tourmaline Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/DPqpjWvB/bracelat.jpg',
    desc: 'Known for shielding against negative energies and promoting deep physical grounding.',
    label: 'Armor Bracelet',
    benefits: [
      'Cuts negative ties and repels psychic drain from toxic peers',
      'Grounds physical focus and keeps you present during stress',
      'Cleanses personal aura layers of negative energy',
      'Protects from electromagnetic field (EMF) emissions'
    ],
    resonance: '396Hz Grounding & Protection Solfeggio',
    node: 'Root Chakra Activation'
  },
  {
    id: 'tm-3',
    categoryId: 'tourmaline',
    name: 'Tourmaline Raw Stone',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/FbJ0yTVk/raw.jpg',
    desc: 'Supports energetic protection, Vastu shielding, and emotional stability.',
    label: 'Root Guard',
    benefits: [
      'Repels negative vibrations at home entry thresholds',
      'Quickly grounds flighty, anxious, or panic energies',
      'Shields workspace from technological energy smog',
      'Balances the base chakra and locks down security'
    ],
    resonance: '228Hz Base Stabilization',
    node: 'Root Chakra Anchor'
  },

  // ─── MALACHITE (ma-1 to ma-3) ─────────────────────────────────────────────
  {
    id: 'ma-1',
    categoryId: 'malachite',
    name: 'Malachite Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/60CgfFjw/Malachite-tree.webp',
    desc: 'Encourages transformation, confidence, and emotional healing. The stone of growth.',
    label: 'Growth Talisman',
    benefits: [
      'Drives rapid personal transformation and emotional growth',
      'Clears negative patterns, old habits, and past heartbreaks',
      'Boosts willpower, self-expression, and leadership drive',
      'Protects the heart chakra from emotional drains'
    ],
    resonance: '528Hz Solfeggio Transformation',
    node: 'Heart Chakra Gateway'
  },
  {
    id: 'ma-2',
    categoryId: 'malachite',
    name: 'Malachite Raw Stone',
    basePrice: 699,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/WW8GBVWR/Malachite-raw.webp',
    desc: 'Known as a stone of growth, change, and protection. Striated green beauty.',
    label: 'Raw specimen',
    benefits: [
      'Absorbs environmental toxins and pollutants quickly',
      'Forces emotional blockages to the surface to heal',
      'Ideal for study tables to drive focus and progress',
      'Attracts abundance and positive opportunities'
    ],
    resonance: '639Hz Heart Freq Activation',
    node: 'Heart Chakra Alignment'
  },
  {
    id: 'ma-3',
    categoryId: 'malachite',
    name: 'Malachite Tree',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/Q3pMrS8G/b-Malachite-Bracelet.webp',
    desc: 'Brings transformation, abundance, and positive change. A gorgeous green balancing tree.',
    label: 'Prosperity Tree',
    benefits: [
      'Supports positive professional transformation and new opportunities',
      'Balances household heart energy grids and cuts negativity',
      'Clears technology static and workspace auric blocks',
      'Energizes core desires and willpower in space'
    ],
    resonance: '528Hz Solfeggio Transformation Resonance',
    node: 'Heart & Solar Plexus Vastu'
  },

  // ─── JADE (ja-1 to ja-2) ───────────────────────────────────────────────────
  {
    id: 'ja-1',
    categoryId: 'jade',
    name: 'Jade Tree',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/XrmxF4P6/jade-bracelet.webp',
    desc: 'Symbolizes prosperity, harmony, Vastu balance, and good fortune inside home spaces.',
    label: 'Good Fortune',
    benefits: [
      'Attracts financial growth and smooth career transits',
      'Fosters peaceful family relations and decreases arguments',
      'Cleanses share spaces of toxic static energy fields',
      'Balances Southeast wealth nodes in home structures'
    ],
    resonance: '528Hz Prosperity Calibration',
    node: 'Heart & Solar Plexus Vastu'
  },
  {
    id: 'ja-2',
    categoryId: 'jade',
    name: 'Jade Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/PGgyxKcv/Jade-tree.webp',
    desc: 'Promotes abundance, balance, and emotional well-being. A constant fortune talisman.',
    label: 'Fortune Bracelet',
    benefits: [
      'Attracts professional success and business opportunities',
      'Helps maintain steady, positive energy levels',
      'Encourages self-love, peace, and emotional release',
      'Protects from absorbing bad vibrations from rivals'
    ],
    resonance: '639Hz Heart Solfeggio Calibration',
    node: 'Heart Chakra Alignment'
  },

  // ─── TURQUOISE (tq-1 to tq-3) ─────────────────────────────────────────────
  {
    id: 'tq-1',
    categoryId: 'turquoise',
    name: 'Turquoise Tree',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/1f0qpxvY/tree.jpg',
    desc: 'Brings protection, healing, and positive communication. A beautiful blue balance anchor.',
    label: 'Healing Tree',
    benefits: [
      'Brings deep physical healing and immune field balance',
      'Supports calm communication in living areas',
      'Protects spaces from Vastu imbalances and bad vibes',
      'Attracts deep cosmic truth and harmony'
    ],
    resonance: '741Hz Throat Solfeggio Resonance',
    node: 'Throat & Heart Node'
  },
  {
    id: 'tq-2',
    categoryId: 'turquoise',
    name: 'Turquoise Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/Y4pH2jhk/bracelet.jpg',
    desc: 'Supports confidence, self-expression, and emotional balance during daily wear.',
    label: 'Path Protector',
    benefits: [
      'Boosts speech power, vocal charm, and confidence',
      'Clears throat chakra blocks and releases vocal fatigue',
      'Balances mood swings and stabilizes nervous energy',
      'Protects against negative thoughts and bad gaze'
    ],
    resonance: '639Hz Aura Guard Frequency',
    node: 'Throat Chakra Activation'
  },
  {
    id: 'tq-3',
    categoryId: 'turquoise',
    name: 'Turquoise Raw Stone',
    basePrice: 699,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/RTXWGSLc/raw.jpg',
    desc: 'Known for its calming, healing, and ancient protective properties.',
    label: 'Calm Specimen',
    benefits: [
      'Brings immediate relief from chronic throat fatigue',
      'Ideal for creative writers, speakers, and vocalists',
      'Dissolves ancient emotional blocks and regrets',
      'Attracts spiritual luck and wards off dark gaze'
    ],
    resonance: '741Hz Clear Expression Node',
    node: 'Throat Chakra Alignment'
  },

  // ─── CARNELIAN (cn-1 to cn-3) ─────────────────────────────────────────────
  {
    id: 'cn-1',
    categoryId: 'carnelian',
    name: 'Carnelian Tree',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/WvchjrR1/Carnelian-tree.webp',
    desc: 'Represents motivation, courage, creativity, and success. A fiery tree of action.',
    label: 'Action Tree',
    benefits: [
      'Ignites motivation, creativity, and career drive in spaces',
      'Perfect for home offices, creative studios, or libraries',
      'Banishes apathy, procrastination, and physical fatigue',
      'Supports reproductive vitality and solar plexus health'
    ],
    resonance: '528Hz Solfeggio Motivation Freq',
    node: 'Sacral & Solar Plexus Node'
  },
  {
    id: 'cn-2',
    categoryId: 'carnelian',
    name: 'Carnelian Raw Stone',
    basePrice: 699,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/mMQ6M3X/Carnelian-raw.webp',
    desc: 'Rough Carnelian block. Boosts confidence, vitality, and personal manifestation power.',
    label: 'Vital Specimen',
    benefits: [
      'Increases physical stamina, strength, and sex drive',
      'Aids in grounding overactive thoughts into creative projects',
      'Dissolves creative blocks and fear of speaking out',
      'Energizes the solar plexus node for dynamic action'
    ],
    resonance: '396Hz Confidence Calibration',
    node: 'Sacral Chakra Alignment'
  },
  {
    id: 'cn-3',
    categoryId: 'carnelian',
    name: 'Carnelian Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/gKJS3WF/Carnelian-bracelet.webp',
    desc: 'Encourages action, determination, and enthusiasm throughout the busy day.',
    label: 'Vital Bracelet',
    benefits: [
      'Keeps you feeling motivated, sharp, and active during work',
      'Wards off somatic fatigue and mental laziness',
      'Increases confidence in public speaking or sales calls',
      'Protects from absorbing sluggish energies from peers'
    ],
    resonance: '639Hz Aura Action Node',
    node: 'Sacral & Solar Plexus Guard'
  },

  // ─── HEMATITE (he-1 to he-3) ──────────────────────────────────────────────
  {
    id: 'he-1',
    categoryId: 'hematite',
    name: 'Hematite Tree',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/MDv9S14s/Hematite-rename.webp',
    desc: 'Promotes grounding, focus, and stability inside shared room spaces.',
    label: 'Grounding Tree',
    benefits: [
      'Locks down wandering minds and focuses study desks',
      'Releases environmental static tension and anxiety',
      'Establishes deep structural roots and stability',
      'Filters out mental chaos from shared family grids'
    ],
    resonance: '417Hz Grounding Calibration',
    node: 'Root Chakra Vastu Alignment'
  },
  {
    id: 'he-2',
    categoryId: 'hematite',
    name: 'Hematite Bracelet',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/WLtPH0V/Hematite-bracelet.webp',
    desc: 'Supports confidence, mental clarity, and protection against overthinking.',
    label: 'Logic Bracelet',
    benefits: [
      'Focuses logic and analysis during complex negotiations',
      'Absorbs negative thoughts and overthinking loops',
      'Shields your physical field from psychic drain or envy',
      'Fosters solid inner security and base stability'
    ],
    resonance: '396Hz Anxiety Release Solfeggio',
    node: 'Root Chakra Anchor'
  },
  {
    id: 'he-3',
    categoryId: 'hematite',
    name: 'Hematite Raw Stone',
    basePrice: 699,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/m5mP7rtt/Hematite-Raw.webp',
    desc: 'Raw Hematite specimen. Helps maintain balance and physical grounding energy.',
    label: 'Anchor Specimen',
    benefits: [
      'Quickly releases chronic anxiety, flightiness, and somatic panic',
      'Ideal grounding companion for yoga or mindfulness work',
      'Clears base chakra nodes of ancestral blocks or doubts',
      'Restores physical coordination and body alignment'
    ],
    resonance: '228Hz Earth Node Synchronization',
    node: 'Root Chakra Grounding'
  },
  {
    id: 'ghb-1',
    categoryId: 'good-health-bracelet',
    name: 'Good Health Bracelet',
    basePrice: 1499,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/qMrWJL9Z/good-health-main.webp',
    detailImage: 'https://i.ibb.co/9kG2X0Q0/Good-health-bracelet-inside.webp',
    desc: 'Designed to support physical wellness, boost immunity, and promote overall body harmony. Made with natural crystal beads.',
    label: 'Wellness Anchor',
    benefits: [
      'Promotes physical energy and vitality',
      'Supports immune system and natural healing',
      'Enhances body-mind balance',
      'Reduces stress and physical fatigue'
    ],
    resonance: '432Hz Health Alignment Frequency',
    node: 'Root & Heart Chakras'
  },
  {
    id: 'axb-1',
    categoryId: 'anxiety-bracelet',
    name: 'Anxiety Bracelet',
    basePrice: 1499,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/PZvfBy0Y/anxitey-main.webp',
    detailImage: 'https://i.ibb.co/YFm5Tqxc/Anxiety-bracelet-inside.webp',
    desc: 'Infused with peaceful crystals to calm an overactive mind, ease stress, and ground emotions.',
    label: 'Calming Anchor',
    benefits: [
      'Reduces anxiety, panic, and mental stress',
      'Promotes emotional stability and tranquility',
      'Helps ground racing thoughts',
      'Encourages deep relaxation and better sleep'
    ],
    resonance: '396Hz Anxiety Release Frequency',
    node: 'Root & Third Eye Chakras'
  },
  {
    id: 'djb-1',
    categoryId: 'desired-job-bracelet',
    name: 'Desired Job Bracelet',
    basePrice: 1499,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/PvDrXZgd/Desired-job-main.webp',
    detailImage: 'https://i.ibb.co/tMtmqsnG/Desired-job-inside.webp',
    desc: 'Attracts professional opportunities, success, confidence, and clear career path alignment.',
    label: 'Success Anchor',
    benefits: [
      'Attracts ideal job opportunities and career growth',
      'Enhances professional confidence and communication',
      'Clears path obstacles and delays',
      'Manifests success in interviews and meetings'
    ],
    resonance: '528Hz Success & Career Frequency',
    node: 'Solar Plexus & Throat Chakras'
  },
  {
    id: 'dyb-1',
    categoryId: 'dhan-yog-bracelet',
    name: 'Dhan Yog Bracelet',
    basePrice: 1499,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/zTFrQrLn/dhan-yog-main.webp',
    detailImage: 'https://i.ibb.co/Q3rSzMt0/Dhan-yog-inside.webp',
    desc: 'A powerful combination of crystals designed to attract financial abundance, prosperity, and wealth luck.',
    label: 'Wealth Anchor',
    benefits: [
      'Attracts wealth, prosperity, and financial luck',
      'Enhances business opportunities and savings',
      'Cleanses blocking money mindsets',
      'Promotes good fortune and success'
    ],
    resonance: '888Hz Financial Abundance Calibration',
    node: 'Solar Plexus & Root Chakras'
  },
  {
    id: 'scb-1',
    categoryId: 'self-confidence-bracelet',
    name: 'Self Confidence Bracelet',
    basePrice: 1499,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/QvJ0vsB9/self-cinfidence-main.webp',
    detailImage: 'https://i.ibb.co/5hQTqhjQ/Self-confidence-Inside.webp',
    desc: 'Boosts self-esteem, inner strength, and courage to stand tall and speak your truth.',
    label: 'Power Anchor',
    benefits: [
      'Enhances self-confidence and self-belief',
      'Overcomes imposter syndrome and doubt',
      'Fosters courage in high-pressure situations',
      'Ignites personal power and drive'
    ],
    resonance: '417Hz Confidence Solfeggio',
    node: 'Solar Plexus Chakra'
  },
  {
    id: 'meb-1',
    categoryId: 'meditation-bracelet',
    name: 'Meditation Bracelet',
    basePrice: 1499,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/JjJzXMqq/meditation-main.webp',
    detailImage: 'https://i.ibb.co/Rpk0bjL6/Meditation-bracelet-Inside.webp',
    desc: 'Supports spiritual connection, quiet meditation, inner focus, and third eye awakening.',
    label: 'Mindfulness Anchor',
    benefits: [
      'Deepens meditation and mindfulness practices',
      'Supports third eye awakening and spiritual growth',
      'Quiets background mental chatter',
      'Enhances spiritual focus and intuition'
    ],
    resonance: '741Hz Third Eye Spiritual Frequency',
    node: 'Third Eye & Crown Chakras'
  },
  {
    id: 'bnb-1',
    categoryId: 'buri-nazar-bracelet',
    name: 'Buri Nazar Bracelet',
    basePrice: 1499,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/d4j1xrzF/buri-nazar-MAIN.webp',
    detailImage: 'https://i.ibb.co/qSHCNFS/burinazar-inside.webp',
    desc: 'Shields your aura from negative energy, jealousy, hexes, and the negative gaze of others.',
    label: 'Protection Shield',
    benefits: [
      'Shields from negative gaze (Buri Nazar)',
      'Absorbs environmental negativity and bad vibes',
      'Protects personal success and good fortune',
      'Maintains clean auric boundaries'
    ],
    resonance: '417Hz Aura Shield & Protection',
    node: 'Root Chakra Anchor'
  },
  {
    id: 'ipb-1',
    categoryId: 'inner-peace-bracelet',
    name: 'Inner Peace Bracelet',
    basePrice: 1499,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/BKzW7zJS/Inner-Peace-main.webp',
    detailImage: 'https://i.ibb.co/XZr4rcVQ/Inner-peace-inside.webp',
    desc: 'Gently balances heart and mind to invite emotional healing, deep peace, and relief from daily friction.',
    label: 'Tranquility Anchor',
    benefits: [
      'Promotes deep inner peace and calm',
      'Soothes lingering emotional pain and conflicts',
      'Supports balanced, peaceful communication',
      'Nurtures self-love and compassion'
    ],
    resonance: '528Hz Somatic Peace Resonance',
    node: 'Heart & Crown Chakras'
  },
  {
    id: 'scc-1',
    categoryId: 'seven-chakra-crystal',
    name: '7 Chakra Crystal Tree 🌈',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/sdyPwJtK/7-tree-main.webp',
    detailImage: 'https://i.ibb.co/xK8KFx9D/7-chakra-tree-inside.webp',
    desc: 'Bring balance, positivity, and harmony into your space with this beautiful 7 Chakra Crystal Tree. Made with natural chakra crystals, it is designed to support energy alignment, emotional well-being, and spiritual growth. Perfect for your home, office, meditation corner, or as a thoughtful gift.',
    label: 'Spatial Balance',
    benefits: [
      'Promotes balance and positivity',
      'Supports all seven chakras',
      'Enhances peace, focus, and spiritual growth',
      'Beautiful décor with healing energy'
    ],
    resonance: '528Hz Spatial Harmony Resonance',
    node: 'All Seven Chakras Vastu'
  },
  {
    id: 'scc-2',
    categoryId: 'seven-chakra-crystal',
    name: '7 Chakra Bracelet 🌈',
    basePrice: 999,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/vxfrLjzp/7-bracelet-main.webp',
    detailImage: 'https://i.ibb.co/RTg9yrh3/7-chakra-bracelet-Inside.webp',
    desc: 'Balance your mind, body, and spirit with our natural 7 Chakra Bracelet. Made with carefully selected chakra crystals, this bracelet is designed to support energy alignment, inner harmony, and overall well-being.',
    label: 'Aura Harmony',
    benefits: [
      'Helps balance all seven chakras',
      'Promotes positivity and emotional stability',
      'Supports focus, confidence, and inner peace',
      'Ideal for meditation, healing, and daily wear',
      'Made with natural crystal beads'
    ],
    resonance: '639Hz Aura Connection Calibration',
    node: 'All Seven Chakras Alignment'
  },
  {
    id: 'scc-3',
    categoryId: 'seven-chakra-crystal',
    name: '7 Chakra Crystals',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/4wDdQK64/7-crystal-main.webp',
    detailImage: 'https://i.ibb.co/4gCpHd8h/7-chakra-crystals-main.webp',
    desc: '7 Chakra Crystals are a powerful combination of natural stones associated with the body’s seven energy centers. They are used to promote balance, harmony, positivity, and spiritual well-being.',
    label: 'Healing Stones',
    benefits: [
      'Helps balance and align all seven chakras',
      'Encourages emotional and mental well-being',
      'Supports meditation and spiritual growth',
      'Promotes positive energy and inner harmony',
      'Ideal for healing, manifestation, and daily use'
    ],
    resonance: '963Hz Higher Cosmic Frequency',
    node: 'All Seven Chakras Grounding'
  },
  {
    id: 'rk-1',
    categoryId: 'rakhis',
    name: '7 Chakra Chip Rakhi',
    basePrice: 1199,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/whxBdsRS/7-chakra-chip-rakhi-main.webp',
    detailImage: 'https://i.ibb.co/ztBQTzC/7-charka-chip-rakhi-inside.webp',
    desc: 'Handcrafted with seven chakra crystal chips to bring balance, positive energy, and emotional harmony to your sibling\'s life.',
    label: 'Energy Alignment',
    benefits: [
      'Balances and aligns all seven bodily energy centers',
      'Promotes positive vibes and emotional stability',
      'Protects from environmental stress and negativity',
      'Beautiful sacred thread with natural crystal chips'
    ],
    resonance: '528Hz Chakra Tuning Frequency',
    node: 'All Chakras Alignment'
  },
  {
    id: 'rk-2',
    categoryId: 'rakhis',
    name: '7 Chakra Rakhi',
    basePrice: 1199,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/twXXPHSJ/7-chakra-main.webp',
    detailImage: 'https://i.ibb.co/93qmpPDC/7-chakra-Rakhi-inside.webp',
    desc: 'Elegant 7 Chakra crystal bead Rakhi designed to bring peace, spiritual growth, and absolute energy balance.',
    label: 'Spiritual Harmony',
    benefits: [
      'Cleanses the aura and balances the chakras',
      'Deepens spiritual connection and inner peace',
      'Brings health, wealth, and emotional harmony',
      'Handcrafted with premium natural crystal beads'
    ],
    resonance: '639Hz Aura Harmony Calibration',
    node: 'All Seven Chakras'
  },
  {
    id: 'rk-3',
    categoryId: 'rakhis',
    name: 'Pyrite Rakhi',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/6RyKsx5S/pyrite-rakhi-main.webp',
    detailImage: 'https://i.ibb.co/zwxKq9y/Pyrite-rakhi-inside.webp',
    desc: 'Infused with natural Pyrite beads to attract financial prosperity, career success, and absolute protective shields.',
    label: 'Wealth & Success',
    benefits: [
      'Attracts abundance, luck, and business opportunities',
      'Shields against negative intentions and bad gaze',
      'Enhances confidence, logic, and self-belief',
      'Handcrafted with pure metallic pyrite beads'
    ],
    resonance: '188Hz Pyrite Solar Meridian Alignment',
    node: 'Solar Plexus & Root Chakras'
  },
  {
    id: 'rk-4',
    categoryId: 'rakhis',
    name: 'Mahakal Rakhi',
    basePrice: 1199,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/Pv8Qk3H3/mahakal-rakhi-main.webp',
    detailImage: 'https://i.ibb.co/zT9F5Xt6/Mahakal-rakhi-inside.webp',
    desc: 'A powerful Rakhi combining Rudraksha and protective crystals, representing the blessing and ultimate protection of Lord Shiva (Mahakal).',
    label: 'Divine Protection',
    benefits: [
      'Brings ultimate protection and removes life hurdles',
      'Infused with sacred Rudraksha beads for peace of mind',
      'Repels negative energy, bad gaze, and psychic attacks',
      'Connects the wearer to pure divine grace and stability'
    ],
    resonance: '108Hz Vedic Obstacle Cleansing Sound',
    node: 'Crown & Root Chakras'
  },
  {
    id: 'rk-5',
    categoryId: 'rakhis',
    name: 'Money Magnet Rakhi',
    basePrice: 1199,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/996wpG11/money-magnet-main.webp',
    detailImage: 'https://i.ibb.co/LXR2tWMx/Money-magnet-rakhi-inside.webp',
    desc: 'Combines green aventurine, pyrite, and citrine to make a powerful money magnet thread that invites prosperity and luck.',
    label: 'Abundance Magnet',
    benefits: [
      'Attracts multiple channels of income and wealth luck',
      'Banishes blocking money mindsets and financial stress',
      'Enhances career luck and successful partnerships',
      'Made with high-vibration wealth-attracting crystals'
    ],
    resonance: '888Hz Financial Abundance Calibration',
    node: 'Solar Plexus & Heart Chakras'
  },
  {
    id: 'rk-6',
    categoryId: 'rakhis',
    name: 'Gomti Chakra Rakhi',
    basePrice: 599,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/HLPnqhmG/gomti-chakra-main.webp',
    detailImage: 'https://i.ibb.co/bRW4VThN/Gomti-chakra-rakhi-inside.webp',
    desc: 'Features a sacred Gomti Chakra stone to attract the blessings of Goddess Lakshmi, good fortune, and Vastu protection.',
    label: 'Goddess Lakshmi Blessings',
    benefits: [
      'Attracts wealth, good luck, and prosperity',
      'Protects against evil eye and negative vastu placements',
      'Brings peace, health, and success to the family',
      'Considered highly auspicious in Vedic traditions'
    ],
    resonance: '108Hz Lakshmi Prosperity Mantra',
    node: 'Root & Sacral Chakras'
  },
  {
    id: 'rk-7',
    categoryId: 'rakhis',
    name: 'Good Luck Rakhi',
    basePrice: 1199,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/Gv1HfqLh/good-luck-main.webp',
    detailImage: 'https://i.ibb.co/d9q6bfr/Good-luck-opal-rakhi-inside.webp',
    desc: 'Crafted with Opalite and lucky green crystals to bring good fortune, career growth, and emotional calmness.',
    label: 'Fortune & Grace',
    benefits: [
      'Attracts lucky opportunities and sudden positive breaks',
      'Calms the emotional field and eases anxiety',
      'Brings joyful vibes and optimism to the wearer',
      'Features a highly aesthetic and luminous design'
    ],
    resonance: '528Hz Growth & Transformation Frequency',
    node: 'Heart & Crown Chakras'
  },
  {
    id: 'rk-8',
    categoryId: 'rakhis',
    name: 'Evil Eye Rakhi',
    basePrice: 1199,
    pricingType: 'fixed',
    image: 'https://i.ibb.co/WNbSBKhT/Evil-eye-main.webp',
    detailImage: 'https://i.ibb.co/hTNF5Px/Evil-Eye-rakhi-inside.webp',
    desc: 'A classic protective Rakhi featuring a premium Evil Eye talisman and matching crystal beads to shield against negative gaze and envy.',
    label: 'Aura Shield',
    benefits: [
      'Blocks the negative gaze (Buri Nazar) and envy of others',
      'Maintains clean personal boundaries and energy shield',
      'Brings peace of mind and keeps the wearer grounded',
      'Timeless and powerful protection charm'
    ],
    resonance: '417Hz Aura Shield & Protection Frequency',
    node: 'Root Chakra Anchor'
  }
];

export interface TestimonialItem {
  name: string;
  sign: string;
  text: string;
  stars: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS_DEFAULT: FaqItem[] = [
  {
    question: 'How exact must my descent (birth) parameters be?',
    answer: 'While birth dates are solid anchors, approximate birth hours ensure the accuracy of your Rising Sign (Ascendant) and House coordinate angles, which fluctuate every few minutes. If unspecified, we synthesize your chart aligned to solar noon transits.',
  },
  {
    question: 'Are the crystals and candles ethically sourced?',
    answer: 'Yes, absolute ecological integrity is our foundation. All crystals are hand-selected from family-owned mining blocks in Uruguay during designated full lunar cycles. Our soy candles are completely phthalate-free and hand-poured in Sedona.',
  },
  {
    question: 'What happens after I schedule a 1-on-1 reading?',
    answer: 'Once booking is secured, our automatic system prepares your high-resolution vector PDF transit charts. You will receive an initial email checklist with preparatory question fields, followed by a secure custom Zoom invitation for our live hour.',
  },
  {
    question: 'Can I order items to be gifted to another\'s coordinates?',
    answer: 'Certainly. Simply customize your destination coordinates during our checkout bundle process. We will wrap the package in elegant, unbranded linen sheets accompanied by a beautiful custom handwritten zodiac-theme card.',
  },
];

export const TESTIMONIALS_DEFAULT: TestimonialItem[] = [
  { name: 'Amit Sharma', sign: 'Aries', text: 'Stunning chart reading. Predicted my promotion timeline exactly.', stars: 5 },
  { name: 'Sarah Jenkins', sign: 'Leo', text: 'The Pyrite bracelet is gorgeous. Favour and fortune followed immediately!', stars: 5 },
  { name: 'Priya Patel', sign: 'Virgo', text: 'Detailed Vastu analysis of my home changed the entire family vibe.', stars: 5 },
  { name: 'Michael Vance', sign: 'Libra', text: 'Accurate career transit calculations. Cleared all my doubts about the launch.', stars: 5 },
  { name: 'Swati Iyer', sign: 'Pisces', text: 'Highly professional Vedic consultation. Non-judgmental and very logical remedies.', stars: 5 },

  { name: 'Rahul Gupta', sign: 'Taurus', text: 'Good career guidance and very practical remedies.', stars: 4.5 },
  { name: 'Emma Watson', sign: 'Gemini', text: 'Loved the Amethyst tree. Very peaceful vibe in my study room.', stars: 4.5 },
  { name: 'Sunita Rao', sign: 'Cancer', text: 'Aura cleansing advice was useful. Highly recommend.', stars: 4 },
  { name: 'David Miller', sign: 'Sagittarius', text: 'Very logical approach to Vedic charts. No fear-mongering.', stars: 4.5 },
  { name: 'Vikram Singh', sign: 'Capricorn', text: 'Solid Vastu consulting. Home entrance alignment corrected.', stars: 4 },
  { name: 'Sophia Loren', sign: 'Scorpio', text: 'Good insight into planetary transits.', stars: 3.5 },
  { name: 'Ananya Das', sign: 'Aquarius', text: 'Liked the Gomti Chakra Rakhi. Very fast shipping too.', stars: 4.5 },
  { name: 'James Taylor', sign: 'Aries', text: 'Decent call consultation, clear guidance provided.', stars: 4 },
  { name: 'Rajesh Kumar', sign: 'Leo', text: 'Helped me plan my relocation timings correctly.', stars: 4.5 },
  { name: 'Emily Rose', sign: 'Virgo', text: 'Beautiful self confidence bracelet. Feels energetic.', stars: 4 },
  { name: 'Kavita Nair', sign: 'Libra', text: 'Satisfactory chart overview. Precise remedies suggested.', stars: 3.5 },
  { name: 'Olivia Wild', sign: 'Pisces', text: 'Very kind guide. The meditation bracelet is high quality.', stars: 4.5 },
  { name: 'Deepak Joshi', sign: 'Sagittarius', text: 'Appreciated the detailed breakdown of houses and yogas.', stars: 4 },
  { name: 'Alexander Grey', sign: 'Gemini', text: 'Professional support. Quick query response on WhatsApp.', stars: 4.5 },
  { name: 'Neha Varma', sign: 'Cancer', text: 'Buri Nazar Rakhi looks elegant. Brother liked it.', stars: 4 },
  { name: 'John Doe', sign: 'Taurus', text: 'Useful insight into planetary dashas.', stars: 3.5 },
  { name: 'Sanjay Dutt', sign: 'Capricorn', text: 'Vastu advice resolved long-standing family arguments.', stars: 4.5 },
  { name: 'Ritu Phogat', sign: 'Scorpio', text: 'Excellent gemstones recommendations. Feeling more focused.', stars: 4 },
  { name: 'Manish Pandey', sign: 'Aquarius', text: 'Logical Kundli analysis. Good explanations.', stars: 4.5 },
  { name: 'Shruti Hegde', sign: 'Aries', text: 'Prompt chat consultation. Cleared my job doubts.', stars: 4 },
  { name: 'Dev Bajwa', sign: 'Leo', text: 'Detailed marriage compatibility matching. Recommended.', stars: 4.5 },
  { name: 'Pooja Bhatia', sign: 'Virgo', text: 'Beautiful packaging of crystal relics. High vibration.', stars: 4.5 },
  { name: 'Alok Nath', sign: 'Libra', text: 'Peaceful remedies. Grounding guidance.', stars: 4 },
  { name: 'Gaurav Sen', sign: 'Pisces', text: 'Clean, direct readings. Appreciate the logical approach.', stars: 4 },
  { name: 'Meera Bai', sign: 'Sagittarius', text: 'The Dhan Yog bracelet looks stunning and feels great.', stars: 4.5 }
];
