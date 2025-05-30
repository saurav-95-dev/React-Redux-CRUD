import React, { useEffect, useState } from "react";

// Demo component simulating your actual navbar
export default function Navbar() {
  // Simulating Redux state and dispatch for demo
  const allUsers = Array.from({ length: 24 }, (_, i) => ({ id: i })); // Mock data
  const [searchData, setSearchData] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulating dispatch for demo
  const dispatch = (action) => console.log('Dispatched:', action);
  const searchUser = (query) => ({ type: 'SEARCH_USER', payload: query });

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  const handleLinkClick = (path) => {
    console.log(`Navigate to: ${path}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-lg bg-opacity-95 border-b border-purple-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => handleLinkClick('/')}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              ✨ DevSpace
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => handleLinkClick('/')}
                className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium cursor-pointer"
              >
                <span className="relative z-10">Create Post</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-95 group-hover:scale-100"></div>
              </button>
              <button
                onClick={() => handleLinkClick('/read')}
                className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  All Posts
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    {allUsers.length}
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-95 group-hover:scale-100"></div>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block relative">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-105' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className={`h-5 w-5 transition-colors duration-300 ${isSearchFocused ? 'text-purple-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search posts..."
                className={`w-64 pl-10 pr-4 py-2 bg-slate-800/50 border transition-all duration-300 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  isSearchFocused 
                    ? 'border-purple-500 bg-slate-800/80 shadow-lg shadow-purple-500/20' 
                    : 'border-slate-600 hover:border-slate-500'
                }`}
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchData && (
                <button
                  onClick={() => setSearchData("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            >
              <svg className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/30 rounded-lg mt-2 border border-slate-700/50">
            <button
              onClick={() => handleLinkClick('/')}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-md transition-all duration-200 font-medium"
            >
              Create Post
            </button>
            <button
              onClick={() => handleLinkClick('/read')}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-md transition-all duration-200 font-medium"
            >
              <span>All Posts</span>
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                {allUsers.length}
              </span>
            </button>
            
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />
                {searchData && (
                  <button
                    onClick={() => setSearchData("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Demo content to show navbar stickiness */}
      <div className="h-96 bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center text-gray-300">
          <h2 className="text-2xl font-bold mb-4">Scroll to test sticky navbar</h2>
          <p>Try the search functionality and mobile menu!</p>
          {searchData && (
            <p className="mt-4 text-purple-400">Searching for: "{searchData}"</p>
          )}
        </div>
      </div>
    </nav>
  );
}