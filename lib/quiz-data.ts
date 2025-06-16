import { Brain, Heart, Sparkles, Star, Flame, Users, Zap } from "lucide-react"
import { getQuizAnalytics, updateTrendingScores, formatTakeCount } from "./quiz-analytics"

export interface Quiz {
  id: string
  title: string
  description: string
  icon: any
  color: string
  questions: number
  takes: string
  trending?: boolean
  image: string
  category: "popular" | "personality" | "lifestyle"
  trendingScore?: number
  completionRate?: number
  shareRate?: number
}

const baseQuizzes: Omit<Quiz, "takes" | "trending" | "trendingScore" | "completionRate" | "shareRate">[] = [
  {
    id: "animal-personality",
    title: "Which Animal Are You?",
    description: "Discover your spirit animal based on your personality traits!",
    icon: Heart,
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    questions: 10,
    image: "animal-personality.jpg",
    category: "popular",
  },
  {
    id: "movie-character",
    title: "Which Movie Hero Are You?",
    description: "Find out which iconic movie character matches your personality!",
    icon: Star,
    color: "bg-gradient-to-br from-purple-500 to-violet-600",
    questions: 10,
    image: "movie-character.jpg",
    category: "popular",
  },
  {
    id: "career-match",
    title: "What's Your Dream Career?",
    description: "Uncover the perfect career path that suits your interests!",
    icon: Brain,
    color: "bg-gradient-to-br from-blue-500 to-cyan-600",
    questions: 12,
    image: "career-match.jpg",
    category: "popular",
  },
  {
    id: "travel-destination",
    title: "Your Perfect Travel Destination",
    description: "Where should you go on your next adventure?",
    icon: Sparkles,
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    questions: 10,
    image: "travel-destination.jpg",
    category: "personality",
  },
  {
    id: "food-personality",
    title: "Which Food Represents You?",
    description: "Discover what your taste says about your personality!",
    icon: Heart,
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
    questions: 10,
    image: "food-personality.jpg",
    category: "personality",
  },
  {
    id: "color-personality",
    title: "What's Your True Color?",
    description: "Find the color that matches your inner self!",
    icon: Zap,
    color: "bg-gradient-to-br from-indigo-500 to-purple-600",
    questions: 10,
    image: "color-personality.jpg",
    category: "personality",
  },
  {
    id: "house-style",
    title: "Your Dream House Style",
    description: "What architectural style fits your personality?",
    icon: Users,
    color: "bg-gradient-to-br from-teal-500 to-green-600",
    questions: 10,
    image: "house-style.jpg",
    category: "lifestyle",
  },
  {
    id: "workout-type",
    title: "Your Perfect Workout",
    description: "Find the exercise routine that matches your style!",
    icon: Flame,
    color: "bg-gradient-to-br from-red-500 to-orange-600",
    questions: 10,
    image: "workout-type.jpg",
    category: "lifestyle",
  },
  {
    id: "music-genre",
    title: "Your Music Genre Match",
    description: "What music genre represents your soul?",
    icon: Star,
    color: "bg-gradient-to-br from-violet-500 to-purple-600",
    questions: 10,
    image: "music-genre.jpg",
    category: "lifestyle",
  },
]

// Enrich quizzes with real-time analytics data
function enrichQuizzesWithAnalytics(): Quiz[] {
  const updatedAnalytics = updateTrendingScores()

  return baseQuizzes.map((quiz) => {
    const analytics = getQuizAnalytics(quiz.id)

    return {
      ...quiz,
      takes: analytics ? formatTakeCount(analytics.totalTakes) : "0",
      trending: analytics ? analytics.trendingScore > 0.7 : false, // Top 30% are trending
      trendingScore: analytics?.trendingScore || 0,
      completionRate: analytics?.completionRate || 0,
      shareRate: analytics?.shareRate || 0,
    }
  })
}

// Get all quizzes with analytics
export const quizzes: Quiz[] = enrichQuizzesWithAnalytics()

// Helper functions with smart sorting
export const getPopularQuizzes = () => {
  return quizzes
    .filter((quiz) => quiz.category === "popular")
    .sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0)) // Sort by trending score
}

export const getPersonalityQuizzes = () => {
  return quizzes
    .filter((quiz) => quiz.category === "personality")
    .sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0))
}

export const getLifestyleQuizzes = () => {
  return quizzes
    .filter((quiz) => quiz.category === "lifestyle")
    .sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0))
}

export const getQuizById = (id: string) => quizzes.find((quiz) => quiz.id === id)

// Get all quizzes sorted by popularity for homepage
export const getAllQuizzesByPopularity = () => {
  return [...quizzes].sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0))
}
