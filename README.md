# Wordit Game

A Next.js word game application built with TypeScript and TailwindCSS.

## Features

- **Wordit Game**: A word-building game where players create words starting with 'A' and ending with 'E'
- **3-minute countdown timer** with live updates
- **Real-time scoring** based on word length
- **Input validation** to ensure words meet game rules
- **Clean, mobile-first UI** with TailwindCSS
- **Score sharing** with unique links and social features
- **Multiple pages**: Login, Game, Results, Challenge, and Shared Results

## Game Rules

- Words must start with "A" and end with "E"
- Each word scores points equal to its length
- Words cannot be repeated
- Players have 3 minutes to find as many valid words as possible

## Pages

- `/login` - Enter player name to start
- `/game` - Main Wordit game screen
- `/results` - View game results and statistics with sharing options
- `/challenge` - Create or join challenges with friends
- `/shared/[id]` - View shared game results and challenge others

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **React Hooks** for state management

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── login/page.tsx      # Login page
│   ├── game/page.tsx       # Main game screen
│   ├── results/page.tsx    # Results page with sharing
│   ├── challenge/page.tsx  # Challenge page
│   ├── shared/[id]/page.tsx # Shared results page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (redirects to login)
│   └── globals.css         # Global styles
└── components/             # Reusable components
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Mobile-First Design

The application is designed with a mobile-first approach using TailwindCSS responsive utilities. All pages are optimized for mobile devices and scale up to desktop screens.