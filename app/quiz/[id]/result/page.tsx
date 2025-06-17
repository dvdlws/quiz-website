"use client"

import { useParams, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw, Twitter, Facebook, Copy, Check, Mail, MessageCircle, Send, Camera } from "lucide-react"
import Link from "next/link"
import { AdBanner } from "@/components/ad-banner"
import { useState } from "react"

// Define the result type
interface QuizResult {
  animal: string
  description: string
  traits: string[]
  emoji: string
}

// Define the quiz data type
interface QuizData {
  title: string
  results: Record<string, QuizResult>
}

const quizData: Record<string, QuizData> = {
  "animal-personality": {
    title: "Which Animal Are You?",
    results: {
      lion: {
        animal: "Lion",
        description:
          "You're a natural born leader! Confident, ambitious, and brave, you're not afraid to take charge and pursue your goals. You inspire others with your strength and determination.",
        traits: ["Leadership", "Confidence", "Ambition", "Courage"],
        emoji: "🦁",
      },
      wolf: {
        animal: "Wolf",
        description:
          "You're incredibly loyal and value deep connections. You work best as part of a team and will fiercely protect those you care about. Your intuition and wisdom guide you.",
        traits: ["Loyalty", "Teamwork", "Intuition", "Protection"],
        emoji: "🐺",
      },
      cat: {
        animal: "Cat",
        description:
          "You're independent and mysterious! You value your freedom and prefer to do things your own way. You're observant, intelligent, and selective about who you let into your inner circle.",
        traits: ["Independence", "Mystery", "Intelligence", "Selectivity"],
        emoji: "🐱",
      },
      dolphin: {
        animal: "Dolphin",
        description:
          "You're playful, intelligent, and social! You bring joy wherever you go and have a natural ability to connect with others. Your optimism and creativity make you a delight to be around.",
        traits: ["Playfulness", "Intelligence", "Social", "Optimism"],
        emoji: "🐬",
      },
    },
  },
  "movie-character": {
    title: "Which Movie Hero Are You?",
    results: {
      superman: {
        animal: "Superman",
        description:
          "You're the embodiment of hope and goodness! You have strong moral values and always try to do the right thing. People look up to you as a source of inspiration and strength.",
        traits: ["Moral Integrity", "Hope", "Strength", "Compassion"],
        emoji: "🦸‍♂️",
      },
      batman: {
        animal: "Batman",
        description:
          "You're the strategic mastermind! You believe in preparation, intelligence, and using your resources wisely. You're driven by a strong sense of justice and won't stop until you achieve your goals.",
        traits: ["Strategy", "Intelligence", "Justice", "Determination"],
        emoji: "🦇",
      },
      captain: {
        animal: "Captain America",
        description:
          "You're a natural leader with unwavering principles! You inspire others to be their best selves and always put the team first. Your courage and integrity make you someone others want to follow.",
        traits: ["Leadership", "Integrity", "Courage", "Team Spirit"],
        emoji: "🛡️",
      },
      rocky: {
        animal: "Rocky Balboa",
        description:
          "You're the ultimate underdog with heart! You may not always be the strongest or fastest, but your determination and never-give-up attitude make you unstoppable. You inspire others to chase their dreams.",
        traits: ["Perseverance", "Heart", "Humility", "Determination"],
        emoji: "🥊",
      },
    },
  },
  "career-match": {
    title: "What's Your Dream Career?",
    results: {
      engineer: {
        animal: "Engineer/Developer",
        description:
          "You're a problem-solver at heart! You love building things, whether it's software, systems, or solutions. You thrive on logical thinking, continuous learning, and creating technology that makes life better.",
        traits: ["Analytical", "Innovative", "Detail-Oriented", "Logical"],
        emoji: "👨‍💻",
      },
      teacher: {
        animal: "Educator/Mentor",
        description:
          "You're passionate about helping others grow and learn! You find fulfillment in sharing knowledge, inspiring others, and making a positive impact on people's lives. You're a natural communicator and leader.",
        traits: ["Empathetic", "Patient", "Inspiring", "Communicative"],
        emoji: "👩‍🏫",
      },
      artist: {
        animal: "Creative Professional",
        description:
          "You're driven by creativity and self-expression! Whether it's visual arts, writing, music, or design, you need to create to feel fulfilled. You see the world differently and aren't afraid to take creative risks.",
        traits: ["Creative", "Intuitive", "Expressive", "Visionary"],
        emoji: "🎨",
      },
      entrepreneur: {
        animal: "Business Leader",
        description:
          "You're a natural entrepreneur and leader! You love taking risks, building teams, and turning ideas into reality. You thrive in dynamic environments and are motivated by the challenge of building something from nothing.",
        traits: ["Ambitious", "Risk-Taking", "Leadership", "Visionary"],
        emoji: "💼",
      },
    },
  },
  "travel-destination": {
    title: "Your Perfect Travel Destination",
    results: {
      newzealand: {
        animal: "New Zealand",
        description:
          "You're an adventure seeker who craves excitement and natural beauty! New Zealand offers the perfect mix of adrenaline-pumping activities, stunning landscapes, and friendly culture. From bungee jumping to hiking, you'll never be bored!",
        traits: ["Adventurous", "Active", "Nature-Loving", "Spontaneous"],
        emoji: "🏔️",
      },
      japan: {
        animal: "Japan",
        description:
          "You're drawn to rich culture, tradition, and unique experiences! Japan offers an incredible blend of ancient traditions and modern innovation. You'll love the temples, cuisine, art, and the respectful, organized culture.",
        traits: ["Cultural", "Respectful", "Curious", "Mindful"],
        emoji: "🏯",
      },
      maldives: {
        animal: "Maldives",
        description:
          "You deserve pure luxury and relaxation! The Maldives offers pristine beaches, crystal-clear waters, and world-class resorts. You'll love disconnecting from the world and indulging in spa treatments and tropical paradise.",
        traits: ["Relaxed", "Luxury-Loving", "Peaceful", "Romantic"],
        emoji: "🏝️",
      },
      iceland: {
        animal: "Iceland",
        description:
          "You're fascinated by dramatic natural beauty and unique experiences! Iceland offers otherworldly landscapes, from glaciers to geysers to northern lights. You'll love the raw power of nature and the cozy Nordic culture.",
        traits: ["Adventurous", "Nature-Loving", "Unique", "Contemplative"],
        emoji: "🌋",
      },
    },
  },
  "food-personality": {
    title: "Which Food Represents You?",
    results: {
      pizza: {
        animal: "Pizza",
        description:
          "You're the ultimate crowd-pleaser! Just like pizza, you're loved by almost everyone, bring people together, and make any gathering better. You're reliable, fun, and have a gift for making others feel included and happy.",
        traits: ["Social", "Reliable", "Fun-Loving", "Inclusive"],
        emoji: "🍕",
      },
      sushi: {
        animal: "Sushi",
        description:
          "You're sophisticated and artistic! Like sushi, you appreciate craftsmanship, attention to detail, and unique experiences. You're cultured, adventurous, and bring an element of elegance to everything you do.",
        traits: ["Sophisticated", "Artistic", "Adventurous", "Refined"],
        emoji: "🍣",
      },
      chocolate: {
        animal: "Chocolate",
        description:
          "You're pure comfort and sweetness! Like chocolate, you're there for people during both celebrations and tough times. You're emotionally supportive, nurturing, and have a gift for making others feel better.",
        traits: ["Nurturing", "Comforting", "Sweet", "Emotionally Supportive"],
        emoji: "🍫",
      },
      wine: {
        animal: "Wine",
        description:
          "You're refined and get better with time! Like fine wine, you appreciate the finer things in life and bring sophistication to any situation. You're thoughtful, cultured, and know how to savor life's moments.",
        traits: ["Sophisticated", "Thoughtful", "Cultured", "Refined"],
        emoji: "🍷",
      },
    },
  },
  "color-personality": {
    title: "What's Your True Color?",
    results: {
      red: {
        animal: "Red - The Achiever",
        description:
          "You're passionate, driven, and full of energy! Red represents your bold nature and determination to succeed. You're a natural leader who isn't afraid to take risks and make things happen. Your enthusiasm is contagious!",
        traits: ["Passionate", "Determined", "Bold", "Leadership"],
        emoji: "❤️",
      },
      blue: {
        animal: "Blue - The Harmonizer",
        description:
          "You're calm, trustworthy, and deeply caring! Blue represents your peaceful nature and desire to help others. You're the person people turn to for support, and you have a gift for bringing people together and creating harmony.",
        traits: ["Trustworthy", "Caring", "Peaceful", "Supportive"],
        emoji: "💙",
      },
      purple: {
        animal: "Purple - The Visionary",
        description:
          "You're creative, intuitive, and unique! Purple represents your artistic soul and innovative thinking. You see the world differently and aren't afraid to express your individuality. You inspire others with your creativity and vision.",
        traits: ["Creative", "Intuitive", "Unique", "Visionary"],
        emoji: "💜",
      },
      green: {
        animal: "Green - The Balancer",
        description:
          "You're balanced, growth-oriented, and naturally wise! Green represents your connection to nature and desire for harmony. You're patient, reliable, and have a gift for seeing the big picture and finding sustainable solutions.",
        traits: ["Balanced", "Growth-Oriented", "Patient", "Wise"],
        emoji: "💚",
      },
    },
  },
  "house-style": {
    title: "Your Dream House Style",
    results: {
      farmhouse: {
        animal: "Farmhouse Style",
        description:
          "You love warmth, comfort, and authentic charm! Your ideal home features natural materials, vintage touches, and spaces that bring family together. You appreciate the beauty in imperfection and value comfort over formality.",
        traits: ["Cozy", "Authentic", "Family-Oriented", "Natural"],
        emoji: "🏡",
      },
      traditional: {
        animal: "Traditional Style",
        description:
          "You appreciate timeless elegance and classic beauty! Your ideal home features rich materials, formal layouts, and pieces that never go out of style. You value quality craftsmanship and sophisticated design.",
        traits: ["Elegant", "Timeless", "Sophisticated", "Quality-Focused"],
        emoji: "🏛️",
      },
      modern: {
        animal: "Modern Style",
        description:
          "You love clean lines, simplicity, and functionality! Your ideal home is uncluttered, serene, and focuses on the essentials. You appreciate minimalist design and the beauty of empty space.",
        traits: ["Minimalist", "Functional", "Serene", "Uncluttered"],
        emoji: "🏢",
      },
      contemporary: {
        animal: "Contemporary Style",
        description:
          "You love staying current and mixing different styles! Your ideal home is dynamic, fresh, and reflects current trends while maintaining your personal style. You're not afraid to make bold design choices.",
        traits: ["Trendy", "Dynamic", "Bold", "Eclectic"],
        emoji: "🏠",
      },
    },
  },
  "workout-type": {
    title: "Your Perfect Workout",
    results: {
      yoga: {
        animal: "Yoga & Mindfulness",
        description:
          "You're drawn to the mind-body connection and inner peace! Yoga, Pilates, and mindful movement practices are perfect for you. You value flexibility, balance, and the mental clarity that comes from focused, intentional movement.",
        traits: ["Mindful", "Balanced", "Patient", "Introspective"],
        emoji: "🧘‍♀️",
      },
      hiit: {
        animal: "High-Intensity Training",
        description:
          "You love intensity and maximum efficiency! HIIT, CrossFit, and high-energy workouts are your jam. You thrive on pushing your limits, love a good sweat, and appreciate workouts that deliver maximum results in minimum time.",
        traits: ["Intense", "Efficient", "Competitive", "Determined"],
        emoji: "💪",
      },
      strength: {
        animal: "Strength Training",
        description:
          "You're motivated by progress and building power! Weight lifting, bodybuilding, and strength-focused workouts appeal to you. You love seeing measurable improvements and appreciate the discipline required for consistent gains.",
        traits: ["Progressive", "Disciplined", "Goal-Oriented", "Strong"],
        emoji: "🏋️‍♀️",
      },
      dance: {
        animal: "Dance & Movement",
        description:
          "You believe fitness should be fun and expressive! Dance fitness, Zumba, and creative movement classes are perfect for you. You love the social aspect, the music, and how movement can be both artistic and athletic.",
        traits: ["Creative", "Social", "Joyful", "Expressive"],
        emoji: "💃",
      },
    },
  },
  "music-genre": {
    title: "Your Music Genre Match",
    results: {
      rock: {
        animal: "Rock & Alternative",
        description:
          "You're drawn to power, energy, and raw emotion! Rock music speaks to your soul with its driving rhythms, powerful vocals, and rebellious spirit. You love music that motivates you and isn't afraid to make a statement.",
        traits: ["Energetic", "Passionate", "Rebellious", "Motivating"],
        emoji: "🎸",
      },
      indie: {
        animal: "Indie & Alternative",
        description:
          "You appreciate artistry, creativity, and unique expression! Indie music appeals to your sophisticated taste and love for discovering hidden gems. You value authenticity and artistic integrity over mainstream appeal.",
        traits: ["Creative", "Artistic", "Sophisticated", "Independent"],
        emoji: "🎵",
      },
      electronic: {
        animal: "Electronic & Dance",
        description:
          "You love energy, innovation, and music that makes you move! Electronic music speaks to your love of technology, rhythm, and the communal experience of dance. You appreciate both the artistry and the party.",
        traits: ["Energetic", "Innovative", "Social", "Rhythmic"],
        emoji: "🎧",
      },
      folk: {
        animal: "Folk & Acoustic",
        description:
          "You're drawn to authenticity, storytelling, and emotional connection! Folk music speaks to your soul with its honest lyrics, acoustic instruments, and timeless melodies. You value substance and genuine human expression.",
        traits: ["Authentic", "Emotional", "Storytelling", "Timeless"],
        emoji: "🎻",
      },
    },
  },
}

