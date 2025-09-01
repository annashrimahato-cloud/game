#!/bin/bash

echo "🎮 Wordit Game Server Status"
echo "=========================="

# Check if server is running
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Server is RUNNING"
    echo "🌐 URL: http://localhost:3000"
    echo "📱 Open this URL in your browser to play!"
    echo ""
    echo "To stop the server:"
    echo "  Press Ctrl+C in the terminal where it's running"
    echo "  Or run: pkill -f 'next dev'"
else
    echo "❌ Server is NOT running"
    echo ""
    echo "To start the server:"
    echo "  ./start-game.sh"
    echo "  Or manually: npm run dev"
fi

echo ""
echo "📁 Project location: $(pwd)"
