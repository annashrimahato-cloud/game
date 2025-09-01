#!/bin/bash

echo "🔧 Setting up Wordit Game Environment"
echo "===================================="

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_AIRTABLE_API_KEY=patP1aQd43AqCZpYq.dacc54c446f99bd9f0aff7cea32d4e7e6684b1e7b2dabb2bd11e790e724cd859
NEXT_PUBLIC_AIRTABLE_BASE_ID=appVLi2ogum66Vw6h
EOF

echo "✅ Environment variables created in .env.local"
echo ""
echo "📋 Configuration:"
echo "  API Key: patP1aQd43AqCZpYq.dacc54c446f99bd9f0aff7cea32d4e7e6684b1e7b2dabb2bd11e790e724cd859"
echo "  Base ID: appVLi2ogum66Vw6h"
echo ""
echo "🚀 You can now start the game with:"
echo "  ./start-game.sh"
echo ""
echo "📊 Airtable tables will be created automatically when you first play!"
