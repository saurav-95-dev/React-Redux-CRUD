import React, { useState, useEffect } from "react";

// Mock data for demonstration
const mockUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28, gender: "Female" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", age: 34, gender: "Male" },
    { id: 3, name: "Carol Williams", email: "carol@example.com", age: 26, gender: "Female" },
    { id: 4, name: "David Brown", email: "david@example.com", age: 31, gender: "Male" },
    { id: 5, name: "Eva Davis", email: "eva@example.com", age: 29, gender: "Female" },
    { id: 6, name: "Frank Wilson", email: "frank@example.com", age: 35, gender: "Male" },
];

export default function UserGallery() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [genderFilter, setGenderFilter] = useState('All');
    const [searchData, setSearchData] = useState('');

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setUsers(mockUsers);
            setLoading(false);
        }, 2000);
    }, []);

    const handleGenderChange = (gender) => {
        setGenderFilter(gender);
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch = searchData.length === 0 || 
            user.name.toLowerCase().includes(searchData.toLowerCase());
        const matchesGender = genderFilter === 'All' || user.gender === genderFilter;
        return matchesSearch && matchesGender;
    });

    const genderOptions = [
        { label: 'All Users', value: 'All', emoji: '👥', colors: 'from-indigo-500 to-purple-600' },
        { label: 'Male', value: 'Male', emoji: '👨', colors: 'from-blue-500 to-cyan-500' },
        { label: 'Female', value: 'Female', emoji: '👩', colors: 'from-pink-500 to-rose-500' }
    ];

    const handleDeleteUser = (userId) => {
        if (window.confirm('🗑️ Are you sure you want to delete this user? This action cannot be undone!')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setShowPopup(true);
    };

    const UserModal = ({ user, onClose }) => {
        if (!user) return null;
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform animate-pulse">
                    <div className="text-center mb-6">
                        <div className={`
                            w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-white shadow-xl
                            ${user.gender === 'Male' 
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                                : 'bg-gradient-to-r from-pink-500 to-rose-500'
                            }
                        `}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            {user.name}
                        </h2>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4">
                            <span className="text-2xl">📧</span>
                            <div>
                                <div className="text-sm text-gray-500">Email</div>
                                <div className="font-semibold text-gray-800">{user.email}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
                            <span className="text-2xl">🎂</span>
                            <div>
                                <div className="text-sm text-gray-500">Age</div>
                                <div className="font-semibold text-gray-800">{user.age} years old</div>
                            </div>
                        </div>
                        <div className={`
                            flex items-center gap-3 rounded-xl p-4
                            ${user.gender === 'Male' ? 'bg-blue-50' : 'bg-pink-50'}
                        `}>
                            <span className="text-2xl">{user.gender === 'Male' ? '👨' : '👩'}</span>
                            <div>
                                <div className="text-sm text-gray-500">Gender</div>
                                <div className="font-semibold text-gray-800">{user.gender}</div>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
                {/* Animated background particles */}
                <div className="absolute inset-0">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${Math.random() * 3 + 2}s`
                            }}
                        >
                            <div className="w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>
                        </div>
                    ))}
                </div>
                
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-12 text-center border border-white border-opacity-20 shadow-2xl">
                    <div className="w-20 h-20 border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin mx-auto mb-8"></div>
                    <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                        Loading Magic ✨
                    </h2>
                    <p className="text-white text-opacity-90 text-xl animate-pulse">
                        Preparing your amazing experience...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${Math.random() * 4 + 3}s`
                        }}
                    >
                        <div 
                            className="bg-white bg-opacity-20 rounded-full"
                            style={{
                                width: `${Math.random() * 20 + 10}px`,
                                height: `${Math.random() * 20 + 10}px`
                            }}
                        ></div>
                    </div>
                ))}
            </div>

            {showPopup && (
                <UserModal 
                    user={selectedUser} 
                    onClose={() => setShowPopup(false)} 
                />
            )}
            
            <div className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-8 animate-bounce shadow-2xl">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
                        User Galaxy ✨
                    </h1>
                    <p className="text-xl md:text-2xl text-white text-opacity-90 font-medium drop-shadow-lg">
                        Discover and manage users in style 🚀
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search users... 🔍"
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value)}
                            className="w-full px-6 py-4 text-lg bg-white bg-opacity-15 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 transition-all duration-300"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-opacity-70">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-3xl p-8 mb-12 border border-white border-opacity-20 shadow-2xl">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 2v-2.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4Z"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                            Filter by Gender 🎯
                        </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 justify-center">
                        {genderOptions.map((option) => (