export default function ResultPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const quizId = params.id as string
  const resultKey = searchParams.get("result")
  const [copied, setCopied] = useState(false)

  const quiz = quizData[quizId]
  const result = quiz?.results[resultKey || ""] as QuizResult | undefined

  if (!quiz || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center bg-gray-900/50 border-gray-800">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4 text-white">Result Not Found</h2>
            <p className="text-gray-400 mb-4">Sorry, we couldn't find your quiz result.</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const shareText = `I'm a ${result.animal}! ${result.emoji} I just took the "${quiz.title}" quiz and got ${result.animal}! ${result.description}`
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shortShareText = `I'm a ${result.animal}! ${result.emoji} Take the quiz to find out what you are!`

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shortShareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=QuizMania,PersonalityQuiz`
    window.open(twitterUrl, "_blank")
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(facebookUrl, "_blank")
  }

  const handleInstagramShare = () => {
    // Instagram doesn't have direct URL sharing, so we copy text for stories
    navigator.clipboard.writeText(`${shortShareText} ${shareUrl}`)
    alert("Text copied! Paste this in your Instagram story and add a screenshot of your result! 📸")
  }

  const handleRedditShare = () => {
    const redditTitle = `I got ${result.animal} ${result.emoji} on this personality quiz!`
    const redditUrl = `https://reddit.com/submit?title=${encodeURIComponent(redditTitle)}&url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    window.open(redditUrl, "_blank")
  }

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleTelegramShare = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    window.open(telegramUrl, "_blank")
  }

  const handleEmailShare = () => {
    const subject = `Check out my quiz result: I'm a ${result.animal}! ${result.emoji}`
    const body = `Hey!

I just took this fun personality quiz and got ${result.animal}! ${result.emoji}

${result.description}

Take the quiz yourself: ${shareUrl}

It's really fun and only takes a few minutes!

Cheers!`
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = emailUrl
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.log("Error copying to clipboard:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 max-w-6xl mx-auto">
          {/* Main Result Content */}
          <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Quizzes
              </Link>
            </div>

            {/* Top AdSense Banner - High visibility placement */}
            <div className="flex justify-center mb-8">
              <AdBanner size="leaderboard" />
            </div>

            <Card className="shadow-2xl border-gray-800 overflow-hidden mb-8 bg-gray-900/50 backdrop-blur-sm">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-center text-white">
                <div className="text-6xl mb-4">{result.emoji}</div>
                <h1 className="text-4xl font-bold mb-2">You're a {result.animal}!</h1>
                <p className="text-purple-100 text-lg">Quiz: {quiz.title}</p>
              </div>

              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <p className="text-lg text-gray-300 leading-relaxed">{result.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Your Key Traits:</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.traits.map((trait, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 border-purple-500/30"
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Enhanced Social Sharing Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 text-center">Share Your Result!</h3>

                  {/* Primary Social Platforms */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <Button
                      onClick={handleTwitterShare}
                      className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 text-sm"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Button>
                    <Button
                      onClick={handleFacebookShare}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 text-sm"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Button>
                    <Button
                      onClick={handleInstagramShare}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center justify-center gap-2 text-sm"
                    >
                      <Camera className="w-4 h-4" />
                      Instagram
                    </Button>
                    <Button
                      onClick={handleRedditShare}
                      className="bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center gap-2 text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Reddit
                    </Button>
                  </div>

                  {/* Messaging Platforms */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    <Button
                      onClick={handleWhatsAppShare}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </Button>
                    <Button
                      onClick={handleTelegramShare}
                      className="bg-blue-400 hover:bg-blue-500 text-white flex items-center justify-center gap-2 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      Telegram
                    </Button>
                    <Button
                      onClick={handleEmailShare}
                      className="bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center gap-2 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  </div>

                  {/* Copy Link */}
                  <div className="flex justify-center">
                    <Button
                      onClick={handleCopyLink}
                      variant="ghost"
                      className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white flex items-center gap-2"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied!" : "Copy Link"}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`/quiz/${quizId}`} className="flex-1">
                    <Button
                      variant="ghost"
                      className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Retake Quiz
                    </Button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <Button
                      variant="ghost"
                      className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700"
                    >
                      More Quizzes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Content Ad */}
            <div className="flex justify-center mb-8">
              <AdBanner size="mobile" />
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm">Want to try another quiz? Check out our other personality tests!</p>
            </div>
          </div>

          {/* Sidebar Ad - Desktop Only */}
          <div className="hidden lg:block w-[180px]">
            <div className="sticky top-8">
              <AdBanner size="skyscraper" />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Ad */}
        <div className="flex justify-center mt-8 lg:hidden">
          <AdBanner size="mobile" />
        </div>
      </div>
    </div>
  )
}
