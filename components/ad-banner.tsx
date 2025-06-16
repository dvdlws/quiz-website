interface AdBannerProps {
  size: "leaderboard" | "rectangle" | "mobile" | "skyscraper"
  className?: string
}

export function AdBanner({ size, className = "" }: AdBannerProps) {
  const sizeClasses = {
    leaderboard: "w-full max-w-[728px] h-[90px]", // 728x90
    rectangle: "w-[300px] h-[250px]", // 300x250
    mobile: "w-full max-w-[320px] h-[50px]", // 320x50
    skyscraper: "w-[160px] h-[600px]", // 160x600
  }

  const sizeLabels = {
    leaderboard: "728 × 90",
    rectangle: "300 × 250",
    mobile: "320 × 50",
    skyscraper: "160 × 600",
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 text-sm">
        <div className="font-medium">Google AdSense</div>
        <div className="text-xs">{sizeLabels[size]}</div>
      </div>
    </div>
  )
}
