import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-gray-900 dark:text-gray-100">
      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-48 h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-rose-400/40 to-orange-300/30 blur-3xl animate-aurora-1" />
        <div className="absolute -right-40 top-1/4 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-400/25 blur-3xl animate-aurora-2" />
        <div className="absolute -bottom-48 left-1/4 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-teal-400/30 to-cyan-300/20 blur-3xl animate-float-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_55%,rgba(10,11,18,0.06)_100%)] dark:bg-[radial-gradient(120%_120%_at_50%_0%,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <Navigation />

      <main className="container mx-auto px-4 pb-20 pt-4 md:pt-6">
        <Outlet />
      </main>
    </div>
  )
}
