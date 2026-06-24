const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
// Load environment variables from .env.local
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('❌ Error: DATABASE_URL is not set in .env.local');
    console.log('Please create a .env.local file in the root of the project with:');
    console.log('DATABASE_URL=your_neon_connection_string_here');
    process.exit(1);
  }

  console.log('Connecting to Neon PostgreSQL...');
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false // Required for serverless platforms like Neon
    }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database successfully.');

    const schemaPath = path.resolve(__dirname, '../schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`schema.sql not found at: ${schemaPath}`);
    }

    console.log('Reading schema.sql...');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing tables creation...');
    await client.query(sql);
    console.log('🎉 All tables created and default credentials seeded successfully!');
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    console.error(error);
  } finally {
    await client.end();
  }
}

main();
