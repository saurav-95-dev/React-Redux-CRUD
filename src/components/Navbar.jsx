import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../features/userDetailsSlice";
import { Search, Plus, Users, Menu, X, Sparkles, User, Home } from "lucide-react";

export default function Navbar() {
  const allUsers = useSelector((state) => state.userDetail.users);
  const [searchData, setSearchData] = useState(""); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData])

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navItems = [
    { 
      to: "/", 
      label: "Create Post", 
      icon: Plus, 
      gradient: "from-emerald-500 to-teal-500",
      hoverGradient: "from-emerald-600 to-teal-600"
    },
    { 
      to: "/read", 
      label: `All Posts (${allUsers.length})`, 
      icon: Users, 
      gradient: "from-blue-500 to-indigo-500",
      hoverGradient: "from-blue-600 to-indigo-600"
    }
  ];

  const isActive = (path) => currentPath === path;

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-50/50 via-indigo-50/50 to-blue-50/50 animate-gradient-x"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 rounded-xl blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  UserHub
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Management System</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 group ${
                      active 
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-${item.gradient.split('-')[1]}-500/25` 
                        : 'text-gray-700 hover:bg-gray-100/80 hover:scale-105'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="font-semibold">{item.label}</span>
                    
                    {/* Active indicator */}
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl animate-pulse"></div>
                    )}
                    
                    {/* Hover effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.hoverGradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  </Link>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-4">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl blur-sm transition-opacity duration-300 ${
                  isSearchFocused ? 'opacity-20' : 'opacity-0'
                }`}></div>
                
                <div className="relative flex items-center">
                  <Search className={`absolute left-4 w-5 h-5 transition-colors duration-300 ${
                    isSearchFocused ? 'text-violet-600' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-80 pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 placeholder-gray-400"
                  />
                  
                  {/* Search results count */}
                  {searchData && (
                    <div className="absolute right-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {allUsers.filter(user => 
                            user.name.toLowerCase().includes(searchData.toLowerCase())
                          ).length}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-all duration-300 hover:scale-110"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-white/20 shadow-xl animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 py-6 space-y-4">
              
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
                />
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.to);
                  
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                        active 
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="font-semibold text-lg">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Stats */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-violet-50 to-blue-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-600">{allUsers.length}</div>
                    <div className="text-sm text-gray-600">Total Users</div>
                  </div>
                  {searchData && (
                    <>
                      <div className="w-px h-8 bg-gray-300"></div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {allUsers.filter(user => 
                            user.name.toLowerCase().includes(searchData.toLowerCase())
                          ).length}
                        </div>
                        <div className="text-sm text-gray-600">Search Results</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Search Results Preview (Desktop) */}
      {searchData && isSearchFocused && (
        <div className="hidden md:block fixed top-20 right-4 w-96 max-h-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-40 animate-in slide-in-from-top duration-300">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Search Results</h3>
              <span className="text-sm text-gray-500">
                {allUsers.filter(user => 
                  user.name.toLowerCase().includes(searchData.toLowerCase())
                ).length} found
              </span>
            </div>
            
            <div className="max-h-64 overflow-y-auto space-y-2">
              {allUsers
                .filter(user => user.name.toLowerCase().includes(searchData.toLowerCase()))
                .slice(0, 5)
                .map(user => (
                  <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                ))}
              
              {allUsers.filter(user => 
                user.name.toLowerCase().includes(searchData.toLowerCase())
              ).length > 5 && (
                <div className="text-center py-2">
                  <Link 
                    to="/read" 
                    className="text-violet-600 hover:text-violet-700 font-medium text-sm"
                  >
                    View all results →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}