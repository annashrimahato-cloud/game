'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { airtableAPI, SharedScoreData } from '@/lib/airtable'

interface ShareData {
  id?: string
  username: string
  score: number
  wordsCount: number
  timeUsed: number
  date: string
  words: Array<{
    word: string
    score: number
    timestamp: number
  }>
}

export default function SharedResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [shareData, setShareData] = useState<ShareData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSharedScore = async () => {
      try {
        // Try to get shared score from Airtable
        const data = await airtableAPI.getSharedScore(params.id)
        
        if (data) {
          setShareData(data)
        } else {
          setError('Score not found or has expired')
        }
      } catch (error) {
        console.error('Error loading shared score:', error)
        setError('Failed to load score')
      } finally {
        setLoading(false)
      }
    }

    loadSharedScore()
  }, [params.id])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handlePlayNow = () => {
    router.push('/login')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Wordit Challenge',
        text: `🔥 ${shareData?.username} scored ${shareData?.score} points in Wordit! Can you beat this score?`,
        url: window.location.href
      })
    } else {
      // Fallback to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('Link copied to clipboard!')
        })
      } else {
        prompt('Copy this link to share:', window.location.href)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading score...</p>
        </div>
      </div>
    )
  }

  if (error || !shareData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Score Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'This score may have expired or been removed.'}</p>
            <button
              onClick={handlePlayNow}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Play Wordit Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🔥 Wordit Challenge</h1>
          <p className="text-gray-600">Can you beat this score?</p>
        </div>

        {/* Score Display */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{shareData.score}</div>
            <div className="text-lg text-gray-600 mb-4">points</div>
            
            <div className="text-xl font-semibold text-gray-800 mb-2">
              🔥 {shareData.username} scored {shareData.score} points in Wordit!
            </div>
            
            <div className="text-sm text-gray-500 mb-4">
              {formatDate(shareData.date)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Words Found</div>
                <div className="text-xl font-semibold text-gray-800">{shareData.wordsCount}</div>
              </div>
              <div>
                <div className="text-gray-500">Time Used</div>
                <div className="text-xl font-semibold text-gray-800">{formatTime(shareData.timeUsed)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Words List */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Words Found</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {shareData.words.map((entry, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-800 font-medium">{entry.word}</span>
                <span className="text-green-600 font-bold">+{entry.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handlePlayNow}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            🎮 Play Now
          </button>
          
          <button
            onClick={handleShare}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            📤 Share Challenge
          </button>
        </div>
      </div>
    </div>
  )
}
