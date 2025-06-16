import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import type { Quiz } from "@/lib/quiz-data"

interface QuizCardProps {
  quiz: Quiz
  showStats?: boolean
}

export function QuizCard({ quiz, showStats = false }: QuizCardProps) {
  const IconComponent = quiz.icon

  return (
    <Card className="group hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2 border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 overflow-hidden">
      {/* Quiz Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={`/images/quiz/${quiz.image}`}
          alt={quiz.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Fallback to placeholder if image doesn't exist
            e.currentTarget.src = "/placeholder.svg?height=192&width=384&text=Quiz+Image"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

        {/* Trending Badge */}
        {quiz.trending && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </Badge>
        )}

        {/* Icon Overlay */}
        <div className="absolute bottom-3 left-3">
          <div
            className={`w-10 h-10 rounded-lg ${quiz.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-tight">
          {quiz.title}
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm leading-relaxed">{quiz.description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-xs text-gray-500">
            <span>{quiz.questions} questions • 3 min</span>
            {showStats && <span className="text-purple-400 font-medium">{quiz.takes} takes</span>}
          </div>
          <Link href={`/quiz/${quiz.id}`}>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 text-sm">
              Start Quiz
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
