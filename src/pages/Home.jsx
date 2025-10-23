import Timer from '../components/Timer'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Pomodoro Timer
        </h1>
        <Timer />
      </div>
    </div>
  )
}
