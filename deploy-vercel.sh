#!/bin/bash

echo "🚀 Wordit Game - Vercel Deployment Helper"
echo "=========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    echo ""
fi

echo "🔧 Preparing for deployment..."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Wordit game with Airtable integration"
    echo "✅ Git repository initialized"
    echo ""
fi

echo "🌐 Ready to deploy to Vercel!"
echo ""
echo "📋 Next steps:"
echo "1. Run: vercel"
echo "2. Follow the prompts to login/create account"
echo "3. Set environment variables in Vercel dashboard:"
echo "   - NEXT_PUBLIC_AIRTABLE_API_KEY: patP1aQd43AqCZpYq.dacc54c446f99bd9f0aff7cea32d4e7e6684b1e7b2dabb2bd11e790e724cd859"
echo "   - NEXT_PUBLIC_AIRTABLE_BASE_ID: appVLi2ogum66Vw6h"
echo "4. Deploy!"
echo ""
echo "🎯 Or deploy manually:"
echo "   - Go to vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set environment variables"
echo "   - Deploy!"
echo ""
echo "📚 See DEPLOYMENT.md for detailed instructions"
