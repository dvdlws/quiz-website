"use client"

import type React from "react"
import type { Quiz } from "@/lib/quiz-data"
import { QuizCard } from "./quiz-card"

interface QuizSectionProps {
  title: string
  icon: React.ReactNode
  quizzes: Quiz[]
  showStats?: boolean
}

export function QuizSection({ title, icon, quizzes, showStats = false }: QuizSectionProps) {
  return (
    <div className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        {icon}
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} showStats={showStats} />
        ))}
      </div>
    </div>
  )
}
