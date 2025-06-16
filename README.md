# QuizMania - Personality Quiz Website

A modern, mobile-optimized personality quiz website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Interactive Quizzes** - Auto-advancing personality quizzes
- 📱 **Mobile Optimized** - Perfect for mobile usage
- 🎨 **Modern Design** - Dark theme with gradient accents
- 📊 **Smart Analytics** - Dynamic popularity sorting
- 🔗 **Social Sharing** - Share to all major platforms
- 💰 **Ad Integration** - Google AdSense ready

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account (free)

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/quiz-website.git
cd quiz-website
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set up environment variables
\`\`\`bash
cp .env.example .env.local
\`\`\`
Edit `.env.local` and add your values:
\`\`\`env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-your-adsense-id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### 4. Add quiz images
Create the following images and place them in `public/images/quiz/`:
- `animal-personality.jpg` (400x200px recommended)
- `movie-character.jpg`
- `career-match.jpg`
- `travel-destination.jpg`
- `food-personality.jpg`
- `color-personality.jpg`
- `house-style.jpg`
- `workout-type.jpg`
- `music-genre.jpg`

**Image Requirements:**
- Size: 400x200px (2:1 ratio)
- Format: JPG, PNG, or WebP
- Style: Should match modern/futuristic aesthetic
- Quality: High resolution for crisp display

### 5. Run the development server
\`\`\`bash
npm run dev
\`\`\`

### 6. Open your browser
Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option 1: Automatic (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in Vercel dashboard
6. Deploy!

### Option 2: Vercel CLI
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

## Adding New Quizzes

### 1. Add Quiz Metadata
Edit `lib/quiz-data.ts` and add your quiz to the `baseQuizzes` array:

\`\`\`typescript
{
  id: "your-quiz-id",
  title: "Your Quiz Title",
  description: "Quiz description for the card",
  icon: Heart, // Choose from lucide-react icons
  color: "bg-gradient-to-br from-blue-500 to-purple-600",
  questions: 10,
  image: "your-quiz-id.jpg",
  category: "personality", // or "popular" or "lifestyle"
}
\`\`\`

### 2. Add Quiz Questions
Edit `app/quiz/[id]/page.tsx` and add your quiz to the `quizData` object:

\`\`\`typescript
"your-quiz-id": {
  title: "Your Quiz Title",
  questions: [
    {
      question: "Your question here?",
      options: [
        { text: "Option 1", value: "result1" },
        { text: "Option 2", value: "result2" },
        // ... more options
      ],
    },
    // ... more questions (minimum 10)
  ],
  results: {
    result1: {
      animal: "Result Name",
      description: "Result description...",
      traits: ["Trait1", "Trait2", "Trait3"],
      emoji: "🎯",
    },
    // ... more results
  },
}
\`\`\`

### 3. Add Quiz Image
- Create an image named `your-quiz-id.jpg`
- Place it in `public/images/quiz/`
- Size: 400x200px recommended

### 4. Update Analytics
Edit `lib/quiz-analytics.ts` and add analytics data for your quiz.

## Project Structure

\`\`\`
quiz-website/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── quiz/[id]/         # Dynamic quiz routes
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── quiz-card.tsx     # Quiz card component
│   └── quiz-section.tsx  # Quiz section component
├── lib/                  # Utilities and data
│   ├── quiz-data.ts      # Quiz metadata
│   └── quiz-analytics.ts # Analytics system
├── public/               # Static assets
│   └── images/quiz/      # Quiz images
└── types/               # TypeScript types
\`\`\`

## Customization

### Colors & Branding
- Edit `app/globals.css` for global styles
- Modify gradient colors in `lib/quiz-data.ts`
- Update the site title in `app/layout.tsx`

### Adding More Social Platforms
Edit `app/quiz/[id]/result/page.tsx` and add new sharing functions.

### Monetization
- Add your Google AdSense ID to `.env.local`
- Modify ad placements in components
- Add affiliate links to quiz results

## Troubleshooting

### Images Not Showing
- Check file names match exactly (case-sensitive)
- Ensure images are in `public/images/quiz/`
- Verify image formats (JPG, PNG, WebP)

### Build Errors
\`\`\`bash
npm run build
\`\`\`
Fix any TypeScript errors before deploying.

### Environment Variables
- Ensure `.env.local` exists and has correct values
- In Vercel, add environment variables in the dashboard
- Restart development server after changing env vars

## Performance Tips

- Keep images under 500KB each
- Use WebP format for better compression
- Test on mobile devices regularly
- Monitor Core Web Vitals in production

## Support

If you run into issues:
1. Check the troubleshooting section above
2. Ensure all dependencies are installed
3. Verify environment variables are set
4. Check browser console for errors

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

---

## Quick Checklist for Deployment

- [ ] All quiz images added to `public/images/quiz/`
- [ ] Environment variables set in `.env.local`
- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected
- [ ] Environment variables added to Vercel dashboard
- [ ] Site deployed and tested
- [ ] Google AdSense account set up (if monetizing)
- [ ] Analytics tracking configured (optional)

**Estimated setup time: 30-60 minutes**
