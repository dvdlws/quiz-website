"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { AdBanner } from "@/components/ad-banner"

const quizData = {
  "animal-personality": {
    title: "Which Animal Are You?",
    questions: [
      {
        question: "What's your ideal way to spend a weekend?",
        options: [
          { text: "Exploring nature and hiking", value: "wolf" },
          { text: "Socializing with friends at a party", value: "dolphin" },
          { text: "Reading a book in a cozy spot", value: "cat" },
          { text: "Playing sports or being active", value: "lion" },
        ],
      },
      {
        question: "How do you handle stress?",
        options: [
          { text: "I face it head-on with determination", value: "lion" },
          { text: "I seek support from my pack/friends", value: "wolf" },
          { text: "I find a quiet place to think it through", value: "cat" },
          { text: "I try to stay positive and go with the flow", value: "dolphin" },
        ],
      },
      {
        question: "What's your communication style?",
        options: [
          { text: "Direct and confident", value: "lion" },
          { text: "Loyal and protective of those I care about", value: "wolf" },
          { text: "Independent and selective with my words", value: "cat" },
          { text: "Playful and friendly", value: "dolphin" },
        ],
      },
      {
        question: "What motivates you most?",
        options: [
          { text: "Leading and achieving goals", value: "lion" },
          { text: "Protecting and supporting my family/friends", value: "wolf" },
          { text: "Personal freedom and independence", value: "cat" },
          { text: "Having fun and making others happy", value: "dolphin" },
        ],
      },
      {
        question: "How do you prefer to work?",
        options: [
          { text: "Leading a team towards success", value: "lion" },
          { text: "Collaborating closely with trusted colleagues", value: "wolf" },
          { text: "Working independently on my own projects", value: "cat" },
          { text: "In a fun, creative environment with others", value: "dolphin" },
        ],
      },
      {
        question: "What's your biggest fear?",
        options: [
          { text: "Being trapped or confined", value: "cat" },
          { text: "Letting down people I care about", value: "wolf" },
          { text: "Losing control or failing", value: "lion" },
          { text: "Being alone or isolated", value: "dolphin" },
        ],
      },
      {
        question: "How do you make important decisions?",
        options: [
          { text: "Trust my instincts and act quickly", value: "lion" },
          { text: "Consult with trusted friends and family", value: "wolf" },
          { text: "Take time to think it through alone", value: "cat" },
          { text: "Consider how it affects everyone involved", value: "dolphin" },
        ],
      },
      {
        question: "What's your ideal living environment?",
        options: [
          { text: "A penthouse with a commanding view", value: "lion" },
          { text: "A cozy home surrounded by close friends", value: "wolf" },
          { text: "A private retreat away from crowds", value: "cat" },
          { text: "A vibrant community near the water", value: "dolphin" },
        ],
      },
      {
        question: "How do you handle conflict?",
        options: [
          { text: "Address it directly and decisively", value: "lion" },
          { text: "Stand by my pack and defend what's right", value: "wolf" },
          { text: "Avoid it when possible, observe from distance", value: "cat" },
          { text: "Try to find a peaceful solution for everyone", value: "dolphin" },
        ],
      },
      {
        question: "What drives you to succeed?",
        options: [
          { text: "The desire to be the best and lead others", value: "lion" },
          { text: "Protecting and providing for my loved ones", value: "wolf" },
          { text: "Personal satisfaction and independence", value: "cat" },
          { text: "Making the world a happier place", value: "dolphin" },
        ],
      },
    ],
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
    questions: [
      {
        question: "What's your greatest strength?",
        options: [
          { text: "My unwavering moral compass", value: "superman" },
          { text: "My intelligence and resourcefulness", value: "batman" },
          { text: "My ability to inspire and unite others", value: "captain" },
          { text: "My determination to never give up", value: "rocky" },
        ],
      },
      {
        question: "How do you approach challenges?",
        options: [
          { text: "With careful planning and strategy", value: "batman" },
          { text: "By rallying others to work together", value: "captain" },
          { text: "With pure heart and doing what's right", value: "superman" },
          { text: "By pushing through with grit and perseverance", value: "rocky" },
        ],
      },
      {
        question: "What drives you?",
        options: [
          { text: "Protecting the innocent", value: "superman" },
          { text: "Justice and preventing others from suffering", value: "batman" },
          { text: "Serving something greater than myself", value: "captain" },
          { text: "Proving that anyone can achieve their dreams", value: "rocky" },
        ],
      },
      {
        question: "What's your leadership style?",
        options: [
          { text: "Leading by example with integrity", value: "superman" },
          { text: "Strategic and calculated", value: "batman" },
          { text: "Inspiring and bringing out the best in others", value: "captain" },
          { text: "Humble and hardworking", value: "rocky" },
        ],
      },
      {
        question: "How do others see you?",
        options: [
          { text: "As a symbol of hope", value: "superman" },
          { text: "As someone who gets things done", value: "batman" },
          { text: "As a natural leader they can count on", value: "captain" },
          { text: "As an underdog who never gives up", value: "rocky" },
        ],
      },
      {
        question: "What's your biggest weakness?",
        options: [
          { text: "Sometimes too trusting of others", value: "superman" },
          { text: "Can become obsessed with my mission", value: "batman" },
          { text: "Put others' needs before my own", value: "captain" },
          { text: "Doubt myself despite my abilities", value: "rocky" },
        ],
      },
      {
        question: "How do you handle failure?",
        options: [
          { text: "Learn from it and stay hopeful", value: "superman" },
          { text: "Analyze what went wrong and adapt", value: "batman" },
          { text: "Rally the team and try again", value: "captain" },
          { text: "Get back up and keep fighting", value: "rocky" },
        ],
      },
      {
        question: "What's your ideal team dynamic?",
        options: [
          { text: "Being the moral center everyone looks to", value: "superman" },
          { text: "The strategist who plans everything", value: "batman" },
          { text: "The leader who brings out everyone's best", value: "captain" },
          { text: "The heart who never gives up on anyone", value: "rocky" },
        ],
      },
      {
        question: "How do you prepare for a big challenge?",
        options: [
          { text: "Trust in my values and natural abilities", value: "superman" },
          { text: "Research, plan, and prepare for every scenario", value: "batman" },
          { text: "Inspire and organize my team", value: "captain" },
          { text: "Train harder than anyone else", value: "rocky" },
        ],
      },
      {
        question: "What legacy do you want to leave?",
        options: [
          { text: "That hope and goodness always prevail", value: "superman" },
          { text: "That justice was served and evil was stopped", value: "batman" },
          { text: "That I helped others become their best selves", value: "captain" },
          { text: "That anyone can overcome any obstacle", value: "rocky" },
        ],
      },
    ],
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
    questions: [
      {
        question: "What energizes you most?",
        options: [
          { text: "Solving complex problems", value: "engineer" },
          { text: "Helping people achieve their goals", value: "teacher" },
          { text: "Creating something beautiful", value: "artist" },
          { text: "Leading teams to success", value: "entrepreneur" },
        ],
      },
      {
        question: "How do you prefer to work?",
        options: [
          { text: "Independently with minimal supervision", value: "artist" },
          { text: "In collaborative team environments", value: "teacher" },
          { text: "With cutting-edge technology and tools", value: "engineer" },
          { text: "Making strategic decisions and taking risks", value: "entrepreneur" },
        ],
      },
      {
        question: "What's your ideal work environment?",
        options: [
          { text: "A dynamic startup or corporate office", value: "entrepreneur" },
          { text: "A classroom or community center", value: "teacher" },
          { text: "A creative studio or workshop", value: "artist" },
          { text: "A tech lab or research facility", value: "engineer" },
        ],
      },
      {
        question: "What motivates you to get up in the morning?",
        options: [
          { text: "The chance to build something innovative", value: "engineer" },
          { text: "Making a positive impact on people's lives", value: "teacher" },
          { text: "Expressing my creativity and vision", value: "artist" },
          { text: "The thrill of new opportunities and challenges", value: "entrepreneur" },
        ],
      },
      {
        question: "How do you handle stress?",
        options: [
          { text: "Break it down into logical steps", value: "engineer" },
          { text: "Talk it through with others", value: "teacher" },
          { text: "Channel it into creative expression", value: "artist" },
          { text: "See it as a challenge to overcome", value: "entrepreneur" },
        ],
      },
      {
        question: "What's your learning style?",
        options: [
          { text: "Hands-on experimentation", value: "engineer" },
          { text: "Discussion and collaboration", value: "teacher" },
          { text: "Visual and experiential", value: "artist" },
          { text: "Learning by doing and failing fast", value: "entrepreneur" },
        ],
      },
      {
        question: "What kind of impact do you want to make?",
        options: [
          { text: "Advance technology and innovation", value: "engineer" },
          { text: "Educate and empower the next generation", value: "teacher" },
          { text: "Inspire and move people emotionally", value: "artist" },
          { text: "Create jobs and drive economic growth", value: "entrepreneur" },
        ],
      },
      {
        question: "How do you approach problem-solving?",
        options: [
          { text: "Systematic analysis and testing", value: "engineer" },
          { text: "Collaborative brainstorming", value: "teacher" },
          { text: "Intuitive and creative thinking", value: "artist" },
          { text: "Quick decisions and rapid iteration", value: "entrepreneur" },
        ],
      },
      {
        question: "What's your ideal work-life balance?",
        options: [
          { text: "Flexible hours with deep focus time", value: "engineer" },
          { text: "Structured schedule with meaningful interactions", value: "teacher" },
          { text: "Irregular hours driven by inspiration", value: "artist" },
          { text: "Intense work periods with freedom to travel", value: "entrepreneur" },
        ],
      },
      {
        question: "What would make you feel most successful?",
        options: [
          { text: "Building something that changes how people live", value: "engineer" },
          { text: "Seeing my students succeed and grow", value: "teacher" },
          { text: "Having my work displayed in galleries or theaters", value: "artist" },
          { text: "Building a company that outlasts me", value: "entrepreneur" },
        ],
      },
      {
        question: "How do you prefer to communicate?",
        options: [
          { text: "Through detailed documentation and specs", value: "engineer" },
          { text: "Face-to-face conversations and presentations", value: "teacher" },
          { text: "Through my creative work and artistic expression", value: "artist" },
          { text: "Persuasive pitches and networking", value: "entrepreneur" },
        ],
      },
      {
        question: "What's your relationship with risk?",
        options: [
          { text: "I prefer calculated, well-researched risks", value: "engineer" },
          { text: "I take risks when it benefits my students or community", value: "teacher" },
          { text: "I take creative risks to push artistic boundaries", value: "artist" },
          { text: "I thrive on risk and see it as opportunity", value: "entrepreneur" },
        ],
      },
    ],
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
    questions: [
      {
        question: "What's your ideal vacation vibe?",
        options: [
          { text: "Adventure and adrenaline", value: "newzealand" },
          { text: "Culture and history", value: "japan" },
          { text: "Relaxation and luxury", value: "maldives" },
          { text: "Exploration and discovery", value: "iceland" },
        ],
      },
      {
        question: "How do you prefer to travel?",
        options: [
          { text: "Backpacking and hostels", value: "newzealand" },
          { text: "Guided tours and cultural experiences", value: "japan" },
          { text: "All-inclusive resorts and spas", value: "maldives" },
          { text: "Road trips and spontaneous stops", value: "iceland" },
        ],
      },
      {
        question: "What's your ideal climate?",
        options: [
          { text: "Tropical and warm year-round", value: "maldives" },
          { text: "Four distinct seasons", value: "japan" },
          { text: "Cool and dramatic", value: "iceland" },
          { text: "Mild and temperate", value: "newzealand" },
        ],
      },
      {
        question: "What activities excite you most?",
        options: [
          { text: "Bungee jumping and extreme sports", value: "newzealand" },
          { text: "Temple visits and tea ceremonies", value: "japan" },
          { text: "Snorkeling and spa treatments", value: "maldives" },
          { text: "Hiking glaciers and seeing northern lights", value: "iceland" },
        ],
      },
      {
        question: "How do you like to eat while traveling?",
        options: [
          { text: "Street food and local markets", value: "newzealand" },
          { text: "Traditional cuisine and fine dining", value: "japan" },
          { text: "Fresh seafood and tropical fruits", value: "maldives" },
          { text: "Hearty comfort food", value: "iceland" },
        ],
      },
      {
        question: "What's your photography style?",
        options: [
          { text: "Action shots and adventure selfies", value: "newzealand" },
          { text: "Cultural moments and architectural details", value: "japan" },
          { text: "Sunset beaches and crystal clear waters", value: "maldives" },
          { text: "Dramatic landscapes and natural phenomena", value: "iceland" },
        ],
      },
      {
        question: "How do you want to feel after your trip?",
        options: [
          { text: "Accomplished and energized", value: "newzealand" },
          { text: "Culturally enriched and inspired", value: "japan" },
          { text: "Completely relaxed and recharged", value: "maldives" },
          { text: "Amazed by nature's power", value: "iceland" },
        ],
      },
      {
        question: "What's your ideal accommodation?",
        options: [
          { text: "Eco-lodges and adventure camps", value: "newzealand" },
          { text: "Traditional ryokans and boutique hotels", value: "japan" },
          { text: "Overwater bungalows and beach resorts", value: "maldives" },
          { text: "Unique stays like ice hotels or glass igloos", value: "iceland" },
        ],
      },
      {
        question: "How important is WiFi and connectivity?",
        options: [
          { text: "I want to disconnect completely", value: "maldives" },
          { text: "Good enough to share cultural experiences", value: "japan" },
          { text: "Essential for sharing adventure photos", value: "newzealand" },
          { text: "Nice to have but nature comes first", value: "iceland" },
        ],
      },
      {
        question: "What's your travel budget style?",
        options: [
          { text: "Budget-conscious but willing to splurge on experiences", value: "newzealand" },
          { text: "Mid-range with focus on authentic experiences", value: "japan" },
          { text: "Luxury all the way", value: "maldives" },
          { text: "Moderate with emphasis on unique experiences", value: "iceland" },
        ],
      },
    ],
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
    questions: [
      {
        question: "How do you approach new experiences?",
        options: [
          { text: "I dive in headfirst with enthusiasm", value: "pizza" },
          { text: "I'm adventurous but like some familiarity", value: "sushi" },
          { text: "I prefer comfort and reliability", value: "chocolate" },
          { text: "I'm sophisticated and selective", value: "wine" },
        ],
      },
      {
        question: "What's your social style?",
        options: [
          { text: "Life of the party, everyone's friend", value: "pizza" },
          { text: "Refined and cultured", value: "wine" },
          { text: "Warm and comforting to be around", value: "chocolate" },
          { text: "Unique and intriguing", value: "sushi" },
        ],
      },
      {
        question: "How do you handle stress?",
        options: [
          { text: "I gather friends and make it a group effort", value: "pizza" },
          { text: "I find a quiet moment to savor and reflect", value: "wine" },
          { text: "I seek comfort and self-care", value: "chocolate" },
          { text: "I approach it with precision and mindfulness", value: "sushi" },
        ],
      },
      {
        question: "What's your ideal Friday night?",
        options: [
          { text: "Big group gathering with lots of laughs", value: "pizza" },
          { text: "Intimate dinner party with close friends", value: "wine" },
          { text: "Cozy night in with a good movie", value: "chocolate" },
          { text: "Trying a new restaurant or experience", value: "sushi" },
        ],
      },
      {
        question: "How do people see you?",
        options: [
          { text: "Reliable, fun, and always there when needed", value: "pizza" },
          { text: "Sophisticated and cultured", value: "wine" },
          { text: "Sweet, caring, and emotionally supportive", value: "chocolate" },
          { text: "Interesting, unique, and full of surprises", value: "sushi" },
        ],
      },
      {
        question: "What's your approach to life?",
        options: [
          { text: "Keep it simple and enjoy the good times", value: "pizza" },
          { text: "Appreciate the finer things and savor moments", value: "wine" },
          { text: "Find joy in small pleasures and comfort", value: "chocolate" },
          { text: "Embrace artistry and attention to detail", value: "sushi" },
        ],
      },
      {
        question: "How do you show you care?",
        options: [
          { text: "By bringing people together", value: "pizza" },
          { text: "Through thoughtful gestures and quality time", value: "wine" },
          { text: "With warmth, hugs, and emotional support", value: "chocolate" },
          { text: "By sharing unique experiences and knowledge", value: "sushi" },
        ],
      },
      {
        question: "What's your biggest strength?",
        options: [
          { text: "I'm universally loved and bring joy", value: "pizza" },
          { text: "I add sophistication to any situation", value: "wine" },
          { text: "I provide comfort during difficult times", value: "chocolate" },
          { text: "I bring artistry and culture to life", value: "sushi" },
        ],
      },
      {
        question: "How do you prefer to celebrate?",
        options: [
          { text: "Big, casual party with everyone invited", value: "pizza" },
          { text: "Elegant gathering with fine details", value: "wine" },
          { text: "Intimate celebration focused on feelings", value: "chocolate" },
          { text: "Unique experience that's Instagram-worthy", value: "sushi" },
        ],
      },
      {
        question: "What's your life philosophy?",
        options: [
          { text: "Life's better when shared with others", value: "pizza" },
          { text: "Quality over quantity in all things", value: "wine" },
          { text: "A little sweetness makes everything better", value: "chocolate" },
          { text: "Beauty and craftsmanship matter", value: "sushi" },
        ],
      },
    ],
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
    questions: [
      {
        question: "What energizes you most?",
        options: [
          { text: "Taking action and achieving goals", value: "red" },
          { text: "Connecting with others and helping", value: "blue" },
          { text: "Creating and exploring new ideas", value: "purple" },
          { text: "Finding balance and harmony", value: "green" },
        ],
      },
      {
        question: "How do you handle challenges?",
        options: [
          { text: "Face them head-on with determination", value: "red" },
          { text: "Seek support and work through them together", value: "blue" },
          { text: "Find creative solutions and think outside the box", value: "purple" },
          { text: "Stay calm and find the most balanced approach", value: "green" },
        ],
      },
      {
        question: "What's your ideal work environment?",
        options: [
          { text: "Fast-paced and results-driven", value: "red" },
          { text: "Collaborative and people-focused", value: "blue" },
          { text: "Creative and inspiring", value: "purple" },
          { text: "Peaceful and organized", value: "green" },
        ],
      },
      {
        question: "How do you make decisions?",
        options: [
          { text: "Quickly and decisively", value: "red" },
          { text: "After considering how it affects others", value: "blue" },
          { text: "By following my intuition and creativity", value: "purple" },
          { text: "Carefully weighing all options", value: "green" },
        ],
      },
      {
        question: "What motivates you most?",
        options: [
          { text: "Competition and winning", value: "red" },
          { text: "Making a difference in people's lives", value: "blue" },
          { text: "Self-expression and innovation", value: "purple" },
          { text: "Stability and growth", value: "green" },
        ],
      },
      {
        question: "How do you prefer to communicate?",
        options: [
          { text: "Direct and to the point", value: "red" },
          { text: "Warm and empathetic", value: "blue" },
          { text: "Expressive and imaginative", value: "purple" },
          { text: "Thoughtful and diplomatic", value: "green" },
        ],
      },
      {
        question: "What's your leadership style?",
        options: [
          { text: "Bold and commanding", value: "red" },
          { text: "Supportive and inspiring", value: "blue" },
          { text: "Visionary and innovative", value: "purple" },
          { text: "Collaborative and steady", value: "green" },
        ],
      },
      {
        question: "How do you handle stress?",
        options: [
          { text: "Channel it into action and productivity", value: "red" },
          { text: "Talk it through with friends or family", value: "blue" },
          { text: "Express it through creative outlets", value: "purple" },
          { text: "Find quiet time in nature to recharge", value: "green" },
        ],
      },
      {
        question: "What's your ideal vacation?",
        options: [
          { text: "Adventure sports and exciting activities", value: "red" },
          { text: "Spending quality time with loved ones", value: "blue" },
          { text: "Exploring art, culture, and new experiences", value: "purple" },
          { text: "Relaxing in nature and peaceful settings", value: "green" },
        ],
      },
      {
        question: "What legacy do you want to leave?",
        options: [
          { text: "That I achieved great things and made an impact", value: "red" },
          { text: "That I helped others and made the world kinder", value: "blue" },
          { text: "That I created something beautiful and meaningful", value: "purple" },
          { text: "That I lived in harmony and brought peace", value: "green" },
        ],
      },
    ],
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
    questions: [
      {
        question: "What's your ideal morning routine?",
        options: [
          { text: "Coffee on a wraparound porch watching the sunrise", value: "farmhouse" },
          { text: "Meditation in a zen garden", value: "modern" },
          { text: "Reading by a large window with natural light", value: "traditional" },
          { text: "Quick breakfast in a sleek, efficient kitchen", value: "contemporary" },
        ],
      },
      {
        question: "How do you prefer to entertain guests?",
        options: [
          { text: "Big family dinners around a large table", value: "farmhouse" },
          { text: "Intimate gatherings in a cozy living room", value: "traditional" },
          { text: "Cocktail parties in an open-concept space", value: "contemporary" },
          { text: "Outdoor gatherings with clean, simple aesthetics", value: "modern" },
        ],
      },
      {
        question: "What materials appeal to you most?",
        options: [
          { text: "Reclaimed wood and natural stone", value: "farmhouse" },
          { text: "Rich hardwoods and classic fabrics", value: "traditional" },
          { text: "Glass, steel, and concrete", value: "modern" },
          { text: "Mixed textures with bold accents", value: "contemporary" },
        ],
      },
      {
        question: "How important is technology in your home?",
        options: [
          { text: "I prefer simple, functional technology", value: "farmhouse" },
          { text: "I like technology that's hidden and unobtrusive", value: "traditional" },
          { text: "I want the latest smart home features", value: "contemporary" },
          { text: "I appreciate minimalist, integrated tech", value: "modern" },
        ],
      },
      {
        question: "What's your ideal color palette?",
        options: [
          { text: "Warm whites, creams, and natural tones", value: "farmhouse" },
          { text: "Rich blues, deep greens, and warm browns", value: "traditional" },
          { text: "Black, white, and gray with minimal color", value: "modern" },
          { text: "Neutral base with bold accent colors", value: "contemporary" },
        ],
      },
      {
        question: "How do you want your home to feel?",
        options: [
          { text: "Cozy, welcoming, and lived-in", value: "farmhouse" },
          { text: "Elegant, timeless, and sophisticated", value: "traditional" },
          { text: "Calm, uncluttered, and serene", value: "modern" },
          { text: "Dynamic, fresh, and current", value: "contemporary" },
        ],
      },
      {
        question: "What's your approach to decorating?",
        options: [
          { text: "Mix vintage finds with handmade pieces", value: "farmhouse" },
          { text: "Invest in quality, classic pieces that last", value: "traditional" },
          { text: "Less is more - every piece has purpose", value: "modern" },
          { text: "Blend different styles and eras creatively", value: "contemporary" },
        ],
      },
      {
        question: "What's your ideal outdoor space?",
        options: [
          { text: "Large porch with rocking chairs and gardens", value: "farmhouse" },
          { text: "Formal garden with structured landscaping", value: "traditional" },
          { text: "Minimalist patio with clean lines", value: "modern" },
          { text: "Multi-level deck with modern outdoor furniture", value: "contemporary" },
        ],
      },
      {
        question: "How do you handle clutter?",
        options: [
          { text: "I like organized chaos with personal touches", value: "farmhouse" },
          { text: "Everything has its place in beautiful storage", value: "traditional" },
          { text: "I keep only what I absolutely need", value: "modern" },
          { text: "I use stylish storage solutions", value: "contemporary" },
        ],
      },
      {
        question: "What's most important in your home?",
        options: [
          { text: "Comfort and family gathering spaces", value: "farmhouse" },
          { text: "Elegance and timeless beauty", value: "traditional" },
          { text: "Simplicity and functionality", value: "modern" },
          { text: "Style and staying current with trends", value: "contemporary" },
        ],
      },
    ],
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
    questions: [
      {
        question: "What motivates you to exercise?",
        options: [
          { text: "The mental clarity and stress relief", value: "yoga" },
          { text: "The adrenaline rush and intensity", value: "hiit" },
          { text: "Building strength and seeing progress", value: "strength" },
          { text: "The fun and social aspect", value: "dance" },
        ],
      },
      {
        question: "How do you prefer to work out?",
        options: [
          { text: "In peaceful, mindful sessions", value: "yoga" },
          { text: "In short, intense bursts", value: "hiit" },
          { text: "With progressive, measurable goals", value: "strength" },
          { text: "With music and movement", value: "dance" },
        ],
      },
      {
        question: "What's your ideal workout environment?",
        options: [
          { text: "Quiet studio with natural light", value: "yoga" },
          { text: "High-energy gym with motivating music", value: "hiit" },
          { text: "Well-equipped weight room", value: "strength" },
          { text: "Dance studio with mirrors and great sound", value: "dance" },
        ],
      },
      {
        question: "How do you handle fitness challenges?",
        options: [
          { text: "With patience and mindful breathing", value: "yoga" },
          { text: "By pushing through with determination", value: "hiit" },
          { text: "By breaking them down into manageable steps", value: "strength" },
          { text: "By making them fun and creative", value: "dance" },
        ],
      },
      {
        question: "What's your relationship with competition?",
        options: [
          { text: "I compete with myself and focus on inner growth", value: "yoga" },
          { text: "I thrive on competition and pushing limits", value: "hiit" },
          { text: "I like tracking progress and beating personal records", value: "strength" },
          { text: "I prefer collaboration over competition", value: "dance" },
        ],
      },
      {
        question: "How much time do you prefer to spend working out?",
        options: [
          { text: "60-90 minutes for a complete practice", value: "yoga" },
          { text: "20-30 minutes of intense activity", value: "hiit" },
          { text: "45-60 minutes with proper warm-up and cool-down", value: "strength" },
          { text: "45-60 minutes that feel like they fly by", value: "dance" },
        ],
      },
      {
        question: "What do you want from your workout?",
        options: [
          { text: "Flexibility, balance, and inner peace", value: "yoga" },
          { text: "Maximum calorie burn and cardiovascular fitness", value: "hiit" },
          { text: "Muscle growth and functional strength", value: "strength" },
          { text: "Joy, creativity, and full-body coordination", value: "dance" },
        ],
      },
      {
        question: "How do you prefer to learn new exercises?",
        options: [
          { text: "Through mindful instruction and personal exploration", value: "yoga" },
          { text: "By jumping in and learning through intensity", value: "hiit" },
          { text: "With proper form instruction and gradual progression", value: "strength" },
          { text: "Through demonstration and creative expression", value: "dance" },
        ],
      },
      {
        question: "What's your ideal post-workout feeling?",
        options: [
          { text: "Centered, calm, and mentally clear", value: "yoga" },
          { text: "Exhausted but accomplished and energized", value: "hiit" },
          { text: "Strong, capable, and proud of progress", value: "strength" },
          { text: "Happy, energized, and creatively fulfilled", value: "dance" },
        ],
      },
      {
        question: "How important is the mind-body connection in your workout?",
        options: [
          { text: "It's the most important aspect", value: "yoga" },
          { text: "I focus more on physical intensity", value: "hiit" },
          { text: "I appreciate the mental focus required", value: "strength" },
          { text: "I love how movement expresses emotion", value: "dance" },
        ],
      },
    ],
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
    questions: [
      {
        question: "How do you want music to make you feel?",
        options: [
          { text: "Energized and ready to take on the world", value: "rock" },
          { text: "Relaxed and emotionally connected", value: "indie" },
          { text: "Pumped up and ready to dance", value: "electronic" },
          { text: "Nostalgic and deeply moved", value: "folk" },
        ],
      },
      {
        question: "When do you listen to music most?",
        options: [
          { text: "During workouts or when I need motivation", value: "rock" },
          { text: "While working, studying, or relaxing", value: "indie" },
          { text: "At parties or when I want to dance", value: "electronic" },
          { text: "During quiet moments or long drives", value: "folk" },
        ],
      },
      {
        question: "What draws you to a song?",
        options: [
          { text: "Powerful vocals and driving rhythms", value: "rock" },
          { text: "Unique sound and artistic creativity", value: "indie" },
          { text: "Infectious beats and energy", value: "electronic" },
          { text: "Meaningful lyrics and storytelling", value: "folk" },
        ],
      },
      {
        question: "How do you discover new music?",
        options: [
          { text: "Through live concerts and music festivals", value: "rock" },
          { text: "Through music blogs and indie playlists", value: "indie" },
          { text: "Through clubs, DJs, and dance events", value: "electronic" },
          { text: "Through friends' recommendations and acoustic sessions", value: "folk" },
        ],
      },
      {
        question: "What's your ideal concert experience?",
        options: [
          { text: "Large arena with incredible stage production", value: "rock" },
          { text: "Intimate venue with great acoustics", value: "indie" },
          { text: "Festival with amazing sound systems and lights", value: "electronic" },
          { text: "Coffee shop or small venue with personal connection", value: "folk" },
        ],
      },
      {
        question: "How important are lyrics to you?",
        options: [
          { text: "Important, but the energy matters more", value: "rock" },
          { text: "Very important - I love clever and poetic lyrics", value: "indie" },
          { text: "Not as important as the beat and rhythm", value: "electronic" },
          { text: "Extremely important - lyrics tell the story", value: "folk" },
        ],
      },
      {
        question: "What's your approach to music?",
        options: [
          { text: "I want music that pumps me up and motivates", value: "rock" },
          { text: "I appreciate artistic expression and creativity", value: "indie" },
          { text: "I want music that makes me move and dance", value: "electronic" },
          { text: "I connect with authentic, heartfelt music", value: "folk" },
        ],
      },
      {
        question: "How do you share music with others?",
        options: [
          { text: "By taking them to concerts and festivals", value: "rock" },
          { text: "By creating thoughtful playlists", value: "indie" },
          { text: "By playing it at parties and gatherings", value: "electronic" },
          { text: "By sharing songs that remind me of them", value: "folk" },
        ],
      },
      {
        question: "What instruments do you gravitate toward?",
        options: [
          { text: "Electric guitar and drums", value: "rock" },
          { text: "Unique instruments and experimental sounds", value: "indie" },
          { text: "Synthesizers and electronic production", value: "electronic" },
          { text: "Acoustic guitar and harmonica", value: "folk" },
        ],
      },
      {
        question: "How does music fit into your lifestyle?",
        options: [
          { text: "It's my source of energy and motivation", value: "rock" },
          { text: "It's my creative inspiration and emotional outlet", value: "indie" },
          { text: "It's my way to celebrate and have fun", value: "electronic" },
          { text: "It's my companion for reflection and connection", value: "folk" },
        ],
      },
    ],
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

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const quizId = params.id as string
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const quiz = quizData[quizId as keyof typeof quizData]

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center bg-gray-900/50 border-gray-800">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4 text-white">Quiz Not Found</h2>
            <p className="text-gray-400 mb-4">Sorry, this quiz doesn't exist.</p>
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

  const handleAnswerClick = (optionValue: string) => {
    if (isTransitioning) return // Prevent multiple clicks during transition

    setSelectedOption(optionValue)
    setIsTransitioning(true)

    // Add a small delay for visual feedback
    setTimeout(() => {
      const newAnswers = [...answers, optionValue]
      setAnswers(newAnswers)

      if (currentQuestion < quiz.questions.length - 1) {
        // Move to next question
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption("")
        setIsTransitioning(false)
      } else {
        // Calculate result and navigate
        const answerCounts: { [key: string]: number } = {}
        newAnswers.forEach((answer) => {
          answerCounts[answer] = (answerCounts[answer] || 0) + 1
        })

        const result = Object.keys(answerCounts).reduce((a, b) => (answerCounts[a] > answerCounts[b] ? a : b))

        router.push(`/quiz/${quizId}/result?result=${result}`)
      }
    }, 300) // 300ms delay for smooth transition
  }

  const handleGoBack = () => {
    if (currentQuestion > 0 && !isTransitioning) {
      setCurrentQuestion(currentQuestion - 1)
      // Remove the last answer from the array
      setAnswers(answers.slice(0, -1))
      setSelectedOption("")
    }
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 max-w-6xl mx-auto">
          {/* Main Quiz Content */}
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Quizzes
              </Link>
              <h1 className="text-3xl font-bold text-white mb-2">{quiz.title}</h1>
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-800" />
            </div>

            {/* Show ad after question 3 and 7 for 10-question quizzes */}
            {(currentQuestion === 3 || currentQuestion === 7) && (
              <div className="flex justify-center mb-8">
                <AdBanner size="mobile" />
              </div>
            )}

            <Card className="shadow-2xl border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white">{quiz.questions[currentQuestion].question}</CardTitle>
                  {/* Back Button - Now with proper dark styling */}
                  {currentQuestion > 0 && (
                    <Button
                      onClick={handleGoBack}
                      variant="ghost"
                      size="sm"
                      disabled={isTransitioning}
                      className="text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option.value)}
                    disabled={isTransitioning}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedOption === option.value
                        ? "border-purple-500 bg-purple-500/20 text-purple-300 scale-[0.98]"
                        : "border-gray-700 hover:border-purple-400 hover:bg-gray-800/50 text-gray-300 hover:text-white hover:scale-[1.02]"
                    } ${isTransitioning ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
                  >
                    {option.text}
                  </button>
                ))}

                {/* Helpful text */}
                <div className="pt-4 text-center">
                  <p className="text-xs text-gray-500">
                    {currentQuestion < quiz.questions.length - 1
                      ? "Click an answer to continue automatically"
                      : "Click an answer to see your result!"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Smaller, less intrusive ad placed below the quiz content */}
            <div className="flex justify-center mt-8">
              <AdBanner size="mobile" />
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
