import { Flame, Heart, Users } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import { QuizSection } from "@/components/quiz-section"
import { getPopularQuizzes, getPersonalityQuizzes, getLifestyleQuizzes } from "@/lib/quiz-data"

export default function HomePage() {
  const popularQuizzes = getPopularQuizzes()
  const personalityQuizzes = getPersonalityQuizzes()
  const lifestyleQuizzes = getLifestyleQuizzes()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
            QuizMania
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover something new about yourself with our fun personality quizzes! Take a break and explore who you
            really are.
          </p>
        </div>

        {/* Small Mobile Banner Ad */}
        <div className="flex justify-center mb-16">
          <AdBanner size="mobile" />
        </div>

        {/* Popular Quizzes Section */}
        <QuizSection
          title="Popular Right Now"
          icon={
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
          }
          quizzes={popularQuizzes}
          showStats={true}
        />

        {/* Prominent Leaderboard Ad after Popular Section */}
        <div className="flex justify-center mb-20">
          <AdBanner size="leaderboard" />
        </div>

        {/* Personality Category */}
        <QuizSection
          title="Personality & Identity"
          icon={
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
          }
          quizzes={personalityQuizzes}
        />

        {/* Content Ad */}
        <div className="flex justify-center mb-20">
          <AdBanner size="rectangle" />
        </div>

        {/* Lifestyle Category */}
        <QuizSection
          title="Lifestyle & Preferences"
          icon={
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          }
          quizzes={lifestyleQuizzes}
        />

        {/* Footer */}
        <div className="text-center mt-20">
          <p className="text-gray-500 text-sm mb-4">More quizzes coming soon! Share your results with friends 🎉</p>
          <div className="flex justify-center">
            <AdBanner size="mobile" className="lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  )
}
