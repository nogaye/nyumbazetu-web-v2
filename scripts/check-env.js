#!/usr/bin/env node

/**
 * Environment Variables Checker
 * 
 * Validates that all required environment variables are set.
 * 
 * Usage:
 *   node scripts/check-env.js
 */

const fs = require('fs');
const path = require('path');

const requiredVars = {
  'NEXT_PUBLIC_SUPABASE_URL': 'Your Supabase project URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': 'Your Supabase anonymous key',
  'SUPABASE_SERVICE_ROLE_KEY': 'Your Supabase service role key (server-side only)',
};

const optionalVars = {
  'NEXT_PUBLIC_GA_MEASUREMENT_ID': 'Google Analytics measurement ID',
  'NEXT_PUBLIC_PLAUSIBLE_DOMAIN': 'Plausible Analytics domain',
};

function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  const envExamplePath = path.join(process.cwd(), '.env.example');

  console.log('🔍 Checking environment variables...\n');

  // Check if .env.local exists
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found!');
    console.log('💡 Create it by copying .env.example:');
    console.log('   cp .env.example .env.local\n');
    return false;
  }

  // Read .env.local
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });

  let allGood = true;
  const missing = [];
  const empty = [];

  // Check required variables
  console.log('📋 Required Variables:');
  console.log('─'.repeat(50));
  
  for (const [key, description] of Object.entries(requiredVars)) {
    if (!envVars[key]) {
      console.log(`❌ ${key} - Missing`);
      missing.push(key);
      allGood = false;
    } else if (envVars[key] === '' || envVars[key].includes('your_')) {
      console.log(`⚠️  ${key} - Not configured (placeholder value)`);
      empty.push(key);
      allGood = false;
    } else {
      console.log(`✅ ${key}`);
    }
  }

  // Check optional variables
  console.log('\n📋 Optional Variables:');
  console.log('─'.repeat(50));
  
  for (const [key, description] of Object.entries(optionalVars)) {
    if (envVars[key] && !envVars[key].includes('your_')) {
      console.log(`✅ ${key}`);
    } else {
      console.log(`⚪ ${key} - Not set (optional)`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  
  if (allGood) {
    console.log('✅ All required environment variables are set!\n');
    return true;
  } else {
    console.log('❌ Some environment variables are missing or not configured\n');
    
    if (missing.length > 0) {
      console.log('Missing variables:');
      missing.forEach(key => {
        console.log(`  - ${key}: ${requiredVars[key]}`);
      });
      console.log('');
    }
    
    if (empty.length > 0) {
      console.log('Variables with placeholder values:');
      empty.forEach(key => {
        console.log(`  - ${key}: Update with your actual value`);
      });
      console.log('');
    }
    
    console.log('💡 Get your Supabase credentials from:');
    console.log('   https://supabase.com/dashboard/project/_/settings/api\n');
    
    return false;
  }
}

// Run check
const isValid = checkEnvFile();
process.exit(isValid ? 0 : 1);

