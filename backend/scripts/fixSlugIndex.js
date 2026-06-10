/**
 * One-time migration: drop the non-sparse slug_1 index and recreate it as sparse.
 * Run with: node scripts/fixSlugIndex.js
 */

// Mirror the DNS override from server.js so Atlas SRV resolves in PowerShell
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require('mongoose');

// Use dotenv-flow if available, else plain dotenv
try {
  require('dotenv-flow').config();
} catch {
  require('dotenv').config();
}

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌  MONGO_URI not found in environment.');
  process.exit(1);
}

async function run() {
  console.log('Connecting to MongoDB…');
  await mongoose.connect(MONGO_URI);
  console.log('✅  Connected');

  const db = mongoose.connection.db;
  const col = db.collection('websites');

  // Show current indexes
  const before = await col.indexes();
  console.log('\nIndexes BEFORE:');
  before.forEach(i => console.log(' -', JSON.stringify(i)));

  // Drop the problematic index
  try {
    await col.dropIndex('slug_1');
    console.log('\n✅  Dropped slug_1 index');
  } catch (e) {
    console.warn('\n⚠️   Could not drop slug_1 index (may not exist):', e.message);
  }

  // Recreate it as unique + sparse (nulls won't be indexed)
  await col.createIndex({ slug: 1 }, { unique: true, sparse: true });
  console.log('✅  Recreated slug_1 as unique + sparse');

  // Show indexes after
  const after = await col.indexes();
  console.log('\nIndexes AFTER:');
  after.forEach(i => console.log(' -', JSON.stringify(i)));

  await mongoose.disconnect();
  console.log('\n✅  Done. You can now restart your backend server.');
}

run().catch(err => {
  console.error('❌  Migration failed:', err);
  process.exit(1);
});
