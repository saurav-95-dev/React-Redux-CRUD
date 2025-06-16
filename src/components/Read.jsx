import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showUser } from "../features/userDetailsSlice";
import CustomModal from "./CustomModal";
// import { Link } from 'react-router-dom'; // Commented out for demo
import { deleteUser } from "../features/userDetailsSlice";

export default function Read() {
    const dispatch = useDispatch();

    const [id, setId] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [genderFilter, setGenderFilter] = useState('All');

    const { users, loading, searchData } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(showUser())
    }, [])

    const handleGenderChange = (gender) => {
        setGenderFilter(gender);
    };

    const filteredUsers = users?.filter((user) => {
        const matchesSearch = searchData.length === 0 || 
            user.name.toLowerCase().includes(searchData.toLowerCase());
        const matchesGender = genderFilter === 'All' || user.gender === genderFilter;
        return matchesSearch && matchesGender;
    }) || [];

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
                </div>
                
                {/* Floating Orbs */}
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute rounded-full bg-white/10 animate-bounce"
                        style={{
                            width: `${Math.random() * 100 + 50}px`,
                            height: `${Math.random() * 100 + 50}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${Math.random() * 4 + 3}s`
                        }}
                    />
                ))}

                <div className="flex items-center justify-center min-h-screen relative z-10">
                    <div className="text-center p-12 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl max-w-md mx-4">
                        {/* Loading Spinner */}
                        <div className="relative mb-8">
                            <div className="w-24 h-24 mx-auto">
                                <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
                                <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '0.8s'}}></div>
                            </div>
                        </div>
                        
                        <h2 className="text-4xl font-black text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ✨ Loading Magic
                        </h2>
                        <p className="text-white/80 text-lg font-medium animate-pulse">
                            Preparing your cosmic experience...
                        </p>
                        
                        {/* Loading Dots */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {[0, 1, 2].map((i) => (
                                <div 
                                    key={i}
                                    className="w-3 h-3 bg-white/60 rounded-full animate-bounce"
                                    style={{animationDelay: `${i * 0.2}s`}}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Dynamic Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.1"/%3E%3C/svg%3E')] animate-pulse"></div>
            </div>

            {/* Floating Elements */}
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-float"
                    style={{
                        width: `${Math.random() * 60 + 20}px`,
                        height: `${Math.random() * 60 + 20}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 10}s`,
                        animationDuration: `${Math.random() * 10 + 15}s`
                    }}
                />
            ))}

            {showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
            
            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-32 h-32 mb-8 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500 animate-bounce">
                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-6h2.5l6 8h3l-2.54-3.44L16.5 18H20v2H4v-2zm14.5-11c1.38 0 2.5-1.12 2.5-2.5S19.88 2 18.5 2 16 3.12 16 4.5s1.12 2.5 2.5 2.5zM12.5 11H11V7.5c0-.83-.67-1.5-1.5-1.5S8 6.67 8 7.5V16h4.5v-5z"/>
                        </svg>
                    </div>
                    <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                        User Universe ✨
                    </h1>
                    <p className="text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                        Explore and manage your cosmic community with stunning visual flair 🚀
                    </p>
                </div>

                {/* Filter Section */}
                <div className="mb-12 max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                        <div className="flex items-center justify-center mb-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white">
                                    Filter Magic 🎯
                                </h3>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { label: 'All Cosmic Beings', value: 'All', emoji: '🌌', colors: 'from-purple-500 to-indigo-600' },
                                { label: 'Stellar Males', value: 'Male', emoji: '👨‍🚀', colors: 'from-blue-500 to-cyan-600' },
                                { label: 'Cosmic Females', value: 'Female', emoji: '👩‍🚀', colors: 'from-pink-500 to-rose-600' }
                            ].map((option) => (
                                <label key={option.value} className="cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={option.value}
                                        checked={genderFilter === option.value}
                                        onChange={() => handleGenderChange(option.value)}
                                        className="sr-only"
                                    />
                                    <div className={`
                                        px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform
                                        ${genderFilter === option.value 
                                            ? `bg-gradient-to-r ${option.colors} text-white shadow-2xl scale-105 ring-4 ring-white/20` 
                                            : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105'
                                        }
                                        group-hover:shadow-xl backdrop-blur-sm border border-white/20
                                    `}>
                                        <span className="text-2xl mr-3">{option.emoji}</span>
                                        {option.label}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Counter */}
                <div className="text-center mb-12">
                    <div className="inline-block bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 shadow-xl">
                        <p className="text-2xl font-bold text-white">
                            ✨ Displaying{' '}
                            <span className="text-4xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-black animate-pulse">
                                {filteredUsers.length}
                            </span>
                            {' '}incredible user{filteredUsers.length !== 1 ? 's' : ''} ✨
                        </p>
                        {genderFilter !== 'All' && (
                            <p className="text-lg text-gray-300 mt-2">
                                🔍 Filtered by: <span className="font-semibold text-purple-400">{genderFilter}</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Users Grid */}
                {filteredUsers.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-12 max-w-md mx-auto border border-white/10 shadow-2xl">
                            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-4">
                                🔍 No Cosmic Beings Found
                            </h3>
                            <p className="text-xl text-gray-300">
                                Try adjusting your stellar filters ✨
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredUsers.map((user, index) => (
                            <div 
                                key={user.id}
                                className="group transform transition-all duration-500 hover:scale-105 animate-fade-in-up"
                                style={{animationDelay: `${index * 100}ms`}}
                            >
                                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 hover:border-purple-400/50 transition-all duration-500 h-full">
                                    {/* Avatar */}
                                    <div className="text-center mb-6">
                                        <div className={`
                                            relative w-20 h-20 mx-auto rounded-2xl shadow-2xl transform group-hover:scale-110 transition-all duration-300
                                            ${user.gender === 'Male' 
                                                ? 'bg-gradient-to-br from-blue-400 to-cyan-600' 
                                                : 'bg-gradient-to-br from-pink-400 to-rose-600'
                                            }
                                            flex items-center justify-center
                                        `}>
                                            <span className="text-3xl font-black text-white drop-shadow-lg">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10 blur-sm"></div>
                                        </div>
                                    </div>

                                    {/* User Info */}
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                                            {user.name}
                                        </h3>
                                        
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-center space-x-3 bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                                                <span className="text-xl">📧</span>
                                                <span className="text-sm text-gray-300 font-medium truncate">{user.email}</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-3 bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                                                <span className="text-xl">🎂</span>
                                                <span className="text-sm text-gray-300 font-medium">Age: {user.age}</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-3 bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                                                <span className="text-xl">{user.gender === 'Male' ? '👨‍🚀' : '👩‍🚀'}</span>
                                                <span className="text-sm text-gray-300 font-medium">{user.gender}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => [setId(user.id), setShowPopup(true)]}
                                            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                        >
                                            <span className="text-lg">👁️</span>
                                            <span>View Cosmic Profile</span>
                                        </button>
                                        
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => console.log(`Edit user ${user.id}`)}
                                                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm"
                                            >
                                                <span>✏️</span>
                                                <span>Edit</span>
                                            </button>
                                            
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('🗑️ Remove this cosmic being from the universe? This action cannot be undone!')) {
                                                        dispatch(deleteUser(user.id));
                                                    }
                                                }}
                                                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm"
                                            >
                                                <span>🗑️</span>
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-20px) rotate(90deg); }
                    50% { transform: translateY(-10px) rotate(180deg); }
                    75% { transform: translateY(-30px) rotate(270deg); }
                }
                
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-float {
                    animation: float 20s ease-in-out infinite;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}