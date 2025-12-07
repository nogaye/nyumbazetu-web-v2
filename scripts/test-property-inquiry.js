#!/usr/bin/env node

/**
 * Test script for property inquiry API
 * 
 * Usage:
 *   node scripts/test-property-inquiry.js
 * 
 * This script tests the property inquiry submission endpoint
 * and optionally the admin endpoint to view inquiries.
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Test data
const testInquiry = {
  propertyId: 'test-property-id-123',
  propertySlug: 'test-property-slug',
  propertyTitle: '2BR Apartment - Kilimani',
  name: 'Test User',
  email: 'test@example.com',
  phone: '+254 700 000 000',
  message: 'I am interested in viewing this property. Please let me know when would be a good time.',
};

async function testSubmitInquiry() {
  console.log('\n🧪 Testing Property Inquiry Submission...\n');
  
  try {
    const response = await fetch(`${BASE_URL}/api/property-inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testInquiry),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Inquiry submitted successfully!');
      console.log('Response:', JSON.stringify(data, null, 2));
      return true;
    } else {
      console.error('❌ Submission failed:', data.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Error submitting inquiry:', error.message);
    return false;
  }
}

async function testValidation() {
  console.log('\n🧪 Testing Form Validation...\n');

  const invalidTests = [
    {
      name: 'Missing required fields',
      data: { name: 'Test' },
      expectedError: 'Name, email, and message are required',
    },
    {
      name: 'Invalid email format',
      data: { ...testInquiry, email: 'invalid-email' },
      expectedError: 'Invalid email address',
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of invalidTests) {
    try {
      const response = await fetch(`${BASE_URL}/api/property-inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(test.data),
      });

      const data = await response.json();

      if (!response.ok && data.error === test.expectedError) {
        console.log(`✅ ${test.name}: Validation working correctly`);
        passed++;
      } else {
        console.error(`❌ ${test.name}: Expected error "${test.expectedError}", got:`, data);
        failed++;
      }
    } catch (error) {
      console.error(`❌ ${test.name}: Error:`, error.message);
      failed++;
    }
  }

  console.log(`\nValidation tests: ${passed} passed, ${failed} failed\n`);
  return failed === 0;
}

async function testAdminEndpoint() {
  console.log('\n🧪 Testing Admin Endpoint...\n');

  try {
    const response = await fetch(`${BASE_URL}/api/property-inquiry/admin?limit=10`);

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Admin endpoint accessible');
      console.log(`Found ${data.total} inquiries`);
      if (data.inquiries && data.inquiries.length > 0) {
        console.log('\nSample inquiry:');
        console.log(JSON.stringify(data.inquiries[0], null, 2));
      }
      return true;
    } else {
      const data = await response.json();
      console.log('⚠️  Admin endpoint returned:', data.error || 'Unknown error');
      return false;
    }
  } catch (error) {
    console.error('❌ Error accessing admin endpoint:', error.message);
    return false;
  }
}

async function testAPIHealth() {
  console.log('\n🧪 Testing API Health...\n');

  try {
    const response = await fetch(`${BASE_URL}/api/property-inquiry`);
    const data = await response.json();

    if (response.ok && data.message) {
      console.log('✅ API is running');
      console.log('Response:', data.message);
      return true;
    } else {
      console.error('❌ API health check failed');
      return false;
    }
  } catch (error) {
    console.error('❌ Error checking API health:', error.message);
    console.log('\n💡 Make sure your dev server is running: npm run dev\n');
    return false;
  }
}

async function main() {
  console.log('🚀 Property Inquiry API Test Suite\n');
  console.log(`Testing against: ${BASE_URL}\n`);

  const results = {
    health: false,
    submit: false,
    validation: false,
    admin: false,
  };

  // Test API health
  results.health = await testAPIHealth();
  if (!results.health) {
    console.log('\n❌ API is not accessible. Please start your dev server first.\n');
    process.exit(1);
  }

  // Test form validation
  results.validation = await testValidation();

  // Test inquiry submission
  results.submit = await testSubmitInquiry();

  // Test admin endpoint
  results.admin = await testAdminEndpoint();

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Summary');
  console.log('='.repeat(50));
  console.log(`API Health:        ${results.health ? '✅' : '❌'}`);
  console.log(`Form Validation:   ${results.validation ? '✅' : '❌'}`);
  console.log(`Inquiry Submit:    ${results.submit ? '✅' : '❌'}`);
  console.log(`Admin Endpoint:    ${results.admin ? '✅' : '⚠️ '}`);
  console.log('='.repeat(50));

  const allPassed = Object.values(results).every(r => r);
  if (allPassed) {
    console.log('\n🎉 All tests passed!\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Check the output above for details.\n');
    process.exit(1);
  }
}

// Run tests
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

