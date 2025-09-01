const Airtable = require("airtable");
require('dotenv').config({ path: '.env.local' });

// Connect to Airtable
const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY })
  .base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

console.log("🔧 Testing Airtable Connection...");
console.log("API Key:", process.env.NEXT_PUBLIC_AIRTABLE_API_KEY ? "✅ Set" : "❌ Missing");
console.log("Base ID:", process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID ? "✅ Set" : "❌ Missing");
console.log("");

// Test functions
async function testDailyLetterPairs() {
  console.log("📝 Testing Daily Letter Pairs...");
  try {
    const records = await base("Daily letter pairs").select().firstPage();
    console.log(`✅ Found ${records.length} daily letter pair records`);
    if (records.length > 0) {
      console.log("Sample record:", {
        date: records[0].get("date"),
        firstLetter: records[0].get("first letter"),
        lastLetter: records[0].get("last letter")
      });
    }
  } catch (error) {
    console.log("❌ Error accessing Daily Letter Pairs:", error.message);
  }
  console.log("");
}

async function testGameScore() {
  console.log("🏆 Testing Game Score...");
  try {
    const records = await base("Game Score").select().firstPage();
    console.log(`✅ Found ${records.length} game score records`);
    if (records.length > 0) {
      console.log("Sample record:", {
        username: records[0].get("username"),
        totalScore: records[0].get("Total score"),
        date: records[0].get("Date")
      });
    }
  } catch (error) {
    console.log("❌ Error accessing Game Score:", error.message);
  }
  console.log("");
}

async function testGameSession() {
  console.log("🎮 Testing Game Session...");
  try {
    const records = await base("Game Session").select().firstPage();
    console.log(`✅ Found ${records.length} game session records`);
    if (records.length > 0) {
      console.log("Sample record:", {
        username: records[0].get("Username (Link)"),
        sessionName: records[0].get("Session Name"),
        letterPair: records[0].get("Letter Pair"),
        date: records[0].get("Date")
      });
    }
  } catch (error) {
    console.log("❌ Error accessing Game Session:", error.message);
  }
  console.log("");
}

async function testWriteGameScore() {
  console.log("✍️ Testing Write to Game Score...");
  try {
    const testRecord = await base("Game Score").create([
      {
        fields: {
          username: "TestUser",
          "Total score": 100,
          "Words count": 5,
          "Time used": 120,
          "Words list": JSON.stringify(["apple", "able", "age", "ace", "ate"]),
          "Date": new Date().toISOString(),
          "Share ID": "test123"
        }
      }
    ]);
    console.log("✅ Successfully created test game score record");
    console.log("Record ID:", testRecord[0].id);
    
    // Clean up - delete the test record
    await base("Game Score").destroy([testRecord[0].id]);
    console.log("🧹 Cleaned up test record");
  } catch (error) {
    console.log("❌ Error writing to Game Score:", error.message);
  }
  console.log("");
}

// Run all tests
async function runTests() {
  await testDailyLetterPairs();
  await testGameScore();
  await testGameSession();
  await testWriteGameScore();
  
  console.log("🎉 Airtable connection test completed!");
}

runTests().catch(console.error);
