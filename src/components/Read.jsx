import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showUser } from "../features/userDetailsSlice";
import CustomModal from "./CustomModal";
import { Link } from 'react-router';
import { deleteUser } from "../features/userDetailsSlice";
import { Search, Users, Eye, Edit3, Trash2, Filter, Loader2, UserCheck, UserX, Grid3X3, List, SortAsc, MoreVertical, Heart, Star, Calendar, Mail, User } from 'lucide-react';

export default function Read() {
    const dispatch = useDispatch();
    const [id, setId] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [genderFilter, setGenderFilter] = useState('all');
    const [isDeleting, setIsDeleting] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('name');
    const [favoriteUsers, setFavoriteUsers] = useState(new Set());
    const [hoveredCard, setHoveredCard] = useState(null);

    const { users, loading, searchData } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(showUser())
    }, [])

    const handleDelete = async (userId) => {
        setIsDeleting(userId);
        setTimeout(() => {
            dispatch(deleteUser(userId));
            setIsDeleting(null);
        }, 800);
    };

    const toggleFavorite = (userId) => {
        const newFavorites = new Set(favoriteUsers);
        if (newFavorites.has(userId)) {
            newFavorites.delete(userId);
        } else {
            newFavorites.add(userId);
        }
        setFavoriteUsers(newFavorites);
    };

    const sortUsers = (users) => {
        return [...users].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'age':
                    return a.age - b.age;
                case 'email':
                    return a.email.localeCompare(b.email);
                default:
                    return 0;
            }
        });
    };

    const filteredUsers = users && sortUsers(users.filter((ele) => {
        const matchesSearch = searchData.length === 0 || 
            ele.name.toLowerCase().includes(searchData.toLowerCase());
        const matchesGender = genderFilter === 'all' || 
            ele.gender.toLowerCase() === genderFilter.toLowerCase();
        return matchesSearch && matchesGender;
    }));

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 via-blue-50 to-cyan-50 flex items-center justify-center relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-violet-400/10 to-transparent rounded-full animate-spin duration-[20s]"></div>
                    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-400/10 to-transparent rounded-full animate-spin duration-[25s] reverse"></div>
                </div>
                
                <div className="text-center space-y-6 z-10 relative">
                    <div className="relative">
                        <div className="w-20 h-20 mx-auto relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                                <Users className="w-8 h-8 text-violet-600 animate-pulse" />
                            </div>
                        </div>
                        <div className="absolute inset-0 w-20 h-20 border-4 border-violet-200 rounded-full animate-ping mx-auto"></div>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Loading Users
                        </h2>
                        <p className="text-gray-600 text-lg">Preparing your beautiful dashboard...</p>
                        <div className="flex justify-center space-x-1">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 via-blue-50 to-cyan-50 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-violet-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 z-50 animate-in fade-in duration-300 backdrop-blur-md">
                    <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />
                </div>
            )}
            
            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12 animate-in slide-in-from-top duration-700">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 rounded-full animate-spin duration-3000"></div>
                        <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <Users className="w-10 h-10 text-violet-600" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                        User Directory
                    </h1>
                    <p className="text-gray-600 text-xl">Discover and manage your community with style</p>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-700">
                                {filteredUsers ? filteredUsers.length : 0} Users Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 mb-8 shadow-xl border border-white/30 animate-in slide-in-from-top duration-700 delay-100">
                    {/* Filter Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Filter className="w-6 h-6 text-violet-600" />
                            <h3 className="text-xl font-bold text-gray-800">Filters & Views</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Gender Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Filter by Gender</label>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { value: 'all', label: 'All Users', icon: Users, color: 'violet' },
                                        { value: 'male', label: 'Male', icon: UserCheck, color: 'blue' },
                                        { value: 'female', label: 'Female', icon: UserX, color: 'pink' }
                                    ].map(({ value, label, icon: Icon, color }) => (
                                        <label key={value} className="flex items-center cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={value}
                                                checked={genderFilter === value}
                                                onChange={(e) => setGenderFilter(e.target.value)}
                                                className="sr-only"
                                            />
                                            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                                                genderFilter === value
                                                    ? `bg-gradient-to-r from-${color}-500 to-${color}-600 text-white shadow-lg shadow-${color}-500/25 scale-105`
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                            }`}>
                                                <Icon className="w-5 h-5" />
                                                <span className="font-semibold">{label}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* View Options */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">View & Sort</label>
                                <div className="flex gap-3">
                                    {/* View Mode Toggle */}
                                    <div className="flex bg-gray-100 rounded-2xl p-1">
                                        {[
                                            { mode: 'grid', icon: Grid3X3, label: 'Grid' },
                                            { mode: 'list', icon: List, label: 'List' }
                                        ].map(({ mode, icon: Icon, label }) => (
                                            <button
                                                key={mode}
                                                onClick={() => setViewMode(mode)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                                                    viewMode === mode
                                                        ? 'bg-white text-violet-600 shadow-md'
                                                        : 'text-gray-600 hover:text-gray-800'
                                                }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                <span className="text-sm font-medium">{label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Sort Dropdown */}
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 bg-white border border-gray-200 rounded-2xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
                                    >
                                        <option value="name">Sort by Name</option>
                                        <option value="age">Sort by Age</option>
                                        <option value="email">Sort by Email</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Display */}
                <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
                    : "space-y-4"
                }>
                    {filteredUsers && filteredUsers.map((user, index) => (
                        <div
                            key={user.id}
                            onMouseEnter={() => setHoveredCard(user.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className={`group relative bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-in slide-in-from-bottom ${
                                viewMode === 'list' ? 'flex items-center p-6 gap-6' : 'p-8'
                            }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Animated Border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                            
                            {/* Favorite Button */}
                            <button
                                onClick={() => toggleFavorite(user.id)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 z-10"
                            >
                                <Heart 
                                    className={`w-5 h-5 transition-all duration-300 ${
                                        favoriteUsers.has(user.id) 
                                            ? 'text-red-500 fill-red-500 scale-110' 
                                            : 'text-gray-400 hover:text-red-400'
                                    }`} 
                                />
                            </button>

                            {viewMode === 'grid' ? (
                                <>
                                    {/* User Avatar */}
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <span className="text-white font-bold text-2xl">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            {favoriteUsers.has(user.id) && (
                                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                                    <Star className="w-3 h-3 text-white fill-white" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-125 blur-md"></div>
                                        </div>
                                    </div>

                                    {/* User Info */}
                                    <div className="text-center mb-8 space-y-3">
                                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-violet-600 transition-colors duration-300">
                                            {user.name}
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                                <Mail className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm">{user.email}</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                                <Calendar className="w-4 h-4 text-green-500" />
                                                <span className="text-sm">Age: {user.age}</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                                <User className="w-4 h-4 text-purple-500" />
                                                <span className="text-sm">{user.gender}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => [setId(user.id), setShowPopup(true)]}
                                            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 group-hover:shadow-xl"
                                        >
                                            <Eye className="w-5 h-5" />
                                            View Details
                                        </button>
                                        
                                        <Link
                                            to={`/edit/${user.id}`}
                                            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-500/25 group-hover:shadow-xl"
                                        >
                                            <Edit3 className="w-5 h-5" />
                                            Edit User
                                        </Link>
                                        
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            disabled={isDeleting === user.id}
                                            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-xl"
                                        >
                                            {isDeleting === user.id ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-5 h-5" />
                                            )}
                                            {isDeleting === user.id ? 'Deleting...' : 'Delete User'}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                // List View Layout
                                <>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                                            <span className="text-white font-bold text-xl">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-4 h-4" />
                                                    {user.email}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    Age {user.age}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    {user.gender}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => [setId(user.id), setShowPopup(true)]}
                                            className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <Link
                                            to={`/edit/${user.id}`}
                                            className="p-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all duration-300 hover:scale-110"
                                        >
                                            <Edit3 className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            disabled={isDeleting === user.id}
                                            className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 hover:scale-110 disabled:opacity-50"
                                        >
                                            {isDeleting === user.id ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Floating particles effect on hover */}
                            {hoveredCard === user.id && (
                                <div className="absolute inset-0 pointer-events-none">
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-2 h-2 bg-violet-400 rounded-full animate-ping opacity-75"
                                            style={{
                                                top: `${Math.random() * 100}%`,
                                                left: `${Math.random() * 100}%`,
                                                animationDelay: `${i * 0.2}s`,
                                                animationDuration: '2s'
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Enhanced Empty State */}
                {filteredUsers && filteredUsers.length === 0 && (
                    <div className="text-center py-20 animate-in fade-in duration-700">
                        <div className="relative inline-flex items-center justify-center w-32 h-32 mb-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-blue-100 rounded-full animate-pulse"></div>
                            <div className="relative bg-white rounded-full p-8 shadow-xl">
                                <Search className="w-16 h-16 text-gray-400" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">No Users Found</h3>
                        <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                            We couldn't find any users matching your current filters. Try adjusting your search criteria or explore different options.
                        </p>
                        <button
                            onClick={() => {
                                setGenderFilter('all');
                                setSortBy('name');
                            }}
                            className="px-8 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-2xl hover:from-violet-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Stats Footer */}
                {filteredUsers && filteredUsers.length > 0 && (
                    <div className="mt-12 text-center animate-in slide-in-from-bottom duration-700 delay-300">
                        <div className="inline-flex items-center gap-6 px-8 py-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-violet-600">{filteredUsers.length}</div>
                                <div className="text-sm text-gray-600">Total Users</div>
                            </div>
                            <div className="w-px h-8 bg-gray-300"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{favoriteUsers.size}</div>
                                <div className="text-sm text-gray-600">Favorites</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}