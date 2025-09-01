// Airtable configuration
export const AIRTABLE_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || 'patP1aQd43AqCZpYq.dacc54c446f99bd9f0aff7cea32d4e7e6684b1e7b2dabb2bd11e790e724cd859',
  BASE_ID: process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || 'appVLi2ogum66Vw6h',
  TABLES: {
    DAILY_LETTER_PAIRS: 'Daily letter pairs',
    GAME_SCORE: 'Game Score',
    GAME_SESSION: 'Game Session',
    SHARED_SCORES: 'SharedScores'
  }
}

// Airtable API base URL
const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}`

// Helper function to make Airtable API calls
async function airtableRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${AIRTABLE_BASE_URL}/${endpoint}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${AIRTABLE_CONFIG.API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Airtable API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Game data interface
export interface GameData {
  id?: string
  username: string
  score: number
  wordsCount: number
  timeUsed: number
  words: Array<{
    word: string
    score: number
    timestamp: number
  }>
  date: string
  shareId?: string
}

// User data interface
export interface UserData {
  id?: string
  username: string
  totalGames: number
  bestScore: number
  totalScore: number
  lastPlayed: string
}

// Shared score interface
export interface SharedScoreData {
  id?: string
  shareId: string
  username: string
  score: number
  wordsCount: number
  timeUsed: number
  words: Array<{
    word: string
    score: number
    timestamp: number
  }>
  date: string
}

// Airtable API functions
export const airtableAPI = {
  // Get daily letter pair
  async getDailyLetterPair(firstLetter: string, lastLetter: string) {
    const response = await airtableRequest(
      `${AIRTABLE_CONFIG.TABLES.DAILY_LETTER_PAIRS}?filterByFormula=AND({first letter} = '${firstLetter}', {last letter} = '${lastLetter}')`
    )
    return response.records[0] || null
  },

  // Save a new game score
  async saveGameScore(gameData: GameData): Promise<string> {
    const response = await airtableRequest(`${AIRTABLE_CONFIG.TABLES.GAME_SCORE}`, {
      method: 'POST',
      body: JSON.stringify({
        records: [{
          fields: {
            username: gameData.username,
            'Total score': gameData.score,
            'Words count': gameData.wordsCount,
            'Time used': gameData.timeUsed,
            'Words list': JSON.stringify(gameData.words),
            'Date': gameData.date,
            'Share ID': gameData.shareId || ''
          }
        }]
      })
    })

    return response.records[0].id
  },

  // Save a new game session
  async saveGameSession(sessionData: {
    username: string
    sessionName: string
    letterPair: string
    date: string
    score: number
  }): Promise<string> {
    const response = await airtableRequest(`${AIRTABLE_CONFIG.TABLES.GAME_SESSION}`, {
      method: 'POST',
      body: JSON.stringify({
        records: [{
          fields: {
            'Username (Link)': sessionData.username,
            'Session Name': sessionData.sessionName,
            'Letter Pair': sessionData.letterPair,
            'Date': sessionData.date,
            'Score': sessionData.score
          }
        }]
      })
    })

    return response.records[0].id
  },

  // Get user's game sessions
  async getUserGameSessions(username: string): Promise<any[]> {
    const response = await airtableRequest(
      `${AIRTABLE_CONFIG.TABLES.GAME_SESSION}?filterByFormula={Username (Link)} = '${username}'&sort[0][field]=Date&sort[0][direction]=desc`
    )

    return response.records.map((record: any) => ({
      id: record.id,
      sessionName: record.fields['Session Name'],
      letterPair: record.fields['Letter Pair'],
      date: record.fields['Date'],
      score: record.fields['Score']
    }))
  },

  // Get leaderboard
  async getLeaderboard(): Promise<any[]> {
    const response = await airtableRequest(
      `${AIRTABLE_CONFIG.TABLES.GAME_SCORE}?sort[0][field]=Total score&sort[0][direction]=desc`
    )

    return response.records.map((record: any) => ({
      id: record.id,
      username: record.fields.username,
      score: record.fields['Total score'],
      wordsCount: record.fields['Words count'],
      timeUsed: record.fields['Time used'],
      date: record.fields['Date']
    }))
  },

  // Save shared score
  async saveSharedScore(sharedData: SharedScoreData): Promise<string> {
    const response = await airtableRequest(`${AIRTABLE_CONFIG.TABLES.SHARED_SCORES}`, {
      method: 'POST',
      body: JSON.stringify({
        records: [{
          fields: {
            ShareId: sharedData.shareId,
            Username: sharedData.username,
            Score: sharedData.score,
            WordsCount: sharedData.wordsCount,
            TimeUsed: sharedData.timeUsed,
            Words: JSON.stringify(sharedData.words),
            Date: sharedData.date
          }
        }]
      })
    })

    return response.records[0].id
  },

  // Get shared score by ID
  async getSharedScore(shareId: string): Promise<SharedScoreData | null> {
    const response = await airtableRequest(
      `${AIRTABLE_CONFIG.TABLES.SHARED_SCORES}?filterByFormula={ShareId}="${shareId}"`
    )

    if (response.records.length > 0) {
      const record = response.records[0]
      return {
        id: record.id,
        shareId: record.fields.ShareId,
        username: record.fields.Username,
        score: record.fields.Score,
        wordsCount: record.fields.WordsCount,
        timeUsed: record.fields.TimeUsed,
        words: JSON.parse(record.fields.Words || '[]'),
        date: record.fields.Date
      }
    }

    return null
  },


}
