#!/usr/bin/env node

/**
 * Script to create an admin user
 * 
 * Usage:
 *   node scripts/create-admin-user.js <email> <password> [name]
 * 
 * Example:
 *   node scripts/create-admin-user.js admin@nyumbazetu.com securepassword123 "Admin User"
 */

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || 'Admin User';

  if (!email || !password) {
    console.error('❌ Usage: node scripts/create-admin-user.js <email> <password> [name]');
    console.error('');
    console.error('Example:');
    console.error('  node scripts/create-admin-user.js admin@nyumbazetu.com securepassword123 "Admin User"');
    process.exit(1);
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error('❌ Invalid email format');
    process.exit(1);
  }

  // Validate password length
  if (password.length < 8) {
    console.error('❌ Password must be at least 8 characters long');
    process.exit(1);
  }

  try {
    console.log('🔐 Creating admin user...');
    console.log(`   Email: ${email}`);
    console.log(`   Name: ${name}`);

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Check if user already exists
    const { data: existing } = await supabase
      .from('admin_users')
      .select('id, email')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      console.error(`❌ Admin user with email ${email} already exists`);
      process.exit(1);
    }

    // Insert admin user
    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        name: name,
        role: 'admin',
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating admin user:', error.message);
      if (error.code === 'PGRST116') {
        console.error('   Hint: Make sure the admin_users table exists. Run migration 004_create_admin_users_table.sql');
      }
      process.exit(1);
    }

    console.log('');
    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('Details:');
    console.log(`   ID: ${data.id}`);
    console.log(`   Email: ${data.email}`);
    console.log(`   Name: ${data.name}`);
    console.log(`   Role: ${data.role}`);
    console.log(`   Active: ${data.is_active}`);
    console.log('');
    console.log('⚠️  Remember to:');
    console.log('   1. Change the default password after first login');
    console.log('   2. Keep your credentials secure');
    console.log('   3. Use a strong, unique password');
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  }
}

createAdminUser();



