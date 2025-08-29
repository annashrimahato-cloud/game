'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface WordEntry {
  word: string
  score: number
  timestamp: number
}

export default function WorditGame() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes in seconds
  const [inputWord, setInputWord] = useState('')
  const [words, setWords] = useState<WordEntry[]>([])
  const [totalScore, setTotalScore] = useState(0)
  const [gameEnded, setGameEnded] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const START_LETTER = 'A'
  const END_LETTER = 'E'

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !gameEnded) {
      setGameEnded(true)
    }
  }, [timeLeft, gameEnded])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current && !gameEnded) {
      inputRef.current.focus()
    }
  }, [gameEnded])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const validateWord = async (word: string): Promise<{ isValid: boolean; reason?: string }> => {
    const trimmedWord = word.trim().toLowerCase()
    
    // Check if word starts and ends with correct letters
    if (!trimmedWord.startsWith(START_LETTER.toLowerCase()) || 
        !trimmedWord.endsWith(END_LETTER.toLowerCase())) {
      return { isValid: false, reason: 'format' }
    }
    
    // Check if word is already used
    if (words.some(entry => entry.word.toLowerCase() === trimmedWord)) {
      return { isValid: false, reason: 'duplicate' }
    }
    
    // Check if word is at least 2 letters long
    if (trimmedWord.length < 2) {
      return { isValid: false, reason: 'length' }
    }
    
    // Check if word exists in English dictionary
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${trimmedWord}`)
      if (!response.ok) {
        return { isValid: false, reason: 'dictionary' }
      }
      return { isValid: true }
    } catch (error) {
      // If API fails, we'll be lenient and accept the word
      console.warn('Dictionary API failed, accepting word:', error)
      return { isValid: true }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (gameEnded) return
    
    const trimmedWord = inputWord.trim()
    if (!trimmedWord) return
    
    setErrorMessage('')
    setSuccessMessage('')
    setIsValidating(true)
    
    try {
      const validation = await validateWord(trimmedWord)
      
      if (validation.isValid) {
        const newWord: WordEntry = {
          word: trimmedWord,
          score: trimmedWord.length,
          timestamp: Date.now()
        }
        
        setWords(prev => [...prev, newWord])
        setTotalScore(prev => prev + trimmedWord.length)
        setInputWord('')
        setSuccessMessage(`✅ "${trimmedWord}" added! +${trimmedWord.length} points`)
        
        // Clear success message after 2 seconds
        setTimeout(() => setSuccessMessage(''), 2000)
      } else {
        if (validation.reason === 'format') {
          if (!trimmedWord.startsWith(START_LETTER.toLowerCase())) {
            setErrorMessage(`Word must start with "${START_LETTER}"`)
          } else if (!trimmedWord.endsWith(END_LETTER.toLowerCase())) {
            setErrorMessage(`Word must end with "${END_LETTER}"`)
          }
        } else if (validation.reason === 'duplicate') {
          setErrorMessage('Word already used!')
        } else if (validation.reason === 'length') {
          setErrorMessage('Word must be at least 2 letters long')
        } else if (validation.reason === 'dictionary') {
          setErrorMessage('❌ Not an appropriate English word.')
        } else {
          setErrorMessage('Invalid word!')
        }
      }
    } finally {
      setIsValidating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  const handleGameEnd = () => {
    // Navigate to results page with game data
    const gameData = {
      totalScore,
      words,
      timeUsed: 180 - timeLeft
    }
    localStorage.setItem('worditGameData', JSON.stringify(gameData))
    router.push('/results')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Wordit</h1>
          <div className="text-sm text-gray-600 mb-4">
            Start with <span className="font-bold text-blue-600">{START_LETTER}</span> • 
            End with <span className="font-bold text-blue-600">{END_LETTER}</span>
          </div>
          <button
            onClick={() => router.push('/challenge')}
            className="text-blue-600 hover:text-blue-700 text-sm underline"
          >
            📤 Share Challenge
          </button>
        </div>

        {/* Timer */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-gray-800">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-500">Time Remaining</div>
          </div>
        </div>

        {/* Score */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{totalScore}</div>
            <div className="text-sm text-gray-500">Total Score</div>
          </div>
        </div>

        {/* Input Form */}
        {!gameEnded ? (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputWord}
                  onChange={(e) => setInputWord(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isValidating ? "Checking word..." : "Type a word..."}
                  className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  disabled={gameEnded || isValidating}
                />
                {isValidating && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
              {errorMessage && (
                <div className="mt-2 text-sm text-red-600">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="mt-2 text-sm text-green-600">{successMessage}</div>
              )}
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800 mb-2">Time's Up!</div>
              <button
                onClick={handleGameEnd}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Results
              </button>
            </div>
          </div>
        )}

        {/* Words List */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Words ({words.length})</h3>
          {words.length === 0 ? (
            <div className="text-gray-500 text-center py-4">No words yet...</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {words.map((entry, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-800 font-medium">{entry.word}</span>
                  <span className="text-green-600 font-bold">+{entry.score}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
