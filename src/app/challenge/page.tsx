'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ChallengePage() {
  const router = useRouter()
  const [challengeCode, setChallengeCode] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isJoining, setIsJoining] = useState(false)

  const handleCreateChallenge = () => {
    setIsCreating(true)
    // Simulate creating a challenge code
    setTimeout(() => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      setChallengeCode(code)
      setIsCreating(false)
    }, 1000)
  }

  const handleJoinChallenge = () => {
    if (!challengeCode.trim()) return
    
    setIsJoining(true)
    // Simulate joining a challenge
    setTimeout(() => {
      setIsJoining(false)
      router.push('/game')
    }, 1000)
  }

  const handleBackToGame = () => {
    router.push('/game')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Challenge</h1>
          <p className="text-gray-600">Play with friends</p>
        </div>

        {/* Create Challenge */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Challenge</h2>
          <p className="text-gray-600 text-sm mb-4">
            Create a challenge code to share with friends
          </p>
          
          {challengeCode ? (
            <div className="text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-600 mb-2">Challenge Code</div>
                <div className="text-2xl font-mono font-bold text-blue-600">{challengeCode}</div>
              </div>
              <button
                onClick={() => setChallengeCode('')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Create New Code
              </button>
            </div>
          ) : (
            <button
              onClick={handleCreateChallenge}
              disabled={isCreating}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isCreating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating...
                </div>
              ) : (
                'Create Challenge'
              )}
            </button>
          )}
        </div>

        {/* Join Challenge */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Join Challenge</h2>
          <p className="text-gray-600 text-sm mb-4">
            Enter a challenge code from a friend
          </p>
          
          <div className="space-y-4">
            <input
              type="text"
              value={challengeCode}
              onChange={(e) => setChallengeCode(e.target.value)}
              placeholder="Enter challenge code"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={6}
            />
            
            <button
              onClick={handleJoinChallenge}
              disabled={!challengeCode.trim() || isJoining}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isJoining ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Joining...
                </div>
              ) : (
                'Join Challenge'
              )}
            </button>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBackToGame}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Back to Game
        </button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Want to share your score? Complete a game first!
          </p>
        </div>
      </div>
    </div>
  )
}
