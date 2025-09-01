# 🎮 Wordit - Word Building Game

A fun and engaging word-building game built with Next.js, TypeScript, and TailwindCSS. Players create words starting with "A" and ending with "E" within a 3-minute time limit.

## ✨ Features

- **⏱️ 3-Minute Timer** - Race against time to build words
- **🔤 Smart Validation** - Dictionary API integration for real English words
- **📊 Live Scoring** - Points based on word length
- **🏆 Leaderboards** - Track top scores with Airtable integration
- **📤 Share Scores** - Generate unique links to challenge friends
- **📱 Mobile-First** - Responsive design for all devices
- **🎯 Real-time Updates** - Live score and word tracking

## 🚀 Live Demo

[Play Wordit Online](https://your-project.vercel.app) *(Coming soon after deployment)*

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** TailwindCSS
- **Backend:** Next.js API Routes
- **Database:** Airtable (Scores, Leaderboards, Shared Scores)
- **Validation:** Dictionary API (dictionaryapi.dev)
- **Deployment:** Vercel (recommended)

## 🎯 How to Play

1. **Start the Game** - Enter your username and begin
2. **Build Words** - Type words that start with "A" and end with "E"
3. **Score Points** - Longer words = more points
4. **Beat the Clock** - You have 3 minutes to score as high as possible
5. **Share & Challenge** - Share your score with friends

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Airtable account (for full functionality)

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/wordit-game.git
cd wordit-game

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Airtable credentials

# Run development server
npm run dev

# Open http://localhost:3000
```

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_AIRTABLE_API_KEY=your_api_key_here
NEXT_PUBLIC_AIRTABLE_BASE_ID=your_base_id_here
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables
   - Deploy! 🚀

### Netlify

1. Build the project: `npm run build`
2. Drag `.next` folder to [netlify.com](https://netlify.com)
3. Set environment variables

## 📊 Airtable Schema

The game uses these Airtable tables:

- **Daily Letter Pairs** - Letter combinations for challenges
- **Game Score** - Player scores and statistics
- **Game Session** - Game session details
- **Shared Scores** - Shareable score links

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [TailwindCSS](https://tailwindcss.com/) for beautiful styling
- [Airtable](https://airtable.com/) for data management
- [Dictionary API](https://dictionaryapi.dev/) for word validation

---

**Made with ❤️ for word game enthusiasts everywhere!**

[Play Now](https://your-project.vercel.app) | [Report Bug](https://github.com/YOUR_USERNAME/wordit-game/issues) | [Request Feature](https://github.com/YOUR_USERNAME/wordit-game/issues)