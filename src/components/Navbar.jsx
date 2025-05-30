import React, { useEffect, useState } from "react";

export default function Navbar() {
  const allUsers = Array.from({ length: 24 }, (_, i) => ({ id: i }));
  const [searchData, setSearchData] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = (action) => console.log('Dispatched:', action);
  const searchUser = (query) => ({ type: 'SEARCH_USER', payload: query });

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLinkClick = (path) => {
    console.log(`Navigate to: ${path}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <nav 
        className="relative z-50 backdrop-blur-2xl bg-gradient-to-r from-slate-900/80 via-purple-900/60 to-slate-900/80 border-b border-purple-500/30 shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered 
            ? `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.1), transparent 40%)`
            : undefined
        }}
      >
        {/* Flowing gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse"></div>
        
        {/* Glass morphism effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Ultra Premium Logo */}
            <div className="flex-shrink-0 group cursor-pointer" onClick={() => handleLinkClick('/')}>
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-700 animate-pulse"></div>
                <div className="relative flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-slate-800/90 to-purple-800/90 rounded-2xl border border-purple-500/30 group-hover:border-purple-400/60 transition-all duration-500 shadow-xl">
                  <div className="relative">
                    <span className="text-3xl">✨</span>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-2xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-purple-200 transition-all duration-500">
                    DevSpace
                  </span>
                </div>
              </div>
            </div>

            {/* Premium Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-2">
                <NavButton onClick={() => handleLinkClick('/')} primary>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Post
                </NavButton>
                <NavButton onClick={() => handleLinkClick('/read')}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="flex items-center gap-2">
                    All Posts
                    <div className="relative">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient-x shadow-lg">
                        {allUsers.length}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur animate-pulse opacity-40"></div>
                    </div>
                  </span>
                </NavButton>
              </div>
            </div>

            {/* Ultra Premium Search Bar */}
            <div className="hidden md:block">
              <div className={`relative group transition-all duration-500 ${isSearchFocused ? 'transform scale-110' : 'hover:scale-105'}`}>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                <div className={`relative flex items-center transition-all duration-500 ${
                  isSearchFocused 
                    ? 'bg-gradient-to-r from-slate-800/95 to-purple-800/95 shadow-2xl shadow-purple-500/30' 
                    : 'bg-slate-800/70 hover:bg-slate-800/90'
                } rounded-2xl border backdrop-blur-xl ${
                  isSearchFocused 
                    ? 'border-purple-400/80 shadow-lg shadow-purple-500/20' 
                    : 'border-slate-600/50 hover:border-purple-500/50'
                }`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`h-5 w-5 transition-all duration-300 ${isSearchFocused ? 'text-purple-300 scale-110' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search the universe..."
                    className="w-80 pl-12 pr-12 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none font-medium text-lg transition-all duration-300"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {searchData && (
                    <button
                      onClick={() => setSearchData("")}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white hover:scale-110 transition-all duration-200"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Premium Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative group p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-xl"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <svg className={`relative h-6 w-6 text-gray-300 group-hover:text-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-180 scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Ultra Premium Mobile Menu */}
          <div className={`lg:hidden transition-all duration-700 ease-out ${
            isMobileMenuOpen 
              ? 'max-h-screen opacity-100 transform translate-y-0' 
              : 'max-h-0 opacity-0 transform -translate-y-4 overflow-hidden'
          }`}>
            <div className="relative px-4 pt-4 pb-6 mt-4 bg-gradient-to-br from-slate-800/90 to-purple-800/90 rounded-3xl border border-purple-500/30 backdrop-blur-2xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl"></div>
              
              <div className="relative space-y-3">
                <MobileNavButton onClick={() => handleLinkClick('/')} primary>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Post
                </MobileNavButton>
                
                <MobileNavButton onClick={() => handleLinkClick('/read')}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      All Posts
                    </div>
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                      {allUsers.length}
                    </span>
                  </div>
                </MobileNavButton>
                
                {/* Mobile Search */}
                <div className="pt-2">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>
                    <div className="relative flex items-center bg-slate-800/80 rounded-2xl border border-slate-600/50 backdrop-blur-xl">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search the universe..."
                        className="w-full pl-12 pr-12 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none font-medium rounded-2xl"
                        value={searchData}
                        onChange={(e) => setSearchData(e.target.value)}
                      />
                      {searchData && (
                        <button
                          onClick={() => setSearchData("")}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Ultra Premium Demo Content */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl mx-auto px-6">
            <div className="relative mb-8">
              <h1 className="text-7xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-6 animate-gradient-x">
                Ultra Beautiful
              </h1>
              <h2 className="text-5xl font-bold text-white mb-8">Navigation Experience</h2>
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
            </div>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Experience the future of web navigation with premium animations, glassmorphism effects, and cutting-edge design patterns.
            </p>
            
            {searchData && (
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/30 backdrop-blur-xl">
                <svg className="w-6 h-6 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-purple-300 text-lg font-medium">Searching for: "{searchData}"</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}

// Premium Navigation Button Component
function NavButton({ children, onClick, primary = false }) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 backdrop-blur-xl ${
        primary
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
          : 'bg-slate-800/70 text-gray-300 hover:text-white border border-slate-600/50 hover:border-purple-500/50 hover:bg-slate-700/80'
      }`}
    >
      <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${primary ? 'opacity-20' : ''}`}></div>
      <span className="relative flex items-center">{children}</span>
    </button>
  );
}

// Premium Mobile Navigation Button Component
function MobileNavButton({ children, onClick, primary = false }) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full flex items-center px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-xl ${
        primary
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
          : 'bg-slate-700/50 text-gray-300 hover:text-white border border-slate-600/50 hover:border-purple-500/50 hover:bg-slate-600/60'
      }`}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      <span className="relative flex items-center w-full">{children}</span>
    </button>
  );
}