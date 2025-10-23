import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Pomodoro Tracker
        </h1>

        <div className="flex flex-col items-center space-y-8">
          {/* Timer Display */}
          <div className="text-8xl font-bold text-gray-800">
            25:00
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200">
              Start
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200">
              Pause
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200">
              Reset
            </button>
          </div>

          {/* Session Type Selector */}
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white font-medium py-2 px-6 rounded-full">
              Work
            </button>
            <button className="bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-full hover:bg-gray-300 transition-colors duration-200">
              Short Break
            </button>
            <button className="bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-full hover:bg-gray-300 transition-colors duration-200">
              Long Break
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
