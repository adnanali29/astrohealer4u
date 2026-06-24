import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { 
  SERVICES, 
  FAQ_ITEMS_DEFAULT, 
  TESTIMONIALS_DEFAULT, 
  SHOP_CATEGORIES, 
  CRYSTAL_SUB_PRODUCTS 
} from '@/lib/data';

// Helper to seed data if tables are empty
async function ensureSeeded() {
  // 1. Consultation Services
  const servicesCount = await query('SELECT COUNT(*) FROM consultation_services');
  if (parseInt(servicesCount.rows[0].count) === 0) {
    console.log('Seeding consultation_services...');
    for (const s of SERVICES) {
      await query(
        `INSERT INTO consultation_services (
          id, name, image, title, description, languages, experience, reviews, rating, 
          chat_price, chat_dur, call_price, call_dur, video_price, video_dur, badge, icon, bg, is_combo
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
        [
          s.id, s.name, s.image, s.title, s.desc, s.languages, s.experience, s.reviews, s.rating,
          s.chatPrice, s.chatDur, s.callPrice, s.callDur, s.videoPrice || null, s.videoDur || null,
          s.badge, s.icon, s.bg, s.isCombo || false
        ]
      );
    }
  }

  // 2. Testimonials
  const testimonialsCount = await query('SELECT COUNT(*) FROM testimonials');
  if (parseInt(testimonialsCount.rows[0].count) === 0) {
    console.log('Seeding testimonials...');
    for (const t of TESTIMONIALS_DEFAULT) {
      await query(
        `INSERT INTO testimonials (name, text, sign, stars) VALUES ($1, $2, $3, $4)`,
        [t.name, t.text, t.sign, t.stars]
      );
    }
  }

  // 3. FAQs
  const faqsCount = await query('SELECT COUNT(*) FROM faqs');
  if (parseInt(faqsCount.rows[0].count) === 0) {
    console.log('Seeding faqs...');
    for (const f of FAQ_ITEMS_DEFAULT) {
      await query(
        `INSERT INTO faqs (question, answer) VALUES ($1, $2)`,
        [f.question, f.answer]
      );
    }
  }

  // 4. Shop Categories
  const categoriesCount = await query('SELECT COUNT(*) FROM shop_categories');
  if (parseInt(categoriesCount.rows[0].count) === 0) {
    console.log('Seeding shop_categories...');
    for (const c of SHOP_CATEGORIES) {
      await query(
        `INSERT INTO shop_categories (id, name, image, tagline, description, is_single_product) VALUES ($1, $2, $3, $4, $5, $6)`,
        [c.id, c.name, c.image, c.tagline, c.desc, c.isSingleProduct || false]
      );
    }
  }

  // 5. Sub Crystal Products
  const subProductsCount = await query('SELECT COUNT(*) FROM sub_crystal_products');
  if (parseInt(subProductsCount.rows[0].count) === 0) {
    console.log('Seeding sub_crystal_products...');
    for (const p of CRYSTAL_SUB_PRODUCTS) {
      await query(
        `INSERT INTO sub_crystal_products (
          id, category_id, name, base_price, pricing_type, sizes, image, description, label, 
          benefits, resonance, node, detail_image, solar_peak_cleansed, apothecary_placement
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [
          p.id, p.categoryId, p.name, p.basePrice, p.pricingType, 
          p.sizes ? JSON.stringify(p.sizes) : null, p.image, p.desc, p.label,
          p.benefits, p.resonance, p.node, p.detailImage || null, 
          p.solarPeakCleansed || null, p.apothecaryPlacement || null
        ]
      );
    }
  }

  // 6. Site Settings
  const settingsCount = await query('SELECT COUNT(*) FROM site_settings');
  if (parseInt(settingsCount.rows[0].count) === 0) {
    console.log('Seeding site_settings defaults...');
    const defaults = {
      heroTitle: 'Unveil Your Cosmic Blueprint',
      heroSub: 'We align physical objects, cosmic transits, and customized daily astrological calendars to guide your spatial and spiritual energy toward harmonic tranquility.',
      heroStats: JSON.stringify({ charts: '12,500+', clientPraise: '4.96 ★', spiritualEthics: '100%' }),
      officeAddress: 'amar complex Garhdiwala punjab',
      contactEmail: 'astrohealer4u@gmail.com',
      contactPhone: '9041544404',
      displayedServices: JSON.stringify(['s2', 's1', 's3'])
    };
    for (const [key, value] of Object.entries(defaults)) {
      await query(
        `INSERT INTO site_settings (key, value) VALUES ($1, $2)`,
        [key, value]
      );
    }
  }

  // 7. Admin credentials default (if not present)
  const credsCount = await query('SELECT COUNT(*) FROM admin_credentials');
  if (parseInt(credsCount.rows[0].count) === 0) {
    await query(`INSERT INTO admin_credentials (email, password) VALUES ('1', '1')`);
  }
}

// GET all website data from PostgreSQL
export async function GET() {
  try {
    await ensureSeeded();

    const servicesRes = await query('SELECT * FROM consultation_services');
    const testimonialsRes = await query('SELECT * FROM testimonials ORDER BY id DESC');
    const faqsRes = await query('SELECT * FROM faqs ORDER BY id ASC');
    const categoriesRes = await query('SELECT * FROM shop_categories');
    const subProductsRes = await query('SELECT * FROM sub_crystal_products');
    const settingsRes = await query('SELECT * FROM site_settings');
    const credsRes = await query('SELECT email, password FROM admin_credentials LIMIT 1');

    // Parse site settings
    const settings: Record<string, any> = {};
    settingsRes.rows.forEach(row => {
      if (row.key === 'heroStats' || row.key === 'displayedServices') {
        try {
          settings[row.key] = JSON.parse(row.value);
        } catch (e) {
          settings[row.key] = row.value;
        }
      } else {
        settings[row.key] = row.value;
      }
    });

    // Parse sizes JSON for products
    const subProducts = subProductsRes.rows.map(row => ({
      id: row.id,
      categoryId: row.category_id,
      name: row.name,
      basePrice: parseFloat(row.base_price),
      pricingType: row.pricing_type,
      sizes: row.sizes ? (typeof row.sizes === 'string' ? JSON.parse(row.sizes) : row.sizes) : undefined,
      image: row.image,
      desc: row.description,
      label: row.label,
      benefits: row.benefits,
      resonance: row.resonance,
      node: row.node,
      detailImage: row.detail_image || undefined,
      solarPeakCleansed: row.solar_peak_cleansed || undefined,
      apothecaryPlacement: row.apothecary_placement || undefined
    }));

    const services = servicesRes.rows.map(row => ({
      id: row.id,
      name: row.name,
      image: row.image,
      title: row.title,
      desc: row.description,
      languages: row.languages,
      experience: row.experience,
      reviews: parseInt(row.reviews),
      rating: parseFloat(row.rating),
      chatPrice: row.chat_price ? parseFloat(row.chat_price) : null,
      chatDur: row.chat_dur,
      callPrice: row.call_price ? parseFloat(row.call_price) : null,
      callDur: row.call_dur,
      videoPrice: row.video_price ? parseFloat(row.video_price) : null,
      videoDur: row.video_dur,
      badge: row.badge,
      icon: row.icon,
      bg: row.bg,
      isCombo: row.is_combo
    }));

    const shopCategories = categoriesRes.rows.map(row => ({
      id: row.id,
      name: row.name,
      image: row.image,
      tagline: row.tagline,
      desc: row.description,
      isSingleProduct: row.is_single_product
    }));

    const faqs = faqsRes.rows.map(row => ({
      question: row.question,
      answer: row.answer
    }));

    const testimonials = testimonialsRes.rows.map(row => ({
      name: row.name,
      text: row.text,
      sign: row.sign,
      stars: parseInt(row.stars)
    }));

    const credentials = credsRes.rows[0] || { email: '1', password: '1' };

    return NextResponse.json({
      success: true,
      heroTitle: settings.heroTitle || 'Unveil Your Cosmic Blueprint',
      heroSub: settings.heroSub || 'We align physical objects, cosmic transits...',
      heroStats: settings.heroStats || { charts: '12,500+', clientPraise: '4.96 ★', spiritualEthics: '100%' },
      officeAddress: settings.officeAddress || 'amar complex Garhdiwala punjab',
      contactEmail: settings.contactEmail || 'astrohealer4u@gmail.com',
      contactPhone: settings.contactPhone || '9041544404',
      displayedServices: settings.displayedServices || ['s2', 's1', 's3'],
      services,
      testimonials,
      faqs,
      shopCategories,
      shopSubProducts: subProducts,
      adminEmail: credentials.email,
      adminPassword: credentials.password
    });
  } catch (error: any) {
    console.error('API Error in GET:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST to update site data in PostgreSQL
export async function POST(req: Request) {
  try {
    const { action, data } = await req.json();

    switch (action) {
      case 'updateHero': {
        const { title, sub, stats } = data;
        await query('INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2', ['heroTitle', title]);
        await query('INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2', ['heroSub', sub]);
        await query('INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2', ['heroStats', JSON.stringify(stats)]);
        break;
      }

      case 'updateDisplayedServices': {
        const { ids } = data;
        await query('INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2', ['displayedServices', JSON.stringify(ids)]);
        break;
      }

      case 'addTestimonial': {
        const { name, text, sign, stars } = data;
        await query('INSERT INTO testimonials (name, text, sign, stars) VALUES ($1, $2, $3, $4)', [name, text, sign, stars]);
        break;
      }

      case 'addFaq': {
        const { question, answer } = data;
        await query('INSERT INTO faqs (question, answer) VALUES ($1, $2)', [question, answer]);
        break;
      }

      case 'editFaq': {
        // Since we identify by index in local memory, it is safer to rewrite the FAQ list or fetch/update by question
        // In PostgreSQL, let's update by replacing the list or updating matching question
        const { index, question, answer } = data;
        const currentFaqs = await query('SELECT id FROM faqs ORDER BY id ASC');
        if (currentFaqs.rows[index]) {
          const faqId = currentFaqs.rows[index].id;
          await query('UPDATE faqs SET question = $1, answer = $2 WHERE id = $3', [question, answer, faqId]);
        }
        break;
      }

      case 'deleteFaq': {
        const { index } = data;
        const currentFaqs = await query('SELECT id FROM faqs ORDER BY id ASC');
        if (currentFaqs.rows[index]) {
          const faqId = currentFaqs.rows[index].id;
          await query('DELETE FROM faqs WHERE id = $1', [faqId]);
        }
        break;
      }

      case 'addService': {
        const s = data;
        await query(
          `INSERT INTO consultation_services (
            id, name, image, title, description, languages, experience, reviews, rating, 
            chat_price, chat_dur, call_price, call_dur, video_price, video_dur, badge, icon, bg, is_combo
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
          [
            s.id, s.name, s.image, s.title, s.desc, s.languages, s.experience, s.reviews, s.rating,
            s.chatPrice, s.chatDur, s.callPrice, s.callDur, s.videoPrice || null, s.videoDur || null,
            s.badge, s.icon, s.bg, s.isCombo || false
          ]
        );
        break;
      }

      case 'editService': {
        const { id, fields } = data;
        const keys = Object.keys(fields);
        if (keys.length > 0) {
          // Map local fields to snake_case column names
          const fieldMapping: Record<string, string> = {
            name: 'name',
            image: 'image',
            title: 'title',
            desc: 'description',
            languages: 'languages',
            experience: 'experience',
            reviews: 'reviews',
            rating: 'rating',
            chatPrice: 'chat_price',
            chatDur: 'chat_dur',
            callPrice: 'call_price',
            callDur: 'call_dur',
            videoPrice: 'video_price',
            videoDur: 'video_dur',
            badge: 'badge',
            icon: 'icon',
            bg: 'bg',
            isCombo: 'is_combo'
          };

          const setStatements = [];
          const values = [];
          let idx = 1;
          for (const key of keys) {
            const col = fieldMapping[key];
            if (col) {
              setStatements.push(`${col} = $${idx}`);
              values.push(fields[key]);
              idx++;
            }
          }
          values.push(id);
          await query(
            `UPDATE consultation_services SET ${setStatements.join(', ')} WHERE id = $${idx}`,
            values
          );
        }
        break;
      }

      case 'deleteService': {
        const { id } = data;
        await query('DELETE FROM consultation_services WHERE id = $1', [id]);
        break;
      }

      case 'updateContactInfo': {
        const { address, email, phone } = data;
        await query('INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2', ['officeAddress', address]);
        await query('INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2', ['contactEmail', email]);
        await query('INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2', ['contactPhone', phone]);
        break;
      }

      case 'addShopCategory': {
        const c = data;
        await query(
          `INSERT INTO shop_categories (id, name, image, tagline, description, is_single_product) VALUES ($1, $2, $3, $4, $5, $6)`,
          [c.id, c.name, c.image, c.tagline, c.desc, c.isSingleProduct || false]
        );
        break;
      }

      case 'editShopCategory': {
        const { id, fields } = data;
        const keys = Object.keys(fields);
        if (keys.length > 0) {
          const fieldMapping: Record<string, string> = {
            name: 'name',
            image: 'image',
            tagline: 'tagline',
            desc: 'description',
            isSingleProduct: 'is_single_product'
          };
          const setStatements = [];
          const values = [];
          let idx = 1;
          for (const key of keys) {
            const col = fieldMapping[key];
            if (col) {
              setStatements.push(`${col} = $${idx}`);
              values.push(fields[key]);
              idx++;
            }
          }
          values.push(id);
          await query(
            `UPDATE shop_categories SET ${setStatements.join(', ')} WHERE id = $${idx}`,
            values
          );
        }
        break;
      }

      case 'deleteShopCategory': {
        const { id } = data;
        await query('DELETE FROM shop_categories WHERE id = $1', [id]);
        break;
      }

      case 'addShopSubProduct': {
        const p = data;
        await query(
          `INSERT INTO sub_crystal_products (
            id, category_id, name, base_price, pricing_type, sizes, image, description, label, 
            benefits, resonance, node, detail_image, solar_peak_cleansed, apothecary_placement
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
          [
            p.id, p.categoryId, p.name, p.basePrice, p.pricingType, 
            p.sizes ? JSON.stringify(p.sizes) : null, p.image, p.desc, p.label,
            p.benefits, p.resonance, p.node, p.detailImage || null, 
            p.solarPeakCleansed || null, p.apothecaryPlacement || null
          ]
        );
        break;
      }

      case 'editShopSubProduct': {
        const { id, fields } = data;
        const keys = Object.keys(fields);
        if (keys.length > 0) {
          const fieldMapping: Record<string, string> = {
            name: 'name',
            categoryId: 'category_id',
            basePrice: 'base_price',
            pricingType: 'pricing_type',
            sizes: 'sizes',
            image: 'image',
            desc: 'description',
            label: 'label',
            benefits: 'benefits',
            resonance: 'resonance',
            node: 'node',
            detailImage: 'detail_image',
            solarPeakCleansed: 'solar_peak_cleansed',
            apothecaryPlacement: 'apothecary_placement'
          };
          const setStatements = [];
          const values = [];
          let idx = 1;
          for (const key of keys) {
            const col = fieldMapping[key];
            if (col) {
              setStatements.push(`${col} = $${idx}`);
              // Special formatting for JSON or Arrays
              if (key === 'sizes') {
                values.push(fields[key] ? JSON.stringify(fields[key]) : null);
              } else {
                values.push(fields[key]);
              }
              idx++;
            }
          }
          values.push(id);
          await query(
            `UPDATE sub_crystal_products SET ${setStatements.join(', ')} WHERE id = $${idx}`,
            values
          );
        }
        break;
      }

      case 'deleteShopSubProduct': {
        const { id } = data;
        await query('DELETE FROM sub_crystal_products WHERE id = $1', [id]);
        break;
      }

      case 'updateAdminCredentials': {
        const { email, password } = data;
        // Check if row exists, if so update first row. Otherwise insert.
        const check = await query('SELECT id FROM admin_credentials LIMIT 1');
        if (check.rows.length > 0) {
          await query('UPDATE admin_credentials SET email = $1, password = $2 WHERE id = $3', [email, password, check.rows[0].id]);
        } else {
          await query('INSERT INTO admin_credentials (email, password) VALUES ($1, $2)', [email, password]);
        }
        break;
      }

      default:
        return NextResponse.json({ success: false, error: `Invalid action: ${action}` }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error in POST:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
