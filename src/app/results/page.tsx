'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface GameData {
  totalScore: number
  words: Array<{
    word: string
    score: number
    timestamp: number
  }>
  timeUsed: number
}

export default function ResultsPage() {
  const router = useRouter()
  const [gameData, setGameData] = useState<GameData | null>(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const storedData = localStorage.getItem('worditGameData')
    const storedUsername = localStorage.getItem('username')
    
    if (storedData) {
      setGameData(JSON.parse(storedData))
    }
    
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayAgain = () => {
    router.push('/game')
  }

  const handleNewGame = () => {
    localStorage.removeItem('worditGameData')
    router.push('/login')
  }

  const handleShareScore = () => {
    if (!gameData || !username) return
    
    // Generate a unique share ID
    const shareId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    
    // Create share data
    const shareData = {
      id: shareId,
      username: username,
      score: gameData.totalScore,
      wordsCount: gameData.words.length,
      timeUsed: gameData.timeUsed,
      date: new Date().toISOString(),
      words: gameData.words
    }
    
    // Store share data in localStorage (in a real app, this would go to a database)
    const existingShares = JSON.parse(localStorage.getItem('worditShares') || '{}')
    existingShares[shareId] = shareData
    localStorage.setItem('worditShares', JSON.stringify(existingShares))
    
    // Create share URL
    const shareUrl = `${window.location.origin}/shared/${shareId}`
    
    // Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Score shared! Link copied to clipboard.')
      }).catch(() => {
        // Fallback for older browsers
        prompt('Copy this link to share your score:', shareUrl)
      })
    } else {
      // Fallback for older browsers
      prompt('Copy this link to share your score:', shareUrl)
    }
  }

  if (!gameData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Game Results</h1>
          {username && (
            <p className="text-gray-600">Good job, {username}!</p>
          )}
        </div>

        {/* Score Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{gameData.totalScore}</div>
            <div className="text-lg text-gray-600 mb-4">Total Score</div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Words Found</div>
                <div className="text-xl font-semibold text-gray-800">{gameData.words.length}</div>
              </div>
              <div>
                <div className="text-gray-500">Time Used</div>
                <div className="text-xl font-semibold text-gray-800">{formatTime(gameData.timeUsed)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Words List */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">All Words</h3>
          {gameData.words.length === 0 ? (
            <div className="text-gray-500 text-center py-4">No words found</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {gameData.words.map((entry, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-800 font-medium">{entry.word}</span>
                  <span className="text-green-600 font-bold">+{entry.score}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleShareScore}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            🔥 Share My Score
          </button>
          
          <button
            onClick={handlePlayAgain}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Play Again
          </button>
          
          <button
            onClick={handleNewGame}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}
