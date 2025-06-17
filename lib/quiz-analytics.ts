// This would eventually connect to your analytics/database
// For now, we'll simulate real data

export interface QuizAnalytics {
  id: string
  totalTakes: number
  recentTakes: number // Last 7 days
  completionRate: number // Percentage who finish
  shareRate: number // Percentage who share results
  avgRating: number // User ratings 1-5
  trendingScore: number // Calculated trending score
  lastUpdated: Date
}

// Simulated analytics data - replace with real data from your analytics
export const quizAnalytics: QuizAnalytics[] = [
  {
    id: "core-personality",
    totalTakes: 0,
    recentTakes: 0,
    completionRate: 0,
    shareRate: 0,
    avgRating: 0,
    trendingScore: 0,
    lastUpdated: new Date(),
  },
  {
    id: "animal-personality",
    totalTakes: 2100000,
    recentTakes: 45000,
    completionRate: 87,
    shareRate: 34,
    avgRating: 4.6,
    trendingScore: 0,
    lastUpdated: new Date(),
  },
  {
    id: "movie-character",
    totalTakes: 1800000,
    recentTakes: 52000, // Higher recent activity
    completionRate: 91,
    shareRate: 41,
    avgRating: 4.8,
    trendingScore: 0,
    lastUpdated: new Date(),
  },
  {
    id: "career-match",
    totalTakes: 1200000,
    recentTakes: 28000,
    completionRate: 89,
    shareRate: 29,
    avgRating: 4.4,
    trendingScore: 0,
    lastUpdated: new Date(),
  },
  {
    id: "travel-destination",
    totalTakes: 890000,
    recentTakes: 35000,
    completionRate: 85,
    shareRate: 38,
    avgRating: 4.5,
    trendingScore: 0,
    lastUpdated: new Date(),
  },
  {
    id: "food-personality",
    totalTakes: 650000,
    recentTakes: 22000,
    completionRate: 82,
    shareRate: 31,
    avgRating: 4.3,
    trendingScore: 0,
    lastUpdated: new Date(),
  },
  {
    id: "color-personality",
    totalTakes: 720000,
    recentTakes: 18000,
    completionRate: 88,
    shareRate: 33,
    avgRating: 4.4,
    trendingScore: 0,
    lastUpdated: new Date(),
  },
  {
    id: "house-style",
    totalTakes: 420000,
    recentTakes: 15000,
    completionRate: 86,
    shareRate: 27,
    avgRating: 4.2,
    trendingScore: 0,
    lastUpdated: new Date(),
  },
  {
    id: "workout-type",
    totalTakes: 380000,
    recentTakes: 25000, // Trending up
    completionRate: 84,
    shareRate: 35,
    avgRating: 4.3,
    trendingScore: 0,
    lastUpdated: new Date(),
  },
  {
    id: "music-genre",
    totalTakes: 560000,
    recentTakes: 20000,
    completionRate: 87,
    shareRate: 32,
    avgRating: 4.5,
    trendingScore: 0,
    lastUpdated: new Date(),
  },
]

// Calculate trending score based on multiple factors
export function calculateTrendingScore(analytics: QuizAnalytics): number {
  const { totalTakes, recentTakes, completionRate, shareRate, avgRating } = analytics

  // Normalize values (0-1 scale)
  const maxRecentTakes = Math.max(...quizAnalytics.map((q) => q.recentTakes))
  const normalizedRecent = recentTakes / maxRecentTakes

  const normalizedCompletion = completionRate / 100
  const normalizedShare = shareRate / 100
  const normalizedRating = avgRating / 5

  // Weighted trending score
  const trendingScore =
    normalizedRecent * 0.4 + // 40% recent activity
    normalizedCompletion * 0.2 + // 20% completion rate
    normalizedShare * 0.25 + // 25% share rate
    normalizedRating * 0.15 // 15% user rating

  return Math.round(trendingScore * 100) / 100
}

// Update all trending scores
export function updateTrendingScores(): QuizAnalytics[] {
  return quizAnalytics.map((quiz) => ({
    ...quiz,
    trendingScore: calculateTrendingScore(quiz),
    lastUpdated: new Date(),
  }))
}

// Get analytics for a specific quiz
export function getQuizAnalytics(quizId: string): QuizAnalytics | undefined {
  return quizAnalytics.find((analytics) => analytics.id === quizId)
}

// Format numbers for display
export function formatTakeCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`
  }
  return count.toString()
}
