const Airtable = require("airtable");
require('dotenv').config({ path: '.env.local' });

console.log("🔧 Checking Airtable Configuration...");
console.log("API Key (first 10 chars):", process.env.NEXT_PUBLIC_AIRTABLE_API_KEY?.substring(0, 10) + "...");
console.log("Base ID:", process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
console.log("");

// Try to connect and list tables
async function checkConnection() {
  try {
    const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY })
      .base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
    
    console.log("🔗 Attempting to connect to Airtable...");
    
    // Try to get base info
    const tables = await base.tables;
    console.log("✅ Successfully connected to Airtable!");
    console.log("📋 Available tables:");
    
    for (const table of tables) {
      console.log(`  - ${table.name}`);
    }
    
  } catch (error) {
    console.log("❌ Connection failed:", error.message);
    console.log("");
    console.log("🔍 Troubleshooting tips:");
    console.log("1. Check if the API key is correct");
    console.log("2. Verify the Base ID is correct");
    console.log("3. Ensure the API key has read/write permissions");
    console.log("4. Check if the base is shared with your account");
  }
}

checkConnection();
