-- AstroHealer PostgreSQL Database Schema
-- Designed for Neon Tech serverless Postgres

-- 1. Admin Credentials Table
CREATE TABLE IF NOT EXISTS admin_credentials (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Admin Credentials (Email: 1, Password: 1)
INSERT INTO admin_credentials (email, password)
VALUES ('1', '1')
ON CONFLICT (email) DO NOTHING;

-- 2. Consultation Services Table
CREATE TABLE IF NOT EXISTS consultation_services (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    languages VARCHAR(255) NOT NULL,
    experience VARCHAR(100) NOT NULL,
    reviews INTEGER DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    chat_price NUMERIC(10, 2),
    chat_dur VARCHAR(50),
    call_price NUMERIC(10, 2),
    call_dur VARCHAR(50),
    video_price NUMERIC(10, 2),
    video_dur VARCHAR(50),
    badge VARCHAR(100),
    icon VARCHAR(50) NOT NULL,
    bg VARCHAR(100) NOT NULL,
    is_combo BOOLEAN DEFAULT FALSE
);

-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    sign VARCHAR(50) NOT NULL,
    stars INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Shop Categories Table
CREATE TABLE IF NOT EXISTS shop_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_single_product BOOLEAN DEFAULT FALSE
);

-- 6. Sub Crystal Products Table
CREATE TABLE IF NOT EXISTS sub_crystal_products (
    id VARCHAR(50) PRIMARY KEY,
    category_id VARCHAR(50) REFERENCES shop_categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    base_price NUMERIC(10, 2) NOT NULL,
    pricing_type VARCHAR(50) NOT NULL, -- 'per-gram', 'size-based', 'fixed', 'per-kg'
    sizes JSONB, -- Array of sizes e.g., [{"label": "Small", "price": 10}]
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    label VARCHAR(100),
    benefits TEXT[], -- Array of strings
    resonance VARCHAR(255),
    node VARCHAR(255),
    detail_image TEXT,
    solar_peak_cleansed TEXT,
    apothecary_placement TEXT
);
