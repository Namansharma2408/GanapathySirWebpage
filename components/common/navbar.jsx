"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
const navItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'team', label: 'Team', path: '/team' },
  { id: 'research', label: 'Research', path: '/research' },
  { id: 'publications', label: 'Publications', path: '/publications' },
  { id: 'facilities', label: 'Facilities', path: '/facilities' },
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  { id: 'contact', label: 'Contact', path: '/contact' }
];
const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      {/* desktop code */}
      <div className='hidden xl:flex fixed left-1/2 transform -translate-x-1/2 backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg z-9999 w-screen '>
        <div className="flex items-center justify-between px-8 py-3 w-full ">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden scale-150 ">
              <Image
                src="https://res.cloudinary.com/dicnppgsn/image/upload/v1762190240/GDlogo_ago63w.png"
                alt="Ganpathy Research Group Logo"
                fill
                sizes="96px"
                priority
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-gray-800 via-purple-700 to-blue-700 bg-clip-text text-transparent leading-tight">
                Ganpathy Research Group
              </h1>
              <p className="text-sm text-gray-600 font-medium">Department  of Chemistry</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {navItems.map(item => (
            <button key={item.id} className={`relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out text-sm font-bold border ${pathname === item.path ? "bg-white/60 text-gray-800 shadow-lg backdrop-blur-sm border-white/60" : "text-gray-600 border-transparent hover:text-gray-800 hover:bg-white/20 hover:backdrop-blur-sm hover:border-white/30 hover:shadow-sm"}`} onClick={() => router.push(item.path)}>
              {item.label}
            </button>
          ))}
          <div className="absolute inset-0 bg-linear-to-r from-purple-200/0 via-blue-200/0 to-indigo-200/0 hover:from-purple-200/5 hover:via-blue-200/5 hover:to-indigo-200/5 transition-all duration-500 pointer-events-none rounded-full"></div>
        </div>
      </div>

      {/* mobile part */}
      {/* Mobile top bar with logo and title */}
      <div className="xl:hidden fixed top-0 left-0 right-0 z-9998 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white shadow-md shrink-0">
            <Image
              src="https://res.cloudinary.com/dicnppgsn/image/upload/v1762190240/GDlogo_ago63w.png"
              alt="Ganpathy Research Group Logo"
              fill
              sizes="40px"
              priority
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold bg-linear-to-r from-gray-800 via-purple-700 to-blue-700 bg-clip-text text-transparent leading-tight truncate">
              Ganpathy Research Group
            </h1>
            <p className="text-xs text-gray-600 font-medium truncate">Department of Chemistry</p>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className="xl:hidden fixed top-2 right-6 z-10000 p-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 transition-all"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Open navigation menu"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Sidebar - Glass Morphism Style */}
      <div className={`xl:hidden fixed inset-0 z-9999 transition-all duration-300 ${sidebarOpen ? 'bg-black/20 pointer-events-auto' : 'pointer-events-none bg-transparent'}`}
        style={{ backdropFilter: sidebarOpen ? 'blur(4px)' : 'none' }}
        onClick={() => setSidebarOpen(false)}
      >
        <aside
          className={`absolute top-0 right-0 h-full w-72 backdrop-blur-xl bg-white/50 border-l border-white/20 shadow-2xl transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white shadow-md">
                <Image
                  src="https://res.cloudinary.com/dicnppgsn/image/upload/v1762190240/GDlogo_ago63w.png"
                  alt="Ganpathy Research Group Logo"
                  fill
                  sizes="40px"
                  priority
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold text-gray-700">Navigation</span>
            </div>
            <button
              className="p-2 rounded-full backdrop-blur-sm bg-white/20 hover:bg-white/30 text-gray-600 border border-white/30 transition-all"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-3 px-6 py-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                href={item.path}
                onClick={() => router.push(item.path)}
                className={`relative px-4 py-3 rounded-full transition-all duration-300 ease-in-out text-sm font-medium border ${pathname === item.path
                  ? 'bg-white/30 text-gray-800 shadow-sm backdrop-blur-sm border-white/40'
                  : 'text-gray-600 border-transparent hover:text-gray-800 hover:bg-white/20 hover:backdrop-blur-sm hover:border-white/30 hover:shadow-sm'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Subtle glow effect in sidebar */}
          <div className="absolute inset-0 bg-linear-to-b from-purple-200/5 via-blue-200/5 to-indigo-200/5 pointer-events-none rounded-r-lg"></div>
        </aside>
      </div>
    </div>
  )
}

export default Navbar;