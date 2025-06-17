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
          <h1 className="text-6xl font-bold mb-6 relative cursor-pointer group">
  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent 
                   animate-pulse hover:animate-none transition-all duration-500
                   group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-purple-300
                   relative z-10">
    QuizMania
  </span>
  
  {/* Glistening overlay effect */}
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                   opacity-0 group-hover:opacity-20 group-hover:animate-shimmer
                   bg-size-200 transition-all duration-500 z-20 bg-clip-text text-transparent">
    QuizMania
  </span>
  
  {/* Glow effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 
                  opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 -z-10
                  group-hover:scale-110"></div>
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
